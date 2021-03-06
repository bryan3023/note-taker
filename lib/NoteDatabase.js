const
  path = require("path"),
  fs = require("fs")


class NoteDatabase {
  constructor() {
    this.database = []
    this.databasePath = path.join(__dirname, "../db/db.json")

    this.loadDatabase()
  }


  /*
    Get all notes currently in the database.
   */
  getNotes() {
    return this.database
  }

 
  /*
    Add a note and update the persisted DB.
   */
  addNote(note) {
    this.database.push(this.setId(note))
    this.saveDatabase()
  }

  /*
    Remove the note with the specified ID value and update the persisted DB.
   */
  removeNote(noteId) {
    const noteIdInt = parseInt(noteId)

    this.database = this.database.filter(note => note.id !== noteIdInt)
    this.saveDatabase()
  }


  // -- Private methods ---

  /*
    Load the database from storage.
   */
  loadDatabase() {
    fs.readFile(this.databasePath, (error, data) => {
      if (error) {
        return console.error("Unable to load database.")
      }
      this.database = JSON.parse(data)
      this.setMissingIds()
      console.log(this.database)
    })
  }


  /*
    Save the database back to the file.
   */
  saveDatabase() {
    fs.writeFile(this.databasePath, JSON.stringify(this.database), (error) => {
      if (error) {
        return console.error("Unable to save database.")
      }
    })
  }


  /*
    Set ID values for any notes that don't have one.
   */
  setMissingIds() {
    this.database = this.database.map(note => this.setId(note))
  }


  /*
    Set an ID for an individual note if it doesn't already have one.
   */
  setId(note) {
    if (this.hasId(note)) {
      return note
    } else {
      return {
        title: note.title,
        text: note.text,
        id: this.getIdCounter()
      }
    }
  }


  /*
    Get the current ID counter. IDs are generated by incrementing from the
    highest ID value currently in the database.
   */
  getIdCounter() {
    const haveIds = this.database.filter(note => this.hasId(note))

    if (haveIds.length) {
      const highest = haveIds
        .reduce((acc, cur) => cur.id > acc.id ? cur : acc)
        .id
      return highest + 1
    } else {
      return 0
    }
  }


  /*
    Does the note have a valid ID value?
   */
  hasId(note) {
    return "id" in note && Number.isInteger(note.id)
  }
}


module.exports = NoteDatabase