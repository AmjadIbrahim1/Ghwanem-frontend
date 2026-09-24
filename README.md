# 🏫 Ghwanem Frontend — School Results System

<div align="center">

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)

**Frontend dashboard for the School Results System**

</div>

---

## 📌 Project Overview

**Ghwanem Frontend** is the web dashboard for the School Results System. It provides an admin interface for managing school results, viewing analytics, and exporting reports — built with React, Vite, and Tailwind CSS, and deployed on Vercel.

---

## ✨ Key Features

- 🔐 **Admin Login** – Secure authentication page for administrators
- 📊 **Admin Panel** – Dashboard for managing and viewing results
- 🏠 **Home Page** – Public landing and overview
- 📈 **Analytics & Charts** – Data visualization with Recharts
- 📄 **Export Capabilities** – Excel export (xlsx) and PDF generation (jsPDF)
- 🖼️ **Screenshot Capture** – html2canvas integration
- 🎨 **Modern UI** – Tailwind CSS with Framer Motion animations

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 19** | UI framework |
| **Vite 7** | Build tool & dev server |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Styling |
| **TanStack Query** | Server state management |
| **Axios** | HTTP client |
| **Recharts** | Charts & analytics |
| **Framer Motion** | Animations |
| **xlsx / jsPDF** | Excel & PDF export |
| **html2canvas** | Screenshot capture |
| **lucide-react** | Icons |

---

## 📁 Project Structure

```
Ghwanem-frontend/
├── src/
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # Entry point
│   ├── components/        # Reusable components
│   ├── context/           # React context
│   ├── pages/
│   │   ├── Home.tsx       # Public home page
│   │   ├── AdminLogin.tsx # Admin login
│   │   └── AdminPanel.tsx # Admin dashboard
│   ├── services/          # API services
│   ├── styles/            # Global styles
│   ├── types/             # TypeScript types
│   └── utils/             # Helpers
├── index.html
├── tailwind.config.js
├── vite.config.ts
├── vercel.json            # Vercel deployment config
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+

### Installation

```bash
# Clone the repository
git clone https://github.com/AmjadIbrahim1/Ghwanem-frontend.git
cd Ghwanem-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The app runs at `http://localhost:5173`.

---

## 📦 Available Scripts

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run lint     # ESLint
npm run preview  # Preview production build
```

---

## 🚢 Deployment

The project includes a `vercel.json` configuration for deployment on **Vercel**. Connect the repository to Vercel and it auto-detects the Vite setup.

---

## 👨‍💻 Author

**Amjad Ibrahim**

- GitHub: [AmjadIbrahim1](https://github.com/AmjadIbrahim1)
