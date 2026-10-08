import type { Metadata } from "next";

interface PageMetadataOptions {
  noIndex?: boolean;
}

export function createPageMetadata(
  title: string,
  description: string,
  options: PageMetadataOptions = {},
): Metadata {
  const brandedTitle = `${title} | Power Pulse`;

  return {
    title,
    description,
    openGraph: {
      title: brandedTitle,
      description,
      siteName: "Power Pulse",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary",
      title: brandedTitle,
      description,
    },
    ...(options.noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}