const express = require("express");
const auth = require("../middleware/authMiddleware");
const {
  createContact,
  getContacts,
  getContact,
  updateContact,
  deleteContact
} = require("../controllers/contactController");

const router = express.Router();

// All routes require authentication
router.use(auth);

router.route("/")
  .get(getContacts)
  .post(createContact);

router.route("/:id")
  .get(getContact)
  .put(updateContact)
  .delete(deleteContact);

module.exports = router;
