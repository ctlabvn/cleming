import material from '~/theme/variables/material.js'
export default {
	container: {
		backgroundColor: 'white'
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	rowPadding: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 10
	},
	rowPaddingLarge: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingTop: 20,
		paddingBottom: 20,
		paddingLeft: 10,
		paddingRight: 10
	},
	listItem: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 10,
		marginLeft: 25,
		borderBottomWidth: 1,
		borderColor: material.gray300
	},
	rowCenter: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10
	},
	borderTop: {
		borderTopWidth: 1,
		borderColor: material.gray300
	},
	borderBottom: {
		borderBottomWidth: 1,
		borderColor: material.gray300
	},
	rowLeft: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		padding: 10
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