import { useState } from "react";
import registerFields from "../utils/registerationFields";
import { validateFields } from "../common/validation";
import { backendURL } from "../utils/backend";
import { useNavigate } from "react-router";

function Register() {
  const navigator = useNavigate();
  const [register, setRegister] = useState({
    name: "",
    uniqueID: "",
    dob: "",
    treasury: "",
    email: "",
    phone: "",
    institution: "",
    password: "",
    cpassword: "",
  });

  const [error, setError] = useState({
    password: null,
    phone: null,
    cpassword: null,
  });


  const handleChange = async (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setRegister((prev) => {
      return { ...prev, [key]: value };
    });
    let err;
    if (e.target.name === "cpassword") {
      err = await validateFields(key, value, register.password);
      setError((prev) => {
        return { ...prev, [key]: err };
      });
    } 

    if(e.target.name === "password" || e.target.name === "phone") {
      err = await validateFields(key, value);
      setError((prev) => {
        return { ...prev, [key]: err };
      });
    }
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let submit = true;
    for(let key in error) {
      if(error[key]){
        submit = false;
        break;
      }
    }
    if(submit){
     const data = register;
     delete data.cpassword;
      fetch(`${backendURL}/register`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response)=>response.json())
      .then(data=>{
        if(data.success){
           navigator("/")
        }
      })
    }
  };

  return (
    <div
      id="register"
      className="m-5 container p-0 verflow-hidden mx-auto shadow-lg p-0 bg-body-tertiary rounded"
    >
      <div>
        <h4 className="py-2 text-center formhead text-white rounded">
          Employee Registeration
        </h4>
        <form className="p-4" onSubmit={handleSubmit}>
          {registerFields.map((formfield, index) => {
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
                    value={register[formfield.name]}
                    onChange={handleChange}
                    required={true}
                    autoComplete="false"
                  ></input>
                </div>
                {error[formfield.name] ? (
                    <p className="text-danger align-self-center">{error[formfield.name]}</p>
                  ) : null}
              </div>
            );
          })}
          <div className="d-flex flex-column text-center justify-content-evenly m-4">
            <button className="m-3 btn btn-primary">Register</button>
            <p>
              Alredy have an account: <a href="/">Login</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
