import axios from "axios"
import { useQuery } from "react-query"
import useToken from "./store"

interface User {
    id: number
    username: string
    email: string
    password: string
    image: string
    online: boolean
  }

  interface Chat {
    id: number;
    user1Id: number;
    user2Id: number;
    user1: User;
    user2: User;
}


function UsersChat() {
    const {data} = useQuery({ queryKey:['users'] , queryFn: fetchUsers})
    const setChatId = useToken((state) => state.setChatId)
  return (
    <div className="absolute flex flex-col gap-3 w-fit text-nowrap p-3 mt-20">
        {Array.isArray(data) && data.length > 0 ? (
            
            data.map((chat) => (
                
                <div key={chat.id} className="flex gap-3" onClick={() => setChatId(chat.id)}>
                    <div className='avatar online'>
                        <div className="w-10 rounded-full">
                            <img src={chat.user1.image} alt={`Avatar for ${chat.user1.username}`} />
                        </div>
                    </div>
                    <div>{chat.user1.username}</div>
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