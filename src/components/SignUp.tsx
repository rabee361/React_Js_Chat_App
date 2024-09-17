import axios from "axios"
import { create } from 'zustand'
import useToken from "./store"
import { useNavigate } from "react-router-dom"


type SignUpState = {
  email: string
  username: string
  password1: string
  password2: string
}

type SignUpAction = {
  setEmail: (email: SignUpState['email']) => void
  setUsername: (username: SignUpState['username']) => void
  setPassword1: (password: SignUpState['password1']) => void
  setPassword2: (password2: SignUpState['password2']) => void
}

const useSignUpStore = create<SignUpState & SignUpAction>((set) => ({
  email: '',
  username: '',
  password1: '',
  password2: '',
  setEmail: (email) => set(() => ({ email: email })),
  setUsername: (username) => set(() => ({ username: username })),
  setPassword1: (password1) => set(() => ({ password1: password1 })),
  setPassword2: (password2) => set(() => ({ password2: password2 })),
}))


function SignUp() {

  const setToken = useToken((state) => state.setToken);
  const setUserId = useToken((state) => state.setUserId);

  const navigate = useNavigate()

  const email = useSignUpStore((state) => state.email)
  const username = useSignUpStore((state) => state.username)
  const password1 = useSignUpStore((state) => state.password1)
  const password2 = useSignUpStore((state) => state.password2)
  const setEmail = useSignUpStore((state) => state.setEmail)
  const setUsername = useSignUpStore((state) => state.setUsername)
  const setPassword1 = useSignUpStore((state) => state.setPassword1)
  const setPassword2 = useSignUpStore((state) => state.setPassword2)

  const handleEmailChange = (e : React.ChangeEvent<HTMLInputElement>) => (
    setEmail(e.target.value)
  )

  const handlePassword1Change = (e : React.ChangeEvent<HTMLInputElement>) => (
    setPassword1(e.target.value)
  )
  const handlePassword2Change = (e : React.ChangeEvent<HTMLInputElement>) => (
    setPassword2(e.target.value)
  )
  const handleUsernameChange = (e : React.ChangeEvent<HTMLInputElement>) => (
    setUsername(e.target.value)
  )

  const sendForm = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await axios.post('http://localhost:3000/auth/sign-up', {
        email: email,
        password1: password1,
        password2: password2,
        username:username
      });
      setToken(result.data.token)
      setUserId(result.data.id)
      navigate('/home');
      
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
                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
              <input type="text" className="grow" placeholder="Username" onChange={handleUsernameChange} />
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
              <input type="password" name="password1" id="password1" className="grow" onChange={handlePassword2Change} />
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
              <input type="password" name="password2" id="password2" className="grow" onChange={handlePassword1Change} />
            </label>
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <div className="flex flex-col gap-3 text-center">
          Already have an account ?
          <button>
            Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default SignUp