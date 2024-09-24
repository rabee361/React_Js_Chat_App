import { useState } from "react";
import useToken from "../store/store";
import { socket } from "../services/socket";
import { Message } from "../types/types"
import { GoFileZip } from "react-icons/go";
import { MdOutlineHd } from "react-icons/md";

function Messages() {

    const [messages, setMessages] = useState<Message[]>([]);
    const chatId = useToken((state) => state.chatId)
    const userId = useToken((state) => state.userId)

    socket.emit('getMessagesServer' , chatId , (messages:Message[]) => {
        setMessages(messages);
        
      });
    
  const formatDateTime = (timestamp: string): string => {
    let date: Date = new Date(timestamp)
    let now: Date = new Date()
    if (now.getDate() - date.getDate() >= 1) {
      if ((date.getHours() - 12) >= 0) {

        if ((now.getDate() - date.getDate()) > 1) {
          return `${date.getHours()-12}:${date.getMinutes()} PM - ${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`
        }
        else {
          return `${date.getHours()-12}:${date.getMinutes()} PM`
        }
      }

      else {
        if ((now.getDate() - date.getDate()) > 1) {
          return `${date.getHours()}:${date.getMinutes()} AM - ${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`
        }
        else {
          return `${date.getHours()}:${date.getMinutes()} AM`
        }
      }

    }


    else {
      if ((now.getHours() - date.getHours()) >= 1) {
        return `${(now.getHours() - date.getHours())} hours ago`
      }
      else {
        return `${(now.getMinutes() - date.getMinutes())} minutes ago`
      }

    }
  }
  



  return (
    <div id="messages" className="w-1/2 flex flex-col-reverse overflow-auto overflow-y-auto scrollbar-thin scrollbar-track-transparent" >            
        <div>
        {
        messages?.map((message,index) => (
            
            message.content && message.attach ? (
                <div key={index} className={`chat ${message.senderId === userId ? 'chat-end': 'chat-start'}`}>
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                    <img
                        alt="Tailwind CSS chat bubble component"
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                </div>
                <div className="bg-gray-800 p-1 rounded-lg mb-1">
                    <a href={message.attach}><img src={message.attach} className="w-32 rounded-lg" alt="" /></a>
                </div>
                <div className="chat-bubble bg-zinc-800 text-white">
                    {message.content}
                </div>
                <div className="chat-footer opacity-50">{formatDateTime(message.createdAt)}</div>
                </div>

            ) :
            message.attach ?
            (
                <div key={index} className={`chat ${message.senderId === userId ? 'chat-end': 'chat-start'}`}>
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                    <img
                        alt="Tailwind CSS chat bubble component"
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                </div>
                <button onClick={()=>document.getElementById('my_modal_2')?.showModal()}>
                  <div className=" bg-zinc-800 p-1 rounded-lg mb-1">
                    <img src={message.attach} className="w-32 rounded-lg" alt="" />
                  </div>
                </button>

                <dialog id="my_modal_2" className="modal">
                  <div className="modal-box flex flex-col items-center gap-10 justify-center">
                    <img src={message.attach} className="w-32 rounded-lg" alt="" />
                    <div className="flex gap-10">
                      <button className="flex gap-2"><GoFileZip size={20} /> download low quality</button>
                      <button className="flex gap-2"><MdOutlineHd size={20}/> download high quality</button>
                    </div>
                  </div>
                  <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                  </form>
                </dialog>

                <div className="chat-footer opacity-50">{formatDateTime(message.createdAt)}</div>
                </div>
            ) : 
            (
                <div key={index} className={`chat ${message.senderId === userId ? 'chat-end': 'chat-start'}`}>
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                    <img
                        alt="Tailwind CSS chat bubble component"
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                </div>
                <div className="chat-bubble bg-zinc-800 text-white">
                    {message.content}
                </div>
                <div className="chat-footer opacity-50">{formatDateTime(message.createdAt)}</div>
                </div>
            )
            
        ))
        }
        </div>
            <div className="chat chat-start">
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                    <img
                        alt="Tailwind CSS chat bubble component"
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                </div>

                <div className="chat-footer opacity-50">time</div>
            </div>
    </div>

  )
}

export default Messages