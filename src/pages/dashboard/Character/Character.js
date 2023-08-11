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
import { getCharacter } from '../../../redux/slices/character';
import { useDispatch, useSelector } from '../../../redux/store';
import axios from '../../../utils/axios';
import { PATH_DASHBOARD } from '../../../routes/paths';
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';

export default function Character() {
  const { enqueueSnackbar } = useSnackbar();
  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        size: 2,
      },
      {
        accessorKey: "name",
        header: "Name",
        size: 15,
      },
      {
        accessorKey: "dorm.name",
        header: "Dorm",
        size: 15,
      },
      {
        accessorKey: "rarity.name",
        header: "Rarity",
        size: 15,
      },
      {
        accessorKey: "magic_type.name",
        header: "Magic Type",
        size: 15,
      },
      {
        accessorKey: "character_tag.length",
        header: "Tag",
        size: 5,
      },
      {
        accessorKey: "stat_formula.length",
        header: "State Formula",
        size: 5,
      },
      {
        accessorKey: "g_atk_modifier",
        header: "Atk Modifier",
        size: 5,
      },
      {
        accessorKey: "g_hp_modifier",
        header: "HP Modifier",
        size: 5,
      },
      {
        accessorKey: "atk_formula",
        header: "Atk Formula",
        size: 5,
      },
      {
        accessorKey: "hp_formula",
        header: "HP Formula",
        size: 5,
      },
      {
        accessorKey: "cg_thumbnail",
        header: "CG Thumbnail",
        size: 2,
        Cell: ({ renderedCellValue }) => (
          <img src={renderedCellValue} alt="Thumbnail" style={{ width: "50px", height: '50px',borderRadius:'20px' }} />
        ),
      },
      {
        accessorKey: "groovy_cg_thumbnail",
        header: "GROOVY Thumbnail",
        size: 2,
        Cell: ({ renderedCellValue }) => (
          <img src={renderedCellValue} alt="Thumbnail" style={{ width: "50px", height: '50px',borderRadius:'20px' }} />
        ),
      },
    ],
    []
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { characters} = useSelector((state) => state.character);
  const [tableData,setTableData]=useState([])
  console.log(characters)

  useEffect(() => {
    dispatch(getCharacter());
  }, [dispatch]);

  useEffect(() => {
    if (characters.length) {
      setTableData(characters);
    }
  }, [characters]);

  async function handleDelete(rowdata) {
    try {
     
   await axios.delete(`character/${rowdata}`)
      .then((response)=>{ 
        if(response?.data?.status === true){
        enqueueSnackbar(response?.data?.message);
        dispatch(getCharacter());
      }})
    } catch (error) {
      enqueueSnackbar(error?.message,{ 
        variant: 'error'
      });
      console.error(error);
    }
  }

  return (
    <Page title="Character">
      <Container maxWidth='lg'>
        <HeaderBreadcrumbs
          heading="Character"
          links={[
            { name: '', href: '' },]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              component={RouterLink}
              to={PATH_DASHBOARD.character.addcharacter}
            >
              New Character
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
                onClick={()=>{navigate(PATH_DASHBOARD.character.editcharacter(row.original.id))}}
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


