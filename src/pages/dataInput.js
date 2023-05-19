import { useState } from "react";
import { backendEnv } from "../utils/backend.js";
import dataFieldUtils from "../utils/dataInputFields.js";

function DataInput() {

  const [userdata, setUserData] = useState({
    instituteName: "",
    password: "",
    userID: "",
    year: "",
    month: "",
    contribution: 0,
    other: 0,
    type_of_other: "",
    withdrawal: 0,
    previous_contribution: 0,
    remark: "",
  });

  const [showPrevBalance, setShowPrevBalance] = useState(false);

  const handleChange = async (e) => {
    if (userdata.month === "March" && userdata.year === backendEnv.startYear) {
      setShowPrevBalance(true);
    } else {
      setShowPrevBalance(false);
    }
    const key = e.target.name;
    const value = e.target.value;
    setUserData((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = userdata;
    console.log(data)
    fetch(`${backendEnv.backendURL}/funddata`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("data Inserted succesfully");
          setUserData({
            instituteName: "",
            password: "",
            userID: "",
            year: userdata.year,
            month: userdata.month,
            contribution: "",
            other: "",
            type_of_other: "",
            withdrawal: "",
            previous_contribution: "",
            remark: "",
          });
        }else{
          alert(data.error)
        }
      });
  };

  return (
    <div
      id="userdata"
      className="m-5 container p-0 verflow-hidden mx-auto shadow-lg p-0 bg-body-tertiary rounded"
    >
      <div>
        <h4 className="py-2 text-center formhead text-white rounded">
          Employee Data Input
        </h4>
        <form className="p-4" onSubmit={handleSubmit}>
          {dataFieldUtils.dataInputFields.map((formfield, index) => {
            return (
              <div key={index} className="d-flex flex-column">
                <div className="d-flex justify-content-evenly m-2">
                  <label className=" my-2" style={{ width: "150px" }}>
                    {formfield.field}:
                  </label>

                  {formfield.name === "year" ? (
                    <>
                      <select
                        name="year"
                        id="year"
                        className={`form-select`}
                        onChange={handleChange}
                      >
                        <option defaultValue="Year">
                          Year(click for options)
                        </option>
                        {dataFieldUtils.years.map((year, index) => (
                          <option key={index} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </>
                  ) : formfield.name === "month" ? (
                    <>
                      <select
                        name="month"
                        id="month"
                        className="form-select"
                        onChange={handleChange}
                      >
                        <option defaultValue="Month" >
                          Month
                        </option>
                        {dataFieldUtils.months.map((month, index) => (
                          <option key={index} value={month}>
                            {month}
                          </option>
                        ))}
                      </select>
                    </>
                  ) : (
                    <>
                      <input
                        type={formfield.type}
                        className={`form-control`}
                        placeholder={formfield.placeholder}
                        name={formfield.name}
                        value={userdata[formfield.name]}
                        onChange={handleChange}
                        required={formfield.required}
                        autoComplete="false"
                      ></input>
                    </>
                  )}
                </div>
              </div>
            );
          })}
          {showPrevBalance && (
            <div className="d-flex flex-column">
              <div className="d-flex justify-content-evenly m-2">
                <label className=" my-2" style={{ width: "150px" }}>
                  Previous Balance:
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Previous Balance"
                  name="previous_contribution"
                  value={userdata.previous_contribution}
                  onChange={handleChange}
                  required={true}
                />
              </div>
            </div>
          )}

          <div className="d-flex flex-column text-center justify-content-evenly m-4">
            <button className="m-3 btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DataInput;
