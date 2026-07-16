import { useEffect, useState } from "react";
import { addCompany, updateCompany } from "../../services/companyService";

function CompanyForm({ company, fetchCompanies, closeModal }) {
  const [formData, setFormData] = useState({
    name: "",
    industry: "",
    location: "",
    website: "",
    status: "Active",
  });

  useEffect(() => {
    if (company) {
      setFormData({
        name: company.name,
        industry: company.industry,
        location: company.location,
        website: company.website,
        status: company.status,
      });
    }
  }, [company]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (company) {
        await updateCompany(company._id, formData);
        alert("Company Updated Successfully");
      } else {
        await addCompany(formData);
        alert("Company Added Successfully");
      }

      fetchCompanies();
      closeModal();
    } catch (error) {
      console.log(error);
      alert("Operation Failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <h2 className="text-2xl font-bold">
        {company ? "Edit Company" : "Add Company"}
      </h2>

      <input
        type="text"
        name="name"
        placeholder="Company Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
        required
      />

      <input
        type="text"
        name="industry"
        placeholder="Industry"
        value={formData.industry}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
        required
      />

      <input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
        required
      />

      <input
        type="text"
        name="website"
        placeholder="Website"
        value={formData.website}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
        required
      />

      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      >
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg"
      >
        {company ? "Update Company" : "Save Company"}
      </button>

    </form>
  );
}

export default CompanyForm;