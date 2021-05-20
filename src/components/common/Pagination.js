import React from 'react'

const Pagination = ({curr,size,total, pageChange}) => {
    const pages=[];
    for(let i=1;i<=Math.ceil(total/size);i++) pages.push(i);
    
    const getActiveClass=(item)=>{
        return item===curr?"btn btn-primary":"btn";
    }
    return (
        <div>
            {pages.map((item)=> <button key={item} onClick={()=>pageChange(item)} className={getActiveClass(item)}>{item}</button>)}
        </div>
    )
}

export default Pagination
