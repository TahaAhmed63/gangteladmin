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
import { getSpells } from '../../../redux/slices/spell';
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
        size: 50,
      },
      {
        accessorKey: "name",
        header: "Name",
        size: 150,
      },
      {
        accessorKey: "element.name",
        header: "Element Name",
        size: 150,
      },
      {
        accessorKey: "effect.length",
        header: "No. of Effect",
        size: 150,
      },
    ],
    []
  );


  const dispatch = useDispatch();
  const { spells } = useSelector((state) => state.spell);
  const { elements } = useSelector((state) => state.element);

  const [tableData,setTableData]=useState([])

  useEffect(() => {
    dispatch(getSpells());
  }, []);

  useEffect(() => {
    if (spells.length) {
      setTableData(spells);
    }
  }, [spells]);

  async function handleDelete(rowdata) {
    try {
      await axios.delete(`spell/${rowdata}`)
      .then((response)=>{ 
        if(response?.data?.status === true){
        enqueueSnackbar(response?.data?.message);
        dispatch(getSpells());
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
              to={PATH_DASHBOARD.spell.addspell}
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
                onClick={()=>{navigate(PATH_DASHBOARD.spell.editspell(row.original.id))}}
              >
                <EditIcon />
              </IconButton>
              <Tooltip arrow title="View Effect">
              <IconButton
              sx={{
                border: "1px solid",
                borderColor: "warning.main",
              }}
              color="warning"
              onClick={()=>{navigate(PATH_DASHBOARD.spell.spelleffect(row.original.id))}}
            >
              <VisibilityIcon />
            </IconButton>
            </Tooltip>
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


