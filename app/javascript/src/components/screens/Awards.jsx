import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Table from 'src/components/organisms/Table'

const Awards = () => {
  const [awards, setAwards] = useState([])

  const load = async () => {
    const response = await axios.get(`/api/awards.json`)
    setAwards(response.data.awards)
  }

  useEffect(() => {
    load()
  }, [])
  
  return (
    <div className='p-4'>
      <Table
        data={awards}
        columns={[{
          title: 'Award ID', // TODO: Have better label here
          value: datum => <Link to={`/awards/${datum.id}`}>{datum.id}</Link>
        }, {
          title: 'Filing ID', // TODO: Have better label here
          value: datum => <Link to={`/filings/${datum.filing_id}`}>{datum.filing_id}</Link>
        }, {
          title: 'Receiver ID', // TODO: Have organization name available
          value: datum => <Link to={`/organizations/${datum.receiver_id}`}>{datum.receiver_id}</Link>
        }, {
          title: 'Purpose',
          value: datum => datum.purpose
        }]}
      />
    </div>
  )
}

export default Awards
