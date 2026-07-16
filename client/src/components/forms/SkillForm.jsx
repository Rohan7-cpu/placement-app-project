import { useState, useEffect } from "react";
import {
  addSkill,
  updateSkill,
} from "../../services/skillService";

function SkillForm({ skill, fetchSkills, closeModal }) {
  const user = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    studentEmail: user.email,
    skillName: "",
    level: "Beginner",
  });

  useEffect(() => {
    if (skill) {
      setFormData({
        studentEmail: skill.studentEmail,
        skillName: skill.skillName,
        level: skill.level,
      });
    }
  }, [skill]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (skill) {
        await updateSkill(skill._id, formData);
        alert("Skill Updated Successfully");
      } else {
        await addSkill(formData);
        alert("Skill Added Successfully");
      }

      fetchSkills();
      closeModal();
    } catch (error) {
      console.log(error);
      alert("Operation Failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <h2 className="text-2xl font-bold">
        {skill ? "Edit Skill" : "Add Skill"}
      </h2>

      <input
        type="text"
        name="skillName"
        placeholder="Skill Name"
        value={formData.skillName}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
        required
      />

      <select
        name="level"
        value={formData.level}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      >
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Advanced">Advanced</option>
      </select>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg"
      >
        {skill ? "Update Skill" : "Add Skill"}
      </button>

    </form>
  );
}

export default SkillForm;