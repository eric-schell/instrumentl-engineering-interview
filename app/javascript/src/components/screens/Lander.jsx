import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Organizations from 'src/components/screens/Organizations'
import Organization from 'src/components/screens/Organization'

const Lander = () => {
  return (
    <div>
      <div className='bg-gray-200 p-4 border-b border-black flex justify-between'>
        <div className='flex gap-4'>
          <Link to='/organizations' className='border border-black hover:bg-yellow-100 p-2'>Organizations</Link>
        </div>
      </div>
      <div>
        <Routes>
          <Route path='organizations' element={<Organizations />} />
          <Route path='organizations/:id' element={<Organization />} />
        </Routes>
      </div>
    </div>
  )
}

export default Lander
