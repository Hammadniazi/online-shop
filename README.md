# Online Shop

A modern, responsive e-commerce application built with React, TypeScript, Vite, and Tailwind CSS.

## Project Links

- Github Repository: [https://github.com/Hammadniazi/online-shop](https://github.com/Hammadniazi/online-shop)
- Live Link: [https://onine-shop.netlify.app/](https://onine-shop.netlify.app/)

## Project Overview

This is a fully functional online shop featuring:

- Product catalog with search and filtering
- Shopping cart with item management
- Checkout process
- Contact page
- Type-safe TypeScript implementation

## Tech Stack

- **Frontend Framework**: React with TypeScript
- **Build Tool**: Vite (fast bundling and HMR)
- **UI Styling**: Tailwind CSS
- **Routing**: TanStack Router for client-side navigation
- **State Management**: Zustand (lightweight store for cart)
- **Toast Notifications**: React Hot Toast

## Project Structure

```
online-shop/
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   └── SearchBar.tsx
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── CartPage.tsx
│   │   ├── CheckoutPage.tsx
│   │   ├── ContactPage.tsx
│   │   ├── ProductDetailsPage.tsx
│   │   ├── CheckoutSuccessPage.tsx
│   │   ├── NotFound.tsx
│   │   └── Layout.tsx
│   ├── routes/
│   │   └── router.tsx
│   ├── stores/
│   │   └── cartStore.ts
│   ├── services/
│   │   └── productService.ts
│   ├── hooks/
│   │   └── useProducts.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── vite.config.ts
└── eslint.config.js
```

## Getting Started

### Installation

```bash
cd online-shop

# Install dependencies
npm install
```

### Development

```bash
# Start development server with HMR
npm run dev

# Open browser
# Visit http://localhost:5173
```

### Build for Production

```bash
# Build optimized bundle
npm run build

# Preview production build
npm run preview
```

### Linting

```bash
# Check code quality
npm run lint

# Fix linting issues
npm run lint --fix
```

## Dependencies

### Core

- `react`: UI library
- `react-dom`: DOM rendering
- `@tanstack/react-router`: Routing solution
- `zustand`: State management
- `react-hot-toast`: Toast notifications

### Development

- `typescript`: Type safety
- `vite`: Build tool & dev server
- `tailwindcss`: CSS utility framework
- `eslint`: Code quality
- `postcss`: CSS processing

## License

This project is for educational purposes.

---

## Author

- Hammad Khan (@Hammadniazi)

---
