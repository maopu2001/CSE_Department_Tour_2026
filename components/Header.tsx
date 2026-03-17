"use client";

import { FileImage, Languages, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import FlyerModal from "@/components/FlyerModal";
import { ThemeToggle } from "@/components/ThemeToggle";
import { content } from "@/data/tourContent";
import { useLanguage, useFlyerModal } from "@/hooks/useQueries";
import Image from "next/image";
import Link from "next/link";

export function Header() {
  const { lang, setLanguage } = useLanguage();
  const { isOpen: flyerOpen, setFlyerOpen } = useFlyerModal();
  const t = content[lang];

  return (
    <>
      <header className="sticky top-0 left-0 right-0 z-40 border-b border-border bg-card/80 backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-3">
            <Image
              className="hidden dark:block"
              src="/white.webp"
              alt="Logo"
              width={45}
              height={45}
            />
            <Image
              className="dark:hidden"
              src="/black.webp"
              alt="Logo"
              width={45}
              height={45}
            />
            <span className="text-sm font-semibold text-primary tracking-wide">
              {t.eventTitle}
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setFlyerOpen(true)}
              className="hidden sm:inline-flex"
            >
              <FileImage className="mr-1.5 h-4 w-4" />
              {t.showFlyer}
            </Button>
            <Button
              asChild
              className="hidden sm:inline-flex bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <a href={content.formLink}>
                <ExternalLink className="mr-1.5 h-4 w-4" />
                {t.preRegBtn}
              </a>
            </Button>
            <Button
              variant="outline"
              onClick={() => setLanguage(lang === "en" ? "bn" : "en")}
            >
              <Languages className="mr-1.5 h-4 w-4" />
              {t.langSwitch}
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <FlyerModal open={flyerOpen} onClose={() => setFlyerOpen(false)} />
    </>
  );
}
