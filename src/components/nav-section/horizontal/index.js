/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types';
import { memo } from 'react';
// @mui
import { Stack } from '@mui/material';
//
import { NavListRoot } from './NavList';

// ----------------------------------------------------------------------

const hideScrollbar = {
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
  overflowY: 'scroll',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
};

NavSectionHorizontal.propTypes = {
  navConfig: PropTypes.array,
};

function NavSectionHorizontal({ navConfig }) {
  const user1 = JSON.parse(localStorage.getItem('user'));
  console.log(navConfig, 'navConfig');
  return (
    <>
      <Stack direction="row" justifyContent="center" sx={{ bgcolor: 'background.neutral', borderRadius: 1, px: 0.5 }}>
        <Stack direction="row" sx={{ ...hideScrollbar, py: 1 }}>
          {user1.role_id === 1 ? (
            <>
              {navConfig[0]?.map((group) => (
                <Stack key={group.subheader} direction="row" flexShrink={0}>
                  {group.items.map((list) => (
                    <NavListRoot key={list.title} list={list} />
                  ))}
                </Stack>
              ))}
            </>
          ) : user1.role_id === 2 ? (
            <>
              {navConfig[1]?.map((group) => (
                <Stack key={group.subheader} direction="row" flexShrink={0}>
                  {group.items.map((list) => (
                    <NavListRoot key={list.title} list={list} />
                  ))}
                </Stack>
              ))}
            </>
          ) : user1.role_id === 3 ? (
            <>
              {navConfig[2]?.map((group) => (
                <Stack key={group.subheader} direction="row" flexShrink={0}>
                  {group.items.map((list) => (
                    <NavListRoot key={list.title} list={list} />
                  ))}
                </Stack>
              ))}
            </>
          ) : user1.role_id === 4 ? (
            <>
              {navConfig[3]?.map((group) => (
                <Stack key={group.subheader} direction="row" flexShrink={0}>
                  {group.items.map((list) => (
                    <NavListRoot key={list.title} list={list} />
                  ))}
                </Stack>
              ))}
            </>
          ):(
            <>
              {navConfig[4]?.map((group) => (
                <Stack key={group.subheader} direction="row" flexShrink={0}>
                  {group.items.map((list) => (
                    <NavListRoot key={list.title} list={list} />
                  ))}
                </Stack>
              ))}
            </>)
        }
        </Stack>
      </Stack>
    </>
  );
}

export default memo(NavSectionHorizontal);
