import { Link } from "wouter";
import { ChevronLeft, Pizza, Flame, Leaf, Drumstick, GlassWater } from "lucide-react";
import { Button } from "@/components/ui/button";

const RESTAURANT = {
  name: "Tony's Pizza Shack",
};

type MenuItem = {
  id: string;
  name: string;
  description?: string;
  price: number;
  tags?: string[];
};

type MenuCategory = {
  id: string;
  title: string;
  note?: string;
  icon: React.ComponentType<{ className?: string }>;
  items: MenuItem[];
};

const MENU: MenuCategory[] = [
  {
    id: "pizzas",
    title: "Signature Pizzas",
    note: "All pizzas are 14\" wood-fired",
    icon: Pizza,
    items: [
      {
        id: "classic-pepperoni",
        name: "Classic Pepperoni",
        description: "Old-world pepperoni, mozzarella, tomato sauce.",
        price: 18,
        tags: ["popular"],
      },
      {
        id: "margherita",
        name: "Margherita",
        description: "Fresh mozzarella, basil, extra virgin olive oil.",
        price: 16,
        tags: ["vegetarian"],
      },
      {
        id: "meat-lovers",
        name: "The Meat Shack",
        description: "Pepperoni, sausage, bacon, ham.",
        price: 22,
        tags: ["popular"],
      },
      {
        id: "veggie-delight",
        name: "Garden Veggie",
        description: "Bell peppers, onions, mushrooms, olives.",
        price: 19,
        tags: ["vegetarian"],
      },
    ],
  },
  {
    id: "sides",
    title: "Sides & Wings",
    note: "Perfect pairings",
    icon: Drumstick,
    items: [
      {
        id: "garlic-knots",
        name: "Garlic Knots (6pc)",
        description: "Served with warm marinara.",
        price: 8,
      },
      {
        id: "buffalo-wings",
        name: "Spicy Buffalo Wings",
        description: "8 jumbo wings with celery & ranch.",
        price: 14,
      },
    ],
  },
  {
    id: "drinks",
    title: "Cold Drinks",
    icon: GlassWater,
    items: [
      { id: "coke", name: "Mexican Coke", price: 3.5 },
      { id: "water", name: "San Pellegrino", price: 4 },
    ],
  },
];

function PriceDot() {
  return (
    <span className="inline-block size-1.5 rounded-full bg-primary/60" aria-hidden="true" />
  );
}

function Tag({ label }: { label: string }) {
  const base =
    "inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold tracking-tight";
  if (label === "popular") {
    return (
      <span className={`${base} border-primary/20 bg-primary/10 text-primary`} data-testid="badge-popular">
        Popular
      </span>
    );
  }
  if (label === "vegetarian") {
    return (
      <span className={`${base} border-emerald-500/20 bg-emerald-500/10 text-emerald-700`} data-testid="badge-veg">
        Veg
      </span>
    );
  }
  return (
    <span className={`${base} border-border bg-muted text-muted-foreground`} data-testid={`badge-${label}`}>
      {label}
    </span>
  );
}

function CategorySection({ cat }: { cat: MenuCategory }) {
  const Icon = cat.icon;
  return (
    <section
      className="rounded-3xl border bg-card shadow-sm"
      aria-labelledby={`heading-${cat.id}`}
      data-testid={`section-category-${cat.id}`}
    >
      <div className="flex items-start justify-between gap-4 border-b p-5">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <div className="grid size-9 place-items-center rounded-2xl bg-accent text-accent-foreground">
              <Icon className="size-4" aria-hidden="true" />
            </div>
            <h2
              id={`heading-${cat.id}`}
              className="text-xl font-bold"
              data-testid={`text-category-title-${cat.id}`}
            >
              {cat.title}
            </h2>
          </div>
          {cat.note ? (
            <p
              className="mt-2 text-sm text-muted-foreground"
              data-testid={`text-category-note-${cat.id}`}
            >
              {cat.note}
            </p>
          ) : null}
        </div>
      </div>

      <div className="divide-y">
        {cat.items.map((item) => (
          <div
            key={item.id}
            className="flex items-start justify-between gap-4 p-5"
            data-testid={`row-menu-item-${item.id}`}
          >
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-base font-semibold" data-testid={`text-item-name-${item.id}`}>
                  {item.name}
                </p>
                {item.tags?.map((t) => (
                  <Tag key={t} label={t} />
                ))}
              </div>
              {item.description ? (
                <p className="mt-1 text-sm text-muted-foreground" data-testid={`text-item-desc-${item.id}`}>
                  {item.description}
                </p>
              ) : null}

              <div className="mt-3 flex items-center gap-2 text-sm" data-testid={`text-item-price-${item.id}`}>
                <PriceDot />
                <span className="font-bold text-primary">${item.price.toFixed(2)}</span>
              </div>
            </div>

            <div className="shrink-0">
              <Link href={`/order?item=${encodeURIComponent(item.id)}&from=menu`}>
                <Button
                  size="sm"
                  className="rounded-xl"
                  data-testid={`button-order-from-menu-${item.id}`}
                >
                  Order
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function MenuPage() {
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
          <p className="flex items-center gap-2 text-sm font-semibold" data-testid="text-menu-title">
            <Flame className="size-4 text-primary" aria-hidden="true" />
            Menu
          </p>
          <div className="flex items-center gap-2">
            <Link href="/about">
              <button
                type="button"
                className="text-sm font-medium text-foreground/80 hover:text-foreground"
                data-testid="link-nav-about"
              >
                About
              </button>
            </Link>
            <Link href="/contact">
              <button
                type="button"
                className="text-sm font-medium text-foreground/80 hover:text-foreground"
                data-testid="link-nav-contact"
              >
                Find Us
              </button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container-page pb-10 pt-6">
        <section className="rounded-3xl border bg-card p-5 shadow-sm sm:p-8" data-testid="card-menu-hero">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-[62ch]">
              <h1 className="text-3xl font-bold sm:text-4xl" data-testid="text-menu-heading">
                Tony's Menu
              </h1>
              <p className="mt-2 text-base text-muted-foreground" data-testid="text-menu-subheading">
                A clean, easy-to-read menu for the site. Ordering happens on the Order page.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground" data-testid="text-menu-disclaimer">
                <span className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1">
                  <span className="inline-flex size-6 items-center justify-center rounded-full bg-accent">
                    <Leaf className="size-3" aria-hidden="true" />
                  </span>
                  Veg options marked
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1">
                  <span className="inline-flex size-6 items-center justify-center rounded-full bg-accent">
                    <Flame className="size-3" aria-hidden="true" />
                  </span>
                  Wood-fired style
                </span>
              </div>
            </div>

            <div className="shrink-0">
              <Link href="/order?from=menu">
                <Button className="h-11 rounded-2xl px-5 font-bold shadow-md" data-testid="button-menu-cta-order">
                  Order for pick-up
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <div className="mt-6 grid gap-4" data-testid="grid-menu-categories">
          {MENU.map((cat) => (
            <CategorySection key={cat.id} cat={cat} />
          ))}
        </div>

        <section className="mt-8 rounded-3xl border bg-card p-5 text-sm text-muted-foreground shadow-sm" data-testid="card-menu-footer">
          <p>
            Prices shown are for the website menu display. For customizations (sizes, toppings) please use the Order page.
          </p>
        </section>
      </main>

      <footer className="pb-8">
        <div className="container-page py-6">
          <p className="text-center text-xs text-muted-foreground" data-testid="text-menu-footer">
            • {RESTAURANT.name} • Wood-fired pies •
          </p>
        </div>
      </footer>
    </div>
  );
}
