/*
SQLyog Ultimate v12.4.1 (64 bit)
MySQL - 10.4.11-MariaDB : Database - db_green
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`db_green_new_two` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `db_green_new_two`;

/*Table structure for table `brands` */

DROP TABLE IF EXISTS `brands`;

CREATE TABLE `brands` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `brands` */

insert  into `brands`(`id`,`name`,`createdAt`,`updatedAt`) values 
(1,'Brand_1',NULL,NULL),
(2,'Brand_2',NULL,NULL),
(3,'Brand_3',NULL,NULL),
(4,'Brand_4',NULL,NULL),
(5,'Brand_5',NULL,NULL);

/*Table structure for table `categories` */

DROP TABLE IF EXISTS `categories`;

CREATE TABLE `categories` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `categories` */

insert  into `categories`(`id`,`name`,`createdAt`,`updatedAt`) values 
(1,'Category_1',NULL,NULL),
(2,'Category_2',NULL,NULL),
(3,'Category_3',NULL,NULL),
(4,'Category_4',NULL,NULL),
(5,'Category_5',NULL,NULL);

/*Table structure for table `colors` */

DROP TABLE IF EXISTS `colors`;

CREATE TABLE `colors` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `colors` */

insert  into `colors`(`id`,`name`,`createdAt`,`updatedAt`) values 
(1,'yellow',NULL,NULL),
(2,'blue',NULL,NULL),
(3,'red',NULL,NULL),
(4,'white',NULL,NULL),
(5,'black',NULL,NULL);


/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'noimage.png',
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `users` */

insert  into `users`(`id`,`first_name`,`last_name`,`email`,`password`,`image`,`createdAt`,`updatedAt`) values 
(1,'Jero','Robertson','jero@email.com','123abc','noimage.png',NULL,NULL),
(2,'Franco','Lacrampette','franco@email.com','123abc','noimage.png',NULL,NULL),
(3,'Ignacio','Danunzio','nacho@email.com','123abc','noimage.png',NULL,NULL),
(4,'Franco Prueba','Lacrampette','pepe@gmail.com','$2a$10$MRgegbejNZDfiBprxjnyPerIJUj/yPspHKhZdCMDn9T4M/j8NNMsO','profile_image_1583283261356.png','2020-03-03 21:54:21','2020-03-03 21:54:21'),
(8,'Jero','Prueba','jeroprueba@hotmail.com','$2a$10$haekmC9XUAi8svFWFsGWW.J2/QNOfNPk80LD2zDHg/2tNrGWgowB6','profile_image_1583449560810.png','2020-03-05 20:06:00','2020-03-05 20:06:00');


/*Table structure for table `products` */

DROP TABLE IF EXISTS `products`;

CREATE TABLE `products` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `list_price` decimal(8,2) NOT NULL,
  `model` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(750) COLLATE utf8_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'noimage.png',
  `width` int(10) unsigned NOT NULL,
  `height` int(10) unsigned NOT NULL,
  `stock` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned DEFAULT NULL,
  `brand_id` int(10) unsigned DEFAULT NULL,
  `color_id` int(10) unsigned DEFAULT NULL,
  `category_id` int(10) unsigned DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `length` int(10) unsigned NOT NULL,
  `weight` int(10) unsigned NOT NULL,
  `sale_price` decimal(8,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `brand_id` (`brand_id`),
  KEY `color_id` (`color_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `products_ibfk_2` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`),
  CONSTRAINT `products_ibfk_3` FOREIGN KEY (`color_id`) REFERENCES `colors` (`id`),
  CONSTRAINT `products_ibfk_4` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `products` */

insert  into `products`(`id`,`name`,`list_price`,`model`,`description`,`image`,`width`,`height`,`stock`,`user_id`,`brand_id`,`color_id`,`category_id`,`createdAt`,`updatedAt`,`length`,`weight`,`sale_price`) values 
(1,'Gatito 1',13300.50,'picante','Lorem ipsum','cat.png',10,10,10,NULL,1,1,1,NULL,NULL,10,5,10500.00),
(2,'Gatito 2',100.55,'suave','Lorem ipsum blablaba sit amet','product_image_1583281474715.png',10,10,45,NULL,4,2,2,NULL,'2020-03-03 21:24:34',10,5,76.50),
(3,'Gatito 3',349.40,'gordito','Lorem ipsum gordito asdsad 213213213 sadsadsads ','product_image_1583281445036.png',10,10,13,NULL,2,1,2,NULL,'2020-03-03 21:24:05',10,5,0.00),
(4,'Gatito 4',400.50,'flaquito','esto es una descripicon de un producot buneisimo','cat.png',10,10,500,NULL,3,4,3,NULL,'2020-03-03 21:30:37',10,5,0.00),
(6,'Gatito 5',12000.00,'prueba','prueba','cat.png',10,10,40,NULL,2,3,2,NULL,NULL,10,10,NULL),
(13,'Prueba final',10500.00,'10','WQALSDNASJDNAJSN','product_image_1582847905583.jpg',11,111,11,NULL,1,1,1,'2020-02-27 20:58:25','2020-02-27 20:58:25',1132,213,9999.00),
(14,'gatitoooo',100.00,'1123','213123','product_image_1582848893552.jpg',213,213,11,NULL,1,1,1,'2020-02-27 21:14:53','2020-02-27 21:14:53',123,312,99.00),
(15,'gatitoooo',100.00,'1123','213123','product_image_1582848913636.jpg',213,213,11,NULL,1,1,1,'2020-02-27 21:15:13','2020-02-27 21:15:13',123,312,99.00),
(16,'prueba',100.00,'sad','asdsad','product_image_1583451770701.png',1,1,11,NULL,1,1,1,'2020-03-05 20:42:50','2020-03-05 20:42:50',1,1,10.00);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
