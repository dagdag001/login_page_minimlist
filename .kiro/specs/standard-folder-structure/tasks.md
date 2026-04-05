# Implementation Plan: Standard Folder Structure Reorganization

## Overview

This plan reorganizes the authentication web application from a flat structure (backend files in project root) to a standard full-stack structure with a dedicated `/server` directory. The reorganization moves four backend files (server.js, db.js, validators.js, rateLimit.js) into the new directory while maintaining all functionality, import paths, and build processes.

This is a structural reorganization with no business logic changes. All relative imports between backend files remain unchanged since they move together. Only path references to the `/public` directory and package.json scripts need updates.

## Tasks

- [ ] 1. Create server directory and move backend files
  - Create `/server` directory in project root
  - Move `server.js` to `server/server.js`
  - Move `db.js` to `server/db.js`
  - Move `validators.js` to `server/validators.js`
  - Move `rateLimit.js` to `server/rateLimit.js`
  - _Requirements: 1.1, 1.2, 1.3_

- [ ] 2. Update static file serving paths in server.js
  - Update `express.static()` call: change `path.join(__dirname, "public")` to `path.join(__dirname, "..", "public")`
  - Update `res.sendFile()` call: change `path.join(__dirname, "public", "index.html")` to `path.join(__dirname, "..", "public", "index.html")`
  - _Requirements: 2.3, 5.2, 5.3_

- [ ] 3. Update package.json scripts
  - Update `"start"` script to `"node server/server.js"`
  - Update `"dev"` script to `"concurrently -k \"node server/server.js\" \"npm run dev --prefix client\""`
  - Update `"dev:server"` script to `"node server/server.js"`
  - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [ ] 4. Checkpoint - Verify server starts and serves frontend
  - Run `npm start` and verify server starts without errors
  - Navigate to `http://localhost:3000` and verify landing page loads
  - Verify no "Cannot find module" errors in console
  - Verify static assets (CSS, JS) load correctly
  - Ask the user if questions arise
  - _Requirements: 4.4, 5.1, 5.2, 5.3_

- [ ] 5. Update PROJECT_PRESENTATION.md documentation
  - Update "Project Structure" section to show `/server` directory instead of individual backend files in root
  - Update structure diagram to reflect new organization with server.js, db.js, validators.js, and rateLimit.js inside `/server`
  - Add `/public` directory to structure diagram for clarity
  - _Requirements: 6.1, 6.3_

- [ ] 6. Final checkpoint - Verify all functionality
  - Test API endpoints: `/api/oauth-config`, `/api/me`, `/api/signup`, `/api/login`
  - Test client-side routing: navigate to `/login` and `/signup` routes
  - Run `npm run build` and verify build completes successfully
  - Run `npm run dev` and verify concurrent mode works
  - Ensure all tests pass, ask the user if questions arise
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

## Notes

- No property-based tests needed - this is infrastructure reorganization, not feature implementation
- All relative imports between backend files remain unchanged (they move together)
- Environment variables (.env) stay in project root - dotenv.config() will find them automatically
- Client directory and build process remain completely unchanged
- Easy rollback: move files back to root and revert package.json if issues arise
