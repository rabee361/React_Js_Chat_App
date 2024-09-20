import Chat from "./Chat"
import ChatBubbles from "./ChatBubbles"

function Home() {
  return (
    <div className="overflow-visible">
        <ChatBubbles/>
        <Chat/>
    </div>
  )
}

export default Home