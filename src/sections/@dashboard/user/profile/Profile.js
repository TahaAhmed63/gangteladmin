/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */

import { Grid, Stack,Box,Typography,Card,Avatar } from '@mui/material';
import { Icon } from '@iconify/react';
import ProfileAbout from './ProfileAbout';
import OtherInfo from './OtherInfo';
import ProfileSocialInfo from './ProfileSocialInfo';

export default function Profile({ member }) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Stack spacing={3}>

           <ProfileAbout member={member} />
           <OtherInfo member={member} />
        </Stack>
      </Grid>

      <Grid item xs={12} md={6}>
        <Stack spacing={3}>
          <ProfileSocialInfo member={member}/>
          <UserCard member={member?.subadmin}/>
          <UserCard member={member?.supervisor}/>
          <UserCard member={member?.officer}/>
        </Stack>
      </Grid>
    </Grid>
  );
}

function UserCard({ member }) {


  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
    <Avatar alt='' src={`${`http://gangtel.dev-hi.xyz`}${member?.image}`} sx={{ width: 48, height: 48 }} />
    <Box sx={{ flexGrow: 4, minWidth: 0, pl: 2, pr: 1 }}>
      <Typography variant="subtitle2" noWrap>
        {member?.first_name} {member?.last_name}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
         <Icon icon="ic:outline-email" sx={{ width: 16, height: 16, mr: 0.5, flexShrink: 0 }} />{' '}
        <Typography variant="body2" sx={{ color: 'text.secondary',ml:1 }} noWrap>
         {' '} {member?.email}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Icon icon="carbon:user-admin" sx={{ width: 16, height: 16, mr: 0.5, flexShrink: 0 }} />&nbsp;
        <Typography variant="body2" sx={{ color: 'text.secondary',ml:1 }} noWrap>
         { member?.role_id === 2 ? 'Admin' : 
         member?.role_id === 3 ? 'Supervisor' : 
         'Officer'}
        </Typography>
      </Box>
    </Box>
  </Card>
  );
}
