// /config/permissions.ts
export const RolePermissions = {
  master: ["home", "productivity", "users", "transactions", "labels", "download", "logout"],
  checker: ["home", "productivity", "reqLabels", "logout"],
  viewer: ["home", "manageLabels", "logout"],
} as const;

export type Role = keyof typeof RolePermissions;
