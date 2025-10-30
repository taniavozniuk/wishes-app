import { useContext } from "react";
import { WishContext } from "./WishContext";
import type { WishContextType } from "../types/WishContextType";

export const useWishes = (): WishContextType => {
  const context = useContext(WishContext);
  if (!context) {
    throw new Error("useWishes must be used within a WishProvider");
  }
  return context;
};
