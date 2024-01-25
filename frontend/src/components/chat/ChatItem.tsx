import { Avatar, Box } from '@mui/material'

const ChatItem = ({ content, role }: { content: string, role: "user" | "assistant" }) => {
    return role === "assistant" ? <Box sx={{ display: "flex", p: 2, bgcolor: "#004d5612", my: 2, gap: 2 }}>
        <Avatar>G{content}</Avatar>
    </Box> : <Box>

    </Box>
}

export default ChatItem
