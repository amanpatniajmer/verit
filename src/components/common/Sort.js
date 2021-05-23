export const sort = (array, asc, field, type) => {
    field = String(field).toLowerCase();
    array.sort((a, b) => {
        if (field === "event_position") {
            a = (a.type === "External") ? String(a.institute).toLowerCase():String(a.event).toLowerCase() ;
            b = (b.type === "External") ? String(b.institute).toLowerCase():String(b.event).toLowerCase();
        }
        else {
            if(type==="String"){
                a = String(a[field]).toLowerCase();
                b = String(b[field]).toLowerCase();
            }
            else if(type==="Date"){
                a = new Date(a[field]);
                b = new Date(b[field]);
            }
            else if(type==="Number"){
                a=Number(a[field])
                b=Number(b[field])
            }
            else return array;
        }
        if (a < b) return asc ? -1 : 1;
        else if (a > b) return asc ? 1 : -1;
        return 0;
    });
    return array;
}