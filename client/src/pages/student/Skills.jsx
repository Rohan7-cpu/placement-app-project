import { useEffect, useState, useCallback } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import PageHeader from "../../components/common/PageHeader";
import SearchBar from "../../components/common/SearchBar";
import DataTable from "../../components/tables/DataTable";
import Modal from "../../components/common/Modal";
import SkillForm from "../../components/forms/SkillForm";

import {
  getSkills,
  deleteSkill,
} from "../../services/skillService";

function Skills() {
  const [skills, setSkills] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchSkills = useCallback(async () => {
    try {
      const data = await getSkills();

      const mySkills = data.filter(
        (skill) => skill.studentEmail === user.email
      );

      setSkills(mySkills);
    } catch (error) {
      console.log(error);
    }
  }, [user.email]);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);


  const handleDelete = async (id) => {
    if (!window.confirm("Delete this skill?")) return;

    try {
      await deleteSkill(id);
      alert("Skill Deleted Successfully");
      fetchSkills();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (skill) => {
    setSelectedSkill(skill);
    setOpen(true);
  };

  const filteredSkills = skills.filter((skill) =>
    skill.skillName
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>

      <PageHeader
        title="My Skills"
        buttonText="+ Add Skill"
        onClick={() => {
          setSelectedSkill(null);
          setOpen(true);
        }}
      />

      <div className="mb-5">
        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Skill..."
        />
      </div>

      <DataTable
        columns={[
          "Skill",
          "Level",
          "Action",
        ]}
      >
        {filteredSkills.map((skill) => (
          <tr key={skill._id}>

            <td className="p-4">
              {skill.skillName}
            </td>

            <td>{skill.level}</td>

            <td className="space-x-2">

              <button
                onClick={() => handleEdit(skill)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() =>
                  handleDelete(skill._id)
                }
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>

            </td>

          </tr>
        ))}
      </DataTable>

      <Modal
        isOpen={open}
        onClose={() => {
          setOpen(false);
          setSelectedSkill(null);
        }}
      >
        <SkillForm
          skill={selectedSkill}
          fetchSkills={fetchSkills}
          closeModal={() => {
            setOpen(false);
            setSelectedSkill(null);
          }}
        />
      </Modal>

    </DashboardLayout>
  );
}

export default Skills;