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
  // capture group ()
  const POSTS_ID_REGEX = /^\/posts\/([a-zA-Z0-9-_]+)$/
  if (req.url === "/posts" && req.method === "GET") {
    res.statusCode = 200
  } else if (req.url && POSTS_ID_REGEX.test(req.url)) {
    const regexResult = POSTS_ID_REGEX.exec(req.url)
    if (regexResult) {
      const postId = regexResult[1]
    }
    res.statusCode = 200
  } else if (req.url === "/posts" && req.method === "POST") {
    res.statusCode = 200
  } else {
    res.statusCode = 404
    res.end("Not found.")
  }
})

const PORT = 4000

server.listen(PORT, () => {
  console.log(`The server is listening at port: ${PORT}`)
})
