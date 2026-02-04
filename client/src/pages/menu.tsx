import { Link } from "wouter";
import { ChevronLeft, ShoppingCart, Pizza } from "lucide-react";
import { Button } from "@/components/ui/button";

const RESTAURANT = {
  name: "Tony's Pizza Shack",
  onlineOrderUrl: "https://example.com/order",
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
    id: "pizzas",
    title: "Signature Pizzas",
    note: "All pizzas are 14\" wood-fired",
    items: [
      {
        id: "classic-pepperoni",
        name: "Classic Pepperoni",
        description: "Old-world pepperoni, mozzarella, tomato sauce.",
        price: "$18",
      },
      {
        id: "margherita",
        name: "Margherita",
        description: "Fresh mozzarella, basil, extra virgin olive oil.",
        price: "$16",
      },
      {
        id: "meat-lovers",
        name: "The Meat Shack",
        description: "Pepperoni, sausage, bacon, ham.",
        price: "$22",
      },
      {
        id: "veggie-delight",
        name: "Garden Veggie",
        description: "Bell peppers, onions, mushrooms, olives.",
        price: "$19",
      },
    ],
  },
  {
    id: "sides",
    title: "Sides & Wings",
    note: "Perfect pairings",
    items: [
      {
        id: "garlic-knots",
        name: "Garlic Knots (6pc)",
        description: "Served with warm marinara.",
        price: "$8",
      },
      {
        id: "buffalo-wings",
        name: "Spicy Buffalo Wings",
        description: "8 jumbo wings with celery & ranch.",
        price: "$14",
      },
    ],
  },
  {
    id: "drinks",
    title: "Cold Drinks",
    items: [
      { id: "coke", name: "Mexican Coke", price: "$3.50" },
      { id: "water", name: "San Pellegrino", price: "$4" },
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

function BottomOrderBar() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 sm:hidden">
      <div className="container-page pb-3">
        <div className="pointer-events-auto rounded-2xl border bg-primary text-primary-foreground shadow-lg">
          <a href={RESTAURANT.onlineOrderUrl} className="flex items-center justify-center gap-2 p-4">
            <ShoppingCart className="size-5" aria-hidden="true" />
            <span className="font-bold">Order Online Now</span>
          </a>
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
          <p className="flex items-center gap-2 text-sm font-semibold" data-testid="text-menu-title">
            <Pizza className="size-4 text-primary" />
            Tony's Menu
          </p>
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
      </header>

      <main className="container-page pb-24 pt-6">
        <section
          className="rounded-3xl border bg-card p-5 shadow-sm sm:p-8"
          data-testid="card-menu-hero"
        >
          <h1 className="text-3xl font-bold sm:text-4xl" data-testid="text-menu-heading">
            Hot & Fresh Menu
          </h1>
          <p
            className="mt-2 max-w-[62ch] text-base text-muted-foreground"
            data-testid="text-menu-subheading"
          >
            Hand-tossed sourdough crust, wood-fired to perfection. 
          </p>
          <div className="mt-4 flex gap-2">
            <a href={RESTAURANT.onlineOrderUrl} target="_blank" rel="noreferrer">
              <Button className="rounded-xl shadow-md">
                Order for Pick-up
              </Button>
            </a>
          </div>
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
          <p className="text-sm font-medium">Pizza Sizes</p>
          <p className="mt-1 text-sm text-muted-foreground">
            All signature pizzas come in a standard 14" size. Gluten-free crust available for +$3.
          </p>
        </section>
      </main>

      <BottomOrderBar />
    </div>
  );
}
