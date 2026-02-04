import { Link } from "wouter";
import { ChevronLeft, ExternalLink, MapPin, Phone, ShoppingBag } from "lucide-react";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import interiorWarm from "@/assets/interior-warm.png";

const RESTAURANT = {
  name: "Tony's Pizza Shack",
  phoneDisplay: "(555) 987-6543",
  phoneE164: "+15559876543",
  addressLine1: "456 Oven Ave",
  addressLine2: "Pizza Heights, ST 12345",
  mapsQuery: "456 Oven Ave Pizza Heights ST 12345",
  onlineOrderUrl: "/order",
  hours: [
    { day: "Mon", hours: "4:00 PM – 10:00 PM" },
    { day: "Tue", hours: "4:00 PM – 10:00 PM" },
    { day: "Wed", hours: "4:00 PM – 10:00 PM" },
    { day: "Thu", hours: "4:00 PM – 10:00 PM" },
    { day: "Fri", hours: "4:00 PM – 11:00 PM" },
    { day: "Sat", hours: "12:00 PM – 11:00 PM" },
    { day: "Sun", hours: "12:00 PM – 9:00 PM" },
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
            Our Location
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground" data-testid="text-map-subtitle">
            Visit us in Pizza Heights
          </p>
        </div>
        <MapPin className="size-4 text-primary" aria-hidden="true" />
      </div>
      <div className="aspect-[16/10] bg-muted">
        <iframe
          title="Map"
          className="h-full w-full grayscale contrast-125"
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
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 sm:hidden fixed-bottom-safe">
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
      <PageHeader />

      <main className="container-page main-bottom-safe pt-6">
        <section
          className="grain overflow-hidden rounded-3xl border bg-card shadow-sm"
          data-testid="card-contact-hero"
        >
          <div className="relative aspect-video sm:aspect-[21/9]">
            <img
              src={interiorWarm}
              alt="Warm pizza shop interior"
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
              <h1 className="text-balance text-4xl leading-[1.05] text-white sm:text-5xl" data-testid="text-contact-heading">
                Find us + say hello
              </h1>
              <p className="mt-2 max-w-[62ch] text-sm text-white/85 sm:text-base" data-testid="text-contact-subheading">
                Stop by for a slice or give us a call to order ahead. We're in the heart of Pizza Heights.
              </p>
            </div>
          </div>

          <div className="p-5 sm:p-8">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-4">
                <div className="rounded-2xl border bg-accent p-5" data-testid="card-address">
                  <div className="flex items-start gap-3">
                    <span className="grid size-10 place-items-center rounded-xl bg-background shadow-sm">
                      <MapPin className="size-5 text-primary" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold">Address</p>
                      <p className="mt-1 text-sm text-muted-foreground" data-testid="text-address">
                        {RESTAURANT.addressLine1}
                        <br />
                        {RESTAURANT.addressLine2}
                      </p>
                      <a
                        href={mapsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-primary hover:opacity-80"
                        data-testid="link-open-maps"
                      >
                        Get Directions
                        <ExternalLink className="size-3.5" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border bg-card p-5" data-testid="card-call">
                  <div className="flex items-start gap-3">
                    <span className="grid size-10 place-items-center rounded-xl bg-accent">
                      <Phone className="size-5 text-foreground" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold">Call for takeout</p>
                      <p className="mt-1 text-base font-bold tabular-nums">{RESTAURANT.phoneDisplay}</p>
                      <a href={`tel:${RESTAURANT.phoneE164}`} className="mt-3 block">
                        <Button size="sm" className="rounded-xl">Call Now</Button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border bg-card p-5" data-testid="card-hours">
                <p className="text-sm font-semibold mb-4">Store Hours</p>
                <dl className="space-y-3" data-testid="list-hours">
                  {RESTAURANT.hours.map((h) => (
                    <div key={h.day} className="flex items-baseline justify-between gap-3 border-b border-border/50 pb-2 last:border-0 last:pb-0">
                      <dt className="text-sm font-medium">{h.day}</dt>
                      <dd className="text-sm text-muted-foreground tabular-nums">{h.hours}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <div className="mt-6">
              <MapEmbed />
            </div>

            <div className="mt-6 rounded-2xl border bg-muted/50 p-4" data-testid="card-contact-note">
              <p className="text-sm font-semibold">Good to know</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Parking is available behind the building. For large takeout orders, calling at least 30 minutes ahead is appreciated.
              </p>
            </div>
          </div>
        </section>
      </main>

      <BottomCallBar />

      <Footer>
        <p className="text-xs text-muted-foreground" data-testid="text-footer">
          © {new Date().getFullYear()} {RESTAURANT.name}. Hand-crafted pizza.
        </p>
      </Footer>
    </div>
  );
}
