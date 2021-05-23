export function searchData(search, data) {
    search = search.toLowerCase();
    for (const key in data) {
        const x = String(data[key]).toLowerCase();
        if (x.includes(search)) return true;
    }
    return false;
}