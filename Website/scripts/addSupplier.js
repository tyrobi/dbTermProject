let numberPhoneInputs = 0;

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

}

function checkIdUnlock() {

}