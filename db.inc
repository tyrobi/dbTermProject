<?php
function contactDb() {
    // change these to match yours, then place in /htpasswd/db.inc on CS server
	return mysqli_connect("localhost", "<yourID>", "<yourpassword>", "<yourID>");
}
?>
