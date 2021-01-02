class CsvFiler {
    constructor() {
        throw new Error("Do not instantiate a static class");
    }

    static download(rowsArrary, fileName, colWidth = 0) {
        let csvContent = "";
        rowsArrary.forEach(row => {
            row.forEach(val => {
                csvContent += val.toString().padEnd(colWidth, " ");
                csvContent += ", ";
            })
            csvContent += "\n";
        });

        var hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvContent);
        hiddenElement.target = '_blank';
        hiddenElement.download = `${fileName}.csv`;
        hiddenElement.click();
    }
}
