import React, { Component } from 'react'
import { View, FlatList, Text, StyleSheet } from 'react-native'
import UserListElement from '../components/UserListElement'
import Button from '../components/Button'
import ServerData from '../helpers/ServerData'

const styles = StyleSheet.create({
	wrapper: { flex: 1, alignItems: 'center' },
	returnButton: { marginTop: 10, marginBottom: 20, fontSize: 24, fontWeight: 'bold' },
	list: { width: '100%' },
})

class UserList extends Component {
	static navigationOptions = {
		title: 'admin page',
		headerStyle: {
			backgroundColor: '#ff0000',
		},
		headerTitleStyle: {
			color: '#ffffff',
		},
	}

	constructor(props) {
		super(props)
		this.state = { users: [] }
		this.deleteItem = this.deleteItem.bind(this)
		this.changeView = this.changeView.bind(this)
	}

	async componentDidMount() {
		var response = await fetch(`${ServerData}/get`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		})
			.then(res => res.json())
			.catch(error => window.alert(error))

		if (response.msg == 'ok') {
			this.setState({ users: response.users })
		}
	}

	async deleteItem(username) {
		console.log(username)

		var response = await fetch(`${ServerData}/delete`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username: username }),
		})
			.then(res => res.json())
			.catch(error => window.alert(error))

		if (response.msg == 'ok') {
			this.setState({ users: response.users })
		} else {
			window.alert(response.msg)
		}
	}

	changeView(data) {
		console.log(data)
		this.props.navigation.navigate('edit', data)
	}

	render() {
		return (
			<View style={styles.wrapper}>
				<Button onTouch={() => this.props.navigation.navigate('form')} style={styles.returnButton}>
					Back to login page
				</Button>
				{this.state.users.length > 0 ? (
					<FlatList
						style={styles.list}
						data={this.state.users}
						keyExtractor={item => item.username}
						renderItem={({ item }) => <UserListElement callback={this.deleteItem} username={item.username} password={item.password} changeView={this.changeView} />}
					/>
				) : (
					<Text>Loading data</Text>
				)}
			</View>
		)
	}
}

export default UserList
