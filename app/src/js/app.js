'use strict';

global.ExcelJS = require('../../node_modules/exceljs/lib/exceljs.browser');

global.isRowBold = function(excelRow){
    return excelRow.getCell('name').value === "Jeff";
};

global.getRowColor = function(excelRow){
    return { argb: excelRow.getCell('colorCode').value };
};

global.getCellColor = function(excelRow, cell){
    return (excelRow.getCell('name').value === 'John' && cell.value === 0)? { argb: 'FFFFFF00' } : getRowColor(excelRow);
};

global.getFont = function(isBold, color){
    return {
        name: 'Arial Black',
        color: color,
        family: 2,
        size: 14,
        bold: isBold
    };
};

global.getTestHeader = function(){
    return [
        {key: "id", header: "Id"},
        {key: "name", header: "Name", width: 32},
        {key: "color", header: "Color", width: 10},
        {key: "colorCode", header: "Color Code", width: 10}
    ];
};

global.getTestData = function(){
    return [
        {
            id: 0,
            name: "John",
            color: "green",
            colorCode: "FF00FF00"
        },
        {
            id: 1,
            name: "Rehan",
            color: "red",
            colorCode: "FFFF0000"
        },
        {
            id: 2,
            name: "Jeff",
            color: "purple",
            colorCode: "FFFF00FF"
        }
    ];
};

global.generateTestFile = function(){
    var workbook = new ExcelJS.Workbook();

    // Set Workbook Metadata
    workbook.creator = "Generated";
    workbook.lastModifiedBy = "Generated";
    workbook.created = new Date();
    workbook.modified = new Date();

    // Create Worksheet
    var worksheet = workbook.addWorksheet('Sheet 1');

    //Set Column Headers
    worksheet.columns = getTestHeader();

    //Add Rows
    var testData = getTestData();
    var length = testData.length;
    for(var i = 0; i < length; i++){
        worksheet.addRow(testData[i]);
    }

    //Format Rows
    worksheet.eachRow(function(row, rowNumber){
        var isBold = isRowBold(row);
        row.eachCell(function(cell, colNumber){
            var cellColor = getCellColor(row, cell);
            cell.font = getFont(isBold, cellColor);
            console.log(cell);
            console.log(cell._column._key);
        });
    });

    return workbook;
};

global.writeTestFile = function (){
    var path = "test.txt";
    var data = "Test Content\n";

    var blob = new Blob([data], { type : 'text/plain' });

    fs.writeFile(path, data, "binary", function(e){
     if(e){
        console.log('Error has occurred');
        console.log(e);
     }
     else{
        console.log('Success!');
     }
    });

    console.log('Writing Test File');
    saveAs(blob, path);
    console.log('Test File Written');
};

global.writeTestExcelFile = function(){
    var path = "testExcel.xlsx";
    var mimeType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    var workbook = generateTestFile();
    workbook.xlsx.writeBuffer()
        .then(function(data) {
            console.log('Binary Buffer Opened');
            console.log(data);

            console.log('Creating blob');
            var blob = new Blob([data], { type : mimeType });

            console.log('Writing file to output/test.xlsx');

            saveAs(blob, path);
            console.log('File written!');
        });
};

