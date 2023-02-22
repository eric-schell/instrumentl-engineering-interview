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

const Award = () => {
  const [loaded, setLoaded] = useState(false)
  const { id } = useParams()
  const awardPath = `/api/awards/${id}`
  const [{ purpose, cash_amount, address, receiver }, setAward] = useState({})
  const [showFilings, setShowFilings] = useState()
  const [addresses, setAddresses] = useState([])

  const load = async () => {
    const awardResponse = await axios.get(`/api/awards/${id}.json`)
    const award = awardResponse.data
    setAward(award)

    const addressesResponse = await axios.get(`/api/awards/${id}/addresses.json`)
    setAddresses(receivedAwardsResponse.data.addresses)

    setLoaded(true)
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <div className='p-4 flex'>
      <div className='pr-8'>
        <Datum label='Purpose' value={purpose} />
        <Datum label='Cash Amount' value={cash_amount} />
        <Datum label='Address' value={address?.address} />
        <Datum label='Receiver' value={receiver?.name} />
      </div>
    </div>
  )
}

export default Award
