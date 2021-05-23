import React from 'react'

const TableHeader = ({columns, sort, setSort}) => {
    const order=(field, type)=>{
        if(field==="") return;
        if(sort.field===field)setSort({...sort, asc:!sort.asc})
        else setSort({field, type, asc:true});
    }
    return (
            <thead style={{cursor:'pointer'}}>
                <tr>
                {
                    columns.map(column=> 
                    <th key={column.name} className="text-center text-dark" onClick={()=>{order(column.name, column.type)}}>{column.name}
                    {sort.field===column.name?(sort.asc?<i className="fa fa-caret-down"/>:<i className="fa fa-caret-up"/>):null}
                    </th>)
                }
                </tr></thead>
    )
}

export default TableHeader
