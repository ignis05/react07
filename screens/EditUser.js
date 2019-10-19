import React, { Component } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import img from '../assets/images/user.png'

const styles = StyleSheet.create({
	wrapper: { flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1 },
	img: { width: '40%', height: '40%', aspectRatio: 1, resizeMode: 'contain', marginBottom: 10 },
	text: { fontSize: 24, textAlign: 'center' },
})

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
			<View style={styles.wrapper}>
				<Image style={styles.img} source={img} />
				<View>
					<Text style={styles.text}>{this.data ? this.data.username : 'undefined'}</Text>
				</View>
				<View>
					<Text style={[styles.text, { color: '#666666', fontSize: 22 }]}>{this.data ? this.data.password : 'undefined'}</Text>
				</View>
			</View>
		)
	}
}

export default EditUser
