<?php
// Node version

echo "Parameter:".$argv[1]."\n";
echo "Node version...\n\n";

$output="";

exec("node -v", $output); 

echo implode(" ",$output);

?>