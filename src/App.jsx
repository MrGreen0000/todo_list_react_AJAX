import { useEffect, useState } from "react";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";

function App() {
  const [todoList, setTodoList] = useState([]);
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
              setTodoList(todos);
            } else {
              setTodoList([todos]);
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
    setTodoList([...todoList, newTodo]);
  }

  function deleteTodo(deletedTodo) {
    setTodoList(todoList.filter((t) => t._id !== deletedTodo._id));
  }

  function updateTodo(updatedTodo) {
    setTodoList(
      todoList.map((t) => (t._id === updatedTodo._id ? updatedTodo : t))
    );
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
            todoList={todoList}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
          />
        )}
      </div>
    </div>
  );
}

export default App;
