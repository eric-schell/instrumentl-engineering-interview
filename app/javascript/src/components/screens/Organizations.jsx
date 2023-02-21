import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Table from 'src/components/organisms/Table'

const Organizations = () => {
  const [organizations, setOrganizations] = useState([])
  const [withFilings, setWithFilings] = useState(false)
  const [withReceivedAwards, setWithReceivedAwards] = useState(false)

  const load = async () => {
    const response = await axios.get(`/api/organizations.json?with_filings=${withFilings}&with_received_awards=${withReceivedAwards}`)
    setOrganizations(response.data.organizations)
  }

  useEffect(() => {
    load()
  }, [withFilings, withReceivedAwards])
  
  function handleWithFilingsChange(event) {
    setWithFilings(!!event.target.checked)
  }

  function handleWithReceivedAwardsChange(event) {
    setWithReceivedAwards(!!event.target.checked)
  }

  return (
    <div className='p-4'>
      <div className='pb-4'>
        <b>With Filings Only: </b>
        <input type="checkbox" onChange={handleWithFilingsChange} checked={withFilings} />
      </div>
      <div className='pb-8'>
        <b>With Received Awards Only: </b>
        <input type="checkbox" onChange={handleWithReceivedAwardsChange} checked={withReceivedAwards} />
      </div>
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
