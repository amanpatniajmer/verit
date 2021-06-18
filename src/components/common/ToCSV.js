const toCSV = (data ) => {
    let csv = '';

    for (let key in data[0]) {
        if (csv !== '') 
            csv += ',';

        csv += key;
    }

    csv += '\r\n';

    for (let i = 0; i < data.length; i++) {
        
        let row = '';

        for (var key in data[i]) {
            if (row !== '') 
                row += ',';
            row += data[i][key];
        }
        csv += row + '\r\n';
    }
    return csv;
}

const JSONtoCSV = (data, filename) => {
    const csv = toCSV(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename+'.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export default JSONtoCSV;