import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Grid, Card, Stack, Container, Typography, CardContent } from '@mui/material';
import { useNavigate } from 'react-router';
import Iconify from '../../../components/Iconify';
import { PATH_ROLE_LOGIN } from '../../../routes/paths';
import { AnalyticsWidgetSummary } from '../../../sections/@dashboard/general/analytics';
import useAuth from '../../../hooks/useAuth';
import useResponsive from '../../../hooks/useResponsive';
// components
import Page from '../../../components/Page';
// sections



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
          <Stack direction="row" alignItems="center" sx={{ mb: 5, mt: 10 }}>
            <Box sx={{ flexGrow: 4 }}>
              <Typography variant="h4" gutterBottom>
                Sign in to Gangtel
              </Typography>
            </Box>
          </Stack>
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  onClick={() => {
                    navigate(PATH_ROLE_LOGIN.admin);
                  }}
                >
                  <AnalyticsWidgetSummary name={'Admin'} icon={'ri:admin-fill'} />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  onClick={() => {
                    navigate(PATH_ROLE_LOGIN.subadmin);
                  }}
                >
                  <AnalyticsWidgetSummary name={'Sub Admin'} icon={'subway:admin-1'} />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  onClick={() => {
                    navigate(PATH_ROLE_LOGIN.supervisor);
                  }}
                >
                  <AnalyticsWidgetSummary name={'Super Visor'} icon={'material-symbols:supervisor-account'} />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  onClick={() => {
                    navigate(PATH_ROLE_LOGIN.officer);
                  }}
                >
                  <AnalyticsWidgetSummary name={'Officer'} icon={'healthicons:officer'} />
                </Grid>
                {/* <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  onClick={() => {
                    navigate(PATH_ROLE_LOGIN.member);
                  }}
                >
                  <AnalyticsWidgetSummary name={'Gang Member'} icon={'formkit:people'} />
                </Grid> */}
              </Grid>
            </CardContent>
          </Card>
        </Container>
      </RootStyle>
    </Page>
  );
}
