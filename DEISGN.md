# StylePrint Design Guide

This guide captures the StylePrint visual language so it can be reused across new screens and generated UI. The tone is a work-focused design tool: a light frosted header, cool gray surfaces, white panels, and vivid pink as the emphasis color (gradients reserved for the page wash, CTAs, and accents). Navy is kept for dark mode and high-emphasis chrome.

## Design Direction

- Use a light, frosted header (translucent white over the page) with centered nav; emphasize nav text with the pink point color rather than a dark band. Reserve navy-to-slate for dark mode and high-emphasis containers.
- Use soft gray page backgrounds and white panels for the working surface, with an emphasized pink wash behind hero content.
- Use pink as the primary action and emphasis color; let the gradient pink read strongly in the page wash, CTAs, and the active nav accent.
- Use gradients for emphasis: headers, primary buttons, progress, active steps, and preview chrome.
- Keep the UI dense and operational. Avoid landing-page hero layouts, oversized decorative cards, or purely ornamental blobs.
- Prefer crisp 8px radius cards and controls. Large rounded pills are reserved for badges and status chips.

## Palette

| Role | Hex | Usage |
| --- | --- | --- |
| Ink / Navy | `#151826` | App header, preview chrome, selected tab, strong badge |
| Ink Text | `#111827` | Main text on light surfaces |
| Slate Text | `#64748b` | Secondary descriptions, helper text |
| Page | `#f6f7fb` | App background base |
| Panel | `#ffffff` | Cards, modals, form panels |
| Line | `#dbe2ea` | Borders, dividers, preview grid |
| Pink | `#ff5c7a` | Primary accents, active state, key icons |
| Pink Strong | `#ff4267` | Primary gradient start, CTA emphasis |
| Blue | `#2563eb` | Supporting gradient/status accent |
| Mint | `#3ddc97` | Fresh status accent (replaces the old green) |
| Amber | `#f59e0b` | Warning/progress accent |

## CSS Tokens

Use these as the shared Tailwind/shadcn theme values.

```css
:root {
  --background: 225 38% 97%;
  --foreground: 220 39% 11%;
  --card: 0 0% 100%;
  --card-foreground: 220 39% 11%;
  --popover: 0 0% 100%;
  --popover-foreground: 220 39% 11%;
  --primary: 347 100% 63%;
  --primary-foreground: 210 40% 98%;
  --secondary: 214 32% 93%;
  --secondary-foreground: 220 39% 11%;
  --muted: 210 40% 96%;
  --muted-foreground: 215 19% 42%;
  --accent: 345 100% 95%;
  --accent-foreground: 345 80% 39%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  --border: 211 36% 89%;
  --input: 211 36% 89%;
  --ring: 347 100% 63%;
  --radius: 0.5rem;
}
```

## Gradients

Use gradients sparingly and consistently.

```css
/* Page background — pink emphasized (radial top wash + diagonal tint) */
background:
  radial-gradient(900px circle at 50% -8%, rgba(255, 66, 103, 0.2), transparent 60%),
  linear-gradient(135deg, rgba(255, 92, 122, 0.16), transparent 34%),
  linear-gradient(180deg, #f6f7fb 0%, #f8fafc 46%, #ffffff 100%);

/* Primary CTA */
background: linear-gradient(135deg, #ff4267, #ff5c7a);

/* Dark chrome (reserved for dark mode + high-emphasis containers) */
background: linear-gradient(135deg, #151826, #1f2937);

/* Multi-status accent (pink → blue → mint → amber) */
background: linear-gradient(90deg, #ff4267, #2563eb, #3ddc97, #f59e0b);

/* Light panel accent */
background: linear-gradient(135deg, #ffffff, #fff7fa);
```

## Typography

- Use the existing Tailwind/system sans stack for the product UI. It keeps Korean and English text stable across macOS and browsers.
- Use Inter (with a Korean fallback) for an approachable, humanist feel.
- Main heading: `text-4xl` to `text-5xl`, editorial weight `700` (not black), `leading-tight`.
- Card title: weight `600`; `text-2xl` only for major panels, compact cards `text-base`/`text-lg`.
- Body copy: weight `400`, `text-sm` or `text-base`, `leading-6` for descriptions.
- Helper text: `text-xs` to `text-sm`, muted slate color.
- Apply slight negative letter spacing on large headings that scales with size (≈ -0.03em at display, easing to `0` at body sizes). Keep body tracking at `0`.
- Prefer `text-balance` for short headings that wrap across two lines.

## Spacing

Use an 8px rhythm with Tailwind defaults.

| Purpose | Tailwind | Pixels |
| --- | --- | --- |
| Tiny gap | `gap-1`, `p-1` | 4px |
| Compact controls | `gap-2`, `px-2` | 8px |
| Card internals | `gap-3`, `p-3` | 12px |
| Default layout | `gap-4`, `p-4` | 16px |
| Section spacing | `gap-6`, `p-6` | 24px |
| Page padding | `py-8`, `px-4` | 32px / 16px |

Guidelines:

- Use `p-6` for main cards and `p-3` or `p-4` for compact cards.
- Use `gap-6` between major page columns.
- Use `gap-2` inside controls and status rows.
- Keep fixed-format UI stable with explicit heights: buttons `h-8`, `h-10`, `h-11`; preview `h-[620px]`.

## Surfaces

Main app surfaces should look like white working panels over a soft gray page.

```css
.app-surface {
  border-radius: 8px;
  border: 1px solid #dbe2ea;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.08);
}

.interactive-card {
  transition: all 300ms ease;
}

@media (hover: hover) {
  .interactive-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 22px 55px rgba(15, 23, 42, 0.12);
  }
}
```

Use cards for repeated content, panels, preview wrappers, and compact analysis blocks. Do not nest cards inside cards unless the inner card is a real repeated item.

## Buttons

Primary buttons use the pink gradient and should be reserved for the main next action.

```tsx
className="bg-[linear-gradient(135deg,#ff4267,#ff5c7a)] text-primary-foreground shadow-accent hover:brightness-105 active:translate-y-px"
```

Button rules:

- Primary: main action only, usually one per panel.
- Outline: secondary actions and feedback controls.
- Ghost icon button: toolbar actions like zoom, close, delete.
- Use lucide icons for tool actions.
- Disabled buttons should not move on hover or press.

## Preview Chrome

Generated preview areas use a dark browser-like toolbar and a light grid canvas.

```css
.preview-canvas {
  background:
    linear-gradient(90deg, rgba(219, 226, 234, 0.42) 1px, transparent 1px),
    linear-gradient(180deg, rgba(219, 226, 234, 0.42) 1px, transparent 1px),
    #ffffff;
  background-size: 24px 24px;
}
```

Preview toolbar rules:

- Use dark chrome: `linear-gradient(135deg,#151826,#1f2937)`.
- Include three small window dots in pink, amber, and mint.
- Keep zoom controls icon-first: `Minus`, `Plus`, and a compact zoom select.
- Show loading as a centered white overlay with a pink spinner, not as plain text on an empty canvas.

## Empty States

Empty states should be quiet but visible.

```tsx
className="rounded-lg border border-dashed bg-muted/45 p-8 text-center text-muted-foreground"
```

Use a single pink-tinted icon, one concise title, and one helper line. Avoid explanatory paragraphs.

## Motion

Motion should clarify state changes, not decorate the page.

```css
.animate-fade-up {
  animation: fade-up 420ms ease-out both;
}

.animate-soft-pulse {
  animation: soft-pulse 1.6s ease-in-out infinite;
}

.shadow-accent {
  box-shadow: 0 16px 35px rgba(255, 66, 103, 0.24);
}

@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

Use:

- `fade-up` for page/panel entrance.
- `translateY(-3px)` hover only on interactive cards.
- `active:translate-y-px` for button press feedback.
- `transition-opacity duration-300` for iframe/content loading.
- Always keep the reduced-motion media query enabled.

## Layout Patterns

### App Header

- Light, frosted full-width band (translucent white + backdrop blur), with a hairline bottom border. In dark mode it becomes a translucent dark surface.
- Thin top accent bar using the multi-status gradient (pink → blue → mint → amber).
- Left: logo/wordmark. Center: nav links. Right: pill-shaped theme toggle.
- Nav links sit in muted ink; hover and the active item are emphasized in the pink point color, with a short pink underline marking the active page.
- On mobile, the nav wraps to a horizontally scrollable row rather than squeezing labels.

### Step Rail

- Sticky white/translucent rail under the header.
- Active step uses the primary pink gradient.
- Completed step uses a mint-tinted surface.
- Disabled step uses muted text and no hover emphasis.
- On mobile, allow horizontal scroll rather than squeezing labels.

### Data Panels

- Use two-column grids on desktop and one column on mobile.
- Main panels use `app-surface`.
- Repeated cards use `interactive-card`.
- Section headers should use icon + title + one-line description.

## Accessibility And Responsiveness

- All icon-only buttons need `aria-label`.
- Keep focus rings visible with `ring: 347 100% 63%`.
- Avoid text clipping by using `min-w-0`, `truncate`, or wrapping where needed.
- Verify at desktop width around `1440px` and mobile width around `390px`.
- Keep touch targets at least `h-8`; primary actions should be `h-10` or `h-11`.

## Quick Reuse Checklist

- Page background uses the soft gray base with an emphasized pink wash.
- Header is light/frosted with centered nav; active/hover nav text uses the pink point color.
- CTA uses pink gradient with the tactile inset shadow.
- Cards use white panels, 8px radius, cool gray border, and subtle shadow.
- Empty states use dashed border and muted gray fill.
- Preview or canvas areas use the 24px grid.
- Motion is limited to entry, hover lift, press, and loading opacity.
