import { createContext, useContext, useState, useEffect } from "react";

export interface DateRangeType {
  from: Date | null;
  to: Date | null;
}

const DateContext = createContext<any>(null);

export const DateProvider = ({ children }) => {


  // (GLOBAL DEFAULT SET)
  // useEffect(() => {
  //   if (!globalRange.from && !globalRange.to) {
  //     // const to = new Date();
  //     // const from = new Date();
  //     // from.setDate(to.getDate() - 6);


  //     const now = new Date();
  //     const from = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  //     const to = new Date(now.getFullYear(), now.getMonth(), 0);

  //     setGlobalRange({ from, to });
  //   }
  // }, []);

  const getDefaultRange = () => {
    // const now = new Date();
    // const from = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    // const to = new Date(now.getFullYear(), now.getMonth(), 0);

    const to = new Date();
    const from = new Date();
    from.setDate(to.getDate() - 6);
    return { from, to };
  };

const [globalRange, setGlobalRange] = useState(getDefaultRange);

  return (
    <DateContext.Provider value={{ globalRange, setGlobalRange }}>
      {children}
    </DateContext.Provider>
  );
};

export const useDateContext = () => useContext(DateContext);