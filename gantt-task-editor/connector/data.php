<?php

include ('gantt_connector.php');

$res=mysql_connect("localhost","root","") or die ("Unable to connect!");
mysql_select_db("gantt");

$gantt = new JSONGanttConnector($res);
$gantt->render_links("gantt_links","id","source,target,type");
$gantt->render_table(
    "gantt_tasks",
    "id",
    "start_date,duration,text,progress,sortorder,parent"
);
?>