"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";

interface FlyerModalProps {
  open: boolean;
  onClose: () => void;
}

const FlyerModal = ({ open, onClose }: FlyerModalProps) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 w-full flex items-center justify-center bg-foreground/50 dark:bg-foreground/20 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-lg w-full animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          onClick={onClose}
          className="absolute -top-3 -right-3 z-10 rounded-full bg-card p-2 shadow-lg border border-border hover:bg-muted transition-colors"
        >
          <X className="h-5 w-5 text-foreground" />
        </Button>
        <Image
          src="/flyer.webp"
          alt="Tour Flyer"
          width={500}
          height={700}
          className="w-full rounded-lg shadow-2xl"
        />
      </div>
    </div>
  );
};

export default FlyerModal;
