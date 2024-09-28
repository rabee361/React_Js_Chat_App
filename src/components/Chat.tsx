import { useRef, useState } from "react";
import { socket } from "../services/socket";
import useToken from "../store/store";
import { IoSend } from "react-icons/io5";
import { GrAttachment } from "react-icons/gr";
import { motion, useAnimation } from "framer-motion";
import axios from "axios";
import { Message } from "../types/types"
import Messages from "./Messages";

function Chat() {
  const mainControls = useAnimation();


  const userId = useToken((state) => state.userId)
  const chatId = useToken((state) => state.chatId)
  const [imageValue , setImageValue] = useState<File | null>(null)
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function sendMessage(event: React.FormEvent<HTMLFormElement>) {  
    event.preventDefault();
    setIsLoading(true);

    
    try {
      const { message1 , message2} = await sendImage(imageValue)
      console.log(message1);
      console.log(message2);
      
      const newMessage: Message = {
        senderId: userId,
        chatId: chatId,
        content: value.trim(),
        createdAt: String(new Date()),
        attach: message1?.attach,
        attachSize: message1?.attachSize,
        attach2: message2?.attach,
        attachSize2: message2?.attachSize,
      };
        console.log(newMessage);

        if (newMessage.attach || newMessage.content) {
          await socket.emit('messageToServer', newMessage);
          setValue('');
          mainControls.start("initial");
        }
        setImageValue(null);  
        scrollBottom();

    } 
  
    catch (error) {
      console.error('Error sending message:', error);
    } 
    
    finally {
      setIsLoading(false);
    }
  }



  
  const handleClick = () => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
      // mainControls.start("in")
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        setImageValue(e.target.files[0]);
      }
  }

  const con = document.getElementById('messages')
  const scrollBottom = () => {
    if (con) {
      con.scrollTop = con.scrollHeight;
    }
  }


  const handleCancel = () => {
    setImageValue(null);
    console.log(imageValue);
    
  }


  
  return ( 
    <div className="flex flex-col items-center justify-end w-full h-screen gap-3 text-white">

        <Messages/>

        {
          imageValue ? (
        <motion.div id="img" className="sm:w-1/3 w-[230px] sm:h-20 h-10 flex items-center justify-between border border-gray-700 rounded-lg">
            {imageValue && (
            <img src={URL.createObjectURL(imageValue)} alt="" className="h-full rounded-lg" />
        )}
            <button onClick={handleCancel} className="border border-gray-700 rounded-lg sm:py-1 sm:px-3 sm:p-0 p-1 mr-3 text-sm hover:bg-slate-800 ease-linear duration-200">cancel</button>
        </motion.div>
          ) : (
            " "
          )
        }
        

        <form action="" method="post" onSubmit={sendMessage} className="flex gap-2 mb-4 sm:input input input-sm input-bordered items-center text-white bg-zinc-800 rounded-lg">
          <input type="text" className="grow" placeholder="enter message" onChange={ e => setValue(e.target.value) } value={value} />
          <button  type="submit"   disabled={ isLoading } className="hover:text-red-500 ease-linear duration-200"><IoSend/></button>
          <input type="file" ref={hiddenFileInput} onChange={handleChange} className="hidden" />
          <button onClick={handleClick} className="hover:text-red-500 ease-linear duration-200" ><GrAttachment/></button>
        </form>
    </div>
  )
}


async function sendImage(imageValue: File | null) {
  if (!imageValue) return ' ';

  try {
    const formData = new FormData();
    formData.append('image', imageValue);

    const result = await axios.post('http://85.31.237.33/chats/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(result.data);
    return result.data;
  } catch (error) {
    console.error('Failed to send image:', error);
    throw error;
  }
}

export default Chat