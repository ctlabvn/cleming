export const validate = (values) => {
  const errors = {}
  // first time it is empty
  if(!values) return errors
  if (!values.email) {
    errors.email = 'Email is empty'
  } 

  return errors
}