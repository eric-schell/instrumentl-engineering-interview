import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Organizations from 'src/components/screens/Organizations'
import Organization from 'src/components/screens/Organization'
import Filings from 'src/components/screens/Filings'
import Filing from 'src/components/screens/Filing'
import Awards from 'src/components/screens/Awards'
import Award from 'src/components/screens/Award'

const Lander = () => {
  return (
    <div>
      <div className='bg-gray-200 p-4 border-b border-black flex justify-between'>
        <div className='flex gap-4'>
          <Link to='/organizations' className='border border-black hover:bg-yellow-100 p-2'>Organizations</Link>
          <Link to='/filings' className='border border-black hover:bg-yellow-100 p-2'>Filings</Link>
          <Link to='/awards' className='border border-black hover:bg-yellow-100 p-2'>Awards</Link>
        </div>
      </div>
      <div>
        <Routes>
          <Route path='organizations' element={<Organizations />} />
          <Route path='organizations/:id' element={<Organization />} />
          <Route path='filings' element={<Filings />} />
          <Route path='filings/:id' element={<Filing />} />
          <Route path='awards' element={<Awards />} />
          <Route path='awards/:id' element={<Award />} />
        </Routes>
      </div>
    </div>
  )
}

export default Lander
