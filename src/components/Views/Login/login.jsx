import { Avatar, Grid, Paper, TextField } from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { auth, db } from '../../../config /Firebase/firebase';
import Button from '../../UI/Button/Button';
import LockIcon from '@mui/icons-material/Lock';
import { doc, getDoc } from 'firebase/firestore';
const Login=()=>{
    const paperStyle={padding :50,height:'60vh',width:280, margin:"70px auto"}
    const avatarStyle={backgroundColor:'#ff6699'}
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();  

    React.useEffect(()=>{
      if(typeof window !== 'undefined'){
        const session = JSON.parse(localStorage.getItem('session'));
        if(session)(
          localStorage.removeItem("session")
        )
      }
    },[])
  function handleEmail(e){
    setEmail(e.target.value)
  }
  
function handlePassword(e){
    setPassword(e.target.value)
  }

  function handleSubmit(){ 
    signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      console.log(userCredential)
      const docRef = doc(db, "adminUsers", userCredential.user.uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
if(docSnap.data().status==='active' ){
      const user = userCredential.user;
      localStorage.setItem("session", JSON.stringify(user));
      console.log(user)
      navigate("/shop");

}else{
  alert("You Have Been Blocked")
}
               // setLoading(false)
  
      } else {
        alert('no user exist')
        // setLoading(false)
      }
      // const user = userCredential.user;
      // localStorage.setItem("session", JSON.stringify(user));
      // console.log(user)
      // navigate("/shop");
    })
    .catch((error) => {
      alert(error.message)
    });
}
      
     
   function submit(e){
    e.preventDefault()
    handleSubmit()
  }
    return(
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle} color='red'><LockIcon/></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <TextField style={{marginTop:'40px'}} variant="outlined" label='Username' placeholder='Enter username' fullWidth required onChange={handleEmail}/>
                <TextField  style={{marginTop:'40px'}} variant="outlined" label='Password' placeholder='Enter password' type='password' fullWidth required  onChange={handlePassword}/>
                <Button style={{marginTop:'40px',height:'50px'}} variant="contained" color="primary" onClick={submit} fullWidth>
                                       Log In
                                    </Button>
                </Paper>
        </Grid>
    )
}

export default Login