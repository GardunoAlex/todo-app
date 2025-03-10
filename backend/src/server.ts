import express from 'express';
import cors from 'cors';
import env from 'dotenv';
import pool from './config/db';

env.config();

const app = express();
app.use(cors());
app.use(express.json());

// Test Route
app.get('/api/test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
 
    res.json({ message: 'Connected to PostgreSQL', time: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

app.get('/todo', async(req,res) => {
    try{
        const result = await pool.query("SELECT * FROM public.todo ORDER BY id DESC ");
        const posts = result.rows;
        res.json(posts);
    }
    catch (error){
        console.log("failure");
        console.log(error);
    }
})

app.post('/add', async(req,res) => {
  try{
    const { name } = req.body;
    await pool.query("INSERT INTO todo (task) VALUES ($1)", [name]);
    res.json({ success: true, message: "Task added successfully" });
  }
  catch (error){
      console.log("failure");
      console.log(error);
  }
})

app.delete("/delete/:id", async(req,res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM todo WHERE id = $1", [id]);
  res.json();
})

app.put("/update/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { title } = req.body; // Assuming you're updating the title
  try {
      // Update the task in your database
      await pool.query("UPDATE todo SET task = $1 WHERE id = $2", [title, id]);
      res.json();
  } catch (error) {
      res.status(500).json({ error: 'Failed to update task' });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});