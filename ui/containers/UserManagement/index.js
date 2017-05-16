/**
 * Created by vjtc0n on 5/4/17.
 */
import React, { Component } from 'react'
import {
    Button, List, ListItem, Switch, Spinner, CheckBox,
    Container, Item, Input, Left, Body, Right, View, Content, Grid, Col, Row
} from 'native-base'
import { Text } from 'react-native'
import { connect } from 'react-redux'

import Modal from '~/ui/components/Modal'
import styles from './styles'
import UserCard from './components/UserCard'
import OwnerCard from './components/OwnerCard'

import * as commonActions from '~/store/actions/common'
import * as accountActions from '~/store/actions/account'
import * as authSelectors from '~/store/selectors/auth'
import * as accountSelectors from '~/store/selectors/account'

const img = 'https://facebook.github.io/react/img/logo_og.png'

@connect(state=>({
  session: authSelectors.getSession(state),
  listEmployee: accountSelectors.getListEmployee(state),
  user: authSelectors.getUser(state)
}), {...commonActions, ...accountActions})

class UserManagement extends Component {
    constructor(props) {
        super(props)
        this.state = {
          modalOpen: false,
          updateInfoChecked: false,
          deleteAccountChecked: false,
          isFetchingData: false,
          data: [],
          rowIDOfEmployee: 0
        }
    }
    
    componentDidMount() {
      this.setState({
          isFetchingData: true
      })
      let { getListEmployee, session, user } = this.props
      getListEmployee(session, () => {
        let data = []
        for (let i = 0; i < 1; i++) {
          data.push({
            owner: user,
            employeeList: this.props.listEmployee
          })
        }
        this.setState({
            data: data
        }, () => {
            this.setState({
                isFetchingData: false
            })
          })
      })
    }
    
    onAccountPress(data, rowID) {
        this.setState({
            employeeData: data,
            rowIDOfEmployee: rowID
        }, () => {
            this.setState({
                modalOpen: true
            })
        })
    }
    
    renderEmployeeRow(data, sectionID, rowID, highlightRow) {
        let lastLeftVerticalBlueLineLength = null
        let lastRightVerticalBlueLineLength = null
        if (rowID == (this.props.listEmployee.length - 1)) {
          lastLeftVerticalBlueLineLength = 1
          lastRightVerticalBlueLineLength = 0
        } else {
          lastLeftVerticalBlueLineLength = '100%'
          lastRightVerticalBlueLineLength = '100%'
        }
        return (
            <ListItem style={styles.listEmployeeItem}>
                <Grid>
                    <Col style={{width: '20%', flexDirection: 'row'}}>
                        <Col>
                          <Row style={styles.topLeftGrid}/>
                          <Row style={{...styles.bottomLeftGridContainer}}>
                            <View style={{...styles.bottomLeftGrid, height: lastLeftVerticalBlueLineLength}}/>
                          </Row>
                        </Col>
                        <Col>
                          <Row style={{...styles.topRightGrid, borderBottomWidth: 1}}/>
                          <Row style={styles.bottomRightGridContainer}>
                            <View style={{height: lastRightVerticalBlueLineLength, ...styles.bottomRightGrid}}/>
                          </Row>
                        </Col>
                    </Col>
                    <Col style={{width: '80%', justifyContent: 'center'}}>
                        <Button
                            onPress={this.onAccountPress.bind(this, data, rowID)}
                            style={styles.accountButton}>
                            <UserCard data={data}/>
                        </Button>
                    </Col>
                </Grid>
            </ListItem>
        )
    }
    
    renderBlueLineBelowOwner() {
        return (
            <View style={{height: 20}}>
                <Grid>
                    <Col style={{width: '20%', flexDirection: 'row'}}>
                        <Col>
                            <Row style={styles.topLeftGrid}/>
                            <Row style={styles.bottomLeftGrid}/>
                        </Col>
                        <Col>
                            <Row style={styles.topRightGrid}/>
                            <Row style={styles.bottomRightGrid}/>
                        </Col>
                    </Col>
                    <Col style={{width: '80%'}}/>
                </Grid>
            </View>
        )
    }
    
    onUpdateUserPress() {
        const { forwardTo } = this.props
        forwardTo('userManagement/action/updateUser')
    }
    
    renderRow(data) {
        blueLineBelowOwner = null
        console.log()
        if (this.props.listEmployee.length != 0) {
            blueLineBelowOwner = this.renderBlueLineBelowOwner()
        }
        return (
            <ListItem style={styles.listItem}>
                <Grid>
                    <Col>
                        <Button
                            onPress={this.onUpdateUserPress.bind(this)}
                            style={styles.ownerButton}>
                            <OwnerCard data={data.owner}/>
                        </Button>
                        {blueLineBelowOwner}
                        <List
                            dataArray={data.employeeList}
                            renderRow={this.renderEmployeeRow.bind(this)}/>
                    </Col>
                </Grid>
            </ListItem>
        )
    }
    
    onUpdateInfoPress() {
        this.setState({
            updateInfoChecked: !this.state.updateInfoChecked,
            deleteAccountChecked: false
        })
    }
    
    onDeleteAccountPress() {
        this.setState({
            deleteAccountChecked: !this.state.deleteAccountChecked,
            updateInfoChecked: false
        })
    }
    
    onCancelModal() {
      this.setState({
        modalOpen: false
      })
    }
    
    onSubmitModal() {
      const {forwardTo} = this.props
      if (this.state.updateInfoChecked) {
        this.setState({
          updateInfoChecked: !this.state.updateInfoChecked
        })
        forwardTo(`userManagement/action/updateEmployeeInfo/${this.state.rowIDOfEmployee}`)
      } else if (this.state.deleteAccountChecked) {
        this.setState({
          isFetchingData: true
        })
        this.props.deleteEmployeeInfo(this.props.session, this.props.listEmployee[this.state.rowIDOfEmployee].bizAccountId, () => {
          this.props.getListEmployee(this.props.session, () => {
            let data = []
            for (let i = 0; i < 1; i++) {
              data.push({
                owner: this.props.user,
                employeeList: this.props.listEmployee
              })
            }
            this.setState({
              data: data
            }, () => {
              this.setState({
                isFetchingData: false
              })
            })
          })
        })
        this.setState({
          deleteAccountChecked: !this.state.deleteAccountChecked
        })
      }
      this.setState({
        modalOpen: false
      })
    }
    
    renderModal() {
        return(
            <View style={styles.modalContainer}>
                <Grid>
                    <Col>
                        <Row style={{height: '30%', width: '90%', alignSelf: 'center'}}>
                            <UserCard data={this.state.employeeData}/>
                        </Row>
                        <Row style={{height: '50%'}}>
                            <Col style={{width: '70%'}}>
                                <Row style={{alignItems: 'center'}}>
                                    <Text style={styles.rowText}>Thay đổi thông tin</Text>
                                </Row>
                                <Row style={{alignItems: 'center'}}>
                                    <Text style={styles.rowText}>Xoá tài khoản khỏi danh sách</Text>
                                </Row>
                            </Col>
                            <Col style={{width: '30%'}}>
                                <Row style={styles.rowCheckBox}>
                                    <CheckBox
                                        style={{borderWidth: 2}}
                                        onPress={this.onUpdateInfoPress.bind(this)}
                                        checked={this.state.updateInfoChecked}/>
                                </Row>
                                <Row style={styles.rowCheckBox}>
                                    <CheckBox
                                        style={{borderWidth: 2}}
                                        onPress={this.onDeleteAccountPress.bind(this)}
                                        checked={this.state.deleteAccountChecked}/>
                                </Row>
                            </Col>
                        </Row>
                        <Row style={{height: '20%'}}>
                            <Col style={{width: '50%'}}/>
                            <Col style={{width: '25%'}}>
                                <Button
                                  onPress={this.onCancelModal.bind(this)}
                                  style={styles.modalButton}>
                                    <Text style={styles.modalCancelButtonText}>Cancel</Text>
                                </Button>
                            </Col>
                            <Col style={{width: '25%'}}>
                                <Button
                                  onPress={this.onSubmitModal.bind(this)}
                                  style={styles.modalButton}>
                                    <Text style={styles.modalOkButtonText}>OK</Text>
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Grid>
            </View>
        )
    }
    
    onCreateUserPress() {
        const { forwardTo } = this.props
        forwardTo('userManagement/action/createUser')
    }
    
    render() {
        if (this.state.isFetchingData) {
            return <Spinner/>
        }
        return (
            <Container>
                <Content style={{backgroundColor: 'white'}}>
                    <List
                        style={{marginBottom: 50, marginTop: 20}}
                        dataArray={this.state.data}
                        renderRow={this.renderRow.bind(this)}/>
                </Content>
                <Modal onCloseClick={e=>this.setState({modalOpen:false})} open={this.state.modalOpen}>
                    {this.renderModal()}
                </Modal>
                <Button
                    onPress={this.onCreateUserPress.bind(this)}
                    style={styles.addUserButton}>
                    <Text style={styles.addUserText}>Add User</Text>
                </Button>
            </Container>
        )
    }
}

export default UserManagement