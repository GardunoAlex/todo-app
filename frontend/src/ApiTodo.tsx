import {  useState, useEffect } from 'react';
import axios from 'axios';

const ApiTodo = () => {
    interface Todo {
        id: number;
        task: string;
    }
    const [todos, setTodos] = useState<Todo[]>([]);
    

    // Function to fetch todos from the backend using axios
    const fetchTodos = async () => {
      try {
        // Send GET request to your backend
        const response = await axios.get<Todo[]>("http://localhost:5001/todo");
        // Update the todos state with the response data
        setTodos(response.data);
     
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
  
    // useEffect hook to fetch todos on component mount
    useEffect(() => {
      fetchTodos();
    }, []); // Empty dependency array ensures it runs only once
  
    // Render the todo list
    return {todos, fetchTodos};
};

export default ApiTodo