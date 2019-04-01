// Helper functions

const _DEBUG = true;
let selectedTable = "parts";
let tableChangeCallback = ()=>{log("Table changed!")};

/* Convert a string to Title-Styled Capitalization */
function titleCase(str) {
  var splitStr = str.replace(/([A-Z])/g, ' $1').trim().toLowerCase().split(' ');
  for (var i = 0; i < splitStr.length; i++)
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  return splitStr.join(' ');
}

// Creates a list of radio-button links for each and
// every table in that database
function displayAllTables(buttonArea, callback) {
  sendRequest("Show Tables;", (resp)=> {
    let table = getTable(resp);
    let key = table.keys[0];
    for (var i = table.data.length - 1; i >= 0; i--)
    {
      buttonArea.prepend(`
        <input type="button" class="dropdown-item btn btn-dark"
               id="${table.data[i][key]}_btn"
               value="${titleCase(table.data[i][key])}"
               onclick="setSelectedTable('${table.data[i][key]}')">`);
    }
    if (callback !== undefined)
      setTableChangeCallback(callback);
  });
}

function getSelectedTable() {
  return selectedTable;
}

function setSelectedTable(newVal) {
  $(`#${selectedTable}_btn`).removeClass("active");
  $(`#${newVal}_btn`).addClass("active");
  selectedTable = newVal;
  tableChangeCallback();
}

function log(val) {
  if (_DEBUG)
    console.log(val);
}

function err(val) {
  if (_DEBUG)
    console.error(val);
}

function setTableChangeCallback(func) {
  tableChangeCallback = func;
  func();
}
