import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

export default function App() {

	const [tasks, setTasks] = useState([]);
	const [task, setTask] = useState(null);

	const getDate = () => {
		return new Date();
	}

	const castMonthTostring = (month) => {
		var months = ['jan', 'fev', 'mar', 'avr', 'mai', 'juin'];
		return months[month];
	}

	const castDayOfTheWeekTostring = (day) => {
		var days = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
		return days[day];
	}

	const getLastId = () => {
		if (tasks.length) {
			return tasks.length + 1;
		}
		else {
			return 1;
		}
	}

	const handleSubmit = () => {

		var newTask = [{
			id: getLastId(),
			title: task,
			checked: false
		}]

		setTasks((oldTask) => [...oldTask, ...newTask]);
	}

	const handleFinishTask = (id) => {
		console.log(id);
		// rechercher la task dans la liste des taches selon id
		// update cette element
		// mettre a jour la liste entiere
	}

	const Item = ({ item }) => {

		return (
			<View style={styles.itemContainer}>
				<Text style={styles.itemContainerTitle}>{item.title}</Text>
				<TouchableOpacity
					onPress={() => handleFinishTask(item.id)}
				>
					{
						(item.checked) ?
							<AntDesign name="checkcircle" size={40} color="black" /> :
							<MaterialIcons name="radio-button-unchecked" size={40} color="black" />
					}
				</TouchableOpacity>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<StatusBar style="auto" />
			<View style={styles.topSection}>
				<View style={styles.topSectionFullDate}>
					<Text style={styles.topSectionDay}>
						{
							getDate().getDate()
						}
					</Text>
					<View>
						<Text style={styles.topSectionMonth}>
							{
								castMonthTostring(getDate().getMonth())
							}
						</Text>
						<Text style={styles.topSectionYear}>
							{
								getDate().getFullYear()
							}
						</Text>
					</View>
				</View>
				<View style={styles.topSectionDayString}>
					<Text style={styles.topSectionDayStringText}>
						{
							castDayOfTheWeekTostring(getDate().getDay())
						}
					</Text>
				</View>
			</View>
			<View style={styles.taskSection}>
				<FlatList
					data={tasks}
					renderItem={({ item }) => <Item item={item} />}
					keyExtractor={item => item.id}
				/>
			</View>
			<View style={styles.actionSection}>
				<TextInput
					style={styles.actionInput}
					placeholder={'Saisir une tache a faire'}
					value={task}
					onChangeText={(text) => {
						setTask(text);
					}}
					onEndEditing={() => handleSubmit()}
				/>
				<TouchableOpacity
					onPress={() => handleSubmit()}
				>
					<AntDesign name="pluscircleo" size={30} color="black" />
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 40,
		backgroundColor: '#fff',
		marginHorizontal: 40
	},
	topSection: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingBottom: 30,
		borderBottomWidth: 0.5,
	},
	topSectionFullDate: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	topSectionDay: {
		fontSize: 40,
		fontWeight: 'bold',
		marginEnd: 5
	},
	topSectionMonth: {
		textTransform: 'uppercase',
		fontWeight: '700'
	},
	topSectionYear: {
		color: 'gray'
	},
	topSectionDayString: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	topSectionDayStringText: {
		textTransform: 'uppercase',
		fontSize: 18,
		color: 'gray',
		fontWeight: '700'
	},
	taskSection: {
		flex: 10,
		paddingVertical: 10,

	},
	actionSection: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 5
	},
	actionInput: {
		borderWidth: 1,
		height: 50,
		width: '75%',
		borderRadius: 15,
		paddingHorizontal: 10
	},
	itemContainer: {
		height: 50,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	itemContainerTitle: {
		fontSize: 20,
		fontWeight: '600',
		textTransform: 'capitalize'
	}
});
