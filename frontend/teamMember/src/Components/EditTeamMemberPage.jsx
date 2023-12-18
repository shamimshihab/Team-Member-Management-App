import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  Typography,
  TextField,
  Stack,
  Radio,
  FormControlLabel,
} from "@mui/material";

import InputAdornment from "@mui/material/InputAdornment";
import WarningIcon from "@mui/icons-material/Warning";
export default function EditTeamMemberPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [contactError, setContactError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [role, setRole] = useState("");
  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };
  const fetchTeamMemberInfo = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/team/teamMember/${id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch team member details");
      }

      const teamMemberInfo = await response.json();
      const { FirstName, LastName, Email, Contact, Role } = teamMemberInfo;
      setFirstName(FirstName);
      setLastName(LastName);
      setEmail(Email);
      setContact(Contact);
      setRole(Role);
    } catch (error) {
      console.error("Error fetching team member details:", error);
    }
  };

  useEffect(() => {
    fetchTeamMemberInfo();
  }, [id]);

  const handleSaveTeamMember = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    const isValidEmail = email.includes("@");
    const isValidContact = /^[0-9-]+$/.test(contact);

    if (!isValidEmail) {
      setEmailError(true);
      return;
    }

    if (!isValidContact) {
      setContactError(true);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:4000/team/updateTeamMember/${id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            FirstName: firstName,
            LastName: lastName,
            Email: email,
            Contact: contact,
            Role: role,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error updating team member:", error);
    }
  };

  const handleDeleteTeamMember = async (event) => {
    event.preventDefault();
    try {
      const confirmation = window.confirm(
        "Do you want to delete this team member?"
      );
      if (!confirmation) {
        return;
      }

      const response = await fetch(
        `http://localhost:4000/team/teamMember/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        navigate("/");
      } else {
        throw new Error("Failed to delete team member");
      }
    } catch (error) {
      console.error("Error deleting team member:", error);
    }
  };

  return (
    <>
      {" "}
      <div className="page-container">
        <div className="upper-container-add-team">
          <Typography variant="h4">Edit Team Member</Typography>
          <Typography className="sub-heading" variant="subtitle1" gutterBottom>
            Edit contact info, location and role
          </Typography>
        </div>
        <form onSubmit={handleSaveTeamMember}>
          <Stack direction={"column"} spacing={2}>
            <Typography variant="h5">Info</Typography>
            <TextField
              placeholder="Enter Your First Name"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              variant="outlined"
              required
              fullWidth
            />
            <TextField
              placeholder="Enter Your Last Name"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              variant="outlined"
              required
              fullWidth
            />
            <TextField
              placeholder="Enter Your Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              variant="outlined"
              required
              fullWidth
              error={formSubmitted && emailError}
              helperText={
                formSubmitted && emailError ? "Email should contain @" : ""
              }
              InputProps={{
                endAdornment: formSubmitted && emailError && (
                  <InputAdornment position="end">
                    <WarningIcon color="error" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              placeholder="Enter Your Contact Number "
              value={contact}
              onChange={(event) => setContact(event.target.value)}
              variant="outlined"
              required
              fullWidth
              error={formSubmitted && contactError}
              helperText={
                formSubmitted && contactError
                  ? "Only numbers and hyphens (-) are allowed"
                  : ""
              }
            />

            <Typography variant="h6">Role</Typography>
            <div className="role-box">
              <Typography>Regular-Can not Delete Members</Typography>
              <FormControlLabel
                control={<Radio />}
                value="regular"
                checked={role === "regular"}
                onChange={handleRoleChange}
              />
            </div>

            <div className="role-box">
              <Typography>Admin-Can Delete Members</Typography>
              <FormControlLabel
                control={<Radio />}
                value="admin"
                checked={role === "admin"}
                onChange={handleRoleChange}
              />
            </div>
          </Stack>

          <div className="button-group-edit-team">
            <button className="button-delete" onClick={handleDeleteTeamMember}>
              Delete
            </button>

            <button className="button" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
