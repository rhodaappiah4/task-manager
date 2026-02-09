import { useEffect, useState } from 'react'
import './App.css'
import TaskForm from './components/TaskForm.jsx'
import TaskList from './components/TaskDetails/TaskList.jsx'
import TaskFilters from './components/TaskDetails/TaskFilters.jsx'
import { getTasks, searchTasks } from './api/tasks.js'

function App() {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

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

  useEffect(() => {
    // Perform search when searchQuery changes
    async function performSearch() {
      try {
        if (searchQuery) {
          const results = await searchTasks(searchQuery)
          setTasks(results)
        } else {
          // If search query is cleared, fetch all tasks again
          const data = await getTasks()
          setTasks(data)
        }
      } catch (error) {
        console.error('Error searching tasks:', error)
      }
    }
    performSearch()
  }, [searchQuery])

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

  const fileredTasks = tasks.filter((task) => {
    if (filter === 'active') return task.status !== 'completed'
    if (filter === 'completed') return task.status === 'completed'
    return true
  })

  return (
    <div className="App">
      <h1>Task Management Application</h1>
      <TaskForm onTaskCreated={handleTaskCreated} />
      <TaskFilters filter={filter} setFilter={setFilter} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <TaskList tasks={fileredTasks} onTaskUpdated={handleTaskUpdated} onTaskDeleted={handleTaskDeleted} />
    </div>
  )
}

export default App