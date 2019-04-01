// NOTE: Insert is the only implemented function

let currentTableFields = [];
const container = $("#table-area").eq(0);

function getAction() {
  return $("input[name='action-type']:checked").val();
}

function genTable() {
  sendRequest(`Describe ${getSelectedTable()};`, (t)=>{
    let table = "";
    let a = true;
    switch(getAction()) {
      case "delete": table = genInsertTable(t); a = false; break; // Note: unimplemented
      case "modify": table = genModifyTable(t); a = false; break; // Note: unimplemented
      case "insert": table = genInsertTable(t); a = true; break;
    }
    container.empty();
    container.append(table);
  });
}

function genInsertTable(tableDesc) {
  let descriptions = JSON.parse(tableDesc.response);
  let tableProps = "table table-striped table-dark table-responsive";
  let table = `<table id='insert-table' class="${tableProps}"><tr><thead>`;
  currentTableFields = [];
  for (var field = 0; field < descriptions.length; field++)
  {
    currentTableFields.push(String(descriptions[field].Field));
    table += `<th>${descriptions[field].Field}</th>`;
  }
  table += "</thead></tr><tr>";
  for (var field = 0; field < descriptions.length; field++)
    table += `<td>${getInputField(1, descriptions[field])}</td>`;
  table += "</tr></table>"+createFormButtons();
  return table;
}

function genModifyTable(tableDesc) {
  let descriptions = JSON.parse(tableDesc.response);
  let tableProps = "table table-striped table-dark table-responsive";
  let table = `<table id='modify-table' class="${tableProps}"><tr><thead>`;
  currentTableFields = [];
  for (var field = 0; field < descriptions.length; field++)
  {
    currentTableFields.push(String(descriptions[field].Field));
    table += `<th>${descriptions[field].Field}</th>`;
  }
  for (var i = 0; i < 2; i++) {
    table += "</thead></tr><tr>";
    for (var field = 0; field < descriptions.length; field++)
      table += `<td>${getInputField(i, descriptions[field])}</td>`;
  }
  table += "</tr></table>"+createFormButtons();
  return table;
}

// NOTE: only insert functionality was implemented.
function createFormButtons() {
  let shouldWork = getAction() === "insert";
  return `
  <input type="submit" class="btn btn-success" value="Submit" ${shouldWork? "":"disabled"}>
  <input type="reset" class="btn btn-dark" value="Clear">
  `;
}

function _getInputType(type) {
  let t = String(type);
  if (t.includes("double")) return "number";
  if (t.includes("varchar")) return "text";
  if (t.includes("int")) return "number";
  if (t.includes("text")) return "text";
  return "text";
}

function _getInputRestrictions(type) {
  let t = String(type.Type);
  let restrictions = {};
  if (t.includes("(")) {
    let vals = t.split("(")[1];
    vals = vals.split(")")[0];
    if (vals.includes(",")) {
      let preci = 10 ** -vals.split(",")[1];
      restrictions.step = preci;
      vals = vals.split(",")[0];
    }
    restrictions.size = vals;
  }
  return restrictions;
}

function numSize(t) {
  let n = t.hasOwnProperty("size")?Number(t.size):2;
  return `style='width: ${n}ex'
  max="${(10**(n+1))-1}"`;
};

function getInputField(index, field) {
  let r = _getInputRestrictions(field);
  let type = _getInputType(field.Type);
  return `<input
           id=${"val-" + field.Field + index}
           type="${type}"
           placeholder="${titleCase(field.Field)}"
           ${type === "number"? numSize(r):""}
           ${r.hasOwnProperty("size")? "maxlength='"+r.size+"'":""}
           ${r.hasOwnProperty("step")? "step='"+r.step+"'":""}
           ${field.Null === "NO"? "required":""}
           value="">`;
}

function modChange() {
  $("#table-label").text(`Selected: ${titleCase(getSelectedTable())}`);
  genTable();
}

// Only insert was implemented
function submitQuery() {
  switch(getAction()) {
    case "insert": return _insert();
  }
  return false;
}

function _insert() {
  let values = "";
  let keys = "";
  for (var i = 0; i < currentTableFields.length; i++) {
    let v = $(`#val-${currentTableFields[i]}1`).val();
    if (v === "") continue;
    values += `"${v}",`;
    keys += (currentTableFields[i] + ",");
  }
  values = values.substring(0, values.length - 1);
  keys = keys.substring(0, keys.length - 1);
  let command = `Insert Into ${getSelectedTable()} (${keys}) Values (${values});`;
  log(command); //TODO: present text?
  sendRequest(command, (resp) => {
    if (resp.response == "false") // error ocurred, don't remove data
      alert("Database rejected your entry");
    else
    {
      alert("Database changes accepted")
      container[0].reset();
    }
  });
  return false;
}

$(document).ready(()=>{
  displayAllTables($("#table-select-edit"), modChange);
});