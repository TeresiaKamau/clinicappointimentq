# Frontend Deployment Instructions (Vercel)

## 1. Deploying the Frontend
- Go to https://vercel.com/dashboard
- Click **Add New Project**
- Import your GitHub repo (choose the repo with this `/frontend` folder)
- Set the **root directory** to `frontend`
- Deploy!

## 2. Connect to Backend
- The frontend is already configured to use your backend API at:
  `https://clinic-frontend-sooty.vercel.app/api`
- No further changes needed in `app.js` unless your backend URL changes.

## 3. After Deploying
- Vercel will give you a new live URL for your frontend (e.g., `https://your-frontend-url.vercel.app`)
- Open that URL in your browser to use your full-stack clinic system!

## 4. Troubleshooting
- If you see CORS or network errors, make sure your backend is live and accessible at the above URL.
- If you change your backend URL, update `API_URL` in `frontend/app.js` and redeploy the frontend.

---

**You now have a clean separation of frontend and backend for Vercel!**
