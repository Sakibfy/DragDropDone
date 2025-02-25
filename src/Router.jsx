import {
  createBrowserRouter,
  
} from "react-router-dom";

import Home from "./Pages/Home";
import Main from "./Layout/Main";
import Login from "./Auth/Login";

// import PrivateRoute from "./Provider/PrivateRoute/PrivateRoute";
import TaskBoard from "./Dashboard/MiniSidebar/TaskBoard";
import AddTask from "./Dashboard/AddTask";
import PrivateRoute from "./Provider/PrivateRoute/PrivateRoute";




export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
      },
     {
     path: '/taskbord',
     element: <PrivateRoute><TaskBoard></TaskBoard></PrivateRoute>
  },
     
    ]
    
  },
   
     {
     path: '/addtask',
     element: <PrivateRoute><AddTask></AddTask></PrivateRoute>
   },
   {
     path: '/login',
     element: <Login></Login>
   },
  
   
  
     // dashboard
  
 
]);