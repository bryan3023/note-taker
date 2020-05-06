const
  NoteDatabase = require("./NoteDatabase"),
  express = require("express"),
  path = require("path")

const
  app = express(),
  PORT = 8080

const noteDatabase = new NoteDatabase()


app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(express.static('public'))

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"))
})


app.get("/api/notes", (req, res) => {
  res.json(noteDatabase.getNotes())
})

app.post("/api/notes", function(req, res) {
  const note = req.body
  noteDatabase.addNote(note)
  res.json({result: "success"})
})

app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id
  noteDatabase.removeNote(id)
  res.json({result: "success"})
})


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"))
})

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT)
})
