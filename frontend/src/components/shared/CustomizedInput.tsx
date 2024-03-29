import { TextField } from "@mui/material";

type Props={
    name:string;
    type:string;
    label:string;
}
const CustomizedInput = (props:Props) => {
  return (
    <TextField 
    InputLabelProps={{style:{color:'white'}}} 
    name={props.name} 
    margin="normal"
    label={props.label} 
    type={props.type}
    inputProps={{style:{width:"400px",borderRadius:"10",fontSize:20,color:"white"}}}>
      
    </TextField>
  )
}

export default CustomizedInput
