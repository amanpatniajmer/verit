import React from 'react';

const Pagination = ({curr, size, total, pageChange, sizeChange}) => {
    
    const pages = [];

    for(let i = 1; i <= Math.ceil(total/size); i++) 
        pages.push(i);
    
    const getActiveClass = (item) => {
        return item === curr ? "btn btn-primary" : "btn-pagination";
    }

    return (
        <div className = "pagination" >
            <span>
            {pages.map((item) => <button key = {item} onClick = {() => pageChange(item)} className = {getActiveClass(item)}>{item}</button>)}
            </span>

            <span>
                Rows: <input type = "number" min = {1} value = {size} onChange = {(e) => sizeChange(e.target.value)}/>
            </span>
        </div>
    )
}

export const paginate = (items, curr, size) => {
    const start = (curr - 1) * size;
    let temp = items.slice(start);
    while (temp.length > size) 
        temp.pop();

    return temp;
}

export default Pagination;
