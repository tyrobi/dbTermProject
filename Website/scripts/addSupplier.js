let numberPhoneInputs = 0;
let locked = true;

function addPhoneNumber() {
    str = `<p id="p${numberPhoneInputs}"><input id="pNum${numberPhoneInputs}" type="text" placeholder="Phone Number" required>
            <input type="button" class="btn btn-dark" onclick="removePhoneNumber(${numberPhoneInputs}); return false;" value="-"><br></p>` ;
    numberPhoneInputs++;
    $("#phoneNumberEntry").append(str);
}

function removePhoneNumber(val) {
    $(`#p${val}`).remove();
}

function onSubmit() {
    let command = `Insert Into suppliers(`
    if (!locked) command += "supplierId,";
    command += "name,email) Values ('";
    if (!locked) command += $("#supplierId").val() + "','";
    command += $("#supplierName").val() + "','";
    command += $("#supplierEmail").val() + "');";
    log(command);
    sendRequest(command, (data)=>{
        if (data.response !== "true") {
            alert("Database rejected the new supplier.");
            return;
        }
        else if (numberPhoneInputs > 0) {
            sendRequest(`Select supplierId from suppliers order by supplierId desc limit 1;`, (resp) => {
                let r = getTable(resp);
                let id = r.data[0].supplierId;
                if (!locked) id = $("#supplierId").val();
                log(id);
                submitPhoneNumbers(id);
            });
        } else {
            $("#supplierAddForm")[0].reset();
            $("#phoneNumberEntry").empty();
        }
    });
}

function submitPhoneNumbers(id) {
    if (numberPhoneInputs === 0) return;
    let command = "Insert Into phoneNumbers(supplierId, phoneNumber) Values ";
    for (var i = 0; i < numberPhoneInputs; i++) {
        let val = $(`#pNum${i}`);
        if (val.length) command += `("${id}", "${val.eq(0).val()}"),`;
    }
    command = command.substring(0, command.length - 1) + ";";
    sendRequest(command, (data)=> {
        if (data.response !== "true") {
            alert("Database rejected the new supplier's phone numbers.");
            return;
        }
        numberPhoneInputs = 0;
        $("#supplierAddForm")[0].reset();
        $("#phoneNumberEntry").empty();
    });
}

function checkIdUnlock(box) {
    locked = !box.checked;
    $("#supplierID").attr("disabled", locked);
    if (locked) $("#supplierID").val("");
}