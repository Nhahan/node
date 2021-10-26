// @ts-check

/**
 * 블로그 포스팅 서비스
 */

const http = require("http")

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.end("Hello!")
})

const PORT = 4000

server.listen(PORT, () => {
  console.log(`The server is listening at port: ${PORT}`)
})
