import { pinata } from './pinataConfig';

export const uploadFileToPinata = async (file: File) => {
  try {
    const urlRequest = await fetch("/api/url");
    const urlResponse = await urlRequest.json();

    const upload = await pinata.upload.public
      .file(file)
      .url(urlResponse);

    return urlResponse;
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
};