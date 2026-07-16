const express = require("express");

const router = express.Router();

const {
  getApplications,
  applyJob,
  updateApplication,
  deleteApplication,
} = require("../controllers/applicationController");

router.get("/", getApplications);

router.post("/", applyJob);

router.put("/:id", updateApplication);

router.delete("/:id", deleteApplication);

module.exports = router;