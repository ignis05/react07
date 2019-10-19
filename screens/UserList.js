import React, { Component } from 'react'
import { View, FlatList, Text, StyleSheet, Alert } from 'react-native'
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
		this.state = { users: [], refreshing: false }
		this.deleteUser = this.deleteUser.bind(this)
		this.changeView = this.changeView.bind(this)
		this.refresh = this.refresh.bind(this)
	}

	async refresh() {
		this.setState({ refreshing: true }, async () => {
			var response = await fetch(`${ServerData}/get`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			})
				.then(res => res.json())
				.catch(error => Alert.alert('Error', error))

			if (response.msg == 'ok') {
				this.setState({ users: response.users })
			}
			this.setState({ refreshing: false })
		})
	}

	async componentDidMount() {
		this.refresh()
	}

	async deleteUser(username) {
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
			.catch(error => Alert.alert('Error', error))

		switch (response.msg) {
			case 'ok':
				this.setState({ users: response.users })
				break
			case 'user does not exist':
				Alert.alert(`Error - user doesn't exist`, 'Please refresh user list')
				break
			default:
				Alert.alert('Error', response.msg)
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
					BACK TO LOGIN PAGE
				</Button>
				{this.state.users.length > 0 ? (
					<FlatList
						soc
						style={styles.list}
						data={this.state.users}
						keyExtractor={item => item.username}
						renderItem={({ item }) => <UserListElement username={item.username} password={item.password} changeView={this.changeView} deleteUser={this.deleteUser} />}
						onRefresh={this.refresh}
						refreshing={this.state.refreshing}
					/>
				) : (
					<Text>Loading data</Text>
				)}
			</View>
		)
	}
}

export default UserList
