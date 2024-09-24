import Hero from "./pages/Hero.tsx"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Error from './pages/Error.tsx';
import Home from './pages/Home.tsx';
import { QueryClientProvider , QueryClient } from 'react-query';
import Login from './pages/Login.tsx';
import SignUp from './pages/SignUp.tsx';
import Navbar from "./components/Navbar.tsx";


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
        <Navbar/>
        <RouterProvider router={router}/>
      </QueryClientProvider>
  )
}

export default App
