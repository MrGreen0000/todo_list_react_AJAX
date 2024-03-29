import { useEffect, useReducer, useState } from "react";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";

function todoReducer(state, action) {
  console.log("action :", action);
  switch (action.type) {
    case "FETCH_TODOS": {
      return {
        ...state,
        todoList: action.todoList,
      };
    }
    case "ADD_TODO": {
      return {
        ...state,
        todoList: [...state.todoList, action.todo],
      };
    }
    case "UPDATE_TODO": {
      return {
        ...state,
        todoList: state.todoList.map((t) =>
          t._id === action.todo._id ? action.todo : t
        ),
      };
    }
    case "DELETE_TODO": {
      return {
        ...state,
        todoList: state.todoList.filter((t) => t._id !== action.todo._id),
      };
    }
    default:
      throw new Error("Action inconnue");
  }
}

function App() {
  const [state, dispatch] = useReducer(todoReducer, { todoList: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    async function fetchTodolist() {
      try {
        const response = await fetch("https://restapi.fr/api/rtodo");
        if (response.ok) {
          const todos = await response.json();
          if (!ignore) {
            if (Array.isArray(todos)) {
              dispatch({ type: "FETCH_TODOS", todoList: todos });
            } else {
              dispatch({ type: "FETCH_TODOS", todoList: [todos] });
            }
          }
        } else {
          console.log("erreur");
        }
      } catch (e) {
        console.log("erreur");
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }
    fetchTodolist();
    return () => {
      ignore = true;
    };
  }, []);

  function addTodo(newTodo) {
    dispatch({ type: "ADD_TODO", todo: newTodo });
  }

  function deleteTodo(deletedTodo) {
    dispatch({ type: "DELETE_TODO", todo: deletedTodo });
  }

  function updateTodo(updatedTodo) {
    dispatch({ type: "UPDATE_TODO", todo: updatedTodo });
  }

  return (
    <div className="d-flex justify-content-center align-items-center p-20">
      <div className="card container p-20">
        <h1 className="mb-20">Liste de tâches</h1>
        <AddTodo addTodo={addTodo} />
        {loading ? (
          <p>Chargement en cours...</p>
        ) : (
          <TodoList
            todoList={state.todoList}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
          />
        )}
      </div>
    </div>
  );
}

export default App;
