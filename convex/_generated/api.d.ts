/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as certificates from "../certificates.js";
import type * as donations from "../donations.js";
import type * as fieldData from "../fieldData.js";
import type * as mangrove from "../mangrove.js";
import type * as programs from "../programs.js";
import type * as revenue from "../revenue.js";
import type * as seed from "../seed.js";
import type * as transactions from "../transactions.js";
import type * as users from "../users.js";
import type * as validations from "../validations.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  certificates: typeof certificates;
  donations: typeof donations;
  fieldData: typeof fieldData;
  mangrove: typeof mangrove;
  programs: typeof programs;
  revenue: typeof revenue;
  seed: typeof seed;
  transactions: typeof transactions;
  users: typeof users;
  validations: typeof validations;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
