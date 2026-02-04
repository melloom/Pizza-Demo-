import { cn } from "@/lib/utils";

const DEMO_SITES = [
  { label: "Flavor Haven", href: "https://flavorhavendemo.netlify.app/" },
  { label: "Rosie's Kitchen", href: "https://rosiekitchen.netlify.app/" },
] as const;

type FooterProps = {
  className?: string;
  children: React.ReactNode;
};

export function Footer({ className, children }: FooterProps) {
  return (
    <footer className={cn("border-t", className)}>
      <div className="container-page py-6 text-center sm:text-left">
        {children}
        <p className="mt-3 text-xs text-muted-foreground">
          More demo sites:{" "}
          {DEMO_SITES.map((site, i) => (
            <span key={site.href}>
              {i > 0 && " · "}
              <a
                href={site.href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:no-underline focus:outline-none focus:ring-2 focus:ring-primary rounded"
              >
                {site.label}
              </a>
            </span>
          ))}
        </p>
      </div>
    </footer>
  );
}
