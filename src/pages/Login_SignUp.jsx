import React, { useEffect, useState } from "react";
import "../styles.css"
import axios from 'axios';

import { useCookies } from 'react-cookie';
import HomePage from "./HomePage";
function Login_Sing() {
  const [pagePos, setPage] = useState("a")
  const [cookies, setCookie] = useCookies(['emailer']);
  
  useEffect(()=>{
console.log(cookies.email)

    axios({
      method: 'post',
      url: "https://noteitnotes.netlify.app/.netlify/functions/sing_in",
      headers: {},
      data: {
        email:cookies.email,password:cookies.pass
      }
    }).then(res=>{


      if (res.data === "Login successful"){
       
        setPage("c")
      }
    })
    
    .catch(err=>console.log(err))
  


  }, [cookies]);




  const funcChange = () => {
    setPage("b")
  }

  const funcChange2 = () => {
    setPage("a")


    
  }

  const singINN = (event) => {
    const email = document.getElementById("ipt1").value
    const pass = document.getElementById("ipt2").value
    event.preventDefault(); 
    axios({
      method: 'post',
      url: "https://noteitnotes.netlify.app/.netlify/functions/sing_in",
      headers: {},
      data: {
        email:email,password:pass
      }
    }).then(res=>{
      if (res.data === "Login successful"){
      
        setPage("c")
      }
      else{

        alert(res.data)
      }
    
    
    
    
        setCookie('email',email,{ path: '/' })
        setCookie('pass',pass,{ path: '/' })
    
    })
    
    .catch(err=>console.log(err));




  }

  const signupF=(event)=>{
 
    const email = document.getElementById("ipt1").value
    const pass = document.getElementById("ipt2").value
    const repass = document.getElementById("ipt3").value
    

    console.log(email,"aa",pass,"a",repass)
 

    console.log(email,"aa",pass,"a",repass)
  const bod = {"email":email,"password":pass}
   
      if(pass === repass && (email !=="" && pass !=="" && repass!== ""))
      {

axios({
          method: 'post',
          url: "https://noteitnotes.netlify.app/.netlify/functions/sign_up",
          headers: {},
          data: {
            email:email,password:pass
          }
        }).then(res=>alert(res.data))
        
        .catch(err=>console.log(err));

      
   event.preventDefault(); 

      }
      else{  

        alert("passsword donot match or some fields are empty")}
 
        event.preventDefault(); 
  }
   
    


  return (
    <div>

      {pagePos === "a" ? (
        <div id="body-login">
          <div id="card-login">
            <div id="card-hold">
              <h3 id="text-logo">Note It!</h3>
              <p id="text-log">Sign-Up</p>
              <br></br>
              <form id="form-login">
                <input id="ipt1" className="input-username" placeholder="Your Email..." type="email" required="true"></input>
                <br></br>
                <input id="ipt2" className="input-username" placeholder="Your Password..." type="password" required="true"></input>
                <br></br>
                <input id="ipt3" className="input-username" placeholder="Confirm  Password..." type="password" required="true"></input>
                <br></br>

                <input id="button-login" type="submit" value="Signup" onClick={signupF}></input>
                <br></br>
                <p id="text-navi-login" onClick={funcChange} >Already have an Account ?</p>


              </form>

            </div>
          </div>
        </div>

      ) : pagePos === "b" ? (

        <div id="body-login">
          <div id="card-login">
            <div id="card-hold">


              <p id="text-logo">Note It!</p>
              <p id="text-log">Sign-In</p>
              <br></br>
              <form id="form-login">
                <input id="ipt1" className="input-username" placeholder="Your Email..." type="email" required="true"></input>
                <br></br>
                <input id="ipt2" className="input-username" placeholder="Your Password..." type="password" required="true"></input>
                <br></br>

                <input id="button-login" type="submit" value="Signin" onClick={singINN} ></input>
                <br></br>
                <p id="text-navi-login" onClick={funcChange2} >Create an Account ?</p>

              </form>

            </div>
          </div>
        </div>
      ) : pagePos === "c" ?(

        <HomePage setPage={setPage}/>
      ): null

      }
    </div>
  );
}

export default Login_Sing;