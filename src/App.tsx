import './App.css'
import ToDo from './todo'
function App() {
  const header = "Welcome to the To-Do App"
  const header2 = "The best app on the web!"
  return (
    <>
      <ToDo header={header} header2={header2} />
    </>
  )
}

export default App
