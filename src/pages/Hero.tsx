import { Link } from "react-router-dom"
import hero from "../assets/images/hero.png"
import useToken from "../store/store"



function Hero() {
  const token = useToken((state) => state.token)
  
  return (
    <section className="w-full h-screen bg-zinc-900 overflow-hidden">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
              <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Fast, Reliable and Secure connection in Real-Time with <small className="md:text-5xl xl:text-6xl text-red-500">Connect</small> </h1>
              <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">Built with Nest JS for the backend and React JS in the front-end to help establish real-time connection using socket.io to enable users to send text and media. </p>
              <Link to={token ? 'home': 'login'} className="inline-flex items-center justify-center px-3 py-3 sm:px-5 sm:py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-red-600 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900 bg-red-500 ease-linear duration-150">
                  Get started
                  <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
              </Link>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
              <img src={hero} alt="hero_img"/>
          </div>                
      </div>
    </section>
  )
}

export default Hero