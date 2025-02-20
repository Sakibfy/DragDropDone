import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { router } from './Router/Router'
import { RouterProvider } from 'react-router-dom'
import AuthProvider from './provider/AuthProvider'
import {
  
} from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'





createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      
        <div className=' '>
            <RouterProvider router={router} />
           <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"

/>
     </div>
      
    </AuthProvider>
  </StrictMode>,
)
