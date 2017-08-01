import * as actions from '~/store/actions/account'


describe('Account actions', () => {
  it('should create an action to add a todo', () => {
    const username = 'tupt'
    const expectedAction = {
      type: 'app/createEmployeeInfo',
      args: [username],
    }
    expect(actions.createEmployeeInfo(username)).toEqual(expectedAction)
  })
})