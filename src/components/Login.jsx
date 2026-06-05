import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailID,setEmailID] = useState("");
  const [password,setPassword] = useState("");
  const [firstName ,setFirstName] = useState("");
  const [lastName , setLastName] =useState("");
  const [isLoginForm , setIsLoginForm] = useState(true);
  const [error,setError] = useState("");
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
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err){
      setError(err?.response?.data || "Something Went Wrong");
    }
  }

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signUp" ,
        {firstName,lastName,emailID,password},
        { withCredentials : true, }
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch(err) {
      setError(err?.response?.data || "Something Went Wrong");
    }
  }
  return (
    <div className ="flex justify-center my-20">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoginForm ? "Login" : "SignUp"}</h2>
          {!isLoginForm && 
          <>
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name</legend>
                  <input type="text" value ={firstName} className="input" placeholder="Type here" 
                    onChange={(e) => setFirstName(e.target.value)} />
              </fieldset>
            </div>
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name</legend>
                  <input type="text" value ={lastName} className="input" placeholder="Type here" 
                    onChange={(e) => setLastName(e.target.value)} />
              </fieldset>
            </div>
          </>}
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email ID</legend>
                <input type="text" value ={emailID} className="input" placeholder="Type here" 
                  onChange={(e) => setEmailID(e.target.value)} />
            </fieldset>
          </div>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
                <input type="password" value={password} className="input" placeholder="Type here"
                  onChange={(e) => setPassword(e.target.value)} />
            </fieldset>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center m-2">
          <button className="btn btn-primary" onClick={isLoginForm ? handleLogin : handleSignUp }>
            {isLoginForm ? "Login" : "SignUp"}</button>
          </div>
          <p className="m-auto cursor-pointer" onClick={() => setIsLoginForm((value) => !value)}>
            {isLoginForm 
              ? "New User ? SignUp Here" 
              : "Existing User ? Login Here"}
          </p>
        </div>
      </div>
    </div>  
  );
};

export default Login;