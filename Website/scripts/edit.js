let currentTableFields = [];
const container = $("#table-area").eq(0);

function getAction() {
  return $("input[name='action-type']:checked").val();
}

function genTable() {
  sendRequest(`Describe ${getSelectedTable()};`, (t)=>{
    let table = "";
    switch(getAction()) {
      case "delete": table = genInsertTable(t); break;
      case "modify": table = genModifyTable(t); break;
      case "insert": table = genInsertTable(t); break;
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

function createFormButtons() {
  return `
  <input type="submit" class="btn btn-success" value="Submit">
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
  genTable();
}

function submitQuery() {
  switch(getAction()) {
    case "insert": return _insert();
  }
  return false;
}

function _insert() {
  let command = `Insert Into ${getSelectedTable()} (`;
  let values = "";
  for (var i = 0; i < currentTableFields.length; i++) {
    let comma = ((i < currentTableFields.length - 1)?", ":" ")
    command += (currentTableFields[i] + comma);
    values += `"${$(`#val-${currentTableFields[i]}1`).val()}"`;
    values += comma;
  }
  command += (`) Values (${values});`);
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