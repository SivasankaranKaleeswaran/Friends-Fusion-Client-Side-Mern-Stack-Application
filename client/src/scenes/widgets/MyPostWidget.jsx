import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Box,
  Grid,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { RiOpenaiFill, RiOpenaiLine } from "react-icons/ri";
import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import { ClickAwayListener } from "@mui/material";

const MyPostWidget = ({ picturePath }) => {
  // const [hashtag]=useState("#animey #onepiece #zoro #naruto");
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [isAiEnabled, setIsAiEnabled] = useState(false);
  const [isImageGenEnabled, setIsImageGenEnabled] = useState(false);
  const [inputAiContent, setInputAiContent] = useState("");
  const [inputImageContent, setInputImageContent] = useState("");
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;
  const [imageUrl, setImageUrl] = useState("");

  const handleGenerateImage = () => {
    // Set the predefined image URL to display in the main layout
    setImageUrl(
      "https://blog.paperspace.com/content/images/2022/07/dallemini.png"
    );
  };

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }

    const response = await fetch(`http://localhost:3001/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const posts = await response.json();
    dispatch(setPosts({ posts }));
    setImage(null);
    setPost("");
  };

  function handleAIinputField() {
    setIsAiEnabled(!isAiEnabled);
  }

  function handleImageGen() {
    setIsImageGenEnabled(!isImageGenEnabled);
  }

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImage image={picturePath} />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>
      {/* prompt generatin */}
      {isAiEnabled && (
        <Box
          sx={{
            position: "relative",
            width: "100%", // Adjust width as needed
          }}
        >
          <InputBase
            placeholder="How can i help you?"
            onChange={(e) => setInputAiContent(e.target.value)}
            value={inputAiContent}
            sx={{
              width: "100%",
              backgroundColor: palette.neutral.light,
              borderRadius: "1rem",
              padding: "2rem 3rem",
              marginTop: "1rem",
            }}
          />
          <IconButton
            sx={{
              position: "absolute",
              right: 16, // Adjust the right position as needed
              bottom: 16, // Adjust the bottom position as needed
              color: palette.background.alt, // Using your provided color
              backgroundColor: palette.primary.main, // Using your provided background color
              borderRadius: "3rem", // Using your provided border radius
              ":hover": {
                backgroundColor: "primary.dark", // Adjust hover background color as needed
              },
            }}
            onClick={() => {
              setInputAiContent("#anime #onepiece #naruto #zoro");
            }}
          >
            <SendIcon />
          </IconButton>
        </Box>
      )}

      {/* image gen */}
      {isImageGenEnabled && (
        <Grid container direction="column">
          <Grid item>
            <Box
              sx={{
                position: "relative", // Parent Box with relative position
                width: "100%",
              }}
            >
              {/* InputBase for entering text */}
              <InputBase
                placeholder="Describe the image"
                onChange={(e) => setInputImageContent(e.target.value)}
                value={inputImageContent}
                sx={{
                  width: "100%",
                  marginTop: "1rem",
                  backgroundColor: palette.neutral.light,
                  borderRadius: "1rem",
                  padding: "2rem 3rem",
                  position: "relative", // Required for absolute positioning
                }}
              />

              {/* IconButton should be in the InputBase and not move */}
              <IconButton
                sx={{
                  position: "absolute", // Keeps it fixed within the parent
                  right: 16, // Aligns to the right
                  top: "50%", // Centers vertically within the input
                  transform: "translateY(-50%)", // Ensures perfect vertical alignment
                  color: palette.background.alt,
                  backgroundColor: palette.primary.main,
                  borderRadius: "3rem",
                  ":hover": {
                    backgroundColor: "primary.dark",
                  },
                }}
                onClick={handleGenerateImage}
              >
                <SendIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Image rendered in a separate Grid item */}
          {imageUrl && (
            <Grid item>
              <Box
                sx={{
                  textAlign: "center",
                  marginTop: "2rem", // Space to avoid IconButton overlap
                }}
              >
                <img
                  src={imageUrl}
                  alt="Generated Content"
                  style={{
                    maxWidth: "100%",
                    borderRadius: "10px", // Optional rounded border
                  }}
                />
              </Box>
            </Grid>
          )}
        </Grid>
      )}

      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage("null")}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: mediumMain, cursor: "pointer" }} />
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            Image
          </Typography>
        </FlexBetween>

        {isNonMobileScreens ? (
          <>
            <FlexBetween
              gap="0.25rem"
              sx={{ "&:hover": { cursor: "pointer", color: medium } }}
              onClick={handleAIinputField}
            >
              <RiOpenaiLine sx={{ color: mediumMain, fontSize: "10rem" }} />
              <Typography color={mediumMain}>Gen Content</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <AttachFileOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Attachment</Typography>
            </FlexBetween>

            <FlexBetween
              gap="0.25rem"
              sx={{ "&:hover": { cursor: "pointer", color: medium } }}
              onClick={handleImageGen}
            >
              <MicOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Gen Image</Typography>
            </FlexBetween>
          </>
        ) : (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </FlexBetween>
        )}

        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
