import { Link } from "wouter";
import { ChevronLeft, ExternalLink, MapPin, Phone, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

const RESTAURANT = {
  name: "Maple & Main Kitchen",
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

function MapEmbed() {
  return (
    <div
      className="overflow-hidden rounded-2xl border bg-card shadow-sm"
      data-testid="card-map"
    >
      <div className="flex items-center justify-between border-b p-4">
        <div>
          <p className="text-sm font-semibold" data-testid="text-map-title">
            Location
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground" data-testid="text-map-subtitle">
            Placeholder embed (swap with your real Google Maps embed)
          </p>
        </div>
        <MapPin className="size-4 text-muted-foreground" aria-hidden="true" />
      </div>
      <div className="aspect-[16/10] bg-gradient-to-br from-accent to-background">
        <iframe
          title="Map"
          className="h-full w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${encodeURIComponent(
            RESTAURANT.mapsQuery,
          )}&output=embed`}
          data-testid="iframe-map"
        />
      </div>
    </div>
  );
}

function BottomCallBar() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 sm:hidden">
      <div className="container-page pb-3">
        <div className="pointer-events-auto rounded-2xl border bg-card/95 shadow-md backdrop-blur supports-[backdrop-filter]:bg-card/80">
          <div className="flex items-center gap-3 p-3">
            <div className="min-w-0">
              <p className="text-sm font-semibold" data-testid="text-bottombar-title">
                Call {RESTAURANT.name}
              </p>
              <p className="text-xs text-muted-foreground" data-testid="text-bottombar-phone">
                {RESTAURANT.phoneDisplay}
              </p>
            </div>
            <a href={`tel:${RESTAURANT.phoneE164}`} className="ml-auto">
              <Button data-testid="button-bottom-call" className="h-11 rounded-xl px-4">
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

export default function ContactPage() {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    RESTAURANT.mapsQuery,
  )}`;

  return (
    <div className="min-h-dvh bg-background">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="container-page flex h-14 items-center justify-between">
          <Link href="/">
            <button
              type="button"
              className="inline-flex items-center gap-2 text-sm font-medium"
              data-testid="link-back-home"
            >
              <ChevronLeft className="size-4" aria-hidden="true" />
              Home
            </button>
          </Link>
          <p className="text-sm font-semibold" data-testid="text-contact-title">
            Contact & Location
          </p>
          <div className="flex items-center gap-2">
            <Link href="/menu">
              <button
                type="button"
                className="text-sm font-medium text-foreground/80 hover:text-foreground"
                data-testid="link-nav-menu"
              >
                Menu
              </button>
            </Link>
            <Link href="/about">
              <button
                type="button"
                className="text-sm font-medium text-foreground/80 hover:text-foreground"
                data-testid="link-nav-about"
              >
                About
              </button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container-page pb-24 pt-6">
        <section
          className="rounded-3xl border bg-card p-5 shadow-sm sm:p-8"
          data-testid="card-contact-hero"
        >
          <h1 className="text-3xl sm:text-4xl" data-testid="text-contact-heading">
            Find us + say hello
          </h1>
          <p
            className="mt-2 max-w-[62ch] text-base text-muted-foreground"
            data-testid="text-contact-subheading"
          >
            Everything you need—address, hours, call button, and a quick link to directions.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <a href={`tel:${RESTAURANT.phoneE164}`} className="block">
              <Button data-testid="button-call" className="h-12 w-full rounded-xl text-base">
                <Phone className="mr-2 size-4" aria-hidden="true" />
                Call {RESTAURANT.phoneDisplay}
              </Button>
            </a>
            <a href={mapsUrl} target="_blank" rel="noreferrer" className="block">
              <Button
                data-testid="button-directions"
                variant="secondary"
                className="h-12 w-full rounded-xl text-base"
              >
                <MapPin className="mr-2 size-4" aria-hidden="true" />
                Get Directions
              </Button>
            </a>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border bg-accent p-4" data-testid="card-address">
              <p className="text-sm font-semibold">Address</p>
              <p className="mt-1 text-sm" data-testid="text-address">
                {RESTAURANT.addressLine1}
                <br />
                {RESTAURANT.addressLine2}
              </p>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-primary underline-offset-4 hover:underline"
                data-testid="link-open-maps"
              >
                Open maps
                <ExternalLink className="size-4" aria-hidden="true" />
              </a>
            </div>

            <div className="rounded-2xl border bg-card p-4" data-testid="card-hours">
              <p className="text-sm font-semibold">Hours</p>
              <dl className="mt-2 space-y-2" data-testid="list-hours">
                {RESTAURANT.hours.map((h) => (
                  <div key={h.day} className="flex items-baseline justify-between gap-3">
                    <dt
                      className="text-sm font-semibold"
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

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <a
              href={RESTAURANT.onlineOrderUrl}
              target="_blank"
              rel="noreferrer"
              className="block"
            >
              <Button
                data-testid="button-order-online"
                variant="outline"
                className="h-12 w-full rounded-xl text-base"
              >
                <ShoppingBag className="mr-2 size-4" aria-hidden="true" />
                Order Online
              </Button>
            </a>
            <Link href="/menu">
              <Button
                data-testid="button-view-menu"
                variant="secondary"
                className="h-12 w-full rounded-xl text-base"
              >
                View Menu
              </Button>
            </Link>
          </div>
        </section>

        <div className="mt-6">
          <MapEmbed />
        </div>

        <section className="mt-6 rounded-2xl border bg-card p-4" data-testid="card-contact-note">
          <p className="text-sm font-semibold">Good to know</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Parking is available behind the building. For large takeout orders, calling ahead is
            appreciated.
          </p>
        </section>
      </main>

      <BottomCallBar />

      <footer className="border-t">
        <div className="container-page py-6">
          <p className="text-xs text-muted-foreground" data-testid="text-footer">
            Thanks for supporting local.
          </p>
        </div>
      </footer>
    </div>
  );
}
