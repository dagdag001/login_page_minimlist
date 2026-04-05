# Requirements Document

## Introduction

This document defines requirements for reorganizing the authentication web application to follow standard folder structure conventions for full-stack Node.js applications. The current structure has backend files (server.js, db.js, validators.js, rateLimit.js) scattered in the project root, which should be organized into a dedicated server/backend directory following industry best practices.

## Glossary

- **Project_Root**: The top-level directory containing the entire application
- **Server_Directory**: A dedicated folder containing all backend/server code (commonly named "server", "backend", or "api")
- **Client_Directory**: The existing /client folder containing the React frontend application
- **Build_Directory**: The /public folder containing compiled frontend assets for production serving
- **Configuration_Files**: Files like package.json, .env, .gitignore that remain in the project root
- **Backend_Module**: A JavaScript file containing server-side logic (routes, database, validation, middleware)
- **Import_Path**: The file path used in require() or import statements to reference modules

## Requirements

### Requirement 1: Organize Backend Code into Server Directory

**User Story:** As a developer, I want all backend code organized in a dedicated server directory, so that the project structure is clear and follows industry conventions.

#### Acceptance Criteria

1. THE Project_Root SHALL contain a server directory for all backend code
2. THE Server_Directory SHALL contain all Express server files (server.js, db.js, validators.js, rateLimit.js)
3. THE Server_Directory SHALL maintain the current file names for easy identification
4. THE Client_Directory SHALL remain in its current location at /client
5. THE Build_Directory SHALL remain at /public for serving compiled frontend assets

### Requirement 2: Update Module Import Paths

**User Story:** As a developer, I want all import paths updated automatically, so that the application continues to work after reorganization.

#### Acceptance Criteria

1. WHEN backend files are moved to the Server_Directory, THE system SHALL update all require() statements to reflect new relative paths
2. THE server.js file SHALL update its imports of db.js, validators.js, and rateLimit.js to use correct relative paths
3. THE server.js file SHALL update the path.join() calls for serving static files from /public
4. FOR ALL Backend_Modules, relative imports SHALL resolve correctly after the move

### Requirement 3: Update Package.json Scripts

**User Story:** As a developer, I want package.json scripts updated to reference the new server location, so that npm commands continue to work.

#### Acceptance Criteria

1. THE root package.json SHALL update the "start" script to reference server/server.js
2. THE root package.json SHALL update the "dev:server" script to reference server/server.js
3. THE root package.json SHALL update the "dev" script to use the updated server path
4. WHEN npm start is executed, THE application SHALL start successfully from the new location

### Requirement 4: Preserve Environment Configuration

**User Story:** As a developer, I want environment files to remain in the project root, so that deployment and configuration practices remain unchanged.

#### Acceptance Criteria

1. THE .env file SHALL remain in the Project_Root
2. THE .env.example file SHALL remain in the Project_Root
3. THE .gitignore file SHALL remain in the Project_Root
4. WHEN the server starts, THE dotenv.config() call SHALL correctly load environment variables from the root .env file

### Requirement 5: Maintain Build and Deployment Compatibility

**User Story:** As a developer, I want the build process to work unchanged, so that deployment pipelines are not affected.

#### Acceptance Criteria

1. THE "build" script SHALL continue to build the client application into /public
2. THE server SHALL continue to serve static files from the /public directory
3. THE server SHALL continue to serve index.html for client-side routing
4. WHEN the application is built and started, THE frontend SHALL load and function correctly

### Requirement 6: Update Documentation

**User Story:** As a developer, I want documentation updated to reflect the new structure, so that other developers understand the organization.

#### Acceptance Criteria

1. THE PROJECT_PRESENTATION.md file SHALL update the "Project Structure" section to show the server directory
2. THE README.md file SHALL be updated if it contains references to the old structure
3. THE documentation SHALL clearly indicate that backend code is in /server and frontend code is in /client

