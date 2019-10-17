import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

class Button extends Component {
	constructor(props) {
		super(props)

		this.style = this.props.style || { color: 'black', fontSize: 24 }
		this.pressHandler = this.pressHandler.bind(this)
	}

	pressHandler() {
		if (this.props.onTouch) this.props.onTouch(this)
	}

	render() {
		return (
			<TouchableOpacity style={this.style} onPress={this.pressHandler}>
				<Text style={{ fontSize: this.style.fontSize, color: this.style.color }}>{this.props.children}</Text>
			</TouchableOpacity>
		)
	}
}

Button.propTypes = {
	onTouch: PropTypes.func,
	children: PropTypes.string.isRequired,
}

export default Button
