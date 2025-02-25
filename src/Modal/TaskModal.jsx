import { useState, useEffect } from "react";
import useAxiosPublic from "../hook/useAxiosPublic";

const TaskModal = ({ isOpen, closeModal, task, onUpdate }) => {
  const axiosPublic = useAxiosPublic();

  // Initialize state with task values, and update if task changes.
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [category, setCategory] = useState(task?.category || "To-Do");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setCategory(task.category);
    }
  }, [task]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const updatedTask = { title, description, category };

      // Send update request to the backend
      await axiosPublic.put(`/tasks/${task._id}`, updatedTask);

      // Call the parent's onUpdate callback to update the task instantly in the UI
      onUpdate({ ...task, ...updatedTask });

      closeModal(); // Close modal after update
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-3">Edit Task</h2>
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            placeholder="Task Title"
            className="w-full p-2 border rounded mb-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Task Description"
            className="w-full p-2 border rounded mb-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <select
            className="w-full p-2 border rounded mb-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="To-Do">To-Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
              Update Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
