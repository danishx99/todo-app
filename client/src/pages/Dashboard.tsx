import React, {useEffect, useState} from 'react'
import Navbar from "../components/Navbar"
import axios from 'axios'
import TodoForm from '../components/todo/TodoForm'
import TodoList, {Todo} from '../components/todo/TodoList'

const Dashboard = () => {

    const [todoList, setTodoList] = useState<Todo[]>([]);

    const token = localStorage.getItem("token")
    if (!token) {
        window.location.href = "/"
    }

  useEffect(() => {

  axios.get("http://localhost:5000/todos", {headers: {token: localStorage.getItem("token")}})
  .then(res => {
      if (res.status === 200) {
        setTodoList(res.data.todos)
      }
  } ).catch(err => console.log(err.response));
  }, [])


  return (
    <>
        <Navbar/>
        <div className='max-w-md mx-auto pt-12'>
          <h1 className='font-bold text-blue-400 text-center text-xl pb-4'>My Todos</h1>
            <TodoForm todos={todoList} setTodos={setTodoList}/>
            <TodoList todos={todoList} setTodos={setTodoList}/>
        </div>

    </>
  )
}

export default Dashboard