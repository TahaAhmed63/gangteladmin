import { useState, useEffect ,useMemo } from 'react';
import MaterialReactTable from "material-react-table";
import EditIcon from "@mui/icons-material/Edit";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { useNavigate, Link as RouterLink } from 'react-router-dom';
// @mui
import {
  Box,
  Button,
  Container,
  IconButton
} from '@mui/material';
// redux
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from '../../../redux/store';
import { getProducts } from '../../../redux/slices/subadmin';
import axios from '../../../utils/axios';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';

// ----------------------------------------------------------------------


export default function SubAdmin() {


  const { enqueueSnackbar } = useSnackbar();
  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        size: 50,
      },
      {
        accessorKey: "first_name",
        header: "First Name",
        size: 20,
      },
      {
        accessorKey: "last_name",
        header: "Last Name",
        size: 20,
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 20,
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 20,
        Cell:({row})=> <button className={`btn ${  row?.original?.status === 1 ? `btn-outline-success` : `btn-outline-danger`} 
        text-capitalize`} style={{ borderRadius: '20px' }} onClick={()=>handleStatus(row.original.id)}>
        {row?.original?.status === 1 ? `active` : `deactive`}
      </button>
      },
    ],
    []
  );


  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products} = useSelector((state) => state.product);
  const [tableData,setTableData]=useState([])

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (products.length) {
      setTableData(products);
    }
  }, [products]);

  async function handleDelete(rowdata) {
    try {
     
   await axios.delete(`dorm/${rowdata}`)
      .then((response)=>{ 
        if(response?.data?.status === true){
        enqueueSnackbar(response?.data?.message);
        dispatch(getProducts());
      }})
    } catch (error) {
      enqueueSnackbar(error?.message,{ 
        variant: 'error'
      });
      console.error(error);
    }
  }
  async function handleStatus(id) {
    try {
     
   await axios.get(`admin/subadmin/status/${id}`)
      .then((response)=>{ 
        if(response?.data?.status === true){
        enqueueSnackbar(response?.data?.message);
        dispatch(getProducts());
      }})
    } catch (error) {
      enqueueSnackbar(error?.message,{ 
        variant: 'error'
      });
      console.error(error);
    }
  }

  return (
    <Page title="Admin">
      <Container maxWidth='lg'>
        <HeaderBreadcrumbs
          heading="Admin"
          links={[
            { name: '', href: '' },]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              component={RouterLink}
              to={PATH_DASHBOARD.subadmin.addsubadmin}
            >
              New Admin
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
                display: "flex",
                flexWrap: "nowrap",
                gap: "10px",
                justifyContent: "flex-center",
              }}
            >
              <IconButton
                color="success"
                sx={{
                  border: "1px solid",
                  borderColor: "success.main",
                }}
                onClick={()=>{navigate(PATH_DASHBOARD.subadmin.editsubadmin(row.original.id))}}
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


