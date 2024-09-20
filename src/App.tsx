import Hero from "./components/Hero"
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
    element: <Hero />,
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

function App() {
  return (
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}/>
      </QueryClientProvider>
  )
}

export default App
