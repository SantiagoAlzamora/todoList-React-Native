import { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Task from './components/Task';

export default function App() {

  const [task, setTask] = useState()
  const [taskItems, setTaskItems] = useState([])

  function handleAddTask() {
    Keyboard.dismiss()
    setTaskItems([...taskItems, task])
    setTask(null)
  }

  function completeTask(index) {
    const itemsCopy = [...taskItems]
    itemsCopy.splice(index, 1)
    setTaskItems(itemsCopy)
  }

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectioTitle}>Today's tasks</Text>
        <View style={styles.items}>
          {
            taskItems.map((e, i) => {
              return (
                <TouchableOpacity key={i} onPress={() => completeTask(i)}>
                  <Task text={e} />
                </TouchableOpacity>
              )
            })
          }
        </View>
      </View>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.writeTaskWrapper}>
        <TextInput style={styles.input} placeholder={"Write a task..."} value={task} onChangeText={text => setTask(text)} />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    padding: 80,
    paddingHorizontal: 20
  },
  sectioTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  items: {
    marginTop: 30
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    backgroundColor: "#FFF",
    borderColor: "#C0C0C0",
    borderWidth: 1,
    padding: 15,
    width: 250,
    borderRadius: 60
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addText: {
    fontSize: 40,
    color: "#C0C0C0"
  },
});
