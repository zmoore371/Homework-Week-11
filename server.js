const express = require("express");
const path = require("path");
const fs = require("fs");

const notes = require("./db/db.json");         

const app = express();
const PORT = process.env.PORT || 3001;   

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get("/api/notes", (req, res) => {
    res.json(notes)
})

app.get('*', function(req,res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});  


app.post("/api/notes", (req, res) => {
    let newNote = req.body;
    let uId = (notes.length).toString();
    console.log(uId);
    newNote.id = uId;
    notes.push(newNote);

    fs.writeFileSync("./db/db.json", JSON.stringify(notes), function(err) {
        if(err) throw (err);
    })

    res.json(notes)
})


app.listen(PORT, () =>
  console.log(`Application is listening at http://localhost:${PORT}`)
);