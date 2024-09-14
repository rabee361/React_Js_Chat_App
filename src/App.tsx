import { QueryClient, QueryClientProvider } from "react-query"
// import Login from "./components/Login"
// import SignUp from "./components/SignUp"
import Chat from "./components/Chat"
import ChatBubbles from "./components/ChatBubbles"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex ">
        <ChatBubbles/>
        <Chat/>
        {/* <SignUp/> */}
      </div>
    </QueryClientProvider>
  )
}

export default App
