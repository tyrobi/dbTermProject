<?php

// Required to sort out the non static "relative include" situation
include_once(realpath(dirname(__FILE__))."/../../htpasswd/db.inc");

function request($query)
{
  $db = contactDb();
  if (mysqli_connect_errno() || ($db == null))
  {
    printf("Database connection failed: %s<br>
           Connection script now terminating.",
           mysqli_connect_error());
    exit(0);
  }

  $db->query("use tj_robinson;");

  $val = $db->query($query);
  if (gettype($val) == 'boolean')
  {
    $db->close();
    return $val;
  }
  $rows = array();
  while($r = mysqli_fetch_assoc($val)) {
      $rows[] = $r;
  }

  $db->close();
  return $rows;
}

// If posted with a given query
if (isset($_POST["query"]))
{
  $req = $_POST["query"];
  echo json_encode(request($req));
}
?>