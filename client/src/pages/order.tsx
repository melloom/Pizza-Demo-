import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import {
  ChevronLeft,
  ShoppingCart,
  Pizza,
  Plus,
  Minus,
  Check,
  Flame,
  Sparkles,
  Clock,
  Store,
  ArrowRight,
} from "lucide-react";
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
import heroPizza from "@/assets/pizza-oven.png";
import {
  clearOrderSession,
  loadOrderSession,
  saveOrderSession,
} from "@/lib/orderSession";

const RESTAURANT = {
  name: "Tony's Pizza Shack",
  pickupEta: "~20 min pickup",
  note: "Prices are placeholders. No payment—this is a demo checkout flow.",
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
    note: 'All pizzas are 14" wood-fired',
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

type OrderMode = "pickup" | "delivery";

type Topping = {
  id: string;
  name: string;
  price: number;
};

type Size = {
  id: string;
  name: string;
  priceDelta: number;
};

type PizzaCustomization = {
  sizeId: string;
  toppingIds: string[];
};

type PizzaLineItem = {
  id: string;
  base: MenuItem;
  quantity: number;
  customization: PizzaCustomization;
};

type OtherLineItem = {
  id: string;
  item: MenuItem;
  quantity: number;
};

type LineItem =
  | { kind: "pizza"; data: PizzaLineItem }
  | { kind: "other"; data: OtherLineItem };

const SIZES: Size[] = [
  { id: "sm", name: 'Small (12")', priceDelta: -2 },
  { id: "md", name: 'Medium (14")', priceDelta: 0 },
  { id: "lg", name: 'Large (16")', priceDelta: 4 },
];

const TOPPINGS: Topping[] = [
  { id: "extra-cheese", name: "Extra Cheese", price: 2 },
  { id: "mushrooms", name: "Mushrooms", price: 2 },
  { id: "pepperoni", name: "Pepperoni", price: 3 },
  { id: "sausage", name: "Sausage", price: 3 },
  { id: "jalapeno", name: "Jalapeño", price: 1.5 },
  { id: "basil", name: "Basil", price: 1 },
];

function money(n: number) {
  return n.toFixed(2);
}

function makePizzaKey(baseId: string, c: PizzaCustomization) {
  const toppings = [...c.toppingIds].sort().join(",");
  return `${baseId}|${c.sizeId}|${toppings}`;
}

function ItemBadge({
  icon: Icon,
  text,
}: {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
}) {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/30 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur">
      <Icon className="size-3.5" />
      {text}
    </div>
  );
}

function QuantityPill({
  quantity,
  onDec,
  onInc,
  decTestId,
  incTestId,
  qtyTestId,
}: {
  quantity: number;
  onDec: () => void;
  onInc: () => void;
  decTestId: string;
  incTestId: string;
  qtyTestId: string;
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-xl border bg-background px-2 py-1">
      <button
        type="button"
        onClick={onDec}
        className="grid size-8 place-items-center rounded-lg border bg-card hover:bg-muted"
        data-testid={decTestId}
        aria-label="Decrease quantity"
      >
        <Minus className="size-4" aria-hidden="true" />
      </button>
      <span
        className="min-w-6 text-center text-sm font-bold tabular-nums"
        data-testid={qtyTestId}
      >
        {quantity}
      </span>
      <button
        type="button"
        onClick={onInc}
        className="grid size-8 place-items-center rounded-lg border bg-card hover:bg-muted"
        data-testid={incTestId}
        aria-label="Increase quantity"
      >
        <Plus className="size-4" aria-hidden="true" />
      </button>
    </div>
  );
}

export default function OrderPage() {
  const [mode, setMode] = useState<OrderMode>("pickup");
  const [lineItems, setLineItems] = useState<LineItem[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderStatus, setOrderStatus] = useState<"idle" | "processing" | "success">(
    "idle",
  );
  const [notes, setNotes] = useState("");
  const [restored, setRestored] = useState(false);

  const pizzas = useMemo(() => MENU.find((c) => c.id === "pizzas")?.items ?? [], []);

  useEffect(() => {
    const session = loadOrderSession();
    if (!session) {
      setRestored(true);
      return;
    }

    setMode(session.mode);
    setLineItems(session.lineItems as LineItem[]);
    setNotes(session.notes);
    setRestored(true);
  }, []);

  useEffect(() => {
    if (!restored) return;

    if (lineItems.length === 0 && notes.trim().length === 0) {
      saveOrderSession({ mode, lineItems, notes: "" });
      return;
    }

    saveOrderSession({ mode, lineItems, notes });
  }, [mode, lineItems, notes, restored]);

  const subtotal = useMemo(() => {
    return lineItems.reduce((acc, li) => {
      if (li.kind === "other") {
        return acc + li.data.item.price * li.data.quantity;
      }
      const sizeDelta = SIZES.find((s) => s.id === li.data.customization.sizeId)
        ?.priceDelta ?? 0;
      const toppingsTotal = li.data.customization.toppingIds.reduce((tAcc, tId) => {
        const t = TOPPINGS.find((x) => x.id === tId);
        return tAcc + (t?.price ?? 0);
      }, 0);
      const unit = li.data.base.price + sizeDelta + toppingsTotal;
      return acc + unit * li.data.quantity;
    }, 0);
  }, [lineItems]);

  const tax = useMemo(() => subtotal * 0.08, [subtotal]);
  const total = useMemo(() => subtotal + tax, [subtotal, tax]);

  const totalCount = useMemo(() => {
    return lineItems.reduce(
      (acc, li) => acc + (li.kind === "other" ? li.data.quantity : li.data.quantity),
      0,
    );
  }, [lineItems]);

  const upsertPizza = (base: MenuItem, customization: PizzaCustomization) => {
    setLineItems((prev) => {
      const key = makePizzaKey(base.id, customization);
      const idx = prev.findIndex(
        (li) =>
          li.kind === "pizza" &&
          makePizzaKey(li.data.base.id, li.data.customization) === key,
      );
      if (idx >= 0) {
        const copy = [...prev];
        const existing = copy[idx];
        if (existing.kind === "pizza") {
          copy[idx] = {
            kind: "pizza",
            data: { ...existing.data, quantity: existing.data.quantity + 1 },
          };
        }
        return copy;
      }
      return [
        ...prev,
        { kind: "pizza", data: { id: key, base, quantity: 1, customization } },
      ];
    });
  };

  const addOther = (item: MenuItem) => {
    setLineItems((prev) => {
      const idx = prev.findIndex(
        (li) => li.kind === "other" && li.data.item.id === item.id,
      );
      if (idx >= 0) {
        const copy = [...prev];
        const existing = copy[idx];
        if (existing.kind === "other") {
          copy[idx] = {
            kind: "other",
            data: { ...existing.data, quantity: existing.data.quantity + 1 },
          };
        }
        return copy;
      }
      return [...prev, { kind: "other", data: { id: item.id, item, quantity: 1 } }];
    });
  };

  const decLine = (id: string) => {
    setLineItems((prev) => {
      return prev
        .map((li) => {
          if (li.kind === "pizza" && li.data.id === id) {
            return {
              kind: "pizza",
              data: { ...li.data, quantity: Math.max(0, li.data.quantity - 1) },
            } as LineItem;
          }
          if (li.kind === "other" && li.data.id === id) {
            return {
              kind: "other",
              data: { ...li.data, quantity: Math.max(0, li.data.quantity - 1) },
            } as LineItem;
          }
          return li;
        })
        .filter((li) => (li.kind === "pizza" ? li.data.quantity > 0 : li.data.quantity > 0));
    });
  };

  const incLine = (id: string) => {
    setLineItems((prev) => {
      return prev.map((li) => {
        if (li.kind === "pizza" && li.data.id === id) {
          return { kind: "pizza", data: { ...li.data, quantity: li.data.quantity + 1 } };
        }
        if (li.kind === "other" && li.data.id === id) {
          return { kind: "other", data: { ...li.data, quantity: li.data.quantity + 1 } };
        }
        return li;
      });
    });
  };

  const clearCart = () => {
    setLineItems([]);
    setNotes("");
    clearOrderSession();
  };

  const handleCheckout = () => {
    setOrderStatus("processing");
    setTimeout(() => {
      setOrderStatus("success");
      clearCart();
    }, 1400);
  };

  const summaryLines = useMemo(() => {
    return lineItems.map((li) => {
      if (li.kind === "other") {
        return {
          id: li.data.id,
          title: li.data.item.name,
          subtitle: "",
          qty: li.data.quantity,
        };
      }
      const size = SIZES.find((s) => s.id === li.data.customization.sizeId)?.name ?? "Medium";
      const toppings = li.data.customization.toppingIds
        .map((id) => TOPPINGS.find((t) => t.id === id)?.name)
        .filter(Boolean)
        .join(", ");
      return {
        id: li.data.id,
        title: li.data.base.name,
        subtitle: toppings ? `${size} • ${toppings}` : size,
        qty: li.data.quantity,
      };
    });
  }, [lineItems]);

  if (orderStatus === "success") {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center p-6 text-center">
        <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
          <Check className="size-10" aria-hidden="true" />
        </div>
        <h1 className="text-3xl font-bold">Order received!</h1>
        <p className="mt-2 text-muted-foreground">
          You’re all set. This is a demo checkout—no payment processed. We’ll have it ready for
          pick-up in about 20 minutes.
        </p>
        <div className="mt-6 grid w-full max-w-sm gap-2">
          <Link href="/">
            <Button className="h-12 w-full rounded-xl" data-testid="button-success-home">
              Back to home
            </Button>
          </Link>
          <Link href="/menu">
            <Button
              variant="outline"
              className="h-12 w-full rounded-xl"
              data-testid="button-success-menu"
            >
              Keep browsing menu
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-background">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="container-page flex h-14 items-center justify-between">
          <Link href="/">
            <button
              type="button"
              className="inline-flex items-center gap-2 text-sm font-medium"
              data-testid="link-exit-order"
            >
              <ChevronLeft className="size-4" aria-hidden="true" />
              Exit
            </button>
          </Link>

          <div className="flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <Pizza className="size-4" aria-hidden="true" />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold" data-testid="text-order-title">
                Order online
              </p>
              <p className="text-xs text-muted-foreground" data-testid="text-order-subtitle">
                {RESTAURANT.pickupEta}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={clearCart}
            className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
              totalCount === 0 ? "opacity-50" : "text-foreground/80 hover:text-foreground"
            }`}
            data-testid="button-order-clear"
          >
            Clear
          </button>
        </div>
      </header>

      <main className="container-page pb-32 pt-6">
        <section className="grain overflow-hidden rounded-3xl border bg-card shadow-sm" data-testid="card-order-hero">
          <div className="relative aspect-[21/9]">
            <img
              src={heroPizza}
              alt="Wood-fired pizza coming out of the oven"
              className="h-full w-full object-cover"
              loading="lazy"
              data-testid="img-order-hero"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
              <div className="flex flex-wrap gap-2">
                <ItemBadge icon={Flame} text="Wood-fired" />
                <ItemBadge icon={Clock} text="Fast pick-up" />
                <ItemBadge icon={Store} text="Local shop" />
              </div>
              <h1 className="mt-3 text-balance text-3xl leading-tight text-white sm:text-4xl" data-testid="text-order-hero-title">
                Build your order in seconds.
              </h1>
              <p className="mt-2 max-w-[65ch] text-sm text-white/85 sm:text-base" data-testid="text-order-hero-subtitle">
                Tap a pizza to choose size + toppings. Add sides and drinks, then checkout.
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-black/25 px-3 py-2 text-xs text-white/85 backdrop-blur">
                  <Sparkles className="size-4" aria-hidden="true" />
                  {RESTAURANT.note}
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground" data-testid="text-order-kicker">
                  Step 1
                </p>
                <h2 className="mt-1 text-2xl" data-testid="text-order-section-title">
                  Choose items
                </h2>
              </div>

              <div className="inline-flex rounded-2xl border bg-card p-1" role="tablist" aria-label="Order mode">
                <button
                  type="button"
                  onClick={() => setMode("pickup")}
                  className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                    mode === "pickup"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-foreground/80 hover:text-foreground"
                  }`}
                  data-testid="tab-pickup"
                >
                  Pick-up
                </button>
                <button
                  type="button"
                  onClick={() => setMode("delivery")}
                  className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                    mode === "delivery"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-foreground/80 hover:text-foreground"
                  }`}
                  data-testid="tab-delivery"
                >
                  Delivery
                </button>
              </div>
            </div>

            {mode === "delivery" ? (
              <div className="mt-3 rounded-2xl border bg-accent p-4" data-testid="card-delivery-note">
                <p className="text-sm font-semibold">Delivery demo</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  This prototype doesn’t connect to a real delivery service yet—but you can still
                  build a cart and go through checkout.
                </p>
              </div>
            ) : null}

            <div className="mt-6 grid gap-8 md:grid-cols-[1fr_340px]">
              <div className="space-y-10">
                <section className="space-y-4" aria-label="Pizzas" data-testid="section-order-pizzas">
                  <div>
                    <h3 className="text-xl font-bold">Pizzas</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Tap to customize size + toppings.</p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {pizzas.map((p) => (
                      <Drawer key={p.id}>
                        <DrawerTrigger asChild>
                          <button
                            type="button"
                            className="group flex flex-col items-start rounded-2xl border bg-card p-4 text-left shadow-sm transition-all hover:border-primary/50 hover:shadow-md active:scale-[0.98]"
                            data-testid={`card-pizza-${p.id}`}
                          >
                            <div className="flex w-full items-start justify-between gap-3">
                              <div className="min-w-0">
                                <p className="text-base font-bold">{p.name}</p>
                                {p.description ? (
                                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{p.description}</p>
                                ) : null}
                              </div>
                              <div className="shrink-0 text-right">
                                <p className="text-sm font-bold text-primary">from ${money(p.price)}</p>
                                <div className="mt-2 inline-flex items-center gap-1 rounded-lg bg-accent px-2 py-1 text-xs font-semibold text-accent-foreground opacity-0 transition-opacity group-hover:opacity-100">
                                  <Plus className="size-3" aria-hidden="true" />
                                  Customize
                                </div>
                              </div>
                            </div>
                          </button>
                        </DrawerTrigger>

                        <DrawerContent>
                          <DrawerHeader>
                            <DrawerTitle data-testid={`text-customize-title-${p.id}`}>{p.name}</DrawerTitle>
                            <DrawerDescription data-testid={`text-customize-desc-${p.id}`}>
                              Pick a size and toppings. Then add it to your cart.
                            </DrawerDescription>
                          </DrawerHeader>

                          <PizzaCustomizer base={p} onAdd={(c) => upsertPizza(p, c)} />

                          <DrawerFooter className="border-t">
                            <DrawerClose asChild>
                              <Button
                                variant="outline"
                                className="h-12 rounded-xl"
                                data-testid={`button-close-customizer-${p.id}`}
                              >
                                Close
                              </Button>
                            </DrawerClose>
                          </DrawerFooter>
                        </DrawerContent>
                      </Drawer>
                    ))}
                  </div>
                </section>

                {MENU.filter((c) => c.id !== "pizzas").map((cat) => (
                  <section key={cat.id} className="space-y-4" data-testid={`section-order-${cat.id}`}>
                    <div>
                      <h3 className="text-xl font-bold">{cat.title}</h3>
                      {cat.note ? (
                        <p className="mt-1 text-sm text-muted-foreground">{cat.note}</p>
                      ) : null}
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      {cat.items.map((item) => (
                        <button
                          type="button"
                          key={item.id}
                          onClick={() => addOther(item)}
                          className="group flex items-start justify-between gap-4 rounded-2xl border bg-card p-4 text-left shadow-sm transition-all hover:border-primary/50 hover:shadow-md active:scale-[0.98]"
                          data-testid={`card-item-${item.id}`}
                        >
                          <div className="min-w-0">
                            <p className="text-base font-bold">{item.name}</p>
                            {item.description ? (
                              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                            ) : null}
                            <p className="mt-2 text-sm font-bold text-primary">${money(item.price)}</p>
                          </div>
                          <div className="shrink-0">
                            <div className="grid size-10 place-items-center rounded-xl border bg-background">
                              <Plus className="size-4 text-foreground" aria-hidden="true" />
                            </div>
                            <p className="mt-2 text-center text-xs font-semibold text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
                              Add
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </section>
                ))}
              </div>

              <aside className="hidden md:block">
                <div className="sticky top-20 overflow-hidden rounded-3xl border bg-card shadow-sm" data-testid="card-cart">
                  <div className="border-b p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-medium text-muted-foreground">Your cart</p>
                        <h3 className="mt-1 text-lg font-bold" data-testid="text-cart-title">
                          {totalCount === 0 ? "Start an order" : `${totalCount} item${totalCount === 1 ? "" : "s"}`}
                        </h3>
                      </div>
                      <button
                        type="button"
                        onClick={clearCart}
                        className={`rounded-xl border px-3 py-2 text-xs font-semibold transition ${
                          totalCount === 0 ? "pointer-events-none opacity-50" : "hover:bg-muted"
                        }`}
                        data-testid="button-clear-cart"
                      >
                        Clear
                      </button>
                    </div>
                  </div>

                  <div className="p-5">
                    {totalCount === 0 ? (
                      <div className="rounded-2xl border bg-accent p-4" data-testid="empty-cart">
                        <p className="text-sm font-semibold">Tap items to add them</p>
                        <p className="mt-1 text-sm text-muted-foreground">Start with a pizza, then add wings + drinks.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="max-h-[40vh] space-y-4 overflow-auto pr-1" data-testid="list-cart-items">
                          {summaryLines.map((l) => (
                            <div key={l.id} className="flex items-start justify-between gap-3">
                              <div className="min-w-0">
                                <p className="text-sm font-semibold line-clamp-1" data-testid={`text-cart-item-${l.id}`}>
                                  {l.title}
                                </p>
                                {l.subtitle ? (
                                  <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">{l.subtitle}</p>
                                ) : null}
                                <div className="mt-2">
                                  <QuantityPill
                                    quantity={l.qty}
                                    onDec={() => decLine(l.id)}
                                    onInc={() => incLine(l.id)}
                                    decTestId={`button-cart-dec-${l.id}`}
                                    incTestId={`button-cart-inc-${l.id}`}
                                    qtyTestId={`text-cart-qty-${l.id}`}
                                  />
                                </div>
                              </div>
                              <ArrowRight className="mt-2 size-4 text-muted-foreground" aria-hidden="true" />
                            </div>
                          ))}
                        </div>

                        <div className="space-y-2 border-t pt-4 text-sm" data-testid="cart-totals">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Subtotal</span>
                            <span data-testid="text-subtotal">${money(subtotal)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Tax</span>
                            <span data-testid="text-tax">${money(tax)}</span>
                          </div>
                          <div className="flex justify-between font-bold">
                            <span>Total</span>
                            <span data-testid="text-total">${money(total)}</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-muted-foreground" htmlFor="order-notes">
                            Notes (optional)
                          </label>
                          <textarea
                            id="order-notes"
                            className="min-h-20 w-full resize-none rounded-2xl border bg-background p-3 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
                            placeholder="Allergic to something? Want it extra crispy?"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            data-testid="textarea-notes"
                          />
                        </div>

                        <Button
                          className="h-12 w-full rounded-2xl text-base font-bold shadow-md"
                          onClick={handleCheckout}
                          data-testid="button-checkout-desktop"
                        >
                          <ShoppingCart className="mr-2 size-4" aria-hidden="true" />
                          Checkout
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>

      {totalCount > 0 ? (
        <div className="fixed inset-x-0 bottom-0 z-50 p-4 md:hidden">
          <Drawer open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
            <DrawerTrigger asChild>
              <Button
                className="h-14 w-full rounded-2xl text-lg font-bold shadow-xl"
                data-testid="button-mobile-view-order"
              >
                <ShoppingCart className="mr-2 size-5" aria-hidden="true" />
                View order • {totalCount} • ${money(total)}
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle data-testid="text-mobile-cart-title">Your order</DrawerTitle>
                <DrawerDescription data-testid="text-mobile-cart-subtitle">
                  Review items, adjust quantities, then place your pick-up order.
                </DrawerDescription>
              </DrawerHeader>

              <div className="max-h-[52vh] space-y-4 overflow-auto px-4 py-2" data-testid="list-mobile-cart-items">
                {summaryLines.map((l) => (
                  <div key={l.id} className="flex items-start justify-between gap-3 rounded-2xl border bg-card p-3">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold line-clamp-1">{l.title}</p>
                      {l.subtitle ? (
                        <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">{l.subtitle}</p>
                      ) : null}
                      <div className="mt-2">
                        <QuantityPill
                          quantity={l.qty}
                          onDec={() => decLine(l.id)}
                          onInc={() => incLine(l.id)}
                          decTestId={`button-mcart-dec-${l.id}`}
                          incTestId={`button-mcart-inc-${l.id}`}
                          qtyTestId={`text-mcart-qty-${l.id}`}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <DrawerFooter className="border-t">
                <div className="space-y-2 text-sm" data-testid="mobile-cart-totals">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${money(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>${money(tax)}</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${money(total)}</span>
                  </div>
                </div>

                <Button className="h-12 w-full rounded-xl" onClick={handleCheckout} data-testid="button-mobile-checkout">
                  {orderStatus === "processing" ? "Processing..." : "Place pick-up order"}
                </Button>
                <DrawerClose asChild>
                  <Button variant="outline" className="rounded-xl" data-testid="button-mobile-cancel">
                    Keep shopping
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      ) : null}

      <footer className="pb-24 md:pb-8">
        <div className="container-page py-6">
          <p className="text-center text-xs text-muted-foreground" data-testid="text-order-footer">
            • {RESTAURANT.name} • Demo online ordering •
          </p>
        </div>
      </footer>
    </div>
  );
}

function PizzaCustomizer({
  base,
  onAdd,
}: {
  base: MenuItem;
  onAdd: (c: PizzaCustomization) => void;
}) {
  const [sizeId, setSizeId] = useState<Size["id"]>("md");
  const [toppingIds, setToppingIds] = useState<string[]>([]);

  const unitPrice = useMemo(() => {
    const sizeDelta = SIZES.find((s) => s.id === sizeId)?.priceDelta ?? 0;
    const toppingsTotal = toppingIds.reduce((acc, id) => {
      const t = TOPPINGS.find((x) => x.id === id);
      return acc + (t?.price ?? 0);
    }, 0);
    return base.price + sizeDelta + toppingsTotal;
  }, [base.price, sizeId, toppingIds]);

  return (
    <div className="px-4 pb-6">
      <div className="rounded-2xl border bg-card p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm font-semibold">Starting at</p>
            <p className="mt-1 text-2xl font-bold text-primary" data-testid={`text-customize-price-${base.id}`}>
              ${money(unitPrice)}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">Price updates with size + toppings.</p>
          </div>
          <div className="grid size-10 place-items-center rounded-xl bg-accent">
            <Pizza className="size-4" aria-hidden="true" />
          </div>
        </div>

        <div className="mt-5">
          <p className="text-sm font-semibold">Size</p>
          <div className="mt-2 grid gap-2 sm:grid-cols-3">
            {SIZES.map((s) => {
              const active = s.id === sizeId;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSizeId(s.id)}
                  className={`rounded-2xl border px-3 py-3 text-left transition ${
                    active ? "border-primary/60 bg-accent shadow-sm" : "bg-background hover:bg-muted"
                  }`}
                  data-testid={`button-size-${base.id}-${s.id}`}
                >
                  <p className="text-sm font-semibold">{s.name}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {s.priceDelta === 0
                      ? "Included"
                      : s.priceDelta > 0
                        ? `+ $${money(s.priceDelta)}`
                        : `- $${money(Math.abs(s.priceDelta))}`}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-5">
          <p className="text-sm font-semibold">Toppings</p>
          <p className="mt-1 text-xs text-muted-foreground">Choose as many as you like.</p>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {TOPPINGS.map((t) => {
              const checked = toppingIds.includes(t.id);
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    setToppingIds((prev) =>
                      checked ? prev.filter((x) => x !== t.id) : [...prev, t.id],
                    );
                  }}
                  className={`flex items-center justify-between rounded-2xl border px-3 py-3 text-left transition ${
                    checked ? "border-primary/60 bg-accent" : "bg-background hover:bg-muted"
                  }`}
                  data-testid={`toggle-topping-${base.id}-${t.id}`}
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">+ ${money(t.price)}</p>
                  </div>
                  <div
                    className={`grid size-7 place-items-center rounded-full border ${
                      checked
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background"
                    }`}
                  >
                    <Check
                      className={`size-4 ${checked ? "opacity-100" : "opacity-0"}`}
                      aria-hidden="true"
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <Button
            className="h-12 flex-1 rounded-2xl text-base font-bold"
            onClick={() => onAdd({ sizeId, toppingIds })}
            data-testid={`button-add-to-cart-${base.id}`}
          >
            <Plus className="mr-2 size-4" aria-hidden="true" />
            Add to cart
          </Button>
          <Button
            variant="outline"
            className="h-12 rounded-2xl"
            onClick={() => {
              setSizeId("md");
              setToppingIds([]);
            }}
            data-testid={`button-reset-customizer-${base.id}`}
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
