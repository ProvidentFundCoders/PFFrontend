const validations = {
 password:  (value)=>{
   if(value.length < 8){
    return "The length of password must be minimum 8 charcaters."
   }return false
 },
 phone:  (value)=>{
    if(value.length !== 10){
        return "Invalid Phone Number"
    }
    return false
 },
cpassword: (value, password)=>{
    if(value !== password){
      return "Confirm Password Does not match"
    }
    return false
}
}

export const validateFields = async (fieldname, value, password="")=>{
  let message;
  if(fieldname === "cpassword"){
    message = await validations[fieldname](value, password);
  }else{
    message = await validations[fieldname](value);
  }
    return message
}
