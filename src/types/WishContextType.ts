// WishContextType.ts
import type { Wishes } from "./wishes";

export type WishContextType = {
  wishes: Wishes[];
  fetchWishes: () => void;
  addWish: (wish: Omit<Wishes, "id">) => Promise<void>;
  updateWish: (id: number, wish: Omit<Wishes, "id">) => Promise<void>;
  deleteWish: (id: number) => Promise<void>;
};
