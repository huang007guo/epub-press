CREATE TABLE `books` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(200) DEFAULT NULL,
  `sections` text,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  `uid` varchar(100) DEFAULT '123456',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;
