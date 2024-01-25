import { Avatar, Box, Button, Typography } from '@mui/material'
import { red } from '@mui/material/colors'
import { useAuth } from '../context/AuthContext'
const chatMessages = [
  { role: 'user', content: "Hello, what's the weather like today?" },
  { role: 'assistant', content: "Hi there! I'm not able to provide real-time weather updates. You can check a weather website or app for the latest information." },
  { role: 'user', content: 'Can you tell me a joke?' },
  { role: 'assistant', content: "Sure! Why don't scientists trust atoms? Because they make up everything!" },
];

const Chat = () => {
  const auth = useAuth()
  console.log(auth?.user?.name.split(" "))
  return (
    <Box sx={{ display: "flex", flex: 1, width: "100%", height: "100%", mt: 3, gap: 3 }}>
      <Box sx={{ display: { md: "flex", sx: "none", sm: "none" }, flex: 0.2, flexDirection: "column" }}>
        <Box sx={{ display: "flex", width: "100%", height: "60vh", bgcolor: 'rgb(17,29,39)', borderRadius: 5, flexDirection: "column", mx: 3 }}>
          <Avatar sx={{ mx: "auto", my: 2, bgcolor: 'white', color: "black", fontWeight: 700 }}>
            {auth?.user?.name[0]}
            {auth?.user?.name.split(" ")[1] && auth?.user?.name.split(" ")[1][0] || auth?.user?.name.split("")[1]}
          </Avatar>
          <Typography sx={{ mx: "auto", fontFamily: "work sans" }}>
            You are talking to a chat bot
          </Typography>
          <Typography sx={{ mx: "auto", fontFamily: "work sans", my: 4, p: 3 }}>
            You can ask questions related to Knowkedge ,bussinesss,Advertises,
            Education, etc . But avoid sharing porsonal information.
          </Typography>
          <Button sx={{ width: "200px", my: "auto", color: "white", fontWeight: "700", borderRadius: 3, mx: "auto", bgcolor: red[300], ":hover": { bgcolor: red.A400 } }}>Clear Conversation</Button>
        </Box>
      </Box>
      <Box sx={{ display: "flex", flex: { md: 0.8, xs: 1, sm: 1 },flexDirection:'column',px:3 }}>
        <Typography sx={{ textAlign: "center", fontSize: "40px", color: 'white', mb: 2, width: "100%",fontWeight:"600" }}>
          Model - GPT 3.5 Turbo
        </Typography>
        <Box sx={{ width: "100%", height: "60vh", borderRadius: 3, mx: "auto", display: "flex", flexDirection: "column", overflow: "scroll", overflowX: "hidden",overflowY:"auto", scrollBehavior: "smooth" }}>
          {chatMessages.map((chat)=>(<div>{chat.content}</div>))}
        </Box>
      </Box>
    </Box>
  )
}

export default Chat
