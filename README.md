# Power Pulse - Load Shedding & Power Management ⚡ Platform

![Next.js](https://img.shields.io/badge/Next.js-black?logo=nextdotjs)
![React](https://img.shields.io/badge/React-20232a?logo=react&logoColor=61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-0f172a?logo=tailwindcss&logoColor=38bdf8)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-ff4154?logo=reactquery&logoColor=white)

**Live demo:** [next-level-assignment-7.vercel.app](https://next-level-assignment-7.vercel.app)

---

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [How the API Connection Works](#how-the-api-connection-works)
- [Test Accounts](#test-accounts)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Author](#author)

---

## About the Project

**Power Pulse** is a web platform that keeps people informed about electricity supply. It brings power zones, load shedding schedules and planned maintenance outages into one place, lets customers report unexpected outages, and gives administrators and technicians the tools to manage and resolve them.

This repository contains the **frontend** application, built with Next.js and connected to the Power Pulse REST API.

---

## Features

### Public pages
- **Home overview** with live counts of power zones, load shedding events, planned outages and technicians
- **Upcoming load shedding** section showing the next scheduled power cuts
- **Power zones explorer** with search, sorting (created / updated, ascending / descending) and pagination
- **Load shedding schedule** and **planned outage** pages, each with a detail view (affected area, start and end time, status)
- **Report an outage** call to action that takes customers straight to the reporting form

### Authentication and security
- Email and password registration for **Customers** and **Technicians**
- **Email OTP verification** with a resend timer
- **Google sign-in** (OAuth)
- Cookie-based sessions with automatic token refresh
- **Role-based route protection** (`ADMIN`, `TECHNICIAN`, `CUSTOMER`) with `AuthGuard` and `RoleGuard`
- **Redirect back to the page you wanted**: if a guest opens a protected page, they are sent to login (or register and verify) and then land on that same page

### Dashboards
- Separate dashboards for each role (for example `/customer/dashboard`)
- Customers report and track outages
- Technicians receive and handle service work
- Admins manage zones, substations, schedules and outage data

### Payments
- Dedicated **payment success, failed and cancelled** result pages with a "Return to Dashboard" button

### User experience
- Fully responsive layout with a mobile drawer navigation
- Light and dark theme
- Smooth animations with Motion
- Skeleton loaders, a global loading screen and a custom error page with retry

---

## Tech Stack

| Area | Technology |
|---|---|
| Framework | [Next.js](https://nextjs.org/) (App Router) |
| Language | TypeScript |
| UI library | React |
| Styling | Tailwind CSS v4, [shadcn/ui](https://ui.shadcn.com/) |
| Data fetching | TanStack Query, [ofetch](https://github.com/unjs/ofetch) |
| Forms | TanStack Form with schema validation |
| Animation | [Motion](https://motion.dev/) |
| Auth | Cookie sessions, Google OAuth (`@react-oauth/google`) |
| Notifications | Sonner |
| Icons | Lucide, React Icons |
| Images | Cloudinary and ImgBB hosted images through `next/image` |
| Code quality | Biome |

---

## Getting Started

### Prerequisites

- **Node.js 20 or newer**
- **npm** (or pnpm / yarn)
- A running instance of the **Power Pulse backend API**
- A **Google OAuth Client ID** (for Google sign-in)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/khalidhossain5000/Next-Level-Assignment-7.git
   cd Next-Level-Assignment-7
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create your environment file**

   Create a `.env` (or `.env.local`) file in the project root and add the variables described in [Environment Variables](#environment-variables).

4. **Start the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build for production (optional)**

   ```bash
   npm run build
   npm run start
   ```

---

## Environment Variables

Create a `.env` file in the root of the project:

```dotenv
# Backend core URL only. Do NOT add /api/v1 at the end.
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000

# API base path. This must be exactly /api/v1 (not a full URL).
NEXT_PUBLIC_BASE_URL_Production=/api/v1

# Google OAuth
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id

# Tester accounts (see "Test Accounts")
TESTER_ADMIN_EMAIL=
TESTER_ADMIN_PASSWORD=
TESTER_CUSTOMER_EMAIL=
TESTER_CUSTOMER_PASSWORD=
TESTER_TECHNICIAN_EMAIL=
TESTER_TECHNICIAN_PASSWORD=
```

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_BACKEND_URL` | Yes | Core URL of the backend server, **without** `/api/v1`. Example: `https://your-backend.com` |
| `NEXT_PUBLIC_BASE_URL_Production` | Yes | API base path. **Must be exactly `/api/v1`**, not the full backend URL. |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Yes | Google OAuth client ID used for "Continue with Google". |
| `TESTER_ADMIN_EMAIL` / `TESTER_ADMIN_PASSWORD` | Optional | Credentials of a demo admin account. |
| `TESTER_CUSTOMER_EMAIL` / `TESTER_CUSTOMER_PASSWORD` | Optional | Credentials of a demo customer account. |
| `TESTER_TECHNICIAN_EMAIL` / `TESTER_TECHNICIAN_PASSWORD` | Optional | Credentials of a demo technician account. |

> **Important:** variables starting with `NEXT_PUBLIC_` are embedded in the browser bundle, so never put secrets in them. Restart the dev server after changing any `.env` value.

---

## How the API Connection Works

The frontend never calls the backend URL directly. Instead, `next.config.ts` rewrites every request that starts with `/api/v1` to the backend:

```ts
async rewrites() {
  return [
    {
      source: "/api/v1/:path*",
      destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/:path*`,
    },
  ];
}
```

```text
Browser  ──►  /api/v1/zone  (same origin as the website)
                 │  Next.js rewrite
                 ▼
Backend  ──►  {NEXT_PUBLIC_BACKEND_URL}/api/v1/zone
```

This is why `NEXT_PUBLIC_BASE_URL_Production` is only `/api/v1` and `NEXT_PUBLIC_BACKEND_URL` has no `/api/v1`: the frontend sends relative requests, and Next.js adds the backend address. Because requests look same-origin to the browser, authentication cookies are sent reliably.

Remote images are allowed from `res.cloudinary.com` and `i.ibb.co.com` (see `images.remotePatterns` in `next.config.ts`). Add any new image host there.

---

## Test Accounts

To explore each role without registering, use the demo accounts configured through the `TESTER_*` variables.

| Role | Email | Password |
|---|---|---|
| Admin | _value of `TESTER_ADMIN_EMAIL`_ | _value of `TESTER_ADMIN_PASSWORD`_ |
| Customer | _value of `TESTER_CUSTOMER_EMAIL`_ | _value of `TESTER_CUSTOMER_PASSWORD`_ |
| Technician | _value of `TESTER_TECHNICIAN_EMAIL`_ | _value of `TESTER_TECHNICIAN_PASSWORD`_ |

> Do not commit real credentials to the repository. Share them with reviewers privately.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create an optimized production build |
| `npm run start` | Run the production build locally |

---

## Project Structure

A simplified view of the main folders (paths use the `@/` alias):

```text
app/                      Next.js routes (pages, layouts, loading and error pages)
components/
  ├── ui/                 shadcn/ui primitives (button, card, input, ...)
  ├── layout/shared/      Navbar, mobile nav, filter sidebar, page header, section header
  ├── modules/            Feature components (zones, outages, schedules, auth, ...)
  └── loader/             Skeleton and loading components
hooks/                    React Query hooks (data fetching and mutations)
lib/                      Utilities and API client
validation/               Form validation schemas
types/                    Shared TypeScript types
assets/                   Static assets such as the logo
```

---

## Deployment

The app is deployed on **Vercel**.

1. Import the repository into Vercel.
2. Add the environment variables from the [table above](#environment-variables) in **Project Settings → Environment Variables**.
3. Make sure `NEXT_PUBLIC_BASE_URL_Production` is `/api/v1` and `NEXT_PUBLIC_BACKEND_URL` is your deployed backend URL without `/api/v1`.
4. Deploy. Every push to the main branch redeploys automatically.

---

## Author

**Khalid Hossain**

- GitHub: [@khalidhossain5000](https://github.com/khalidhossain5000)

---

<p align="center">Built with ⚡ by Md Khalid Hossain</p>