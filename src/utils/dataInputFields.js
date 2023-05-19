const dataInputFields = [
    {
        field:"Institution Name",
        type: "text",
        name: "instituteName",
        placeholder: "Institute Name",
        required: true,
    }, 
    {
        field: "Institution Password",
        type: "text",
        name: "password",
        placeholder: "Institution Password",
        required: true,
    },
    {
        field: "Employee ID",
        type: "text",
        name: "userID",
        placeholder: "Employee ID",
        required: true,
    },
    {
        field: "Year",
        type: "text",
        name: "year",
        placeholder: "year",
        required: true,
    },
    {
        field: "Month",
        type: "text",
        name: "month",
        placeholder: "Month",
        required: true,
    },
    {
        field: "Contribution",
        type: "number",
        name: "contribution",
        placeholder: "₹ Contribution",
        required: true,
    },
    {
        field: "Withdrawal",
        type: "number",
        name: "withdrawal",
        placeholder: "₹ Withdrawal",
        required: true,
    },
    {
        field: "Other",
        type: "number",
        name: "other",
        placeholder: "₹ Other",
        required: true,
    },
    {
        field: "Type of Other",
        type: "text",
        name: "type_of_other",
        placeholder: "If no other data inserted put -",
        required: true,
    },
    {
        field: "Remark",
        type: "text",
        name: "remark",
        placeholder: "Remark",
        required: false,
    }
]

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const years= ["2020-2021", "2021-2022", "2022-2023"]

 const dataFieldUtils = {
   dataInputFields: dataInputFields,
    months:   months,
     years:  years
};

export default dataFieldUtils;
