# Note Taker

## Synopsis
This is a simple web app for taking notes.

## Description
After getting past the welcome page, you see a page of all notes currently saved on the server.

By clicking a note's title along the left side, you can cause to to open in the main pane. By clicking the pencil icon, you can create a new note; once you've entered a title and text for that note, you can save it by clicking the floppy icon. To delete a note, click the trashcan icon next to its title.

[Try it out here.](https://note-taker-bryan3023.herokuapp.com/)

## Installation
After copying this repo, run the following in install its dependencies:

```sh
npm install
```

## Usage
To run the program locally, type:

```sh
node server.js
```

Then open your broswer to `http://localhost:8080`.

## Testing
This program has no tests. :-(

I had originally planned on doing so, but then I realized how much of the solution was provided by the course repo. All of the client side was provided, and the server side consisted mostly of Express and managing the data in the note database. I'll need to learn more about creating mock objects before I can figure out a strategy to test these pieces.