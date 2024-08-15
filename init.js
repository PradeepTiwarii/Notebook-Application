const mongoose = require("mongoose");
const Note = require("./models/note.js");

main()
    .then(()=>{
    console.log("connection sucessful");
    })
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/notebook");
}

let allNote = [
    {
        title:"Random",
        containt:"Once upon a time in a small village nestled between rolling hills and dense forests, there lived a group of people who cherished their land and traditions. The villagers gathered every evening in the town square to share stories, laughter, and news. This ritual was a cherished part of their lives, fostering a strong sense of community. Among them was an old storyteller named Elara, whose tales enchanted both young and old. Her stories were filled with magic and wisdom, capturing the imagination of everyone who listened. One evening, as the sun set behind the hills, casting a golden glow over the village, Elara shared a tale about a hidden treasure buried deep within the forest. The treasure, she said, was guarded by mythical creatures and could only be found by those pure of heart. Inspired by her tale, a group of adventurous children decided to embark on a journey to find the treasure. Armed with nothing but courage and a sense of wonder, they ventured into the forest, eager to discover what lay beyond the trees. As they journeyed deeper into the woods, they encountered many challenges but also learned about friendship, bravery, and the power of believing in oneself. Their adventure became a story of its own, passed down through generations, reminding the village of the magic that lies within every heart.",
        created_at: new Date(),
    },{
        title:"College",
        containt:"Goverment Polytechnic Khutri ",
        created_at: new Date(),
    },
];

Note.insertMany(allNote);