# CTS Frontend Documentation

## Project Overview

The CTS Frontend Project is a modern, responsive web application built with React and Vite. It serves as the client-facing website and administrative dashboard for CTS (Creative Technology Solutions). The application features a public-facing website showcasing services, products, case studies, and company information, alongside a secure admin dashboard for content management.

## Technologies Used

### Core Technologies
- **React 18.3.1** - JavaScript library for building user interfaces
- **Vite 5.4.0** - Next-generation frontend build tool
- **React Router DOM 6.26.1** - Declarative routing for React applications

### UI & Styling
- **Material-UI (MUI) 5.16.7** - React component library
- **Framer Motion 11.3.28** - Animation library for React
- **Swiper 11.1.14** - Modern mobile touch slider
- **CSS Modules** - Scoped CSS styling

### Rich Text Editing
- **TipTap 2.10.3** - Headless, framework-agnostic rich text editor
  - Full-featured WYSIWYG editing
  - Support for headings, lists, links, code blocks, and text formatting
  - Text alignment and placeholder extensions

### State Management & Authentication
- **React Auth Kit 3.1.3** - Authentication and authorization library
- **React Helmet Async 2.0.5** - Document head management

### Data Display
- **Material React Table 2.13.1** - Powerful data table component
- **DayJS 1.11.13** - Date manipulation library

### Build & Optimization
- **Vite Plugin Compression2** - Gzip and Brotli compression
- **Code Splitting** - Automatic code splitting for optimized loading

## Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js** (version 16.x or higher recommended)
- **npm** (version 7.x or higher) or **yarn**
- **Git** (for version control)

## Installation and Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd cts-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
VITE_BACKEND_URL=<backend-api-url>
```

**Note:** The backend URL is used for API proxy configuration during development.

### 4. Running the Development Server

```bash
npm run dev
```

The application will start on `http://localhost:5173` (default Vite port).

### 5. Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` directory.

### 6. Preview Production Build

```bash
npm run preview
```

## Project Architecture

### Directory Structure

```
cts-frontend-main/
├── public/                      # Static assets
│   └── assets/                  # Images, icons, fonts, media
│       ├── backgrounds/         # Background images
│       ├── icons/              # SVG icons
│       ├── fonts/              # Custom fonts (Helvetica Now Display)
│       ├── productLogos/       # Product brand logos
│       └── socialIcons/        # Social media icons
├── src/
│   ├── components/             # Reusable UI components
│   │   ├── ArrowIcon/          # Custom arrow icon component
│   │   ├── Body/               # Main body wrapper
│   │   ├── Button/             # Custom button component
│   │   ├── CaseStudyCard/      # Case study display cards
│   │   ├── CMS/                # Content Management System components
│   │   ├── ContactSection/     # Contact form section
│   │   ├── CustomSwiper/       # Custom Swiper carousel
│   │   ├── DashboardBody/      # Dashboard layout wrapper
│   │   ├── DashboardNav/       # Dashboard navigation
│   │   ├── DropFileZone/       # Drag-and-drop file upload
│   │   ├── EndSection/         # Page footer section
│   │   ├── FadeUpEffect/       # Animation component
│   │   ├── FloatingFooter/     # Sticky footer component
│   │   ├── Footer/             # Main footer
│   │   ├── HeroSection/        # Hero banner component
│   │   ├── HomeHeroSection/    # Home page hero
│   │   ├── LoadingScreen/      # Loading spinner
│   │   ├── MainHeader/         # Main navigation header
│   │   ├── MultiSelectInput/   # Multi-select dropdown
│   │   ├── NumberCounter/      # Animated number counter
│   │   ├── Popup/              # Modal/popup component
│   │   ├── ProductCard/        # Product display cards
│   │   ├── PublishSection/     # Content publishing controls
│   │   ├── RichTextEditor/     # TipTap-based rich text editor
│   │   ├── ServiceCard/        # Service display cards
│   │   ├── TitleAndSeparator/  # Section title component
│   │   ├── VideoPlayer/        # Custom video player
│   │   └── layouts/            # Page layout templates
│   ├── pages/                  # Page components
│   │   ├── Home/               # Home page
│   │   ├── AboutUs/            # About us page
│   │   ├── Products/           # Products listing
│   │   ├── Aiducator/          # Aiducator product page
│   │   ├── Blogs/              # Blog/events listing
│   │   ├── CaseStudies/        # Case studies listing
│   │   ├── ContactUs/          # Contact page
│   │   ├── Media/              # Media hub page
│   │   ├── News/               # News listing
│   │   ├── Testimonials/       # Testimonials page
│   │   ├── Login/              # Admin login
│   │   └── Dashboard/          # Admin dashboard pages
│   │       ├── Home/           # Dashboard home
│   │       ├── Pages/          # Page management
│   │       ├── Products/       # Product management
│   │       ├── Services/       # Service management
│   │       ├── Blogs/          # Blog/event management
│   │       ├── CaseStudy/      # Case study management
│   │       ├── Testimonials/   # Testimonial management
│   │       ├── News/           # News management
│   │       ├── TeamMembers/    # Team member management
│   │       ├── Users/          # User management
│   │       └── SuccessStory/   # Success story management
│   ├── hooks/                  # Custom React hooks
│   │   ├── useAlertSnackbar.jsx  # Snackbar notifications
│   │   ├── useDialog.jsx       # Dialog/modal state management
│   │   ├── useDisplay.js       # Display utilities
│   │   └── useLoadingData.js   # Data loading state
│   ├── constants/              # Application constants
│   │   ├── assets.js           # Asset paths
│   │   └── types.js            # Type definitions
│   ├── utils/                  # Utility functions
│   │   └── verify_password.js  # Password validation
│   ├── styles/                 # Global styles
│   │   └── reset.css           # CSS reset
│   ├── App.jsx                 # Main application component
│   ├── App.css                 # Application styles
│   ├── main.jsx                # Application entry point
│   └── index.css               # Global styles
├── index.html                  # HTML template
├── vite.config.js              # Vite configuration
├── eslint.config.js            # ESLint configuration
└── package.json                # Project dependencies

```

### Application Architecture

#### 1. Routing Structure

The application uses **React Router v6** with two main layouts:

**Public Routes (PageLayout):**
- `/` - Home page
- `/about` - About us
- `/media` - Media hub
- `/media/news` - News articles
- `/media/events` - Blog/events
- `/media/case-studies` - Case studies
- `/media/testimonials` - Client testimonials
- `/products` - Products catalog
- `/products/aiducator` - Aiducator product page
- `/contact` - Contact form

**Protected Routes (DashboardLayout):**
All dashboard routes require authentication via `AuthOutlet`:
- `/dashboard` - Dashboard home
- `/dashboard/pages/:slug` - Dynamic page editor
- `/dashboard/page/home` - Home page editor
- `/dashboard/products` - Product management
- `/dashboard/services` - Service management
- `/dashboard/events` - Blog/event management
- `/dashboard/news` - News management
- `/dashboard/testimonials` - Testimonial management
- `/dashboard/case-studies` - Case study management
- `/dashboard/success-stories` - Success story management
- `/dashboard/team-members` - Team member management
- `/dashboard/users` - User management

#### 2. Authentication System

The application uses **React Auth Kit** for authentication:
- Cookie-based authentication storage
- JWT token management
- Protected route wrapper (`AuthOutlet`)
- Automatic redirect to `/login` for unauthenticated users
- Secure cookie configuration based on environment

#### 3. State Management

**Local Component State:**
- React hooks (`useState`, `useEffect`, `useReducer`)

**Global Context:**
- `DialogProvider` - Global dialog/modal management
- `AlertSnackbarProvider` - Global notification system
- `AuthProvider` - Authentication state

**Custom Hooks:**
- `useAlertSnackbar` - Display success/error notifications
- `useDialog` - Manage modal dialogs
- `useDisplay` - Responsive display utilities
- `useLoadingData` - Handle async data loading states

#### 4. Component Architecture

**Component Patterns:**
- **CSS Modules** - Scoped styling for each component
- **Functional Components** - Modern React with hooks
- **Composition** - Reusable, composable components
- **Lazy Loading** - Code splitting for optimal performance

**Common Components:**
- Cards (Product, Service, Case Study, Testimonial)
- Forms (Contact, Login, Dashboard forms)
- Navigation (Header, Footer, Dashboard Nav)
- Media (Video Player, Image Upload)
- Content (Rich Text Editor, CMS)

#### 5. API Integration

**Development Proxy:**
Vite development server proxies `/api` requests to the backend:
```javascript
proxy: {
  "/api": {
    target: env.VITE_BACKEND_URL,
    changeOrigin: true,
  },
}
```

**API Communication:**
- RESTful API calls to backend
- JWT authentication headers
- File upload support (Azure Blob Storage)

#### 6. Build Optimization

**Performance Features:**
- **Code Splitting** - Automatic splitting by route and vendor
- **Compression** - Gzip and Brotli compression in production
- **Manual Chunks** - Optimized vendor bundles
- **Tree Shaking** - Dead code elimination
- **Asset Optimization** - Image and font optimization

**Security Headers:**
The development server includes security headers:
- `Strict-Transport-Security`
- `X-Content-Type-Options`
- `X-Frame-Options`
- `X-XSS-Protection`

## Key Features

### Public Website
- **Responsive Design** - Mobile-first, responsive layouts
- **Modern UI/UX** - Material Design with custom styling
- **Animations** - Smooth transitions with Framer Motion
- **SEO Optimization** - Dynamic meta tags with React Helmet
- **Contact Forms** - Lead generation and inquiries
- **Media Hub** - News, blogs, case studies, testimonials
- **Product Showcase** - Interactive product catalog
- **Video Content** - Custom video player with controls

### Admin Dashboard
- **Content Management** - CRUD operations for all content types
- **Rich Text Editor** - Full-featured WYSIWYG editor
- **File Upload** - Drag-and-drop file management
- **User Management** - Admin user control
- **Data Tables** - Sortable, filterable data tables
- **Live Preview** - Preview changes before publishing
- **Role-Based Access** - Secure authentication and authorization

## Development Guidelines

### Code Style
- Use ESLint for code linting
- Follow React best practices
- Use CSS Modules for component styling
- Implement responsive design principles

### Component Development
- Create reusable, composable components
- Keep components small and focused
- Use PropTypes or TypeScript for type checking
- Document component props and usage

### Performance Considerations
- Lazy load routes and heavy components
- Optimize images and assets
- Use React.memo for expensive components
- Minimize re-renders with proper dependency arrays

## Deployment

### Build for Production

```bash
npm run build
```

The build process:
1. Generates optimized production build
2. Creates compressed assets (gzip, brotli)
3. Splits code into optimized chunks
4. Outputs to `dist/` directory

### Environment Variables

Ensure production environment variables are set:
- `VITE_BACKEND_URL` - Production API URL

### Deployment Platforms

The application can be deployed to:
- **Vercel** - Recommended for Vite applications
- **Netlify** - Static site hosting
- **AWS S3 + CloudFront** - Static hosting with CDN
- **Azure Static Web Apps** - Microsoft Azure hosting
- **Traditional Web Servers** - Nginx, Apache

### Deployment Checklist

- [ ] Set production environment variables
- [ ] Build the application
- [ ] Test the production build locally (`npm run preview`)
- [ ] Configure backend API URL
- [ ] Set up HTTPS/SSL certificates
- [ ] Configure domain and DNS
- [ ] Enable CDN for static assets
- [ ] Set up monitoring and analytics

## Troubleshooting

### Common Issues

**Port Already in Use:**
```bash
# Kill the process using port 5173
lsof -ti:5173 | xargs kill -9
```

**Module Not Found:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Build Errors:**
```bash
# Clear Vite cache
rm -rf node_modules/.vite
npm run build
```

**Environment Variables Not Working:**
- Ensure `.env` file exists in root directory
- Restart development server after changing `.env`
- Prefix all variables with `VITE_`

## Support and Maintenance

### Version Updates

Keep dependencies up to date:
```bash
# Check for outdated packages
npm outdated

# Update packages
npm update
```
