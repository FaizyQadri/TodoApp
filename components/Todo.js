import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  FlatList
} from 'react-native';
import { logout } from '../reducers/authReducer';
import { createTodo, deleteTodo, fetchTodo } from '../reducers/todoReducer'
import { useDispatch, useSelector } from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';

const { width } = Dimensions.get('window')

const Todo = () => {
  const [mytodo, setTodo] = useState('');

  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos)
  useEffect(() => {
    dispatch(fetchTodo())
  }, [])

  const ItemList = ({ title, id }) => {
    return (
      <View
        style={{
          width: width - 20,
          padding: 15,
          borderBottomColor: 'grey',
          borderBottomWidth: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={{ fontSize: 18, textAlignVertical: 'center', fontWeight: 'bold' }}>{title}</Text>
        <Feather
          name="delete"
          size={30}
          color="#ff4081"
          onPress={() => dispath(deleteTodo(id))}
        />
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TextInput
        value={mytodo}
        style={styles.txtInput}
        placeholder="write todo"
        placeholderTextColor="grey"
        onChangeText={text => setTodo(text)}
      />
      <TouchableOpacity
        onPress={async () => {
          const response = await dispatch(createTodo({ todo: mytodo }))
          if (response.payload.statusCode == 200) {
            alert("Todo Created Successfully")
          } else {
            alert("Something went wrong")
          }
        }}
        style={styles.btn}>
        <Text>Add Todo</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => dispatch(logout())} style={styles.btn}>
        <Text>Logout</Text>
      </TouchableOpacity>

      <FlatList
        data={todos}
        pagingEnabled
        contentContainerStyle={{ width: width - 20, }}
        renderItem={({ item }) => {
          console.log(item, " flat list")
          return (
            <ItemList title={item.todo} id={item._id} />
          )
        }

        }
        keyExtractor={item => item._id}
      />
    </View>
  );
}
export default Todo;
const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#6cbab8',
    height: 40,
    paddingHorizontal: 50,
    marginVertical: 10,
    marginHorizontal: 20,
    justifyContent: 'center',
  },
  txtInput: {
    width: width - 20,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
    borderBottomColor: '#6cbab8',
    borderBottomWidth: 2,
    color: 'black',
  },
});
