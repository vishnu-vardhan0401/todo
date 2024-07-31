
import Signup from './components/Signup'
import Todo from './components/Todo'
import './index.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
function App() {

  return (
    <>
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Signup />} />
    <Route path="/todo" element={<Todo />} />
   </Routes>
   </BrowserRouter>
    </>
  )
}

export default App
