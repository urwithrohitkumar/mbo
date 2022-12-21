-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 16, 2022 at 08:46 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hotel`
--

-- --------------------------------------------------------

--
-- Table structure for table `banquet_halls_type`
--

CREATE TABLE `banquet_halls_type` (
  `id` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `created_by` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_by` int(11) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `banquet_halls_type`
--

INSERT INTO `banquet_halls_type` (`id`, `type`, `status`, `created_by`, `created_at`, `updated_by`, `updated_at`) VALUES
(1, 'Theatre', 1, 1, '2022-12-09 11:20:02', NULL, NULL),
(2, 'Boardroom', 1, 1, '2022-12-09 11:20:16', NULL, NULL),
(3, 'U-Shape', 1, 1, '2022-12-09 11:20:28', NULL, NULL),
(4, 'Wedding', 1, 1, '2022-12-09 11:20:40', NULL, NULL),
(5, 'Herringbone', 1, 1, '2022-12-09 11:20:52', NULL, NULL),
(6, 'Hollow Square', 1, 1, '2022-12-09 11:21:03', NULL, NULL),
(7, 'Classroom', 1, 1, '2022-12-09 11:21:15', NULL, NULL),
(8, 'T-Shape', 1, 1, '2022-12-09 11:21:31', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `booking_type`
--

CREATE TABLE `booking_type` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` tinyint(4) DEFAULT 1,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `booking_type`
--

INSERT INTO `booking_type` (`id`, `name`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Hotel Rooms', 1, '2022-12-09 11:10:10', NULL),
(2, 'Banquet Halls', 1, '2022-12-09 11:12:52', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role_id` int(11) NOT NULL,
  `status` tinyint(4) DEFAULT 1,
  `created_by` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_by` int(11) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`id`, `name`, `password`, `role_id`, `status`, `created_by`, `created_at`, `updated_by`, `updated_at`) VALUES
(1, 'John New', '$2a$10$S0fcvrxwnjL1NSe7cip35.sc.bdnKR8V2MMXEBbZhnbuhruwJehAq', 1, 0, 1, '2022-12-13 15:21:04', NULL, '2022-12-14 18:15:09');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `role` varchar(255) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `role`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Super Admin', 1, '2022-12-13 13:34:10', NULL),
(2, 'Vendor', 1, '2022-12-13 13:34:19', NULL),
(3, 'Employee', 1, '2022-12-13 13:34:28', NULL),
(4, 'test role', 1, '2022-12-16 10:51:39', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `room_type`
--

CREATE TABLE `room_type` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `created_by` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `updated_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `room_type`
--

INSERT INTO `room_type` (`id`, `name`, `status`, `created_by`, `created_at`, `updated_at`, `updated_by`) VALUES
(1, 'Single', 1, 1, '2022-12-09 11:17:13', NULL, NULL),
(2, 'Double', 1, 1, '2022-12-09 11:17:42', NULL, NULL),
(3, 'Triple', 1, 1, '2022-12-09 11:17:57', NULL, NULL),
(4, 'Quad', 1, 1, '2022-12-09 11:18:10', NULL, NULL),
(5, 'Queen', 1, 1, '2022-12-09 11:18:23', NULL, NULL),
(6, 'King', 1, 1, '2022-12-09 11:18:34', NULL, NULL),
(7, 'Twin', 1, 1, '2022-12-09 11:18:56', NULL, NULL),
(8, 'Suite', 1, 1, '2022-12-09 11:19:08', NULL, NULL),
(9, 'Cabana', 1, 1, '2022-12-09 11:19:20', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `created_by` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_by` int(11) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `type`, `status`, `created_by`, `created_at`, `updated_by`, `updated_at`) VALUES
(1, 'Buffet', 1, 1, '2022-12-09 11:21:51', NULL, NULL),
(2, 'Reception', 1, 1, '2022-12-09 11:21:59', NULL, NULL),
(3, 'Food-Stations', 1, 1, '2022-12-09 11:22:22', NULL, NULL),
(4, 'Cafeteria', 1, 1, '2022-12-09 11:22:32', NULL, NULL),
(5, 'Plated', 1, 1, '2022-12-09 11:22:43', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` bigint(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `otp` varchar(255) DEFAULT NULL,
  `status` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `first_name`, `last_name`, `email`, `phone`, `password`, `image`, `otp`, `status`, `created_at`, `updated_at`, `updated_by`) VALUES
(1, 'Rahul', 'Rawat', 'rahul@gmail.com', 9879879879, '$2a$10$LeHM1bZ2REW/1gnyiSixreXWhEvNwPlE9xEbvHKDUHOhXQ3PhjvAe', '/public/user_profile/1671015046605image1.png', '123456', 1, '2022-12-12 10:41:12', '2022-12-16 12:59:49', 1),
(2, 'Rahul', 'Rawat', 'rahul121@gmail.com', 9879879879, '$2a$10$77ZiMnz4OelWBX.FYs3BOenLw5KbJxGawY7QJylpEb05J0yg4fF5e', NULL, NULL, 0, '2022-12-12 10:48:32', '2022-12-12 10:48:32', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `vendor`
--

CREATE TABLE `vendor` (
  `id` int(11) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `otp` varchar(255) DEFAULT NULL,
  `business_name` varchar(255) NOT NULL,
  `business_phone` bigint(20) NOT NULL,
  `alternate_phone` bigint(20) DEFAULT NULL,
  `business_email` varchar(255) NOT NULL,
  `business_address` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `created_by` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_by` int(11) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vendor`
--

INSERT INTO `vendor` (`id`, `user_name`, `password`, `otp`, `business_name`, `business_phone`, `alternate_phone`, `business_email`, `business_address`, `image`, `start_date`, `end_date`, `status`, `created_by`, `created_at`, `updated_by`, `updated_at`) VALUES
(9, 'update vendor', '$2a$10$lct/RaWFCd4rorb9qQjUZulbYrvCVSKQFDnbDwgXAn60H6RkpqMQS', '123456', 'test business_name', 9879879879, 0, 'updateBusiness@mail.com', ' address 0diosdfksdfi diosdf9 iksdfksdf', '/public/vendor_profile/1671019106924_logo.png', NULL, NULL, 0, 1, '2022-12-13 16:53:48', 9, '2022-12-16 11:51:00'),
(14, 'test vendor', '$2a$10$UXDPHYZ7iJ2heZ0KZ3kSfOrDdttOiZhcJqnC3BGcTC1t3n8w47BcW', NULL, 'test business', 8888888888, 9999999999, 'test@gmail.com', 'drwwwwrewr', NULL, NULL, NULL, 1, 1, '2022-12-16 10:30:44', NULL, NULL),
(15, 'Vendor Name', '$2a$10$s2Hu1/AngjmWhFbHlKY7LukdcUaCMxu7YawstwQts09/4JDQ/PRx2', NULL, 'Vendor Business Name', 9999999999, NULL, 'business@mail.com', 'test address - 250001', NULL, NULL, NULL, 1, 1, '2022-12-16 10:32:24', NULL, NULL),
(23, 'update vendor new', '$2a$10$ghI0D0QQ1Ergng9Oa2B89eENHRYDpXgKjAPaj8nXCbMorBBgiuKxq', NULL, 'test business name', 9879879879, 0, 'updateBusiness@mail.com', ' address 0diosdfksdfi diosdf9 iksdfksdf', NULL, NULL, NULL, 1, 1, '2022-12-16 11:13:06', 1, '2022-12-16 11:13:58'),
(24, 'Smriti', '$2a$10$Wai1/am6tXZiO6P9NBiqReDQYN5/9cqeBhQAFLfEiHM6d.vRJxAL.', NULL, 'Smriti Business', 8989898989, 9999999999, 'smriti@gmail.com', 'edtfertert', NULL, NULL, NULL, 1, 1, '2022-12-16 11:24:00', NULL, '2022-12-16 11:24:30');

-- --------------------------------------------------------

--
-- Table structure for table `vendor_request`
--

CREATE TABLE `vendor_request` (
  `id` int(11) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `business_name` varchar(255) NOT NULL,
  `business_phone` varchar(255) NOT NULL,
  `business_email` varchar(255) NOT NULL,
  `business_address` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vendor_request`
--

INSERT INTO `vendor_request` (`id`, `user_name`, `business_name`, `business_phone`, `business_email`, `business_address`, `created_at`) VALUES
(17, 'htyutyuyt', 'fdgdhfg', '8989898989', 'rohit@gmail.com', 'fdg', '2022-12-16 11:20:11');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `banquet_halls_type`
--
ALTER TABLE `banquet_halls_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `booking_type`
--
ALTER TABLE `booking_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `room_type`
--
ALTER TABLE `room_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vendor`
--
ALTER TABLE `vendor`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vendor_request`
--
ALTER TABLE `vendor_request`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `banquet_halls_type`
--
ALTER TABLE `banquet_halls_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `booking_type`
--
ALTER TABLE `booking_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `room_type`
--
ALTER TABLE `room_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `vendor`
--
ALTER TABLE `vendor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `vendor_request`
--
ALTER TABLE `vendor_request`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
