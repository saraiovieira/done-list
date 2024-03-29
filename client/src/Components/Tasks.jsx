import React, { useState, useEffect } from "react";
import { MdEdit, MdAdd } from "react-icons/md";
import { BsFillTrashFill } from "react-icons/bs";

const Tasks = ({
  task,
  setTask,
  createTask,
  tasks,
  updateTask,
  deleteTask,
  editedTask,
  setEditedTask,
}) => {
  const [guest, setGuest] = useState();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    getToken();
  }, []);

  const getToken = () => {
    const token = localStorage.getItem("token");
    if (token === "guest") {
      setGuest(true);
    }
  };

  const editTask = (id) => {
    if (guest) {
      const taskToEdit = tasks.find((t) => t.id === id);
      setEditedTask(taskToEdit);
    } else {
      const taskToEdit = tasks.find((t) => t._id === id);
      setEditedTask(taskToEdit);
    }
  };

  const taskCount = tasks.length;

  return (
    <>
      <div className="tasks_container">
        {tasks.length === 0 ? (
          <div className="tasks__empty-container">
            <h2 className="tasks__title">
              {" "}
              <span role="img" aria-label="Seedling">
                🌱
              </span>{" "}
              No tasks done yet!
            </h2>
            <p className="tasks__description">
              Complete a task to make progress.
            </p>
          </div>
        ) : (
          <h2 className="tasks__title">
            {" "}
            <span role="img" aria-label="Popper Confetti">
              🎉
            </span>
            Congrats! You accomplished {taskCount}{" "}
            {taskCount === 1 ? "task" : "tasks"}
          </h2>
        )}
        <ul className="tasks__list">
          {guest
            ? tasks.map(({ title, id }) => (
                <li key={id} className="tasks__item">
                  {editedTask && editedTask.id === id ? (
                    <div>
                      <input
                        type="text"
                        value={editedTask.title}
                        className="tasks__input-edited"
                        name="task"
                        placeholder="Task name"
                        autoComplete="off"
                        onChange={(e) =>
                          setEditedTask({
                            ...editedTask,
                            title: e.target.value,
                          })
                        }
                      />
                      <button onClick={() => updateTask(editedTask.id)}>
                        Save
                      </button>
                    </div>
                  ) : (
                    <>
                      <input
                        type="checkbox"
                        defaultChecked={true}
                        name="checkbox"
                        className="tasks__input-completed"
                      />
                      <span className="tasks__checkmark"></span>
                      <span className="tasks__task">{title}</span>
                    </>
                  )}
                  <div>
                    <MdEdit
                      className="tasks__edit-icon"
                      onClick={() => editTask(id)}
                    />
                    <BsFillTrashFill
                      className="tasks__trash-icon"
                      onClick={(e) => deleteTask(e, id)}
                    ></BsFillTrashFill>
                  </div>
                </li>
              ))
            : tasks.map(({ _id, task }, i) => (
                <li key={_id} className="tasks__item">
                  {editedTask && editedTask._id === _id ? (
                    <div>
                      <input
                        type="text"
                        value={editedTask.task}
                        className="tasks__input-edited"
                        placeholder="Task name"
                        name="task"
                        autoComplete="off"
                        onChange={(e) =>
                          setEditedTask({ ...editedTask, task: e.target.value })
                        }
                      />
                      <button onClick={(e) => updateTask(e, _id)}>Save</button>
                    </div>
                  ) : (
                    <>
                      <input
                        type="checkbox"
                        defaultChecked={true}
                        onClick={(e) => updateTask(e, _id)}
                        className="tasks__input-completed"
                      />
                      <span className="tasks__checkmark"></span>
                      <span className="tasks__task">{task}</span>
                    </>
                  )}
                  <div>
                    <MdEdit
                      className="tasks__edit-icon"
                      onClick={() => editTask(_id)}
                    ></MdEdit>
                    <BsFillTrashFill
                      className="tasks__trash-icon"
                      onClick={(e) => deleteTask(e, _id)}
                    ></BsFillTrashFill>
                  </div>
                </li>
              ))}
        </ul>
        <form className="tasks__add-form" onSubmit={createTask}>
          <input
            type="text"
            id="new-task-input"
            name="task"
            value={task}
            onChange={({ target }) => setTask(target.value)}
            placeholder="Task name"
            autoComplete="off"
            className="tasks__input"
          />
          {isMobile ? (
            <button
              type="button"
              className="tasks__button-mobile"
              title="Add task"
              onClick={createTask}
            >
              <MdAdd />
            </button>
          ) : (
            <button type="submit" className="tasks__button">
              Add task
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default Tasks;