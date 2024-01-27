import { appRoutes } from "./lib/utils/enums";

/**
 * An array of routes that area accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 * **/
export const publicRoutes = [appRoutes.ROOT, appRoutes.NEW_VERIFICATION];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 * **/
export const authRoutes = [
  appRoutes.LOGIN,
  appRoutes.REGISTER,
  appRoutes.AUTH_ERROR,
  appRoutes.RESET_PASSWORD,
  appRoutes.NEW_PASSWORD,
];

/**
 * The prefix for API authentication routes
 * that starts with this prefix are used for API
 * authentication purposes.
 * @type {string}
 * **/
export const apiAuthPrefix = appRoutes.API_AUTH;

/**
 * A default redirect path after login in
 * @type {string}
 * **/
export const DEFAULT_LOGIN_REDIRECT = appRoutes.SETTINGS;
