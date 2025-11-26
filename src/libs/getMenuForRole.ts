// /libs/getMenuForRole.ts
import { AppMenu, MenuItem } from "@/config/menu";
import { Role, RolePermissions } from "@/config/permissions";

export function getMenuForRole(role: Role): MenuItem[] {
  const allowedKeys = RolePermissions[role];
  return allowedKeys.map(key => AppMenu[key]);
}
