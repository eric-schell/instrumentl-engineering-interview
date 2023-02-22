import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Table from 'src/components/organisms/Table'

const Filings = () => {
  const [filings, setFilings] = useState([])

  const load = async () => {
    const response = await axios.get(`/api/filings.json`)
    setFilings(response.data.filings)
  }

  useEffect(() => {
    load()
  }, [])
  
  return (
    <div className='p-4'>
      <Table
        data={filings}
        columns={[{
          title: 'ID',
          value: datum => <Link to={`/filings/${datum.id}`}>{datum.id}</Link>
        }, {
          title: 'Organization',
          value: datum => <Link to={`/organizations/${datum.organization_id}`}>{datum.organization_id}</Link>
        }, {
          title: 'Return Date',
          value: datum => datum.return_timestamp
        }, {
          title: 'Tax Period',
          value: datum => datum.tax_period
        }]}
      />
    </div>
  )
}

export default Filings
