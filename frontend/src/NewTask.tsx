import axios from "axios";
import { useState } from "react";


const NewTask = () => {
    const [task, setTask] = useState("");

    const handleSubmit = async () => {
  
      try {
        await axios.post("http://localhost:5001/add", { name: task });
        alert(task);
        setTask(""); // Clear input after submission
        
      } catch (error) {
        console.error("Error adding task:", error);
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter task"
          required
        />
        <button type="submit">Add Task</button>
      </form>
    );
};

export default NewTask;