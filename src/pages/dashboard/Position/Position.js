import { useState, useEffect, useMemo } from 'react';
import MaterialReactTable from 'material-react-table';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Container, IconButton } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from '../../../redux/store';
import { getPosition } from '../../../redux/slices/position';
import axios from '../../../utils/axios';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';

export default function Position() {
  const { enqueueSnackbar } = useSnackbar();
  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 50,
      },
      {
        accessorKey: 'name',
        header: 'Name',
        size: 300,
      },
    ],
    []
  );

  const dispatch = useDispatch();
  const { positions } = useSelector((state) => state.position);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
   dispatch(getPosition())
  }, [dispatch]);

  useEffect(() => {
    if (positions?.length) {
      setTableData(positions);
    }
  }, [positions]);

  async function handleDelete(rowdata) {
    try {
      await axios.delete(`admin/gangposition/${rowdata}`).then((response) => {
        if (response?.data?.status === true) {
          enqueueSnackbar(response?.data?.message);
          dispatch(getPosition());
        }
      });
    } catch (error) {
      enqueueSnackbar(error?.message, {
        variant: 'error',
      });
    }
  }

  return (
    <Page title="Position">
      <Container maxWidth="lg">
        <HeaderBreadcrumbs
          heading="Position"
          links={[{ name: '', href: '' }]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              component={RouterLink}
              to={PATH_DASHBOARD.position.addposition}
            >
              New Position
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
                gap: '10px',
                justifyContent: 'flex-center',
              }}
            >
            {/* <Tooltip arrow title="View Gang Chapter">
            <IconButton
            sx={{
              border: "1px solid",
              borderColor: "warning.main",
            }}
            color="warning"
            onClick={()=>{navigate(PATH_DASHBOARD.gang.gangchapter(row.original.id))}}
          >
            <VisibilityIcon />
          </IconButton>
          </Tooltip> */}
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
