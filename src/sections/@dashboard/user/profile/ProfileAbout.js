/* eslint-disable react/prop-types */

import { Link, Card, Typography, CardHeader, Stack } from '@mui/material';
import { Icon } from '@iconify/react';

export default function ProfileAbout({ member }) {


  return (
    <Card>
      <CardHeader title="About" />
      <Stack spacing={2} sx={{ p: 3 }}>
        <Stack direction="row">
        <Icon icon="mdi:location" style={{ marginRight:'10px',marginTop:'2px' }}/>
          <Typography variant="body2" sx={{color: 'text.secondary'}}>
            Live at &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {member?.customerdetail?.address_city}
            </Link>
          </Typography>
        </Stack>
        <Stack direction="row">
        <Icon icon="fluent:real-estate-20-filled" style={{ marginRight:'10px',marginTop:'2px' }}/>
          <Typography variant="body2" sx={{color: 'text.secondary'}}>
            State at &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {member?.customerdetail?.address_state}
            </Link>
          </Typography>
        </Stack>
        <Stack direction="row">
        <Icon icon="ph:file-zip" style={{ marginRight:'10px',marginTop:'2px' }}/>
        <Typography variant="body2" sx={{color: 'text.secondary'}}>
          Zip Code &nbsp;
          <Link component="span" variant="subtitle2" color="text.primary">
            {member?.customerdetail?.address_zip}
          </Link>
        </Typography>
      </Stack>

        <Stack direction="row">
        <Icon icon="ic:outline-email" style={{ marginRight:'10px',marginTop:'2px' }}/>
          <Typography variant="body2" sx={{color: 'text.secondary'}}>{member?.email}</Typography>
        </Stack>

      
        <Stack direction="row">
        <Icon icon="wpf:birthday" style={{ marginRight:'10px',marginTop:'2px' }}/>
          <Typography variant="body2" sx={{color: 'text.secondary'}}>
            DOB &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {member?.customerdetail?.dob}
            </Link>
          </Typography>
        </Stack>
        <Stack direction="row">
        <Icon icon="tabler:gender-male" style={{ marginRight:'10px',marginTop:'2px' }}/>
        <Typography variant="body2" sx={{color: 'text.secondary'}}>
          Gender &nbsp;
          <Link component="span" variant="subtitle2" color="text.primary">
            {member?.customerdetail?.gender}
          </Link>
        </Typography>
      </Stack>
        <Stack direction="row">
        <Icon icon="game-icons:body-height" style={{ marginRight:'10px',marginTop:'2px' }}/>
        <Typography variant="body2" sx={{color: 'text.secondary'}}>
          Height &nbsp;
          <Link component="span" variant="subtitle2" color="text.primary">
            {member?.customerdetail?.height}
          </Link>
        </Typography>
      </Stack>
      <Stack direction="row">
      <Icon icon="mdi:weight-lifter" style={{ marginRight:'10px',marginTop:'2px' }}/>
      <Typography variant="body2" sx={{color: 'text.secondary'}}>
        Weight &nbsp;
        <Link component="span" variant="subtitle2" color="text.primary">
          {member?.customerdetail?.weight}
        </Link>
      </Typography>
    </Stack>
        <Stack direction="row">
        <Icon icon="fa:group" style={{ marginRight:'10px',marginTop:'2px' }}/>
        <Typography variant="body2" sx={{color: 'text.secondary'}}>
            Gang member at &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {member?.customerdetail?.gang?.name}
            </Link>
          </Typography>
        </Stack>

        <Stack direction="row">
        <Icon icon="mdi:phone-outline" style={{ marginRight:'10px',marginTop:'2px' }}/>
          <Typography variant="body2" sx={{color: 'text.secondary'}}>
            Phone &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {member?.phone}
            </Link>
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
