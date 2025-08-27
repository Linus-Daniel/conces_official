// lib/approvalConfig.ts
export const APPROVAL_CONFIGS = {
  products: {
    endpoint: "/store/products",
    entityName: "product",
    entityNamePlural: "products",
  },
  resources: {
    endpoint: "/resources",
    entityName: "resource",
    entityNamePlural: "resources",
  },
  events: {
    endpoint: "/events",
    entityName: "event",
    entityNamePlural: "events",
  },
  testimonials: {
    endpoint: "/testimonials",
    entityName: "testimonial",
    entityNamePlural: "testimonials",
  },
} as const;

export type ApprovalEntity = keyof typeof APPROVAL_CONFIGS;
