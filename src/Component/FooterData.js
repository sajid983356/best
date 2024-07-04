import React from 'react';
import { Typography, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite'; // Heart icon from Material-UI

function FooterData({translation}) {
  return (
    <Box
      role="presentation"
      sx={{
        position: 'static',
        marginTop: 'auto',
        textAlign: 'center',
        py: 2,
      }}
    >
      <Typography variant="body1" color="textSecondary">
         {translation("loveFrom")} <b> <a  target='_' style={{ textDecoration: 'none' }} href='https://www.linkedin.com/in/mohd-sajid-shaikh-b69a16146/'>{translation("name")}</a></b> {' '}
        <FavoriteIcon color="error" fontSize="inherit"  data-testid="favorite-icon" /> {/* Heart icon */}
      </Typography>
    </Box>
  );
}

export default FooterData;