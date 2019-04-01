<!DOCTYPE html>
<!-- Evan Farrell, Jordan Dempsey & Tyler Robinson -->
<!-- A00399310 -->
<html lang="en">
    <?php include("common/header.html") ?>
<body>

<?php include("common/nav.html") ?>
  <script src="scripts/removeOrder.js"></script>
  <div class="container" style="margin-top:30px">
    <button class="btn btn-dark btn-lg" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
      Cancel Previous Order
    </button>
    <div class="collapse" id="collapseExample">
      <div class="card card-body">
        Use this form to cancel a previous part order. Orders can be cancelled until 3 days after placement with no cost to the client. After this duration of time, <span style="text-decoration: underline;">payment is required.</span>
      </div>
    </div>
    <form class="db-form" id="orderRemoveForm" onsubmit="onSubmit(); return false;">

      <fieldset>
        <legend>Search</legend>
        <label for="orderSearch">Order Number: </label>
        <input id="orderSearch" type="text" placeholder="Order Number">
        <input type="button" class="btn btn-dark" value="Search" onclick="searchForOrders()">
      </fieldset>
      <fieldset>
        <legend>Supplier</legend>
        <div class="form-group">
          <label for="supplierID">Supplier's Internal ID</label>
          <input id="supplierID" type="text" placeholder="ID value" readonly=""> <br>
          <label for="dateFiled">Date request was received</label>
          <input id="dateFiled" type="date" placeholder="Date" readonly="">
        </div>
      </fieldset>
      <fieldset>
        <legend>Parts</legend>
        <div id="partEntry" class="form-group">
        </div>
      </fieldset>
      <div class="form-group">
        <input id="cancelOrderButton" type="submit" class="btn btn-warning" value="Cancel Order" disabled>
      </div>
    </form>
  </div>
<?php include("common/footer.html") ?>
</body>
</html>
