export default {
  container: {
    backgroundColor: '#00b5f1', 
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
    return {...this.form, marginBottom: 20}
  },
  logoIcon:{
    color: '#fff',
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
    color: '#fff',
    textAlign: 'center',
  },
  button: {
    marginTop: 15,    
    backgroundColor: '#0086ac',        
    justifyContent: 'center',
    width: '100%',   
    borderRadius: 3,
  },  
  margin: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#FFF',
  },  
  label: {
    marginTop: 20,
    backgroundColor: 'transparent',
    width: '100%',
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '500',
  },
  get labelForgot(){
    return {...this.label, textAlign:'left',margin:10}
  },
  whiteColor: {
    color: '#FFF',
    fontWeight: '500',
  },
  cancelButton: {
    backgroundColor: '#33b5d7',
  },
  submitButton: {
    
  }
}