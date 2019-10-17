import React, { Component } from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView, TextInput } from 'react-native'
import Button from '../components/Button'

const styles = StyleSheet.create({
	wrapper: { flex: 1 },
	header: { flex: 1, backgroundColor: 'lime', alignItems: 'center', justifyContent: 'center' },
	headerText: { fontSize: 48, color: 'white' },
	form: { flex: 1, padding: 10 },
	label: { fontSize: 24 },
	input: { color: 'lime', borderBottomColor: '#cccccc', borderBottomWidth: 1, fontSize: 24, marginBottom: 20 },
})

class Form extends Component {
	static navigationOptions = {
		header: null,
		/* title: 'any title',
		headerStyle: {
			backgroundColor: '#ff0000',
		},
		headerTitleStyle: {
			color: '#ffffff',
		}, */
	}

	constructor(props) {
		super(props)
		this.state = { username: '', password: '' }
		this.submitHandler = this.submitHandler.bind(this)
	}

	async submitHandler() {
		console.log('form:')
		console.log(this.state.username, this.state.password)
		if (!this.state.username && !this.state.password) {
			window.alert('Please fill all inputs')
			return
		}

		let data = { username: this.state.username, password: this.state.password }

		const response = await fetch('192.168.1.12:3000', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
		console.log('res:')
		console.log(response)
	}

	render() {
		return (
			<View style={styles.wrapper}>
				<View style={styles.header}>
					<Text style={styles.headerText}>Register Node App</Text>
				</View>
				<KeyboardAvoidingView style={styles.form}>
					<Text style={styles.label}>username</Text>
					<TextInput
						keyboardAppearance="dark"
						autoCapitalize="none"
						autoCorrect={false}
						style={styles.input}
						placeholder="username"
						onChangeText={username => this.setState({ username })}
						value={this.state.username}
					/>
					<Text style={styles.label}>password</Text>
					<TextInput
						keyboardAppearance="dark"
						autoCapitalize="none"
						autoCorrect={false}
						style={styles.input}
						placeholder="password"
						onChangeText={password => this.setState({ password })}
						value={this.state.password}
					/>
					<View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
						<Button onTouch={this.submitHandler}>Register</Button>
					</View>
				</KeyboardAvoidingView>
			</View>
		)
	}
}

export default Form
