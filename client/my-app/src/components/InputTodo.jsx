import { useState, useEffect } from "react";
import axios from "axios";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

function InputTodo() {
  const [todos, setTodos] = useState([]);
  const [inp, setInp] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/todos/");

      setTodos(response.data);
    } catch (err) {
      console.error("Error fetching todos:", err.message);
      setError("Failed to fetch todos. Please try again.");
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!inp.trim()) {
      setError("Todo cannot be empty.");
      return;
    }
    try {
      const body = { description: inp };
      const response = await axios.post("http://localhost:3000/todos/", body);
      setInp("");
      setError("");
      // Optimistically update the state
      setTodos([...todos, response.data]); // Add the new todo to the list
    } catch (err) {
      console.error("Error adding todo:", err.message);
      setError("Failed to add todo. Please try again.");
    }
  };

  return (
    <>
      <h1 className="mt-5 text-center">Todo list</h1>
      <form className="d-flex" onSubmit={addTodo}>
        <input
          type="text"
          name="todo"
          value={inp}
          id="todo"
          className="form-control"
          onChange={(e) => setInp(e.target.value)}
          placeholder="Enter a new todo"
        />
        <Fab
          color="primary"
          aria-label="add"
          sx={{ marginLeft: "10px" }}
          type="submit" // Ensure the button submits the form
        >
          <AddIcon />
        </Fab>
      </form>
      {error && <p className="text-danger text-center mt-2">{error}</p>}
    </>
  );
}

export default InputTodo;
