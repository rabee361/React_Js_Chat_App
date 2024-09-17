import axios from "axios"
import { create } from 'zustand'
import useToken from "./store"
import { redirect, useNavigate } from "react-router-dom"

type LoginState = {
  email: string
  password: string
}

type LoginAction = {
  setEmail: (email: LoginState['email']) => void
  setPassword: (email: LoginState['password']) => void
}

const useLoginStore = create<LoginState & LoginAction>((set) => ({
  email: '',
  password: '',
  setEmail: (email) => set(() => ({ email: email })),
  setPassword: (password) => set(() => ({ password: password })),
}))

function Login() {
  const navigate = useNavigate();

  const email = useLoginStore((state) => state.email)
  const password = useLoginStore((state) => state.password)
  const setEmail = useLoginStore((state) => state.setEmail)
  const setPassword = useLoginStore((state) => state.setPassword)

  const setToken = useToken((state) => state.setToken)
  const token = useToken((state) => state.token)

  const handleEmailChange = (e : React.ChangeEvent<HTMLInputElement>) => (
    setEmail(e.target.value)
  )

  const handlePasswordChange = (e : React.ChangeEvent<HTMLInputElement>) => (
    setPassword(e.target.value)
  )

  const sendForm = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await axios.post('http://localhost:3000/auth/login', {
        email: email,
        password: password
      });
      setToken(result.data.token)
      
      navigate('/home')
      
      
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
 

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="">
        <p className="text-center">
          Title
        </p>
        <form method="post" className="flex flex-col items-center" onSubmit={sendForm}>
          <div className="flex flex-col gap-2">
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70">
                <path 
                  d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path
                  d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input type="text" className="grow" placeholder="Email" onChange={handleEmailChange} />
            </label>

            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70">
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd" />
              </svg>
              <input type="password" name="password" id="password" className="grow" onChange={handlePasswordChange} />
            </label>
          </div>
          <button type="submit">login</button>
        </form>
        <div className="flex flex-col gap-3 text-center">
          don't have an account ?
          <button>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login