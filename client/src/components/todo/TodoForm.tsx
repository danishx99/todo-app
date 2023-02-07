import {useState} from 'react'
import axios from "axios"
import {Todo} from "./TodoList"

interface TodoFormProps {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
}

const TodoForm = ({todos, setTodos}: TodoFormProps) => {
  
const [title, setTitle] = useState("")

const onSubmit = () => {
  if (title.length > 0) {
    axios.post("http://localhost:5000/todos", {title: title}, {headers: {token: localStorage.getItem("token")}})
    .then(res => {
      if (res.status === 200){
        let todo = res.data.todo    
        setTodos([...todos, todo])
        }
        setTitle("")
    }
      ).catch(err => console.log(err.response))
  }
}

  return (
    <div className='flex justify-between mb-8'>
      <input className='w-full px-3 py-2 border border-blue-400 rounded-md mr-4' onChange={e => setTitle(e.target.value)} value={title} type="text" />
      <input className='px-3 py-2 rounded-md text-white bg-blue-400 hover:bg-blue-600 cursor-pointer' onClick={() => onSubmit()} value="ADD" type="button" />
    </div>
  )
}

export default TodoForm