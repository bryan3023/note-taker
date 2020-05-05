const
  express = require("express"),
  fs = require("fs")

const
  app = express(),
  PORT = 8080

app.get("/notes", (req, res) => {
  const path = __dirname + "/public/notes.html"
  fs.readFile(path, (error, data) => {
    writePage(res, data)
  })
})

app.get("*", (req, res) => {
  const path = __dirname + "/public/index.html"
  fs.readFile(path, (error, data) => {
    writePage(res, data)
  })
})

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

function writePage(response, data, statusCode = 200) {
  response.writeHead(statusCode, { "Content-Type": "text/html" });
  response.end(data);
}