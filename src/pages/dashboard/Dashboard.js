/* eslint-disable no-nested-ternary */

import { Grid, Container} from '@mui/material';
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
  const user1 = JSON.parse(localStorage.getItem('user'));

  return (
    <Page title="Dashboard">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          {
            user1.role_id === 1 ? (
              <>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  onClick={() => {
                    navigate(PATH_DASHBOARD.subadmin.subadmin);
                  }}
                >
                  <AnalyticsWidgetSummary title="Admin" name={714000} icon={'mdi:user'} />
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  onClick={() => {
                    navigate(PATH_DASHBOARD.supervisor.supervisor);
                  }}
                >
                  <AnalyticsWidgetSummary
                    title="Supervisor"
                    name={1352831}
                    color="info"
                    icon={'mdi:account-supervisor-outline'}
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  onClick={() => {
                    navigate(PATH_DASHBOARD.officer.officer);
                  }}
                >
                  <AnalyticsWidgetSummary title="Officers" name={1723315} color="info" icon={'healthicons:officer'} />
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  onClick={() => {
                    navigate(PATH_DASHBOARD.gang.gang);
                  }}
                >
                  <AnalyticsWidgetSummary title="Gang" name={234} color="info" icon={'pepicons-pencil:people'} />
                </Grid>
              </>
            ) : user1.role_id === 2 ? (
              <>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  onClick={() => {
                    navigate(PATH_DASHBOARD.supervisor.supervisor);
                  }}
                >
                  <AnalyticsWidgetSummary
                    title="Supervisor"
                    name={1352831}
                    color="info"
                    icon={'mdi:account-supervisor-outline'}
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  onClick={() => {
                    navigate(PATH_DASHBOARD.officer.officer);
                  }}
                >
                  <AnalyticsWidgetSummary title="Officers" name={1723315} color="info" icon={'healthicons:officer'} />
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  onClick={() => {
                    navigate(PATH_DASHBOARD.gang.gang);
                  }}
                >
                  <AnalyticsWidgetSummary title="Gang" name={234} color="info" icon={'pepicons-pencil:people'} />
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  onClick={() => {
                    navigate(PATH_DASHBOARD.gangmember.member);
                  }}
                >
                  <AnalyticsWidgetSummary title="Gang Member" name={234} color="info" icon={'pepicons-pencil:people'} />
                </Grid>
              </>
            ) : user1.role_id === 3 ? (
              <>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  onClick={() => {
                    navigate(PATH_DASHBOARD.officer.officer);
                  }}
                >
                  <AnalyticsWidgetSummary title="Officers" name={1723315} color="info" icon={'healthicons:officer'} />
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  onClick={() => {
                    navigate(PATH_DASHBOARD.gang.gang);
                  }}
                >
                  <AnalyticsWidgetSummary title="Gang" name={234} color="info" icon={'pepicons-pencil:people'} />
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  onClick={() => {
                    navigate(PATH_DASHBOARD.gangmember.member);
                  }}
                >
                  <AnalyticsWidgetSummary title="Gang Member" name={234} color="info" icon={'pepicons-pencil:people'} />
                </Grid>
              </>
            ) : (
              <>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  onClick={() => {
                    navigate(PATH_DASHBOARD.gang.gang);
                  }}
                >
                  <AnalyticsWidgetSummary title="Gang" name={1723315} color="info" icon={'pepicons-pencil:people'} />
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  onClick={() => {
                    navigate(PATH_DASHBOARD.gangmember.member);
                  }}
                >
                  <AnalyticsWidgetSummary title="Gang Member" name={234} color="info" icon={'pepicons-pencil:people'} />
                </Grid>
              </>
            )
            // :
            // (
            //   <>
            //    <Grid
            //       item
            //       xs={12}
            //       sm={6}
            //       md={6}
            //       onClick={() => {
            //         navigate(PATH_DASHBOARD.gangmember.member);
            //       }}
            //     >
            //       <AnalyticsWidgetSummary title="Gang Member" name={234} color="info" icon={'pepicons-pencil:people'} />
            //     </Grid>

            //    <Grid
            //       item
            //       xs={12}
            //       sm={6}
            //       md={6}
            //       onClick={() => {
            //         navigate(PATH_DASHBOARD.gangmember.vehicle);
            //       }}
            //     >
            //       <AnalyticsWidgetSummary title="Vehicle" name={234} color="info" icon={'pepicons-pencil:people'} />
            //     </Grid>
            //   </>
            // )
          }
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
