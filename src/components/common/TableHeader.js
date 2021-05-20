import React from 'react'

const TableHeader = ({columns, sort}) => {
    return (
            <thead>
                <tr>
                {
                    columns.map(column=> <th key={column} className="text-center text-dark">{column}</th>)
                }
                </tr></thead>
    )
}

export default TableHeader
