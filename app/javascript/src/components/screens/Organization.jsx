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
  const [loaded, setLoaded] = useState(false)
  const { id } = useParams()
  const organizationPath = `/api/organizations/${id}`
  const [{ name, ein, filings }, setOrganization] = useState({})
  const [showFilings, setShowFilings] = useState()
  const [receivedAwards, setReceivedAwards] = useState([])

  const load = async () => {
    const organizationResponse = await axios.get(`/api/organizations/${id}.json`)
    const organization = organizationResponse.data
    setOrganization(organization)

    setShowFilings(organization.filings.length > 0)
    if (!showFilings) {
      const receivedAwardsResponse = await axios.get(`/api/receivers/${id}/awards.json`)
      setReceivedAwards(receivedAwardsResponse.data.awards)
    }

    setLoaded(true)
  }

  useEffect(() => {
    load()
  }, [])

  const FilingsTable = () => (
    <>
      <div className='pb-4'>
        <b>Filings: </b>
      </div>
      <Table
        data={filings}
        columns={[{
          title: 'Tax Period',
          value: datum => datum.tax_period
        }, {
          title: 'Awards Count',
          value: datum => datum.awards_count
        }, {
          title: 'Total Amount Given',
          value: datum => datum.total_amount_given
        }]}
      />
    </>
  )

  const ReceivedAwardsTable = () => (
    <>
      <div className='pb-4'>
        <b>Received Awards: </b>
      </div>
      <Table
        data={receivedAwards}
        columns={[{
          title: 'Purpose',
          value: datum => datum.purpose
        }, {
          title: 'Cash Amount',
          value: datum => datum.cash_amount
        }]}
      />
    </>
  )

  return (
    <div className='p-4 flex'>
      <div className='pr-8'>
        <Datum label='Name' value={name} />
        <Datum label='EIN' value={ein} />
      </div>
      <div className='flex-grow'>
        {loaded && (showFilings ? <FilingsTable /> : <ReceivedAwardsTable />)}
      </div>
    </div>
  )
}

export default Organization
