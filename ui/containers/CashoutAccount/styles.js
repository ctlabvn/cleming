import material from '~/theme/variables/material.js'
export default {
	container: {
		backgroundColor: material.white500
	},
	moneyBlock: {
		padding: 10,
	},
	content: {
		backgroundColor: 'white'
	},
	mt20: {
		marginBottom: 20
	},
	pd10: {
		padding: 10
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
	rowRight: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center'
	},
	cashoutBtn: {
		backgroundColor: material.orange500,
		paddingLeft: 45,
		paddingRight: 45,
		paddingTop: 5,
		paddingBottom: 5,
		margin: 45,
		alignSelf: 'center'
	},
    payBtn: {
        backgroundColor: material.blue500,
        paddingLeft: 45,
        paddingRight: 45,
        paddingTop: 5,
        paddingBottom: 5,
        margin: 45,
        alignSelf: 'center'
    },
	cashoutIcon: {
		fontSize: 25,
		color: 'white'
	},
	moneyNumber: {
		fontSize: 24,
		color: material.red500
	},
	moneyNumber2: {
		fontSize: 20
	},
	forwardIcon: {
		fontSize: 20,
		color: material.successColor
	},
	bottomButton: {
		width: '100%',
		borderRadius: 0,
		height: 45,
		position: 'absolute',
		bottom: 0,
		backgroundColor: 'white'
	},
	textClear: {
		fontSize: 18
	}
}
