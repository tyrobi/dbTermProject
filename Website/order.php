<!DOCTYPE html>
<!-- Evan Farrell, Jordan Dempsey & Tyler Robinson -->
<!-- A00399310 -->
<html lang="en">
    <?php include("common/header.html") ?>
<body>

<?php include("common/nav.html") ?>
  <script src="scripts/addOrder.js"></script>
  <div class="container" style="margin-top:30px">
    <button class="btn btn-dark btn-lg" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
      Order Parts
    </button>
    <div class="collapse" id="collapseExample">
      <div class="card card-body">
        Use this form to request parts from any certified MUC &copy; supplier, referenced by internal ID for convenience. (For me, not you.)
      </div>
    </div>
    <form class="db-form" id="supplierAddForm">
      <fieldset>
        <legend>Supplier</legend>
        <div class="form-group">
          <label for="supplierID">Supplier's Internal ID</label>
          <input id="supplierID" type="text" placeholder="ID value" required>
        </div>
      </fieldset>
      <fieldset>
        <legend>Parts</legend>
        <div id="partEntry" class="form-group">
        </div>
        <input type="button" id="newPart" class="btn btn-dark" value="+" onclick="addPart()">
      </fieldset>
      <div class="form-group">
        <input type="button" class="btn btn-success" value="Submit Order" onclick="onSubmit();">
        <input type="reset" class="btn btn-dark" value="Clear Table">
      </div>
    </form>
  </div>
<?php include("common/footer.html") ?>
</body>
</html>