import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import WarningIcon from "@mui/icons-material/Warning";
import {
  Typography,
  TextField,
  Stack,
  Radio,
  FormControlLabel,
} from "@mui/material";

export default function AddMemberPage() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [contactError, setContactError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const [role, setRole] = useState("regular");
  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };
  const handelSaveTeamMember = async (event) => {
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
      const response = await fetch("http://localhost:4000/team/addTeamMember", {
        method: "POST",
        body: JSON.stringify({
          FirstName: firstName,
          LastName: lastName,
          Email: email,
          Contact: contact,
          Role: role,
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        navigate("/");
      } else {
      }
    } catch (error) {
      console.error("Error ", error);
    }
  };

  return (
    <>
      <div className="page-container">
        <div className="upper-container-add-team">
          <Typography variant="h4">Add a Team Member</Typography>
          <Typography variant="subtitle1" gutterBottom>
            Set email, location and role.
          </Typography>
        </div>
        <form onSubmit={handelSaveTeamMember} className="add-member-form">
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
                formSubmitted && !email.includes("@")
                  ? "Email should contain @"
                  : ""
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

          <div className="button-container">
            <div className="corner-button">
              <button
                className="button"
                type="submit"
                size="large"
                variant="contained"
                color="primary"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
