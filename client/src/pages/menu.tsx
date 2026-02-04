import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ChevronLeft, ShoppingCart, Pizza, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const RESTAURANT = {
  name: "Tony's Pizza Shack",
};

type MenuItem = {
  id: string;
  name: string;
  description?: string;
  price: number;
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
        price: 18,
      },
      {
        id: "margherita",
        name: "Margherita",
        description: "Fresh mozzarella, basil, extra virgin olive oil.",
        price: 16,
      },
      {
        id: "meat-lovers",
        name: "The Meat Shack",
        description: "Pepperoni, sausage, bacon, ham.",
        price: 22,
      },
      {
        id: "veggie-delight",
        name: "Garden Veggie",
        description: "Bell peppers, onions, mushrooms, olives.",
        price: 19,
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
    items: [
      { id: "coke", name: "Mexican Coke", price: 3.5 },
      { id: "water", name: "San Pellegrino", price: 4 },
    ],
  },
];

type CartItem = MenuItem & { quantity: number };

function CategoryBlock({ cat, onAdd }: { cat: MenuCategory, onAdd: (item: MenuItem) => void }) {
  return (
    <section
      className="rounded-2xl border bg-card shadow-sm"
      aria-labelledby={`heading-${cat.id}`}
      data-testid={`section-category-${cat.id}`}
    >
      <div className="border-b p-4">
        <h2
          id={`heading-${cat.id}`}
          className="text-xl font-bold"
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
              <p className="mt-2 font-bold text-primary">${item.price}</p>
            </div>
            <Button 
              size="sm" 
              className="shrink-0 rounded-lg"
              onClick={() => onAdd(item)}
              data-testid={`button-add-${item.id}`}
            >
              Add
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function MenuPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0) * 1.08;

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

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
          <div className="mt-4">
            <Link href="/order">
              <Button className="rounded-xl shadow-md">
                Order for Pick-up
              </Button>
            </Link>
          </div>
        </section>

        <div className="mt-6 grid gap-4">
          {MENU.map((cat) => (
            <CategoryBlock key={cat.id} cat={cat} onAdd={addToCart} />
          ))}
        </div>
      </main>

      {cart.length > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-50 p-4">
          <Link href="/order">
            <Button className="h-14 w-full rounded-2xl text-lg font-bold shadow-xl">
              <ShoppingCart className="mr-2 size-5" />
              Go to Checkout • ${total.toFixed(2)}
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
