import React, { Component } from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView, TextInput, Alert, ActivityIndicator } from 'react-native'
import Button from '../components/Button'
import ServerData from '../helpers/ServerData'

const styles = StyleSheet.create({
	wrapper: { flex: 1 },
	header: { flex: 1, backgroundColor: 'red', alignItems: 'center', justifyContent: 'center' },
	headerText: { fontSize: 48, color: 'white', textAlign: 'center' },
	form: { flex: 1, padding: 10 },
	label: { fontSize: 24 },
	input: { color: 'red', borderBottomColor: '#cccccc', borderBottomWidth: 1, fontSize: 24, marginBottom: 20 },
})

class Form extends Component {
	static navigationOptions = {
		header: null,
	}

	constructor(props) {
		super(props)
		this.state = { username: '', password: '', loading: false }
		this.submitHandler = this.submitHandler.bind(this)
	}

	submitHandler() {
		if (!this.state.username && !this.state.password) {
			Alert.alert('Empty field', 'Please fill all inputs')
			return
		}

		let data = { username: this.state.username, password: this.state.password }
		this.setState({ loading: true }, () => {
			console.log('this state loading', this.state.loading)

			fetch(`${ServerData}/register`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			})
				.catch(error => Alert.alert('Error', error))
				.then(res => res.json())
				.then(response => {
					this.setState({ loading: false })
					switch (response.msg) {
						case 'ok':
							this.props.navigation.navigate('list')
							break
						case 'user_exists':
							Alert.alert('Username taken', `Username "${data.username}" is already taken.\n Please select different username.`)
							break
						case 'empty_data':
							Alert.alert('Empty field', 'Please fill all inputs')
							break
						default:
							Alert.alert('Error', response.msg)
					}
				})
		})
	}

	focusNext() {}

	render() {
		return (
			<KeyboardAvoidingView behavior="padding" style={styles.wrapper}>
				<View style={styles.header}>{this.state.loading ? <ActivityIndicator size="large" color="black" /> : <Text style={styles.headerText}>Register Node App</Text>}</View>
				<View style={styles.form}>
					<Text style={styles.label}>username</Text>
					<TextInput
						keyboardAppearance="dark"
						autoCapitalize="none"
						autoCorrect={false}
						style={styles.input}
						placeholder="username"
						onChangeText={username => this.setState({ username })}
						value={this.state.username}
						returnKeyType="next"
						onSubmitEditing={() => this.passwordInput.focus()}
						blurOnSubmit={false}
					/>
					<Text style={styles.label}>password</Text>
					<TextInput
						ref={input => {
							this.passwordInput = input
						}}
						keyboardAppearance="dark"
						autoCapitalize="none"
						autoCorrect={false}
						style={styles.input}
						placeholder="password"
						onChangeText={password => this.setState({ password })}
						value={this.state.password}
						returnKeyType="send"
						onSubmitEditing={this.submitHandler}
					/>
					<View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
						<Button style={{ fontSize: 20 }} onTouch={this.submitHandler} enabled={!this.state.loading}>
							REGISTER
						</Button>
					</View>
				</View>
			</KeyboardAvoidingView>
		)
	}
}

export default Form
