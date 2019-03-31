/* Send commands and receive output directly from the MySQL server.
 * @param request The MySQL command to issue
 * @param callback The function to handle the XML response
 * @param unsafe Function will pass all errors to the callback (debugging)
 *
 * *NOTE* response is in XML form, important properties will likely be
 *        'status' or 'response' (see getTable())
 */
function sendRequest(request, callback=_log, unsafe=false) {
    let xreq = new XMLHttpRequest();
    xreq.onreadystatechange = () => {
        if(xreq.readyState == 4) {
            if (xreq.status == 200)
                callback(xreq);
            else
                _log(xreq);
        }
    }
    xreq.open("POST", "scripts/db.php", true); // Allow async calls & updates
    xreq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xreq.send("query="+request);
}

/* Default callback for sendRequest */
function _log(data) {
    console.log(`Request completed (${data.status}): ${data.response}`);
}

/* Return parsed response as object with attributes as .keys and .data */
function getTable(xreq) {
    let objArr = JSON.parse(xreq.response);
    if (objArr === false || !objArr)
    {
        console.error("Database Request failed");
        return {
            keys: ["ErrorMessage"],
            data: [{"ErrorMessage": "Request to the Server failed."}]
        }
    }
    let keyData = ["empty"];
    if (objArr.length !== 0)
        keyData = Object.keys(objArr[0]);
    return {
        keys: keyData,
        data: objArr
    };
}