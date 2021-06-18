import React from 'react';

const TableBody = ({ data, content, sort, setAllData }) => {
    return (
        <tbody>
            {
                data && data.map((i) => content(i))
            }
        </tbody>
    )
}

export default TableBody;
