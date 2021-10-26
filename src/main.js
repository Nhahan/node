// @ts-check

/**
 * 블로그 포스팅 서비스
 */

const http = require("http")

/**
 * Post
 *
 * GET /posts
 * GET /posts/:id
 * POST /posts
 */
const server = http.createServer((req, res) => {
  if (req.url === "/posts" && req.method === "GET") {
  } else if (req.url && /^\/posts\/[a-zA-Z0-9-_]+$/.test(req.url)) {
  } else if (req.url === "/posts" && req.method === "POST") {
  } else {
    res.statusCode = 404
    res.end("Not found.")
  }
})

const PORT = 4000

server.listen(PORT, () => {
  console.log(`The server is listening at port: ${PORT}`)
})
