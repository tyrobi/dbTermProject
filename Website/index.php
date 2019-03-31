<!DOCTYPE html>
<!-- Evan Farrell, Jordan Dempsey & Tyler Robinson -->
<!-- A00399310 -->
<html lang="en">
    <?php include("common/header.html") ?>
<body>

<?php include("common/nav.html") ?>

<div class="container" style="margin-top:30px">
  <div class="row">
    <div class="col-sm-6 col-md-3">
      <div class="btn-group dropdown" data-toggle="buttons">
        <button id="tableDropdown" type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Select Table
        </button>
        <div id="table-select" class="dropdown-menu" data-toggle="buttons" aria-labelledby="tableDropdown">
        </div>
      </div>
    </div>
    <div class="col-md-3 col-sm-6">
      <label for="per-page">Items per page</label>
      <div id="per-page" class="btn-group btn-group-toggle" data-toggle="buttons">
        <label class="btn btn-secondary btn-dark active">
          <input type="radio" name="per-page-count" onchange="perPageChange()" value="10" checked> 10
        </label>
        <label class="btn btn-secondary btn-dark">
          <input type="radio" name="per-page-count" onchange="perPageChange()" value="25"> 25
        </label>
        <label class="btn btn-secondary btn-dark">
          <input type="radio" name="per-page-count" onchange="perPageChange()" value="100"> 100
        </label>
      </div>
    </div>
    <div class="col-sm-6 col-md-3">
      <label for="page-select">Page #</label>
      <div id="page-select" class="btn-group btn-group-toggle" data-toggle="buttons">
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-md-12">
      <h2 id="table-label">Table:</h2>
      <table id="database-view" class="table table-hover table-dark">
      </table>
    </div>
  </div>
</div>
<?php include("common/footer.html") ?>
<script src="scripts/tableDisplay.js">
</script>
</body>
</html>
<!-- chapt 10 question 3 (don't show dead weight) -->