# Lendsqr Dashboard

A user management dashboard for viewing, filtering, and managing users. The app provides a users list with filters (organization, username, email, date, phone, status), pagination, and detailed user profiles including guarantor information.

**Tech stack:** React 19, TypeScript, Vite 7, Redux Toolkit, React Router, SCSS

## Prerequisites

- **Node.js** 18 or higher
- **npm** (Node package manager)

## Getting Started

1. Clone the repository:

```bash
 git clone <repository-url>
 cd lendsqr-fe-test
```

2. Install dependencies:

```bash
 npm install
```

No environment variables or `.env` files are required.

## Running the App

| Command           | Description                  |
| ----------------- | ---------------------------- |
| `npm run dev`     | Start the development server |
| `npm run build`   | Build for production         |
| `npm run preview` | Preview production build     |

The dev server runs at `http://localhost:5173` by default.

## Mocked Login

The app uses a **mocked login** with no backend. You can sign in with:

- **Email:** Any valid email format (e.g. `user@example.com`)
- **Password:** Any password with **at least 8 characters**

**Example credentials:**

- Email: `user@example.com`
- Password: `password123`

After logging in, you are redirected to the `/users` dashboard. Auth state persists in `sessionStorage`.

## Testing

| Command            | Description       |
| ------------------ | ----------------- |
| `npm test`         | Run tests (watch) |
| `npm run test:run` | Run tests once    |
| `npm run test:ui`  | Run Vitest UI     |

## Linting

```bash
npm run lint
```

Runs ESLint across the codebase.

## Project Structure

```
src/
├── pages/          # Login, Users, UserDetails, Dashboard
├── components/     # Button, Input, ProtectedRoute, etc.
└── store/          # Redux slices (auth, users)
```
