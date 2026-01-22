import { useEffect, useState } from 'react'
import './App.css'
import TaskForm from './components/TaskForm.jsx'
import TaskList from './components/TaskDetails/TaskList.jsx'
import { getTasks } from './api/tasks.js'

function App() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    // Fetch tasks from the API when the component mounts
    async function fetchTasks() {
      try {
        const data = await getTasks()
        setTasks(data)
      } catch (error) {
        console.error('Error fetching tasks:', error)
      }
    }
    fetchTasks()
  }, [])

  // Handler to add a newly created task to the state
  const handleTaskCreated = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask])
  }

  const handleTaskUpdated = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    )
  }

  const handleTaskDeleted = (deletedTaskId) => {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== deletedTaskId)
    )
  }

  return (
    <div className="App">
      <h1>Task Management Application</h1>
      <TaskForm onTaskCreated={handleTaskCreated} />
      <TaskList tasks={tasks} onTaskUpdated={handleTaskUpdated} onTaskDeleted={handleTaskDeleted} />
    </div>
  )
}

export default App