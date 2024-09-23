import Chat from "./Chat"
import UsersChats from "./UsersChats"

function Home() {
  return (
    <div className=" h-auto overflow-visible bg-zinc-900">
        <UsersChats/>
        <Chat/>
    </div>
  )
}

export default Home