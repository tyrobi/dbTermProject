let activeId = -1;
function addPart() {
    str = `<p id="p${numberOfParts}"><input id="pNum${numberOfParts}" type="text" placeholder="Part No." required>
            <input id="qNum${numberOfParts}" type="number" step="1" placeholder="Quantity" required>
            <input id="cNum${numberOfParts}" type="number" step="0.01" placeholder="Cost" required>
            <input type="button" class="btn btn-dark" onclick="removePart(${numberOfParts}); return false;" value="-"><br></p>` ;
    numberOfParts++;
    $("#partEntry").append(str);
}

function removePart(val) {
    $(`#p${val}`).remove();
}

function _daysBetween(date1, date2) {
  let one_day=1000*60*60*24;
  let date1_ms = date1.getTime();
  let date2_ms = date2.getTime();
  let difference_ms = date2_ms - date1_ms;
  return Math.round(difference_ms/one_day);
}

function checkDate() {
    return _daysBetween(new Date($("#dateFiled").val()), new Date()) <= 3;
}

function onSubmit() {
    if (checkDate()) {
        alert("Mueheh, you can't cancel an order more than three days after it was placed!");
        return;
    }
    let command = `Delete From orders Where orderId = ${activeId};`;
    log(command);
    sendRequest(command, (data)=>{
        if (data.response !== "true") {
            alert("Database rejected the order.");
            return;
        }
        alert("Order cancelled successfully.");
        clear();
    });
}

function clear() {
    log("clearing");
    $("#supplierID").val("");
    $("#dateFiled").val("");
    log($("#partEntry").eq(0))
    $("#partEntry").eq(0).empty();
    $("#cancelOrderButton").prop("disabled", true);
}

function searchForOrders() {
    let id = $("#orderSearch").eq(0).val();
    clear();
    if (id === "" || id === undefined) return;
    let command = `Select * From orders Where orderId = ${id} limit 1;`;
    sendRequest(command, (r)=> {
        log(r);
        if (r.response === "[]" || r.response === "false") {
            alert("No records found");
            return;
        }
        activeId = id;
        let tab = getTable(r);
        log(tab);
        $("#supplierID").val(tab.data[0].supplierId);
        $("#dateFiled").val(tab.data[0].dateFiled);
        command = `Select * From boughtPart Where orderId = ${id};`;
        sendRequest(command, (d)=> {
            let parts = getTable(d);
            for (var i = 0; i < parts.data.length; i++) {
                let e = parts.data[i];
                let el = `
                <label for="pNum${i}">Part No.</label>
                <input id="pNum${i}" type="text" placeholder="Part No." readonly value="${e.partId}">
                <label for="qNum${i}">Qty</label>
                <input id="qNum${i}" type="number" step="1" placeholder="Quantity" readonly value="${e.qty}">
                <label for="cNum${i}">Price</label>
                <input id="cNum${i}" type="number" step="0.01" placeholder="Cost" readonly value="${e.price}"><br>`;
                $("#partEntry").append(el);
            }
            $("#cancelOrderButton").prop("disabled", false);
        });
    });
}