import {
  createBrowserRouter,
  
} from "react-router-dom";

import Home from "./Pages/Home";
import Main from "./Layout/Main";
import Login from "./Auth/Login";
import Dashborad from "./Dashboard/Dashborad";
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
     
    ]
    
  },
   {
     path: '/login',
     element: <Login></Login>
   },
  
     // dashboard
  {
    path: '/dashboard',
    element: <PrivateRoute><Dashborad></Dashborad></PrivateRoute>
   
  
  }  
 
]);