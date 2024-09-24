import Chat from "../components/Chat"
import UsersChats from "../components/UsersChats"

function Home() {
  return (
    <div className=" h-auto overflow-visible bg-zinc-900">
        <UsersChats/>
        <Chat/>
    </div>
  )
}

export default Home