<!DOCTYPE html>
<!-- Evan Farrell, Jordan Dempsey & Tyler Robinson -->
<!-- A00399310 -->
<html lang="en">
    <?php include("common/header.html") ?>
<body>

<?php include("common/nav.html") ?>
  <div class="container" style="margin-top:30px">
    <div class="row">
      <div class="col-md-6 col-sm-6">
        <div class="btn-group dropdown" data-toggle="buttons">
        <button id="table-label" type="button" class="btn btn-secondary btn-dark btn-lg  dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Selected: Parts
        </button>
        <div id="table-select-edit" class="dropdown-menu" data-toggle="buttons" aria-labelledby="table-label">
        </div>
      </div>
      </div>
      <div class="col-md-6 col-sm-6">
        <label for="action-type">Action: </label>
        <div id="action-type" class="btn-group btn-group-toggle" data-toggle="buttons">
          <label class="btn btn-secondary btn-dark active">
            <input type="radio" name="action-type" onchange="modChange()" value="insert" checked> Insert
          </label>
          <label class="btn btn-secondary btn-dark">
            <input type="radio" name="action-type" onchange="modChange()" value="delete"> Remove
          </label>
          <label class="btn btn-secondary btn-dark">
            <input type="radio" name="action-type" onchange="modChange()" value="modify"> Alter
          </label>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12" style="margin-top: 2ex;">
        <form id="table-area" onsubmit="return submitQuery()">
        </form>
      </div>
    </div>
  </div>
<script src="scripts/edit.js">
</script>
<?php include("common/footer.html") ?>
</body>
</html>