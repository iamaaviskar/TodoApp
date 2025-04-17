import { useState, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Fab from "@mui/material/Fab";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function BasicTable() {
  const [todos, setTodos] = useState([]); // State to store the fetched todos

  // Fetch todos from the backend when the component mounts
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/todos/");
      setTodos(response.data); // Update the state with the fetched todos
    } catch (err) {
      console.error("Error fetching todos:", err.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/todos/${id}`);

      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      fetchTodos();
    } catch (err) {
      console.error("Error deleting todo:", err.message);
    }
  };

  const handleEdit = (id) => {
    // Add functionality to edit a todo
    console.log("Edit todo with id:", id);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Description</TableCell>
            <TableCell align="right">Edit</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {todos.map((todo, index) => (
            <TableRow>
              <TableCell component="th" scope="row" key={todo.id}>
                {todo.description}
              </TableCell>
              <TableCell align="right">
                {/* Edit Button */}
                <Fab
                  size="small"
                  color="primary"
                  aria-label="edit"
                  onClick={() => handleEdit(todo.todo_id)}
                >
                  <EditIcon />
                </Fab>
              </TableCell>
              <TableCell align="right">
                {/* Delete Button */}
                <Fab
                  size="small"
                  color="secondary"
                  aria-label="delete"
                  onClick={() => deleteTodo(todo.todo_id)}
                >
                  <DeleteIcon />
                </Fab>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
