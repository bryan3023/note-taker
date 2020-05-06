const NoteDatabase = require("../lib/NoteDatabase")

module.exports = function(app) {
  const noteDatabase = new NoteDatabase()

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
  
}