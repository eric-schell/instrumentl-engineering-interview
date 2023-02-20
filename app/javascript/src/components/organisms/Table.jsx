import React from 'react'
import PropTypes from 'prop-types'

const Table = ({ data = [], columns, header = true, className = '' }) => {
  return (
    <div className={className}>
      <div className='overflow-x-scroll border border-black-25'>
        <table className='table-auto w-full'>
          {header &&
            <thead>
              <tr className='bg-gray'>
                {columns.map((column, i) => <th key={i} onClick={column.onClick} className={`p-2 text-left border border-black-25 whitespace-pre ${typeof column.onClick == 'function' ? 'cursor-pointer' : ''}`}>{column.title}</th>)}
              </tr>
            </thead>
          }
          <tbody className='bg-black-05 divide-y divide-black-25'>
            {data.map((datum, i) => (
              <tr className='even:bg-gray' key={i}>
                {columns.map((column, j) => <td className={`hover:bg-yellow-100 border border-black-25 whitespace-pre ${column.padding === false ? '' : 'px-2'} ${column.className ? column.className : ''}`} key={j}>{column.value(datum)}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

Table.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  header: PropTypes.bool,
  className: PropTypes.string
}

export default Table
