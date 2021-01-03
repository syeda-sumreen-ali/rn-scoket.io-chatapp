import React, { useEffect, useState, useRef } from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import io from "socket.io-client"
const HomeScreen = () => {

	const [messageToSend, setMessageToSend] = useState("");
	const [recvMessages, setRecvMessages] = useState([]);
	const socket = useRef(null)

	useEffect(() => {
		socket.current = io("http://192.168.0.104:3001")
		socket.current.on("message", message => {
			setRecvMessages(prevState => [...prevState, message]);
		})
	}, []);

	const sendMessage = () => {
		socket.current.emit("message", messageToSend);
		setMessageToSend("");
	}

	const textOfRecvMessages = recvMessages.map(msg => (<Text key={msg}>{msg}</Text>));

	return (
		<View>
			{textOfRecvMessages}
			<TextInput
				placeholder="Enter chat message..."
				value={messageToSend}
				onChangeText={(val) => setMessageToSend(val)}
				onSubmitEditing={sendMessage}
			/>
		</View>
	)
}

export default HomeScreen

const styles = StyleSheet.create({})
