import { useRef, useState } from "react";
import { socket } from "../socket";
import useToken from "./store";
import { IoSend } from "react-icons/io5";
import { GrAttachment } from "react-icons/gr";
import { motion, useAnimation } from "framer-motion";
import axios from "axios";

interface Message {
  id?: number
  senderId: number;
  chatId: number;
  content: string;
  createdAt: string;
  attach?: string;
}

function Chat() {
  const mainControls = useAnimation();

  const variants = {
    initial: {
      x: -20, 
      opacity: 0,
      },
      in: {
      x: 0, 
      opacity: 1,
      transition: {
          duration: 0.3, 
      },
    },
  };

  const userId = useToken((state) => state.id)
  const chatId = useToken((state) => state.chatId)
  const [imageValue , setImageValue] = useState<File | null>(null)
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  async function sendMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    
    try {
      const attahcment = await sendImage(imageValue)

      const newMessage: Message = {
        senderId: userId,
        chatId: chatId,
        content: value.trim(),
        createdAt: String(new Date()),
        attach: attahcment.attach
      };
      console.log(newMessage);
      
      await socket.emit('messageToServer', newMessage);
      setValue('');
      setImageValue(null);  
      mainControls.start("initial");
    } 
  
    catch (error) {
      console.error('Error sending message:', error);
    } 
    
    finally {
      setIsLoading(false);
    }
  }

  socket.emit('getMessagesServer' , chatId , (messages:Message[]) => {
    setMessages(messages);
    // console.log(messages);
    
  });

  
  const handleClick = () => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        
        setImageValue(e.target.files[0]);
        
        mainControls.start("in");

      }
  }


  return ( 
    <div className=" flex flex-col items-center justify-end w-full h-screen gap-3 overflow-visible">

        <div id="messages" className="w-1/2 overflow-visible" >
            {
              messages?.map((message,index) => (

                <div key={index} className="chat chat-start">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                  </div>
                </div>
                <div className="chat-header">
                

                <img src={message.attach} className="w-32" alt="" />
              
                </div>
                <div className="chat-bubble">{message.content}</div>
                <time className="chat-footer opacity-50">{message.createdAt}</time>
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

        <motion.div id="img" variants={variants} animate={mainControls} initial="initial" className="w-1/3 h-20 flex items-center justify-between border border-gray-700 rounded-lg">
            {imageValue && (
            <img src={URL.createObjectURL(imageValue)} alt="" className="h-full" />
        )}
            <a href="" className="mr-5"><button className="border border-gray-700 rounded-lg py-1 px-3 hover:bg-slate-800 ease-linear duration-200">cancel</button></a>
        </motion.div>

        <form action="" method="post" onSubmit={sendMessage} className="flex gap-1 mb-4">
          <label className="input input-bordered flex items-center gap-2">
            <input type="text" className="grow" placeholder="enter message" onChange={ e => setValue(e.target.value) } value={value} />
          </label>
          <button type="submit"  disabled={ isLoading } className="border rounded-lg border-gray-700 px-2" ><IoSend size={25}/></button>
          <input type="file" ref={hiddenFileInput} onChange={handleChange} className="hidden" />
          <button disabled={ isLoading } onClick={handleClick} className="border rounded-lg border-gray-700 p-2 pt-3" ><GrAttachment size={25}/></button>
        </form>
    </div>
  )
}



async function sendImage(imageValue: File | null) {
  if (!imageValue) return;

  try {
    const formData = new FormData();
    formData.append('image', imageValue);

    const result = await axios.post('http://localhost:3000/chats/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return result.data;
  } catch (error) {
    console.error('Failed to send image:', error);
    throw error;
  }
}





export default Chat