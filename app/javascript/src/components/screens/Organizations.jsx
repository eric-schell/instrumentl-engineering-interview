import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Table from 'src/components/organisms/Table'

const Organizations = () => {
  const [organizations, setOrganizations] = useState([])

  const load = async () => {
    const response = await axios.get('/api/organizations.json')
    setOrganizations(response.data.organizations)
  }

  useEffect(() => {
    load()
  }, [])
  

  return (
    <div className='p-4'>
      <Table
        data={organizations}
        columns={[{
          title: 'Name',
          value: datum => <Link to={`/organizations/${datum.id}`}>{datum.name}</Link>
        }, {
          title: 'EIN',
          value: datum => <Link to={`/organizations/${datum.id}`}>{datum.ein}</Link>
        }]}
      />
    </div>
  )
}

export default Organizations
