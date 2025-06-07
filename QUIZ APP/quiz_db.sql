-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 20, 2025 at 05:05 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `quiz_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `id` int(11) NOT NULL,
  `topic_id` int(11) NOT NULL,
  `question` text NOT NULL,
  `option1` varchar(255) NOT NULL,
  `option2` varchar(255) NOT NULL,
  `option3` varchar(255) NOT NULL,
  `option4` varchar(255) NOT NULL,
  `correct_option` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`id`, `topic_id`, `question`, `option1`, `option2`, `option3`, `option4`, `correct_option`) VALUES
(1, 1, 'What is the full form of DBMS?', 'Data of Binary Management System', 'Database Management System', 'Database Management Service', 'Data Backup Management System', 2),
(2, 1, 'What is a database?', 'Organized collection of information that cannot be accessed, updated, and managed', 'Collection of data or information without organizing', 'Organized collection of data or information that can be accessed, updated, and managed', 'Organized collection of data that cannot be updated', 3),
(3, 1, 'What is DBMS?', 'DBMS is a collection of queries', 'DBMS is a high-level language', 'DBMS is a programming language', 'DBMS stores, modifies and retrieves data', 4),
(4, 1, 'Who created the first DBMS?', 'Edgar Frank Codd', 'Charles Bachman', 'Charles Babbage', 'Sharon B. Codd', 2),
(5, 1, 'Which type of data can be stored in the database?', 'Image oriented data', 'Text, files containing data', 'Data in the form of audio or video', 'All of the above', 4),
(6, 2, 'What is web technology?', 'A collection of tools and techniques used to create and deliver content on the World Wide Web', 'A type of software that enables users to access and interact with information on the internet', 'A network of interconnected computers that share information and services', 'A system for storing and retrieving information on the internet', 1),
(7, 2, 'Which HTML tag is used to create a hyperlink?', '<link>', '<href>', '<a>', '<hyperlink>', 3),
(8, 2, 'Which programming language is commonly used for server-side scripting?', 'HTML', 'CSS', 'JavaScript', 'PHP', 4),
(9, 2, 'Which of the following is used to read a HTML page and render it?', 'Web server', 'Web matrix', 'Web browser', 'None of the mentioned', 3),
(10, 2, 'Which of the following is a popular front-end framework for JavaScript?', 'Django', 'Angular', 'Flask', 'Node.js', 2),
(11, 3, 'What is an operating system?', 'Interface between the hardware and application programs', 'Collection of programs that manages hardware resources', 'System service provider to the application programs', 'All of the mentioned', 4),
(12, 3, 'What is the main function of the command interpreter?', 'To provide the interface between the API and application program', 'To handle the files in the operating system', 'To get and execute the next user-specified command', 'None of the mentioned', 3),
(13, 3, 'In Operating Systems, which of the following is/are CPU scheduling algorithms?', 'Priority', 'Round Robin', 'Shortest Job First', 'All of the mentioned', 4),
(14, 3, 'To access the services of the operating system, the interface is provided by the ___________', 'Library', 'System calls', 'Assembly instructions', 'API', 2),
(15, 3, 'CPU scheduling is the basis of ___________', 'Multiprogramming operating systems', 'Larger memory-sized systems', 'Multiprocessor systems', 'None of the mentioned', 1),
(16, 4, 'What is a computer network?', 'A device used to display information on a computer screen', 'A collection of interconnected computers and devices that can communicate and share resources', 'A type of software used to create documents and presentations', 'The physical casing that protects a computer’s internal components', 2),
(17, 4, 'What is the internet?', 'A network of interconnected local area networks', 'A collection of unrelated computers', 'Interconnection of wide area networks', 'A single network', 3),
(18, 4, 'Which of the following is an example of Bluetooth?', 'Wide area network', 'Virtual private network', 'Local area network', 'Personal area network', 4),
(19, 4, 'Which of the following computer networks is built on the top of another network?', 'Overlay network', 'Prime network', 'Prior network', 'Chief network', 1),
(20, 4, 'What is the full form of OSI?', 'Optical Service Implementation', 'Open Service Internet', 'Open System Interconnection', 'Operating System Interface', 3);

-- --------------------------------------------------------

--
-- Table structure for table `scores`
--

CREATE TABLE `scores` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `topic_id` int(11) NOT NULL,
  `score` int(11) NOT NULL,
  `quiz_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `scores`
--

INSERT INTO `scores` (`id`, `user_id`, `username`, `topic_id`, `score`, `quiz_date`) VALUES
(1, 1, 'subhiksha', 1, 2, '2025-03-01 13:14:29'),
(2, 2, 'abi', 2, 2, '2025-03-01 13:15:18'),
(3, 1, 'subhiksha', 4, 0, '2025-03-01 13:26:04'),
(4, 3, 'hema', 2, 3, '2025-03-04 03:46:24'),
(5, 4, 'nivi', 4, 0, '2025-03-06 03:52:22'),
(6, 4, 'nivi', 1, 0, '2025-03-06 03:55:52'),
(7, 2, 'abi', 1, 1, '2025-03-10 13:22:54'),
(8, 4, 'nivi', 1, 3, '2025-03-18 03:38:45'),
(9, 4, 'nivi', 1, 0, '2025-03-18 03:42:10'),
(10, 4, 'nivi', 2, 0, '2025-03-18 04:14:51'),
(11, 4, 'nivi', 1, 0, '2025-03-18 04:17:32'),
(12, 4, 'nivi', 1, 0, '2025-03-18 04:19:58'),
(13, 4, 'nivi', 1, 3, '2025-03-18 04:28:29');

-- --------------------------------------------------------

--
-- Table structure for table `topics`
--

CREATE TABLE `topics` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `topics`
--

INSERT INTO `topics` (`id`, `name`) VALUES
(1, 'DBMS'),
(2, 'Web Technology'),
(3, 'Operating Systems'),
(4, 'Computer Networks');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`) VALUES
(1, 'subhiksha', 'subixx2004@gmail.com', '$2y$10$CaVTgNq1gkyMVfJjKwncCuqDvyynvsnEV2XfJmWKLbfrC5PLHwH3C'),
(2, 'abi', 'subhiksharajumohan2004@gmail.com', '$2y$10$jr06.RV70LVhBeZ9L0/hGuKSutAYUQW4owMgdQ/zDir/lWtaMw/Au'),
(3, 'hema', 'hemavathi.2206014@srit.org', '$2y$10$V1/PgW013QwFsvIALq8R0uVeO6NJ0oaAxshCHnyLbuSUYQhqz49qO'),
(4, 'nivi', 'nivi2005@gmail.com', '$2y$10$65EAvDglLdfphCU/96778.U0wOUdm/BDtYZ3b9NTxyYNNpJtp1SNy');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `topic_id` (`topic_id`);

--
-- Indexes for table `scores`
--
ALTER TABLE `scores`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `topic_id` (`topic_id`);

--
-- Indexes for table `topics`
--
ALTER TABLE `topics`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `scores`
--
ALTER TABLE `scores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `topics`
--
ALTER TABLE `topics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`topic_id`) REFERENCES `topics` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `scores`
--
ALTER TABLE `scores`
  ADD CONSTRAINT `scores_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `scores_ibfk_2` FOREIGN KEY (`topic_id`) REFERENCES `topics` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
