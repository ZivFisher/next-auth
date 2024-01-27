import { appRoutes } from "./lib/utils/enums";

/**
 * An array of routes that area accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 * **/
export const publicRoutes = [
  appRoutes.ROOT as string,
  appRoutes.NEW_VERIFICATION as string,
];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 * **/
export const authRoutes = [
  appRoutes.LOGIN as string,
  appRoutes.REGISTER as string,
  appRoutes.AUTH_ERROR as string,
  appRoutes.RESET_PASSWORD as string,
  appRoutes.NEW_PASSWORD as string,
];

/**
 * The prefix for API authentication routes
 * that starts with this prefix are used for API
 * authentication purposes.
 * @type {string}
 * **/
export const apiAuthPrefix = appRoutes.API_AUTH as string;

/**
 * A default redirect path after login in
 * @type {string}
 * **/
export const DEFAULT_LOGIN_REDIRECT = appRoutes.SETTINGS as string;
