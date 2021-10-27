// @ts-check

/**
 * @typedef APIResponse
 * @property {number} statusCode
 * @property {*} body
 */

/**
 * @typedef Route
 * @property {string} url
 * @property {"GET" | "POST"} method
 * @property {(values: Object) => Promise<APIResponse>} callback
 */
