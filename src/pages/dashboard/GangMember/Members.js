/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect, useMemo } from 'react';
import MaterialReactTable from 'material-react-table';
import EditIcon from '@mui/icons-material/Edit';
import { Delete as DeleteIcon } from '@mui/icons-material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import { Box, Button, Container, IconButton } from '@mui/material';
// redux
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from '../../../redux/store';
import { getMembers } from '../../../redux/slices/Member';
import { getProduct } from '../../../redux/slices/subadmin';
import { getelements } from '../../../redux/slices/supervisor';
import { getmagictypes } from '../../../redux/slices/magictype';
import { getChapters } from '../../../redux/slices/chapter';
import { getGangs } from '../../../redux/slices/gang';
import { getPosition } from '../../../redux/slices/position';

// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
import axiosInstance from '../../../utils/axios';
// components
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';

export default function Member() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 5,
      },
      {
        accessorKey: 'image',
        header: 'Image',
        size: 10,
        Cell: ({ row }) => {
          if (row.original.image) {
            console.log('Subadmin data:', row.original.image); // Check the subadmin object
            return (
              <>
                {' '}
                <img src={`${`http://gangtel.dev-hi.xyz`}${row.original.image}`} alt="" width={70} height={70} style={{borderRadius:'10px'}}/>
              </>
            );
          }
        },
      },
      {
        accessorKey: 'first_name',
        header: 'First Name',
        size: 10,
      },
      {
        accessorKey: 'last_name',
        header: 'Last Name',
        size: 10,
      },
      {
        accessorKey: 'email',
        header: 'Email',
        size: 20,
      },
      {
        accessorKey: 'subadmin',
        header: 'Admin',
        size: 20,
        Cell: ({ row }) => {
          if (row.original.subadmin) {
            return `${row.original.subadmin.first_name} ${row.original.subadmin.last_name}`;
          }
        },
      },
      {
        accessorKey: 'supervisor',
        header: 'Supervisor',
        size: 20,
        Cell: ({ row }) => {
          console.log('Row data:', row); // Check the structure of row data
          if (row.original.supervisor) {
            console.log('Subadmin data:', row.original.subadmin); // Check the subadmin object
            return `${row.original.supervisor.first_name} ${row.original.supervisor.last_name}`;
          }
        },
      },
    ],
    []
  );

  const dispatch = useDispatch();
  const { members } = useSelector((state) => state.member);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    dispatch(getMembers());
    dispatch(getProduct());
    dispatch(getelements());
    dispatch(getmagictypes());
    dispatch(getChapters());
    dispatch(getGangs());
    dispatch(getPosition());
  }, []);

  useEffect(() => {
    if (members?.length) {
      setTableData(members);
    }
  }, [members]);

  async function handleDelete(rowdata) {
    try {
      await axiosInstance.delete(`admin/customer/${rowdata}`).then((response) => {
        if (response?.data?.status === true) {
          enqueueSnackbar(response?.data?.message);
          dispatch(getMembers());
        }
      });
    } catch (error) {
      enqueueSnackbar(error?.message, {
        variant: 'error',
      });
      console.error(error);
    }
  }

  return (
    <Page title="Member">
      <Container maxWidth="lg">
        <HeaderBreadcrumbs
          heading="Member"
          links={[{ name: '', href: '' }]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              component={RouterLink}
              to={PATH_DASHBOARD.gangmember.addmember}
            >
              New Member
            </Button>
          }
        />

        <MaterialReactTable
          columns={columns}
          data={tableData}
          enableRowActions
          renderRowActions={({ row }) => (
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'nowrap',
                gap: '5px',
                justifyContent: 'flex-center',
              }}
            >
              {/* <IconButton
                sx={{
                  border: '1px solid',
                  borderColor: 'success.main',
                }}
                color="success"
                onClick={() => {
                  navigate(PATH_DASHBOARD.gangmember.editmember(row.original.id));
                }}
              >
                <EditIcon />
              </IconButton> */}
              <IconButton
                color="success"
                sx={{
                  border: '1px solid',
                  borderColor: 'success.main',
                }}
                onClick={() => {
                  navigate(PATH_DASHBOARD.user.profile(row.original.id));
                }}
              >
                <RemoveRedEyeIcon />
              </IconButton>
              <IconButton
                color="success"
                sx={{
                  border: '1px solid',
                  borderColor: 'success.main',
                }}
                onClick={() => {
                  navigate(PATH_DASHBOARD.gangmember.update(row.original.id));
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                color="error"
                sx={{
                  border: '1px solid',
                  borderColor: 'error.main',
                }}
                onClick={() => {
                  handleDelete(row.original.id);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          )}
          positionActionsColumn="last"
        />
      </Container>
    </Page>
  );
}
