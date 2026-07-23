import type { Dict } from "@/lib/dict";

export default function Footer({ dict }: { dict: Dict }) {
  return (
    <footer className="border-t border-line bg-card mt-auto">
      <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground space-y-1">
        <p>{dict.footer.copyright}</p>
        <p>{dict.footer.tagline}</p>
        <p>{dict.footer.ssm}</p>
      </div>
    </footer>
  );
}
