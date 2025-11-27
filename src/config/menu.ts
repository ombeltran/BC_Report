// /config/menu.ts
import { FiLogOut } from "react-icons/fi";
import { HiOutlineDownload } from "react-icons/hi";
import { FaUserFriends } from "react-icons/fa";
import { TiHomeOutline } from "react-icons/ti";
import { TbReportSearch } from "react-icons/tb";
import { HiOutlineIdentification } from "react-icons/hi2";

export interface MenuItem {
  label: string;
  path: string;
  icon?: React.ComponentType;
  children?: MenuItem[];
  description?: string;
}

export const AppMenu: Record<string, MenuItem> = {
  home: { label: "Home", path: "/features/home", icon: TiHomeOutline },
  productivity: { label: "Productivity", path: "/features/production/productionReport" , icon: TbReportSearch, description: "View productivity reports and statistics" },
  users: {
    label: "Users",
    path: "#",
    icon: FaUserFriends,
    children: [
      { label: "Create User", path: "/features/production/createUsers" },
      { label: "Modify User", path: "/features/production/editDeleteUsers"},
    ],
    description: "Manage application users and their roles",
  },
  transactions: {
    label: "Transactions",
    path: "#",
    icon: TbReportSearch,
    children: [
      { label: "Models", path: "/features/production/createModels" },
      { label: "Brands", path: "/features/production/createBrands" },
      { label: "Production", path: "/features/production/manageProduction" },
    ],
    description: "Manage production-related transactions",
  },
  labels:{
    label: "Labels",
    path: "#",
    icon: HiOutlineIdentification,
    children: [
      {label: "Require Labels", path: "/features/production/requireLabels"},
      {label: "Manage Labels", path: "/features/production/manageLabels"},
    ],
    description: "Manage label requirements to identify products",
  },
  logout: { label: "Logout", path: "/", icon: FiLogOut },
  download: { label: "Download", path: "/api/export", icon: HiOutlineDownload, description: "Download production reports in Excel format" },

  // This options are repeated for roles that use it alone one option
  reqLabels: { label: "Require labels", path: "/features/production/requireLabels", icon: HiOutlineIdentification },
  manageLabels: { label: "Manage labels", path: "/features/production/manageLabels", icon: HiOutlineIdentification },  
};
