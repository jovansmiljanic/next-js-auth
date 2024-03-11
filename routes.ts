/**
 *
 * An array of public routes
 * For these routes, the user does not need to be authenticated
 * @type {string[]}
 */

export const publicRoutes = [""];

/**
 *
 * An array that are user for authentication
 * These routes will redirect logged in users to the home page
 * @type {string[]}
 */
export const authRoutes = [
  "/login",
  "/sign-up",
  "/new-verification",
  "/reset-password",
  "/new-password",
];

/**
 *
 * Prefixx for API authentication routes
 * Routes that start with these prefixes are for authentication
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 *
 * Default redirect after user logs in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/";
