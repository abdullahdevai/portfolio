import { Globe, LayoutTemplate, PanelsTopLeft, ShoppingBag, PenTool, Plug, type LucideIcon } from 'lucide-react'

export interface Service {
  id: number
  title: string
  description: string
  icon: LucideIcon
  /** Hue used for the preview visual that appears on hover. */
  hue: number
}

export const services: Service[] = [
  { id: 1, title: 'Web Development', description: 'Fast, maintainable websites and web apps built with modern tooling and a performance budget from day one.', icon: Globe, hue: 250 },
  { id: 2, title: 'Frontend Development', description: 'Component-driven React and Vue interfaces with clean state management, motion and accessibility built in.', icon: LayoutTemplate, hue: 265 },
  { id: 3, title: 'Admin Dashboard Development', description: 'Data-heavy admin panels: tables, filters, permissions, charts and workflows that teams use every day.', icon: PanelsTopLeft, hue: 235 },
  { id: 4, title: 'E-Commerce Development', description: 'Storefronts and checkouts optimised for conversion, with merchant tools that keep operations simple.', icon: ShoppingBag, hue: 280 },
  { id: 5, title: 'UI Implementation', description: 'Pixel-accurate implementation of Figma designs, design systems and responsive layouts.', icon: PenTool, hue: 220 },
  { id: 6, title: 'API Integration', description: 'Reliable integrations with REST and GraphQL APIs, payments, auth providers and third-party services.', icon: Plug, hue: 255 },
]
