export function searchData(search, data) {

    search = search.toLowerCase();
    
    for (const key in data) {
        let x = String(data[key]).toLowerCase();

        if(key === "date") {
            x = new Date(data[key]).toUTCString().toLowerCase();
        }

        if (x.includes(search)) 
            return true;
    }

    return false;
}