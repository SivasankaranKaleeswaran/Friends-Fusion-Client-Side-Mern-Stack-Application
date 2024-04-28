import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="https://storage.googleapis.com/nyc-en/2020/03/115866e0-pace.jpg"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>Pace University Admission</Typography>
        <Typography color={medium}>pace.edu</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
      The Pace Path starts with a personalized academic program that gives you a head start. No matter your major, your career goal, or your graduate study plan, your Pace education will prepare you to meet your future.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
