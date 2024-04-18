const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config()

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.CONNECTION_STRING)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));


const studentSchema = new mongoose.Schema({
  name: String,
  address: String,
  mobile: String,
  email: String,
  gender: String,
  dob: String,
  course: String,
});

const Student = mongoose.model('Student', studentSchema);

app.post('/register', async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.send(student);
});

app.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.send(students);
  } catch (error) {
    console.error("Error fetching students: ", error);
    res.status(500).send({ error: 'An error occurred while fetching students' });
  }
});

app.delete('/students/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) return res.status(404).send();
    res.send(student);
  } catch (e) {
    res.status(500).send();
  }
});


app.get('/', (req, res) => {
  res.send('Server is running');
});



app.listen(3000, () => console.log('Server started on port 3000'));
