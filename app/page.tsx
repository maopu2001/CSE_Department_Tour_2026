"use client";

import { useState } from "react";
import {
  MapPin,
  Calendar,
  Ship,
  Bus,
  Wallet,
  Clock,
  TreePine,
  ExternalLink,
  Copy,
  Check,
  FileImage,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { content } from "@/data/tourContent";
import { useFlyerModal, useLanguage } from "@/hooks/useQueries";
import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-dynamic";

function SectionHeader({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
      {icon}
      <h2>{title}</h2>
    </div>
  );
}

export default function Home() {
  const { lang } = useLanguage();
  const { setFlyerOpen } = useFlyerModal();
  const t = content[lang];
  const isBn = lang === "bn";

  return (
    <div
      className={`min-h-screen bg-background ${isBn ? "font-bangla" : "font-sans"}`}
    >
      {/* Hero */}
      <section className="flex justify-center items-center hero-gradient px-4 text-center text-white h-100">
        <div className="container max-w-2xl animate-fade-in flex flex-col items-center justify-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest opacity-80">
            {t.date}
          </p>
          <h1
            className={`mb-3 font-bold leading-tight ${isBn ? "text-5xl md:text-7xl" : "text-4xl md:text-6xl"}`}
          >
            {t.title}
          </h1>
          <p
            className={`text-lg md:text-xl opacity-90 ${isBn ? "font-bangla" : ""}`}
          >
            {t.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm opacity-80">
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {t.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <Ship className="h-4 w-4" />
              {t.shipStay}
            </span>
            <span className="flex items-center gap-1.5">
              <Bus className="h-4 w-4" />
              {t.busTravel}
            </span>
          </div>

          <div className="mt-6 flex gap-2 flex-col w-fit mx-auto sm:hidden">
            <Button
              size="sm"
              variant="outline"
              className="p-4 bg-background/30"
              onClick={() => setFlyerOpen(true)}
            >
              <div className="flex justify-center items-center gap-2">
                <FileImage className="mr-2 h-5 w-5" />
                {t.showFlyer}
              </div>
            </Button>
            <Button size="sm" asChild className="p-4 bg-primary/70">
              <a href={content.formLink}>
                <ExternalLink className="mr-2 h-5 w-5" />
                {t.preRegBtn}
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="container mx-auto max-w-4xl px-4 py-12 space-y-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
          {/* Places */}
          <section
            className="animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <SectionHeader
              icon={<TreePine className="h-5 w-5" />}
              title={t.placesTitle}
            />
            <div className="grid gap-3">
              {t.places.map((content, i) => (
                <Link
                  href={content.href}
                  key={i}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 rounded-lg bg-card p-4 border border-border"
                >
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span className="text-sm">{content.place}</span>
                </Link>
              ))}
              <p className="text-xs mt-2 px-2">{t.placeNote}</p>
            </div>
          </section>

          {/* Schedule */}
          <section
            className="animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            <SectionHeader
              icon={<Calendar className="h-5 w-5" />}
              title={t.scheduleTitle}
            />
            <div className="space-y-0 border-l-2 border-primary/20 ml-2">
              {t.schedule.map((item, i) => (
                <div key={i} className="relative pl-6 pb-8 last:pb-0">
                  <div className="absolute -left-1.75 top-1 h-3 w-3 rounded-full bg-primary" />
                  <p className="text-sm font-semibold text-primary">
                    {item.date}
                  </p>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Budget */}
        <section className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <SectionHeader
            icon={<Wallet className="h-5 w-5" />}
            title={t.budgetTitle}
          />
          <div className="rounded-lg bg-card border border-border p-6 space-y-3">
            <p className="text-lg font-bold text-foreground">{t.totalBudget}</p>
            <p className="text-base font-semibold text-accent">{t.preReg}</p>
            <p className="text-sm text-muted-foreground">{t.charge}</p>
            <p className="text-sm text-muted-foreground">{t.remaining}</p>
            <p className="text-sm font-medium text-red-600 dark:text-red-400">
              {t.nonRefundable}
            </p>
            <div className="mt-4 rounded-md bg-muted p-3">
              <p className="text-sm font-semibold text-foreground">
                {t.deadline}
              </p>
            </div>
          </div>
        </section>

        {/* Payment */}
        <section className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <SectionHeader
            icon={<Wallet className="h-5 w-5" />}
            title={t.paymentTitle}
          />
          <div className="rounded-lg bg-card border border-border p-6 space-y-4 text-sm">
            <div className="flex items-center gap-5">
              <Image
                src="/bkash.webp"
                alt="bKash"
                width={100}
                height={60}
                className="shrink-0 dark:invert dark:brightness-0"
              />

              <div className="space-y-2 flex-1">
                <p className="font-semibold text-base">{t.bkash.title}</p>
                <div className="flex items-center gap-2">
                  <p>{t.bkash.account}</p>
                  <CopyButton copy={t.bkash.copy} field="bkash" />
                </div>
                <p className="text-sm text-muted-foreground">
                  {t.bkash.charge}
                </p>
                <p className="text-muted-foreground">{t.bkash.holder}</p>
              </div>
            </div>

            <div className="border-t border-border pt-4 flex items-center gap-6">
              <Image
                src="/trust.webp"
                alt="Trust Bank"
                width={100}
                height={60}
                className="shrink-0 dark:invert dark:brightness-0"
              />
              <div className="space-y-2 flex-1">
                <p className="font-semibold text-base">{t.bank.title}</p>
                <p>{t.bank.name}</p>
                <div className="flex items-center gap-2">
                  <p>{t.bank.account}</p>
                  <CopyButton copy={t.bank.copy} field="bank" />
                </div>
                <p className="text-sm text-muted-foreground">{t.bank.charge}</p>
                <p className="text-muted-foreground">{t.bank.holder}</p>
              </div>
            </div>

            <div className="mt-4 rounded-md bg-accent/10 border border-accent/20 p-3">
              <p className="text-sm font-medium text-foreground">
                {t.paymentNote}
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          className="text-center py-4 animate-fade-in"
          style={{ animationDelay: "0.5s" }}
        >
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            {t.closingNote}
          </p>
          <Button
            size="lg"
            asChild
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8"
          >
            <a href={content.formLink}>
              <ExternalLink className="mr-2 h-5 w-5" />
              {t.preRegBtn}
            </a>
          </Button>
          <p className="mt-6 text-lg">{t.organizeTitle}</p>
          <div className="mt-2 space-y-1">
            <p className="mt-3 text-sm opacity-70">{t.batch}</p>
            <p className="text-sm opacity-70">{t.dept}</p>
            <p className="text-sm font-medium opacity-80">{t.university}</p>
            <p className="text-xs opacity-70">{t.address}</p>
          </div>
        </section>
      </main>
    </div>
  );
}

function CopyButton({ copy, field }: { copy: string; field: string }) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => copyToClipboard(copy, field)}
      className="cursor-pointer size-5 rounded-sm hover:bg-muted transition-colors border"
      title="Copy number"
    >
      {copiedField === field ? (
        <Check className="size-2.5 text-green-700" />
      ) : (
        <Copy className="size-2.5 text-muted-foreground" />
      )}
    </Button>
  );
}
