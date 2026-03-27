# Clinic System - MediQueue

A full-stack clinic appointment and queue management system built with Node.js, Express, MongoDB, and vanilla JavaScript.

## Features

- User authentication (patients and admins)
- Doctor management
- Appointment booking
- Queue management
- Email notifications
- Real-time queue status

## Tech Stack

- **Backend**: Node.js, Express.js, MongoDB, JWT, bcrypt
- **Frontend**: HTML, CSS, JavaScript
- **Email**: Nodemailer with Gmail

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   cd server
   npm install
   ```
3. Set up environment variables in `server/.env`:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   EMAIL_USER=your_gmail@gmail.com
   EMAIL_PASS=your_gmail_app_password
   ```
4. Start the backend:
   ```bash
   npm start
   ```
5. Start the frontend (from root directory):
   ```bash
   npx http-server -p 3000
   ```
6. Open `http://localhost:3000` in your browser

## API Endpoints

- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/doctors` - Get all doctors
- `POST /api/doctors` - Add doctor (admin only)
- `POST /api/appointments` - Book appointment
- `GET /api/queue/status` - Get queue status

## Deployment

### Vercel (Backend + Frontend)
1. **Backend Deployment**:
   - Import your GitHub repo to Vercel
   - Set root directory to `server/`
   - Add environment variables in Vercel dashboard:
     ```
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     EMAIL_USER=your_gmail@gmail.com
     EMAIL_PASS=your_gmail_app_password
     ```
   - Deploy!

2. **Frontend Deployment**:
   - Create a new Vercel project for the frontend
   - Set root directory to `.` (root)
   - Deploy the static files
   - Update `API_URL` in `app.js` to point to your backend URL

### Alternative: Netlify (Frontend) + Vercel (Backend)
- Deploy backend to Vercel as above
- Deploy frontend to Netlify with the `_redirects` file for SPA routing