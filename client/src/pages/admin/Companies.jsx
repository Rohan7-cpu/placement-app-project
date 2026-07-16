import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import PageHeader from "../../components/common/PageHeader";
import SearchBar from "../../components/common/SearchBar";
import StatusBadge from "../../components/common/StatusBadge";
import DataTable from "../../components/tables/DataTable";
import Modal from "../../components/common/Modal";
import CompanyForm from "../../components/forms/CompanyForm";

import {
  getCompanies,
  deleteCompany,
} from "../../services/companyService";

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const data = await getCompanies();
      setCompanies(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this company?")) return;

    try {
      await deleteCompany(id);
      alert("Company Deleted Successfully");
      fetchCompanies();
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };

  const handleEdit = (company) => {
    setSelectedCompany(company);
    setOpen(true);
  };

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(search.toLowerCase()) ||
    company.industry.toLowerCase().includes(search.toLowerCase()) ||
    company.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <PageHeader
        title="Companies"
        buttonText="+ Add Company"
        onClick={() => {
          setSelectedCompany(null);
          setOpen(true);
        }}
      />

      <div className="mb-5">
        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Company..."
        />
      </div>

      <DataTable
        columns={[
          "Company",
          "Industry",
          "Location",
          "Website",
          "Status",
          "Action",
        ]}
      >
        {filteredCompanies.map((company) => (
          <tr
            key={company._id}
            className="border-b hover:bg-gray-50"
          >
            <td className="p-4">{company.name}</td>

            <td>{company.industry}</td>

            <td>{company.location}</td>

            <td>
              <a
                href={company.website}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                Visit
              </a>
            </td>

            <td>
              <StatusBadge status={company.status} />
            </td>

            <td className="space-x-2">

              <button
                onClick={() => handleEdit(company)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(company._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
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
          setSelectedCompany(null);
        }}
      >
        <CompanyForm
          company={selectedCompany}
          fetchCompanies={fetchCompanies}
          closeModal={() => {
            setOpen(false);
            setSelectedCompany(null);
          }}
        />
      </Modal>
    </DashboardLayout>
  );
}

export default Companies;