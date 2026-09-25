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
import { GiElectricalCrescent } from "react-icons/gi";
import { FaRegFilePowerpoint } from "react-icons/fa6";
import { MdPowerOff } from "react-icons/md";
import { GiGreenPower } from "react-icons/gi";

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
    roles: ["ADMIN"],
  },
  {
    label: "Manage Users",
    href: "/admin/manage-user",
    icon: FiUsers,
    roles: ["ADMIN"],
  },
  {
    label: "Add Zone",
    href: "/admin/distribution-infrastructure/add-zone",
    icon: GiFireZone ,
    roles: ["ADMIN"],
  },
     {
    label: "Add Substation",
    href: "/admin/distribution-infrastructure/add-substation",
    icon: MdSolarPower ,
    roles: ["ADMIN"],
  },
     {
    label: "Add Feeder",
    href: "/admin/distribution-infrastructure/add-feeder",
    icon: MdElectricBolt ,
    roles: ["ADMIN"],
  },
    {
    label: "Add Area",
    href: "/admin/distribution-infrastructure/add-area",
    icon: FaChartArea ,
    roles: ["ADMIN"],
  },
  {
    label: "Add Load Shedding Schedule",
    href: "/admin/add-load-shedding-schedule",
    icon: GiElectricalCrescent ,
    roles: ["ADMIN"],
  },
   {
    label: "Add Planned Outage",
    href: "/admin/add-planned-outage",
    icon: FaRegFilePowerpoint ,
    roles: ["ADMIN"],
  },
  // customer part
    {
    label: "Dashboard",
    href: "/customer/dashboard",
    icon: FiGrid,
    roles: ["CUSTOMER"],
  },
   {
    label: "Report Outage",
    href: "/customer/report-outage",
    icon: MdPowerOff,
    roles: ["CUSTOMER"],
  },
    {
    label: "My Outages",
    href: "/customer/my-outages",
    icon: GiGreenPower,
    roles: ["CUSTOMER"],
  },
  {
    label: "Work Orders",
    href: "/technician/dashboard",
    icon: FiTool,
    roles: ["ADMIN","CUSTOMER","TECHNICIAN"],
  },
];