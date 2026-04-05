# Design Document: Standard Folder Structure Reorganization

## Overview

This design specifies the technical approach for reorganizing the authentication web application from a flat structure (backend files in project root) to a standard full-stack structure with a dedicated server directory. The reorganization will move four backend files (server.js, db.js, validators.js, rateLimit.js) into a new `/server` directory while maintaining all functionality, import paths, and build processes.

The transformation is purely structural - no business logic changes. The design ensures zero downtime risk by maintaining all existing behaviors while improving project organization and developer experience.

## Architecture

### Current Structure
```
project-root/
├── client/              # React frontend
├── public/              # Build output
├── server.js            # Express server (root)
├── db.js                # Database module (root)
├── validators.js        # Validation middleware (root)
├── rateLimit.js         # Rate limiting middleware (root)
├── package.json         # Root package.json
└── .env                 # Environment config
```

### Target Structure
```
project-root/
├── client/              # React frontend (unchanged)
├── server/              # Backend code (NEW)
│   ├── server.js        # Express server (moved)
│   ├── db.js            # Database module (moved)
│   ├── validators.js    # Validation middleware (moved)
│   └── rateLimit.js     # Rate limiting middleware (moved)
├── public/              # Build output (unchanged)
├── package.json         # Root package.json (scripts updated)
└── .env                 # Environment config (unchanged)
```

### Design Rationale

**Why /server instead of /backend or /api:**
- Industry convention: Most full-stack Node.js projects use `/server` or `/backend`
- Consistency: Mirrors `/client` naming pattern
- Clarity: Clearly separates server-side from client-side code
- Simplicity: Single directory for all backend code (no nested structure needed for this project size)

**What stays in root:**
- Configuration files: package.json, .env, .env.example, .gitignore
- Documentation: README.md, PROJECT_PRESENTATION.md
- Client and public directories: No changes to frontend structure

## Components and Interfaces

### File Relocation Mapping

| Current Path | New Path | Type | Dependencies |
|--------------|----------|------|--------------|
| `server.js` | `server/server.js` | Express app | db.js, validators.js, rateLimit.js, dotenv, path |
| `db.js` | `server/db.js` | Database module | pg, process.env |
| `validators.js` | `server/validators.js` | Validation middleware | express-validator |
| `rateLimit.js` | `server/rateLimit.js` | Rate limit middleware | None (pure JS) |

### Import Path Transformations

#### server.js Changes

**Current imports:**
```javascript
require("dotenv").config();
const { initDb, signupUser, findUserByEmail, upsertGoogleUser } = require("./db");
const { signupValidators, loginValidators, validationErrors } = require("./validators");
const { rateLimit } = require("./rateLimit");
```

**New imports (no changes needed):**
```javascript
require("dotenv").config();  // Still resolves from project root
const { initDb, signupUser, findUserByEmail, upsertGoogleUser } = require("./db");
const { signupValidators, loginValidators, validationErrors } = require("./validators");
const { rateLimit } = require("./rateLimit");
```

**Rationale:** Since all four files move together into `/server`, relative imports between them remain unchanged. The dotenv.config() call still resolves `.env` from the project root correctly.

#### Static File Serving Changes

**Current path resolution:**
```javascript
app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
  // ...
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
```

**New path resolution:**
```javascript
app.use(express.static(path.join(__dirname, "..", "public")));
app.use((req, res, next) => {
  // ...
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});
```

**Rationale:** `__dirname` will now point to `/server`, so we need to go up one level (`..`) to reach `/public` in the project root.

### Package.json Script Updates

**Current scripts:**
```json
{
  "start": "node server.js",
  "dev": "concurrently -k \"node server.js\" \"npm run dev --prefix client\"",
  "dev:server": "node server.js"
}
```

**Updated scripts:**
```json
{
  "start": "node server/server.js",
  "dev": "concurrently -k \"node server/server.js\" \"npm run dev --prefix client\"",
  "dev:server": "node server/server.js"
}
```

**Unchanged scripts:**
```json
{
  "build": "npm run build --prefix client",
  "dev:client": "npm run dev --prefix client"
}
```

**Rationale:** Only scripts that reference server.js need updates. Client-related scripts remain unchanged since the client directory structure is not modified.

## Data Models

No data model changes. This is a structural reorganization only - database schema, API contracts, and data flows remain identical.

## Error Handling

### Potential Issues and Mitigations

**Issue 1: Path resolution errors after move**
- **Risk:** Static file serving fails if path.join() not updated
- **Detection:** Server starts but returns 404 for frontend routes
- **Mitigation:** Update all `__dirname` references to include `..` for parent directory
- **Validation:** Test that `http://localhost:3000` serves the landing page after reorganization

**Issue 2: Environment variable loading fails**
- **Risk:** dotenv.config() might not find .env file
- **Detection:** Server fails to start with "DATABASE_URL is not set" error
- **Mitigation:** dotenv.config() searches upward from execution directory, so it will find root .env
- **Validation:** Verify DATABASE_URL and JWT_SECRET load correctly on server start

**Issue 3: Import path errors**
- **Risk:** Relative imports break if not all files move together
- **Detection:** Node.js throws "Cannot find module" errors
- **Mitigation:** Move all four files atomically, verify relative imports remain unchanged
- **Validation:** Run `node server/server.js` and verify no module resolution errors

**Issue 4: Build process breaks**
- **Risk:** Vite build might fail if it references server files
- **Detection:** `npm run build` fails
- **Mitigation:** Vite config only references client code, so no changes needed
- **Validation:** Run `npm run build` and verify public/ directory is populated

## Testing Strategy

This is an infrastructure reorganization project, not a feature implementation. Property-based testing is not applicable. Instead, we use:

### Manual Verification Tests

**Test 1: Server Startup**
- Run `npm start`
- Verify server starts without errors
- Verify "http://localhost:3000" is logged
- Verify no "Cannot find module" errors

**Test 2: Frontend Serving**
- Navigate to `http://localhost:3000`
- Verify landing page loads correctly
- Verify all static assets (CSS, JS) load
- Verify no 404 errors in browser console

**Test 3: API Functionality**
- Test `/api/oauth-config` endpoint returns Google client ID
- Test `/api/me` endpoint returns 401 for unauthenticated requests
- Test `/api/signup` endpoint with valid data
- Test `/api/login` endpoint with valid credentials
- Verify all endpoints return expected responses

**Test 4: Client-Side Routing**
- Navigate to `http://localhost:3000/login`
- Verify login page loads (not 404)
- Navigate to `http://localhost:3000/signup`
- Verify signup page loads
- Verify SPA routing works correctly

**Test 5: Build Process**
- Run `npm run build`
- Verify build completes without errors
- Verify `public/` directory contains index.html and assets/
- Run `npm start` and verify production build serves correctly

**Test 6: Development Mode**
- Run `npm run dev`
- Verify both server and client start concurrently
- Verify hot reload works for client changes
- Verify API proxy works (client can call /api endpoints)

### Rollback Plan

If issues are discovered after reorganization:

1. **Immediate rollback:** Move four files back to root, revert package.json scripts
2. **Git revert:** If committed, use `git revert` to undo the reorganization commit
3. **No data loss risk:** No database changes, no data migrations, no schema updates

## Implementation Checklist

### Phase 1: Preparation
- [ ] Create `/server` directory in project root
- [ ] Verify current application works (run tests, start server)
- [ ] Create git branch for reorganization

### Phase 2: File Relocation
- [ ] Move `server.js` to `server/server.js`
- [ ] Move `db.js` to `server/db.js`
- [ ] Move `validators.js` to `server/validators.js`
- [ ] Move `rateLimit.js` to `server/rateLimit.js`

### Phase 3: Code Updates
- [ ] Update `server/server.js`: Change `path.join(__dirname, "public")` to `path.join(__dirname, "..", "public")` (2 occurrences)
- [ ] Update `package.json`: Change `"start": "node server/server.js"`
- [ ] Update `package.json`: Change `"dev": "concurrently -k \"node server/server.js\" \"npm run dev --prefix client\""`
- [ ] Update `package.json`: Change `"dev:server": "node server/server.js"`

### Phase 4: Documentation Updates
- [ ] Update `PROJECT_PRESENTATION.md`: Modify "Project Structure" section to show `/server` directory
- [ ] Update `README.md`: Add note about server directory if structure is documented

### Phase 5: Verification
- [ ] Run `npm start` and verify server starts
- [ ] Test `http://localhost:3000` loads landing page
- [ ] Test all API endpoints function correctly
- [ ] Test client-side routing works
- [ ] Run `npm run build` and verify build succeeds
- [ ] Run `npm run dev` and verify concurrent mode works

### Phase 6: Finalization
- [ ] Commit changes with descriptive message
- [ ] Update any deployment scripts if they reference old paths
- [ ] Notify team of new structure

## Documentation Updates

### PROJECT_PRESENTATION.md Changes

**Current "Project Structure" section:**
```markdown
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
```

**Updated "Project Structure" section:**
```markdown
## Project Structure

```
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   ├── constants/   # Static data
│   │   └── hooks/       # Custom React hooks
│   └── public/          # Static assets
├── server/              # Express backend
│   ├── server.js        # Main server file
│   ├── db.js            # Database operations
│   ├── validators.js    # Input validation
│   └── rateLimit.js     # Rate limiting logic
└── public/              # Production build output
```
```

### README.md Changes

The current README.md is minimal ("# login_page_minimlist"). If it's expanded in the future to include setup instructions, ensure any references to running the server use `node server/server.js` instead of `node server.js`.

## Deployment Considerations

### Environment Variables
- No changes to .env file location or structure
- All environment variables remain in project root
- dotenv.config() will continue to find and load .env correctly

### Build Process
- Vite build configuration unchanged (builds to `../public`)
- No changes to client build process
- Static file serving updated to reference correct path

### Hosting Platforms
- **Heroku:** Update Procfile if it exists: `web: node server/server.js`
- **Railway/Render:** Update start command in dashboard to `node server/server.js`
- **Docker:** Update CMD in Dockerfile to reference `server/server.js`
- **PM2:** Update ecosystem.config.js to reference `server/server.js`

### CI/CD Pipelines
- Update any scripts that run `node server.js` directly
- Update any test commands that reference old paths
- No changes needed for `npm start` if package.json is updated

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Static files not served | Low | High | Update path.join() calls, test thoroughly |
| Module import errors | Low | High | Move all files together, verify relative imports |
| Environment variables not loaded | Very Low | High | dotenv searches upward, test on startup |
| Build process breaks | Very Low | Medium | Vite config independent of server location |
| Deployment scripts fail | Medium | Medium | Update deployment configs proactively |
| Team confusion | Low | Low | Update documentation, communicate changes |

## Success Criteria

The reorganization is successful when:

1. ✅ Server starts without errors using `npm start`
2. ✅ Frontend loads correctly at `http://localhost:3000`
3. ✅ All API endpoints function identically to before
4. ✅ Client-side routing works (SPA navigation)
5. ✅ Build process completes successfully
6. ✅ Development mode works with concurrent server/client
7. ✅ Documentation reflects new structure
8. ✅ No functionality regressions

## Future Considerations

After this reorganization, the project will be better positioned for:

- **Modular backend structure:** Easier to split server.js into routes/, controllers/, middleware/
- **Separate backend testing:** Can add server/tests/ directory for backend-specific tests
- **Microservices migration:** Clear separation makes it easier to extract backend to separate service
- **Monorepo setup:** Standard structure compatible with tools like Nx, Turborepo, or Lerna
- **TypeScript migration:** Easier to configure separate tsconfig.json for server and client

## Conclusion

This design provides a comprehensive plan for reorganizing the project structure to follow industry best practices. The transformation is low-risk because:

1. No business logic changes
2. Minimal code modifications (only path references)
3. All relative imports remain unchanged
4. Environment configuration unchanged
5. Build process unchanged
6. Easy rollback if issues arise

The reorganization improves developer experience by providing clear separation between frontend and backend code, making the project more maintainable and scalable.
