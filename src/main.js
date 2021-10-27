// @ts-check

/**
 * 블로그 포스팅 서비스
 */

const http = require("http")

/**
 * @typedef Post
 * @property {string} id
 * @property {string} title
 * @property {string} content
 */

/** @type {Post[]} */
const posts = [
  {
    id: "my_fist_post",
    title: "My first post",
    content: "Hello!",
  },
  {
    id: "my_second_post",
    title: "My second post",
    content: "Bye",
  },
]

/**
 * Post
 *
 * GET /posts
 * GET /posts/:id
 * POST /posts
 */
const server = http.createServer((req, res) => {
  const POSTS_ID_REGEX = /^\/posts\/([a-zA-Z0-9-_]+)$ / // capture group ()
  const postIdRegexResult =
    (req.url && POSTS_ID_REGEX.exec(req.url)) || undefined

  if (req.url === "/posts" && req.method === "GET") {
    const result = {
      post: posts.map((post) => ({
        id: post.id,
        title: post.title,
      })),
      totalCount: posts.length,
    }

    res.statusCode = 200
    res.end(JSON.stringify(result))
  } else if (postIdRegexResult) {
    // GET /posts:id
    const postId = postIdRegexResult[1]
    const post = posts.find((_post) => _post.id === postId)

    if (post) {
      res.statusCode = 200
      res.end(JSON.stringify(post))
    } else {
      res.statusCode = 404
      res.end("Post not found.")
    }

    res.statusCode = 200
    res.end("200")
  } else if (req.url === "/posts" && req.method === "POST") {
    res.statusCode = 200
    res.end("200")
  } else {
    res.statusCode = 404
    res.end("Not found.")
  }
})

const PORT = 4000

server.listen(PORT, () => {
  console.log(`The server is listening at port: ${PORT}`)
})
