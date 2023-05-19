import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { backendEnv } from "../utils/backend";
import dataFieldUtils from "../utils/dataInputFields";

function Userdata({id}) {
    const location = useLocation();
    const userid = location.state.userid || id;
    const lastYear = new Date().getFullYear()-1;
    const lastToLastYear = new Date().getFullYear()-2;
    const [year, setYear] = useState(`${lastToLastYear}-${lastYear}`)
    const [data, setUserdata] = useState({userData: "", allMonths: [], yearData: false});
    useEffect(()=>{
        const data = {userid, year}
        fetch(`${backendEnv.backendURL}/userdata`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then((response)=>response.json())
          .then(data=>{
            console.log(data.yearData)
           setUserdata({
            userData: data.userData,
            allMonths: data.allMonths,
            yearData: data.yearData
           });
          })
    }, [userid, year])
  return (
    <div className="container shadow-lg py-3 my-3">
    <div id="displayContainer">
      <div>
        <table className="table table-bordered" id="usertable">
          <tbody>
            <tr>
            <td><strong className="mx-3">Name of Contributor:</strong> {data.userData.name}</td> 
              <td><strong className="mx-3">Account Number:</strong> {data.userData.uniqueID}</td>
            </tr>
            <tr>
              <td><strong className="mx-3">Date Of Birth:</strong> {data.userData.dob}</td>
              <td><strong className="mx-3">Treasury:</strong>{data.userData.treasury}</td>
              <td><strong className="mx-3">Interest Rate:</strong> {backendEnv.interestRate}</td>
            </tr>
            <tr>
              <td><strong className="mx-3">Institute:</strong>{data.userData.institution}</td>
            </tr>
          </tbody>
        </table>

        <div id="monthTable">
        <div className="dropdown m-3 float-end" id="dropdown">
          <button
            className="btn btn-primary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
           Choose Year: {year}
          </button>
          <ul className="dropdown-menu">
            {
                dataFieldUtils.years.map((yearval, index)=>{
                    return <li className="years" key={index} onClick={()=>setYear(yearval)} id="index">{yearval}</li>
                })
            }
          </ul>
        </div>
        <table className="table table-bordered my-2" >
          <thead>
            <tr>
              <th scope="col">Month</th>
              <th scope="col">Contribution</th>
              <th scope="col">Withdrawal</th>
              <th scope="col">Other</th>
              <th scope="col">Types</th>
              <th scope="col">Remark</th>
            </tr>
          </thead>
          <tbody>
           {
            data.allMonths.map((month, index)=>{
                return <tr key={index}>
                    <td>{month.month}</td>
                    <td>{month.contribution}</td>
                    <td>{month.withdrawal}</td>
                    <td>{month.other}</td>
                    <td>{month.type_of_other}</td>
                    <td>{month.remark}</td>
                </tr>
            })
           }
          </tbody>
        </table>
        </div>
        
        <table id="yearTable" className="table table-bordered">
          <thead>
            <tr>
              <th>Summary</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Previous Balance:</th>
              <td>{Math.round(data.yearData.previous_balance)}</td>
            </tr>
            <tr>
              <th>Total Contribution:</th>
              <td>{Math.round(data.yearData.total_contribution)}</td>
            </tr>
            <tr>
              <th>Total Withdrawal:</th>
              <td>{Math.round(data.yearData.total_withdrawal)}</td>
            </tr>
            <tr>
              <th>Interest:</th>
              <td>{Math.round(data.yearData.interest)}</td>
            </tr>
            <tr>
              <th>Current Balance:</th>
              <td>{Math.round(data.yearData.current_balance)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}

export default Userdata;
