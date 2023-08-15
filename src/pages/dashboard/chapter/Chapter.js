import * as Yup from 'yup';
import { useState, useEffect, useMemo } from 'react';
import MaterialReactTable from 'material-react-table';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { useParams,useNavigate, Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Button, Container, IconButton,Tooltip,Card,Grid, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import { useForm, } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from '../../../redux/store';
import { getChapters } from '../../../redux/slices/chapter';
import axios from '../../../utils/axios';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import {
  FormProvider,
  RHFTextField,
} from '../../../components/hook-form';
// ----------------------------------------------------------------------

export default function Chapter() {
  const { enqueueSnackbar } = useSnackbar();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [tableData, setTableData] = useState([]);

  const { id } = useParams();
  
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
        size: 200,
      },
    ],
    []
  );

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { chapters } = useSelector((state) => state.chapter);
  console.log(chapters)

  const chapterSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name:  '',
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(chapterSchema),
    defaultValues,
  });

  const {
    reset,
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    dispatch(getChapters(id))
   }, [dispatch]);
 
   useEffect(() => {
     if (chapters?.length) {
       setTableData(chapters);
     }
   }, [chapters]);

  async function handleDelete(rowdata) {
    try {
      await axios.delete(`admin/gang/${rowdata}`).then((response) => {
        if (response?.data?.status === true) {
          enqueueSnackbar(response?.data?.message);
          dispatch(getChapters());
        }
      });
    } catch (error) {
      enqueueSnackbar(error?.message, {
        variant: 'error',
      });
      console.error(error);
    }
  }
  const OnSubmit = async () => {
    const formValues = getValues();
    console.log(formValues)
    try {
      const chapter=new FormData();
      chapter.append('name',formValues?.name)   
      chapter.append('gang_id',id)   
      await axios.post("admin/gangchapter",chapter)
      
      .then((response)=>{ 
        if(response?.data?.status === true){
        enqueueSnackbar(response?.data?.message);
        reset();
        handleClose()
      getChapters()
      }})
    } catch (error) {
      enqueueSnackbar(error?.message,{ 
        variant: 'error'
      });
      reset();
      console.error(error);
    }
  };

  return (
    <Page title="Gang">
      <Container maxWidth="lg">
        <HeaderBreadcrumbs
          heading="Chapter"
          links={[{ name: '', href: '' }]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              onClick={handleShow}
            >
              New Chapter
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
      <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton style={{backgroundColor: '#212B36'}}>
          <Modal.Title>Chapter Info</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{
          backgroundColor: '#212B36'}}>
        <FormProvider methods={methods} onSubmit={handleSubmit(OnSubmit)}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={12}>
              <Stack spacing={3}>
                <RHFTextField name="name" label=" Name" />
              </Stack>
          </Grid>
  
        </Grid>
      </FormProvider>
        </Modal.Body>
        <Modal.Footer style={{backgroundColor: '#212B36'}}>
        <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
        Create Chapter
      </LoadingButton>
        </Modal.Footer>
      </Modal>
    </Page>
  );
}
