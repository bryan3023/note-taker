const
  path = require("path"),
  fs = require("fs")

const databasePath = path.join(__dirname, "db/db.json")

class NoteDatabase {
  constructor() {
    this.database = []
    this.highestId = 0

    this.loadDatabase()
  }

  loadDatabase() {
    fs.readFile(databasePath, (error, data) => {
      if (error) {
        return console.error("Unable to load database.")
      }
      this.database = JSON.parse(data)
      this.highestId = this.getHighestId()
      this.database = this.setIds()
      console.log(this.database)
    })
  }

  getDatabase() {
    return this.database
  }
  
  getHighestId() {
    const highest = this.database
      .filter(note => note.id !== undefined)
  
    if (0 === highest.length) {
      return 0
    } else {
      return highest.reduce((accumlator, current) =>
        current.id && current.id > accumlator.id ? current : accumlator
      )
    }
  }
  
  setIds() {
    return this.database.map(note => {
        return note.id ? note : {
          title: note.title,
          text: note.text,
          id: this.highestId++
        }
      })
  }
  
  
  saveDatabase() {
    fs.writeFile(databasePath, JSON.stringify(database), (error) => {
      if (error) {
        return console.error("Unable to save database.")
      }
  
    }).then()
  }
}

module.exports = NoteDatabase