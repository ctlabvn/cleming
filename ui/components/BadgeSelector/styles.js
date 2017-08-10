import material from '~/theme/variables/material'
export default {
	row: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	item: {
		padding: 5,
		paddingLeft: 10,
		paddingRight: 10,
		marginRight: 10,
		borderWidth: 1,
		borderColor: material.primaryColor,
		borderRadius: 40,
		backgroundColor: 'white',
		color: material.primaryColor
	},
	selectItem: {
		padding: 5,
		paddingLeft: 10,
		paddingRight: 10,
		marginRight: 10,
		borderWidth: 1,
		borderColor: 'transparent',
		borderRadius: 40,
		backgroundColor: material.primaryColor,
		color: 'white'
	}
}