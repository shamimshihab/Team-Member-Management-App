const TeamMembers = require("../models/TeamMembers");

exports.getAllTeamMembers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    const allTeamMembers = await TeamMembers.find().skip(skip).limit(limit);
    const totalCount = await TeamMembers.countDocuments();
    const totalPages = Math.ceil(totalCount / limit);

    res.status(200).json({
      currentPage: page,
      totalPages: totalPages,
      totalTeamMembers: totalCount,
      allTeamMembers: allTeamMembers,
    });
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

exports.addTeamMember = async (req, res) => {
  try {
    const { FirstName, LastName, Email, Contact, Role } = req.body;

    const teamMember = await TeamMembers.create({
      FirstName,
      LastName,
      Email,
      Contact,
      Role,
    });

    res.status(201).json(teamMember);
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

exports.updateTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { FirstName, LastName, Email, Contact, Role } = req.body;

    const teamMemberInfo = await TeamMembers.findById(id);
    if (!teamMemberInfo) {
      return res.status(404).json({ error: "Team Member not found" });
    }
    const updatedTeamMemberInfo = await teamMemberInfo.update({
      FirstName,
      LastName,
      Email,
      Contact,
      Role,
    });
    res.status(200).json({ message: "Team Member Updated Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

exports.getTeamMemberById = async (req, res) => {
  try {
    const { id } = req.params;
    const teamMemberDetails = await TeamMembers.findById(id);

    if (!teamMemberDetails) {
      return res.status(404).json({ error: "Team Member not found" });
    }

    res.status(200).json(teamMemberDetails);
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

exports.deleteTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTeamMember = await TeamMembers.findByIdAndDelete(id);

    if (!deletedTeamMember) {
      return res.status(404).json({ error: "Team Member not found" });
    }

    res.status(200).json({ message: "Team Member deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};
