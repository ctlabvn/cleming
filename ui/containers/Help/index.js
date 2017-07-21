import React, {Component} from 'react'
import {
    Button,
    Icon,
    Container,
    Text,
    Item,
    View,
    Input,
} from 'native-base'

import Content from '~/ui/components/Content'

import styles from './styles'


export default class extends Component {


    render() {
        const {activeCampaign} = this.props
        // 10 items
        return (

            <Container>

                <Content>
                    <Text medium style={styles.textContent}>
                        Hướng dẫn quản lý tài khoản và phân quyền Bảo mật tài khoản Tạo tài khoản cho nhân viên quản lý
                        cửa hàng
                    </Text>
                    <Text medium style={styles.textContent}>
                        Bán hàng và đối soát Cách duyệt đơn cash-back Cách duyệt đơn dùng Clingme Pay Cách đối soát
                    </Text>
                    <Text medium style={styles.textContent}>
                        Xử lý đơn hàng đặt giao Thực hiện đơn hàng Hủy đơn hàng Đối soát doanh thu
                    </Text>
                    <Text medium style={styles.textContent}>
                        Thanh toán với Clingme
                    </Text>
                    <Text medium style={styles.textContent}>
                        Quản lý chương trình khuyến mại.
                    </Text>
                    <Text medium style={styles.textContent}>
                        Liên hệ
                    </Text>
                </Content>

            </Container>

        )
    }
}