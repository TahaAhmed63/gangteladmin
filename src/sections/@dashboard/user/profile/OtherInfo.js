/* eslint-disable react/prop-types */
import { Link, Card, Typography, CardHeader, Stack } from '@mui/material';
import { Icon } from '@iconify/react';



export default function OtherInfo({ member }) {

  return (
    <Card>
      <CardHeader title="Other Information" />

      <Stack spacing={2} sx={{ p: 3 }}>

        <Stack direction="row">
        <Icon icon="icon-park-outline:edit-name"  style={{ marginRight:'10px',marginTop:'2px' }}/>
          <Typography variant="body2" sx={{color: 'text.secondary'}}>
            Gang Name&nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {member?.customerdetail?.gang?.name}
            </Link>
          </Typography>
        </Stack>
        <Stack direction="row">
        <Icon icon="icon-park-outline:edit-name"  style={{ marginRight:'10px',marginTop:'2px' }}/>
          <Typography variant="body2" sx={{color: 'text.secondary'}}>
            Gang aka&nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {member?.customerdetail?.gang_aka}
            </Link>
          </Typography>
        </Stack>
        
        <Stack direction="row">
        <Icon icon="ant-design:number-outlined" style={{ marginRight:'10px',marginTop:'2px' }}/>
          <Typography variant="body2" sx={{color: 'text.secondary'}}>
            SBI Number&nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {member?.customerdetail?.sbi_number}
            </Link>
          </Typography>
        </Stack>
        <Stack direction="row">
        <Icon icon="ant-design:number-outlined" style={{ marginRight:'10px',marginTop:'2px' }}/>
        <Typography variant="body2" sx={{color: 'text.secondary'}}>
          SBI Number State&nbsp;
          <Link component="span" variant="subtitle2" color="text.primary">
            {member?.customerdetail?.sbi_number_state}
          </Link>
        </Typography>
      </Stack>
        <Stack direction="row">
        <Icon icon="healthicons:officer" style={{ marginRight:'10px',marginTop:'2px' }} />
          <Typography variant="body2" sx={{color: 'text.secondary'}}>
          Officer Safety &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {member?.customerdetail?.officer_safety}
            </Link>
          </Typography>
        </Stack>
        <Stack direction="row">
        <Icon icon="bi:lightning-charge" style={{ marginRight:'10px',marginTop:'2px' }} />
        <Typography variant="body2" sx={{color: 'text.secondary'}}>
        Prior Charges &nbsp;
          <Link component="span" variant="subtitle2" color="text.primary">
            {member?.customerdetail?.prior_charges}
          </Link>
        </Typography>
      </Stack>

        <Stack direction="row">
        <Icon icon="icon-park-outline:women" style={{ marginRight:'10px',marginTop:'2px' }}/>
          <Typography variant="body2" sx={{color: 'text.secondary'}}>
          Old lady &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {member?.customerdetail?.old_lady}
            </Link>
          </Typography>
        </Stack>
        <Stack direction="row">
        <Icon icon="teenyicons:note-outline" style={{ marginRight:'10px',marginTop:'2px' }}/>
        <Typography variant="body2" sx={{color: 'text.secondary'}}>
          Notes &nbsp;
          <Link component="span" variant="subtitle2" color="text.primary">
            {member?.customerdetail?.notes}
          </Link>
        </Typography>
      </Stack>
      <Stack direction="row">
      <Icon icon="mdi:license" style={{ marginRight:'10px',marginTop:'2px' }}/>
      <Typography variant="body2" sx={{color: 'text.secondary'}}>
      Driver license State &nbsp;
        <Link component="span" variant="subtitle2" color="text.primary">
          {member?.customerdetail?.driver_license_state}
        </Link>
      </Typography>
    </Stack>
        <Stack direction="row">
        <Icon icon="pajamas:license-sm" style={{ marginRight:'10px',marginTop:'2px' }}/>
          <Typography variant="body2" sx={{color: 'text.secondary'}}>
          Driver License Number &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {member?.customerdetail?.driver_license_number}
            </Link>
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
