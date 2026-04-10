# Design System Document: High-End Developer Portfolio

## 1. Overview & Creative North Star

### Creative North Star: The Digital Architect
This design system is not a template; it is a structural statement. It reflects the precision of high-level engineering paired with the aesthetic restraint of editorial design. We move away from the "standard web" by utilizing intentional asymmetry, varying typographic scales, and a depth-first approach to UI. 

The goal is to convey **Professional Sophistication**. By breaking the rigid 12-column grid with overlapping elements and shifting tonal planes, we create an experience that feels custom-built and meticulously curated. We prioritize breathing room and high-contrast motion over decorative clutter.

---

## 2. Colors

The palette is rooted in a "Dark-First" philosophy, using deep, atmospheric neutrals to allow primary accents and high-contrast typography to command attention.

### The Palette (Material Convention)
*   **Background / Surface:** `#131313` (The base of the experience)
*   **Primary (Accent):** `#a3d1b5` (A muted, sophisticated sage/green)
*   **Secondary:** `#c6c6c7` (Neutral functional elements)
*   **On-Surface (Text):** `#e5e2e1` (Off-white for reduced eye strain and premium feel)

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to section off content. Traditional dividers are prohibited. 
*   **How to define boundaries:** Use background shifts. A section utilizing `surface-container-low` (`#1b1c1c`) sitting against a `surface` (`#131313`) background provides a sophisticated, seamless transition that feels architectural rather than "boxed in."

### Surface Hierarchy & Nesting
Treat the UI as a series of stacked, physical layers. 
*   **Base:** `surface`
*   **Layer 1:** `surface-container-low` (General sections)
*   **Layer 2:** `surface-container` (Cards, inner containers)
*   **Layer 3:** `surface-container-high` (Modals, floating elements)

### The "Glass & Gradient" Rule
To add visual "soul," primary CTAs and hero highlights should use subtle linear gradients from `primary` (`#a3d1b5`) to `primary-container` (`#729e84`). For floating navigation or interactive overlays, apply **Glassmorphism**: `surface-container-highest` at 60% opacity with a `24px` backdrop-blur.

---

## 3. Typography

The typography strategy is a play between brutalist scale and functional readability.

*   **Display & Headlines (Space Grotesk):** These are your architectural beams. Use `display-lg` (3.5rem) for hero statements. Mix weights—use Bold for impact and Light for secondary context within the same headline—to create a rhythmic, editorial feel.
*   **Body & Titles (Inter):** The "Workhorse." `body-lg` (1rem) ensures that technical descriptions remain legible and professional. 
*   **Labels (Inter):** Used for metadata, tags, and small captions. Always uppercase with a `0.05em` letter spacing to maintain a "technical spec" aesthetic.

---

## 4. Elevation & Depth

We reject the "flat" web. Depth is our primary tool for hierarchy.

### The Layering Principle
Achieve lift through Tonal Layering. Place a `surface-container-lowest` card on a `surface-container-low` section. The minute difference in hex values creates a natural, soft lift that mimics high-end paper stock.

### Ambient Shadows
Shadows must never be black. Use a tinted version of `on-surface` at 4-8% opacity.
*   **Spec:** `0px 20px 40px rgba(229, 226, 225, 0.06)`
*   This creates an "ambient glow" effect rather than a harsh drop shadow, making elements feel like they are floating in a lit environment.

### The "Ghost Border" Fallback
If a container requires a border for accessibility, use the **Ghost Border**: `outline-variant` (`#414943`) at 15% opacity. It should be felt, not seen.

---

## 5. Components

### Buttons
*   **Primary:** Solid `primary` background with `on-primary` text. No border. `0.25rem` (sm) radius.
*   **Secondary (Ghost):** No background. Ghost Border (15% opacity). On hover, fill background to 10% `primary` opacity.
*   **Hover State:** All buttons should lift slightly (`-2px` Y-axis) with an eased transition (300ms cubic-bezier).

### Cards
*   **Rule:** Forbid divider lines.
*   **Style:** Use `surface-container-low` backgrounds. Increase vertical padding (`spacing-xl`) to separate internal content. Elements should feel like they have room to breathe.

### Chips (Tech Tags)
*   Small, `label-md` text. Background: `surface-container-high`. 
*   Use `full` (9999px) roundedness to contrast against the sharper `0.25rem` radius of cards and buttons.

### Modern Portfolio Specials
*   **The Overlap Card:** A component where an image (e.g., a project screenshot) overlaps the card boundary by `2rem`, breaking the container's grid.
*   **The Kinetic Headline:** Headlines that utilize the `Thunder` font style for ultra-bold, compressed impact, often spanning the full width of the viewport.

---

## 6. Do's and Don'ts

### Do
*   **Do** use asymmetrical layouts. Place a text block on the left and a heavy image on the right, but offset their vertical alignment.
*   **Do** prioritize whitespace. If you think there is enough space, double it.
*   **Do** use typography as a graphic element. Large, low-opacity "background text" can act as a texture.

### Don't
*   **Don't** use 100% opaque borders or high-contrast dividers. It breaks the "premium" illusion.
*   **Don't** use standard "Material Design" blue or generic "Bootstrap" spacing. 
*   **Don't** crowd the interface. This system is for a confident developer; the code and the work should speak through clarity, not clutter.
*   **Don't** use sharp transitions. Every interaction (hover, scroll, appear) should be eased and sophisticated.