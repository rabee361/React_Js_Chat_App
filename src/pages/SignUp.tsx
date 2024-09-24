import axios from "axios"
import useToken from "../store/store"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { SignUpState } from "../types/types"
import { useSignUpStore } from "../store/login.store"

function SignUp() {

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignUpState>()

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
    <div className="h-screen w-full flex items-center justify-center text-white bg-zinc-900">
      <div className="w-1/2 flex flex-col gap-20 p-7 rounded-xl drop-shadow-lg">
        <p className="text-center text-4xl">
          Sign Up
        </p>
        <form method="post" className="flex flex-col items-center" onSubmit={handleSubmit(sendForm)}>
          <div className="w-1/2 flex flex-col gap-2">
            {errors.username?.type === "required" ? <span className="text-sm text-red-400">{errors.username.message}</span> : " "}
            <label className="input input-bordered flex items-center gap-2 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70">
                <path
                  d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input type="text" className="grow text-white" placeholder="Username" {...register("username",{ required: "Email Address is required"})} onChange={handleUsernameChange} />
                
            </label>

            {errors.email?.type === "required" ? <span className="text-sm text-red-400">{errors.email.message}</span> : " "}
            <label className="input input-bordered flex items-center gap-2 text-white">
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

            {errors.password1?.type === "required" ? <span className="text-sm text-red-400">{errors.password1?.message}</span> : " "}
            <label className="input input-bordered flex items-center gap-2 text-white">
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
              <input type="password" id="password" className="grow text-white" placeholder="Password" {...register("password1",{ required: "Password is required"})} onChange={handlePassword1Change} />
            </label>

            {errors.password2?.type === "required" ? <span className="text-sm text-red-400">{errors.password2?.message}</span> : " "}
            <label className="input input-bordered flex items-center gap-2 text-white">
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
              <input type="password" id="password" className="grow text-white" placeholder="Confirm Password" {...register("password2",{ required: "Password is required"})} onChange={handlePassword2Change} />
            </label>

            <input type="file" id="image" name="image" className="file-input file-input-bordered w-full max-w-xs" />

          </div>
          <button type="submit" className="mt-8 w-1/2 bg-red-700 hover:bg-red-800 text-white font-bold px-7 py-1 drop-shadow-lg hover:drop-shadow-sm rounded-xl ease-linear duration-150">sign up</button>
        </form>
        <div className="flex flex-col gap-3 text-center items-center justify-center">
          Already have an account ?
          <button className="w-1/2 px-7 py-1 bg-white text-red-700 font-bold hover:bg-gray-200 drop-shadow-lg hover:drop-shadow-sm rounded-xl">
            login
          </button>
        </div>
      </div>
    </div>
  )
}

export default SignUp