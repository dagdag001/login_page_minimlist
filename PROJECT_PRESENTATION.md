# Authentication Web Application

## Overview
A modern, minimalist authentication system with a beautiful landing page and secure user management.

---

## Tech Stack

### Frontend
- **React** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Navigation

### Backend
- **Node.js + Express** - Server framework
- **PostgreSQL** - Database
- **JWT** - Token-based authentication
- **bcryptjs** - Password hashing
- **Google OAuth 2.0** - Social login

---

## Key Features

### 🔐 Authentication
- Email/password signup and login
- Google Sign-In integration (Gmail only)
- JWT token-based sessions
- Secure password hashing (bcrypt)

### 🎨 User Interface
- Modern landing page with:
  - Hero section
  - Features showcase
  - Destinations gallery
  - How it works guide
  - Testimonials
  - Call-to-action banners
- Responsive design
- Smooth animations

### 🛡️ Security
- Rate limiting on API endpoints
- Input validation
- SQL injection protection
- Secure token management
- Environment-based configuration

---

## Project Structure

```
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   ├── constants/   # Static data
│   │   └── hooks/       # Custom React hooks
│   └── public/          # Static assets
├── server.js            # Express backend
├── db.js                # Database operations
├── validators.js        # Input validation
└── rateLimit.js         # Rate limiting logic
```

---

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/signup` | POST | Create new user account |
| `/api/login` | POST | Login with credentials |
| `/api/auth/google` | POST | Google OAuth login |
| `/api/me` | GET | Get current user info |
| `/api/oauth-config` | GET | Get OAuth configuration |

---

## Getting Started

### Prerequisites
- Node.js
- PostgreSQL database
- Google OAuth credentials (optional)

### Installation
```bash
# Install dependencies
npm install
cd client && npm install

# Setup environment
cp .env.example .env
# Configure database and JWT secret

# Run development
npm run dev
```

---

## Environment Variables

- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `PORT` - Server port (default: 3000)
- Rate limiting configuration

---

## Use Cases

✅ User registration and authentication  
✅ Social login integration  
✅ Protected routes and sessions  
✅ Landing page for product showcase  
✅ Scalable authentication foundation  

---

## Future Enhancements

- Email verification
- Password reset functionality
- Multi-factor authentication
- Additional OAuth providers
- User profile management
- Admin dashboard

---

**Built with ❤️ using modern web technologies**
