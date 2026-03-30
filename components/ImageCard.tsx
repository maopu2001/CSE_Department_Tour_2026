"use client";
import Image from "next/image";
import { useState } from "react";

export default function ImageCard({
  href,
  fallbackSrc,
  alt,
}: {
  href: string;
  fallbackSrc: string;
  alt: string;
}) {
  const [imgSrc, setImgSrc] = useState(href);
  return (
    <div className="relative border m-auto aspect-4/3 w-full rounded-md overflow-hidden">
      <Image
        src={imgSrc}
        alt={alt}
        fill
        className="object-cover"
        onError={() => setImgSrc(fallbackSrc)}
        unoptimized={true}
      />
    </div>
  );
}
