const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

const students = [
  {
    id: 1,
    name: "Aarav Sharma",
    major: "Computer Science",
    email: "aarav.sharma@example.com",
    age: 20,
    gpa: "3.8",
    bio: "Passionate about full-stack web development and building interactive web apps.",
    skills: ["HTML", "CSS", "JavaScript", "React"]
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    major: "Cybersecurity",
    email: "sarah.jenkins@example.com",
    age: 21,
    gpa: "3.9",
    bio: "Enjoys solving network security puzzles and building secure server endpoints.",
    skills: ["Node.js", "Express", "Python", "Linux"]
  },
  {
    id: 3,
    name: "Li Wei",
    major: "Data Science",
    email: "li.wei@example.com",
    age: 22,
    gpa: "3.7",
    bio: "Focused on database architectures, data visualization, and statistics.",
    skills: ["SQL", "Python", "R", "MongoDB"]
  },
  {
    id: 4,
    name: "Emma Watson",
    major: "UI/UX Design",
    email: "emma.watson@example.com",
    age: 19,
    gpa: "4.0",
    bio: "Creating user flows, wireframes, and beautiful modern visual systems.",
    skills: ["Figma", "CSS", "UI Design", "Adobe XD"]
  }
];

app.get("/api/students", (req, res) => {
  setTimeout(() => {
    res.json(students);
  }, 500);
});

app.listen(PORT, () => {
  console.log(`Student Directory API is live at http://localhost:${PORT}/api/students`);
});
