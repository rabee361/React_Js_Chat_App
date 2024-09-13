import { useEffect, useState } from "react";
import { socket } from "../socket";

function Chat() {
  type Message = string;

    const [value, setValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
  
    function onSubmit(event:any) {
      event.preventDefault();
      setIsLoading(true);
      
      socket.timeout(1000).emit('messageToServer', value, () => {
        setIsLoading(false);
      });
      setValue('')
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
                Obi-Wan Kenobi
                <time className="text-xs opacity-50">12:45</time>
              </div>
              <div className="chat-bubble">{message}</div>
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
              <time className="text-xs opacity-50">12:46</time>
            </div>
            <div className="chat-bubble">I hate you!</div>
            <div className="chat-footer opacity-50">Seen at 12:46</div>
          </div>
        </div>
        <form action="" method="post" onSubmit={onSubmit} className="flex gap-5">
          <label className="input input-bordered flex items-center gap-2">
            Name
            <input type="text" className="grow" placeholder="Daisy" onChange={ e => setValue(e.target.value) } value={value} />
          </label>
          <button type="submit"  disabled={ isLoading }>send</button>
        </form>
    </div>
  )
}

export default Chat