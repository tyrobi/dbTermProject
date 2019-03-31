// Responsible for table displays on the first page

function getNumView() {
  return $("input[name='per-page-count']:checked").val() || 10;
}

function getPageNumber() {
  let v = $("input[name='page-num']:checked").val();
  return (v === undefined)? 0 : v;
}

function perPageChange() {
  $("#first-page-label").prop("checked", true);
  updateTablePeripherals(0);
}

function updateTable() {
  let newTable = getSelectedTable();
  let el = $("#table-label").eq(0);
  console.log(newTable, el);
  el.text("Table: " + titleCase(newTable));
  perPageChange();
}

function redrawTable() {
  let table = $("#database-view").eq(0);
  let displayCount = getNumView();
  let tableName = getSelectedTable();
  sendRequest(`Select * From ${tableName}
              Limit ${getPageNumber() * displayCount}, ${displayCount};`,
              (newData)=>{
    let d = getTable(newData);
    table.empty();
    let tableData = "";
    tableData += "<thead><tr>";
    for (let k = 0; k < d.keys.length; k++)
      tableData += `<th scope="col">${d.keys[k]}</th>`;
    tableData += "</tr></thead><tbody>";
    for (let i = 0; i < d.data.length; i++)
    {
      tableData += "<tr>";
      for (let j = 0; j < d.keys.length; j++)
        tableData += `<td>${d.data[i][d.keys[j]]}</td>`;
      tableData += "</tr>";
    }
    tableData += "</tbody>";
    table.append(tableData);
  });
}

// TODO: modify page number generation
function updateTablePeripherals(newPage = -1) {
  sendRequest(`Select COUNT(*) as num From ${getSelectedTable()};`, (count)=> {
    let numItems = getTable(count).data[0].num;
    let numPages = numItems / getNumView();
    let pages = $("#page-select").eq(0);
    let s = (newPage >= 0)? newPage : getPageNumber();
    let r = 5;
    let min = (s < r/2)? 0 : Math.ceil(s - r/2);
    let max = (s < numPages - r/2)? Math.ceil(min+r): numPages;
    let str = "";
    for (let i = min; i < max; i++)
    {
      str += `
      <label class="btn btn-secondary btn-dark
      ${(i === s? "active":"")}">
        <input type="radio"
         ${(i === 0? "id='first-page-label'":"")}
         name="page-num"
         onchange="updateTablePeripherals(${i})"
         value="${i}" ${(i === s? "checked":"")}> ${i + 1}
      </label>`;
    }
    pages.empty();
    pages.append(str);
    redrawTable();
  });
}

$(document).ready(()=>{
  displayAllTables($("#table-select"), updateTable);
});
