<!DOCTYPE html>
<!-- Evan Farrell, Jordan Dempsey & Tyler Robinson -->
<!-- A00399310 -->
<html lang="en">
    <?php include("common/header.html") ?>
<body>

<?php include("common/nav.html") ?>
  <div class="container" style="margin-top:30px">
    <div class="row">
      <div class="col-sm-3">
        <div class="btn-group dropdown" data-toggle="buttons">
        <button id="tableDropdown" type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Select Table
        </button>
        <div id="table-select-edit" class="dropdown-menu" data-toggle="buttons" aria-labelledby="tableDropdown">
        </div>
      </div>
      </div>
      <div class="col-sm-3">
        <h2 id="table-label">Table:</h2>
      </div>
      <div class="col-sm-5">
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
      <div class="col-sm-1" width="2rem"></div>
    </div>
    <div class="row">
      <div class="col-sm-8">
        <form id="table-area" onsubmit="return submitQuery()">
        </form>
      </div>
      <div class="col-sm-1" width="1rem"></div>
  </div>
  <div class="row">
  </div>
</div>
<script src="scripts/edit.js">
</script>
<?php include("common/footer.html") ?>
</body>
</html>
<!-- chapt 10 question 3 (don't show dead weight) -->