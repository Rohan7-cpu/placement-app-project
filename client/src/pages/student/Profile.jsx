import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { uploadResume } from "../../services/userService";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      alert("Please choose a PDF.");
      return;
    }

    try {
     await uploadResume(user.id, file);

      alert("Resume Uploaded Successfully");
    } catch (error) {
      console.log(error);
      alert("Upload Failed");
    }
  };

  return (
    <DashboardLayout>

      <h2 className="text-3xl font-bold mb-6">
        My Profile
      </h2>

      <div className="bg-white shadow rounded-xl p-6 w-[500px]">

        <h3 className="text-xl font-semibold mb-4">
          Upload Resume
        </h3>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-4"
        />

        <button
          onClick={handleUpload}
          className="bg-blue-600 text-white px-5 py-2 rounded"
        >
          Upload Resume
        </button>

      </div>

    </DashboardLayout>
  );
}

export default Profile;