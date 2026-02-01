import { Link } from "wouter";
import { ChevronLeft, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const RESTAURANT = {
  name: "Maple & Main Kitchen",
  phoneE164: "+15551234567",
};

type MenuItem = {
  id: string;
  name: string;
  description?: string;
  price: string;
};

type MenuCategory = {
  id: string;
  title: string;
  note?: string;
  items: MenuItem[];
};

const MENU: MenuCategory[] = [
  {
    id: "apps",
    title: "Appetizers",
    note: "Great for sharing",
    items: [
      {
        id: "crispy-pickles",
        name: "Crispy Pickles",
        description: "Buttermilk batter, house ranch.",
        price: "$7",
      },
      {
        id: "soup-day",
        name: "Soup of the Day",
        description: "Ask what’s simmering today.",
        price: "$6",
      },
      {
        id: "garlic-bread",
        name: "Garlic Bread",
        description: "Toasted baguette, herb butter.",
        price: "$5",
      },
    ],
  },
  {
    id: "mains",
    title: "Mains",
    note: "Comforting classics",
    items: [
      {
        id: "burger",
        name: "Maple Burger",
        description: "Cheddar, lettuce, tomato, maple-onion jam.",
        price: "$14",
      },
      {
        id: "chicken-sandwich",
        name: "Crispy Chicken Sandwich",
        description: "Pickles, slaw, spicy mayo.",
        price: "$13",
      },
      {
        id: "pasta",
        name: "Weeknight Pasta",
        description: "Seasonal veggies, garlic, parmesan.",
        price: "$15",
      },
    ],
  },
  {
    id: "drinks",
    title: "Drinks",
    note: "Cold + refreshing",
    items: [
      { id: "iced-tea", name: "Iced Tea", price: "$3" },
      { id: "lemonade", name: "House Lemonade", price: "$4" },
      { id: "soda", name: "Soda", price: "$3" },
    ],
  },
];

function CategoryBlock({ cat }: { cat: MenuCategory }) {
  return (
    <section
      className="rounded-2xl border bg-card shadow-sm"
      aria-labelledby={`heading-${cat.id}`}
      data-testid={`section-category-${cat.id}`}
    >
      <div className="border-b p-4">
        <h2
          id={`heading-${cat.id}`}
          className="text-xl"
          data-testid={`text-category-title-${cat.id}`}
        >
          {cat.title}
        </h2>
        {cat.note ? (
          <p
            className="mt-1 text-sm text-muted-foreground"
            data-testid={`text-category-note-${cat.id}`}
          >
            {cat.note}
          </p>
        ) : null}
      </div>

      <div className="divide-y">
        {cat.items.map((item) => (
          <div
            key={item.id}
            className="flex items-start justify-between gap-4 p-4"
            data-testid={`row-menu-item-${item.id}`}
          >
            <div className="min-w-0">
              <p
                className="text-base font-semibold"
                data-testid={`text-item-name-${item.id}`}
              >
                {item.name}
              </p>
              {item.description ? (
                <p
                  className="mt-1 text-sm text-muted-foreground"
                  data-testid={`text-item-desc-${item.id}`}
                >
                  {item.description}
                </p>
              ) : null}
            </div>
            <p
              className="shrink-0 text-base font-semibold tabular-nums"
              data-testid={`text-item-price-${item.id}`}
            >
              {item.price}
            </p>
          </div>
        ))}
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
              <p className="text-sm font-semibold" data-testid="text-bottombar-title">
                Need to place an order?
              </p>
              <p
                className="text-xs text-muted-foreground"
                data-testid="text-bottombar-subtitle"
              >
                Call for takeout and specials
              </p>
            </div>
            <a href={`tel:${RESTAURANT.phoneE164}`} className="ml-auto">
              <Button
                data-testid="button-bottom-call"
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
          <p className="text-sm font-semibold" data-testid="text-menu-title">
            Menu
          </p>
          <Link href="/contact">
            <button
              type="button"
              className="text-sm font-medium text-foreground/80 hover:text-foreground"
              data-testid="link-nav-contact"
            >
              Contact
            </button>
          </Link>
        </div>
      </header>

      <main className="container-page pb-24 pt-6">
        <section
          className="rounded-3xl border bg-card p-5 shadow-sm sm:p-8"
          data-testid="card-menu-hero"
        >
          <h1 className="text-3xl sm:text-4xl" data-testid="text-menu-heading">
            {RESTAURANT.name} Menu
          </h1>
          <p
            className="mt-2 max-w-[62ch] text-base text-muted-foreground"
            data-testid="text-menu-subheading"
          >
            Simple, readable, and made for phones. Prices and items are placeholders—swap
            in your real menu anytime.
          </p>
        </section>

        <div className="mt-6 grid gap-4">
          {MENU.map((cat) => (
            <CategoryBlock key={cat.id} cat={cat} />
          ))}
        </div>

        <section
          className="mt-6 rounded-2xl border bg-accent p-4"
          data-testid="card-menu-note"
        >
          <p className="text-sm font-medium">Dietary notes</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Ask about gluten-free or vegetarian options—we’re happy to help.
          </p>
        </section>
      </main>

      <BottomCallBar />

      <footer className="border-t">
        <div className="container-page py-6">
          <p className="text-xs text-muted-foreground" data-testid="text-footer">
            Menu items and prices are subject to change.
          </p>
        </div>
      </footer>
    </div>
  );
}
