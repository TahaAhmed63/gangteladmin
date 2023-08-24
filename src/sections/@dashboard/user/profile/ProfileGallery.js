/* eslint-disable react/prop-types */
/* eslint-disable camelcase */

import { styled } from '@mui/material/styles';
import { Box, Card, Typography, CardContent } from '@mui/material';
import cssStyles from '../../../../utils/cssStyles';
import Image from '../../../../components/Image';


// ----------------------------------------------------------------------

const CaptionStyle = styled(CardContent)(({ theme }) => ({
  ...cssStyles().bgBlur({ blur: 2, color: theme.palette.grey[900] }),
  bottom: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  justifyContent: 'space-between',
  color: theme.palette.common.white,
}));

export default function ProfileGallery({member }) {


  
  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Associates
      </Typography>

      <Card sx={{ p: 3 }}>
        <Box
          sx={{
            display: 'grid',
            gap: 3,
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
          }}
        >
          {member?.map((e) => (
            <GalleryItem key={e?.id} {...e} />
          ))}
        </Box>
      </Card>
    </Box>
  );
}


function GalleryItem({member}) {
  const {email,first_name,last_name,image} =member
  return (
    <Card sx={{ cursor: 'pointer', position: 'relative' }}>
      <Image alt="gallery image" ratio="1/1" src={`${`http://gangtel.dev-hi.xyz`}${image}`}  />

      <CaptionStyle>
        <div>
          <Typography variant="subtitle1">{first_name} {last_name}</Typography>
          <Typography variant="body2" sx={{ opacity: 0.72 }}>
            {email}
          </Typography>
        </div>
      </CaptionStyle>
    </Card>
  );
}
