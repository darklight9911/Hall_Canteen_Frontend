# Hall Canteen — Design Guidelines

The Hall Canteen UI follows **Blinkit's** (https://blinkit.com) design language: a friendly
yellow + green grocery-storefront look — generous rounding, flat subtle shadows, a rounded
humanist typeface, product cards with delivery-time badges, green "ADD" buttons, and a
yellow cart.

> The "Hall Canteen" wordmark and the `hc` mark are **original** creations in Blinkit's
> *style*. We do not use Blinkit's trademarked logo, name, or proprietary assets.

All tokens live in [`src/styles/globals.css`](src/styles/globals.css) inside the Tailwind v4
`@theme` block — that is the single source of truth. Components read semantic tokens, so the
whole site re-themes from one file. A live reference of every token and component variant is
at the **/styleguide** route (admin / dev only).

## Color tokens

| Token | Value | Use |
|-------|-------|-----|
| `brand` (yellow) | `#F8CB46` | Brand surfaces only — header cart button, accent strips, the wordmark "hall". Always pair with dark `brand-foreground`. |
| `primary` / `success` (green) | `#0C831F` | The dominant action color — solid CTA buttons, ADD buttons, focus rings, active nav, success/delivered states. |
| `info` (blue) | `#256FEF` | Discount badges (`% OFF`) and informational accents. |
| `foreground` | `#1C1C1C` | Headings and body text (not pure black). |
| `muted` | `#F7F7F8` | Page/section background so white cards pop. |
| `muted-foreground` | `#7E808C` | Secondary text — descriptions, timestamps, weights. |
| `accent` | faint yellow | Hover tint, active-nav background. |
| `border` | `#EFEFF4` | Hairline borders & dividers. |
| `destructive` | `#D7263D` | Errors, cancelled orders, destructive actions. |

**Usage rules**
- Yellow is for *brand surfaces*, never generic buttons — white text on yellow fails WCAG, so
  yellow only ever carries dark `brand-foreground` text.
- Green is the action color. If something is clickable-and-primary, it's green.
- Blue = discounts/info only. Red = destructive only.
- Backgrounds: app shell is `bg-muted` (gray); content sits on white `bg-card`.

## Typography

- Font: **Lexend** (`--font-sans`), a clean, high-legibility variable sans.
- Scale: headings `text-2xl font-extrabold`; sections `text-lg font-extrabold`; body
  `text-sm`–`text-base`; prices `font-extrabold`; muted captions `text-xs text-muted-foreground`.
- Lean on heavy weights (`font-bold` / `font-extrabold` / `font-black`) — Blinkit's look is bold.

## Radius, shadow, spacing

- Radius: `--radius-sm` 8px · `--radius-md`/default 12px · `--radius-lg` 16px · pill/`rounded-full`
  for search bar, tabs, time badges. Cards use `rounded-lg`.
- Shadows: `shadow-card` (resting), `shadow-card-hover` (hover/elevated), `shadow-header` (sticky header).
- Spacing: 4px base. Card padding ~`p-3`–`p-5`; section gaps `space-y-6`/`space-y-8`; grid `gap-4`.

## Components

- **Button** ([`ui/button.tsx`](src/components/ui/button.tsx)) — variants: `default` (green),
  `add` (white + green border, the signature ADD button), `cart` (yellow), `secondary`,
  `outline`, `ghost`, `destructive`, `link`.
- **Badge** ([`ui/badge.tsx`](src/components/ui/badge.tsx)) — `time` ("10 MINS" pill),
  `discount` (blue corner), and `success`/`warning`/`info`/`destructive`/`outline` tints.
- **MenuItemCard** ([`shared/menu-item-card.tsx`](src/components/shared/menu-item-card.tsx)) —
  the storefront card: image/emoji + time badge + optional discount badge + 2-line name + price
  (with strikethrough MRP) + ADD button that swaps to a green `Stepper`.
- **OrderStatusBadge** — maps the order lifecycle to badge variants
  (pending→warning, confirmed→info, ready→outline, delivered→success, cancelled→destructive).
- Layout shell: `Header` (logo · location · pill search · cart), `Sidebar` (green active state),
  `Footer` (link columns + yellow strip).

## Conventions

- Server Components by default; `"use client"` only for interactivity (cart, tabs, header, forms).
- Gate values from the persisted auth store behind `useMounted()` to avoid hydration mismatches.
- Add new colors as `--color-*` in the `@theme` block (never hardcode hex in components) so
  Tailwind generates the full utility set and the token stays themeable.
