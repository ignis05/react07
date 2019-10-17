import React, { Component } from 'react'
import { View, Text } from 'react-native'

class UserList extends Component {
	constructor(props) {
		super(props)
		this.state = { users: [] }
	}

	async componentDidMount() {
		var response = await fetch('http://ignis-react07.ct8.pl/get', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		})
			.then(res => res.json())
			.catch(error => window.alert(error))

		console.log(response)
		if (response.msg == 'ok') {
			this.setState({ users: response.users })
		}
	}

	render() {
		return (
			<View>
				<Text>{JSON.stringify(this.state.users)}</Text>
			</View>
		)
	}
}

export default UserList
