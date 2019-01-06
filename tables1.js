var currentColumn;
var currentSort = "unsorted";
var storeRows = [];
var arr = [];

function compareSort(a, b) {
    // sort in ascending order
    "use strict";
    if (a < b) {
        return -1;
    } else if (a === b) {
        return 0;
    } else {
        return 1;
    }
}

function sortColumn(column) {
    "use strict";
    // Sort the column given by the index, coloring the header as necessary.

    if (currentColumn !== undefined) {
        // change color of previous column to black
        currentColumn.style.color = "";
    }

    if (currentColumn !== document.getElementsByTagName("TH")[column]) {
        // if a new header is clicked, update sorting direction and column
        currentSort = "unsorted";
        currentColumn = document.getElementsByTagName("TH")[column];
    }

    var y = document.getElementById("ourtable");
    var newIndices = [];
    var i;

    if (storeRows.length === 0) {
        // store initial rows in table
        for (i=1; i<101; i++) {
            storeRows.push(y.rows[i]);
        }
    }

    if (currentSort === "unsorted") {
        arr = [];
        currentColumn.style.color = "blue"; // update color
        currentSort = "ascending"; // update sort direction
        for (i=0; i<100; i++) {
            if (column === 1) {
                arr.push(parseInt(storeRows[i].children[column].innerHTML));
            } else {
                arr.push(storeRows[i].children[column].innerHTML);
            }
        }
        arr.sort(compareSort); // sort in ascending order
    } else if (currentSort === "ascending") {
        currentColumn.style.color = "red"; // update color
        currentSort = "descending"; // update sort direction
        if (column === 1) {
            for (i=0; i<arr.length; i++) {
                arr[i] = parseInt(arr[i]);
            }
        }
        arr.sort(compareSort);
        arr.reverse(); // sort in descending order
    } else { // currentSort === "descending"
        currentColumn.style.color = "blue"; // update color
        currentSort = "ascending"; // update sort direction
        if (column === 1) {
            for (i=0; i<arr.length; i++) {
                arr[i] = parseInt(arr[i]);
            }
        }
        arr.sort(compareSort); // sort in ascending order
    }

    for (i=0; i<arr.length; i++) {
        arr[i] = arr[i].toString();
    }
    for (i=0; i<100; i++) {
        newIndices.push(arr.indexOf(storeRows[i].children[column].innerHTML));
    }
    for (i=1; i<101; i++) {
        y.deleteRow(1); // remove all rows from table
    }
    for (i=0; i<100; i++) {
        var newRow = y.insertRow(i+1);
        if (storeRows[newIndices.indexOf(i)] !== undefined) {
            newRow.insertCell(0).innerHTML =
            storeRows[newIndices.indexOf(i)].children[0].innerHTML;
            newRow.insertCell(1).innerHTML =
            storeRows[newIndices.indexOf(i)].children[1].innerHTML;
            newRow.insertCell(2).innerHTML =
            storeRows[newIndices.indexOf(i)].children[2].innerHTML;
        }
    }
}

window.addEventListener("load", function(e) {
    "use strict";
    // Attach a click listener on all header cells to call sortColumn
    var headerCells = document.getElementById("header").children;
    var i;
    for(i = 0; i < headerCells.length; i++) {
        headerCells[i].addEventListener("click", (function(column) {
            return function(e) {
                sortColumn(column);
            };
        })(i));
    }
});
