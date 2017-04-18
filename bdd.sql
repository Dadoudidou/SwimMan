-- MySQL dump 10.13  Distrib 5.7.9, for Win64 (x86_64)
--
-- Host: localhost    Database: myassoc
-- ------------------------------------------------------
-- Server version	5.7.11-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `activities`
--

DROP TABLE IF EXISTS `activities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `activities` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `category_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activities`
--

LOCK TABLES `activities` WRITE;
/*!40000 ALTER TABLE `activities` DISABLE KEYS */;
INSERT INTO `activities` VALUES (6,'Natation Sportive',11),(7,'Water-Polo',11),(8,'Natation',12),(9,'Aquagym',12),(10,'Entraîneurs',13);
/*!40000 ALTER TABLE `activities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `activities_categories`
--

DROP TABLE IF EXISTS `activities_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `activities_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `season_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activities_categories`
--

LOCK TABLES `activities_categories` WRITE;
/*!40000 ALTER TABLE `activities_categories` DISABLE KEYS */;
INSERT INTO `activities_categories` VALUES (11,'Compétition',1),(12,'Loisir',1),(13,'Bénévoles',1);
/*!40000 ALTER TABLE `activities_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `activities_places`
--

DROP TABLE IF EXISTS `activities_places`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `activities_places` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `adress` text,
  `postalcode` varchar(5) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activities_places`
--

LOCK TABLES `activities_places` WRITE;
/*!40000 ALTER TABLE `activities_places` DISABLE KEYS */;
INSERT INTO `activities_places` VALUES (1,'Centre Nautique Raymond Boisdé','8 avenue du 11 Novembre 1918','18000','Bourges'),(3,'Piscine des gibjoncs','rue de Turly','18000','Bourges');
/*!40000 ALTER TABLE `activities_places` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `activities_sections`
--

DROP TABLE IF EXISTS `activities_sections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `activities_sections` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `activity_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activities_sections`
--

LOCK TABLES `activities_sections` WRITE;
/*!40000 ALTER TABLE `activities_sections` DISABLE KEYS */;
INSERT INTO `activities_sections` VALUES (12,'Benjamins',6),(13,'Minimes',6),(14,'Cadets',6),(15,'Masters',6),(16,'Passport de l\'eau',6),(17,'Water-Polo',7),(18,'Adultes',8),(19,'Ados',8),(20,'Parents Nageurs',8),(21,'Aquaforme',9),(22,'Aquapalming',9),(23,'Entraîneurs',10);
/*!40000 ALTER TABLE `activities_sections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `activities_sessions`
--

DROP TABLE IF EXISTS `activities_sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `activities_sessions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `day` int(11) NOT NULL,
  `start` time NOT NULL,
  `end` time NOT NULL,
  `place_id` int(11) NOT NULL,
  `section_id` int(11) NOT NULL,
  `nbSlots` int(11) NOT NULL DEFAULT '0',
  `periodeStart` date NOT NULL,
  `periodeEnd` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activities_sessions`
--

LOCK TABLES `activities_sessions` WRITE;
/*!40000 ALTER TABLE `activities_sessions` DISABLE KEYS */;
INSERT INTO `activities_sessions` VALUES (12,2,'19:00:00','20:00:00',3,16,20,'2015-09-01','2016-06-20'),(13,4,'19:00:00','20:00:00',1,16,20,'2015-09-01','2016-06-20'),(14,2,'20:00:00','21:30:00',1,17,50,'2015-09-01','2016-06-20'),(15,4,'20:00:00','22:00:00',1,17,50,'2015-09-01','2016-06-20'),(16,1,'20:15:00','21:00:00',3,21,20,'2015-09-01','2016-06-20'),(17,2,'20:30:00','21:15:00',3,21,20,'2015-09-01','2016-06-20'),(18,3,'20:30:00','21:15:00',3,21,20,'2015-09-01','2016-06-20'),(19,4,'20:30:00','21:15:00',3,21,20,'2015-09-01','2016-06-20'),(20,5,'21:00:00','21:45:00',3,21,20,'2015-09-01','2016-06-20'),(21,2,'19:00:00','22:00:00',1,16,20,'2016-09-01','2017-06-20');
/*!40000 ALTER TABLE `activities_sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `factures`
--

DROP TABLE IF EXISTS `factures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `factures` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `family_id` int(11) NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `factures`
--

LOCK TABLES `factures` WRITE;
/*!40000 ALTER TABLE `factures` DISABLE KEYS */;
INSERT INTO `factures` VALUES (1,1,'2016-04-22 15:34:33');
/*!40000 ALTER TABLE `factures` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `factures_details`
--

DROP TABLE IF EXISTS `factures_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `factures_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `facture_id` int(11) NOT NULL,
  `label` varchar(255) NOT NULL,
  `description` text,
  `amount` double NOT NULL,
  `order` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `factures_details`
--

LOCK TABLES `factures_details` WRITE;
/*!40000 ALTER TABLE `factures_details` DISABLE KEYS */;
INSERT INTO `factures_details` VALUES (1,1,'David - Passport de l\'eau','valable du 01 septembre 2015 au 31 juillet 2016\nMardi de 19:00 à 20:00 - Piscine des gibjoncs\nJeudi de 19:00 à 20:00 - Centre Nautique Raymond Boisdé\n',200,1),(2,1,'T-Shirt pour compétiteurs',NULL,10,2),(3,1,'Licence fédérale plus de 10 ans',NULL,34,3),(4,1,'Claire - Aquaforme','valable du 01 avril 2016 au 30 juin 2016\nLundi de 20:15 à 21:00 - Piscine des gibjoncs\n',65,4),(5,1,'2ème adhérent',NULL,-10,5),(6,1,'Licence fédérale plus de 10 ans',NULL,34,6),(7,1,'Truc - Passport de l\'eau','valable du 01 septembre 2015 au 31 juillet 2016\nMardi de 19:00 à 20:00 - Piscine des gibjoncs\nJeudi de 19:00 à 20:00 - Centre Nautique Raymond Boisdé\n',200,7),(8,1,'Truc - Aquaforme','valable du 01 septembre 2015 au 30 juin 2016\nCarte de 10 séances\n',70,8),(9,1,'Réduction 2ème adhésion',NULL,-35,9),(10,1,'T-Shirt pour compétiteurs',NULL,10,10),(11,1,'3ème adhérent',NULL,-25,11),(12,1,'Licence fédérale 10 ans et moins',NULL,21,12);
/*!40000 ALTER TABLE `factures_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `factures_payments`
--

DROP TABLE IF EXISTS `factures_payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `factures_payments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `facture_id` int(11) NOT NULL,
  `type` varchar(45) NOT NULL,
  `amount` double NOT NULL,
  `cashDate` date NOT NULL,
  `modified` datetime NOT NULL,
  `opt_reference` varchar(45) DEFAULT NULL,
  `opt_bank` varchar(45) DEFAULT NULL,
  `validate` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `factures_payments`
--

LOCK TABLES `factures_payments` WRITE;
/*!40000 ALTER TABLE `factures_payments` DISABLE KEYS */;
/*!40000 ALTER TABLE `factures_payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `logs`
--

DROP TABLE IF EXISTS `logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `logs` (
  `id` bigint(20) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `date` datetime NOT NULL,
  `level` varchar(10) DEFAULT NULL,
  `message` varchar(45) DEFAULT NULL,
  `detail` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logs`
--

LOCK TABLES `logs` WRITE;
/*!40000 ALTER TABLE `logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `members`
--

DROP TABLE IF EXISTS `members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `members` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `last_name` varchar(45) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `birthday` date DEFAULT NULL,
  `male` tinyint(1) NOT NULL DEFAULT '1',
  `adress` text,
  `postalcode` varchar(5) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `members`
--

LOCK TABLES `members` WRITE;
/*!40000 ALTER TABLE `members` DISABLE KEYS */;
INSERT INTO `members` VALUES (1,'Violet','David','1984-11-29',1,'105 avenue Marcel Haegelen\nRes Moult Joie - Esc B','18000','Bourges'),(2,'Bonnot','Claire','1985-03-26',0,NULL,NULL,NULL),(3,'Bidule','Truc','2010-02-28',1,NULL,NULL,NULL);
/*!40000 ALTER TABLE `members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `members_adhesions`
--

DROP TABLE IF EXISTS `members_adhesions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `members_adhesions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) DEFAULT NULL,
  `member_id` int(11) DEFAULT NULL,
  `section_id` int(11) DEFAULT NULL,
  `temporary` tinyint(1) NOT NULL DEFAULT '1',
  `validate` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `members_adhesions`
--

LOCK TABLES `members_adhesions` WRITE;
/*!40000 ALTER TABLE `members_adhesions` DISABLE KEYS */;
INSERT INTO `members_adhesions` VALUES (4,9,2,21,0,0),(5,1,3,16,0,0),(6,1,1,16,0,0),(7,11,3,21,0,0);
/*!40000 ALTER TABLE `members_adhesions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `members_adhesions_sessions`
--

DROP TABLE IF EXISTS `members_adhesions_sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `members_adhesions_sessions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `adhesion_id` int(11) NOT NULL,
  `session_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `members_adhesions_sessions`
--

LOCK TABLES `members_adhesions_sessions` WRITE;
/*!40000 ALTER TABLE `members_adhesions_sessions` DISABLE KEYS */;
INSERT INTO `members_adhesions_sessions` VALUES (1,1,14),(2,1,15),(3,2,16),(4,3,18),(5,4,16),(6,5,12),(7,5,13),(8,6,12),(9,6,13);
/*!40000 ALTER TABLE `members_adhesions_sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `members_families`
--

DROP TABLE IF EXISTS `members_families`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `members_families` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `adress` text,
  `postalcode` varchar(5) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `temporary` tinyint(1) NOT NULL DEFAULT '1',
  `validate` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `members_families`
--

LOCK TABLES `members_families` WRITE;
/*!40000 ALTER TABLE `members_families` DISABLE KEYS */;
INSERT INTO `members_families` VALUES (1,'105 res Moult Joie Esc B avenue Marcel Haegelen','18000','Bourges',0,0);
/*!40000 ALTER TABLE `members_families` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `members_metas`
--

DROP TABLE IF EXISTS `members_metas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `members_metas` (
  `member_id` int(11) NOT NULL,
  `col_key` varchar(45) NOT NULL,
  `col_value` text,
  PRIMARY KEY (`member_id`,`col_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `members_metas`
--

LOCK TABLES `members_metas` WRITE;
/*!40000 ALTER TABLE `members_metas` DISABLE KEYS */;
INSERT INTO `members_metas` VALUES (1,'comments','Voici un petit commentaire \n\ntout simple'),(1,'email','david.violet@groupe-lacour.fr'),(1,'job','Analyste Programmeur'),(1,'job_company','Lacour Concept'),(1,'licence','212185'),(1,'phone_first',NULL),(1,'phone_second','06.02.09.64.52'),(2,'email','clairebonnot18@gmail.com'),(2,'licence','000001'),(2,'phone_first','0102030405');
/*!40000 ALTER TABLE `members_metas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `members_order_rules`
--

DROP TABLE IF EXISTS `members_order_rules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `members_order_rules` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_rule_id` int(11) NOT NULL,
  `family_id` int(11) DEFAULT NULL,
  `member_id` int(11) DEFAULT NULL,
  `adhesion_id` int(11) DEFAULT NULL,
  `temporary` tinyint(1) NOT NULL DEFAULT '1',
  `validate` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `members_order_rules`
--

LOCK TABLES `members_order_rules` WRITE;
/*!40000 ALTER TABLE `members_order_rules` DISABLE KEYS */;
INSERT INTO `members_order_rules` VALUES (1,3,NULL,1,NULL,0,0),(2,2,NULL,1,NULL,0,0),(3,5,NULL,2,NULL,0,0),(4,2,NULL,2,NULL,0,0),(5,3,NULL,3,NULL,0,0),(6,6,NULL,3,NULL,0,0),(7,1,NULL,3,NULL,0,0),(8,4,NULL,NULL,7,0,0);
/*!40000 ALTER TABLE `members_order_rules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date_from` date NOT NULL,
  `date_to` date NOT NULL,
  `restriction_session_min` int(11) DEFAULT NULL,
  `restriction_session_max` int(11) DEFAULT NULL,
  `restriction_section_id` int(11) DEFAULT NULL,
  `restriction_activity_id` int(11) DEFAULT NULL,
  `restriction_category_id` int(11) DEFAULT NULL,
  `is_card` tinyint(1) DEFAULT '0',
  `card_nb_session` int(11) DEFAULT NULL,
  `amount` double NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COMMENT='Liste des tarifs.';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'2015-09-01','2016-07-31',NULL,NULL,16,NULL,NULL,0,0,200),(2,'2015-09-01','2016-07-31',NULL,NULL,17,NULL,NULL,0,0,200),(3,'2015-09-01','2016-07-31',1,1,21,NULL,NULL,0,0,175),(4,'2015-09-01','2016-07-31',2,2,21,NULL,NULL,0,0,330),(5,'2015-09-01','2015-12-31',1,1,21,NULL,NULL,0,0,85),(6,'2015-09-01','2015-12-31',2,2,21,NULL,NULL,0,0,160),(7,'2016-01-01','2016-03-31',1,1,21,NULL,NULL,0,0,65),(8,'2016-01-01','2016-03-31',2,2,21,NULL,NULL,0,0,120),(9,'2016-04-01','2016-06-30',1,1,21,NULL,NULL,0,0,65),(10,'2016-04-01','2016-06-30',2,2,21,NULL,NULL,0,0,120),(11,'2015-09-01','2016-06-30',NULL,NULL,21,NULL,NULL,1,10,70),(12,'2016-09-01','2017-06-30',2,2,21,NULL,NULL,0,0,250);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders_rules`
--

DROP TABLE IF EXISTS `orders_rules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders_rules` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date_from` date DEFAULT NULL,
  `date_to` date DEFAULT NULL,
  `description` varchar(255) NOT NULL,
  `restriction_category_id` int(11) DEFAULT NULL,
  `restriction_activity_id` int(11) DEFAULT NULL,
  `restriction_section_id` int(11) DEFAULT NULL,
  `restriction_age` int(11) DEFAULT NULL,
  `restriction_age_operator` varchar(2) DEFAULT NULL,
  `restriction_days` varchar(13) DEFAULT NULL COMMENT 'Liste des jours de la semaine "1,2,3,4,5,6,7" séparés d''une virgule',
  `restriction_member_nb` int(11) DEFAULT NULL,
  `restriction_member_nb_operator` varchar(2) DEFAULT NULL,
  `restriction_adhesion_nb` int(11) DEFAULT NULL,
  `restriction_adhesion_nb_operator` varchar(2) DEFAULT NULL,
  `action_amount_fix` double DEFAULT NULL,
  `action_amount` double DEFAULT NULL,
  `action_amount_pourcent` double DEFAULT NULL,
  `apply_on_family` tinyint(1) NOT NULL DEFAULT '0',
  `apply_on_member` tinyint(1) NOT NULL DEFAULT '1',
  `apply_on_adhesion` tinyint(1) NOT NULL DEFAULT '0',
  `order` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COMMENT='Règles appliquées pour des réductions, et autres ...';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders_rules`
--

LOCK TABLES `orders_rules` WRITE;
/*!40000 ALTER TABLE `orders_rules` DISABLE KEYS */;
INSERT INTO `orders_rules` VALUES (1,'2015-09-01','2016-07-31','Licence fédérale 10 ans et moins',NULL,NULL,NULL,10,'<=',NULL,NULL,NULL,NULL,NULL,NULL,21,NULL,0,1,0,9),(2,'2015-09-01','2016-07-31','Licence fédérale plus de 10 ans',NULL,NULL,NULL,10,'>',NULL,NULL,NULL,NULL,NULL,NULL,34,NULL,0,1,0,9),(3,'2015-09-01','2016-07-31','T-Shirt pour compétiteurs',11,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,10,NULL,0,1,0,0),(4,'2015-09-01','2016-07-31','Réduction 2ème adhésion',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2,'==',NULL,NULL,-50,0,0,1,0),(5,'2015-09-01','2016-07-31','2ème adhérent',NULL,NULL,NULL,NULL,NULL,NULL,2,'==',NULL,NULL,NULL,-10,NULL,0,1,0,0),(6,'2015-09-01','2016-07-31','3ème adhérent',NULL,NULL,NULL,NULL,NULL,NULL,3,'==',NULL,NULL,NULL,-25,NULL,0,1,0,0),(7,'2015-09-01','2016-07-31','4ème adhérent',NULL,NULL,NULL,NULL,NULL,NULL,4,'==',NULL,NULL,NULL,-40,NULL,0,1,0,0),(8,'2015-09-01','2016-07-31','5ème adhérent et plus',NULL,NULL,NULL,NULL,NULL,NULL,5,'>=',NULL,NULL,NULL,NULL,-50,0,1,0,0);
/*!40000 ALTER TABLE `orders_rules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seasons`
--

DROP TABLE IF EXISTS `seasons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `seasons` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `start` datetime NOT NULL,
  `end` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seasons`
--

LOCK TABLES `seasons` WRITE;
/*!40000 ALTER TABLE `seasons` DISABLE KEYS */;
INSERT INTO `seasons` VALUES (1,'2016-09-01 00:00:01','2017-07-31 00:00:01');
/*!40000 ALTER TABLE `seasons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pseudo` varchar(45) NOT NULL,
  `mdp` varchar(255) NOT NULL,
  `last_connected` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'dadou','dadou','2017-04-16 09:47:26');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_groups`
--

DROP TABLE IF EXISTS `users_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_groups`
--

LOCK TABLES `users_groups` WRITE;
/*!40000 ALTER TABLE `users_groups` DISABLE KEYS */;
INSERT INTO `users_groups` VALUES (1,'super administrateur');
/*!40000 ALTER TABLE `users_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_groups_permissions_relationships`
--

DROP TABLE IF EXISTS `users_groups_permissions_relationships`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_groups_permissions_relationships` (
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`group_id`,`permission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_groups_permissions_relationships`
--

LOCK TABLES `users_groups_permissions_relationships` WRITE;
/*!40000 ALTER TABLE `users_groups_permissions_relationships` DISABLE KEYS */;
INSERT INTO `users_groups_permissions_relationships` VALUES (1,1);
/*!40000 ALTER TABLE `users_groups_permissions_relationships` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_groups_relationships`
--

DROP TABLE IF EXISTS `users_groups_relationships`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_groups_relationships` (
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`,`group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_groups_relationships`
--

LOCK TABLES `users_groups_relationships` WRITE;
/*!40000 ALTER TABLE `users_groups_relationships` DISABLE KEYS */;
INSERT INTO `users_groups_relationships` VALUES (1,1);
/*!40000 ALTER TABLE `users_groups_relationships` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_permissions`
--

DROP TABLE IF EXISTS `users_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_permissions`
--

LOCK TABLES `users_permissions` WRITE;
/*!40000 ALTER TABLE `users_permissions` DISABLE KEYS */;
INSERT INTO `users_permissions` VALUES (1,'*','tous les droits');
/*!40000 ALTER TABLE `users_permissions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-04-18 12:47:36
