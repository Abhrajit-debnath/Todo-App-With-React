import { FaCheckCircle, FaRegCircle } from "react-icons/fa";
import { MdOutlineEdit, MdOutlineDelete } from "react-icons/md";
import "./App.css";
import React, { useEffect, useState } from "react";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [taskTimestamp, setTaskTimestamp] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);

  const handleAddTask = () => {
    if (todo.trim()) {
      const currentTime = new Date();
      const formattedTime = formatTime(currentTime);
      const newTask = {
        id: currentTime,
        name: todo,
        time: formattedTime,
        iscompleted: false,
      };
      setTodos([...todos, newTask]);
      setTodo("");
      setTaskTimestamp(currentTime);
    }
  };

  const formatTime = (time) => {
    const hours = time.getHours() % 12 || 12;
    const minutes = time.getMinutes().toString().padStart(2, "0");
    const ampm = time.getHours() >= 12 ? "PM" : "AM";
    return `${hours}:${minutes} ${ampm}`;
  };

  const handleDeleteTask = (index) => {
    const newTodos = todos.filter((task, ind) => ind !== index);
    setTodos(newTodos);
  };

  const handleCompletedTask = (index) => {
    const newTodos = todos.map((task, ind) => {
      if (ind === index) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task;
    });
    setTodos(newTodos);
  };

  const handleEditTask = (index) => {
    setIsEditing(true);
    setCurrentTaskIndex(index);
    setTodo(todos[index].name);
  };

  const handleSaveEdit = () => {
    if (todo.trim()) {
      const newTodos = todos.map((task, index) => {
        if (index === currentTaskIndex) {
          return { ...task, name: todo };
        }
        return task;
      });
      setTodos(newTodos);
      setIsEditing(false);
      setCurrentTaskIndex(null);
      setTodo("");
    }
  };


  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
    

  return (
    <>
      <div className="w-[100vw] bg-zinc-900 h-[100vh] flex justify-center items-center font-[poppins]">
        <div className="w-[60%] mx-auto border-[1px] border-zinc-500 rounded-lg h-[80%] p-16">
          <h1 className="text-5xl font-semibold bg-gradient-to-l from-pink-500 to-blue-500 text-transparent bg-clip-text mb-8">
            To Do App
          </h1>
          <div className="flex gap-5">
            <input
              type="text"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              placeholder="Task Name"
              className="bg-zinc-700 w-[85%] px-7 py-5 rounded-xl outline-none text-white"
            />
            <button
              className="w-[15%] bg-pink-500 text-white px-3 rounded-lg font-medium"
              onClick={isEditing ? handleSaveEdit : handleAddTask}
            >
              {isEditing ? "Save Task" : "Add Task"}
            </button>
          </div>
          <div className=" text-white mt-10 h-[50%] overflow-auto">
            <ul className="flex-col flex gap-y-10">
              {todos.map((task, index) => (
                <>
                  <div className="flex items-center gap-24">
                    <button
                      key={index}
                      onClick={() => handleCompletedTask(index)}
                    >
                      {task.isCompleted ? (
                        <FaCheckCircle
                          style={{ color: "#00c800", fontSize: "35px" }}
                        />
                      ) : (
                        <FaRegCircle
                          style={{ color: "#00c800", fontSize: "35px" }}
                        />
                      )}
                    </button>
                    <li
                      key={index}
                      className={`flex gap-5 text-1xl text-[16px] ${
                        task.isCompleted ? "line-through" : ""
                      }`}
                    >
                      {task.name}
                      <p>
                        {task.id === taskTimestamp
                          ? formatTime(task.id)
                          : task.time}
                      </p>
                    </li>
                    <button onClick={() => handleEditTask(index)}>
                      <MdOutlineEdit style={{ color: "", fontSize: "35px" }} />
                    </button>
                    <button onClick={() => handleDeleteTask(index)}>
                      <MdOutlineDelete
                        style={{ color: "red", fontSize: "35px" }}
                      />
                    </button>
                  </div>
                </>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

// import "./App.css";
// import React, { useState } from "react";

// function App() {
//   const [todo, setTodo] = useState("");
//   const [todos, setTodos] = useState([]);
//   const [taskTimestamp, setTaskTimestamp] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentTaskIndex, setCurrentTaskIndex] = useState(null);

//   const handleAddTask = () => {
//     if (todo.trim()) {
//       const currentTime = new Date();
//       const formattedTime = formatTime(currentTime);
//       const newTask = {
//         id: currentTime.getTime(), // Unique identifier
//         name: todo,
//         time: formattedTime,
//         isCompleted: false,
//       };
//       setTodos([...todos, newTask]);
//       setTodo("");
//       setTaskTimestamp(currentTime);
//     }
//   };

//   const formatTime = (time) => {
//     const hours = time.getHours() % 12 || 12;
//     const minutes = time.getMinutes().toString().padStart(2, "0");
//     const ampm = time.getHours() >= 12 ? "PM" : "AM";
//     return `${hours}:${minutes} ${ampm}`;
//   };

//   const handleDeleteTask = (index) => {
//     const newTodos = todos.filter((task, ind) => ind !== index);
//     setTodos(newTodos);
//   };

//   const handleCompletedTask = (index) => {
//     const newTodos = todos.map((task, ind) => {
//       if (ind === index) {
//         return { ...task, isCompleted: !task.isCompleted };
//       }
//       return task;
//     });
//     setTodos(newTodos);
//   };

//   const handleEditTask = (index) => {
//     setIsEditing(true);
//     setCurrentTaskIndex(index);
//     setTodo(todos[index].name);
//   };

//   const handleSaveEdit = () => {
//     if (todo.trim()) {
//       const newTodos = todos.map((task, index) => {
//         if (index === currentTaskIndex) {
//           return { ...task, name: todo };
//         }
//         return task;
//       });
//       setTodos(newTodos);
//       setIsEditing(false);
//       setCurrentTaskIndex(null);
//       setTodo("");
//     }
//   };

//   return (
//     <>
//       <div className="w-[100vw] bg-zinc-900 h-[100vh] flex justify-center items-center font-[poppins]">
//         <div className="w-[60%] mx-auto border-[1px] border-zinc-500 rounded-lg h-[80%] p-16">
//           <h1 className="text-5xl font-semibold bg-gradient-to-l from-pink-500 to-blue-500 text-transparent bg-clip-text mb-8">
//             To Do App
//           </h1>
//           <div className="flex gap-5">
//             <input
//               type="text"
//               value={todo}
//               onChange={(e) => setTodo(e.target.value)}
//               placeholder="Task Name"
//               className="bg-zinc-700 w-[85%] px-7 py-5 rounded-xl outline-none text-white"
//             />
//             <button
//               className="w-[15%] bg-pink-500 text-white px-3 rounded-lg font-medium"
//               onClick={isEditing ? handleSaveEdit : handleAddTask}
//             >
//               {isEditing ? "Save Task" : "Add Task"}
//             </button>
//           </div>
//           <div className="text-white mt-10 h-[50%] overflow-auto">
//             <ul className="flex-col flex gap-y-10">
//               {todos.map((task, index) => (
//                 <div key={task.id} className="flex items-center gap-24">
//                   <button onClick={() => handleCompletedTask(index)}>
//                     <img src="../public/vite.svg" alt="Complete" />
//                   </button>
//                   <li className={`flex gap-5 text-1xl ${task.isCompleted ? "line-through" : ""}`}>
//                     {task.name}
//                     <p>
//                       {task.id === taskTimestamp?.getTime()
//                         ? formatTime(new Date(task.id))
//                         : task.time}
//                     </p>
//                   </li>
//                   <button onClick={() => handleEditTask(index)}>
//                     <img src="../public/vite.svg" alt="Edit" />
//                   </button>
//                   <button onClick={() => handleDeleteTask(index)}>
//                     <img src="../public/vite.svg" alt="Delete" />
//                   </button>
//                 </div>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default App;
