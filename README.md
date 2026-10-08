# Power Pulse

Power Pulse is a role-based power-service platform for tracking load-shedding schedules, planned outages, service areas, and customer-reported interruptions. Customers, technicians, and administrators use the same application to report issues, coordinate service, and keep power information in one place.

**Repository:** [github.com/khalidhossain5000/Next-Level-Assignment-7](https://github.com/khalidhossain5000/Next-Level-Assignment-7)

## Features

- **Public information:** Browse power zones, view connected infrastructure, and explore load-shedding schedules and planned outages.
- **Customer accounts:** Register and verify an account, report outages, update or remove eligible reports, review outage status, and view payment history.
- **Technician workflows:** Maintain a technician profile and review assigned outages.
- **Administration:** Manage users, technicians, zones and distribution infrastructure; create schedules and planned outages; update report status; assign technicians; and review payment records and analytics.
- **Authentication:** Role-aware sign-in and registration, optional Google sign-in, and cookie-based API authentication.
- **Responsive data views:** Tables adapt to mobile card layouts. Existing searchable, sortable, and paginated views synchronize their supported state with the URL so filtered views can be refreshed or shared.
- **Notifications and validation:** Form validation with Zod and TanStack Form, plus toast notifications for user feedback.
- **SEO:** Public pages define titles, descriptions, and Open Graph metadata through the Next.js App Router Metadata API.

## Public Routes

| Route | Description |
| --- | --- |
| `/` | Power Pulse overview and current power information |
| `/about-us` | About the platform |
| `/zones` | Browse power zones |
| `/zones/[id]` | View a zone and its infrastructure |
| `/load-shedding-schedule` | Browse load-shedding schedules |
| `/load-shedding-schedule/[id]` | View schedule details |
| `/planned-outage` | Browse planned outages |
| `/planned-outage/[id]` | View planned-outage details |
| `/login` | Sign in |
| `/select-role` | Choose an account role to register |
| `/[role]/register` | Register for a supported role |
| `/[role]/register/verify-account` | Verify a new account |

Authenticated dashboard routes are grouped by role under `/admin`, `/customer`, and `/technician`. Access is protected by route-level authentication and role guards.

## Tech Stack

- Next.js 16 App Router and React 19
- TypeScript
- Tailwind CSS 4 and shadcn/ui components backed by Base UI
- TanStack Query for server state and TanStack Form for forms
- Zod for validation
- `ofetch` for API requests
- Lucide and React Icons
- Motion for interface animation and Recharts for analytics
- Biome for linting and formatting

## Requirements

- Bun 1.4.2 or newer (the repository declares Bun as its package manager)
- Node.js 20.9 or newer for the Next.js toolchain
- A running Power Pulse backend API

## Getting Started

Clone the repository and install its dependencies:

```bash
git clone https://github.com/khalidhossain5000/Next-Level-Assignment-7.git
cd Next-Level-Assignment-7
bun install
```

Create a `.env.local` file in the project root and configure the required backend URL:

```dotenv
NEXT_PUBLIC_BASE_URL=https://your-backend-api-base-url
```

The base URL must point to a backend that provides the API routes used by the app. For local backend development, use its local base URL instead.

Start the development server:

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_BASE_URL` | Yes | Base URL for API requests. Requests include credentials for cookie-based authentication. |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Optional | Enables Google sign-in when configured. |
| `TESTER_ADMIN_EMAIL` | Optional | Local quick-login account email for an admin test account. |
| `tester_admin_password` | Optional | Local quick-login password for the admin test account. |
| `TESTER_CUSTOMER_EMAIL` | Optional | Local quick-login account email for a customer test account. |
| `TESTER_CUSTOMER_PASSWORD` | Optional | Local quick-login password for the customer test account. |
| `TESTER_TECHNICIAN_EMAIL` | Optional | Local quick-login account email for a technician test account. |
| `TESTER_TECHNICIAN_PASSWORD` | Optional | Local quick-login password for the technician test account. |

The tester account variables are only for local/test use. Use disposable test accounts, never commit `.env.local`, and do not use production credentials for quick login. If the frontend and API use different origins, configure the backend CORS policy to allow the frontend origin and credentialed requests.

## Available Scripts

| Command | Description |
| --- | --- |
| `bun run dev` | Start the Next.js development server. |
| `bun run build` | Create an optimized production build. |
| `bun run start` | Start the production server after building. |
| `bun run lint` | Run Biome checks. |
| `bun run format` | Format files with Biome. |

There is currently no dedicated test script configured in `package.json`.

## URL State

List views with search, sorting, or pagination store their supported state in the query string. For example:

```text
/zones?search=north&sortOrder=desc&page=2&limit=20
```

The available parameters depend on the view. Search uses `search`, sorting uses `sortOrder=asc|desc`, pagination uses `page`, and page size uses `limit`. Default values may be omitted from the URL.

## Project Structure

```text
src/
	api/            API request functions
	app/            App Router pages, layouts, and route groups
	assets/         Reusable visual assets
	components/     Forms, layouts, modals, modules, and UI components
	hooks/          TanStack Query and shared application hooks
	lib/            API client and shared utilities
	providers/      React Query, Google OAuth, and theme providers
	types/          Shared TypeScript types
	validation/     Zod schemas
public/           Static assets and images
```

## API and Authentication

API calls are made through the shared `ofetch` client configured in `src/lib/apiClient.ts`. It sends cookies with requests and retries once after refreshing an expired session. The backend must support the corresponding authentication and refresh endpoints.

## License

No license file is currently included in this repository. Contact the repository owner for usage and redistribution terms.