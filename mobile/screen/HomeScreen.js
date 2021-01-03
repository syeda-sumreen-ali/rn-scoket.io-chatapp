import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import io from "socket.io-client"
const HomeScreen = () => {

	useEffect(function () {
		io("http://192.168.0.104:3001"),
			console.log("i'm a client")
	}, [])

	return (
		<View>
			<Text>hello world</Text>
		</View>
	)
}

export default HomeScreen

const styles = StyleSheet.create({})
