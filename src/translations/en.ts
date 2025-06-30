export const en = {
  // Common
  loading: "Loading...",
  error: "Error",
  refresh: "Refresh",
  noData: "No data found",
  close: "Close",

  // Bills
  bills: {
    title: "Oireachtas Bills",
    loading: "Loading bills...",
    noBills: "No bills found",
    allBills: "All Bills",
    favourites: "Favourites",
    noFavourites: "No favourited bills yet",
    table: {
      billNumber: "Bill Number",
      billType: "Bill Type",
      billStatus: "Bill Status",
      sponsor: "Sponsor",
      filterByType: "Filter by Bill Type",
      allBillTypes: "All Bill Types",
      allTypes: "All Types",
      rowsPerPage: "Rows per page",
      favourite: "Favourite",
    },
    status: {
      active: "Active",
      enacted: "Enacted",
      withdrawn: "Withdrawn",
    },
    sponsor: {
      noSponsor: "No sponsor listed",
    },
    modal: {
      billDetails: "Bill Details",
      englishTab: "English",
      irishTab: "Gaeilge",
      shortTitle: "Short Title",
      longTitle: "Long Title",
      shortTitleIrish: "Teideal Gearr",
      longTitleIrish: "Teideal Fada",
      billInfo: "Bill Information",
    },
    favourite: {
      add: "Add to favourites",
      remove: "Remove from favourites",
      added: "Bill added to favourites",
      removed: "Bill removed from favourites",
    },
  },

  // Pagination
  pagination: {
    rowsPerPage: "Rows per page",
    of: "of",
  },
} as const;

export type TranslationKey = keyof typeof en;
