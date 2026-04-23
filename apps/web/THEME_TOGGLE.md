# Theme Toggle System

## Overview

The theme toggle system allows users to switch between different CSS themes and toggle dark mode in the customization page. Each theme is a separate CSS file located in `packages/ui/src/styles/`, and each theme has both light and dark variants defined via `:root` and `.dark` CSS classes.

## Features

- **8 Different Themes**: Switch between completely different visual styles
- **Dark Mode Toggle**: Each theme has a dark variant that can be toggled independently
- **Persistent Preferences**: Both theme and dark mode choices are saved to localStorage
- **Real-time Preview**: Changes apply immediately without page reload

## Available Themes

- **Default Theme** (`globals.css`)
- **Theme 1** (`globals1.css`)
- **Theme 2** (`globals2.css`)
- **Theme 3** (`globals3.css`)
- **Theme 4** (`globals4.css`)
- **Default Classic** (`globalsdefault.css`)
- **Night Theme 1** (`globalsnight1.css`)
- **Night Theme 2** (`globalsnight2.css`)

## How It Works

### 1. Theme Switcher Hook (`use-theme-switcher.ts`)

- Manages the current theme selection (globals, globals1, globals2, etc.)
- Persists theme choice to localStorage under `"app-theme"`
- Dynamically loads the selected theme CSS file
- Provides a list of available themes

### 2. Dark Mode Hook (`use-dark-mode.ts`)

- Manages dark mode state (on/off)
- Persists dark mode preference to localStorage under `"app-dark-mode"`
- Toggles the `.dark` class on the `<html>` element
- Works independently of theme selection

### 3. Theme Provider (`theme-provider.tsx`)

- Client-side component that wraps the app
- Loads saved theme and dark mode on initial mount
- Applies `.dark` class if dark mode was enabled
- Prevents flash of unstyled content

### 4. Theme Files (`styles/themes/*.ts`)

- Individual import files for each theme
- Allows Next.js to properly bundle theme CSS
- Enables dynamic theme switching

### 4. Customization Form Integration

- Added a theme selector dropdown for choosing the base theme
- Added a dark mode switch with Sun/Moon icons for toggling light/dark
- Both controls are in the Appearance section
- Changes apply immediately
- Preferences are saved automatically

## Usage

### For Users

1. Navigate to the Customization page
2. In the **Appearance** section:
   - Use the **"Theme Style"** dropdown to select your base theme
   - Use the **"Dark Mode"** switch (Sun/Moon icons) to toggle between light and dark variants
3. Changes apply immediately
4. Your selections are saved automatically and persist across sessions

### Example Combinations

- **Theme 1 (Light)**: Select "Theme 1" + Dark Mode OFF
- **Theme 1 (Dark)**: Select "Theme 1" + Dark Mode ON
- **Night Theme 1 (Light)**: Select "Night Theme 1" + Dark Mode OFF
- **Night Theme 1 (Dark)**: Select "Night Theme 1" + Dark Mode ON

### For Developers

#### Adding a New Theme

1. Create a new CSS file in `packages/ui/src/styles/` (e.g., `globalsnight3.css`)
2. Create a corresponding import file in `apps/web/styles/themes/` (e.g., `globalsnight3.ts`):
   ```typescript
   import "@workspace/ui/styles/globalsnight3.css";
   ```
3. Add the theme to the `THEME_OPTIONS` array in `use-theme-switcher.ts`:
   ```typescript
   { value: "globalsnight3", label: "Night Theme 3" }
   ```

#### Using the Dark Mode Hook in Components

```typescript
import { useDarkMode } from "@/hooks/use-dark-mode";

function MyComponent() {
  const { isDarkMode, toggleDarkMode, setDarkMode } = useDarkMode();

  return (
    <button onClick={toggleDarkMode}>
      {isDarkMode ? "Switch to Light" : "Switch to Dark"}
    </button>
  );
}
```

## Technical Details

### Storage

- **Theme preference**: Stored in localStorage under `"app-theme"` (default: `"globals"`)
- **Dark mode preference**: Stored in localStorage under `"app-dark-mode"` (default: `false`)

### CSS Architecture

Each theme CSS file contains:

- `:root { ... }` - Light mode variables
- `.dark { ... }` - Dark mode variables (applied when `.dark` class is on `<html>`)

When dark mode is enabled, the `.dark` class is added to the document root, which overrides the `:root` variables with dark variants.

### CSS Loading

- Themes are loaded dynamically using Next.js dynamic imports
- The system adds a theme class to the document root for scoping
- Old theme styles are replaced when switching themes

### Performance

- Initial theme loads on app mount to prevent style flash
- Theme switching triggers a minimal reflow
- CSS is bundled efficiently by Next.js

## Troubleshooting

### Theme Not Applying

- Check browser console for import errors
- Verify the CSS file exists in `packages/ui/src/styles/`
- Clear localStorage and reload

### Flash of Unstyled Content

- The ThemeProvider shows nothing until theme loads
- Ensure ThemeProvider wraps your app in layout.tsx

### Theme Not Persisting

- Check if localStorage is enabled
- Verify the storage key matches in all files
