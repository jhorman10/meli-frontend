# Mercado Libre Frontend Challenge

This project is a frontend application based on the Mercado Libre product search experience. It was built using React, TypeScript, and Vite, following Clean Architecture principles.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Yarn (v1.22 or higher)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd meli-frontend
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env.local
   ```

   The default `VITE_API_URL` is `http://localhost:3001` which corresponds to the MSW mock server.

4. Start the development server:

   ```bash
   yarn dev
   ```

5. Open your browser at `http://localhost:5173`.

## 🛠 Technical Decisions

### Architecture

The project follows **Clean Architecture** principles to ensure scalability and maintainability:

- **Domain**: Contains business entities and use case interfaces. It is independent of any framework.
- **Application**: Contains use case implementations and application logic.
- **Infrastructure**: Handles external concerns like API calls (using Axios) and Mock Service Worker (MSW).
- **Presentation**: Contains React components, pages, and hooks.

### State Management

- **React Hooks**: Used for local state management (`useState`, `useEffect`, custom hooks).
- **Context API**: Not used for this scope, but could be added for global state (e.g., user session, cart).

### Styling

- **Tailwind CSS**: Chosen for rapid UI development and ease of customization. It allows for a clean and consistent design system.

### Mocking

- **Mock Service Worker (MSW)**: Used to intercept API requests and return mock data. This allows the frontend to be developed and tested independently of a real backend.

## 📝 What I would do differently (with more time)

- **Testing**: Implement unit tests for use cases and components using Jest and React Testing Library. Add integration tests for critical flows.
- **SEO**: Implement Server-Side Rendering (SSR) or Static Site Generation (SSG) using Next.js for better SEO performance, as product pages are critical for search engines.
- **Error Handling**: Implement a more robust error handling strategy, perhaps with a global error boundary and toast notifications.
- **Accessibility**: Further improve accessibility by auditing with tools like Lighthouse and adding ARIA labels where necessary.
- **Performance**: Optimize image loading (lazy loading, next-gen formats) and bundle size.

## 📂 Project Structure

```
src/
├── application/        # Application business rules
├── domain/            # Enterprise business rules
├── infrastructure/    # Frameworks & Drivers
├── presentation/      # Interface Adapters (UI)
├── main.tsx          # Entry point
└── vite-env.d.ts     # Vite types
```

## 🚢 Deployment

### Vercel

This project is fully configured for deployment on Vercel with MSW (Mock Service Worker) support in production.

#### Quick Deploy

1. Push your code to GitHub
2. Import project in [Vercel Dashboard](https://vercel.com/dashboard)
3. Configure environment variables:
   - `VITE_ENABLE_MOCKS=true`
   - `VITE_API_URL=http://localhost:3001`
4. Deploy!

For detailed instructions, see [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)

### Environment Variables

| Variable            | Description        | Example                 |
| ------------------- | ------------------ | ----------------------- |
| `VITE_API_URL`      | API base URL       | `http://localhost:3001` |
| `VITE_ENABLE_MOCKS` | Enable MSW mocking | `true` or `false`       |

### Preview Production Build

```bash
npm run build
npm run preview
```
