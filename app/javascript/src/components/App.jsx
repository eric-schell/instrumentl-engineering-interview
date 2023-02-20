import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Lander from 'src/components/screens/Lander'

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Lander />} />
        <Route path='*' element={<Lander />} />
      </Routes>
    </Router>
  )
}

const App = () => (
  <Routing />
)

export default App
