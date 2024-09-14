import axios from "axios"
import { useQuery } from "react-query"

interface User {
    id: number
    username: string
    email: string
    password: string
    image: string
    online: boolean
  }

function ChatBubbles() {
    const {data} = useQuery({ queryKey:['users'] , queryFn: fetchUsers})
    

  return (
    <div className="flex flex-col gap-3 w-fit text-nowrap p-3">
        {Array.isArray(data) && data.length > 0 ? (
            data.map((user, index) => (
                
                <div key={index} className="flex gap-3">
                    <div className='avatar online'>
                        <div className="w-10 rounded-full">
                            <img src={user.image} alt={`Avatar for ${user.username}`} />
                        </div>
                    </div>
                    <div>{user.username}</div>
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

const fetchUsers = (): Promise<User[]> =>
    axios.get('http://localhost:3000/users' , {headers}).then((response) => response.data)
 

export default ChatBubbles