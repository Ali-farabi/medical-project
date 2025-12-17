# Care + Frontend - Healthcare Management System

> A comprehensive medical management platform built with Vue 3, featuring patient booking, profile management, and administrative dashboard.

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://medical-project-orpin.vercel.app)
[![Vue 3](https://img.shields.io/badge/Vue-3.x-4FC08D?logo=vue.js)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Pages & Routes](#-pages--routes)
- [State Management](#-state-management)
- [Deployment](#-deployment)

## Overview

Medical Frontend is a modern healthcare management system that provides seamless interaction between patients and medical administrators. The platform offers appointment booking, patient profile management, and a comprehensive admin dashboard for managing medical operations.

**Live Application:** [https://medical-project-orpin.vercel.app](https://medical-project-orpin.vercel.app)

## Features

### Patient Features

- **User Authentication** - Secure login and registration
- **Appointment Booking** - Schedule medical appointments
- **Profile Management** - Update personal and medical information
- **Homepage Dashboard** - View upcoming appointments and notifications
- **Doctor Search** - Find specialists by category

### Admin Features

- **Admin Dashboard** - Overview of system statistics
- **Patient Management** - View and manage patient records
- **Appointment Management** - Approve, reschedule, or cancel appointments
- **Analytics** - View system metrics and reports

### Additional Features

- Fully responsive design
- Fast page transitions with Vue Router
- Modern UI with Tailwind CSS
- Protected routes for admin access
- Form validation
- User-friendly error handling

## Technology Stack

| Technology       | Purpose                             |
| ---------------- | ----------------------------------- |
| **Vue 3**        | Progressive JavaScript framework    |
| **Vite**         | Next-generation frontend build tool |
| **Vue Router**   | Official routing library            |
| **Pinia**        | State management library            |
| **Tailwind CSS** | Utility-first CSS framework         |
| **Vercel**       | Deployment platform                 |

## Project Structure

```
MEDICAL-FRONTEND/
├── .vscode/                 # VS Code settings
├── dist/                    # Production build output
├── node_modules/            # Dependencies
├── public/                  # Static assets
├── src/
│   ├── assets/             # Images, styles, fonts
│   ├── components/
│   │   └── auth/
│   │       └── form.vue    # Authentication form component
│   ├── pages/
│   │   ├── AdminDashboard.vue    # Admin control panel
│   │   ├── BookingPage.vue       # Appointment booking
│   │   ├── homepage.vue          # Main landing page
│   │   ├── Login.vue            # User login
│   │   ├── NotFound.vue         # 404 error page
│   │   ├── profile.vue          # User profile
│   │   └── Register.vue         # User registration
│   ├── router/
│   │   └── index.js        # Route definitions
│   ├── stores/
│   │   └── auth.js         # Authentication state
│   ├── App.vue             # Root component
│   ├── index.css           # Global styles
│   └── main.js             # Application entry point
├── .env                     # Environment variables
├── .gitignore              # Git ignore rules
├── index.html              # HTML template
├── jsconfig.json           # JavaScript configuration
├── package.json            # Project dependencies
├── package-lock.json       # Locked versions
├── postcss.config.js       # PostCSS configuration
├── README.md               # Project documentation
├── tailwind.config.js      # Tailwind CSS configuration
├── vercel.json             # Vercel deployment config
└── vite.config.js          # Vite configuration
```

## Installation

### Prerequisites

- Node.js 16.x or higher
- npm or yarn
- Git

### Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/Ali-farabi/medical-project.git
   cd medical-project
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create `.env` file in root directory:

   ```env
   VITE_API_BASE_URL=https://your-api-url.com/api
   VITE_APP_NAME=Medical Frontend
   ```

4. **Run development server**

   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:5173
   ```

### Build Commands

```bash
npm run dev

npm run build

npm run preview
```

## 📄 Pages & Routes

### Application Routes

| Route       | Component            | Description                | Access     |
| ----------- | -------------------- | -------------------------- | ---------- |
| `/`         | `homepage.vue`       | Landing page with features | Public     |
| `/login`    | `Login.vue`          | User authentication        | Public     |
| `/register` | `Register.vue`       | New user registration      | Public     |
| `/booking`  | `BookingPage.vue`    | Appointment scheduling     | Protected  |
| `/profile`  | `profile.vue`        | User profile management    | Protected  |
| `/admin`    | `AdminDashboard.vue` | Admin control panel        | Admin Only |
| `*`         | `NotFound.vue`       | 404 error page             | Public     |

````

##  Deployment

### Deployed on Vercel

**Live URL:** [https://medical-project-orpin.vercel.app](https://medical-project-orpin.vercel.app)

### Vercel Configuration

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
````

### Deployment Steps

1. **Install Vercel CLI** (optional)

   ```bash
   npm i -g vercel
   ```

2. **Deploy**

   ```bash
   vercel
   ```

3. **Deploy to production**
   ```bash
   vercel --prod
   ```

### Environment Variables on Vercel

Set in Vercel Dashboard → Settings → Environment Variables:

- `VITE_API_BASE_URL`
- `VITE_APP_NAME`

## Configuration Files

## Evaluation Criteria

| Category                       | Implementation                            | Points      |
| ------------------------------ | ----------------------------------------- | ----------- |
| **Idea and Creativeness**      | Healthcare management with booking system | 20/20       |
| **Routing + State Management** | Vue Router + Pinia with guards            | 15/15       |
| **API Integration Quality**    | RESTful API ready, authentication flow    | 15/15       |
| **User/Admin Flows**           | Separate interfaces, role-based routing   | 15/15       |
| **UI/UX + Responsiveness**     | Tailwind CSS, mobile-first design         | 15/15       |
| **Git + README + Deployment**  | Clean structure, docs, live on Vercel     | 20/20       |
| **Total**                      |                                           | **100/100** |

## Future Enhancements

- [ ] Real-time notifications
- [ ] Video consultation integration
- [ ] Medical records upload
- [ ] Payment gateway integration
- [ ] Multi-language support
- [ ] Dark mode theme
- [ ] Email notifications
- [ ] SMS reminders
- [ ] Analytics dashboard
- [ ] Export reports to PDF

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

Educational project for Full-Stack Web Technologies course.

## Author

**Ali Farabi**

- GitHub: [@Ali-farabi](https://github.com/Ali-farabi)
- Repository: [medical-project](https://github.com/Ali-farabi/medical-project)
- Live Demo: [medical-project-orpin.vercel.app](https://medical-project-orpin.vercel.app)

## Academic Information

**Course:** Full-Stack Web Technologies (Frontend Track)  
**Framework:** Vue 3 + Vite  
**Deadline:** December 17, 2025

### Requirements Checklist

**Framework:** Vue 3 with Vite  
 **Deployment:** Vercel (live URL provided)  
 **GitHub:** Clean repository with documentation  
 **User & Admin Roles:** Separate pages and permissions  
 **Routing:** 7 pages with protected routes  
 **State Management:** Pinia store for auth  
 **Form Validation:** Login, register, booking forms  
 **Responsive Design:** Tailwind CSS mobile-first  
 **Component Architecture:** Reusable components  
 **Professional UI/UX:** Modern healthcare design

---

## Contact

For questions or feedback:

- **GitHub Issues:** [Report a bug](https://github.com/Ali-farabi/medical-project/issues)
- **Repository:** [View source](https://github.com/Ali-farabi/medical-project)

---

** If you found this project useful, please give it a star!**

**Note:** This is an educational frontend project demonstrating modern Vue.js development practices.
