import React , {  useState, useEffect } from 'react';
import axios from 'axios';

import ApiTodo from './ApiTodo';

import "./App.css";

const Todo = () => {
    const {todos, fetchTodos} = ApiTodo();

    const [newTask, setNewTask] = useState("");

    const [editingId, setEditingId] = useState(0);  // Store the ID of the task being edited
    const [newTitle, setNewTitle] = useState(""); // Store the new title for the task

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTask(event.target.value);
    };
    

    const addTask = async () =>{
        if (!newTask.trim()) return; // Prevent empty tasks
    
        try {
          await axios.post("http://localhost:5001/add", { name: newTask });
          setNewTask(""); // Clear input after submission
          fetchTodos(); // Refresh the list after adding a task

        } catch (error) {
          console.error("Error adding task:", error);
        }
    }

    const deleteTask = async (index: number) =>{
    
        try {
            await axios.delete(`http://localhost:5001/delete/${index}`);
            fetchTodos();

        } catch (error) {
          console.error("Error adding task:", error);
        }
    }

    const updateTask = async () => {
        try {
            await axios.put(`http://localhost:5001/update/${editingId}`, { title: newTitle });
            fetchTodos(); // Refresh the list after updating
            setEditingId(0); // Close the edit form after saving
            setNewTitle(''); // Clear the title input field after updating

        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    // Function to open the edit form for a task
    const handleEditClick = (index:number, title:string) => {
        setEditingId(index); // Set the task to be edited
        setNewTitle(title); // Set the current title to the input field
    };


    return (
        <div>
            <h1>Hello, Welcome To Your Trusty To-Do App</h1>

            <input 
                type="text"
                placeholder= "Add To-Do Here..."
                value = {newTask}
                onChange={handleInputChange}/>
            
            <button className='add-button' onClick={addTask} >
                ➕
            </button>

          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>
                <span className='text'>{todo.task}</span>
                <button className='delete-button' onClick={() => deleteTask(todo.id)}>
                    ❌
                </button>
                <button className='edit-button' onClick={() => handleEditClick(todo.id, todo.task)}>
                    ✍️
                </button>
                {editingId === todo.id && (
                        <div>
                            <input
                                type="text"
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)} // Update the input field value
                            />
                            <button onClick={() => updateTask()}>Save</button>
                            <button onClick={() => setEditingId(0)}>Cancel</button>
                        </div>
                    )}
              </li>
            ))}
          </ul>
      </div>
    );
};

export default Todo