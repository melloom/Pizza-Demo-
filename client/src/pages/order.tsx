import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ChevronLeft, ShoppingCart, Pizza, Plus, Minus, X, Check } from "lucide-react";
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

export default function OrderPage() {
  const [, setLocation] = useLocation();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderStatus, setOrderStatus] = useState<'idle' | 'processing' | 'success'>('idle');

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

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handleCheckout = () => {
    setOrderStatus('processing');
    setTimeout(() => {
      setOrderStatus('success');
      setCart([]);
    }, 2000);
  };

  if (orderStatus === 'success') {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center p-6 text-center">
        <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-green-100 text-green-600">
          <Check className="size-10" />
        </div>
        <h1 className="text-3xl font-bold">Order Received!</h1>
        <p className="mt-2 text-muted-foreground">
          Tony is firing up the oven. Your pizza will be ready for pick-up in 20 minutes.
        </p>
        <Button className="mt-8 rounded-xl" onClick={() => setLocation('/')}>
          Back to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-background">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="container-page flex h-14 items-center justify-between">
          <Link href="/">
            <button className="inline-flex items-center gap-2 text-sm font-medium">
              <ChevronLeft className="size-4" />
              Exit
            </button>
          </Link>
          <p className="font-semibold">Order Online</p>
          <div className="w-10" />
        </div>
      </header>

      <main className="container-page pb-32 pt-6">
        <div className="grid gap-8 md:grid-cols-[1fr_320px]">
          <div className="space-y-8">
            {MENU.map((cat) => (
              <section key={cat.id} className="space-y-4">
                <div>
                  <h2 className="text-2xl font-bold">{cat.title}</h2>
                  {cat.note && <p className="text-sm text-muted-foreground">{cat.note}</p>}
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {cat.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => addToCart(item)}
                      className="group flex flex-col items-start rounded-2xl border bg-card p-4 text-left shadow-sm transition-all hover:border-primary/50 hover:shadow-md active:scale-[0.98]"
                    >
                      <div className="flex w-full justify-between gap-2">
                        <p className="font-bold">{item.name}</p>
                        <p className="font-bold text-primary">${item.price}</p>
                      </div>
                      {item.description && (
                        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                          {item.description}
                        </p>
                      )}
                      <div className="mt-4 flex h-8 w-full items-center justify-center rounded-lg bg-accent text-xs font-bold text-accent-foreground opacity-0 transition-opacity group-hover:opacity-100">
                        <Plus className="mr-1 size-3" /> Add to Order
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <aside className="hidden md:block">
            <div className="sticky top-20 rounded-2xl border bg-card p-6 shadow-sm">
              <h3 className="text-lg font-bold">Your Order</h3>
              {cart.length === 0 ? (
                <p className="mt-4 text-sm text-muted-foreground">Select items to start your order.</p>
              ) : (
                <>
                  <div className="mt-4 max-h-[40vh] space-y-4 overflow-auto">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                          <div className="mt-1 flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="rounded-md border p-0.5 hover:bg-muted"
                            >
                              <Minus className="size-3" />
                            </button>
                            <span className="text-xs font-bold">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="rounded-md border p-0.5 hover:bg-muted"
                            >
                              <Plus className="size-3" />
                            </button>
                          </div>
                        </div>
                        <p className="text-sm font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 space-y-2 border-t pt-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                  <Button className="mt-6 w-full rounded-xl" onClick={handleCheckout}>
                    Checkout
                  </Button>
                </>
              )}
            </div>
          </aside>
        </div>
      </main>

      {/* Mobile Cart Button */}
      {cart.length > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-50 p-4 md:hidden">
          <Drawer open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
            <DrawerTrigger asChild>
              <Button className="h-14 w-full rounded-2xl text-lg font-bold shadow-xl">
                <ShoppingCart className="mr-2 size-5" />
                View Order • ${total.toFixed(2)}
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Your Order</DrawerTitle>
                <DrawerDescription>Hot & fresh from Tony's oven.</DrawerDescription>
              </DrawerHeader>
              <div className="max-h-[50vh] space-y-4 overflow-auto px-4 py-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-bold">{item.name}</p>
                      <p className="text-xs text-muted-foreground">${item.price} each</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="rounded-lg border p-1"
                      >
                        <Minus className="size-4" />
                      </button>
                      <span className="font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="rounded-lg border p-1"
                      >
                        <Plus className="size-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <DrawerFooter className="border-t">
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-muted-foreground">Total (inc. tax)</span>
                  <span className="font-bold">${total.toFixed(2)}</span>
                </div>
                <Button className="h-12 w-full rounded-xl" onClick={handleCheckout}>
                  {orderStatus === 'processing' ? 'Processing...' : 'Place Pick-up Order'}
                </Button>
                <DrawerClose asChild>
                  <Button variant="outline" className="rounded-xl">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      )}
    </div>
  );
}
