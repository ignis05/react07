import React, { Component } from 'react'
import { View, Text } from 'react-native'

class EditUser extends Component {
	static navigationOptions = {
		title: 'edit page',
		headerStyle: {
			backgroundColor: '#ff0000',
		},
		headerTitleStyle: {
			color: '#ffffff',
		},
	}

	constructor(props) {
		super(props)
		this.state = {}
		this.data = this.props.navigation.state.params
	}

	render() {
		return (
			<View>
				<Text>{this.data.username}</Text>
				<Text>{this.data.password}</Text>
			</View>
		)
	}
}

export default EditUser
