import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Box,
  Stack,
  CircularProgress,
  Pagination,
} from "@mui/material";
import profile from "../assets/profile1.avif";
import AddIcon from "@mui/icons-material/Add";

export default function IndexPage() {
  const navigate = useNavigate();
  const [teamMembers, setTeamMembers] = useState([]);
  const [totalTeamMembers, setTotalTeamMembers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    fetchTeamMembers(currentPage);
  }, [currentPage]);
  const fetchTeamMembers = async (page) => {
    try {
      const response = await fetch(
        `http://localhost:4000/team/teamMembers?page=${page}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setTeamMembers(data.allTeamMembers);
      setTotalTeamMembers(data.totalTeamMembers);
      setTotalPages(data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching team members:", error);
    }
  };

  const handlePaginationChange = (event, page) => {
    setCurrentPage(page);
  };

  function handelClickOnTeamMember(id) {
    navigate(`teamMember/${id}`);
  }

  function renderListOfTeamMembers() {
    return teamMembers.map((teamMember) => {
      return (
        <Box
          key={teamMember._id}
          className="single-team-member-container"
          onClick={() => {
            handelClickOnTeamMember(teamMember._id);
          }}
        >
          <Stack direction="row" spacing={3}>
            <img src={profile} className="image-style " alt="Example" />

            <Stack direction="column" spacing={2}>
              <Stack direction="row" spacing={1}>
                <Typography variant="body1">
                  {teamMember.FirstName} {teamMember.LastName}
                  {teamMember.Role === "admin" ? <> (admin)</> : <></>}
                </Typography>
              </Stack>

              <Typography className="team-member-details">
                {teamMember.Contact}
              </Typography>
              <Typography className="team-member-details">
                {teamMember.Email}
              </Typography>
            </Stack>
          </Stack>
        </Box>
      );
    });
  }

  function addButtonClicked() {
    navigate("/addMember");
  }
  return (
    <>
      <div className="page-container">
        <div>
          <div className="button-container">
            <AddIcon className="corner-button" onClick={addButtonClicked} />
          </div>
          <div className="upper-container">
            <Typography variant="h3">Team Members</Typography>
            {loading ? (
              <></>
            ) : (
              <Typography
                className="sub-heading"
                variant="subtitle1"
                gutterBottom
              >
                You Have {totalTeamMembers} Members
              </Typography>
            )}
          </div>
        </div>

        {loading ? (
          <CircularProgress />
        ) : (
          <>
            {teamMembers.length > 0 ? (
              renderListOfTeamMembers()
            ) : (
              <Typography>No team Members</Typography>
            )}
            <div className="pagination-container">
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePaginationChange}
                variant="outlined"
                shape="rounded"
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}
