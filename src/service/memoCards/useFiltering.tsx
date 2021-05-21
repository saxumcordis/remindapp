import React, { createContext, useContext, useState } from "react";
import { noop } from "../utils/noop";

export enum EFilter {
  createdTs = "createdTs",
  priority = "priority",
  deadline = "deadline",
}

export enum EFilterOrder {
  ASC,
  DESC,
}

type TFilteringContext = {
  filter: EFilter;
  showPriority: boolean;
  filterOrder: EFilterOrder;
  setFilter: (filter: EFilter) => void;
  setFilterOrder: (filterOrder: EFilterOrder) => void;
  setShowPriority: (value: boolean) => void;
};

export const DEFAULT_FILTERING: TFilteringContext = {
  filter: EFilter.createdTs,
  showPriority: false,
  filterOrder: EFilterOrder.DESC,
  setFilter: noop,
  setFilterOrder: noop,
  setShowPriority: noop,
};

const FilteringContext = createContext<TFilteringContext>(DEFAULT_FILTERING);

export const useFiltering = () => useContext(FilteringContext);

export const FilteringContextProvider: React.FC = ({ children }) => {
  const [filter, setFilter] = useState<EFilter>(EFilter.createdTs);

  const [filterOrder, setFilterOrder] = useState<EFilterOrder>(
    EFilterOrder.DESC
  );

  const [showPriority, setShowPriority] = useState<boolean>(false);

  const value = {
    filter,
    showPriority,
    filterOrder,
    setFilter,
    setFilterOrder,
    setShowPriority,
  };
  return (
    <FilteringContext.Provider value={value}>
      {children}
    </FilteringContext.Provider>
  );
};
