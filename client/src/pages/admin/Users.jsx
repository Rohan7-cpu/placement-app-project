import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import PageHeader from "../../components/common/PageHeader";
import SearchBar from "../../components/common/SearchBar";
import DataTable from "../../components/tables/DataTable";
import StatusBadge from "../../components/common/StatusBadge";
import { getSkills } from "../../services/skillService";

import { getUsers } from "../../services/userService";

const BASE_URL = "http://localhost:5000";

function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [skills, setSkills] = useState([]);

 useEffect(() => {
  fetchUsers();
  fetchSkills();
}, []);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchSkills = async () => {
  try {
    const data = await getSkills();
    setSkills(data);
  } catch (error) {
    console.log(error);
  }
};

  const filteredUsers = users.filter((user) => {
    const name = user.name || "";
    const email = user.email || "";
    const role = user.role || "";

    return (
      name.toLowerCase().includes(search.toLowerCase()) ||
      email.toLowerCase().includes(search.toLowerCase()) ||
      role.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <DashboardLayout>

      <PageHeader
        title="Users"
        buttonText="+ Add User"
      />

      <div className="mb-5">
        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search User..."
        />
      </div>

      <DataTable
        columns={[
        "Name",
        "Email",
         "Role",
        "Skills",
         "Resume",
        "Action",
          ]}
      >
        {filteredUsers.map((user) => (
          <tr
            key={user._id}
            className="border-b hover:bg-gray-50"
          >
            <td className="p-4">{user.name}</td>


<td>{user.email}</td>

<td>{user.role}</td>

<td>
  {skills
    .filter(
      (skill) => skill.studentEmail === user.email
    )
    .map((skill) => (
      <span
        key={skill._id}
        className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded mr-1 mb-1"
      >
        {skill.skillName}
      </span>
    ))}
</td>

<td>
  {user.resume ? (
    <a
      href={`http://localhost:5000/uploads/${user.resume}`}
      target="_blank"
      rel="noreferrer"
      className="bg-green-600 text-white px-3 py-1 rounded"
    >
      View Resume
    </a>
  ) : (
    <span className="text-gray-500">
      Not Uploaded
    </span>
  )}
</td>
          </tr>
        ))}
      </DataTable>

    </DashboardLayout>
  );
}

export default Users;