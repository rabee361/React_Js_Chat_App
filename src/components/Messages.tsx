import { useState } from "react";
import useToken from "../store/store";
import { socket } from "../services/socket";
import { Message } from "../types/types"
import { IoMdCloudDownload } from "react-icons/io";
import userImage from "../assets/images/images.png"
import myImage from "../assets/images/74.jpg"

function Messages() {

  const downloadImage = (url?:string) => {
    if (url) {
      fetch(url).then(response=>response.blob()).then(blob=> {
      const blobUrl = window.URL.createObjectURL(new Blob([blob]))
      
      const aTag = document.createElement('a')
      aTag.href = blobUrl
      aTag.setAttribute('download' ,`image ${Math.random()}.jpg`)
      document.body.appendChild(aTag)
      aTag.click();
      aTag.remove();
    })
    }
  }

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
    <div id="messages" className=" sm:px-28 px-5 w-full h-[500px] sm:h-screen flex flex-col-reverse overflow-auto overflow-y-auto scrollbar-thin scrollbar-track-transparent" >            
        <div className="h-fit">
        {
        messages?.map((message,index) => (
            
            
            message.content && message.attach ? (
              
                <div key={index} className={`chat ${message.senderId === userId ? 'chat-end': 'chat-start'}`}>
                  <div className="chat-image avatar">
                      <div className="w-10 rounded-full">
                      <img
                          alt="Tailwind CSS chat bubble component"
                          src={message.senderId === 1 ? myImage : userImage} />
                      </div>
                  </div>
                  <div className="chat-bubble flex flex-col bg-zinc-800 text-white">
                    <button onClick={()=>document.getElementById(`my_modal_${index}`)?.showModal()}>
                      <div className=" bg-zinc-800 p-1 rounded-lg mb-1">
                        <img src={message.attach2} className="w-32 rounded-lg" alt="" />
                      </div>
                    </button>

                    <dialog id={`my_modal_${index}`} className="modal">
                      <div className="modal-box flex flex-col items-center gap-10 justify-center">
                        <img src={message.attach2} className="w-32 sm:w-fit rounded-lg" alt="" />
                        <div className="flex gap-5">
                          <button onClick={() => {downloadImage(message.attach)}} className="flex gap-2 text-center items-center justify-center bg-white hover:text-red-500 p-2 text-black rounded-lg"><IoMdCloudDownload className="size-5 hover:text-red-500 ease-linear duration-150"/> <span className="text-xs">{message.attachSize}</span></button>
                          <button onClick={() => {downloadImage(message.attach2)}} className="flex gap-2 text-center items-center justify-center bg-white hover:text-red-500 p-2 text-black rounded-lg"><IoMdCloudDownload className="size-5 hover:text-red-500 ease-linear duration-150"/> <span className="text-xs">{message.attachSize2}</span></button>
                        </div>
                      </div>
                      <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                      </form>
                    </dialog>
                      {message.content}
                  </div>
                  <div className="chat-footer text-xs opacity-50">{formatDateTime(message.createdAt)}</div>
                </div>

            ) :
            message.attach ?
            (
              <div key={index} className={`chat ${message.senderId === userId ? 'chat-end': 'chat-start'}`}>
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                    <img
                        alt="Tailwind CSS chat bubble component"
                        src={message.senderId === 1 ? myImage : userImage} />
                    </div>
                </div>
                <button onClick={()=>document.getElementById(`my_modal_${index}`)?.showModal()}>
                  <div className=" bg-zinc-800 p-1 rounded-lg mb-1">
                    <img src={message.attach2} className="w-32 rounded-lg" alt="" />
                  </div>
                </button>

                <dialog id={`my_modal_${index}`} className="modal">
                  <div className="modal-box flex flex-col items-center gap-10 justify-center">
                    <img src={message.attach2} className="w-32 sm:w-fit rounded-lg" alt="" />
                    <div className="flex gap-5">
                      <button onClick={() => {downloadImage(message.attach)}} className="flex gap-2 text-center items-center justify-center bg-white hover:text-red-500 p-2 text-black rounded-lg"><IoMdCloudDownload className="size-5  ease-linear duration-150"/> <span className="text-xs">{message.attachSize}</span></button>
                      <button onClick={() => {downloadImage(message.attach2)}} className="flex gap-2 text-center items-center justify-center bg-white hover:text-red-500 p-2 text-black rounded-lg"><IoMdCloudDownload className="size-5 hover:text-red-500 ease-linear duration-150"/> <span className="text-xs">{message.attachSize2}</span></button>
                    </div>
                  </div>
                  <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                  </form>
                </dialog>

                <div className="chat-footer text-xs opacity-50">{formatDateTime(message.createdAt)}</div>
              </div>
            ) : 
            (
              <div key={index} className={`chat ${message.senderId === userId ? 'chat-end': 'chat-start'}`}>
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                    <img
                        alt="Tailwind CSS chat bubble component"
                        src={message.senderId === 1 ? myImage : userImage} />
                    </div>
                </div>
                <div className="chat-bubble bg-zinc-800 text-white">
                    {message.content}
                </div>
                <div className="chat-footer text-xs opacity-50">{formatDateTime(message.createdAt)}</div>
              </div>
            )
            
        ))
        }

        </div>

    </div>

  )
}

export default Messages