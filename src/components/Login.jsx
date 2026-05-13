import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailID,setEmailID] = useState("");
  const [password,setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try{
      const res = await axios.post( BASE_URL + "/login" ,{
        emailID,
        password,
      },{ 
        withCredentials: true
      });
      //console.log(res.data);
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err){
      console.error(err);
    }
  }
  return (
    <div className ="flex justify-center my-20">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div>
            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend">Email ID</legend>
                <input type="text" value ={emailID} className="input" placeholder="Type here" 
                  onChange={(e) => setEmailID(e.target.value)} />
            </fieldset>
          </div>
          <div>
            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend">Password</legend>
                <input type="text" value={password} className="input" placeholder="Type here"
                  onChange={(e) => setPassword(e.target.value)} />
            </fieldset>
          </div>
          <div className="card-actions justify-center m-2">
          <button className="btn btn-primary" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>  
  );
};

export default Login;