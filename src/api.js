// @ts-check

/**
 * @typedef APIResponse
 * @property {number} statusCode
 * @property {*} body
 */

// 모듈
/**
 * @typedef Route
 * @property {RegExp} url
 * @property {"GET" | "POST"} method
 * @property {(values: Object) => Promise<APIResponse>} callback
 */

// 모듈을 내보내는 것이 route
const routes = [
  {
    url: /^\/posts$/,
    method: "GET",
    callback: async () => ({
      // TODO: implement
      statusCode: 200,
      body: {},
    }),
  },

  {
    url: "/^/posts/([a-zA-Z0-9-_]+)$/",
    method: "GET",
    callback: async () => ({
      // TODO: implement
      statusCode: 200,
      body: {},
    }),
  },

  {
    url: /^\/posts$/,
    method: "POST",
    callback: async () => ({
      // TODO: implement
      statusCode: 200,
      body: {},
    }),
  },
]

module.exports = {
  routes,
}
