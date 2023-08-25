/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { useParams } from 'react-router';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Box,  Card, Typography,Stack} from '@mui/material';
import axiosInstance from '../../../../utils/axios';

export default function ProfileFriends() {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    getVehiclerDetail();
  }, []);

  async function getVehiclerDetail() {
      try {
        const response = await axiosInstance.get(`admin/vehicle?customer_id=${id}`);
        console.log(response, 'vehicles--->>>>');
        setVehicle(response?.data?.vehicles);
      } catch (error) {
        console.log(error);
      }
  }


  return (
    <Box sx={{ mt: 5 }}>
    <Typography variant="h4" sx={{ mb: 3 }}>
      Vehicles
    </Typography>
    
    {!vehicle  && 
      <>
      <div className='d-flex'> 
      <Skeleton width={400}  height={300} baseColor="#212B36" highlightColor="#161C24"/>
      <div className='px-4'>
      <Skeleton width={650}  height={55} baseColor="#212B36" highlightColor="#161C24"/>
      <Skeleton width={500}  height={56} baseColor="#212B36" highlightColor="#161C24"/>
      <Skeleton width={650}  height={56} baseColor="#212B36" highlightColor="#161C24"/>
      <Skeleton width={300}  height={56} baseColor="#212B36" highlightColor="#161C24"/>
      <Skeleton width={650}  height={56} baseColor="#212B36" highlightColor="#161C24"/>
      </div>
      </div>
      <div className='d-flex mt-5'> 
      <Skeleton width={400}  height={300} baseColor="#212B36" highlightColor="#161C24"/>
      <div className='px-4'>
      <Skeleton width={650}  height={55} baseColor="#212B36" highlightColor="#161C24"/>
      <Skeleton width={500}  height={56} baseColor="#212B36" highlightColor="#161C24"/>
      <Skeleton width={650}  height={56} baseColor="#212B36" highlightColor="#161C24"/>
      <Skeleton width={300}  height={56} baseColor="#212B36" highlightColor="#161C24"/>
      <Skeleton width={650}  height={56} baseColor="#212B36" highlightColor="#161C24"/>
      </div>
      </div>
      </>
  }
        {vehicle?.map((e)=> <FriendCard {...e}/>)}
    </Box>
  );
}


function FriendCard({ make,type,recent_picture,color,registration,registration_to ,registration_state,model,year}) {

  return (
    <Card sx={{ p: 3 ,my:3}}>
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
    <Card sx={{ cursor: 'pointer'}}>
      <img alt="Vehicle"  src={`${`http://gangtel.dev-hi.xyz`}${recent_picture}`} style={{width:'auto',height:335}} />
    </Card>
    <Stack spacing={2} sx={{ p: 3 }}>
        <Stack direction="row">
    <Icon icon="teenyicons:brush-outline" style={{ marginRight:'10px',marginTop:'2px' }} />
    <Typography variant="body2" sx={{color: 'text.secondary'}} >
      Color &nbsp;
      <Typography component="span" variant="subtitle2" color="text.primary">
        {color}
      </Typography>
    </Typography>
        </Stack>
        <Stack direction="row">
        <Icon icon="fluent-emoji-high-contrast:wheel" style={{ marginRight:'10px',marginTop:'2px' }}/>
          <Typography variant="body2" sx={{color: 'text.secondary'}}>
          Type &nbsp;
            <Typography component="span" variant="subtitle2" color="text.primary">
              {type}
            </Typography>
          </Typography>
        </Stack>
      
        <Stack direction="row">
        <Icon icon="simple-icons:worldhealthorganization" style={{ marginRight:'10px',marginTop:'2px' }}/>
          <Typography variant="body2" sx={{color: 'text.secondary'}}>
            Make &nbsp;
            <Typography component="span" variant="subtitle2" color="text.primary">
              {make}
            </Typography>
          </Typography>
        </Stack>
        <Stack direction="row">
        <Icon icon="carbon:model" style={{ marginRight:'10px',marginTop:'2px' }} />
        <Typography variant="body2" sx={{color: 'text.secondary'}}>
          Model &nbsp;
          <Typography component="span" variant="subtitle2" color="text.primary">
            {model}
          </Typography>
        </Typography>
      </Stack>
      <Stack direction="row">
      <Icon icon="iwwa:year"  style={{ marginRight:'10px',marginTop:'2px' }}/>
      <Typography variant="body2" sx={{color: 'text.secondary'}}>
        Year &nbsp;
        <Typography component="span" variant="subtitle2" color="text.primary">
          {year}
        </Typography>
      </Typography>
    </Stack>
        <Stack direction="row">
        <Icon icon="ic:sharp-app-registration" style={{ marginRight:'10px',marginTop:'2px' }}/>
          <Typography variant="body2" sx={{color: 'text.secondary'}}>
          Registration &nbsp;
            <Typography component="span" variant="subtitle2" color="text.primary">
              {registration}
            </Typography>
          </Typography>
        </Stack>
        <Stack direction="row">
        <Icon icon="medical-icon:i-registration"  style={{ marginRight:'10px',marginTop:'2px' }}/>
          <Typography variant="body2" sx={{color: 'text.secondary'}}>
          Registration To &nbsp;
            <Typography component="span" variant="subtitle2" color="text.primary">
              {registration_to}
            </Typography>
          </Typography>
        </Stack>
        <Stack direction="row">
        <Icon icon="fluent:real-estate-20-filled" style={{ marginRight:'10px',marginTop:'2px' }}/>
          <Typography variant="body2" sx={{color: 'text.secondary'}}>
          Registration State &nbsp;
            <Typography component="span" variant="subtitle2" color="text.primary">
              {registration_state}
            </Typography>
          </Typography>
        </Stack>
    </Stack>
    </Box>
    </Card>
  );
}

