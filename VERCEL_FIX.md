# Vercel Build Fix for Tailwind CSS v4

The build failure was caused by using Tailwind CSS v4 with an outdated PostCSS configuration.

## Changes Made:

1.  **Installed `@tailwindcss/postcss`**:
    Tailwind CSS v4 moved the PostCSS plugin to a separate package.
    Run: `npm install @tailwindcss/postcss`

2.  **Updated `postcss.config.js`**:
    Changed the plugin from `tailwindcss` to `@tailwindcss/postcss`.

    ```javascript
    export default {
      plugins: {
        '@tailwindcss/postcss': {},
        autoprefixer: {},
      },
    }
    ```

## Verification:

-   `npm run build` now completes successfully locally.
-   The project is now ready for deployment.
