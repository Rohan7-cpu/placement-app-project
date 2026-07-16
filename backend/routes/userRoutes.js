const express = require("express");

const router = express.Router();

const upload = require("../middleware/upload");

const {
  getUsers,
  uploadResume,
  getUserProfile,
} = require("../controllers/userController");

router.get("/", getUsers);

router.get("/:id", getUserProfile);

router.put(
  "/resume/:id",
  upload.single("resume"),
  uploadResume
);

module.exports = router;