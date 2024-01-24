import { useState } from "react";

export default function EditTodo({ todo, updateTodo }) {
  const [value, setValue] = useState(todo.content);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function tryUpdateTodo(newTodo) {
    try {
      setLoading(true);
      setError(null);
      const { _id, ...update } = newTodo;
      const response = await fetch(`https://restapi.fr/api/rtodo/${todo._id}`, {
        method: "PATCH",
        body: JSON.stringify(update),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const newTodo = await response.json();
        updateTodo(newTodo);
      } else {
        console.log("Erreur");
      }
    } catch (e) {
      console.log("Erreur");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    const inputValue = e.target.value;
    setValue(inputValue);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && value.length) {
      tryUpdateTodo({ ...todo, content: value, edit: false });
      setValue("");
    }
  }

  function handleClick() {
    if (value.length) {
      tryUpdateTodo({ ...todo, content: value, edit: false });
      setValue("");
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center mb-10">
      <input
        type="text"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={value}
        className="mr-15 flex-fill"
        placeholder="Ajouter une tâche"
      />
      <button onClick={handleClick} className="btn btn-primary mr-15">
        Sauvegarder
      </button>
      <button
        onClick={() => tryUpdateTodo({ ...todo, edit: false })}
        className="btn btn-reverse-primary"
      >
        Annuler
      </button>
    </div>
  );
}
