Project Title: Enterprise Bug Tracker
Project Overview:
The Enterprise Bug Tracker is a web-based application designed to help software development teams efficiently track, manage, and resolve bugs and issues during the software development lifecycle. It serves as a centralized platform where testers, developers, and project managers can collaborate to ensure software quality.

Key Features:
User Roles & Permissions:
Admin: Can manage users, projects, and overall system settings.
Tester: Can create and log new bug reports, update bug status, and assign bugs.
Developer: Can view assigned bugs, update bug status, and provide solutions.
Project Manager: Can track project progress, monitor bug resolution timelines, and generate reports.

Bug Reporting:
Testers can submit bug reports with details such as title, description, severity (low, medium, high, critical), priority, and screenshots.
The system supports categorizing bugs by module, type, and status (open, in progress, resolved, closed).

Bug Assignment & Tracking:
Bugs can be assigned to specific developers.
Status updates are tracked in real-time to monitor progress.
Notifications can be sent via email when a bug is assigned or updated.

Project Management Integration:
Multiple projects can be managed simultaneously.
Each project has a separate bug tracking dashboard.
Provides reports and analytics on bug trends, resolution times, and team performance.

Search & Filter Options:
Users can filter bugs by status, severity, priority, project, or assigned developer.
Advanced search helps quickly locate specific bugs or bug history.

Commenting & Collaboration:
Users can add comments on bugs for discussion.
Supports attaching screenshots or documents for better context.

Dashboard & Reporting:
Real-time dashboards show open, closed, and in-progress bugs.
Generates summary reports to help project managers track team performance.

Technology Stack:
Frontend: JSP, HTML, CSS, JavaScript
Backend: Java (Servlets / Spring Boot)
Database: MySQL for storing bug data, user information, and project details
Server: Apache Tomcat (for deploying the web application)
Other: JDBC for database connectivity, optional email notifications using JavaMail API

Working Flow:
User Login: Users log in based on their roles.
Project Selection: Users select the project they are working on.
Bug Reporting: Testers log new bugs with detailed information.
Bug Assignment: Admin/Project Manager assigns bugs to developers.
Bug Resolution: Developers work on the bugs and update their status.
Monitoring & Reporting: Managers and admins monitor bug statistics and project progress via dashboards.

Benefits:
Centralized platform for bug management.
Reduces miscommunication among team members.
Helps in prioritizing and resolving critical issues quickly.
Improves software quality and timely delivery of projects
Provides historical data for future project planning.
