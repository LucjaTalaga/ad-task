-- MySQL dump 10.13  Distrib 5.7.31, for Linux (x86_64)
--
-- Host: localhost    Database: ad
-- ------------------------------------------------------
-- Server version	5.7.31-0ubuntu0.18.04.1

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
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tasks` (
  `user_id` int(11) NOT NULL,
  `task` varchar(1024) CHARACTER SET latin1 NOT NULL,
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES (19,'sdsds'),(19,'xD'),(19,'sssss'),(19,'dddd'),(19,'asd'),(19,'asd'),(19,'sdsdsd'),(19,'asd'),(19,'asd'),(19,'sd'),(19,'d'),(19,'sd'),(19,'asd'),(24,'another stuff');
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) CHARACTER SET latin1 NOT NULL,
  `password` varchar(512) CHARACTER SET latin1 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (14,'xD','$2b$10$I366hQpR8m9BXdFa1xNKne7mGOFnxeW/MjZe4AnLOdhrTgRAsGZZK'),(15,'TowLewak@levycovy.cccp','$2b$10$e09VAVu63rUMQl/UJQiGheLkRQHx0K3GV0DxdbPJnTetCSiCo0vsi'),(16,'dupb','$2b$10$Qr1qZIBf7AmwGb8bzr2VK.XVSJ2DCBsDOLa3738IQnR7jTaG4aoF2'),(18,'dupc','$2b$10$PyRSf3Z3tzbt1WAdRPNBEefVBhrAwbBF5L62tShLOWEcT3d9N5L.O'),(19,'heh','$2b$10$8JtZNUqEga1xO5YTztttBOhIOSQOXm2wr13eYiQnEgJ.k6fWyyfBW'),(20,'levycovy','$2b$10$/nAn5V0hmcGV1uQWkLG1huYGao60OXZlYJNRGofh5g7u9nsILg.yK'),(21,'prawaczeq','$2b$10$itpJ8ZILW1lJjLrp8kuM.OpfV2hCMZvELvpz20bz6LJeXOts36G/u'),(22,'pravakov','$2b$10$kMgtF8Pro98SZBezl4Z7OeDnWSF25sqtORbi4kYbn3NERlR/JTmLa'),(23,'korvinov','$2b$10$raEzGsYW4kBe4ekO0FoNuuCAkMjzGbmiquZJ40aVmIfpEoCYnDAiq'),(24,'jp','$2b$10$t72QDum7.7T4214m8z243OC2.6YRnkooiiCgC6bHuSCRNfmYnRiae');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-09-08 21:29:42
