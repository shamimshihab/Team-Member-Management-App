const express = require("express");
const router = express.Router();

const TeamMembersController = require("../controllers/TeamMembersController");

router.post("/addTeamMember", TeamMembersController.addTeamMember);
router.put("/updateTeamMember/:id", TeamMembersController.updateTeamMember);
router.get("/teamMembers", TeamMembersController.getAllTeamMembers);
router.get("/teamMember/:id", TeamMembersController.getTeamMemberById);
router.delete("/teamMember/:id", TeamMembersController.deleteTeamMember);

module.exports = router;
