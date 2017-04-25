/*
SQLyog 企业版 - MySQL GUI v8.14 
MySQL - 5.1.26-rc-community : Database - gessato
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`gessato` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `gessato`;

/*Table structure for table `addres` */

DROP TABLE IF EXISTS `addres`;

CREATE TABLE `addres` (
  `address_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `address_name` varchar(10) NOT NULL,
  `address_concrete` varchar(30) NOT NULL,
  `address_tel` int(11) NOT NULL,
  `address_pre` varchar(20) NOT NULL,
  `address_city` varchar(20) NOT NULL,
  `address_area` varchar(20) DEFAULT NULL,
  `address_num` int(11) DEFAULT NULL,
  PRIMARY KEY (`address_id`),
  KEY `FK_Reference_26` (`user_id`),
  CONSTRAINT `FK_Reference_26` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;

/*Data for the table `addres` */

insert  into `addres`(`address_id`,`user_id`,`address_name`,`address_concrete`,`address_tel`,`address_pre`,`address_city`,`address_area`,`address_num`) values (1,1,'nwabfajefl','2147483647',0,'四川','成都','武侯区',629100),(2,1,'mosh','天府三街',2147483647,'河南','漯河','郾城区',NULL),(9,1,'swamm','15680902667',0,'山西','大同','南郊区',NULL),(10,1,'mosh','1235566',134567,'浙江','绍兴','新昌县',NULL),(11,1,'12345','hgfjuytukiu',134356576,'天津','河西区',NULL,NULL),(12,1,'124565','24546646',21345,'天津','河东区',NULL,NULL),(13,1,'234577','hnjm',356,'天津','南开区',NULL,NULL),(14,1,'tan','y6yh',124454,'黑龙江','鹤岗','兴安区',NULL),(15,1,'324','43256',1245,'河北','邢台','临城县',NULL),(16,1,'32443','hthhh',4445,'吉林','通化','通化县',NULL),(17,1,'1324455','3455',2345,'吉林','辽源','西安区',NULL),(18,1,'sdasdsa','sadsdsad',12321323,'北京','崇文区',NULL,312312),(19,1,'cai','成都',123123123,'湖北','仙桃','仙桃',11313),(20,1,'12345','134发给他改变',1231434,'山西','阳泉','郊区',NULL),(21,1,'儿','隔壁',13241,'天津','河东区',NULL,NULL),(22,1,'34215','儿童团',32435,'山西','晋中','和顺县',NULL),(23,1,'4356','24676578',34567,'山西','长治',NULL,NULL),(24,1,'123224','34567',345,'河北','邢台','临城县',NULL),(25,1,'2134','3224536768',32453,'河北','邢台','邢台县',NULL),(26,1,'2131445','231536',2345,'辽宁','丹东','宽甸满族自治县',NULL),(27,1,'111','111',111,'四川','成都','武侯区',111),(28,1,'gjfas','gdkdfksvxzla',123984090,'黑龙江','大庆','让胡路区',21141);

/*Table structure for table `collect` */

DROP TABLE IF EXISTS `collect`;

CREATE TABLE `collect` (
  `collect_id` int(11) NOT NULL AUTO_INCREMENT,
  `prd_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `collect_data` date NOT NULL,
  `is_expired` int(11) DEFAULT NULL,
  PRIMARY KEY (`collect_id`),
  KEY `FK_Reference_21` (`prd_id`),
  KEY `FK_Reference_25` (`user_id`),
  CONSTRAINT `FK_Reference_21` FOREIGN KEY (`prd_id`) REFERENCES `product_details` (`prd_id`),
  CONSTRAINT `FK_Reference_25` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

/*Data for the table `collect` */

/*Table structure for table `colors` */

DROP TABLE IF EXISTS `colors`;

CREATE TABLE `colors` (
  `col_id` int(11) NOT NULL AUTO_INCREMENT,
  `col_name` varchar(20) NOT NULL,
  `col_url` varchar(50) NOT NULL,
  PRIMARY KEY (`col_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

/*Data for the table `colors` */

insert  into `colors`(`col_id`,`col_name`,`col_url`) values (1,'白色','images/white.jpg'),(2,'黑色','images/black.jpg'),(3,'蓝色','images/bule.jpg'),(4,'褐色','images/brown.jpg'),(5,'咖啡色','images/coffee.jpg'),(6,'红色','images/red.jpg'),(7,'黄色','images/yellow.jpg'),(8,'蓝色布质','images/blockBlue.jpg'),(9,'灰绿色','images/brownGreen.jpg'),(10,'灰白色','images/brownWhite.jpg'),(11,'灰黄混搭','images/brownYellow.jpg'),(12,'深蓝色','images/deepBlue.jpg'),(13,'粉红色','images/deepPink.jpg'),(14,'浅蓝色','images/lightBlue.jpg'),(15,'浅褐色','images/lightBrown.jpg'),(16,'浅绿色','images/lightGreen.jpg'),(17,'粉蓝混搭','images/pinkBlue.jpg'),(18,'粉黄混搭','images/pinkYellow.jpg'),(19,'黄蓝混搭','images/pinkYellow.jpg');

/*Table structure for table `colors_details` */

DROP TABLE IF EXISTS `colors_details`;

CREATE TABLE `colors_details` (
  `colde_id` int(11) NOT NULL AUTO_INCREMENT,
  `prd_id` int(11) DEFAULT NULL,
  `col_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`colde_id`),
  KEY `FK_Reference_32` (`prd_id`),
  KEY `FK_Reference_33` (`col_id`),
  CONSTRAINT `FK_Reference_32` FOREIGN KEY (`prd_id`) REFERENCES `product_details` (`prd_id`),
  CONSTRAINT `FK_Reference_33` FOREIGN KEY (`col_id`) REFERENCES `colors` (`col_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

/*Data for the table `colors_details` */

insert  into `colors_details`(`colde_id`,`prd_id`,`col_id`) values (1,1,8),(2,2,5),(3,3,14),(4,20,4),(5,21,10),(6,22,14),(7,29,4),(8,30,12),(9,31,13);

/*Table structure for table `customer_prd_con` */

DROP TABLE IF EXISTS `customer_prd_con`;

CREATE TABLE `customer_prd_con` (
  `cpc_id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_service_id` int(11) DEFAULT NULL,
  `prd_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`cpc_id`),
  KEY `FK_Reference_49` (`customer_service_id`),
  KEY `FK_Reference_50` (`prd_id`),
  CONSTRAINT `FK_Reference_49` FOREIGN KEY (`customer_service_id`) REFERENCES `customer_service` (`customer_service_id`),
  CONSTRAINT `FK_Reference_50` FOREIGN KEY (`prd_id`) REFERENCES `product_details` (`prd_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `customer_prd_con` */

/*Table structure for table `customer_service` */

DROP TABLE IF EXISTS `customer_service`;

CREATE TABLE `customer_service` (
  `customer_service_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `customer_service_style` varchar(10) DEFAULT NULL,
  `is_receipt` int(11) DEFAULT NULL,
  `customer_service_txt` text,
  PRIMARY KEY (`customer_service_id`),
  KEY `FK_Reference_48` (`user_id`),
  CONSTRAINT `FK_Reference_48` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `customer_service` */

/*Table structure for table `diy_order` */

DROP TABLE IF EXISTS `diy_order`;

CREATE TABLE `diy_order` (
  `do_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `address_id` int(11) DEFAULT NULL,
  `do_date` datetime NOT NULL,
  `do_number` varchar(20) NOT NULL,
  `do_ispay` int(11) NOT NULL,
  PRIMARY KEY (`do_id`),
  KEY `FK_Reference_34` (`user_id`),
  KEY `FK_Reference_47` (`address_id`),
  CONSTRAINT `FK_Reference_34` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `FK_Reference_47` FOREIGN KEY (`address_id`) REFERENCES `addres` (`address_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

/*Data for the table `diy_order` */

insert  into `diy_order`(`do_id`,`user_id`,`address_id`,`do_date`,`do_number`,`do_ispay`) values (1,1,NULL,'2017-03-19 00:00:00','201731915310',0),(2,1,NULL,'2017-03-19 00:00:00','201731916473',0),(3,1,NULL,'2017-03-19 00:00:00','2017319164916',0),(4,1,NULL,'2017-03-19 00:00:00','2017319165138',0),(5,1,NULL,'2017-03-19 00:00:00','2017319165421',0),(6,1,NULL,'2017-03-19 00:00:00','2017319165926',0),(7,1,NULL,'2017-03-19 00:00:00','2017319171138',0),(8,1,NULL,'2017-03-19 00:00:00','2017319171218',0),(9,1,NULL,'2017-03-19 00:00:00','2017319171434',0),(10,1,NULL,'2017-03-19 00:00:00','2017319171450',0),(11,1,NULL,'2017-03-19 00:00:00','201731917158',0);

/*Table structure for table `diy_order_goods` */

DROP TABLE IF EXISTS `diy_order_goods`;

CREATE TABLE `diy_order_goods` (
  `dog_id` int(11) NOT NULL AUTO_INCREMENT,
  `prd_id` int(11) DEFAULT NULL,
  `do_id` int(11) DEFAULT NULL,
  `prd_num` int(11) NOT NULL,
  PRIMARY KEY (`dog_id`),
  KEY `FK_Reference_29` (`do_id`),
  KEY `FK_Reference_31` (`prd_id`),
  CONSTRAINT `FK_Reference_29` FOREIGN KEY (`do_id`) REFERENCES `diy_order` (`do_id`),
  CONSTRAINT `FK_Reference_31` FOREIGN KEY (`prd_id`) REFERENCES `product_details` (`prd_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

/*Data for the table `diy_order_goods` */

/*Table structure for table `functional_categories` */

DROP TABLE IF EXISTS `functional_categories`;

CREATE TABLE `functional_categories` (
  `fuc_id` int(11) NOT NULL AUTO_INCREMENT,
  `sf_id` int(11) DEFAULT NULL,
  `pc_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`fuc_id`),
  KEY `FK_Reference_41` (`sf_id`),
  KEY `FK_Reference_42` (`pc_id`),
  CONSTRAINT `FK_Reference_41` FOREIGN KEY (`sf_id`) REFERENCES `style_function` (`sf_id`),
  CONSTRAINT `FK_Reference_42` FOREIGN KEY (`pc_id`) REFERENCES `product_category` (`pc_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

/*Data for the table `functional_categories` */

insert  into `functional_categories`(`fuc_id`,`sf_id`,`pc_id`) values (1,1,1),(2,1,2),(3,1,3),(4,1,5),(5,3,2),(6,3,3),(7,3,4),(8,3,5),(9,5,2),(10,5,3),(11,5,5),(12,6,6);

/*Table structure for table `login` */

DROP TABLE IF EXISTS `login`;

CREATE TABLE `login` (
  `login_tel` varchar(15) NOT NULL,
  `login_pwd` varchar(15) NOT NULL,
  PRIMARY KEY (`login_tel`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `login` */

insert  into `login`(`login_tel`,`login_pwd`) values ('18408245156','123321a');

/*Table structure for table `material` */

DROP TABLE IF EXISTS `material`;

CREATE TABLE `material` (
  `ma_id` int(11) NOT NULL AUTO_INCREMENT,
  `ma_name` varchar(20) NOT NULL,
  PRIMARY KEY (`ma_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

/*Data for the table `material` */

insert  into `material`(`ma_id`,`ma_name`) values (1,'实木'),(2,'布艺'),(3,'皮质'),(4,'石质'),(5,'组合物');

/*Table structure for table `order_product_details` */

DROP TABLE IF EXISTS `order_product_details`;

CREATE TABLE `order_product_details` (
  `opd_id` int(11) NOT NULL AUTO_INCREMENT,
  `prd_id` int(11) DEFAULT NULL,
  `order_id` int(11) DEFAULT NULL,
  `prd_num` int(11) NOT NULL,
  PRIMARY KEY (`opd_id`),
  KEY `FK_Reference_44` (`prd_id`),
  KEY `FK_Reference_45` (`order_id`),
  CONSTRAINT `FK_Reference_44` FOREIGN KEY (`prd_id`) REFERENCES `product_details` (`prd_id`),
  CONSTRAINT `FK_Reference_45` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

/*Data for the table `order_product_details` */

/*Table structure for table `orders` */

DROP TABLE IF EXISTS `orders`;

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `address_id` int(11) DEFAULT NULL,
  `order_data` datetime NOT NULL,
  `order_ispay` int(11) NOT NULL,
  `order_num` varchar(20) NOT NULL,
  `order_price` int(11) DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `FK_Reference_38` (`user_id`),
  KEY `FK_Reference_40` (`address_id`),
  CONSTRAINT `FK_Reference_38` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `FK_Reference_40` FOREIGN KEY (`address_id`) REFERENCES `addres` (`address_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `orders` */

insert  into `orders`(`order_id`,`user_id`,`address_id`,`order_data`,`order_ispay`,`order_num`,`order_price`) values (1,1,1,'2017-03-16 00:00:00',1,'201703160001',NULL),(2,1,2,'2017-01-12 00:00:00',0,'201703161012',NULL);

/*Table structure for table `product_category` */

DROP TABLE IF EXISTS `product_category`;

CREATE TABLE `product_category` (
  `pc_id` int(11) NOT NULL AUTO_INCREMENT,
  `sup_id` int(11) DEFAULT NULL,
  `pc_stname` varchar(20) NOT NULL,
  PRIMARY KEY (`pc_id`),
  KEY `FK_Reference_30` (`sup_id`),
  CONSTRAINT `FK_Reference_30` FOREIGN KEY (`sup_id`) REFERENCES `supplier` (`sup_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

/*Data for the table `product_category` */

insert  into `product_category`(`pc_id`,`sup_id`,`pc_stname`) values (1,1,'沙发'),(2,2,'灯具'),(3,2,'桌椅'),(4,3,'床'),(5,3,'装饰'),(6,3,'其他');

/*Table structure for table `product_details` */

DROP TABLE IF EXISTS `product_details`;

CREATE TABLE `product_details` (
  `prd_id` int(11) NOT NULL AUTO_INCREMENT,
  `ma_id` int(11) DEFAULT NULL,
  `fuc_id` int(11) DEFAULT NULL,
  `ts_id` int(11) DEFAULT NULL,
  `prd_name` varchar(20) NOT NULL,
  `prd_text` varchar(20) NOT NULL,
  `prd_char` varchar(50) NOT NULL,
  `prd_money` int(11) NOT NULL,
  `prd_stock` varchar(20) NOT NULL,
  `prd_date` date NOT NULL,
  `prd_size` float NOT NULL,
  `prd_more` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`prd_id`),
  KEY `FK_Reference_43` (`fuc_id`),
  KEY `FK_Reference_46` (`ts_id`),
  KEY `FK_Reference_9` (`ma_id`),
  CONSTRAINT `FK_Reference_43` FOREIGN KEY (`fuc_id`) REFERENCES `functional_categories` (`fuc_id`),
  CONSTRAINT `FK_Reference_46` FOREIGN KEY (`ts_id`) REFERENCES `template_style` (`ts_id`),
  CONSTRAINT `FK_Reference_9` FOREIGN KEY (`ma_id`) REFERENCES `material` (`ma_id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8;

/*Data for the table `product_details` */

insert  into `product_details`(`prd_id`,`ma_id`,`fuc_id`,`ts_id`,`prd_name`,`prd_text`,`prd_char`,`prd_money`,`prd_stock`,`prd_date`,`prd_size`,`prd_more`) values (1,1,1,1,'灰色1沙发','简约/外观简单别致，没有花里花哨的修饰却','images/personalSofa_blockBlue.png',5000,'20','2015-11-10',300,'完美的设计，精湛施工，时尚的搭配，真正做到了完美空间和谐统一！'),(2,1,1,1,'灰色1沙发','简约的设计理念，细腻、精致的做工，这不仅','images/personalSofa_coffee.png',5000,'20','2016-11-10',300,'简约/外观简单别致，没有花里花哨的修饰却也有别有一番情趣，给人简洁、清爽的视觉效果。'),(3,1,1,1,'灰色1沙发','时尚简洁大方是作品的灵魂，端庄高贵无比的','images/personalSofa_lightBrown.png',5000,'20','2016-11-10',300,'简约的设计理念，细腻、精致的做工，这不仅是产品，更是时尚魅力诱惑的艺术品，相结合带来唯美的生活享受。'),(4,1,1,1,'红豆沙发','黑白色彩是一种经典的搭配。设计简约、落落','images/red_sofa.png',200,'200','2016-11-10',200,'时尚简洁大方是作品的灵魂，端庄高贵无比的诱惑，让人心迷意乱、难以抵挡，她的魅力才不同凡响。'),(5,1,1,2,'深色新西兰沙发','简单的棱角和构架，外观上显得有点轻薄，让','images/sofa-color-1.png',8000,'20','2016-11-10',100,'简单的棱角和构架，外观上显得有点轻薄，让人心疑能否承受得住我们伏案阅读。'),(6,1,1,2,'深色新西兰沙发','一个外观上简约而又不失创造力和对实际需求','images/sofa-color-2.png',8000,'20','2016-11-10',100,'不需要华丽的修饰，你所需要的一切都这里开始！'),(7,1,1,2,'深色新西兰沙发','一个外观上简约而又不失创造力和对实际需求','images/sofa-color-3.jpg',8000,'20','2016-11-10',100,'简约而不简单，这样的生活态度是一种境界，张扬着一个人的智慧与品位。'),(8,5,6,5,'小白椅','入肌肤般嫩白，美丽动人','images/gy_pro1.jpg',600,'300','2015-12-12',0,'完美的设计，精湛施工，时尚的搭配，真正做到了完美空间和谐统一！'),(9,5,3,1,'编制黑椅','全手工编制，精湛施工，时尚的搭配','images/gy_pro2.jpg',700,'100','2017-10-12',200,'成份以适应为主，长石次之，细粒结构，分选好，泥质胶结疏松   '),(10,3,11,3,'装饰京塔','铁质金塔，家就是这样搭配的','images/gy_pro3.jpg',300,'100','2016-04-02',20,'浩瀚的大海保持着深邃的本色，又接受着海鸥活泼的装饰；巍峨的山峦保持着缄默的本色，又接受着花木热情的装饰'),(11,5,3,2,'编制踏踏椅','不需要华丽的修饰，你所需要的一切都这里开','images/gy_pro4.jpg',200,'150','2015-11-24',200,'简约而不简单，这样的生活态度是一种境界，张扬着一个人的智慧与品位。'),(12,5,10,3,'塑料椅子','独特的造形设计，简单、时尚大方的花纹，优','images/gy_pro5.jpg',500,'100','2016-04-08',300,'为品质客厅准备的家居。'),(13,5,3,4,'舒服椅','生活就应化繁为简','images/gy_pro6.jpg',900,'120','2017-03-01',200,'现代时尚简约风格，质朴的色彩，宁静悠远的文豪气质，极富内涵。'),(14,4,10,4,'很正规椅','致简谱中跳跃着一种无法言喻的灵动，浑身散','images/gy_pro10.jpg',600,'210','2017-01-02',300,'不管是黑夜白天，不同的环境，都有相同的品质，每个角度都是如此的完美'),(15,1,10,3,'木头椅','生活具有多样的风格，一切只因你而不同，品','images/gy_pro11.jpg',1000,'100','2016-11-11',200,'每一种材质的选择、每一个线条的把握、每一种功能的设计、每一种颜色的搭配，都堪称精美绝伦。'),(16,1,3,2,'边扯椅子','这种布局就是我喜欢的！','images/gy_pro12.jpg',2000,'120','2016-05-16',300,'忙碌之余，有那么一处空间可以肆无忌惮地遐想，眺望、阅读，那该有多惬意！'),(17,5,5,1,'圆圆吊灯','有效的减缓人体疲劳，到家就应该跑掉工作的','images/gy_pro7.jpg',500,'100','2015-06-04',200,'时尚撞色布艺沙发，追求个性别致，一扫视觉上的沉闷，演绎客厅的视觉盛宴，享受多姿多彩的生活。'),(18,5,9,2,'吊着灯','简约不简单，设计化繁为简，从本真出发，流','images/gy_pro8.jpg',600,'120','2016-07-08',200,'在时尚家居中感受如梦般的闲情，让人们感悟似水年华的家居生活。 '),(19,5,5,4,'多重吊灯','简单的色彩，没有过多的修饰的线条。这就是','images/gy_pro9.jpg',700,'60','2017-08-04',200,'成熟的标志，稳重的格调增加空间的层次感，日常生活中耐脏易打理，彰显主人品味'),(20,2,1,1,'传统沙发','简约不简单，设计化繁为简，从本真出发，流','images/bigSofa_brown.png',4000,'300','2016-11-10',200,'成熟的标志，稳重的格调增加空间的层次感'),(21,2,1,1,'传统沙发','在时尚家居中感受如梦般的闲情，让人们感悟','images/bigSofa_brownWhite.png',4000,'300','2016-11-10',200,'成熟的标志，稳重的格调增加空间的层次感'),(22,2,1,1,'传统沙发','在时尚家居中感受如梦般的闲情，让人们感悟','images/bigSofa_lightBlue.png',4000,'300','2016-11-10',200,'成熟的标志，稳重的格调增加空间的层次感'),(23,3,1,3,'地中海简约沙发','生活具有多样的风格，一切只因你而不同，品','images/redBrown_1.png',6000,'400','2016-11-10',300,'每一种材质的选择、每一个线条的把握、每一种功能的设计、每一种颜色的搭配，都堪称精美绝伦。'),(24,3,1,1,'地中海简约沙发','生活具有多样的风格，一切只因你而不同，品','images/redBrown_2.png',6000,'400','2016-11-10',300,'每一种材质的选择、每一个线条的把握、每一种功能的设计、每一种颜色的搭配，都堪称精美绝伦。'),(25,5,2,1,'欧式紫檀沙发','生活具有多样的风格，一切只因你而不同，品','images/whatSofa_1.png',8500,'400','2016-11-10',360,'忙碌之余，有那么一处空间可以肆无忌惮地遐想，眺望、阅读，那该有多惬意！'),(26,5,2,1,'欧式紫檀沙发','生活具有多样的风格，一切只因你而不同，品','images/whatSofa_2.png',8500,'400','2016-11-10',360,'忙碌之余，有那么一处空间可以肆无忌惮地遐想，眺望、阅读，那该有多惬意！'),(27,3,7,3,'情意浓浓双人床','生活就应化繁为简','images/bed_1.png',5000,'500','2016-11-10',500,'在时尚家居中感受如梦般的闲情，让人们感悟似水年华的家居生活。 '),(28,3,7,3,'爱意满满加宽加大床','这种布局就是我喜欢的！','images/bed_2.png',4000,'500','2016-11-10',500,'在时尚家居中感受如梦般的闲情，让人们感悟似水年华的家居生活。 '),(29,1,12,3,'地中海式床头柜','简约不简单，设计化繁为简，从本真出发，流','images/series_brown.png',200,'50','2016-11-10',50,'在时尚家居中感受如梦般的闲情，让人们感悟似水年华的家居生活。 '),(30,1,12,3,'地中海式床头柜','简约不简单，设计化繁为简，从本真出发，流','images/series_deepBlue.png',200,'50','2016-11-10',50,'在时尚家居中感受如梦般的闲情，让人们感悟似水年华的家居生活。 '),(31,1,12,3,'地中海式床头柜','简约不简单，设计化繁为简，从本真出发，流','images/series_deepPink.png',200,'50','2016-11-10',50,'在时尚家居中感受如梦般的闲情，让人们感悟似水年华的家居生活。 '),(32,2,3,2,'流芳柜','在时尚家居中感受如梦般的闲情，让人们感悟','images/liufanggui.png',400,'50','2016-11-10',80,'简约而不简单，这样的生活态度是一种境界，张扬着一个人的智慧与品位。'),(33,2,8,2,'索菲亚衣柜','在时尚家居中感受如梦般的闲情，让人们感悟','images/yigui.png',200,'100','2016-11-10',140,'简约而不简单，这样的生活态度是一种境界，张扬着一个人的智慧与品位。');

/*Table structure for table `product_style_m` */

DROP TABLE IF EXISTS `product_style_m`;

CREATE TABLE `product_style_m` (
  `prsm_id` int(11) NOT NULL AUTO_INCREMENT,
  `ts_id` int(11) DEFAULT NULL,
  `sf_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`prsm_id`),
  KEY `FK_Reference_27` (`ts_id`),
  KEY `FK_Reference_28` (`sf_id`),
  CONSTRAINT `FK_Reference_27` FOREIGN KEY (`ts_id`) REFERENCES `template_style` (`ts_id`),
  CONSTRAINT `FK_Reference_28` FOREIGN KEY (`sf_id`) REFERENCES `style_function` (`sf_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

/*Data for the table `product_style_m` */

insert  into `product_style_m`(`prsm_id`,`ts_id`,`sf_id`) values (1,1,1),(2,1,2),(3,2,1),(4,2,3),(5,3,1);

/*Table structure for table `production` */

DROP TABLE IF EXISTS `production`;

CREATE TABLE `production` (
  `production_id` int(11) NOT NULL AUTO_INCREMENT,
  `production_name` varchar(10) NOT NULL,
  `production_print` varchar(90) DEFAULT NULL,
  `production_text` text,
  PRIMARY KEY (`production_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

/*Data for the table `production` */

insert  into `production`(`production_id`,`production_name`,`production_print`,`production_text`) values (1,'设计代表作','wj_01.jpg','1.简约/外观简单别致，没有花里花哨的修饰却也有别有一番情趣，给人简洁、清爽的视觉效果。 \r\n2.简约的设计理念，细腻、精致的做工，这不仅是产品，更是时尚魅力诱惑的艺术品，相结 合带来唯美的生活享受。\r\n3.时尚简洁大方是作品的灵魂，端庄高贵无比的诱惑，让人心迷意乱、难以抵挡，她的魅力才不同凡响。'),(2,'设计简约','wj_02.jpg','1.黑白色彩是一种经典的搭配。设计简约、落落大方，非常有艺术感。 \r\n2.简单的棱角和构架，外观上显得有点轻薄，让人心疑能否承受得住我们伏案阅读。\r\n3.一个外观上简约而又不失创造力和对实际需求的细致考虑的作品。'),(3,'设计简约','wj_03.jpg','1.简单的一个“开始”包含的意义是非凡的，世界的开始从这里开始。 \r\n2.不需要华丽的修饰，你所需要的一切都这里开始！   \r\n3. 简约不简单，设计化繁为简，从本真出发，流线外形设计，黑白色调，永恒经典。'),(4,'设计简约','wj_04.jpg','1.不需要华丽的修饰，你所需要的一切都这里开始！\r\n2. 简约不简单，设计化繁为简，从本真出发，流线外形设计，黑白色调，永恒经典。\r\n3. 简约而不简单，这样的生活态度是一种境界，张扬着一个人的智慧与品位。'),(5,'设计代表作','wj_05.jpg','1.简约/外观简单别致，没有花里花哨的修饰却也有别有一番情趣，给人简洁、清爽的视觉效果。 \r\n2.简约的设计理念，细腻、精致的做工，这不仅是产品，更是时尚魅力诱惑的艺术品，相结 合带来唯美的生活享受。\r\n3.时尚简洁大方是作品的灵魂，端庄高贵无比的诱惑，让人心迷意乱、难以抵挡，她的魅力才不同凡响。'),(6,'设计简约','wj_06.jpg','1.黑白色彩是一种经典的搭配。设计简约、落落大方，非常有艺术感。 \r\n2.简单的棱角和构架，外观上显得有点轻薄，让人心疑能否承受得住我们伏案阅读。\r\n3.一个外观上简约而又不失创造力和对实际需求的细致考虑的作品。'),(7,'设计简约','wj_07.jpg','1.简单的一个“开始”包含的意义是非凡的，世界的开始从这里开始。 \r\n2.不需要华丽的修饰，你所需要的一切都这里开始！   \r\n3. 简约不简单，设计化繁为简，从本真出发，流线外形设计，黑白色调，永恒经典。'),(8,'设计简约','wj_08.jpg','1.不需要华丽的修饰，你所需要的一切都这里开始！\r\n2. 简约不简单，设计化繁为简，从本真出发，流线外形设计，黑白色调，永恒经典。\r\n3. 简约而不简单，这样的生活态度是一种境界，张扬着一个人的智慧与品位。'),(9,'设计代表作','wj_09.jpg','1.简单的一个“开始”包含的意义是非凡的，世界的开始从这里开始。 \r\n2.不需要华丽的修饰，你所需要的一切都这里开始！   \r\n3. 简约不简单，设计化繁为简，从本真出发，流线外形设计，黑白色调，永恒经典。'),(10,'设计简约','wj_10.jpg','1. 简约不简单，设计化繁为简，从本真出发，流线外形设计，黑白色调，永恒经典。\r\n2. 简约而不简单，这样的生活态度是一种境界，张扬着一个人的智慧与品位。'),(11,'设计简约','wj_11.jpg','1.不需要华丽的修饰，你所需要的一切都这里开始！\r\n2. 简约不简单，设计化繁为简，从本真出发，流线外形设计，黑白色调，永恒经典。\r\n3. 简约而不简单，这样的生活态度是一种境界，张扬着一个人的智慧与品位。'),(12,'设计简约','wj_12.jpg','1.一个外观上简约而又不失创造力和对实际需求的细致考虑的作品。\r\n2.简单的一个“开始”包含的意义是非凡的，世界的开始从这里开始。 \r\n3.不需要华丽的修饰，你所需要的一切都这里开始！'),(13,'设计代表作','wj_13.jpg','1.简约/外观简单别致，没有花里花哨的修饰却也有别有一番情趣，给人简洁、清爽的视觉效果。 \r\n2.简约的设计理念，细腻、精致的做工，这不仅是产品，更是时尚魅力诱惑的艺术品，相结 合带来唯美的生活享受。\r\n3.时尚简洁大方是作品的灵魂，端庄高贵无比的诱惑，让人心迷意乱、难以抵挡，她的魅力才不同凡响。'),(14,'设计简约','wj_14.jpg','1.一个外观上简约而又不失创造力和对实际需求的细致考虑的作品。\r\n2.简单的一个“开始”包含的意义是非凡的，世界的开始从这里开始。 \r\n3.不需要华丽的修饰，你所需要的一切都这里开始！1'),(15,'设计简约','wj_15.jpg','1.不需要华丽的修饰，你所需要的一切都这里开始！\r\n2. 简约不简单，设计化繁为简，从本真出发，流线外形设计，黑白色调，永恒经典。\r\n3. 简约而不简单，这样的生活态度是一种境界，张扬着一个人的智慧与品位。'),(16,'设计简约','wj_16.jpg','1. 简约不简单，设计化繁为简，从本真出发，流线外形设计，黑白色调，永恒经典。\r\n2. 简约而不简单，这样的生活态度是一种境界，张扬着一个人的智慧与品位。1'),(17,'设计代表作','wj_17.jpg','1.简单的一个“开始”包含的意义是非凡的，世界的开始从这里开始。 \r\n2.不需要华丽的修饰，你所需要的一切都这里开始！   \r\n3. 简约不简单，设计化繁为简，从本真出发，流线外形设计，黑白色调，永恒经典。1'),(18,'设计简约','wj_18.jpg','1.简约/外观简单别致，没有花里花哨的修饰却也有别有一番情趣，给人简洁、清爽的视觉效果。 \r\n2.简约的设计理念，细腻、精致的做工，这不仅是产品，更是时尚魅力诱惑的艺术品，相结 合带来唯美的生活享受。\r\n3.时尚简洁大方是作品的灵魂，端庄高贵无比的诱惑，让人心迷意乱、难以抵挡，她的魅力才不同凡响。1'),(19,'设计简约','wj_19.jpg','1.一个外观上简约而又不失创造力和对实际需求的细致考虑的作品。\r\n2.简单的一个“开始”包含的意义是非凡的，世界的开始从这里开始。 \r\n3.不需要华丽的修饰，你所需要的一切都这里开始！11'),(20,'设计简约','wj_20.jpg','1'),(21,'设计代表作','wj_21.jpg','1.不需要华丽的修饰，你所需要的一切都这里开始！\r\n2. 简约不简单，设计化繁为简，从本真出发，流线外形设计，黑白色调，永恒经典。\r\n3. 简约而不简单，这样的生活态度是一种境界，张扬着一个人的智慧与品位。1'),(22,'设计简约','wj_22.jpg','1.不需要华丽的修饰，你所需要的一切都这里开始！\r\n2. 简约不简单，设计化繁为简，从本真出发，流线外形设计，黑白色调，永恒经典。\r\n3. 简约而不简单，这样的生活态度是一种境界，张扬着一个人的智慧与品位。1'),(23,'设计简约','wj_23.jpg','1. 简约不简单，设计化繁为简，从本真出发，流线外形设计，黑白色调，永恒经典。\r\n2. 简约而不简单，这样的生活态度是一种境界，张扬着一个人的智慧与品位。11'),(24,'设计简约','wj_24.jpg','1.一个外观上简约而又不失创造力和对实际需求的细致考虑的作品。\r\n2.简单的一个“开始”包含的意义是非凡的，世界的开始从这里开始。 \r\n3.不需要华丽的修饰，你所需要的一切都这里开始！11');

/*Table structure for table `shopping` */

DROP TABLE IF EXISTS `shopping`;

CREATE TABLE `shopping` (
  `shopping_id` int(11) NOT NULL AUTO_INCREMENT,
  `prd_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `goods_num` int(11) NOT NULL,
  PRIMARY KEY (`shopping_id`),
  KEY `FK_Reference_22` (`prd_id`),
  KEY `FK_Reference_24` (`user_id`),
  CONSTRAINT `FK_Reference_22` FOREIGN KEY (`prd_id`) REFERENCES `product_details` (`prd_id`),
  CONSTRAINT `FK_Reference_24` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `shopping` */

/*Table structure for table `style_function` */

DROP TABLE IF EXISTS `style_function`;

CREATE TABLE `style_function` (
  `sf_id` int(11) NOT NULL AUTO_INCREMENT,
  `sf_name` varchar(20) NOT NULL,
  PRIMARY KEY (`sf_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

/*Data for the table `style_function` */

insert  into `style_function`(`sf_id`,`sf_name`) values (1,'客厅'),(2,'厨房'),(3,'卧室'),(4,'卫生间'),(5,'饭厅'),(6,'其他');

/*Table structure for table `stylist` */

DROP TABLE IF EXISTS `stylist`;

CREATE TABLE `stylist` (
  `stylist_id` int(11) NOT NULL AUTO_INCREMENT,
  `stylist_name` varchar(12) NOT NULL,
  `stylist_introduce` text NOT NULL,
  `stylist_btn` varchar(60) NOT NULL,
  `stylist_print` varchar(90) DEFAULT NULL,
  PRIMARY KEY (`stylist_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

/*Data for the table `stylist` */

insert  into `stylist`(`stylist_id`,`stylist_name`,`stylist_introduce`,`stylist_btn`,`stylist_print`) values (1,'东方不败','来自于美国加利福尼亚，\r\n隶属E&E集团\r\n以”Less is More”为品牌设计理念，\r\n追求整体造型比例和细节的完美，\r\n摒弃一切的繁杂和多余。','查看详情','wj_002.jpg'),(2,'周杰伦','国家建筑协会CIID注册设计师，毕业于安徽建工学院艺术设计系，\r\n知名的北京家装设计师，北京别墅设计师，\r\n栏目明星设计师，被称为空间规划“小诸葛”。','查看详情','wj_003.jpg'),(3,'尼克·唐','好的心态是前提，好的方法是关键\r\n即使所有人都随波逐流了,仍然要坚持做你自己.\r\n手绘学习过程中,一定要注重质,而不是注重量','查看详情','wj_005.jpg'),(4,'吴彦祖','设计的目的是为消费者服务\r\n表现自己个性、形成自己的风格\r\n“艺术修养的沉积是设计光芒万丈的动力”\r\n保持良好的心态，看淡“钱”途，看重前途','查看详情','wj_006.jpg'),(5,'小谭洁','她说室内设计的首要目标在于满足客户生活的基本需要，\r\n她认为设计师应该从宏光整体性出发，考虑到设计的科学性和艺术性的合二为一，\r\n多为弱势群体考虑，多为这个社会环境考虑，不应只考虑眼前的方案，\r\n要有一种大的社会观念。','查看详情','wj_007.jpg'),(6,'葛布','设计的价值在于理解客户对家的精神需求，给于居住舒适功能外的艺术气氛。设计最具创意房子，实现有情感的家','查看详情','wj_001.jpg');

/*Table structure for table `stylist_production` */

DROP TABLE IF EXISTS `stylist_production`;

CREATE TABLE `stylist_production` (
  `sp_id` int(11) NOT NULL AUTO_INCREMENT,
  `stylist_id` int(11) DEFAULT NULL,
  `production_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`sp_id`),
  KEY `FK_Reference_35` (`stylist_id`),
  KEY `FK_Reference_36` (`production_id`),
  CONSTRAINT `FK_Reference_36` FOREIGN KEY (`production_id`) REFERENCES `production` (`production_id`),
  CONSTRAINT `FK_Reference_35` FOREIGN KEY (`stylist_id`) REFERENCES `stylist` (`stylist_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

/*Data for the table `stylist_production` */

insert  into `stylist_production`(`sp_id`,`stylist_id`,`production_id`) values (1,1,1),(2,1,2),(3,1,3),(4,1,4),(5,2,5),(6,2,6),(7,2,7),(8,2,8),(9,3,9),(10,3,10),(11,3,11),(12,3,12),(13,4,13),(14,4,14),(15,4,15),(16,4,16),(17,5,17),(18,5,18),(19,5,19),(20,5,20),(21,6,21),(22,6,22),(23,6,23),(24,6,24);

/*Table structure for table `supplier` */

DROP TABLE IF EXISTS `supplier`;

CREATE TABLE `supplier` (
  `sup_id` int(11) NOT NULL AUTO_INCREMENT,
  `sup_number` varchar(20) NOT NULL,
  PRIMARY KEY (`sup_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

/*Data for the table `supplier` */

insert  into `supplier`(`sup_id`,`sup_number`) values (1,'荷兰'),(2,'北美'),(3,'南非'),(4,'东南亚');

/*Table structure for table `template_material` */

DROP TABLE IF EXISTS `template_material`;

CREATE TABLE `template_material` (
  `tm_id` int(11) NOT NULL AUTO_INCREMENT,
  `prsm_id` int(11) DEFAULT NULL,
  `tm_name` varchar(20) NOT NULL,
  `tm_text` varchar(20) NOT NULL,
  `tm_char` varchar(50) NOT NULL,
  PRIMARY KEY (`tm_id`),
  KEY `FK_Reference_39` (`prsm_id`),
  CONSTRAINT `FK_Reference_39` FOREIGN KEY (`prsm_id`) REFERENCES `product_style_m` (`prsm_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

/*Data for the table `template_material` */

insert  into `template_material`(`tm_id`,`prsm_id`,`tm_name`,`tm_text`,`tm_char`) values (1,1,'简约中式客厅','简约大方，通透明亮\'','images/D-1.jpg'),(2,1,'简装中式客厅','简介明了，','images/D-n.jpg'),(3,3,'欧式简洁风客厅','23','images/D-m.jpg'),(4,3,'优雅欧式客厅','低调奢华','images/D-7.jpg'),(5,5,'高端地中海式客厅','大气高贵','images/D-8.jpg'),(6,1,'奢华中式客厅','2322','images/D-3.jpg'),(7,3,'素雅欧式客厅','简洁明了','images/D-5.jpg');

/*Table structure for table `template_style` */

DROP TABLE IF EXISTS `template_style`;

CREATE TABLE `template_style` (
  `ts_id` int(11) NOT NULL AUTO_INCREMENT,
  `ts_stname` varchar(20) NOT NULL,
  PRIMARY KEY (`ts_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

/*Data for the table `template_style` */

insert  into `template_style`(`ts_id`,`ts_stname`) values (1,'中式'),(2,'欧式'),(3,'地中海'),(4,'美式'),(5,'现代');

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(10) NOT NULL,
  `user_sex` int(11) NOT NULL,
  `user_email` varchar(30) NOT NULL,
  `user_birth` date NOT NULL,
  `user_profession` varchar(10) DEFAULT NULL,
  `user_url` varchar(50) NOT NULL,
  `login_tel` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `FK_users` (`login_tel`),
  CONSTRAINT `FK_users` FOREIGN KEY (`login_tel`) REFERENCES `login` (`login_tel`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*Data for the table `users` */

insert  into `users`(`user_id`,`user_name`,`user_sex`,`user_email`,`user_birth`,`user_profession`,`user_url`,`login_tel`) values (1,'小筱',1,'462143852@qq.com','1994-06-01','学生','1489903105119_header.png','18408245156');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
