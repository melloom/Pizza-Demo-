import { Link } from "wouter";
import { MapPin, Phone, Pizza, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import pizzaHero from "@/assets/pizza-hero.png";

const RESTAURANT = {
  name: "Tony's Pizza Shack",
  tagline: "The best sourdough crust pizza in the neighborhood.",
  phoneDisplay: "(555) 987-6543",
  phoneE164: "+15559876543",
  addressLine1: "456 Oven Ave",
  addressLine2: "Pizza Heights, ST 12345",
  mapsQuery: "456 Oven Ave Pizza Heights ST 12345",
  hours: [
    { day: "Mon", hours: "4:00 PM – 10:00 PM" },
    { day: "Tue", hours: "4:00 PM – 10:00 PM" },
    { day: "Wed", hours: "4:00 PM – 10:00 PM" },
    { day: "Thu", hours: "4:00 PM – 10:00 PM" },
    { day: "Fri", hours: "11:00 AM – 11:00 PM" },
    { day: "Sat", hours: "11:00 AM – 11:00 PM" },
    { day: "Sun", hours: "12:00 PM – 9:00 PM" },
  ],
};

function PrimaryActions() {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    RESTAURANT.mapsQuery,
  )}`;
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <Link href="/order">
        <Button
          data-testid="button-order-now"
          className="h-12 w-full rounded-xl text-base shadow-lg bg-primary hover:bg-primary/90"
        >
          <ShoppingCart className="mr-2 size-4" aria-hidden="true" />
          Order Online
        </Button>
      </Link>
      <Link href="/menu">
        <Button
          data-testid="button-view-menu"
          variant="secondary"
          className="h-12 w-full rounded-xl text-base"
        >
          <Pizza className="mr-2 size-4" aria-hidden="true" />
          View Menu
        </Button>
      </Link>
      <a href={`tel:${RESTAURANT.phoneE164}`} className="block">
        <Button
          data-testid="button-call-now"
          variant="outline"
          className="h-12 w-full rounded-xl text-base"
        >
          <Phone className="mr-2 size-4" aria-hidden="true" />
          Call Now
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
                Hot & fresh in 20 mins
              </p>
            </div>
            <Link href="/order" className="ml-auto">
              <Button
                data-testid="button-bottom-order-now"
                className="h-11 rounded-xl px-4"
              >
                <ShoppingCart className="mr-2 size-4" aria-hidden="true" />
                Order Now
              </Button>
            </Link>
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
              <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
                <Pizza className="size-4" aria-hidden="true" />
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
                Find Us
              </button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="container-page pb-24 pt-6">
        <section className="grain overflow-hidden rounded-3xl border bg-card shadow-sm">
          <div className="relative aspect-[16/9] sm:aspect-[21/9]">
            <img 
              src={pizzaHero} 
              alt="Fresh pepperoni pizza" 
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 p-5 sm:p-8">
              <p className="text-sm font-medium text-white/80">Family-owned & operated</p>
              <h1 className="mt-1 text-3xl font-bold text-white sm:text-5xl">Authentic Wood-Fired Pizza</h1>
            </div>
          </div>
          
          <div className="p-5 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="min-w-0">
                <h2
                  className="text-balance text-2xl font-bold sm:text-3xl"
                  data-testid="text-restaurant-name"
                >
                  {RESTAURANT.name}
                </h2>
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
                  Pick up at
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

            <div className="mt-8">
              <InfoCard />
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-3 sm:grid-cols-3">
          {[
            { title: "Stone Baked", desc: "Crispy bottom, airy crust every time." },
            { title: "Fresh Toppings", desc: "Local ingredients delivered daily." },
            { title: "Fast Pick-up", desc: "Ready in 15-20 minutes." }
          ].map((feature, i) => (
            <div
              key={feature.title}
              className="rounded-2xl border bg-card p-4 shadow-sm"
              data-testid={`card-feature-${i}`}
            >
              <p className="text-sm font-semibold">{feature.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {feature.desc}
              </p>
            </div>
          ))}
        </section>
      </main>

      <BottomCallBar />

      <footer className="border-t">
        <div className="container-page py-6 text-center sm:text-left">
          <p className="text-xs text-muted-foreground" data-testid="text-footer">
            © {new Date().getFullYear()} {RESTAURANT.name}. Hand-crafted pizza.
          </p>
        </div>
      </footer>
    </div>
  );
}
