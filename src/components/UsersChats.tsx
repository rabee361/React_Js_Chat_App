import axios from "axios"
import { useQuery } from "react-query"
import useToken from "../store/store"
import { Chat } from "../types/types"

function UsersChat() {
    const {data} = useQuery({ queryKey:['users'] , queryFn: fetchUsers})
    const setChatId = useToken((state) => state.setChatId)
  return (
    <div className="flex sm:flex-col gap-3 w-screen sm:w-fit sm:h-screen h-fit text-nowrap sm:p-3 p-1 sm:pt-14 mt-10 sm:mt-0 sm:mr-3 overflow-x-auto">
        {Array.isArray(data) && data.length > 0 ? (
            
            data.map((chat) => (
                
                <div key={chat.id} className="flex sm:flex-row flex-col-reverse justify-center text-xs sm:text-lg items-center sm:gap-3 gap-0 text-wrap sm:text-nowrap" onClick={() => setChatId(chat.id)}>
                <div className="hidden sm:block">{chat.user1.username}</div>
                    <div className='avatar online'>
                        <div className="sm:w-10 w-9 rounded-full">
                            <img src={chat.user1.image} alt={`Avatar for ${chat.user1.username}`} />
                        </div>
                    </div>
                </div>
            ))
        ) : (
            <p>No users available</p> 
            
        )}

                       

    </div>
  )
}

const headers = {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjUsInVzZXJuYW1lIjoidGVzdDEiLCJlbWFpbCI6InRlc3QxMkBlbWFpbC5jb20iLCJpbWFnZSI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9maWxlcy8wZGY5MGZiODAzYWZmNGQ4ZTc1NzA0NjMwNTc5MWI2YS5qcGciLCJjcmVhdGVkQXQiOiIyMDI0LTA5LTE0VDEzOjAwOjQzLjU2MloiLCJ1cGRhdGVkQXQiOiIyMDI0LTA5LTE0VDEzOjAwOjQzLjU2MloiLCJvbmxpbmUiOmZhbHNlLCJpYXQiOjE3MjYzMTg4NDMsImV4cCI6MTcyNjMyMjQ0M30.Mwbak3WHEkgk-esKdGM3vX_MG18ioaBti_ng2wz9H3E',
    'Content-Type': 'application/json'
  };

const fetchUsers = (): Promise<Chat[]> => (
    axios.get('http://localhost:3000/users/chats/1' , {headers}).then((response) => response.data)
)


 

export default UsersChat