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

const Filing = () => {
  const [loaded, setLoaded] = useState(false)
  const { id } = useParams()
  const filingPath = `/api/filings/${id}`
  const [{ tax_period, awards_count, total_amount_given, organization }, setFiling] = useState({})
  const [awards, setAwards] = useState([])

  const load = async () => {
    const filingResponse = await axios.get(`/api/filings/${id}.json`)
    const filing = filingResponse.data
    setFiling(filing)

    const awardsResponse = await axios.get(`/api/filings/${id}/awards.json`)
    setAwards(awardsResponse.data.awards)

    setLoaded(true)
  }

  useEffect(() => {
    load()
  }, [])

  const AwardsTable = () => (
    <>
      <div className='pb-4'>
        <b>Awards: </b>
      </div>
      <Table
        data={awards}
        columns={[{
          title: 'Receiver ID', // TODO: Have organization name available
          value: datum => <Link to={`/organizations/${datum.receiver_id}`}>{datum.receiver_id}</Link>
        }, {
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
        <Datum label='Tax Period' value={tax_period} />
        <Datum label='Awards Count' value={awards_count} />
        <Datum label='Total Amount Given' value={total_amount_given} />
        <Datum label='Organization' value={organization?.name} />
      </div>
      <div className='flex-grow'>
        {loaded && <AwardsTable />}
      </div>
    </div>
  )
}

export default Filing
