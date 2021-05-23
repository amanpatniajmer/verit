import React from 'react'

const Pagination = ({curr,size,total, pageChange, sizeChange}) => {
    const pages=[];
    for(let i=1;i<=Math.ceil(total/size);i++) pages.push(i);
    
    const getActiveClass=(item)=>{
        return item===curr?"btn btn-primary":"btn";
    }
    return (
        <div className="pagination" >
            <span>
            {pages.map((item)=> <button key={item} onClick={()=>pageChange(item)} className={getActiveClass(item)}>{item}</button>)}
            </span>
            <span>
            Rows/page:<input type="number" min={1} value={size} onChange={(e)=>sizeChange(e.target.value)}/>
            </span>
        </div>
    )
}

export default Pagination
