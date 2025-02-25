import { useState } from "react";
import useAuth from "../Auth/useAuth";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

import useAxiosPublic from "../hook/useAxiosPublic";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";


const AddTask = () => {
const user = useAuth(); 
  const userId =  user?.user?.userId 
   const axiosPublic = useAxiosPublic()
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("To-Do");
  const [loading, setLoading] = useState(false);
const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return alert("Title is required!");

    setLoading(true);
    const newTask = { title, description, category, userId };

    try {
      const res = await axiosPublic.post("Tasks", newTask);
      console.log(res);
      toast.success('Task Add')
      navigate('/taskbord')
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error adding task:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
     
          <div  className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-gray-900 bg-opacity-50 absolute inset-0"></div>
      <div className="bg-white p-6 rounded-lg border-2 border-gray-500 shadow-inner w-96 relative z-10">
       <Link to={'/'}> <span className="cursor-pointer"><FaArrowLeft></FaArrowLeft></span></Link>
              <h2 className="  mb-4 text-2xl text-center font-bold">Add New Task</h2>
    
              <form onSubmit={handleSubmit}>
                {/* Title Input */}
                <input
                  type="text"
                  placeholder="Task Title"
                  className="w-full p-2 border rounded-md mb-3"
                  maxLength={50}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
    
                {/* Description Input */}
                <textarea
                  placeholder="Task Description (optional)"
                  className="w-full p-2 border rounded-md mb-3"
                  maxLength={200}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
    
                {/* Category Selector */}
                <select
                  className="w-full p-2 border rounded mb-3"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="To-Do">To-Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
    
                {/* Buttons */}
                <div className="flex justify-center gap-2">
      
                  <button
                    type="submit"
                    className="px-3 py-2 bg-blue-500 text-white rounded"
                    disabled={loading}
                  >
                    {loading ? "Adding..." : "Add Task"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        
  );
};

export default AddTask;