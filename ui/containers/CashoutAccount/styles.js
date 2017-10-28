import material from '~/theme/variables/material.js'
export default {
	container: {
		backgroundColor: material.white500
	},
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    rowNormal: {
        flexDirection: 'row',
    },
    image: {
		width: 65,
		height: 65,
		margin: 30,
		borderRadius: 65
	},
    cashoutBtn: {
        backgroundColor: material.orange500,
        paddingLeft: 45,
        paddingRight: 45,
        paddingTop: 5,
        paddingBottom: 5,
        marginTop: 45,
        alignSelf: 'center'
    },
    payBtn: {
        backgroundColor: material.blue500,
        paddingLeft: 45,
        paddingRight: 45,
        paddingTop: 5,
        paddingBottom: 5,
        marginTop: 45,
        alignSelf: 'center'
    },
	iconAccount: {
		fontSize: 65,
		margin: 30,
		color: material.gray400
	},
	balanceMoneyContainer: {
		justifyContent: 'center',
		flex: 1
	},
	balanceMoneyLabel: {
		marginBottom: 10
	},
	detailContainer: {
		margin: 15
	},
	detailLabel: {
		marginBottom: 10
	},
	detailContentContainer: {
        marginBottom: 10, marginLeft: 5
	},
	paddingView: {
		flex: 1
	},
	transactionHistoryBtn: {
		backgroundColor: material.gray200,
		padding: 13,
		margin: 7,
		marginBottom: 50,
		borderRadius: 5
	},
	iconFoward: {
		fontSize: 24,
		color: material.gray600
	},

	/* old UI */
	// moneyBlock: {
	// 	padding: 10,
	// },
	// content: {
	// 	backgroundColor: 'white'
	// },
	// mt20: {
	// 	marginBottom: 20
	// },
	// pd10: {
	// 	padding: 10
	// },
	// rowRight: {
	// 	flexDirection: 'row',
	// 	justifyContent: 'flex-end',
	// 	alignItems: 'center'
	// },
	// cashoutIcon: {
	// 	fontSize: 25,
	// 	color: 'white'
	// },
	// moneyNumber: {
	// 	fontSize: 24,
	// 	color: material.red500
	// },
	// moneyNumber2: {
	// 	fontSize: 20
	// },
	// forwardIcon: {
	// 	fontSize: 20,
	// 	color: material.successColor
	// },
	// bottomButton: {
	// 	width: '100%',
	// 	borderRadius: 0,
	// 	height: 45,
	// 	position: 'absolute',
	// 	bottom: 0,
	// 	backgroundColor: 'white'
	// },
	// textClear: {
	// 	fontSize: 18
	// }
}
