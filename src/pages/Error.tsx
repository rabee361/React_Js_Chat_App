import { Link } from "react-router-dom"

function Error() {
  return (
    <section className="w-full h-screen flex items-center justify-center bg-white dark:bg-zinc-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="mx-auto max-w-screen-sm text-center">
                <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-red-600">404</h1>
                <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">Something's wrong.</p>
                <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Sorry, we can't find that page you want. You can go back to the home page. </p>
                <Link to={"/"} className="inline-flex text-red-500 font-bold bg-gray-200 hover:bg-gray-300 ease-linear duration-150 hover:bg-primary-800 rounded-lg text-sm px-5 py-2.5 text-cente my-4">Back to Homepage</Link>
            </div>   
        </div>
    </section>
  )
}

export default Error