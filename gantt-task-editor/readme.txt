Код не рефакторенный, собрано на коленке)

Данные для текущего состояния берутся из data.json в корне проекта.
к сожалению не смог добиться того, чтобы при изменениях данные автоматически сразу писались в json.
однако есть библиотека dataProcessor, которая инициализируется с этим "гантом" и может писать данные сразу в базу.
база состоит из двух таблиц - задачи и связи

таблица "задачи":
id
text
start_date
duration
progress
sortorder
parent
ключ - id

таблица "связи":
id
source
target
type
ключ - id

сама база подключается в файле connector/data.php
$res=mysql_connect("localhost","root","") or die ("Unable to connect!");
mysql_select_db("gantt");

чтобы инициализировать связь с базой, в файле index.php нужно раскомментировать строки 62-64
        gantt.load('connector/data.php');  //подключение базы данных
	var dp = new dataProcessor("connector/data.php"); //экземпляр обработчика данных для подключённой базы
	dp.init(gantt);  //связываем обработчик с текущим объектом диаграмм

и соответственно закомментировать 
	gantt.load("data.json", "json");


с базой протестировал, всё работает отлично.



это GPL версия плагина (есть и коммерческая, туда не лез)
если в файле index.html раскомментировать строки с 16й по 57ю, то календарь смасштабируется до часов на задачи.
из всех готовых решений, на мой взгляд, это лучшее. достаточно гибкое и функциональное.





p.s.
на всякий случай прикрепляю готовые sql запросы для таблиц :)


CREATE TABLE `gantt_tasks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(255) NOT NULL,
  `start_date` datetime NOT NULL,
  `duration` int(11) NOT NULL,
  `progress` float NOT NULL,
  `sortorder` int(11) NOT NULL,
  `parent` int(11) NOT NULL,
  PRIMARY KEY (`id`)
)


CREATE TABLE `gantt_links` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `source` int(11) NOT NULL,
  `target` int(11) NOT NULL,
  `type` varchar(1) NOT NULL,
  PRIMARY KEY (`id`)
)

