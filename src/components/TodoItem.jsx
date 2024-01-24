import { useState } from "react";
import PropTypes from "prop-types";

export default function TodoItem({ todo, deleteTodo, updateTodo }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function tryUpdateTodo(newTodo) {
    try {
      setLoading(true);
      setError(null);
      const { _id, ...update } = newTodo;
      const response = await fetch(`https://restapi.fr/api/rtodo/${todo._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(update),
      });
      if (response.ok) {
        const newTodo = await response.json();
        updateTodo(newTodo);
      } else {
        console.log("Oops, une erreur");
      }
    } catch (e) {
      console.log("Oops, une erreur");
    } finally {
      setLoading(false);
    }
  }

  async function handleClickDeleteTodo() {
    try {
      setLoading(true);
      const response = await fetch(`https://restapi.fr/api/rtodo/${todo._id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        deleteTodo(todo);
      } else {
        console.log("Oops, une erreur");
      }
    } catch (e) {
      console.log("Oops, une erreur");
    } finally {
      setLoading(false);
    }
  }

  return (
    <li
      className={
        "mb-10 d-flex flex-row justify-content-center align-items-center p-10 "
      }
    >
      {loading ? (
        <span className="flex-fill">Chargement ....</span>
      ) : (
        <span className="flex-fill">
          {todo.content} {todo.done && "✅"}
        </span>
      )}

      <button
        className="btn btn-primary mr-15"
        onClick={(e) => {
          e.stopPropagation();
          tryUpdateTodo({ ...todo, done: !todo.done });
        }}
      >
        Valider
      </button>
      <button
        className="btn btn-primary mr-15"
        onClick={(e) => {
          e.stopPropagation();
          tryUpdateTodo({ ...todo, edit: true });
        }}
      >
        Modifier
      </button>
      <button
        className="btn btn-reverse-primary"
        onClick={(e) => {
          e.stopPropagation();
          handleClickDeleteTodo();
        }}
      >
        Supprimer
      </button>
    </li>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    done: PropTypes.bool,
    edit: PropTypes.bool,
    // etc.
  }).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired,
};
