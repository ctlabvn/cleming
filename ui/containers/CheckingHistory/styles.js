import material from '~/theme/variables/material.js'
export default {
	container: {
		backgroundColor: 'white',
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
	rowPadding: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: 'white',
		padding: 10
	},
	rowPaddingLarge: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: 'white',
		paddingTop: 25,
		paddingBottom: 25,
		paddingLeft: 10,
		paddingRight: 10
	},
	rowRight: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center'
	},
	cashoutBtn: {
		backgroundColor: material.primaryColor,
		paddingLeft: 5,
		paddingRight: 5,
		paddingTop: 5,
		paddingBottom: 5
	},
	cashoutIcon: {
		fontSize: 25,
		color: 'white'
	},
	moneyNumber: {
		fontSize: 24,
		color: material.red500
	},
	forwardIcon: {
		fontSize: 20,
		color: material.successColor
	},
	bottomButton: {
		width: '100%',
		borderRadius: 0,
		height: 40,
		position: 'absolute',
		bottom: 0,
		backgroundColor: 'white'
	},
	borderTop: {
		borderTopWidth: 1,
		borderColor: material.gray300
	},
	borderBottom: {
		borderBottomWidth: 1,
		borderColor: material.gray300
	},
	ml20: {
		marginLeft: 20
	},
	bankLogo: {
        width: 70,
        height: 30,
        resizeMode: 'cover',
    },
    forwardIconWarning: {
		fontSize: 20,
		color: material.warningColor
	},
	forwardIconSuccess: {
		fontSize: 20,
		color: material.successColor
	}

}