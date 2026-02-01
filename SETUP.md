# Setup Instructions for Separate Repository

## Repository Name
**Contacts Management API**

## Initial Git Setup

1. **Initialize Git repository:**
   ```bash
   # If you're in the backend directory already:
   git init
   
   # Or if you need to navigate there:
   cd Contacts-Management-API
   git init
   ```

2. **Add all files:**
   ```bash
   git add .
   ```

3. **Create initial commit:**
   ```bash
   git commit -m "Initial commit: Contacts Management API"
   ```

4. **Add remote repository (after creating on GitHub):**
   ```bash
   git remote add origin https://github.com/yourusername/Contacts-Management-API.git
   ```

5. **Push to GitHub:**
   ```bash
   git branch -M main
   git push -u origin main
   ```

## Environment Setup

1. **Copy .env.example to .env:**
   ```bash
   cp .env.example .env
   ```

2. **Edit .env with your values:**
   - Update `MONGO_URI` if using MongoDB Atlas
   - Change `JWT_SECRET` to a secure random string
   - Adjust `PORT` if needed (default: 3000)

## Important Notes

- The `.env` file is in `.gitignore` and will not be committed
- Make sure MongoDB is running before starting the server
- The API is configured to accept requests from `http://localhost:8000` (frontend)
