import React, { useState, useEffect } from "react";
import { WishContext } from "./WishContext";
import { wishGet, wishPost, wishPut, wishDelete } from "../components/api/api";
import type { Wishes } from "../types/wishes";
import type { WishContextType } from "../types/WishContextType";
import { useSnackbar } from "./useSnackbar";

export const WishProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [wishes, setWishes] = useState<Wishes[]>([]);
  const { showSnackbar } = useSnackbar();
  const fetchWishes = async () => {
    const data = await wishGet();
    setWishes(data);
  };

  useEffect(() => {
    fetchWishes();
  }, []);

  const addWish = async (wish: Omit<Wishes, "id">) => {
    try {
      await wishPost(wish);
      showSnackbar("Wish added successfully", "success");
      await fetchWishes();
    } catch {
      showSnackbar("Failed to add wish", "error",);
    }
  };

  const updateWish = async (id: number, wish: Omit<Wishes, "id">) => {
    try {
      await wishPut(id, wish);
      showSnackbar("Wish updated successfully", "success");
      await fetchWishes();
    } catch {
      showSnackbar("Failed to update wish", "error");
    }
  };

  const deleteWishFn = async (id: number) => {
    try {
      await wishDelete(id);
      showSnackbar("Wish deleted successfully", "success");
      await fetchWishes();
    } catch {
      showSnackbar("Failed to delete wish", "error");
    }
  };

  const value: WishContextType = {
    wishes,
    fetchWishes,
    addWish,
    updateWish,
    deleteWish: deleteWishFn,
  };

  return <WishContext.Provider value={value}>{children}</WishContext.Provider>;
};
