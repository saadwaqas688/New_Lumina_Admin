import React, { useEffect, useState } from 'react'
// import FormikForm from './addMeal';
import {Box, Paper, Skeleton} from '@mui/material';
import { deleteAsset, deleteService, getService, updateService } from '../../../services/services';
// import Popup from '../../UI/Popup/Popup';
import DataTable from '../../UI/DataTable/DataTable';
import Modal from "@mui/material/Modal";
import AddMeal from './addMeal'; 
import SingleMealDetails from './singleMealDetails'

// const headCells = [
//     { id: 'title', label: 'Title' },
//     { id: 'Details', label: 'Details', disableSorting: true },
//     { id: 'status', label: 'Status', disableSorting: true },
//     { id: 'Actions', label: 'Actions', disableSorting: true },

// ]
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
   height:"80%",
  overflow:'scroll',
  bgcolor: "background.paper",
  border: "2px solid #fbbe36",
  p:4,
  boxShadow: 24,
  borderRadius: 2,
};
const columns = [
  { id: 'imageContain', label: 'Title', minWidth: 170 },
  { id: 'Details', label: 'Details', minWidth: 100 },
  {
    id: "status",
    label: 'Status',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'Actions',
    label: 'Actions',
    minWidth: 170,
    align: 'right',
  },
];
export default function ViewAllMeals() {
  const [openModal, setOpenModal] = React.useState(false);

  const [EditRecord, setEditRecord] = React.useState(false);

  const [showDetails, setShowDetails] = React.useState(false);
  
  const [singleRecord, setSingleRecord] = useState()

  // const handleOpen = () => setOpen(true);
  const handleOpenForm = () => setOpenModal(true);
  function handleClose(){
    setEditRecord(false)
    setShowDetails(false)
    setSingleRecord(null)
    setOpenModal(false)
    }
  // function handleCloseForm(){
  //   openSingleRecordModal(false)
  //   setSingleRecord(null)
  //   setOpenForm(false);
  // } 
    const [records, setRecords] = useState()
    const [loading, setLoading] = useState(false)
    // const [openPopup, setOpenPopup] = useState(false)
    const [recordForEdit, setRecordForEdit] = useState(null)
    const getAllMeals = async() => {
        let list=[]
        setLoading(true)
        const querySnapshot =await getService("meal")

        querySnapshot.forEach((doc) => {
          list.push({id:doc.id,
              imageContain:{image:doc.data().image,title:doc.data().title},
              ...doc.data()})
                });
        setRecords(list)
        setLoading(false)
            };


      function handleModal(){
        setRecordForEdit('')
    //     setOpenPopup(!openPopup)
    }
    useEffect(()=>{
        // if(!openPopup){
       getAllMeals()
        // }
       },[ ])
      
      const deleteMeal = async (id,url) => {
        console.log('ViewAllProducts',url)
        
        await deleteService("shop",id)
        if(url){
          deleteAsset(url)
        }
        await deleteService("meal",id)
        const result =records.filter((item)=>item.id!==id)
        setRecords(result)
      };

      const updateStatus = async (id,status) => {
        const newStatus= status==="featured"?"notFeatured":"featured";
        await updateService('meal',id,{status:newStatus})

        const updatedData = records.map((item) => {
            
          if(item.id === id){
              item.status=newStatus
          } 
          return item
          
          });   
        setRecords(updatedData) 
    }
    console.log('records',records)
    // function showDetails(record){
    //   setOpenSingleRecordModal(true)
    //  setSingleRecord(record)
    //  handleOpenForm()

    // }
    return (<>          

{   loading ? (
    <>
          <Skeleton variant="text" height={100} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="rectangular" height={300} />
    </>
):

    records ?
    <>
       <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <Paper sx={{width:'500',height:'500'}}> */}
        { showDetails ?
            <SingleMealDetails data={singleRecord}/>
                   :
            EditRecord?
            <AddMeal  
            
            records={records}
            setRecords={setRecords}
            handleModal={handleClose}
            getAllMeals={getAllMeals}
            recordForEdit={singleRecord}
            /> :
            <AddMeal  
            
            records={records}
            setRecords={setRecords}
            handleModal={handleClose}
            getAllMeals={getAllMeals}
            recordForEdit={null}
            />
            
          }
            

          {/* </Paper> */}
        </Box>
      </Modal>
    <DataTable 
    columns={columns}
     rows={records}
     editButton={true}
     deleteButton={true}
     addNewButton={true}
     setOpenModal={setOpenModal}
    setEditRecord={setEditRecord}
    setShowDetails={setShowDetails}
    setSingleRecord={setSingleRecord}
    deleteRecord={deleteMeal}
    updateStatus={updateStatus}
     />
    {/* <Table records={records} 
    
    setOpenPopup={setOpenPopup} 
      setRecordForEdit={setRecordForEdit}
      handelDelete={deleteProduct}
      headCells={headCells}
      viewDetailsButton={true}
      editButton={true}
      deleteButton={true}
      updateStatus={updateStatus}
      addNew={true}
      path="meal"

/> */}
   
              {/* <Popup
              title="Product"
              openPopup={openPopup}
            //   setOpenPopup={setOpenPopup}
              handleModal={handleModal}

          > */}
        {/* <FormikForm
                         records={records}
                         setRecords={setRecords}
                         handleModal={handleModal}
                         getAllMeals={getAllMeals}
                         recordForEdit={recordForEdit}
        />

          </Popup> */}
          </>:
          <></>

}


        </>

    )
}
