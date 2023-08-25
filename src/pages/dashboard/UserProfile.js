/* eslint-disable react-hooks/exhaustive-deps */
import { capitalCase } from 'change-case';
import { useEffect, useState } from 'react';

import { styled } from '@mui/material/styles';
import { Tab, Box, Card, Tabs, Container } from '@mui/material';
import { useParams } from 'react-router';
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useAuth from '../../hooks/useAuth';
import useTabs from '../../hooks/useTabs';
import useSettings from '../../hooks/useSettings';
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import axiosInstance from '../../utils/axios';
// sections
import {
  Profile,
  ProfileCover,
  ProfileFriends,
  ProfileGallery,
} from '../../sections/@dashboard/user/profile';

// ----------------------------------------------------------------------

const TabsWrapperStyle = styled('div')(({ theme }) => ({
  zIndex: 9,
  bottom: 0,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up('sm')]: {
    justifyContent: 'center',
  },
  [theme.breakpoints.up('md')]: {
    justifyContent: 'flex-end',
    paddingRight: theme.spacing(3),
  },
}));

// ----------------------------------------------------------------------

export default function UserProfile() {
  const { themeStretch } = useSettings();

  const { user } = useAuth();

  const { id } = useParams();

  const { currentTab, onChangeTab } = useTabs('profile');

  const [MemeberDetails, setMemeberDetails] = useState();


 async function getMemberDetail() {
    // return async () => {
      try {
        const response = await axiosInstance.get(`admin/customer/${id}`);
        console.log(response, 'officer--->>>>');
        setMemeberDetails(response?.data?.customer);
      } catch (error) {
        console.log(error);
      }
    // };
  }

  useEffect(() => {
    getMemberDetail();
  }, []);

  const PROFILE_TABS = [
    {
      value: 'profile',
      icon: <Iconify icon={'ic:round-account-box'} width={20} height={20} />,
      component: <Profile member={MemeberDetails} />,
    },
    {
      value: 'Vechile',
      icon: <Iconify icon={'fluent:vehicle-car-20-filled'} width={20} height={20} />,
      component: <ProfileFriends id={MemeberDetails?.id} />,
    },
    {
      value: 'Associates',
      icon: <Iconify icon={'material-symbols:network-node'} width={20} height={20} />,
      component: <ProfileGallery member={MemeberDetails?.customerdetail?.associates} />,
    },
  ];

  return (
    <Page title="User: Profile">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Profile"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'User', href: PATH_DASHBOARD.user.root },
            { name: user?.displayName || '' },
          ]}
        />
        <Card
          sx={{
            mb: 3,
            height: 280,
            position: 'relative',
          }}
        >
          <ProfileCover member={MemeberDetails} />

          <TabsWrapperStyle>
            <Tabs
              allowScrollButtonsMobile
              variant="scrollable"
              scrollButtons="auto"
              value={currentTab}
              onChange={onChangeTab}
            >
              {PROFILE_TABS.map((tab) => (
                <Tab disableRipple key={tab.value} value={tab.value} icon={tab.icon} label={capitalCase(tab.value)} />
              ))}
            </Tabs>
          </TabsWrapperStyle>
        </Card>

        {PROFILE_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
}
