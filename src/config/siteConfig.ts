import { Metadata } from "next";

const { title, description, ogImage, baseURL } = {
  title: "Echover – Provenance-Powered Web3 Creator Platform",
  description:
    "Echover is a provenance-driven content platform where creators publish digital work, verify genuine engagement using ZK-proofs, and reward top supporters with NFTs on Solana. Own your audience, build trust, and showcase authentic content history—all in one place.",
  baseURL: "https://echover.xyz",
  ogImage: "https://echover.xyz/open-graph.png",
};

export const siteConfig: Metadata = {
  title,
  description,
  metadataBase: new URL(baseURL),
  openGraph: {
    title,
    description,
    images: [ogImage],
    url: baseURL,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage],
  },
  icons: {
    icon: "/favicon.ico",
  },
  applicationName: "echover.xyz",
  alternates: {
    canonical: baseURL,
  },
  keywords: [
    "Echover",
    "NFT Provenance",
    "Digital Creators",
    "ZK Proofs",
    "Verified Engagement",
    "Solana",
    "Underdog Protocol",
    "Reclaim Protocol",
    "Web3 Content",
  ],
};
