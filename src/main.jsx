import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider } from 'react-router-dom'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'
import { router } from './Router'
import AuthProvider from './Provider/AuthProvider'

const queryClient = new QueryClient()



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      
      <QueryClientProvider client={queryClient}>
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
   </QueryClientProvider>
      
    </AuthProvider>
  </StrictMode>,
)
