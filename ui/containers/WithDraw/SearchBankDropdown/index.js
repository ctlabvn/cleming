import React, {PureComponent, Component} from 'react'
import {connect} from 'react-redux'
import {List, ListItem, Text, Thumbnail, Button} from 'native-base'
import {View, TouchableWithoutFeedback, TextInput, Dimensions, Modal, ScrollView, TouchableOpacity} from 'react-native'
import {chainParse} from "~/ui/shared/utils"
import styles from './styles'
import Icon from '~/ui/elements/Icon'
import material from '~/theme/variables/material'
import {ViewPager} from "rn-viewpager";

const {height, width} = Dimensions.get('window')

export default class SearchableDropdown extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showing: false,
            selectedOption: props.selectedOption || props.dropdownValues[0],
            dropdownValues: props.dropdownValues,
            provinceValues: [],
            branchValues: [],
        }
        this.currentPosition = 0;
    }

    _handlePress = () => {
        console.log('Pressing')
        this.setState({
            showing: true,
            selectedProvince: null,
            selectedBranch: null,
            provinceValues: [],
            branchValues: [],})
    }

    getValue = () => {
        return this.state.selectedOption
    }

    getBranch() {
        return this.state.selectedBranch
    }

    componentWillReceiveProps = (nextProps) => {
        if (!this.state.dropdownValues || this.state.dropdownValues.length == 0) {
            this.setState({
                selectedOption: nextProps.selectedOption || nextProps.dropdownValues[0],
                dropdownValues: nextProps.dropdownValues
            })
        }
    }

    _handleTextChange = (text) => {
        if (!this.currentPosition) this.currentPosition = 0;
        if (!text || text.trim() == '') {
            switch (this.currentPosition) {
                case 0:
                    this.setState({dropdownValues: this.props.dropdownValues})
                    break;
                case 1:
                    this.setState({provinceValues: this.defaultProvinceValues})
                    break;
                case 2:
                    this.setState({branchValues: this.defaultBranchValues})
                    break;
            }

        }

        let searchResult;

        switch (this.currentPosition) {
            case 0:
                let dropdownValues = this.props.dropdownValues.slice()
                searchResult = dropdownValues.filter(item => item.name.toLowerCase().indexOf(text.toLowerCase().trim()) != -1)
                this.setState({dropdownValues: searchResult})
                return;
            case 1:
                let provinceValues = this.defaultProvinceValues.slice();
                searchResult = provinceValues.filter(item => item.provinceName.toLowerCase().indexOf(text.toLowerCase().trim()) != -1)
                this.setState({provinceValues: searchResult})
                return;
            case 2:
                let branchValues = this.defaultBranchValues.slice();
                searchResult = branchValues.filter(item => item.branchName.toLowerCase().indexOf(text.toLowerCase().trim()) != -1)
                this.setState({branchValues: searchResult})
                return;
        }

    }

    _onSelectBank = (item) => {
        // this.setState({selectedOption: item, showing: false, dropdownValues: this.props.dropdownValues})
        if (!item.provinces || item.provinces.length <= 0) this._close();
        this.defaultProvinceValues = item.provinces;
        this.setState({selectedOption: item, provinceValues: item.provinces || [], branchValues: []})
        this.refs.viewPager.setPage(1)
    }

    _onSelectedProvince(item) {
        if (!item.branchs || item.branchs.length <= 0) this._close();
        this.defaultBranchValues = item.branchs;
        this.setState({selectedProvince: item, branchValues: item.branchs || []})
        this.refs.viewPager.setPage(2)
    }

    _onSelectedBranch(item) {
        this.setState({selectedBranch: item, showing: false})
    }

    _close = () => {
        this.setState({showing: false, dropdownValues: this.props.dropdownValues})
    }

    _onSwipeViewPager(event) {
        // console.warn(JSON.stringify(event));
        this.currentPosition = event.position;
    }

    _getSelectedOptionName() {
        const {selectedOption, selectedBranch} = this.state;

        const { bankName } = selectedOption
        let provinceName = this.state.selectedProvince && this.state.selectedProvince.provinceName || '';
        let branchName = this.state.selectedBranch && this.state.selectedBranch.branchName || '';

        return bankName + (provinceName && ', ') + provinceName + (branchName && ', ') + branchName;
    }

    render() {
        if (!this.props.dropdownValues || this.props.dropdownValues.length == 0) {
            return <View />
        }
        return (
            <View style={{...styles.container, ...this.props.style}}>
                <View>
                    <TouchableOpacity onPress={() => this._handlePress()} transparent style={styles.selectContainer}>
                        <Text black medium numberOfLines={2} style={{marginRight: 5}}>{this._getSelectedOptionName()}</Text>
                        <Icon name="foward" style={styles.icon}/>
                    </TouchableOpacity>
                    <Modal
                        animationType={"none"}
                        transparent={true}
                        visible={this.state.showing}
                        keyboardShouldPersistTaps='always'
                        onRequestClose={() => {
                            this.setState({showing: false})
                        }}
                    >
                        <View style={styles.modalOverlay} onPress={() => {
                            console.log('Pressing modal overlay')
                            this.setState({showing: false})
                        }}>
                            <View style={styles.modalContainer}>
                                <View style={styles.rowPadding}>
                                    <Icon name='places' style={styles.icon}/>
                                    <TextInput placeholder='Nhập từ khoá ...'
                                               style={styles.input}
                                               underlineColorAndroid={'transparent'}
                                               onChangeText={(text) => this._handleTextChange(text)}
                                               ref='searchInput'
                                    />
                                </View>

                                <ViewPager style={{height: 250, width: '100%'}}
                                           keyboardShouldPersistTaps='always'
                                           onPageSelected={(event) => this._onSwipeViewPager(event)}
                                           ref='viewPager'
                                           initialPage={0}>
                                    <View>
                                        <View style={{alignItems: 'center', width: '100%', borderBottomWidth: 0.5, borderBottomColor: material.gray200}}>
                                            <Text small bold gray style={{paddingBottom: 5}}>Ngân hàng</Text>
                                        </View>
                                        <ScrollView style={{maxHeight: 400, width: '100%'}}
                                                    keyboardShouldPersistTaps='always'>
                                            <List
                                                dataArray={this.state.dropdownValues}
                                                renderRow={(item) => {
                                                    return (
                                                        <ListItem style={styles.listItem}
                                                                  onPress={() => this._onSelectBank(item)}
                                                        >
                                                            <Text numberOfLines={1}>{item.name}</Text>
                                                        </ListItem>
                                                    )
                                                }}

                                            />
                                        </ScrollView>
                                    </View>

                                    <View>
                                        <View style={{alignItems: 'center', width: '100%'}}>
                                            <Text small bold gray>Tỉnh</Text>
                                        </View>
                                        <ScrollView style={{maxHeight: 400, width: '100%'}}
                                                    keyboardShouldPersistTaps='always'>
                                            <List
                                                dataArray={this.state.provinceValues}
                                                renderRow={(item) => {
                                                    return (
                                                        <ListItem style={styles.listItem}
                                                                  onPress={() => this._onSelectedProvince(item)}
                                                        >
                                                            <Text numberOfLines={1}>{item.provinceName}</Text>
                                                        </ListItem>
                                                    )
                                                }}
                                            />
                                        </ScrollView>
                                    </View>

                                    <View>
                                        <View style={{alignItems: 'center', width: '100%'}}>
                                        <Text small bold gray>Chi nhánh</Text>
                                        </View>
                                        <ScrollView style={{maxHeight: 400, width: '100%'}}
                                                    keyboardShouldPersistTaps='always'>
                                            <List
                                                dataArray={this.state.branchValues}
                                                renderRow={(item) => {
                                                    return (
                                                        <ListItem style={styles.listItem}
                                                                  onPress={() => this._onSelectedBranch(item)}
                                                        >
                                                            <Text numberOfLines={1}>{item.branchName}</Text>
                                                        </ListItem>
                                                    )
                                                }}

                                            />
                                        </ScrollView>
                                    </View>
                                </ViewPager>
                                {/*<ScrollView style={{ maxHeight: 300, width: '100%' }}*/}
                                {/*keyboardShouldPersistTaps='always'>*/}
                                {/*<List*/}
                                {/*dataArray={this.state.dropdownValues}*/}
                                {/*renderRow={(item) => {*/}
                                {/*return (*/}
                                {/*<ListItem style={styles.listItem}*/}
                                {/*onPress={()=>this._onSelect(item)}*/}
                                {/*>*/}
                                {/*<Text  numberOfLines={1}>{item.name}</Text>*/}
                                {/*</ListItem>*/}
                                {/*)*/}
                                {/*}}*/}

                                {/*/>*/}
                                {/*</ScrollView>*/}

                                <Button transparent onPress={() => this._close()} style={styles.closeBtn}>
                                    <Text medium primary>Đóng</Text>
                                </Button>
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>
        )
    }
}