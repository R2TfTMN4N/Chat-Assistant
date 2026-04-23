# Widget Dark Mode Implementation

## Overview

Added dark mode toggle functionality to the widget UI with proper Clerk authentication styling support.

## Changes Made

### 1. Dark Mode Toggle Component

Created a reusable toggle button component at:

- **File**: [apps/widget/modules/widget/ui/components/dark-mode-toggle.tsx](apps/widget/modules/widget/ui/components/dark-mode-toggle.tsx)
- **Features**:
  - Sun icon for light mode, Moon icon for dark mode
  - Ghost button style with icon size
  - Uses `useDarkMode` hook for state management
  - Accessible and responsive

### 2. Widget Screens Updated

Added `DarkModeToggle` component to the following screens:

#### Chat Screen

- **File**: [apps/widget/modules/widget/ui/screens/widget-chat-screen.tsx](apps/widget/modules/widget/ui/screens/widget-chat-screen.tsx)
- **Location**: Header, alongside the menu icon
- **Layout**: Right-aligned in the header

#### Selection Screen

- **File**: [apps/widget/modules/widget/ui/screens/widget-selection-screen.tsx](apps/widget/modules/widget/ui/screens/widget-selection-screen.tsx)
- **Location**: Header, next to the welcome message
- **Layout**: Right-aligned with flexbox spacing

#### Inbox Screen

- **File**: [apps/widget/modules/widget/ui/screens/widget-inbox-screen.tsx](apps/widget/modules/widget/ui/screens/widget-inbox-screen.tsx)
- **Location**: Header, opposite the back button
- **Layout**: Justified between back button and toggle

#### Voice Screen

- **File**: [apps/widget/modules/widget/ui/screens/widget-voice-screen.tsx](apps/widget/modules/widget/ui/screens/widget-voice-screen.tsx)
- **Location**: Header, next to the title
- **Layout**: Right-aligned with full width flex container

#### Contact Screen

- **File**: [apps/widget/modules/widget/ui/screens/widget-contact-screen.tsx](apps/widget/modules/widget/ui/screens/widget-contact-screen.tsx)
- **Location**: Header, opposite the back button
- **Layout**: Justified between back button and toggle

### 3. Clerk UI Dark Mode Support

Fixed Clerk authentication UI text visibility issues in dark mode:

- **File**: [apps/web/app/layout.tsx](apps/web/app/layout.tsx)
- **Changes**: Added comprehensive `appearance` configuration to `ClerkProvider`

#### CSS Variables Configured

```typescript
variables: {
  colorPrimary: "hsl(var(--primary))",
  colorBackground: "hsl(var(--background))",
  colorInputBackground: "hsl(var(--input))",
  colorInputText: "hsl(var(--foreground))",
  colorText: "hsl(var(--foreground))",
  colorTextSecondary: "hsl(var(--muted-foreground))",
}
```

#### Element Styles Applied

- **Root Box**: Background and text colors
- **Cards**: Proper background and border
- **Headers**: Visible title text
- **Buttons**: Social, form, and action buttons
- **Popovers**: User button and organization switcher
- **Forms**: Input fields and labels
- **Identity**: User preview backgrounds
- **Organization Switcher**:
  - Trigger background and hover states
  - Preview text colors
  - Action colors and hover states
  - Badge styling
- **Footer**: Action links

## How It Works

### Dark Mode State Management

1. **Hook**: `useDarkMode()` manages dark mode state
2. **Storage**: Persists to localStorage as "app-dark-mode"
3. **DOM**: Adds/removes `.dark` class on `<html>` element
4. **Sync**: Storage events sync across tabs

### Theme Integration

- Dark mode works with all 8 CSS themes
- Each theme has both `:root` (light) and `.dark` variants
- CSS variables cascade properly in dark mode
- Widget loads theme from database on mount

### User Experience

1. User clicks sun/moon icon in any widget screen
2. Dark mode toggles instantly
3. All screens update automatically
4. Clerk UI remains fully visible and styled
5. Setting persists across sessions
6. Syncs with web app customization page

## Testing Checklist

- [x] Dark mode toggle visible in all widget screens
- [x] Toggle icon changes (Sun ↔ Moon)
- [x] Colors invert properly with all themes
- [x] Clerk UI text visible in dark mode
- [x] Organization switcher readable in dark mode
- [x] User button popover styled correctly
- [x] Form inputs have proper contrast
- [x] State persists on page reload
- [x] Cross-tab synchronization works

## Technical Details

### Component Pattern

```tsx
import { DarkModeToggle } from "../components/dark-mode-toggle";

<WidgetHeader>
  <div className="flex items-center justify-between w-full">
    {/* Other header content */}
    <DarkModeToggle />
  </div>
</WidgetHeader>;
```

### Hook Usage

```typescript
const { isDark, toggleDarkMode } = useDarkMode();
```

### Clerk Styling Pattern

```typescript
<ClerkProvider
  appearance={{
    variables: { /* CSS variable overrides */ },
    elements: { /* Element-specific classes */ }
  }}
>
```

## Related Files

- Theme Switcher Hook: [apps/widget/hooks/use-theme-switcher.ts](apps/widget/hooks/use-theme-switcher.ts)
- Dark Mode Hook: [apps/widget/hooks/use-dark-mode.ts](apps/widget/hooks/use-dark-mode.ts)
- Theme Provider: [apps/widget/components/theme-provider.tsx](apps/widget/components/theme-provider.tsx)
- CSS Themes: [packages/ui/src/styles/\*.css](packages/ui/src/styles/)

## Notes

- Dark mode is independent of theme selection
- Users can combine any theme with dark/light mode
- Widget inherits theme from database
- Web app customization page controls both theme and dark mode
- Clerk UI styling ensures accessibility in both modes
