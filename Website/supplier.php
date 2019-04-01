<!DOCTYPE html>
<!-- Evan Farrell, Jordan Dempsey & Tyler Robinson -->
<!-- A00399310 -->
<html lang="en">
    <?php include("common/header.html") ?>
<body>

<?php include("common/nav.html") ?>
  <script src="scripts/addSupplier.js"></script>
  <div class="container" style="margin-top:30px">
    <button class="btn btn-dark btn-lg" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
      Add Supplier
    </button>
    <div class="collapse" id="collapseExample">
      <div class="card card-body">
        Use this form to enter a new supplier into our database. Once added, the phone numbers will be stored separately inside the table 'phoneNumbers', and can be accessed via the ID number associated with any given supplier.
      </div>
    </div>
    <form class="db-form" id="supplierAddForm" onsubmit="onSubmit(); return false;">
      <fieldset>
        <legend>Supplier Basic Details</legend>
        <div class="form-group">
          <label for="supplierID">Supplier's Internal ID</label>
          <input id="supplierID" type="text" placeholder="ID value" disabled="">
          <br>
          <label for="supplierName">Name of Supplier</label>
          <input id="supplierName" type="text" placeholder="Name" required>
          <br>
          <label for="supplierEmail">Email address</label>
          <input id="supplierEmail" type="text" placeholder="Email Address" required>
          <br>
        </div>
      </fieldset>
      <fieldset>
        <legend>Supplier Phone Contacts</legend>
        <div id="phoneNumberEntry" class="form-group">
        </div>
        <input type="button" id="newNumber" class="btn btn-dark" value="+" onclick="addPhoneNumber()">
      </fieldset>
        <div class="form-group">
          <input type="submit" class="btn btn-success" value="Submit Changes">
          <input type="reset" class="btn btn-dark" value="Clear Table">
          <label for="idManualMode" style="margin-left: 3ex;">Choose the ID for this entry manually</label>
          <input id="idManualMode"type="checkbox" class="btn btn-dark" value="Manual ID" onclick="checkIdUnlock(this)">
        </div>
    </form>
  </div>
<?php include("common/footer.html") ?>
</body>
</html>