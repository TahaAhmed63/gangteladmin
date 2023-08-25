/* eslint-disable consistent-return */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect ,useMemo } from 'react';
import MaterialReactTable from "material-react-table";
import EditIcon from "@mui/icons-material/Edit";
import { Delete as DeleteIcon } from "@mui/icons-material";
import {  Link as RouterLink, useNavigate } from 'react-router-dom';
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
        size: 2,
      },
      {
        accessorKey: "first_name",
        header: "First Name",
        size: 2,
      },
      {
        accessorKey: "last_name",
        header: "Last Name",
        size: 2,
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 10,
      },
      {
        accessorKey: 'subadmin',
        header: 'Admin',
        size: 10,
        Cell: ({ row }) => {
          if (row.original.subadmin) {
            return `${row.original.subadmin.first_name} ${row.original.subadmin.last_name}`;
          }
        },
      },
      {
        accessorKey: 'subadmin',
        header: 'Supervisor',
        size: 20,
        Cell: ({ row }) => {
          if (row.original.subadmin) {
            return `${row.original.supervisor.first_name} ${row.original.supervisor.last_name}`;
          }
        },
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
      await axios.delete(`admin/officer/${rowdata}`)
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
  async function handleStatus(id) {
    try {
     
   await axios.get(`admin/subadmin/status/${id}`)
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
                borderColor: "success.main",
              }}
              color="success"
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


