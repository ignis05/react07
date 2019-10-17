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

	submitHandler() {
		console.log(this.state.username, this.state.password)
		if (!this.state.username && !this.state.password) {
			window.alert('Please fill all inputs')
			return
		}
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
