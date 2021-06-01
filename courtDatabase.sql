-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 31, 2021 at 04:55 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `n_court_management_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `cases`
--

CREATE TABLE `cases` (
  `client_id` int(7) NOT NULL,
  `court_id` int(7) NOT NULL,
  `case_desc` varchar(350) NOT NULL,
  `case_id` int(7) NOT NULL,
  `verification` tinyint(1) DEFAULT NULL,
  `fees_paid` tinyint(1) DEFAULT NULL,
  `fee_status` tinyint(1) NOT NULL DEFAULT 0,
  `lawyer_req_send` int(7) DEFAULT 0,
  `lawyer_req_accept` tinyint(1) DEFAULT 0,
  `lawyer_id` int(7) DEFAULT NULL,
  `case_title` varchar(500) NOT NULL,
  `case_type` varchar(20) NOT NULL,
  `judge_id` int(7) DEFAULT NULL,
  `merit_status` tinyint(1) DEFAULT NULL,
  `def_client_name` varchar(100) NOT NULL,
  `def_client_email` varchar(100) NOT NULL,
  `def_id` int(7) DEFAULT NULL,
  `def_lawyer_id` int(7) DEFAULT NULL,
  `def_fees_paid` tinyint(1) DEFAULT NULL,
  `def_fees_status` tinyint(1) NOT NULL DEFAULT 0,
  `def_lawyer_req_send` int(7) DEFAULT 0,
  `def_lawyer_req_accept` tinyint(1) DEFAULT 0,
  `case_status` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cases`
--

INSERT INTO `cases` (`client_id`, `court_id`, `case_desc`, `case_id`, `verification`, `fees_paid`, `fee_status`, `lawyer_req_send`, `lawyer_req_accept`, `lawyer_id`, `case_title`, `case_type`, `judge_id`, `merit_status`, `def_client_name`, `def_client_email`, `def_id`, `def_lawyer_id`, `def_fees_paid`, `def_fees_status`, `def_lawyer_req_send`, `def_lawyer_req_accept`, `case_status`) VALUES
(17, 5, 'A person named rahul has been indulging in money laundering and he has been threatening my family since one month.', 23, 1, 1, 1, 4, 1, 4, 'Money laundering', 'Civil', 3, 1, 'Rahu', 'seshathilak.g@gmail.com', 22, 13, 1, 1, 13, 1, 'expired'),
(17, 7, 'A person named Veer killed a person in broad day light in front of my house', 29, NULL, NULL, 0, 0, 0, NULL, 'Murder', 'criminal', NULL, NULL, 'Veer', 'seshathilak.g@gmail.com', NULL, NULL, NULL, 0, 0, 0, 'notVerified'),
(17, 8, 'A person named Aakash robbed my jewels yesterday.', 30, 1, 1, 1, 14, 1, 14, 'Robbery', 'criminal', 3, 1, 'Aakash', 'seshathilak.h@gmail.com', 23, 12, 1, 1, 12, 1, 'expired');

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

CREATE TABLE `clients` (
  `client_id` int(7) NOT NULL,
  `client_name` varchar(50) NOT NULL,
  `mobile_no` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `gender` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`client_id`, `client_name`, `mobile_no`, `email`, `password`, `gender`) VALUES
(4, 'sree', '7896541230', 'sree@gmail.com', 'sree@1', ''),
(7, 'anu', '9685746352', 'anu@gmail.com', 'anu@1', ''),
(8, 'hema', '9687896555', 'hema1@gmail.com', 'hema@1', ''),
(9, 'Keshikaa', '8978455689', 'kesh123@gmail.com', 'kesh123', ''),
(10, 'raksha', '9988776655', 'raksha12@gmail.com', 'raksha@1', ''),
(17, 'Hema', '1234567890', 'hemashirisha123@gmail.com', 'qwert123%', ''),
(22, '', '', 'seshathilak.g@gmail.com', 'seshathilak123%', ''),
(23, '', '', 'seshathilak.h@gmail.com', 'iGlR14a', '');

-- --------------------------------------------------------

--
-- Table structure for table `courts`
--

CREATE TABLE `courts` (
  `court_id` int(7) NOT NULL,
  `court_name` varchar(100) NOT NULL,
  `court_address` varchar(300) NOT NULL,
  `court_type` varchar(20) NOT NULL,
  `court_pwd` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `courts`
--

INSERT INTO `courts` (`court_id`, `court_name`, `court_address`, `court_type`, `court_pwd`) VALUES
(1, 'Madras High Court', 'Thiagarajan road, T-nagar, Chennai - 600017', 'High court', 'MadrasHighCourt123%'),
(2, 'City Civil Court', 'High Court road, Parrys, George Town, Chennai-600036', 'Civil Court', 'CityCivilCourt123%'),
(5, 'Chengalpettu court', 'Chengalpettu high road, TamilNadu', 'Civil Court', 'court123%'),
(6, 'Salem court', 'Salem high road, Tamilnadu', 'Civil Court', 'court123%'),
(7, 'Coimbatore court', 'Coimbatore high court, tamilnadu', 'Criminal Court', 'court123%'),
(8, 'Mumbai high court', 'Mumabi high road, Maharashtra', 'Criminal Court', 'court123%'),
(9, 'Trivandrum court', 'Trivandrum High road, Kerala', 'Criminal Court', 'court123%'),
(10, 'Delhi High court', 'Delhi main road, Delhi', 'High Court', 'court123%'),
(11, 'Kolkata High Court', 'Kolkata High road, West Bengal', 'High Court', 'court123%'),
(12, 'Gandhinagar High Court', 'Gandhinagar main road, Gujarat', 'High Court', 'court123%'),
(13, 'Srinagar High Court', 'Srinagar main road, Jammu and Kashmir', 'High Court', 'court123%'),
(14, 'Madurai court', 'Madurai main road, tamilnadu', 'Criminal Court', 'court123%');

-- --------------------------------------------------------

--
-- Table structure for table `expired_cases`
--

CREATE TABLE `expired_cases` (
  `case_id` int(7) NOT NULL,
  `client_id` int(7) NOT NULL,
  `lawyer_id` int(7) NOT NULL,
  `def_client_id` int(7) NOT NULL,
  `def_lawyer_id` int(7) NOT NULL,
  `judge_id` int(7) NOT NULL,
  `court_id` int(7) NOT NULL,
  `judgement` varchar(50) NOT NULL,
  `winner` int(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `expired_cases`
--

INSERT INTO `expired_cases` (`case_id`, `client_id`, `lawyer_id`, `def_client_id`, `def_lawyer_id`, `judge_id`, `court_id`, `judgement`, `winner`) VALUES
(23, 17, 4, 22, 13, 3, 5, 'Fine of 50000. The plaint has won the case', 4),
(28, 17, 13, 22, 12, 3, 7, '000000000', 12),
(30, 17, 14, 23, 12, 3, 8, 'The robber must be arrested immediatly and is sent', 14);

-- --------------------------------------------------------

--
-- Table structure for table `judges`
--

CREATE TABLE `judges` (
  `judge_id` int(7) NOT NULL,
  `judge_name` varchar(50) NOT NULL,
  `judge_email` varchar(50) NOT NULL,
  `judge_pwd` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `judges`
--

INSERT INTO `judges` (`judge_id`, `judge_name`, `judge_email`, `judge_pwd`) VALUES
(1, 'vasu', 'vasu123@gmail.com', 'Vasu123%'),
(2, 'Priya', 'priya123@gmail.com', 'Priya123%'),
(3, 'Anusree', 'anusree123@gmail.com', 'anusree123%'),
(4, 'Sesha', 'sesha123@gmail.com', 'sesha1235'),
(5, 'Madhu', 'madhu123@gmail.com', 'madhu123%'),
(6, 'Karthik', 'karthik123@gmail.com', 'Karthik123%'),
(8, 'Vaishali', 'vaishali123@gmail.com', 'vaishali123%');

-- --------------------------------------------------------

--
-- Table structure for table `lawyers`
--

CREATE TABLE `lawyers` (
  `lawyer_id` int(7) NOT NULL,
  `lawyer_name` varchar(50) NOT NULL,
  `mobile_no` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `cases_won` int(5) NOT NULL,
  `lawyer_type` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `lawyers`
--

INSERT INTO `lawyers` (`lawyer_id`, `lawyer_name`, `mobile_no`, `email`, `password`, `cases_won`, `lawyer_type`) VALUES
(2, 'harara', '1234567', 'hara@gmail.com', 'qwert', 15, 'civil'),
(3, 'mahi', '12345', 'mahi@gmail.com', 'poiuyt', 15, 'criminal'),
(4, 'Vaibhav', '1234567890', 'vaibhav123@gmail.com', 'vaibhav123%', 1, 'civil'),
(5, 'Ashok', '0987654321', 'ashok123@gmail.com', 'ashok123%', 0, 'civil'),
(6, 'Sahitha', '9876543210', 'sahitha123@gmail.com', 'sahitha123%', 0, 'civil'),
(7, 'Megha', '8907654321', 'megha123@gmail.com', 'megha123%', 0, 'civil'),
(8, 'Varun', '8888899976', 'varun123@gmail.com', 'varun123%', 0, 'civil'),
(9, 'gayathri', '9999966675', 'gayu123@gmail.com', 'gayu123%', 0, 'criminal'),
(10, 'Sheela', '1122334456', 'sheela123@gmail.com', 'sheela123%', 0, 'criminal'),
(11, 'Veera', '0099887766', 'veera123@gmail.com', 'veera123%', 0, 'criminal'),
(12, 'Vijay', '6677889900', 'vijay123@gmail.com', 'vijay123%', 1, 'criminal'),
(13, 'Meera', '6677884432', 'meera123@gmail.com', 'meera123%', 0, 'criminal'),
(14, 'Vamsi', '1234567890', 'vamsi123@gmail.com', 'vamsi123%', 1, 'criminal');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cases`
--
ALTER TABLE `cases`
  ADD PRIMARY KEY (`case_id`);

--
-- Indexes for table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`client_id`);

--
-- Indexes for table `courts`
--
ALTER TABLE `courts`
  ADD PRIMARY KEY (`court_id`);

--
-- Indexes for table `judges`
--
ALTER TABLE `judges`
  ADD PRIMARY KEY (`judge_id`);

--
-- Indexes for table `lawyers`
--
ALTER TABLE `lawyers`
  ADD PRIMARY KEY (`lawyer_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cases`
--
ALTER TABLE `cases`
  MODIFY `case_id` int(7) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `clients`
--
ALTER TABLE `clients`
  MODIFY `client_id` int(7) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `courts`
--
ALTER TABLE `courts`
  MODIFY `court_id` int(7) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `judges`
--
ALTER TABLE `judges`
  MODIFY `judge_id` int(7) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `lawyers`
--
ALTER TABLE `lawyers`
  MODIFY `lawyer_id` int(7) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
