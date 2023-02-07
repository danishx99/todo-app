import React from 'react'
import axios from 'axios'

export interface Todo {
  _id: string
  title: string,
  isCompleted: boolean
}

interface TodoListProps {
todos: Todo[]
setTodos: (todos: Todo[]) => void;
}

const TodoList = ({todos, setTodos}: TodoListProps) => {

const onSubmit = (todo: Todo) => {
  axios.put(`http://localhost:5000/todos/${todo._id}`, {}, {headers: {token: localStorage.getItem("token")}})
  .then(res => {
    if (res.status === 200) {
      let _todos = todos
      setTodos(_todos.filter(todo => res.data.todo._id !== todo._id))
    }
  })
 .catch(err => console.log(err.response))
}

  return (
    <div>
        {todos.filter(todo => !todo.isCompleted).map((todo) => (
            <div className='border border-gray-400 flex justify-between p-4 rounded-md mb-4 items-center' key={todo._id}>
              {todo.title}
              <input onClick={() => onSubmit(todo)} type="button" className='py-2 px-3 bg-blue-400 text-white rounded-md cursor-pointer hover:bg-blue-600' value="DONE" />
            </div>
          ))}
    </div>
  )
}

export default TodoList