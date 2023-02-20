import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import Table from 'src/components/organisms/Table'

const Datum = ({ label, value }) => (
  <div className='flex flex-col mb-4 border border-black hover:bg-yellow-100 p-2 cursor-pointer' onClick={() => navigator.clipboard.writeText(value)}>
    <div className='text-xs'>{label}</div>
    <div className='text-lg'>{value}</div>
  </div>
)
Datum.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any
}

const Organization = () => {
  const { id } = useParams()
  const organizationPath = `/api/organizations/${id}`
  const [{ name, ein }, setOrganization] = useState({})
  const [filings, setFilings] = useState([])

  const load = async () => {
    const organizationResponse = await axios.get(`${organizationPath}.json`)
    setOrganization(organizationResponse.data)

    const filingsResponse = await axios.get(`${organizationPath}/filings.json`)
    setFilings(filingsResponse.data.filings)
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <div className='p-4 flex'>
      <div className='pr-8'>
        <Datum label='Name' value={name} />
        <Datum label='EIN' value={ein} />
      </div>
      <div className='flex-grow'>
        <Table
          data={filings}
          columns={[{
            title: 'id',
            value: datum => datum.id
          }, {
            title: 'tax_period',
            value: datum => datum.tax_period
          }]}
        />
      </div>
    </div>
  )
}

export default Organization
