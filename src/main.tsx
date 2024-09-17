import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Error from './components/Error.tsx';
import Home from './components/Home.tsx';
import { QueryClientProvider , QueryClient } from 'react-query';
import Login from './components/Login.tsx';
import SignUp from './components/SignUp.tsx';


const queryClient = new QueryClient()


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error/>
  },
  {
    path: "home/",
    element: <Home />,
  },  
  {
    path: "login/",
    element: <Login />,
  },
  {
    path: "sign-up/",
    element: <SignUp />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(

    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}/>
      </QueryClientProvider>
    </React.StrictMode>,
)
