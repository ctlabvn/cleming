const defaultEmployeeValues = {
  // console.log('@connect employeeDetail.fromTime : toTime ' + employeeDetail.fromTimeWork + ' : ' + employeeDetail.toTimeWork);
  name: '',
  email: '',
  phone: '',
  phoneSms: '',
  // titleType: 1,   
}


export const getProfile = state => 
  state.account.profile

export const getListEmployee = state =>
  state.account.listEmployee

export const getCurrentEmployee = state =>
  state.account.currentEmployee

export const getCurrentEmployeeValues = state =>{
  const employeeDetail = state.account.currentEmployee
  if(!employeeDetail)
    return defaultEmployeeValues
  return {    
    name: employeeDetail.userName,
    email: employeeDetail.email,
    phone: employeeDetail.phoneNumber ? employeeDetail.phoneNumber : '',
      phoneSms: employeeDetail.phoneSms ? employeeDetail.phoneSms : '',
  }
}

export const getGeneratedPassword = state =>
  state.account.generatedPassword
  
