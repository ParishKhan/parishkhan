# Parish Dev Folio

[cloudflarebutton]

A modern, responsive developer portfolio website built with React, Tailwind CSS, and shadcn/ui. Fully powered by Cloudflare Workers for the backend API and optimized for performance with Vite bundling. Features a sleek sidebar navigation, theme toggle, and production-ready architecture.

## Features

- **Responsive Design**: Mobile-first layout with Tailwind CSS and shadcn/ui components
- **Dark/Light Mode**: Automatic theme detection with persistence
- **Sidebar Navigation**: Collapsible sidebar with search and quick links
- **API Routes**: Hono-powered backend with CORS and error handling
- **State Management**: Tanstack Query for data fetching and caching
- **Animations & Interactions**: Framer Motion, Tailwind animations, and glassmorphism effects
- **Error Handling**: Global error boundaries and client-side reporting
- **Production Optimized**: TypeScript, strict linting, and Cloudflare deployment ready

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS 3, shadcn/ui, Lucide React
- **Routing & State**: React Router, Tanstack React Query, Zustand
- **UI Components**: Radix UI primitives, Headless UI, Framer Motion
- **Backend**: Cloudflare Workers, Hono 4
- **Utilities**: clsx, tailwind-merge, date-fns, Sonner (toasts), Recharts
- **Dev Tools**: Bun, ESLint, TypeScript ESLint, Wrangler
- **Deployment**: Cloudflare Pages/Workers

## Quick Start

### Prerequisites

- [Bun](https://bun.sh/) installed (recommended package manager)
- [Cloudflare CLI (Wrangler)](https://developers.cloudflare.com/workers/wrangler/install-update/) for deployment

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   bun install
   ```
3. Generate Cloudflare types (optional, for IDE support):
   ```bash
   bun run cf-typegen
   ```

## Development

- Start the development server:
  ```bash
  bun dev
  ```
  The app runs on `http://localhost:3000` (or `$PORT`).

- Lint the codebase:
  ```bash
  bun lint
  ```

- Build for production:
  ```bash
  bun build
  ```

Add your custom API routes in `worker/userRoutes.ts` without modifying `worker/index.ts`.

## Usage

- **Frontend Customization**: Edit pages in `src/pages/`, components in `src/components/`
- **Backend API**: Access routes at `/api/*` (e.g., `/api/health`, `/api/test`)
- **Theme Toggle**: Built-in hook `useTheme()` for light/dark mode
- **Sidebar Layout**: Wrap pages with `AppLayout` from `src/components/layout/AppLayout.tsx`
- **Error Reporting**: Automatic client-side error logging to `/api/client-errors`

Example API call from React:
```tsx
const { data } = useQuery({
  queryKey: ['test'],
  queryFn: () => fetch('/api/test').then(res => res.json())
});
```

## Deployment

Deploy to Cloudflare Workers/Pages with a single command:

```bash
bun deploy
```

This builds the app and runs `wrangler deploy`.

For custom deployments:

1. Configure `wrangler.jsonc` with your Cloudflare account
2. Run `bun build`
3. Deploy: `npx wrangler deploy`

[cloudflarebutton]

## Project Structure

```
├── src/              # React app source
│   ├── components/   # UI components (shadcn/ui + custom)
│   ├── pages/        # Route pages
│   ├── hooks/        # Custom React hooks
│   └── lib/          # Utilities
├── worker/           # Cloudflare Workers backend
├── public/           # Static assets
├── tailwind.config.js # Tailwind + shadcn config
└── wrangler.jsonc    # Cloudflare config
```

## Contributing

1. Fork the repo
2. Create a feature branch (`bun dev`)
3. Commit changes (`git commit -m 'feat: add X'`)
4. Push and open a PR

## License

MIT License - see [LICENSE](LICENSE) for details.

## Support

- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [shadcn/ui](https://ui.shadcn.com/)
- Report issues via GitHub Issues

Built with ❤️ for modern developer portfolios.