const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb+srv://vaishnavi_k_mongo:uCyuekUVonTtsLnY@cluster0.gm5sebb.mongodb.net/?appName=Cluster0')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Schema and Model
const userSchema = new mongoose.Schema({ name: String });
const User = mongoose.model('User', userSchema);

// Routes
app.post('/add', async (req, res) => {
  const user = new User({ name: req.body.name });
  await user.save();
  res.json({ message: 'Name stored successfully!' });
});

app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
