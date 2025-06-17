import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import useTashBoard from "../../hook/useTashBoard";
import { TbEdit } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import TaskModal from "../../Modal/TaskModal";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../hook/useAxiosPublic";


const categories = ["To-Do", "In Progress", "Completed"];

const TaskBoard = () => {
  const [tasks, setTasks, refetch] = useTashBoard(); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const axiosPublic = useAxiosPublic();

//  const [user, loading] = useAuth()

  // Handle Drag and Drop
  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return; 

    const movedTask = tasks.find((task) => task._id === draggableId);
    if (!movedTask) return;

    // Update category locally
    const updatedTasks = tasks.map((task) =>
      task._id === draggableId ? { ...task, category: destination.droppableId } : task
    );

    setTasks(updatedTasks);

    // Update category in database
    try {
      await axiosPublic.put(`/tasks/${draggableId}`, { category: destination.droppableId });
      setTasks(tasks.filter((task) => task._id !== draggableId))
    } catch (error) {
      console.error("Error updating task category:", error);
    }
  };

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/tasks/${_id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              setTasks(tasks.filter((task) => task._id !== _id));
              Swal.fire("Deleted!", "Your task has been deleted.", "success");
              refetch();
            }
          })
          .catch((error) => console.error("Error deleting task:", error));
      }
    });
  };

   // Handle task update in modal
  const handleUpdateTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task._id === updatedTask._id ? updatedTask : task))
    );
    setIsModalOpen(false);
  };

  return (
    <div className="w-11/12 m-auto md:my-20 my-7">
      <div className="text-end mb-5">
        <Link to="/addtask">
          <button className="p-3 rounded-xl font-bold bg-[#2c918b] text-white">Add Task</button>
        </Link>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="md:flex gap-6   w-full mx-auto">
          {categories.map((category) => (
            <Droppable key={category} droppableId={category}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="md:w-1/3 bg-[#2c918b]  my-5 p-4 rounded"
                >
                  <h2 className="text-lg text-white text-center font-bold mb-2 ">{category}</h2>
                  <hr  className="my-2"/>
                  {tasks
                    .filter((task) => task.category === category)
                    .map((task, index) => (
     <Draggable key={task._id} draggableId={task._id} index={index}>
       {(provided) => (
         <div
           ref={provided.innerRef}
           {...provided.draggableProps}
           {...provided.dragHandleProps}
           className="bg-blue-100 text-left space-y-4 p-3 rounded shadow mb-2 md:h-[180px] "
         >
           <h3 className="font-semibold text-xl"><span className="underline">Title:</span> {task.title}</h3>
           <p className="text-[17px] text-gray-900"><span className="underline">Description</span>
           : {task.description}</p>
           <p className="text-sm text-gray-900"><span className="underline">Date:</span> {new Date(task.timestamp).toLocaleString()}
           </p>
           <div className="flex mt-3 gap-4 ">
             <button
               onClick={() => {
                 setSelectedTask(task);
                 setIsModalOpen(true);
                 setTasks(setTasks)
               }}
             >
               <TbEdit className="text-2xl " />
             </button>
             <button onClick={() => handleDelete(task._id)}>
               <MdDelete className="text-2xl text-red-600" />
             </button>
           </div>
         </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      {isModalOpen && (
        <TaskModal
          isOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          task={selectedTask}
          onUpdate={handleUpdateTask}
        />
      )}
    </div>
  );
};

export default TaskBoard;
