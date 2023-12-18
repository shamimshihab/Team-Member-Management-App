const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const TeamMembersSchema = new Schema({
  FirstName: String,
  LastName: String,
  Email: String,
  Contact: String,
  Role: String,
});

const TeamMembersModel = model("TeamMembers", TeamMembersSchema);

module.exports = TeamMembersModel;
