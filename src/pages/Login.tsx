import axios from "axios"
import useToken from "../store/store"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { LoginState } from "../types/types"
import { useLoginStore } from "../store/login.store"

function Login() {
  const navigate = useNavigate();
  
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginState>()

  const email = useLoginStore((state) => state.email)
  const password = useLoginStore((state) => state.password)
  const setEmail = useLoginStore((state) => state.setEmail)
  const setPassword = useLoginStore((state) => state.setPassword)

  const setToken = useToken((state) => state.setToken)
  const setUserId = useToken((state) => state.setUserId)

  const handleEmailChange = (e : React.ChangeEvent<HTMLInputElement>) => (
    setEmail(e.target.value)
  )

  const handlePasswordChange = (e : React.ChangeEvent<HTMLInputElement>) => (
    setPassword(e.target.value)
  )

  const sendForm = async () => {
    
    try {
      const result = await axios.post('http://85.31.237.33/auth/login', {
        email: email,
        password: password
      });
      
      setToken(result.data.token)
      setUserId(result.data.id)
      
      navigate('/home')
      
      
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
 

  return (
    <div className="h-screen w-full flex items-center justify-center text-white bg-zinc-900">
      <div className="sm:w-1/2 w-3/4 flex flex-col gap-20 sm:p-7 rounded-xl drop-shadow-lg">
        <p className="text-center text-4xl">
          Login
        </p>
        <form method="post" className="flex flex-col w-full items-center" onSubmit={handleSubmit(sendForm)}>
          <div className="w-full sm:w-[310px] flex flex-col gap-2">
            {errors.email?.type === "required" ? <span className="text-sm text-red-400">{errors.email.message}</span> : " "}
            <label className="input input-bordered sm:w-[310px] flex items-center gap-2 text-white">
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
              <input type="text" className="grow text-white" placeholder="Email" {...register("email",{ required: "Email Address is required"})} onChange={handleEmailChange} />
                
            </label>

            {errors.password?.type === "required" ? <span className="text-sm text-red-400">{errors.password?.message}</span> : " "}
            <label className="input input-bordered sm:w-[310px] flex items-center gap-2 text-white">
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
              <input type="password" id="password" className="grow w-fit text-white" placeholder="Password" {...register("password",{ required: "Password is required"})} onChange={handlePasswordChange} />
            </label>
          </div>
          <button type="submit" className="mt-8 w-3/4 sm:w-[310px] bg-red-700 hover:bg-red-800 text-white font-bold px-7 py-1 drop-shadow-lg hover:drop-shadow-sm rounded-xl ease-linear duration-150">login</button>
        </form>
        <div className="w-full flex flex-col gap-3 text-center items-center justify-center">
          don't have an account ?
          <Link to={'/sign-up'} className="w-3/4 sm:w-[310px]" >
            <button className="w-full sm:w-[310px] px-7 py-1 bg-white text-red-700 font-bold hover:bg-gray-200 drop-shadow-lg hover:drop-shadow-sm rounded-xl">
                  sign up
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login