import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {getUser} from '../../utils/indexedDB';
import './Login.css';

const Login = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [check, setCheck] = useState(null);
  const [signup,setSignup]=useState(false); 
  const navigate = useNavigate();

  const Checking = async () => {
    const storedUser = await getUser(user);
    if (storedUser && password === storedUser.password) {
      setCheck(true);
    } else {
      setCheck(false);
    }
  };

  useEffect(() => {
    if (check) {
      navigate('/home');
    }
  }, [check, navigate]);

  useEffect(()=>{
    if(signup){
      navigate('/signup');
    }
  },[signup,navigate])

  return (
    <div className="logcont">
      <div className="logincontainer">
        <h1>Login</h1>

        <label>
          <h3>Enter Username</h3>
          <input
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </label>

        <label>
          <h3>Enter Password</h3>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button className="btn" onClick={Checking}>
          Login
        </button> 

        <p className='sig'>Don't have a Account ? Click Signup</p>
        <button className='signupbtn' onClick={()=>{setSignup(true)}}>
          Signup
        </button>
        
        
        {check === false && <p>Invalid User</p>}
      </div>
    </div>
  );
};

export default Login;
