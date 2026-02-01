import { Link } from "wouter";
import { MapPin, Phone, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";

const RESTAURANT = {
  name: "Maple & Main Kitchen",
  tagline: "Comfort food, warm vibes, and quick takeout.",
  phoneDisplay: "(555) 123-4567",
  phoneE164: "+15551234567",
  addressLine1: "123 Main St",
  addressLine2: "Hometown, ST 12345",
  mapsQuery: "123 Main St Hometown ST 12345",
  onlineOrderUrl: "https://example.com/order",
  hours: [
    { day: "Mon", hours: "Closed" },
    { day: "Tue", hours: "11:00 AM – 8:00 PM" },
    { day: "Wed", hours: "11:00 AM – 8:00 PM" },
    { day: "Thu", hours: "11:00 AM – 8:00 PM" },
    { day: "Fri", hours: "11:00 AM – 9:00 PM" },
    { day: "Sat", hours: "10:00 AM – 9:00 PM" },
    { day: "Sun", hours: "10:00 AM – 7:00 PM" },
  ],
};

function PrimaryActions() {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    RESTAURANT.mapsQuery,
  )}`;
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <Link href="/menu">
        <Button
          data-testid="button-view-menu"
          className="h-12 w-full rounded-xl text-base shadow-sm"
        >
          <UtensilsCrossed className="mr-2 size-4" aria-hidden="true" />
          View Menu
        </Button>
      </Link>
      <a href={`tel:${RESTAURANT.phoneE164}`} className="block">
        <Button
          data-testid="button-call-now"
          variant="secondary"
          className="h-12 w-full rounded-xl text-base"
        >
          <Phone className="mr-2 size-4" aria-hidden="true" />
          Call Now
        </Button>
      </a>
      <a href={mapsUrl} target="_blank" rel="noreferrer" className="block">
        <Button
          data-testid="button-get-directions"
          variant="outline"
          className="h-12 w-full rounded-xl text-base"
        >
          <MapPin className="mr-2 size-4" aria-hidden="true" />
          Get Directions
        </Button>
      </a>
    </div>
  );
}

function InfoCard() {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    RESTAURANT.mapsQuery,
  )}`;
  return (
    <section
      className="rounded-2xl border bg-card shadow-sm"
      aria-label="Restaurant info"
      data-testid="card-restaurant-info"
    >
      <div className="p-4 sm:p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Address</p>
            <p className="mt-1 text-base font-semibold" data-testid="text-address">
              {RESTAURANT.addressLine1}
              <br />
              {RESTAURANT.addressLine2}
            </p>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-primary underline-offset-4 hover:underline"
              data-testid="link-maps"
            >
              <MapPin className="size-4" aria-hidden="true" />
              Open in Google Maps
            </a>

            <div className="mt-4">
              <p className="text-sm font-medium text-muted-foreground">Phone</p>
              <a
                href={`tel:${RESTAURANT.phoneE164}`}
                className="mt-1 inline-flex items-center gap-2 text-base font-semibold text-foreground underline-offset-4 hover:underline"
                data-testid="link-phone"
              >
                <Phone
                  className="size-4 text-muted-foreground"
                  aria-hidden="true"
                />
                {RESTAURANT.phoneDisplay}
              </a>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground">Hours</p>
            <dl className="mt-2 space-y-2" data-testid="list-hours">
              {RESTAURANT.hours.map((h) => (
                <div
                  key={h.day}
                  className="flex items-baseline justify-between gap-3"
                >
                  <dt
                    className="text-sm font-semibold text-foreground"
                    data-testid={`text-hours-day-${h.day.toLowerCase()}`}
                  >
                    {h.day}
                  </dt>
                  <dd
                    className="text-sm text-muted-foreground"
                    data-testid={`text-hours-time-${h.day.toLowerCase()}`}
                  >
                    {h.hours}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

function BottomCallBar() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 sm:hidden">
      <div className="container-page pb-3">
        <div className="pointer-events-auto rounded-2xl border bg-card/95 shadow-md backdrop-blur supports-[backdrop-filter]:bg-card/80">
          <div className="flex items-center gap-3 p-3">
            <div className="min-w-0">
              <p className="text-sm font-semibold" data-testid="text-bottombar-name">
                {RESTAURANT.name}
              </p>
              <p
                className="text-xs text-muted-foreground"
                data-testid="text-bottombar-phone"
              >
                Tap to call for takeout
              </p>
            </div>
            <a href={`tel:${RESTAURANT.phoneE164}`} className="ml-auto">
              <Button
                data-testid="button-bottom-call-now"
                className="h-11 rounded-xl px-4"
              >
                <Phone className="mr-2 size-4" aria-hidden="true" />
                Call Now
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-dvh bg-background">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="container-page flex h-14 items-center justify-between">
          <Link href="/">
            <button
              type="button"
              className="inline-flex items-center gap-2"
              data-testid="link-home"
            >
              <span className="grid size-9 place-items-center rounded-xl bg-accent text-foreground">
                <UtensilsCrossed className="size-4" aria-hidden="true" />
              </span>
              <span className="text-sm font-semibold tracking-tight">
                {RESTAURANT.name}
              </span>
            </button>
          </Link>

          <nav className="flex items-center gap-2">
            <Link href="/menu">
              <button
                type="button"
                className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground"
                data-testid="link-nav-menu"
              >
                Menu
              </button>
            </Link>
            <Link href="/contact">
              <button
                type="button"
                className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground"
                data-testid="link-nav-contact"
              >
                Contact
              </button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="container-page pb-24 pt-6">
        <section className="grain rounded-3xl border bg-card shadow-sm">
          <div className="p-5 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="min-w-0">
                <p
                  className="text-sm font-medium text-muted-foreground"
                  data-testid="text-hero-kicker"
                >
                  Neighborhood restaurant
                </p>
                <h1
                  className="mt-2 text-balance text-3xl leading-tight sm:text-4xl"
                  data-testid="text-restaurant-name"
                >
                  {RESTAURANT.name}
                </h1>
                <p
                  className="mt-2 max-w-[46ch] text-base text-muted-foreground"
                  data-testid="text-tagline"
                >
                  {RESTAURANT.tagline}
                </p>
              </div>
              <div className="rounded-2xl bg-accent px-4 py-3">
                <p
                  className="text-xs font-medium text-muted-foreground"
                  data-testid="text-quick-address-label"
                >
                  Find us
                </p>
                <p className="mt-1 text-sm font-semibold" data-testid="text-quick-address">
                  {RESTAURANT.addressLine1}
                </p>
                <p className="text-sm text-muted-foreground" data-testid="text-quick-city">
                  {RESTAURANT.addressLine2}
                </p>
              </div>
            </div>

            <div className="mt-5">
              <PrimaryActions />
            </div>

            <div className="mt-6">
              <InfoCard />
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Link href="/contact">
                <button
                  type="button"
                  className="text-left text-sm font-medium text-primary underline-offset-4 hover:underline"
                  data-testid="link-more-info"
                >
                  More contact details
                </button>
              </Link>

              <a
                href={RESTAURANT.onlineOrderUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex"
              >
                <Button
                  data-testid="button-order-online"
                  variant="secondary"
                  className="h-11 rounded-xl"
                >
                  Order Online
                </Button>
              </a>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-3 sm:grid-cols-3">
          {["Family recipes", "Fast takeout", "Friendly service"].map((t, i) => (
            <div
              key={t}
              className="rounded-2xl border bg-card p-4 shadow-sm"
              data-testid={`card-feature-${i}`}
            >
              <p className="text-sm font-semibold">{t}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Simple, dependable food you’ll feel good ordering again.
              </p>
            </div>
          ))}
        </section>
      </main>

      <BottomCallBar />

      <footer className="border-t">
        <div className="container-page py-6">
          <p className="text-xs text-muted-foreground" data-testid="text-footer">
            © {new Date().getFullYear()} {RESTAURANT.name}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
