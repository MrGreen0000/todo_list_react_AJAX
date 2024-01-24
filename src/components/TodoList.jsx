import TodoItem from "./TodoItem";
import EditTodo from "./EditTodo";
import PropTypes from "prop-types";

export default function TodoList({ todoList, deleteTodo, updateTodo }) {
  return todoList.length ? (
    <ul>
      {todoList.map((todo) =>
        todo.edit ? (
          <EditTodo key={todo._id} todo={todo} updateTodo={updateTodo} />
        ) : (
          <TodoItem
            key={todo._id}
            todo={todo}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
          />
        )
      )}
    </ul>
  ) : (
    <p>Aucune tâche en cours </p>
  );
}

TodoList.propTypes = {
  deleteTodo: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired,
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      content: PropTypes.string,
      edit: PropTypes.bool,
      done: PropTypes.bool,
    })
  ).isRequired,
};
