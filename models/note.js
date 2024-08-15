const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        maxLenght: 100,
    },
    containt:{
        type: String,
        maxLenght: 1000,
    },
    created_at:{
        type: Date,
        required: true,
    },
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;