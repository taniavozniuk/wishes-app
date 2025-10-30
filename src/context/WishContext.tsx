import { createContext } from "react";
import type { WishContextType } from "../types/WishContextType";

export const WishContext = createContext<WishContextType | null>(null);
