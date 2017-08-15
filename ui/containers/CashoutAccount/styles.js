import material from '~/theme/variables/material.js'
export default {
	container: {
		backgroundColor: material.gray200
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
	}
}