/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */

import { useState, useEffect ,useMemo } from 'react';
import MaterialReactTable from "material-react-table";
import EditIcon from "@mui/icons-material/Edit";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  IconButton,
} from '@mui/material';
// redux
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from '../../../redux/store';
import { getelements } from '../../../redux/slices/supervisor';
import { getProducts } from '../../../redux/slices/subadmin';
import { getDeparts } from '../../../redux/slices/department';
import axios from '../../../utils/axios';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';

export default function Element() {
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
        size: 150,
      },
      {
        accessorKey: "last_name",
        header: "last Name",
        size: 150,
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 150,
      },
      {
        accessorKey: "phone",
        header: "Phone",
        size: 150,
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
  const { elements } = useSelector((state) => state.element);
  const [tableData,setTableData]=useState([])

  useEffect(() => {
    dispatch(getelements());
    dispatch(getDeparts());
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (elements?.length) {
      setTableData(elements);
    }
  }, [elements]);

  async function handleDelete(rowdata) {
    try {
      await axios.delete(`admin/supervisor/${rowdata}`)
      .then((response)=>{ 
        if(response?.data?.status === true){
        enqueueSnackbar(response?.data?.message);
        dispatch(getelements());
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
        dispatch(getelements());
      }})
    } catch (error) {
      enqueueSnackbar(error?.message,{ 
        variant: 'error'
      });
      console.error(error);
    }
  }

  return (
    <Page title="Supervisor">
      <Container maxWidth='lg'>
        <HeaderBreadcrumbs
          heading="Supervisor"
          links={[
            { name: '', href: '' },]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              component={RouterLink}
              to={PATH_DASHBOARD.supervisor.addsupervisor}
            >
              Add Supervisor
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
              onClick={()=>{navigate(PATH_DASHBOARD.supervisor.editsupervisor(row.original.id))}}
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


