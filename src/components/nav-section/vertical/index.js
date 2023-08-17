/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { List, Box, ListSubheader } from '@mui/material';
//
import { NavListRoot } from './NavList';

// ----------------------------------------------------------------------

export const ListSubheaderStyle = styled((props) => <ListSubheader disableSticky disableGutters {...props} />)(
  ({ theme }) => ({
    ...theme.typography.overline,
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    color: theme.palette.text.primary,
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shorter,
    }),
  })
);

// ----------------------------------------------------------------------

NavSectionVertical.propTypes = {
  isCollapse: PropTypes.bool,
  navConfig: PropTypes.array,
};

export default function NavSectionVertical({ navConfig, isCollapse = false, ...other }) {
  const user1 = JSON.parse(localStorage.getItem('user'));
  console.log(navConfig, '<=========== navConfig');
  return (
    <Box {...other}>
      {user1.role_id === 1 ? (
        <>
          {navConfig[0].items.map((group) => (
            <List key={group.subheader} disablePadding sx={{ px: 2 }}>
              <NavListRoot key={group.title} list={group} isCollapse={isCollapse} />
            </List>
          ))}
        </>
      ) : user1.role_id === 2 ? (
        <>
          {navConfig[1].items.map((group) => (
            <List key={group.subheader} disablePadding sx={{ px: 2 }}>
              <NavListRoot key={group.title} list={group} isCollapse={isCollapse} />
            </List>
          ))}
        </>
      ) : user1.role_id === 3 ? (
        <>
          {navConfig[2]?.items?.map((group) => (
            <>
              <List key={group.subheader} disablePadding sx={{ px: 2 }}>
                {/* <ListSubheaderStyle
                  sx={{
                    ...(isCollapse && {
                      opacity: 0,
                    }),
                  }}
                >
                  {group.subheader}
                </ListSubheaderStyle> */}

                <NavListRoot key={group.title} list={group} isCollapse={isCollapse} />
                {/* {group.items.map((list) => (
                ))} */}
              </List>
            </>
          ))}
        </>
      )
      :user1.role_id === 4 ?
      <>
      {navConfig[3]?.items?.map((group) => (
        <>
          <List key={group.subheader} disablePadding sx={{ px: 2 }}>
            {/* <ListSubheaderStyle
              sx={{
                ...(isCollapse && {
                  opacity: 0,
                }),
              }}
            >
              {group.subheader}
            </ListSubheaderStyle> */}

            <NavListRoot key={group.title} list={group} isCollapse={isCollapse} />
            {/* {group.items.map((list) => (
            ))} */}
          </List>
        </>
      ))}
    </>
    :
    <>
      {navConfig[4]?.items?.map((group) => (
        <>
          <List key={group.subheader} disablePadding sx={{ px: 2 }}>
            {/* <ListSubheaderStyle
              sx={{
                ...(isCollapse && {
                  opacity: 0,
                }),
              }}
            >
              {group.subheader}
            </ListSubheaderStyle> */}

            <NavListRoot key={group.title} list={group} isCollapse={isCollapse} />
            {/* {group.items.map((list) => (
            ))} */}
          </List>
        </>
      ))}
    </>
    }
    </Box>
  );
}
