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
    <div className="h-screen ease-in text-center w-screen bg-red-300 flex items-center justify-center">
        <div className="flex flex-col gap-5 items-center justify-center">
          <p id="messages">
            {
              messages.map((message,index) => (
                <li key={index}>
                  {message}
                </li>
              ))
            }
          </p>
          <form action="" method="post" onSubmit={onSubmit}>
              <input type="text" onChange={ e => setValue(e.target.value) } value={value} />
              <button type="submit"  disabled={ isLoading }>send</button>
          </form>
          <p id="show message">
              text
          </p>
        </div>
    </div>
  )
}

export default Chat