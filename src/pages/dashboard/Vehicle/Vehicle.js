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
  IconButton,
} from '@mui/material';
// redux
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from '../../../redux/store';
import { getVehicles } from '../../../redux/slices/vehicle';
import axios from '../../../utils/axios';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';

// ----------------------------------------------------------------------


export default function Card() {

  const { enqueueSnackbar } = useSnackbar();
  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        size: 5,
      },
      {
        accessorKey: "registration",
        header: "Registration",
        size: 10,
      },
      {
        accessorKey: "model",
        header: "Model",
        size: 10,
      },
      {
        accessorKey: "year",
        header: "Year",
        size: 10,
      },
      {
        accessorKey: "state",
        header: "State",
        size: 10,
      },
      {
        accessorKey: "type",
        header: "Type",
        size: 10,
      },
    ],
    []
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products} = useSelector((state) => state.product);
  const [tableData,setTableData]=useState([])

  useEffect(() => {
    dispatch(getVehicles());
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
        dispatch(getVehicles());
      }})
    } catch (error) {
      enqueueSnackbar(error?.message,{ 
        variant: 'error'
      });
      console.error(error);
    }
  }

  return (
    <Page title="Vehicle">
      <Container maxWidth='lg'>
        <HeaderBreadcrumbs
          heading="Vehicle"
          links={[
            { name: '', href: '' },]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              component={RouterLink}
              to={PATH_DASHBOARD.vehicle.addvehicle}
            >
              New Vehicle
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
                color="primary"
                sx={{
                  border: "1px solid",
                  borderColor: "primary.main",
                }}
                onClick={()=>{navigate(PATH_DASHBOARD.vehicle.editvehicle(row.original.id))}}
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


