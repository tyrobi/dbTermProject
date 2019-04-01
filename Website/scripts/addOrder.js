let numberOfParts = 0;

function addPart() {
    str = `<p id="p${numberOfParts}"><input id="pNum${numberOfParts}" type="text" placeholder="Part No." required>
            <input type="button" class="btn btn-dark" onclick="removePart(${numberOfParts}); return false;" value="-"><br></p>` ;
    numberOfParts++;
    $("#partEntry").append(str);
}

function removePart(val) {
    $(`#p${val}`).remove();
}

function onSubmit() {
    let command = `Insert Into orders(supplierId, dateFiled) Values ('`;
    let date = new Date().toJSON().slice(0,10).replace(/-/g,'-');
    command += $("#supplierID").val() + "', '" + date + "');";
    log(command);
    sendRequest(command, (data)=>{
        if (data.response !== "true") {
            alert("Database rejected the order.");
            return;
        }
        else if (numberOfParts > 0) {
            sendRequest(`Select orderId from orders order by orderId desc limit 1;`, (resp) => {
                let r = getTable(resp);
                let id = r.data[0].orderId;
                submitPartLists(id);
            });
        } else {
            $("#supplierAddForm")[0].reset();
        }
    });
}

function submitPartLists(id) {
    if (numberOfParts === 0) return;
    let command = "Insert Into boughtPart(orderId,partId) Values ";
    for (var i = 0; i < numberOfParts; i++) {
        let val = $(`#pNum${i}`);
        if (val.length) command += `("${id}", "${val.eq(0).val()}"),`;
    }
    command = command.substring(0, command.length - 1) + ";";
    sendRequest(command, (data)=> {
        if (data.response !== "true") {
            alert("Database rejected the order's components.");
            return;
        }
        numberOfParts = 0;
        $("#supplierAddForm")[0].reset();
    });
}

function checkIdUnlock(box) {
    locked = !box.checked;
    $("#supplierID").attr("disabled", locked);
    if (locked) $("#supplierID").val("");
}