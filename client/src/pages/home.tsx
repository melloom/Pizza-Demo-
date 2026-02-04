import { Link } from "wouter";
import {
  MapPin,
  Phone,
  Pizza,
  ShoppingCart,
  Sparkles,
  Flame,
  HeartHandshake,
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import heroPizza from "@/assets/pizza-oven.png";
import familyPhoto from "@/assets/pizza-family.png";
import storefrontPhoto from "@/assets/pizza-storefront.png";

const RESTAURANT = {
  name: "Tony's Pizza Shack",
  tagline: "Family-owned wood-fired pizza, made the slow way — ready the fast way.",
  phoneDisplay: "(555) 987-6543",
  phoneE164: "+15559876543",
  addressLine1: "456 Oven Ave",
  addressLine2: "Pizza Heights, ST 12345",
  mapsQuery: "456 Oven Ave Pizza Heights ST 12345",
  hoursToday: "Open today: 4:00 PM – 10:00 PM",
};

function PrimaryActions() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <Link href="/order">
        <Button
          data-testid="button-order-now"
          className="h-12 w-full rounded-xl text-base shadow-lg"
        >
          <ShoppingCart className="mr-2 size-4" aria-hidden="true" />
          Order Now
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
          Call
        </Button>
      </a>
    </div>
  );
}

function QuickInfoPills() {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    RESTAURANT.mapsQuery,
  )}`;

  return (
    <div className="mt-4 grid gap-2 sm:grid-cols-3">
      <a
        href={mapsUrl}
        target="_blank"
        rel="noreferrer"
        className="rounded-2xl border bg-card px-4 py-3 shadow-sm transition-shadow hover:shadow-md"
        data-testid="pill-directions"
      >
        <div className="flex items-start gap-3">
          <span className="mt-0.5 grid size-9 place-items-center rounded-xl bg-accent text-foreground">
            <MapPin className="size-4" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="text-xs font-medium text-muted-foreground">Directions</p>
            <p className="mt-0.5 text-sm font-semibold leading-tight">
              {RESTAURANT.addressLine1}
            </p>
            <p className="text-xs text-muted-foreground">Tap to open maps</p>
          </div>
        </div>
      </a>

      <a
        href={`tel:${RESTAURANT.phoneE164}`}
        className="rounded-2xl border bg-card px-4 py-3 shadow-sm transition-shadow hover:shadow-md"
        data-testid="pill-call"
      >
        <div className="flex items-start gap-3">
          <span className="mt-0.5 grid size-9 place-items-center rounded-xl bg-accent text-foreground">
            <Phone className="size-4" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="text-xs font-medium text-muted-foreground">Call for takeout</p>
            <p className="mt-0.5 text-sm font-semibold leading-tight">
              {RESTAURANT.phoneDisplay}
            </p>
            <p className="text-xs text-muted-foreground">Quick question? Call us.</p>
          </div>
        </div>
      </a>

      <div
        className="rounded-2xl border bg-card px-4 py-3 shadow-sm"
        data-testid="pill-hours"
      >
        <div className="flex items-start gap-3">
          <span className="mt-0.5 grid size-9 place-items-center rounded-xl bg-accent text-foreground">
            <Sparkles className="size-4" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="text-xs font-medium text-muted-foreground">Hours</p>
            <p className="mt-0.5 text-sm font-semibold leading-tight">
              {RESTAURANT.hoursToday}
            </p>
            <p className="text-xs text-muted-foreground">Walk-ins welcome</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BottomOrderBar() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 sm:hidden fixed-bottom-safe">
      <div className="container-page pb-3">
        <div className="pointer-events-auto rounded-2xl border bg-card/95 shadow-md backdrop-blur supports-[backdrop-filter]:bg-card/80">
          <div className="flex items-center gap-3 p-3">
            <div className="min-w-0">
              <p className="text-sm font-semibold" data-testid="text-bottombar-name">
                {RESTAURANT.name}
              </p>
              <p
                className="text-xs text-muted-foreground"
                data-testid="text-bottombar-subtitle"
              >
                Order online for fast pick-up
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

function StoryCards() {
  return (
    <section className="mt-6 grid gap-3 sm:grid-cols-3" data-testid="section-story">
      {[
        {
          title: "Family-owned",
          desc: "Real people behind the counter — same oven, same care, every day.",
          icon: HeartHandshake,
        },
        {
          title: "Wood-fired",
          desc: "A blazing hot stone oven for crisp edges and airy crust.",
          icon: Flame,
        },
        {
          title: "Fast pick-up",
          desc: "Order online, swing by, and you’re back on your night.",
          icon: Sparkles,
        },
      ].map((c, i) => (
        <div
          key={c.title}
          className="rounded-2xl border bg-card p-4 shadow-sm"
          data-testid={`card-feature-${i}`}
        >
          <div className="flex items-start gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-accent">
              <c.icon className="size-4 text-foreground" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold">{c.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

function PhotoStrip() {
  return (
    <section className="mt-6" aria-label="Photos" data-testid="section-photos">
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
          <img
            src={familyPhoto}
            alt="Family team making pizza dough"
            className="h-44 w-full object-cover sm:h-48"
            loading="lazy"
            data-testid="img-family"
          />
          <div className="p-4">
            <p className="text-sm font-semibold">Family-owned</p>
            <p className="mt-1 text-sm text-muted-foreground">
              A neighborhood spot with hands-on care.
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
          <img
            src={heroPizza}
            alt="Wood-fired pizza coming out of the oven"
            className="h-44 w-full object-cover sm:h-48"
            loading="lazy"
            data-testid="img-oven"
          />
          <div className="p-4">
            <p className="text-sm font-semibold">Wood-fired</p>
            <p className="mt-1 text-sm text-muted-foreground">
              That char-kissed crust you can’t fake.
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
          <img
            src={storefrontPhoto}
            alt="Pizza shop storefront"
            className="h-44 w-full object-cover sm:h-48"
            loading="lazy"
            data-testid="img-storefront"
          />
          <div className="p-4">
            <p className="text-sm font-semibold">Easy pick-up</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Park, pop in, and you’re on your way.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    RESTAURANT.mapsQuery,
  )}`;

  return (
    <div className="min-h-dvh bg-background">
      <header className="page-header sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="container-page flex h-14 items-center justify-between">
          <Link href="/">
            <button
              type="button"
              className="inline-flex items-center gap-2"
              data-testid="link-home"
            >
              <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm">
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
            <Link href="/about">
              <button
                type="button"
                className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground"
                data-testid="link-nav-about"
              >
                About
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
            <Link href="/order">
              <button
                type="button"
                className="rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-95"
                data-testid="link-nav-order"
              >
                Order
              </button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="container-page main-bottom-safe pt-6">
        <section className="grain overflow-hidden rounded-3xl border bg-card shadow-sm">
          <div className="relative">
            <div className="relative aspect-[4/5] sm:aspect-[21/9]">
              <img
                src={heroPizza}
                alt="Wood-fired pizza coming out of the oven"
                className="h-full w-full object-cover"
                data-testid="img-hero-pizza"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/25 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
                <div className="flex flex-wrap items-center gap-2 mb-2 sm:mb-0">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur">
                    <span className="size-1.5 rounded-full bg-emerald-400" />
                    Ready in ~20 minutes
                  </div>
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/25 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur hover:bg-black/35"
                    data-testid="link-hero-directions"
                  >
                    <MapPin className="size-3.5" aria-hidden="true" />
                    Get directions
                  </a>
                </div>

                <h1
                  className="mt-3 text-balance text-4xl leading-[1.05] text-white sm:text-5xl"
                  data-testid="text-hero-title"
                >
                  Family-owned.
                  <br />
                  Wood-fired.
                  <br />
                  <span className="text-white/90">Ridiculously good pizza.</span>
                </h1>
                <p
                  className="mt-3 max-w-[58ch] text-sm text-white/85 sm:text-base"
                  data-testid="text-hero-subtitle"
                >
                  {RESTAURANT.tagline}
                </p>

                <div className="mt-5">
                  <PrimaryActions />
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p
                    className="text-xs font-medium text-muted-foreground"
                    data-testid="text-hero-kicker"
                  >
                    Local pizza shop in Pizza Heights
                  </p>
                  <h2
                    className="mt-1 text-2xl sm:text-3xl"
                    data-testid="text-restaurant-name"
                  >
                    {RESTAURANT.name}
                  </h2>
                </div>

              </div>

              <QuickInfoPills />
              <StoryCards />
              <PhotoStrip />

              <div
                className="mt-6 rounded-2xl border bg-accent p-4"
                data-testid="card-home-tip"
              >
                <p className="text-sm font-semibold">Pro tip</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Feeding a group? Start an online order and add a note at checkout.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <BottomOrderBar />

      <Footer>
        <p className="text-xs text-muted-foreground" data-testid="text-footer">
          © {new Date().getFullYear()} {RESTAURANT.name}. Hand-crafted pizza.
        </p>
      </Footer>
    </div>
  );
}
