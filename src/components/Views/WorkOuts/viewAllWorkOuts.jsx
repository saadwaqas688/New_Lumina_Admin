
import React, { useEffect, useState } from 'react'
import {Box,Skeleton} from '@mui/material';
import { deleteAsset, deleteService, getService, updateService } from '../../../services/services';
import DataTable from '../../UI/DataTable/DataTable';
import Modal from "@mui/material/Modal";
import AddWorkOut from './addWorkOut';
import SingleWorkOutDetails from './singleWorkOutDetails'

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
  { id: 'duration', label: 'Duration', minWidth: 100 },
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
export default function ViewAllWorkOuts() {
  const [openModal, setOpenModal] = useState(false);

  const [EditRecord, setEditRecord] = useState(false);

  const [showDetails, setShowDetails] = useState(false);
  
  const [singleRecord, setSingleRecord] = useState()
      const [equipments, setEquipments] = useState()


  function handleClose(){
    setEditRecord(false)
    setShowDetails(false)
    setSingleRecord(null)
    setOpenModal(false)
    }
    const [records, setRecords] = useState()
    const [loading, setLoading] = useState(false)
    const getAllWorkOuts = async() => {
        let list=[]
        setLoading(true)
        const querySnapshot =await getService("workOuts")

        querySnapshot.forEach((doc) => {
          list.push({id:doc.id,
              imageContain:{image:doc.data().image,title:doc.data().name},
              ...doc.data()})
                });
        setRecords(list)
        setLoading(false)
            };
    const getAllProducts = async() => {
      let list=[]
      setLoading(true)
      const querySnapshot =await getService("shop")

      querySnapshot.forEach((doc) => {
        list.push({id:doc.id,
            value:doc.data().name,
            ...doc.data()})
              });
      setEquipments(list)
      setLoading(false)
          };
    useEffect(()=>{
          getAllWorkOuts()
          getAllProducts()
       },[ ])
      
      const deleteMeal = async (id,url) => {        
        await deleteService("workOuts",id)
        if(url){
          deleteAsset(url)
        }
        await deleteService("workOuts",id)
        const result =records.filter((item)=>item.id!==id)
        setRecords(result)
      };

      const updateStatus = async (id,status) => {
        const newStatus= status==="featured"?"notFeatured":"featured";
        await updateService('workOuts',id,{status:newStatus})

        const updatedData = records.map((item) => {
            
          if(item.id === id){
              item.status=newStatus
          } 
          return item
          
          });   
        setRecords(updatedData) 
    }
    return (<>          

{   loading ? (
    <>
          <Skeleton variant="text" height={100} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="rectangular" height={300} />
    </>
):

    records && equipments?
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
            <SingleWorkOutDetails data={singleRecord}/>
                   :
            EditRecord?
            <AddWorkOut  
            equipments={equipments}
            records={records}
            setRecords={setRecords}
            handleModal={handleClose}
            getAllMeals={getAllWorkOuts}
            recordForEdit={singleRecord}
            /> :
            <AddWorkOut 
            equipments={equipments}
            records={records}
            setRecords={setRecords}
            handleModal={handleClose}
            getAllMeals={getAllWorkOuts}
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
          </>:
          <></>

}


        </>

    )
}

