import React, { useEffect, useState, useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import io from "socket.io-client"
const HomeScreen = () => {

	const [messageToSend, setMessageToSend] = useState("");
	const [recvMessages, setRecvMessages] = useState([]);
	const socket = useRef(null);

	useEffect(() => {
		//connect react native with socket.io
		socket.current = io("http://192.168.7.146:4000")
		setRecvMessages([
			//dummy data of messages for testing ui
			{
				_id: 1,
				text: 'Hello developer',
				createdAt: new Date(),
				user: {
					_id: 2,
					name: 'React Native',
					avatar: 'https://placeimg.com/140/140/any',
				},
			},
			{
				_id: 2,
				text: 'Hello from myself!',
				createdAt: new Date(),
				user: {
					_id: 1,
					name: 'React Native 2',
					avatar: 'https://placeimg.com/140/140/any',
				},
			},
		])

		//receiving messages from socket.io  and appending it in an array
		socket.current.on("message", message => {
			// adding dummy data to fulfil the object requirements of gifted ui message
			const testMessage = {
				_id: 3,
				text: 'Hello developer',
				createdAt: new Date(),
				user: {
					_id: 2,
					name: 'React Native',
					avatar: 'https://placeimg.com/140/140/any',
				},
			};

			testMessage.text = message

			// setRecvMessages(prevState => [...prevState, testMessage]);
			setRecvMessages(prevState => GiftedChat.append(prevState, testMessage))
		});


	}, []);

	// sending message to socket.io 
	const sendMessage = messages => {

		console.log(messages[0].text)
		socket.current.emit("message", messages[0].text);
		// setRecvMessages(prevState => GiftedChat.append(prevState, testMessage))
		// setMessageToSend("");
	}


	// const textOfRecvMessages = recvMessages.map(msg => (<Text key={msg}>{msg}</Text>));

	return (
		<View style={{ flex: 1 }}>
			<GiftedChat
				messages={recvMessages}
				onSend={messages => sendMessage(messages)}
				user={{
					_id: 1,   // user own id
				}}
			/>
		</View>
	)
}

export default HomeScreen

const styles = StyleSheet.create({})
