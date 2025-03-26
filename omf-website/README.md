# OMF Vitrine Website

A modern, responsive single-page website showcasing the OMF (Open MagicDraw Framework), designed to highlight its features, architecture, and capabilities.

## Features

- Modern, responsive single-page design
- Interactive UI with smooth animations
- 7 feature sections with placeholder for media (GIFs, images, videos)
- Sticky navigation
- Optimized for performance

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: Shadcn UI
- **Animations**: Framer Motion
- **Containerization**: Docker

## Getting Started

### Development

To run the development server:

```bash
# Navigate to the project directory
cd omf-website

# Install dependencies
npm install

# Start the development server
npm run dev
```

The server will run on http://localhost:3000 by default.

### Production Build with Docker

To build and run the production version using Docker:

```bash
# Navigate to the project directory
cd omf-website

# Build and start the Docker container
docker-compose up -d

# To stop the container
docker-compose down
```

The website will be available at http://localhost:3280.

## Structure

- `/src/app` - Next.js app router pages
- `/src/components` - Reusable components
  - `/src/components/sections` - Website sections
  - `/src/components/ui` - UI components from Shadcn
- `/src/lib` - Utility functions and helpers
- `/public` - Static assets (add your images/GIFs here)

## Customization

- **Images/GIFs**: Replace placeholder components with actual media in the appropriate section components
- **Colors**: Modify the Tailwind theme in `tailwind.config.js`
- **Content**: Update text content in the section components

## License

MIT
