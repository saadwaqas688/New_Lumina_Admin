import React, { useEffect, useState } from 'react'
import {Box,Skeleton} from '@mui/material';
import { deleteAsset, deleteService, getService, updateService } from '../../../services/services';
import DataTable from '../../UI/DataTable/DataTable';
import Modal from "@mui/material/Modal";
import SingleOrderDetails from './singleOrderDetails';
import AddNotes from './addNotes';
import Chat from '../Chat/Chat';
const styleDetails = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
   height:"80%",
  overflow:'scroll',
  bgcolor: "background.paper",
  border: "2px solid #ff6699",
  p:4,
  boxShadow: 24,
  borderRadius: 2,
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
   height:"55%",
  overflow:'hidden',
  bgcolor: "background.paper",
  border: "2px solid #ff6699",
  p:4,
  boxShadow: 24,
  borderRadius: 2,
};

const styleChat = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  height:"80%",
  overflow:'scroll',
  overflowX: "hidden",
  bgcolor: "background.paper",
  border: "2px solid #ff6699",
  p:4,
  boxShadow: 24,
  borderRadius: 2,
};
const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'Chat', label: 'Chat', minWidth: 100 },
  { id: 'Notes', label: 'Notes', minWidth: 170 },
  { id: 'Details', label: 'View Details', minWidth: 170 },

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
export default function ViewAllOrders() {
  const [openModal, setOpenModal] = useState(false);

  const [showDetails, setShowDetails] = useState(false);

  const [EditRecord, setEditRecord] = React.useState(false);

  
  const [singleRecord, setSingleRecord] = useState()

  const [addNote, setAddNote] = useState()  
  
  const [openChat, setOpenChat] = useState(false) 

  const [records, setRecords] = useState()
  const [loading, setLoading] = useState(false)

  function handleClose(){
    setAddNote(false)
    setEditRecord(false)
    setShowDetails(false)
    setSingleRecord(null)
    setOpenModal(false)
    setOpenChat(false)
    }

 
    const getAllOrders = async() => {
        let list=[]
        setLoading(true)
        const querySnapshot =await getService("orders")

        querySnapshot.forEach((doc) => {
          list.push({id:doc.id,
              ...doc.data()})
                });
        setRecords(list)
        setLoading(false)
            };

    useEffect(()=>{
      getAllOrders()
       },[ ])
      
      const deleteMeal = async (record,url) => {   
        console.log(records)
        console.log(record)     
        if(url){
          deleteAsset(url)
        }
        await deleteService("orders",record.id)
        const result =records.filter((item)=>item.id!==record.id)
        setRecords(result)
        console.log(result)
      };

      const updateStatus = async (id,status) => {
        const newStatus= status==="pending"?"delivered":"pending";
        await updateService('orders',id,{status:newStatus})

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

    records ?
    <>
       <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={openChat?styleChat:showDetails?styleDetails:style}>
        { showDetails ?
            <SingleOrderDetails data={singleRecord}/>  :
            EditRecord?
            <AddNotes
            records={records}
            setRecords={setRecords}
            handleModal={handleClose}
            getAllOrders={getAllOrders}
            id={singleRecord.id}
            recordForEdit={singleRecord}
            /> :
            addNote?
            <AddNotes handleModal={handleClose} 
            getAllOrders={getAllOrders}  
             id={singleRecord.id} 
             
             />:
             openChat?
             
             <Chat previousData={singleRecord}/>:
            <></>
          }
        </Box>
      </Modal>
    <DataTable 
    columns={columns}
     rows={records}
     editButton={true}
     deleteButton={true}
     addNewButton={true}
     setOpenModal={setOpenModal}
    setShowDetails={setShowDetails}
    setSingleRecord={setSingleRecord}
    deleteRecord={deleteMeal}
    updateStatus={updateStatus}
    setAddNote={setAddNote}
    setEditRecord={setEditRecord}
    setOpenChat={setOpenChat}
    
     />
          </>:
          <></>

}


        </>

    )
}
