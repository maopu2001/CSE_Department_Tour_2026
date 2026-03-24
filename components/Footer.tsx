import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="border-t border-border py-2 text-center">
        <p className="text-xs sm:text-sm text-muted-foreground font-sans tex-nowrap flex items-center justify-center gap-1">
          <span>&copy; {new Date().getFullYear()}</span>
          <span>|</span>
          <span>
            Made and Maintained by{" "}
            <Link
              className="text-primary hover:underline font-medium"
              href="https://github.com/maopu2001"
              target="_blank"
              rel="noopener noreferrer"
            >
              M. Aktaruzzaman Opu
            </Link>
            .
          </span>
        </p>
      </div>
    </footer>
  );
}
