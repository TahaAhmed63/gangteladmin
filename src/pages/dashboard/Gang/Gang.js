import { useState, useEffect, useMemo } from 'react';
import MaterialReactTable from 'material-react-table';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Button, Container, IconButton,Tooltip } from '@mui/material';
// redux
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from '../../../redux/store';
import { getGangs } from '../../../redux/slices/gang';
import axios from '../../../utils/axios';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';

// ----------------------------------------------------------------------

export default function Gang() {
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

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { gangs } = useSelector((state) => state.gang);
  console.log(gangs,'---------------->>>gang')
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
   dispatch(getGangs())
  }, [dispatch]);

  useEffect(() => {
    if (gangs?.length) {
      setTableData(gangs);
    }
  }, [gangs]);

  async function handleDelete(rowdata) {
    try {
      await axios.delete(`admin/gang/${rowdata}`).then((response) => {
        if (response?.data?.status === true) {
          enqueueSnackbar(response?.data?.message);
          dispatch(getGangs());
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
    <Page title="Gang">
      <Container maxWidth="lg">
        <HeaderBreadcrumbs
          heading="Gang"
          links={[{ name: '', href: '' }]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              component={RouterLink}
              to={PATH_DASHBOARD.gang.addgang}
            >
              New Gang
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
            <Tooltip arrow title="View Gang Chapter">
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
          </Tooltip>
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
