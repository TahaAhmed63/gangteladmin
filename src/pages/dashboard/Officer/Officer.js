import { useState, useEffect ,useMemo } from 'react';
import MaterialReactTable from "material-react-table";
import EditIcon from "@mui/icons-material/Edit";
import { Delete as DeleteIcon } from "@mui/icons-material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import {  Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import {
  Box,
  Button,
  Container,
  IconButton,Tooltip
} from '@mui/material';
// redux
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from '../../../redux/store';
import { getmagictypes } from '../../../redux/slices/magictype';
import { getProduct } from '../../../redux/slices/subadmin';
import { getelements } from '../../../redux/slices/supervisor';
import axios from '../../../utils/axios';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';

export default function Officer() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate=useNavigate()
  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        size: 5,
      },
      {
        accessorKey: "first_name",
        header: "First Name",
        size: 10,
      },
      {
        accessorKey: "last_name",
        header: "Last Name",
        size: 10,
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 20,
      },
      {
        accessorKey: "subadmin",
        header: "Admin",
        size: 20,
        Cell: ({ row }) =>
          row.subadmin
            ? `${row.subadmin?.first_name ?? ""} ${row.subadmin?.last_name ?? ""}`
            : "",
      },
      {
        accessorKey: "supervisor",
        header: "Supervisor",
        size: 20,
        Cell: ({ row }) =>
          row.supervisor
            ? `${row.supervisor?.first_name ?? ""} ${row.supervisor?.last_name ?? ""}`
            : "",
      },
    ],
    []
  );


  const dispatch = useDispatch();
  const { magictypes } = useSelector((state) => state.magictype);
  const [tableData,setTableData]=useState([])

  useEffect(() => {
    dispatch(getmagictypes());
    dispatch(getProduct());
    dispatch(getelements());
  }, []);

  useEffect(() => {
    if (magictypes?.length) {
      setTableData(magictypes);
    }
  }, [magictypes]);

  async function handleDelete(rowdata) {
    try {
      await axios.delete(`spell/${rowdata}`)
      .then((response)=>{ 
        if(response?.data?.status === true){
        enqueueSnackbar(response?.data?.message);
        dispatch(getmagictypes());
      }})
    } catch (error) {
      enqueueSnackbar(error?.message,{ 
        variant: 'error'
      });
      console.error(error);
    }
  }

  return (
    <Page title="Officer">
      <Container maxWidth='lg'>
        <HeaderBreadcrumbs
          heading="Officer"
          links={[
            { name: '', href: '' },]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              component={RouterLink}
              to={PATH_DASHBOARD.officer.addofficer}
            >
              New Officer
            </Button>
          }
        />
     
          <MaterialReactTable
          columns={columns}
          data={tableData}
          enableRowActions
          renderRowActions={({ row}) => (
            <Box
              sx={{
                display: "flex",
                flexWrap: "nowrap",
                gap: "5px",
                justifyContent: "flex-center",
              }}
            >
              <IconButton
              sx={{
                border: "1px solid",
                borderColor: "primary.main",
              }}
              color="primary"
                onClick={()=>{navigate(PATH_DASHBOARD.officer.editofficer(row.original.id))}}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                color="error"
                sx={{
                  border: "1px solid",
                  borderColor: "error.main",
                }}
                 onClick={() => {
                  handleDelete(row.original.id)
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


