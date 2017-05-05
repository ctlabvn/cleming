import React, { Component, PropTypes } from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
} from 'react-native'
import styles from './styles'
import InteractiveChart from './InteractiveChart'
import DealDes from '~/ui/components/DealDes'
import Icon from '~/ui/elements/Icon'

// let navigation to new screen
import { connect } from 'react-redux'
import * as commonActions from '~/store/actions/common'

@connect(null, {...commonActions})
export default class extends Component {

    render() {
        var dealData =
            {
                dealImage: 'http://osl.ugr.es/wp-content/uploads/2017/02/react-native.png',
                dealTitle: 'Tặng 25% ABCDE tặng tặng',
                placeName: 'DUNKIN\'DONUST',
                spendingLevel: 3,
                salePercen: '-25%'
            }
        var placeInfo =
            {
                placeImage: '~/assets/avatar.jpg',
                placeName: 'Tặng 25% Nét Huế',
                placeAddress: '27/03/2017',
                rate: 5,
                phoneNumber: '100000'
            }
            
            var transactionSele =
                {
                    id: 1,
                    time: '7/3/2017 - 14/3/2017',
                    numberTransaction: 30,
                    revenue: 10560000,
                    totalMoneyCasback: 1210500,
                    commision: 395221
                }

            var lstDealTitle = [
                {
                    dealTitle: 'Tặng 25% tặng Tặng 25% tặng'
                },
                {
                    dealTitle: 'Tặng 25% tặng Tặng 25% tặng'
                },
            ]

            var approach = [
                {
                    title: 'Tiếp cận',
                    currentNumber: 3213,
                    pastNumber: 3093,
                },
                {
                    title: 'Xem',
                    currentNumber: 1230,
                    pastNumber: 1150,
                },
                {
                    title: 'Đánh dấu',
                    currentNumber: 600,
                    pastNumber: 610,
                },
                {
                    title: 'Chia sẻ',
                    currentNumber: 18,
                    pastNumber: 12,
                },
                {
                    title: 'Mua',
                    currentNumber: 318,
                    pastNumber: 18,
                },
                {
                    title: 'Quan Tâm',
                    currentNumber: 600,
                    pastNumber: 610,
                }
            ]
            const { forwardTo } = this.props
        return (
            <View style={styles.container}>
                <ScrollView style={styles.mainContainer}>
                    <TouchableOpacity onPress={e => forwardTo('dealDetail')}>
                        <DealDes deal={dealData} />
                    </TouchableOpacity>

                    <View style={styles.numberContainer}>
                        <View style={styles.numberAbove}>
                            <View style={styles.transaction}>
                                <Text style={styles.numberTransaction}>{transactionSele.numberTransaction}</Text>
                                <Text style={styles.transactionTitle}>Giao dịch</Text>
                            </View>
                            <View style={styles.revenue}>
                                <Text style={styles.numberRevenue}>{transactionSele.revenue}đ</Text>
                                <Text style={styles.revenueTitle}>Doanh thu</Text>
                            </View>
                        </View>
                        <View style={styles.numberUnder}>
                            <View style={styles.cashback}>
                                <Text style={styles.numberCashback}>{transactionSele.totalMoneyCasback}</Text>
                                <Text>Tổng tiền Cashback</Text>
                            </View>
                            <View style={styles.commision}>
                                <Text style={styles.numberCommision}>{transactionSele.commision}</Text>
                                <Text>Phí Clingme</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{width: '100%', marginTop: 5, height: 100, flexDirection: 'column'}}>
                        <View style={{width: '100%', height: 1, backgroundColor: '#b3b3b3', marginLeft: 10}}></View>
                        <TouchableOpacity onPress={()=>this.onPress()}>
                            <View style={styles.touchBtn}>
                                <View style={styles.iconParent}>
                                    <Icon name='cash' style={styles.iconCash} />
                                </View>
                                <Text style={styles.textDirection}>Thanh toán trực tiếp</Text>
                                <Text style={styles.number}>23</Text>
                                <View style={styles.iconParent}>
                                    <Icon name='foward' style={styles.iconFoward} />
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={{width: '100%', height: 1, backgroundColor: '#b3b3b3', marginLeft: 10}}></View>
                        <TouchableOpacity onPress={()=>this.onPress()}>
                            <View style={styles.touchBtn}>
                                <View style={styles.iconParent}>
                                    <Icon name='clingme-wallet' style={styles.iconWallet}/>
                                </View>
                                <Text style={styles.textClingme}>Thanh toán qua Clingme</Text>
                                <Text style={styles.number}>7</Text>
                                <View style={styles.iconParent}>
                                    <Icon name='foward' style={styles.iconFoward} />
                                </View>
                            </View>
                        </TouchableOpacity>
                        
                        <View style={{width: '100%', height: 1, backgroundColor: '#b3b3b3'}}></View>
                    </View>
                    
                    <View style={styles.interactive}>
                        <View style={styles.interactiveTitleParent}>
                            <Text style={styles.interactiveTitle}>Tương tác</Text>
                        </View>
                        <InteractiveChart
                            chartData = {approach}
                        />
                    </View>
                </ScrollView>
                
                <View style={{width: '100%', height: '10%', flexDirection: 'row'}}>
                    <TouchableOpacity onPress={()=>this.onPress()} style={styles.btnDealSame}>
                        <Text style={styles.btnText}>Tạo KM tương tự</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.onPress()} style={styles.btnDealNew}>
                        <Text style={styles.btnText}>Tạo KM mới</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    onPress() {
        alert('Thành Công');
    }
}