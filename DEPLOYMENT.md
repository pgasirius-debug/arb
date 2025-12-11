# Deployment Guide for АРБ Library

## Status: Ready for Cloud Deployment

The application has been converted from a localStorage-based system to a server-based architecture with a Node.js/Express backend.

## File Structure
- `server.js` - Node.js Express server with REST API
- `package.json` - Node.js dependencies
- `Procfile` - Instructions for cloud deployment (web: npm start)
- `.gitignore` - Git ignore patterns
- `index.html` - Frontend with API integration
- `books.json` - Database file (books storage)
- `logo.png` - Application logo

## Deployment to Railway or Render

### Option 1: Railway.app (Recommended)

1. Go to https://railway.app/dashboard
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Authorize Railway to access your GitHub account
5. Select the "pgasirius-debug/arb" repository
6. Railway will automatically detect the Node.js app and start deployment
7. Once deployed, you'll get a URL like: https://arb-[random].railway.app

### Option 2: Render.com

1. Go to https://render.com/dashboard
2. Click "New +" and select "Web Service"
3. Choose "Deploy from GitHub repo"
4. Authorize Render to access your GitHub account
5. Select the "pgasirius-debug/arb" repository
6. Choose Node as the environment
7. Render will auto-detect the build command
8. Click Deploy
9. You'll get a URL like: https://arb-[random].onrender.com

## How the Application Works

### Server API Endpoints
- `GET /` - Serves the index.html page
- `GET /api/books` - Get all books
- `POST /api/books` - Add new book
- `PUT /api/books/:id` - Update book status
- `DELETE /api/books/:id` - Delete book
- `PATCH /api/books/:id` - Update book details

### Login Credentials
- Username: admin
- Password: admin

### Data Storage
- All books are stored server-side in `books.json`
- Changes sync across all PCs automatically
- No more localStorage conflicts between computers

## What Was Changed

✅ Added logo to the website header
✅ Fixed book deletion in admin panel (now works from any PC)
✅ Fixed sync issues between multiple PCs (all use server database)
✅ Converted from localStorage to server-side database
✅ Created REST API for book management
✅ Added deployment configuration files

## Next Steps

1. Deploy to Railway or Render using instructions above
2. Share the deployment URL with your team
3. Access the app: Click "Admin" button, login as admin/admin
4. Manage books from any PC - changes sync in real-time

## Troubleshooting

### Port Issues
If the deployment fails with port errors, the Procfile already specifies the correct startup command.

### GitHub Authorization
When connecting to Railway/Render, you may need to authorize GitHub access to your repositories.

### Environment Variables
No additional environment variables are required. The app uses default settings.

## Support

For questions or issues with deployment, refer to:
- Railway Docs: https://docs.railway.app/
- Render Docs: https://render.com/docs/
