const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Note = require("./models/note.js");
const methodOverride = require("method-override");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

main()
    .then(()=>{
    console.log("connection sucessful");
    })
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/notebook");
}

//Index Route
app.get("/notes", async (req, res)=>{
    let notes = await Note.find();
    res.render("index.ejs", { notes });
});

// new route
app.get("/notes/new", (req, res)=>{
    res.render("new.ejs");
});

app.post("/notes",  async(req, res)=>{
    let {title, containt} = req.body;
    let newNote = new Note({
        title: title,
        containt: containt,
        created_at: new Date(),
    });

    await newNote.save().then((res)=>{console.log("new note added")}).catch((err)=>{console.log(err)});
    res.redirect("/notes");
});

// Edit roote
app.get("/notes/:id/edit", async(req, res)=>{
    let {id} = req.params;
    let note = await Note.findById(id);
    res.render("edit.ejs",{note});
});
//updat
app.put("/notes/:id", async(req, res)=>{
    let {id} = req.params;
    let {title: newTitle, containt: newCon} = req.body;
    let newNote = await Note.findByIdAndUpdate(id, 
                {title: newTitle, containt: newCon},
                {runValidators: true, new: true});
    res.redirect("/notes");
});

//delete
app.delete("/notes/:id", async(req, res)=>{
    console.log("delete are working");
    let {id} = req.params;
    let delNote = await Note.findByIdAndDelete(id);
    res.redirect("/notes");
});

app.get("/", (req, res)=>{
    res.send("root is working");
});

app.listen(8080, ()=>{
    console.log("server is lisning port 8080");
}); 