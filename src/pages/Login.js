import { useState } from "react";
import loginFields from "../utils/loginFields";
import { backendEnv } from "../utils/backend";
import { Link, useNavigate } from "react-router-dom";

function Login() {
const navigator = useNavigate();

  const [login, setLogin] = useState({
    uniqueID: "",
    password: "",
  });

  const handleChange = async (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setLogin((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const handleLogin = (e)=>{
     e.preventDefault();
     fetch(`${backendEnv.backendURL}/login`, {
        method: "POST",
        body: JSON.stringify(login),
        headers: {
          'Content-Type': 'application/json'
        }
     }).then((response)=>response.json())
     .then(data=>{
       if(data.success){
        navigator("/userdata", {state: {userid: login.uniqueID}})
       }
     })
  }

  return (
    <div
      id="login"
      className="m-5 container p-0 verflow-hidden mx-auto shadow-lg p-0 bg-body-tertiary rounded"
    >
      <div>
        <h4 className="py-2 text-center formhead text-white rounded">
          Employee Login
        </h4>
        <form className="p-4" onSubmit={handleLogin}>
          {loginFields.map((formfield, index) => {
            return (
              <div key={index} className="d-flex flex-column">
                <div className="d-flex justify-content-evenly m-2">
                  <label className=" my-2" style={{ width: "150px" }}>
                    {formfield.field}:
                  </label>
                  <input
                    type={formfield.type}
                    className={`form-control`}
                    placeholder={formfield.placeholder}
                    name={formfield.name}
                    value={login[formfield.name]}
                    onChange={handleChange}
                    required={true}
                    autoComplete="false"
                  ></input>
                </div>
              </div>
            );
          })}
          <div className="d-flex flex-column text-center justify-content-evenly m-4">
            <button className="m-3 btn btn-primary">Login</button>
            <p>
              Don't have an account: 
              <Link to="/register">
              Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
