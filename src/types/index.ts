import type { LucideIcon } from "lucide-react";

export type NavLink = {
  label: string;
  href: string;
};

export type BusinessHours = {
  days: string;
  hours: string;
};

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export type Testimonial = {
  id: string;
  author: string;
  location: string;
  rating: number;
  quote: string;
};

export type HouseZoneId = "toiture" | "combles" | "cuisine" | "cave" | "jardin";

export type HouseZone = {
  id: HouseZoneId;
  label: string;
  position: [number, number, number];
  serviceId: string;
};

export type Pest = {
  id: string;
  name: string;
  image: string;
  serviceId: string;
};
