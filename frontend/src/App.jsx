// frontend/src/App.jsx
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  // Fetch todos from backend
  const fetchTodos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/todos");
      setTodos(res.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Add a new todo
  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!title) return;
    try {
      const res = await axios.post("http://localhost:5000/api/todos", {
        title,
      });
      setTodos([...todos, res.data]);
      setTitle("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  // Delete a todo
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-4 text-center">MERN Todo App</h1>
      <form onSubmit={handleAddTodo} className="mb-4 flex justify-center">
        <input
          type="text"
          className="border p-2 mr-2 rounded w-64"
          placeholder="Enter todo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="bg-blue-500 text-white p-2 rounded">Add Todo</button>
      </form>
      <ul className="max-w-md mx-auto">
        {todos.map((todo) => (
          <li
            key={todo._id}
            className="flex justify-between items-center bg-white p-4 mb-2 rounded shadow"
          >
            <span>{todo.title}</span>
            <button
              onClick={() => handleDelete(todo._id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;