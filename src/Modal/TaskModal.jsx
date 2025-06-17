// TaskModal.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useAxiosPublic from "../hook/useAxiosPublic";

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const modal = {
  hidden: { y: "-100vh", opacity: 0, scale: 0.8 },
  visible: { y: "0", opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 25 } },
  exit: { y: "100vh", opacity: 0, transition: { ease: "easeInOut" } }
};

const TaskModal = ({ isOpen, closeModal, task, onUpdate }) => {
  const axiosPublic = useAxiosPublic();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("To-Do");

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
      await axiosPublic.put(`/tasks/${task._id}`, updatedTask);
      onUpdate({ ...task, ...updatedTask });
      closeModal();
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center p-4 z-50"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={closeModal}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl w-full max-w-md relative"
            variants={modal}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100 text-center">Edit Task</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <input
                type="text"
                className="w-full  text-white px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-100 dark:bg-gray-700"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task Title"
                required
              />
              <textarea
                className="w-full px-4  text-white py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-100 dark:bg-gray-700"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Task Description"
                rows={3}
              />
              <select
                className="w-full px-4 py-2 text-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-100 dark:bg-gray-700"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>To-Do</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#2c918b]  text-white transition"
                >
                  Update
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TaskModal;
