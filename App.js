import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import { useStore } from './store';

const App = () => {
  const [text, setText] = useState('');
  const [editText, setEditText] = useState('');
  const [editingId, setEditingId] = useState(null);

  const tasks = useStore(state => state.tasks);
  const addTask = useStore(state => state.addTask);
  const deleteTask = useStore(state => state.deleteTask);
  const editTask = useStore(state => state.editTask);

  const handleAddTask = () => {
    if (text.trim()) {
      addTask(text);
      setText('');
    }
  };

  const handleDeleteTask = (id) => {
    deleteTask(id);
  };

  const handleEditTask = (id, currentText) => {
    setEditingId(id);
    setEditText(currentText);
  };

  const handleSaveEdit = (id) => {
    if (editText.trim()) {
      editTask(id, editText);
      setEditingId(null);
      setEditText('');
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#f37327' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: 'black' }}>ToDo List</Text>
      <View style={{ marginBottom: 20 }}>
        <TextInput
          placeholder="Enter task"
          value={text}
          onChangeText={setText}
          style={{ backgroundColor: 'white', padding: 10 }}
        />
        <View style={{ marginTop: 10 }}>
          <Button title="Add" onPress={handleAddTask} color="black" />
        </View>
      </View>
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10 }}>
            {editingId === item.id ? (
              <>
                <TextInput
                  style={{ flex: 1, backgroundColor: 'white', padding: 10 }}
                  value={editText}
                  onChangeText={setEditText}
                />
                <Button title="Save" onPress={() => handleSaveEdit(item.id)} color="black" />
              </>
            ) : (
              <>
                <Text style={{ flex: 1, color: 'black' }}>{item.text}</Text>
                <View style={{ marginLeft: 10 }}>
                  <Button title="Edit" onPress={() => handleEditTask(item.id, item.text)} color="black" />
                </View>
                <View style={{ marginLeft: 10 }}>
                  <Button title="Delete" onPress={() => handleDeleteTask(item.id)} color="black" />
                </View>
              </>
            )}
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default App;
