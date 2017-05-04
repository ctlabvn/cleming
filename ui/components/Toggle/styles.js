export default {
  container: {
    flex: 1, 
    flexDirection: 'row',
    justifyContent:'space-between',    
    marginTop: 10,
    marginBottom:-10,
  },
  button: {
    paddingRight:5,
    paddingBottom:10,
    paddingTop:0,    
  },
  icon: {
    marginLeft:10,
    fontSize:30,    
    marginBottom:-5,
  },
  get trueIcon() {
    return {...this.icon, color:'#898989'}
  },
  get falseIcon() {
    return {...this.icon, color:'#9e0b0f'}
  },
}