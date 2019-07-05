module.exports = {
  mall: {
    "/api": {
      target: "https://other-server.example.com",
      pathRewrite: {"^/api" : ""}
    }
  },
  mobile: {
    "/api": {
      target: "https://other-server.example.com",
      pathRewrite: {"^/api" : ""}
    }
  }
}