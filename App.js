import React,{useEffect} from 'react';
import {Provider, useSelector, useDispatch} from 'react-redux';
import AuthScreen from './components/Auth';
import TodoScreen from './components/Todo';
import {configureStore,getDefaultMiddleware} from '@reduxjs/toolkit';
import authReducer, {addToken} from './reducers/authReducer';
import todoReducer from './reducers/todoReducer';

export const store =  configureStore({
  reducer: {
    user: authReducer,
    todos: todoReducer,
  },
  middleware:[...getDefaultMiddleware({immutableCheck:false,serializableCheck:false})]
});

function App() {

  const token =  useSelector(state => state.user.token);
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(addToken());
  }, []);
  return <>{token ? <TodoScreen /> : <AuthScreen />}</>;
}

export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
