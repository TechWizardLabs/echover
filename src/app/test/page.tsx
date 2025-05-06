"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [file, setFile] = useState<File>();
  const [filePreview, setFilePreview] = useState<string>("");
  const [url, setUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [isValidType, setIsValidType] = useState(true);

  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "video/mp4", "video/webm"];

  useEffect(() => {
    return () => {
      if (filePreview) URL.revokeObjectURL(filePreview);
    };
  }, [filePreview]);

  const uploadFile = async () => {
    if (!file || !isValidType) {
      alert("Invalid or no file selected");
      return;
    }

    try {
      setUploading(true);
      setUrl("");

      const data = new FormData();
      data.set("file", file);
      const uploadRequest = await fetch("/api/files", {
        method: "POST",
        body: data,
      });


      const { url: uploadedUrl } = await uploadRequest.json();
      setUrl(uploadedUrl);
    } catch (e) {
      console.error(e);
      alert("Trouble uploading file");
    } finally {
      setUploading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target?.files?.[0];
    if (!selectedFile) return;

    console.log("Selected file type:", selectedFile.type);
    const isValid = allowedTypes.includes(selectedFile.type);
    setIsValidType(isValid);
    setFile(selectedFile);

    if (!isValid) {
      alert("Only images and videos are allowed.");
      return;
    }

    const previewUrl = URL.createObjectURL(selectedFile);
    setFilePreview(previewUrl);
  };

  return (
    <main className="w-full min-h-screen flex flex-col justify-center items-center px-4">
      <div className="flex flex-col gap-4 max-w-md w-full border rounded-2xl p-6 shadow-sm">
        <Input
          type="file"
          accept="image/*,video/*"
          onChange={handleChange}
          className="cursor-pointer"
        />

        <Button
          type="button"
          disabled={uploading || !file || !isValidType}
          onClick={uploadFile}
          className="w-full cursor-pointer"
        >
          {uploading ? "Uploading..." : "Upload"}
        </Button>

        {filePreview && file?.type.startsWith("image/") && !url && (
          <Image
            src={filePreview}
            alt="Preview"
            width={400}
            height={300}
            className="rounded-md object-cover opacity-60 animate-pulse"
          />
        )}

        {filePreview && file?.type.startsWith("video/") && !url && (
          <video controls muted className="rounded-md w-full max-h-[400px] opacity-60">
            <source src={filePreview} type={file.type} />
            Your browser does not support the video tag.
          </video>
        )}

        {url && file?.type.startsWith("image/") && (
          <Image
            src={url}
            alt="Uploaded image"
            width={400}
            height={300}
            className="rounded-md object-cover transition-opacity duration-700"
          />
        )}

        {url && file?.type.startsWith("video/") && (
          <video controls className="rounded-md w-full max-h-[400px] transition-opacity duration-700">
            <source src={url} type={file.type} />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </main>
  );
}