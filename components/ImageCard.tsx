"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ImageCard({
  href,
  fallbackSrc,
  alt,
  className,
}: {
  href: string;
  fallbackSrc: string;
  alt: string;
  className?: string;
}) {
  const [imgSrc, setImgSrc] = useState(href);
  return (
    <Link
      href={href}
      className={cn(
        "relative border m-auto aspect-4/3 w-full rounded-md overflow-hidden",
        className,
      )}
    >
      <Image
        src={imgSrc}
        alt={alt}
        fill
        className="object-cover"
        onError={() => setImgSrc(fallbackSrc)}
        unoptimized={true}
      />
    </Link>
  );
}
