# RMSTU CSE Department Tour 2026

A bilingual (English/Bengali) Next.js web application for the Sundarban tour organized by the CSE Department of Rangamati Science and Technology University.

## Features

- **Bilingual Interface** - Switch between English and Bengali
- **Dark/Light Theme** - Theme toggle with persistent preferences
- **Tour Information** - Complete details including destinations, schedule, and budget
- **Pre-Registration** - Integrated Google Forms for tour registration
- **Payment Details** - bKash and Bank transfer information with copy functionality
- **Responsive Design** - Mobile-friendly interface
- **Tour Flyer Modal** - View promotional poster

## Tech Stack

- **Framework:** Next.js 16
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui + Radix UI
- **Icons:** Lucide React
- **Theme:** next-themes

## Getting Started

### Prerequisites

- Node.js 20 or higher
- pnpm (recommended)

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build for Production

```bash
pnpm build
pnpm start
```

## Project Structure

```
├── app/              # Next.js app directory
├── components/       # React components
│   ├── ui/          # shadcn/ui components
│   ├── FlyerModal.tsx
│   ├── ThemeToggle.tsx
│   └── theme-providers.tsx
├── data/            # Tour content and configuration
│   └── tourContent.ts
├── lib/             # Utility functions
└── public/          # Static assets
```

## Configuration

Edit tour details in `/data/tourContent.ts`:

- Tour dates
- Pre-registration deadline
- Budget information
- Destinations
- Schedule
- Payment details
- Google Form link

## License

Private project for academic use.
