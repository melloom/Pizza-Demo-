import { Link } from "wouter";
import { Pizza } from "lucide-react";

const RESTAURANT_NAME = "Tony's Pizza Shack";

export function PageHeader() {
  return (
    <header className="page-header sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="container-page flex h-14 min-h-14 flex-wrap items-center justify-between gap-3 py-3 sm:flex-nowrap sm:py-0">
        <Link href="/">
          <button
            type="button"
            className="inline-flex shrink-0 items-center gap-2"
            data-testid="link-home"
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <Pizza className="size-4" aria-hidden="true" />
            </span>
            <span className="hidden text-sm font-semibold tracking-tight sm:inline">
              {RESTAURANT_NAME}
            </span>
          </button>
        </Link>

        <nav className="flex flex-wrap items-center justify-end gap-1.5 sm:gap-2">
          <Link href="/menu">
            <button
              type="button"
              className="rounded-lg px-2.5 py-2 text-xs font-medium text-foreground/80 hover:bg-muted/80 hover:text-foreground sm:px-3 sm:text-sm"
              data-testid="link-nav-menu"
            >
              Menu
            </button>
          </Link>
          <Link href="/about">
            <button
              type="button"
              className="rounded-lg px-2.5 py-2 text-xs font-medium text-foreground/80 hover:bg-muted/80 hover:text-foreground sm:px-3 sm:text-sm"
              data-testid="link-nav-about"
            >
              About
            </button>
          </Link>
          <Link href="/contact">
            <button
              type="button"
              className="rounded-lg px-2.5 py-2 text-xs font-medium text-foreground/80 hover:bg-muted/80 hover:text-foreground sm:px-3 sm:text-sm"
              data-testid="link-nav-contact"
            >
              Find Us
            </button>
          </Link>
          <Link href="/order">
            <button
              type="button"
              className="rounded-lg bg-primary px-2.5 py-2 text-xs font-semibold text-primary-foreground shadow-sm hover:opacity-95 sm:px-3 sm:text-sm"
              data-testid="link-nav-order"
            >
              Order
            </button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
