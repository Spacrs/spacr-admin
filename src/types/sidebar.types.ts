import { ReactNode } from "react";

  export type SubMenuItem = {
    label: string;
    path: string;
    icon: ReactNode;
  };

  export type MenuItem = {
    label: string;
    path?:string;
    isSubmenu?: boolean;
    icon: ReactNode;
    subItems?: SubMenuItem[];
  };