import { Link } from "wouter";
import { ChevronLeft, HeartHandshake, Flame, Clock, MapPin, Pizza } from "lucide-react";
import { Button } from "@/components/ui/button";
import ingredientsPhoto from "@/assets/ingredients.png";
import doughPhoto from "@/assets/dough-making.png";
import chefOvenPhoto from "@/assets/chef-oven.png";
import interiorPhoto from "@/assets/interior.png";

const RESTAURANT = {
  name: "Tony's Pizza Shack",
  tagline: "Family-owned wood-fired pizza, made the slow way — ready the fast way.",
  addressLine1: "456 Oven Ave",
  addressLine2: "Pizza Heights, ST 12345",
  mapsQuery: "456 Oven Ave Pizza Heights ST 12345",
  founded: "2008",
};

function StatPill({
  icon: Icon,
  label,
  value,
  testId,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  testId: string;
}) {
  return (
    <div
      className="rounded-2xl border bg-card px-4 py-3 shadow-sm"
      data-testid={testId}
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 grid size-9 place-items-center rounded-xl bg-accent text-foreground">
          <Icon className="size-4" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="text-xs font-medium text-muted-foreground">{label}</p>
          <p className="mt-0.5 text-sm font-semibold leading-tight">{value}</p>
        </div>
      </div>
    </div>
  );
}

function NavHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
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
              Tony's Pizza Shack
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
  );
}

export default function AboutPage() {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    RESTAURANT.mapsQuery,
  )}`;

  return (
    <div className="min-h-dvh bg-background">
      <NavHeader />

      <main className="container-page pb-24 pt-6">
        <section
          className="grain overflow-hidden rounded-3xl border bg-card shadow-sm"
          data-testid="card-about-hero"
        >
          <div className="relative">
            <div className="relative aspect-[4/5] sm:aspect-[21/9]">
              <img
                src={chefOvenPhoto}
                alt="Tony's Pizza Shack family team"
                className="h-full w-full object-cover"
                loading="lazy"
                data-testid="img-about-hero"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/25 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
                <h1
                  className="text-balance text-4xl leading-[1.05] text-white sm:text-5xl"
                  data-testid="text-about-heading"
                >
                  The family behind the oven.
                </h1>
                <p
                  className="mt-3 max-w-[62ch] text-sm text-white/85 sm:text-base"
                  data-testid="text-about-subheading"
                >
                  {RESTAURANT.tagline}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/25 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur hover:bg-black/35"
                    data-testid="link-about-directions"
                  >
                    <MapPin className="size-3.5" aria-hidden="true" />
                    {RESTAURANT.addressLine1}
                  </a>
                  <span
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur"
                    data-testid="pill-about-founded"
                  >
                    <Clock className="size-3.5" aria-hidden="true" />
                    Serving since {RESTAURANT.founded}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-8">
              <div className="grid gap-3 sm:grid-cols-3" data-testid="grid-about-stats">
                <StatPill
                  icon={HeartHandshake}
                  label="The promise"
                  value="Treat every order like family"
                  testId="pill-about-promise"
                />
                <StatPill
                  icon={Flame}
                  label="The oven"
                  value="Wood-fired, high heat, quick bake"
                  testId="pill-about-oven"
                />
                <StatPill
                  icon={Clock}
                  label="Pick-up"
                  value="Fast, simple, and reliable"
                  testId="pill-about-pickup"
                />
              </div>

              <div className="mt-6 grid gap-4" data-testid="stack-about-story">
                <section className="rounded-3xl border bg-card p-5 shadow-sm" data-testid="card-about-story-1">
                  <p className="text-xs font-semibold text-muted-foreground">How it started</p>
                  <h2 className="mt-2 text-2xl" data-testid="text-about-story-title-1">
                    One oven. One family. One neighborhood.
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground" data-testid="text-about-story-body-1">
                    Tony built this place on a simple idea: pizza should taste like it was made by a person who cares. 
                    In the beginning, it was just a tiny storefront with a borrowed mixer and a mountain of ambition. 
                    The early days were loud, messy, and full of flour — but the oven never stopped. Tony would sleep 
                    on the flour sacks just to be ready for the 4 AM dough prep, making sure every crust was perfect 
                    before the first neighbor knocked on the door.
                  </p>
                </section>

                <section className="rounded-3xl border bg-accent p-5 shadow-sm" data-testid="card-about-story-2">
                  <p className="text-xs font-semibold text-muted-foreground">The hard year</p>
                  <h2 className="mt-2 text-2xl" data-testid="text-about-story-title-2">
                    The lights got dim. The oven stayed warm.
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground" data-testid="text-about-story-body-2">
                    There was a season when everything felt heavier — bills, repairs, long nights, and the kind of family 
                    loss you don’t really “get over.” We won’t make it graphic. Just real: the kind of hurt that shows 
                    up in the quiet after closing, when the flour dust settles and the registers are empty. We almost 
                    lost the lease, and for three months, we worked without heat just to keep the gas on for the oven.
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground" data-testid="text-about-story-body-2b">
                    And still, the next day, somebody showed up early to feed the starter, fire the oven, and keep the 
                    promise. It wasn't about the money anymore; it was about the legacy of the man who started it all 
                    and the community that refused to let us fail.
                  </p>
                </section>

                <section className="grid gap-6 sm:grid-cols-2" data-testid="section-about-values">
                  <div className="space-y-4">
                    <img
                      src={ingredientsPhoto}
                      alt="Fresh pizza ingredients"
                      className="aspect-video w-full rounded-2xl object-cover shadow-sm"
                      loading="lazy"
                    />
                    <h3 className="text-xl font-bold">The Ingredients</h3>
                    <p className="text-sm text-muted-foreground">
                      We don't cut corners. San Marzano tomatoes, fresh basil from the garden, and flour that we mill ourselves.
                      It costs more, and it takes longer, but you can taste the difference in every bite.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <img
                      src={doughPhoto}
                      alt="Hand-stretched dough"
                      className="aspect-video w-full rounded-2xl object-cover shadow-sm"
                      loading="lazy"
                    />
                    <h3 className="text-xl font-bold">The Process</h3>
                    <p className="text-sm text-muted-foreground">
                      Our dough ferments for 48 hours. It's a living thing that needs attention, patience, and a little bit of love.
                      By the time it hits the oven, it's light, airy, and full of flavor.
                    </p>
                  </div>
                </section>

                <div className="relative overflow-hidden rounded-3xl border bg-card shadow-sm">
                  <img
                    src={chefOvenPhoto}
                    alt="Chef at the oven"
                    className="aspect-video w-full object-cover sm:aspect-[21/9]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <p className="text-lg font-serif italic">"If it's not perfect, it doesn't leave the kitchen."</p>
                    <p className="mt-1 text-sm opacity-90">— Tony, Founder</p>
                  </div>
                </div>

                <section className="rounded-3xl border bg-card p-6 shadow-sm" data-testid="section-about-atmosphere">
                  <div className="flex flex-col gap-6 md:flex-row md:items-center">
                    <div className="md:w-1/2">
                      <h2 className="text-2xl font-bold">A Place for the Community</h2>
                      <p className="mt-3 text-sm text-muted-foreground">
                        We built this shop to be more than just a place to get food. It's a place where neighbors meet, 
                        where kids get their first slice, and where the air always smells like burning oak and melting mozzarella.
                      </p>
                      <p className="mt-3 text-sm text-muted-foreground">
                        Whether you're grabbing a quick lunch or bringing the whole family for dinner, we want you to feel 
                        like you're part of our story.
                      </p>
                    </div>
                    <div className="md:w-1/2">
                      <img
                        src={interiorPhoto}
                        alt="Restaurant interior"
                        className="rounded-2xl object-cover shadow-md"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </section>

                <div className="grid gap-4 sm:grid-cols-2" data-testid="grid-about-photos">
                  <div className="overflow-hidden rounded-2xl border bg-card shadow-sm sm:col-span-1">
                    <img
                      src={ingredientsPhoto}
                      alt="Fresh ingredients"
                      className="h-44 w-full object-cover"
                      loading="lazy"
                      data-testid="img-about-ingredients-grid"
                    />
                    <div className="p-4">
                      <p className="text-sm font-semibold">The source</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Fresh basil and San Marzano tomatoes.
                      </p>
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-2xl border bg-card shadow-sm sm:col-span-1">
                    <img
                      src={interiorPhoto}
                      alt="Pizza shop interior"
                      className="h-44 w-full object-cover"
                      loading="lazy"
                      data-testid="img-about-interior-grid"
                    />
                    <div className="p-4">
                      <p className="text-sm font-semibold">The atmosphere</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Warm, cozy, and always smells like pizza.
                      </p>
                    </div>
                  </div>
                </div>

                <section className="rounded-3xl border bg-card p-5 shadow-sm" data-testid="card-about-story-3">
                  <p className="text-xs font-semibold text-muted-foreground">Why we still do it</p>
                  <h2 className="mt-2 text-2xl" data-testid="text-about-story-title-3">
                    Because somebody’s night depends on it.
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground" data-testid="text-about-story-body-3">
                    A birthday. A bad day. A late shift. A team win. A quiet Friday.
                    Our job is to make the kind of food that turns a rough day into a better one.
                  </p>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2" data-testid="about-ctas">
                    <Link href="/order">
                      <Button className="h-12 w-full rounded-2xl text-base font-bold shadow-md" data-testid="button-about-order">
                        Order for pick-up
                      </Button>
                    </Link>
                    <Link href="/menu">
                      <Button variant="secondary" className="h-12 w-full rounded-2xl text-base" data-testid="button-about-menu">
                        View menu
                      </Button>
                    </Link>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="container-page py-6 text-center sm:text-left">
          <p className="text-xs text-muted-foreground" data-testid="text-about-footer">
            © {new Date().getFullYear()} {RESTAURANT.name}. Thanks for supporting local.
          </p>
        </div>
      </footer>
    </div>
  );
}
