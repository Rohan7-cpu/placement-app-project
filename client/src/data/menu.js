import {
  FaHome,
  FaUser,
  FaBriefcase,
  FaFileAlt,
  FaClipboardList,
  FaTools,
  FaCog,
  FaUsers,
  FaBuilding,
  FaChartBar,
  FaCalendarAlt,
} from "react-icons/fa";

export const menus = {
  student: [
    { name: "Dashboard", icon: <FaHome />, path: "/student/dashboard" },
    { name: "Profile", icon: <FaUser />, path: "/student/profile" },
    { name: "Jobs", icon: <FaBriefcase />, path: "/student/jobs" },
    { name: "Applications", icon: <FaFileAlt />, path: "/student/applications" },
    { name: "Interviews", icon: <FaClipboardList />, path: "/student/interviews" },
    { name: "Skills", icon: <FaTools />, path: "/student/skills" },
    { name: "Settings", icon: <FaCog />, path: "/student/settings" },
  ],

  mentor: [
    { name: "Dashboard", icon: <FaHome />, path: "/mentor/dashboard" },
    { name: "Students", icon: <FaUsers />, path: "/mentor/students" },
    { name: "Applications", icon: <FaFileAlt />, path: "/mentor/applications" },
    { name: "Interviews", icon: <FaClipboardList />, path: "/mentor/interviews" },
    { name: "Feedback", icon: <FaChartBar />, path: "/mentor/feedback" },
  ],

  admin: [
    { name: "Dashboard", icon: <FaHome />, path: "/admin/dashboard" },
    { name: "Users", icon: <FaUsers />, path: "/admin/users" },
    { name: "Companies", icon: <FaBuilding />, path: "/admin/companies" },
     { name: "Applications", icon: <FaFileAlt />,path: "/admin/applications",},
    { name: "Interviews",icon: <FaCalendarAlt />,path: "/admin/interviews",},
    { name: "Jobs", icon: <FaBriefcase />, path: "/admin/jobs" },
    { name: "Reports", icon: <FaChartBar />, path: "/admin/reports" },
  ],
};