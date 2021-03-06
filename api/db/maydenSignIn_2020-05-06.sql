# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.29)
# Database: maydenSignIn
# Generation Time: 2020-05-06 14:33:43 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table admins
# ------------------------------------------------------------

DROP TABLE IF EXISTS `admins`;

CREATE TABLE `admins` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `passcode` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;

INSERT INTO `admins` (`id`, `passcode`)
VALUES
	(1,'$2y$10$dmOo8vCN78.EJgCOk8bG0OpXbV0ni.N0rR3Up5qiCYU3ITH9VbYUW');

/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table visitors
# ------------------------------------------------------------

DROP TABLE IF EXISTS `visitors`;

CREATE TABLE `visitors` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `Name` varchar(256) NOT NULL DEFAULT '',
  `Company` varchar(256) DEFAULT '',
  `DateOfVisit` date NOT NULL DEFAULT '2999-12-25',
  `TimeOfSignIn` time NOT NULL DEFAULT '00:00:00',
  `TimeOfSignOut` time NOT NULL DEFAULT '00:00:00',
  `SignedIn` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `visitors` WRITE;
/*!40000 ALTER TABLE `visitors` DISABLE KEYS */;

INSERT INTO `visitors` (`id`, `Name`, `Company`, `DateOfVisit`, `TimeOfSignIn`, `TimeOfSignOut`, `SignedIn`)
VALUES
	(1,'Charlie','Mayden','2020-04-22','23:59:59','12:43:43',1),
	(2,'Daniella','Gulp','2020-04-22','13:59:59','15:43:43',0),
	(3,'Chris','OfficeSpot','2020-04-22','23:59:59','23:59:59',0),
	(4,'Lucy','','2020-04-22','23:59:59','15:28:14',0),
	(5,'David','Microsoft','2020-04-22','14:55:00','00:00:00',1);

/*!40000 ALTER TABLE `visitors` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
