import React, { useEffect, useState } from "react";
import "../styles.css"
function Login_Sing() {
  const [pagePos, setPage] = useState("a")

  const funcChange = () => {
    setPage("b")
  }

  const funcChange2 = () => {
    setPage("a")
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

                <input id="button-login" type="submit" value="Signup" ></input>
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

                <input id="button-login" type="submit" value="Signin" ></input>
                <br></br>
                <p id="text-navi-login" onClick={funcChange2} >Create an Account ?</p>

              </form>

            </div>
          </div>
        </div>
      ) : null

      }
    </div>
  );
}

export default Login_Sing;