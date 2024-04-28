import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme, Button } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { ClickAwayListener } from "@mui/material";
import { useNavigate } from "react-router-dom";
const textFieldStyle = {
  padding: "4px 8px",
  height: "40px",
  marginDown: "10px",
};

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const [twitterLink, setTwitterLink] = useState("Social Network");
  const [istwitterEdit, setIsTwitterEdit] = useState(false);
  const [isProfileEdit, setIsProfileEdit] = useState(false);
  const [isUserNameEdit, setIsUserNameEdit] = useState(false);
  const [isLinkedinEdit, setIsLinkedinEdit] = useState(false);
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [newFirstname, setNewFirstname] = useState("");
  const [newLastname, setNewLastname] = useState("");
  const [linkedinLink, setLinkedinLink] = useState("Network Platform");
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  const saveLinkedin = (event) => {
    setLinkedinLink(event.target.value);
  };

  const saveFirstName = (event) => {
    setNewFirstname(event.target.value);
  };
  const saveLastName = (event) => {
    setNewLastname(event.target.value);
  };
  const saveTwitterLink = (event) => {
    setTwitterLink(event.target.value);
  };
  const enableLinkedinEdit = () => {
    setIsLinkedinEdit(!isLinkedinEdit);
  };

  const enableTwitterEdit = () => {
    setIsTwitterEdit(!istwitterEdit);
  };

  const handleEditProfile = (event) => {
    setIsEditProfile(!isEditProfile);
  };

  const enableUserNameEdit = () => {
    setIsUserNameEdit(!isUserNameEdit);
  };

  const renderName = () => {
    if (newFirstname && newLastname) {
      return `${newFirstname} ${newLastname}`;
    } else if (newFirstname) {
      return `${newFirstname} ${lastName}`;
    } else if (newLastname) {
      return `${firstName} ${newLastname}`;
    } else {
      return `${firstName} ${lastName}`;
    }
  };
  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
  } = user;

  return (
    <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween gap="0.5rem" pb="1.1rem">
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Box>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="h4"
                color={dark}
                fontWeight="500"
                sx={{
                  "&:hover": {
                    color: palette.primary.light,
                    cursor: "pointer",
                  },
                }}
                onClick={() => navigate(`/profile/${userId}`)} // This should work for name only
              >
                {renderName()}
                {isEditProfile && isUserNameEdit && (
                  <TextField
                    onChange={saveFirstName}
                    variant="outlined"
                    fullWidth
                    placeholder="Enter first name"
                    InputProps={{ style: textFieldStyle }}
                    margin="dense"
                  />
                )}
                {isEditProfile && isUserNameEdit && (
                  <TextField
                    onChange={saveLastName}
                    variant="outlined"
                    fullWidth
                    placeholder="Enter last name"
                    InputProps={{ style: textFieldStyle }}
                    margin="dense"
                  />
                )}
              </Typography>

              {isEditProfile && (
                <EditOutlined
                  sx={{
                    color: main,
                    cursor: "pointer",
                    position: "sticky",
                    marginLeft: "12px",
                    textAlign: "center",
                    fontSize: "19px",
                  }}
                  onClick={enableUserNameEdit} // Independent action for editing
                />
              )}
            </div>

            <Typography color={medium}>{friends.length} friends</Typography>
          </Box>
        </FlexBetween>

        <ManageAccountsOutlined
          onClick={handleEditProfile}
          sx={{ cursor: "pointer" }}
        />
      </FlexBetween>

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
          {isEditProfile && (
              <EditOutlined
                sx={{ color: main, cursor: "pointer", position: "sticky" }}
                onClick={enableTwitterEdit}
              />
            )}
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
          {isEditProfile && (
              <EditOutlined
                sx={{ color: main, cursor: "pointer", position: "sticky" }}
                onClick={enableTwitterEdit}
              />
            )}
        </Box>
      </Box>

      <Divider />

      {/* THIRD ROW */}
      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Who's viewed your profile</Typography>
          <Typography color={main} fontWeight="500">
            {viewedProfile}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}>Impressions of your post</Typography>
          <Typography color={main} fontWeight="500">
            {impressions}
          </Typography>
        </FlexBetween>
      </Box>

      <Divider />

      {/* FOURTH ROW */}
      <ClickAwayListener
        onClickAway={() => {
          setIsLinkedinEdit(false);
          setIsTwitterEdit(false);
        }}
      >
        <Box p="1rem 0">
          <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
            Social Profiles
          </Typography>

          <FlexBetween gap="1rem" mb="0.5rem">
            <FlexBetween gap="1rem">
              <img src="../assets/twitter.png" alt="twitter" />
              <Box>
                <Typography color={main} fontWeight="500">
                  Twitter
                </Typography>
                <Typography
                  color={medium}
                  sx={{
                    maxWidth: "300px",
                  }}
                >
                  {twitterLink}
                </Typography>
                {isEditProfile && istwitterEdit && (
                  <TextField
                    onChange={saveTwitterLink}
                    variant="outlined"
                    fullWidth
                  />
                )}
              </Box>
            </FlexBetween>
            {isEditProfile && (
              <EditOutlined
                sx={{ color: main, cursor: "pointer", position: "sticky" }}
                onClick={enableTwitterEdit}
              />
            )}
          </FlexBetween>

          <FlexBetween gap="1rem">
            <FlexBetween gap="1rem">
              <img src="../assets/linkedin.png" alt="linkedin" />
              <Box>
                <Typography color={main} fontWeight="500">
                  Linkedin
                </Typography>
                <Typography
                  color={medium}
                  sx={{
                    maxWidth: "300px",
                  }}
                >
                  {linkedinLink}
                </Typography>
                {isEditProfile && isLinkedinEdit && (
                  <TextField
                    onChange={saveLinkedin}
                    variant="outlined"
                    fullWidth
                  />
                )}
              </Box>
            </FlexBetween>
            {isEditProfile && (
              <EditOutlined
                sx={{ color: main, cursor: "pointer", position: "sticky" }}
                onClick={enableLinkedinEdit}
              />
            )}
          </FlexBetween>
        { isEditProfile && <Box display="flex" justifyContent="flex-end" alignItems="center" mt="1rem">
            <Button
              sx={{
                color: palette.background.alt,
                backgroundColor: palette.primary.main,
                borderRadius: "3rem",
              }}
              onClick={handleEditProfile}
            >
              POST
            </Button>
          </Box>
}
        </Box>
      </ClickAwayListener>
    </WidgetWrapper>
  );
};

export default UserWidget;
