import material from '~/theme/variables/material.js'
export default {
	container: {
		backgroundColor: 'white'
	},

	row: {
		flexDirection: 'row',
	},
	detailContainer: {
		marginTop: 15,
		marginLeft: 15
	},
	rowDetail: {
		flexDirection: 'row',
		// borderTopWidth: 1,
		justifyContent: 'space-between',
		paddingVertical: 15,
	},
	rowSubDetail: {
		marginRight: 15
	},
	moneyWithDrawnContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		margin: 15
	},
	margin15: {
		margin: 15
	},
	moneyInfoLabelContainer: {
		backgroundColor: material.gray300
	},
	bankDetailContainer: {
		flexDirection: 'row',
		margin: 15,
		alignItems: 'center'
	},
	bankImageContainer: {
		borderRadius: 5,
		borderWidth: 0.5,
		borderColor: material.gray200
	},
	bankImage: {
		width: 100,
		height: 60,
		borderRadius: 5,
		borderWidth: 1
	},
	accountDetailContainer: {
		marginLeft: 15,
		flex: 1
	},
	marginTop5: {
		marginTop: 5
	},

}