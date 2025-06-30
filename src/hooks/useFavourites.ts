import { useState, useEffect, useCallback, useMemo } from "react";
import type { Bill } from "../types/oireachtas";

export const useFavourites = () => {
  const [favourites, setFavourites] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem("favourite-bills");
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    localStorage.setItem(
      "favourite-bills",
      JSON.stringify(Array.from(favourites))
    );
  }, [favourites]);

  const isFavourited = useCallback(
    (bill: Bill): boolean => {
      const billKey = `${bill.bill.billNo}/${bill.bill.billYear}`;
      return favourites.has(billKey);
    },
    [favourites]
  );

  const toggleFavourite = useCallback(
    async (bill: Bill) => {
      const billKey = `${bill.bill.billNo}/${bill.bill.billYear}`;
      const isCurrentlyFavourited = favourites.has(billKey);

      console.log(
        `Dispatching ${
          isCurrentlyFavourited ? "unfavourite" : "favourite"
        } request for bill ${billKey}`
      );

      setFavourites((prev) => {
        const newFavourites = new Set(prev);
        if (isCurrentlyFavourited) {
          newFavourites.delete(billKey);
        } else {
          newFavourites.add(billKey);
        }
        return newFavourites;
      });
    },
    [favourites]
  );

  const getBillFavouriteState = useCallback(
    (billKey: string): boolean => {
      return favourites.has(billKey);
    },
    [favourites]
  );

  const favouritesArray = useMemo(() => Array.from(favourites), [favourites]);

  const favouritesApi = useMemo(
    () => ({
      favourites: favouritesArray,
      isFavourited,
      toggleFavourite,
      getBillFavouriteState,
    }),
    [favouritesArray, isFavourited, toggleFavourite, getBillFavouriteState]
  );

  return favouritesApi;
};
