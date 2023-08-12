import { capitalCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box,Grid, Card, Stack, Link, Alert, Tooltip, Container, Typography,CardHeader,Paper, CardContent } from '@mui/material';
import { useNavigate } from 'react-router';
import loginwebp from '../../../assets/login.webp'
import {  PATH_ROLE_LOGIN } from '../../../routes/paths';
import {
    AnalyticsCurrentVisits,
    AnalyticsWebsiteVisits,
    AnalyticsWidgetSummary,
  } from '../../../sections/@dashboard/general/analytics';
import useAuth from '../../../hooks/useAuth';
import useResponsive from '../../../hooks/useResponsive';
// components
import Page from '../../../components/Page';
import Logo from '../../../components/Logo';
import Image from '../../../components/Image';
// sections
import { LoginForm } from '../../../sections/auth/login';
import SvgIconStyle from '../../../components/SvgIconStyle';

const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  booking: getIcon('ic_booking'),
  invoice: getIcon('ic_invoice'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
};
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Home() {
  const { method } = useAuth();
  const navigate = useNavigate();
  const smUp = useResponsive('up', 'sm');

  const mdUp = useResponsive('up', 'md');

  return (
    <Page title="Panel">
      <RootStyle>
        <Container maxWidth="md">
        
            <Stack direction="row" alignItems="center" sx={{ mb: 5,mt:10 }}>
              <Box sx={{ flexGrow: 4 }}>
                <Typography variant="h4" gutterBottom>
                  Sign in to Gangtel
                </Typography>
              </Box>
            </Stack>
            <Card>
        
            <CardContent>
              <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4} onClick={()=>{navigate(PATH_ROLE_LOGIN.admin)}}>
            <AnalyticsWidgetSummary name={"Admin"}  icon={ICONS?.user}  />
              </Grid>
              <Grid item xs={12} sm={6} md={4} onClick={()=>{navigate(PATH_ROLE_LOGIN.subadmin)}}>
          <AnalyticsWidgetSummary name={"Sub Admin"}  icon={'ant-design:android-filled'}  />
              </Grid>
              <Grid item xs={12} sm={6} md={4} onClick={()=>{navigate(PATH_ROLE_LOGIN.supervisor)}}>
                <AnalyticsWidgetSummary name={"Super Visor"}  icon={'ant-design:android-filled'}  />
              </Grid>
              <Grid item xs={12} sm={6} md={6} onClick={()=>{navigate(PATH_ROLE_LOGIN.officer)}}>
                <AnalyticsWidgetSummary name={"Officer"}  icon={'ant-design:android-filled'}  />
              </Grid>
              <Grid item xs={12} sm={6} md={6} onClick={()=>{navigate(PATH_ROLE_LOGIN.member)}}>
        <AnalyticsWidgetSummary name={"Gang Member"}  icon={'ant-design:android-filled'}  />
              </Grid>
               
              
            
              </Grid>
            </CardContent>
          </Card>

        </Container>
      </RootStyle>
    </Page>
  );
}
