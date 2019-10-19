import React, { Component } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import img from '../assets/images/user.png'
import Button from './Button'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
	wrapper: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
	container: { flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' },
	dataContainer: { width: '55%', justifyContent: 'flex-start', paddingLeft: 20, paddingRight: 5 },
	buttonContainer: { width: '40%', height: '100%' },
	img: { width: 40, height: 40, marginRight: 10 },
	textWrapper: { flex: 1 },
	text: { fontSize: 18 },
})

class UserListElement extends Component {
	static propTypes = {
		username: PropTypes.string.isRequired,
		password: PropTypes.string,
		deleteUser: PropTypes.func.isRequired,
		changeView: PropTypes.func.isRequired,
	}

	constructor(props) {
		super(props)
		this.state = {}

		this.deleteUser = this.deleteUser.bind(this)
		this.changeView = this.changeView.bind(this)
	}

	deleteUser() {
		this.props.deleteUser(this.props.username)
	}

	changeView() {
		this.props.changeView({ username: this.props.username, password: this.props.password })
	}

	render() {
		return (
			<View style={styles.wrapper}>
				<View style={[styles.container, styles.dataContainer]}>
					<Image style={styles.img} resizeMode="contain" source={img} />
					<View style={styles.textWrapper}>
						<Text style={styles.text}>{this.props.username}</Text>
					</View>
				</View>
				<View style={[styles.container, styles.buttonContainer]}>
					<Button onTouch={this.changeView}>Edit</Button>
					<Button username={this.props.username} onTouch={this.deleteUser}>
						Delete
					</Button>
				</View>
			</View>
		)
	}
}

export default UserListElement
