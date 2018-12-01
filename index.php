<?php
$m = new \MongoDB\Driver\Manager("mongodb://<TeamFunTime>:<TFT2018>@ds147073.mlab.com:47073/fleetdb");
echo "Database Connected";
var_dump($m);
echo "<p>Data</p>";
$query = new \MongoDB\Driver\Command(['find' => 'vehicles']);
var_dump($cmd);
?>
