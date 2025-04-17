import db from "../db.js";

export const createTodo = async (req, res) => {
  try {
    const { description } = req.body;
    if (!description)
      return res.status(400).json({ error: "Description is required" });

    const newTodo = await db.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    if (!newTodo || newTodo.rows.length === 0)
      return res.status(500).json({ error: "Insertion failed" });

    res.status(201).json(newTodo.rows[0]);
  } catch (err) {
    console.error("Database Error:", err.stack);
    res
      .status(500)
      .json({ error: "Database operation failed", details: err.message });
  }
};

export const getTodos = async (req, res) => {
  try {
    const allTodo = await db.query("SELECT * FROM todo");
    if (allTodo.rows.length === 0)
      return res.status(404).json({ error: "No todos found" });
    res.status(200).json(allTodo.rows);
  } catch (err) {
    console.error("Database Error:", err.stack);
    res
      .status(500)
      .json({ error: "Database operation failed", details: err.message });
  }
};

export const getTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    if (isNaN(id))
      return res
        .status(400)
        .json({ error: "Invalid ID format. ID must be a number" });

    const todo = await db.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
    if (todo.rows.length === 0)
      return res.status(404).json({ error: `Todo with ID ${id} not found` });

    res.status(200).json(todo.rows[0]);
  } catch (err) {
    console.error("Database Error:", err.stack);
    res
      .status(500)
      .json({ error: "Database operation failed", details: err.message });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    if (isNaN(id))
      return res
        .status(400)
        .json({ error: "Invalid ID format. ID must be a number" });
    if (!description || description.trim() === "")
      return res.status(400).json({ error: "Description is required" });

    const updatedTodo = await db.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *",
      [description, id]
    );
    if (updatedTodo.rows.length === 0)
      return res.status(404).json({ error: `Todo with ID ${id} not found` });

    res.status(200).json(updatedTodo.rows[0]);
  } catch (err) {
    console.error("Database Error:", err.stack);
    res
      .status(500)
      .json({ error: "Database operation failed", details: err.message });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    if (isNaN(id))
      return res
        .status(400)
        .json({ error: "Invalid ID format. ID must be a number" });

    const deleteTodo = await db.query(
      "DELETE FROM todo WHERE todo_id = $1 RETURNING *",
      [id]
    );
    if (deleteTodo.rows.length === 0)
      return res.status(404).json({ error: `Todo with ID ${id} not found` });

    res.status(204).send();
  } catch (err) {
    console.error("Database Error:", err.stack);
    res
      .status(500)
      .json({ error: "Database operation failed", details: err.message });
  }
};
