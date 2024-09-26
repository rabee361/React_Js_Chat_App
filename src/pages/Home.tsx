import Chat from "../components/Chat"
import UsersChats from "../components/UsersChats"

function Home() {
  return (
    <div className=" h-screen flex flex-col-reverse sm:flex-row overflow-visible bg-zinc-900">
        <Chat/>
        <UsersChats/>
    </div>
  )
}

export default Home