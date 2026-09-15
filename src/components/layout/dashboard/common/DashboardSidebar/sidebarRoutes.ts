import {
  FiGrid,
  FiTool,
  FiUsers,
} from "react-icons/fi";
import type { IconType } from "react-icons";
import { GiFireZone } from "react-icons/gi";
import { FaChartArea } from "react-icons/fa";
import { MdElectricBolt } from "react-icons/md";
import { MdSolarPower } from "react-icons/md";

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
    label: "Add Zone",
    href: "/admin/add-zone",
    icon: GiFireZone ,
    roles: ["ADMIN"],
  },
     {
    label: "Add Substation",
    href: "/admin/add-substation",
    icon: MdSolarPower ,
    roles: ["ADMIN"],
  },
     {
    label: "Add Feeder",
    href: "/admin/add-feeder",
    icon: MdElectricBolt ,
    roles: ["ADMIN"],
  },
    {
    label: "Add Area",
    href: "/admin/add-area",
    icon: FaChartArea ,
    roles: ["ADMIN"],
  },
 
  {
    label: "Work Orders",
    href: "/technician/dashboard",
    icon: FiTool,
    roles: ["ADMIN","CUSTOMER","TECHNICIAN"],
  },
];