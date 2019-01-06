var SortTable;
(function MyCode () {
    "use strict";
    SortTable = function(id, types) {
      // constructor for SortTable class

       this.id = id;
       this.currentSort = "unsorted";
       this.currentColumn = undefined;
       this.storeRows = [];
       this.array = [];
       this.types = [];

       var headerCells = document.getElementsByTagName("TH");
       var i;

       for(i = 0; i < headerCells.length; i++) {
           // attach a click listener on all header cells to call sortColumn
           headerCells[i].addEventListener("click",
           this.sortColumn.bind(this, i));
       }

       if (typeof(types) !== "object" || types.length === 0) {
           // if types is empty or not an array, assume all types are strings
           this.types.push("string", "string", "string", "string");
       } else {
           this.types = types;
       }
    };

    SortTable.prototype.sortColumn = function(index) {
       // Sort the column given by the index, coloring the header as necessary.

       if (this.currentColumn !== undefined) {
           // change color of previous column to black
           this.currentColumn.style.color = "";
       }
       if (this.currentColumn !== document.getElementsByTagName("TH")[index]) {
           // if a new header is clicked, update sorting direction and column
           this.currentSort = "unsorted";
           this.currentColumn = document.getElementsByTagName("TH")[index];
       }
       var y = document.getElementById(this.id);
       var newIndices = [];
       var i;

       if (this.storeRows.length === 0) {
           // store initial rows in table
           for (i=1; i<101; i++) {
               this.storeRows.push(y.rows[i]);
           }
       }
       if (this.currentSort === "unsorted") {
           this.arr = [];
           this.currentColumn.style.color = "blue"; // update color
           this.currentSort = "ascending"; // update sort direction
           for (i=0; i<100; i++) {
               if (this.types[index] === Number) {
                   this.arr.push(parseInt(this.storeRows[i].
                       children[index].innerHTML));
               } else {
                   this.arr.push(this.storeRows[i].children[index].innerHTML);
               }
           }
           this.arr = this.compareSort(this.arr); // sort in ascending order
       } else if (this.currentSort === "ascending") {
           this.currentColumn.style.color = "red"; // update color
           this.currentSort = "descending"; // update sort direction
           if (this.types[index] === Number) {
               for (i=0; i<this.arr.length; i++) {
                   this.arr[i] = parseInt(this.arr[i]);
               }
           }
           this.arr = this.compareSort(this.arr);
           this.arr.reverse(); // sort in descending order
       } else { // currentSort === "descending"
           this.currentColumn.style.color = "blue"; // update color
           this.currentSort = "ascending"; // update sort direction
           if (this.types[index] === Number) {
               for (i=0; i<this.arr.length; i++) {
                   this.arr[i] = parseInt(this.arr[i]);
               }
           }
           this.arr = this.compareSort(this.arr); // sort in ascending order
       }

       for (i=0; i<this.arr.length; i++) {
           this.arr[i] = this.arr[i].toString();
       }

       for (i=0; i<100; i++) {
           newIndices.push(this.arr.indexOf(this.storeRows[i].
               children[index].innerHTML));
       }
       for (i=1; i<101; i++) {
           y.deleteRow(1); // remove all rows from table
       }
       for (i=0; i<100; i++) {
           // update table with sorted rows
           var newRow = y.insertRow(i+1);
           if (this.storeRows[newIndices.indexOf(i)] !== undefined) {
               newRow.insertCell(0).innerHTML =
               this.storeRows[newIndices.indexOf(i)].children[0].innerHTML;
               newRow.insertCell(1).innerHTML =
               this.storeRows[newIndices.indexOf(i)].children[1].innerHTML;
               newRow.insertCell(2).innerHTML =
               this.storeRows[newIndices.indexOf(i)].children[2].innerHTML;
               newRow.insertCell(3).innerHTML =
               this.storeRows[newIndices.indexOf(i)].children[3].innerHTML;
           }
       }
    };

    SortTable.prototype.compareSort = function(arr) {
        // sort in ascending order
        arr.sort(function(a, b) {
            if (a < b) {
                return -1;
            } else if (a === b) {
                return 0;
            } else {
                return 1;
            }
        });
        return arr;
    };
}());
