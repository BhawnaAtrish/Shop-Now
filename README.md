# Shop Now - Modern E-commerce Platform

A modern, responsive e-commerce platform built with Next.js, TypeScript, and Tailwind CSS. This project showcases a beautiful UI with smooth animations, responsive design, and a great user experience.

## Features

### 🛍️ Product Management
- Product listing with filtering and sorting
- Detailed product pages
- Product categories and tags
- Price range filtering
- Rating-based filtering
- Search functionality

### 🎨 UI/UX Features
- Responsive design for all screen sizes
- Beautiful animations and transitions
- Dark mode theme
- Interactive product cards
- Image carousel for product galleries
- Star rating system
- Loading states and skeletons

### 🔍 Search & Filtering
- Real-time search functionality
- Category-based filtering
- Price range filtering
- Rating-based filtering
- Sort by price and release date
- Related products suggestions

### 🛒 User Experience
- Protected routes for authenticated users
- Smooth navigation between pages
- Back button functionality
- Responsive layouts
- Loading states
- Error handling

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Tabler Icons, Lucide React
- **HTTP Client:** Axios
- **State Management:** React Hooks
- **Routing:** Next.js App Router

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/shop-now.git
cd shop-now
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
shop-now/
├── app/
│   ├── components/     # Reusable UI components
│   ├── landing-page/   # Landing page components
│   ├── products/       # Product-related pages
│   ├── login/         # Authentication pages
│   ├── signup/        # Authentication pages
│   ├── services/      # API services
│   └── globals.css    # Global styles
├── public/            # Static assets
└── package.json       # Project dependencies
```

## Key Components

- `ProductCard`: Displays product information in a card format
- `ProductTrendingCard`: Specialized card for trending products
- `FeaturedProductsSection`: Reusable section for featured products
- `ProductCarousel`: Image carousel for product galleries
- `ProductFilters`: Filtering and sorting controls
- `Topbar`: Navigation and search bar
- `Footer`: Site footer

## API Integration

The project uses the DummyJSON API for product data:
- Product listing: `https://dummyjson.com/products`
- Product details: `https://dummyjson.com/products/{id}`
- Category-based products: `https://dummyjson.com/products/category/{category}`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [DummyJSON](https://dummyjson.com/)
- [Tabler Icons](https://tabler-icons.io/)
- [Lucide React](https://lucide.dev/)
