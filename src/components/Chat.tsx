import { useEffect, useState } from "react";
import { socket } from "../socket";

interface Message {
  senderId: number;
  chatId: number;
  content: string;
  createdAt: string
}


function Chat() {
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  async function sendMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    
    try {
      // Assuming you have a way to get the current user ID
      
      const newMessage: Message = {
        senderId: 1,
        chatId: 1,
        content: value.trim(),
        createdAt: String(new Date())
      };

      await socket.emit('messageToServer', newMessage);
      setValue('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  }


  useEffect(() => {
    const handleMessage = (message: Message) => {
      setMessages(prevMessages => [...prevMessages, message]);
      console.log('New message:', message);
    };

    socket.on('messageToClient', handleMessage);

    return () => {
      socket.off('messageToClient', handleMessage);
    };
  }, []);



  return ( 
    <div className=" flex flex-col items-center justify-end w-full h-screen gap-3">

        <div id="messages" className="w-1/2" >
            {
              messages.map((message,index) => (

              <div key={index} className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
              </div>
              <div className="chat-header">
                {message.senderId}
                <time className="text-xs opacity-50">{message.createdAt}</time>
              </div>
              <div className="chat-bubble">{message.content}</div>
              <div className="chat-footer opacity-50">Delivered</div>
              </div>
              ))
            }

          <div className="chat chat-end">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <div className="chat-header">
              Anakin
              <time className="text-xs opacity-50"></time>
            </div>
            <div className="chat-bubble">I hate you!</div>
            <div className="chat-footer opacity-50">Seen at 12:46</div>
          </div>
        </div>
        <form action="" method="post" onSubmit={sendMessage} className="flex gap-5">
          <label className="input input-bordered flex items-center gap-2">
            <input type="text" className="grow" placeholder="enter message" onChange={ e => setValue(e.target.value) } value={value} />
          </label>
          <button type="submit"  disabled={ isLoading }>send</button>
        </form>
    </div>
  )
}






export default Chat