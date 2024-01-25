import React from "react"
import airobot from "../assets/airobot.png"
import { Box, Button, Typography } from '@mui/material'
import { IoIosLogIn } from "react-icons/io";
import { toast } from "react-hot-toast"
import { useAuth } from "../context/AuthContext";
import CustomizedInput from "../components/shared/CustomizedInput"
const Login = () => {
  const auth = useAuth()
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    try {
      toast.loading("Signing In",{id:"login"})
      await auth?.login(email, password)
      toast.success("Signed In Successful",{id:"login"})
    } catch (error) {
      console.log(error);
      toast.error("Signed In Failed",{id:"login"})
    }
  }
  return (
    <Box width={'100%'} height={'100%'} display={'flex'} flex={1}>
      <Box padding={8} mt={8} display={{ md: 'flex', sm: 'none', xs: 'none' }}>
        <img src={airobot} alt="Robot" style={{ width: "400px" }} />
      </Box>
      <Box
        display={'flex'}
        flex={{ xs: 1, md: 0.5 }}
        justifyContent={'center'}
        alignItems={'center'}
        padding={2}
        ml={'auto'}
        mt={16}>
        <form style={{ margin: 'auto', padding: '30px', boxShadow: '10px 10px 20px #000', border: 'none' }} onSubmit={submitHandler}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <Typography variant="h4" textAlign={'center'} padding={2} fontWeight={600}>Login</Typography>
            <CustomizedInput type="email" name="email" label="Email" />
            <CustomizedInput type="password" name="password" label="Password" />
            <Button
              type="submit"
              sx={{
                px: 2,
                py: 1,
                mt: 2,
                width: '400px',
                borderRadius: 2,
                bgcolor: "#00fffc",
                ":hover": {
                  bgcolor: "white",
                  color: "black"
                }
              }}
              endIcon={<IoIosLogIn />}
            >Login</Button>
          </Box>
        </form>
      </Box>
    </Box>
  )
}

export default Login