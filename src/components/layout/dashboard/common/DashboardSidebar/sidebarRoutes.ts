import {
  FiGrid,
  FiTool,
  FiUsers,
} from "react-icons/fi";
import type { IconType } from "react-icons";

export type SidebarRoute = {
  label: string;
  href: string;
  icon: IconType;
  roles: string[];
};

export const sidebarRoutes: SidebarRoute[] = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: FiGrid,
  roles: ["ADMIN","CUSTOMER","TECHNICIAN"],
  },
  {
    label: "Manage Users",
    href: "/admin/manage-user",
    icon: FiUsers,
    roles: ["ADMIN","CUSTOMER","TECHNICIAN"],
  },
  {
    label: "My Dashboard",
    href: "/customer/dashboard",
    icon: FiGrid,
  roles: ["ADMIN","CUSTOMER","TECHNICIAN"],
  },
  {
    label: "Work Orders",
    href: "/technician/dashboard",
    icon: FiTool,
  roles: ["ADMIN","CUSTOMER","TECHNICIAN"],
  },
];