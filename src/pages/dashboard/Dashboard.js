// @mui
import {  useEffect } from 'react';
import { Grid, Container, Typography } from '@mui/material';
// hooks
import { useNavigate } from 'react-router';
import useSettings from '../../hooks/useSettings';
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
// sections
import {
  AnalyticsCurrentVisits,
  AnalyticsWebsiteVisits,
  AnalyticsWidgetSummary,
} from '../../sections/@dashboard/general/analytics';

// ----------------------------------------------------------------------

export default function Dashboard() {
  const { themeStretch } = useSettings();
  const navigate = useNavigate();


  return (
    <Page title="Dashboard">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3} onClick={()=>{navigate(PATH_DASHBOARD.subadmin.subadmin)}}>
            <AnalyticsWidgetSummary title="Sub Admin" name={714000} icon={'mdi:user'}  />
          </Grid>

          <Grid item xs={12} sm={6} md={3} onClick={()=>{navigate(PATH_DASHBOARD.character.character)}}> 
            <AnalyticsWidgetSummary title="Supervisor" name={1352831} color="info" icon={'mdi:account-supervisor-outline'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3} onClick={()=>{navigate(PATH_DASHBOARD.card.card)}}>
            <AnalyticsWidgetSummary
              title="Officers"
              name={1723315}
              color="info"
              icon={'healthicons:officer'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3} onClick={()=>{navigate(PATH_DASHBOARD.spell.spell)}}>
            <AnalyticsWidgetSummary title="Gang" name={234} color="info" icon={'pepicons-pencil:people'} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AnalyticsWebsiteVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AnalyticsCurrentVisits />
          </Grid>

        </Grid>
      </Container>
    </Page>
  );
}
