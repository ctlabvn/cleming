import material from '~/theme/variables/material.js'
export default {
  container: {
    backgroundColor: '#007dad',
    flex: 1,
    alignItems: 'center',  
    justifyContent: 'center',   
    flexDirection: 'column',                   
  },  
  form:{
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: -20, 
    zIndex: 1, //above image
  },
  get formForgot(){
    // return {...this.form, marginBottom: 20}
    return {
          width: '96%',
          alignSelf: 'center',
          zIndex: 1, //above image
      }
    },
  logoIcon:{
    color: material.white500,
    fontSize: 60,
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 40,
  },
  logo: {
    width: 250, 
    height: 250,
    resizeMode: 'contain',       
    marginBottom: -70,
    alignSelf:'center',
  },
  logoText:{
    backgroundColor: 'transparent',
    color: material.white500,
    textAlign: 'center',
  },
  button: {
    marginTop: 15,    
    backgroundColor: material.blue600,
    justifyContent: 'center',
    width: '100%',   
    borderRadius: 3,
  },  
  margin: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: material.white500,
  },  
  label: {
    marginTop: 20,
    backgroundColor: 'transparent',
    width: '100%',
    color: material.white500,
    textAlign: 'center',
    fontWeight: '500',
  },
  get labelForgot(){
    return {...this.label, textAlign:'left',margin:10}
  },
  whiteColor: {
    color: material.white500,
    fontWeight: '500',
  },
  cancelButton: {
    // backgroundColor: '#33b5d7',
    backgroundColor: material.blue400,
  },
  submitButton: {
    
  }
}