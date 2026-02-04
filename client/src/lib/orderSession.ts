type OrderMode = "pickup" | "delivery";

type PizzaCustomization = {
  sizeId: string;
  toppingIds: string[];
};

type MenuItem = {
  id: string;
  name: string;
  description?: string;
  price: number;
};

type LineItem =
  | {
      kind: "pizza";
      data: {
        id: string;
        base: MenuItem;
        quantity: number;
        customization: PizzaCustomization;
      };
    }
  | {
      kind: "other";
      data: {
        id: string;
        item: MenuItem;
        quantity: number;
      };
    };

type OrderSession = {
  version: 1;
  updatedAt: number;
  mode: OrderMode;
  lineItems: LineItem[];
  notes: string;
};

const STORAGE_KEY = "pizza-order-session:v1";
const TTL_MS = 2 * 60 * 60 * 1000;

function now() {
  return Date.now();
}

export function loadOrderSession(): OrderSession | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as OrderSession;
    if (!parsed || parsed.version !== 1) return null;
    if (typeof parsed.updatedAt !== "number") return null;

    if (now() - parsed.updatedAt > TTL_MS) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }

    if (!Array.isArray(parsed.lineItems)) return null;
    if (typeof parsed.mode !== "string") return null;
    if (typeof parsed.notes !== "string") return null;

    return parsed;
  } catch {
    return null;
  }
}

export function saveOrderSession(input: Omit<OrderSession, "version" | "updatedAt">) {
  const session: OrderSession = {
    version: 1,
    updatedAt: now(),
    ...input,
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } catch {
    // ignore storage errors
  }
}

export function clearOrderSession() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
