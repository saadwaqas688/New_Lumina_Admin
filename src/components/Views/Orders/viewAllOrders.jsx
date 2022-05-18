import React, { useEffect, useState } from 'react'
import {Box,Skeleton} from '@mui/material';
import { deleteAsset, deleteService, getService, updateService } from '../../../services/services';
import DataTable from '../../UI/DataTable/DataTable';
import Modal from "@mui/material/Modal";
import SingleOrderDetails from './singleOrderDetails';
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
   height:"50%",
  overflow:'scroll',
  bgcolor: "background.paper",
  border: "2px solid #fbbe36",
  p:4,
  boxShadow: 24,
  borderRadius: 2,
};
const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 100 },
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

  const [EditRecord, setEditRecord] = useState(false);

  const [showDetails, setShowDetails] = useState(false);
  
  const [singleRecord, setSingleRecord] = useState()

  const [records, setRecords] = useState()
  const [loading, setLoading] = useState(false)

  function handleClose(){
    setEditRecord(false)
    setShowDetails(false)
    setSingleRecord(null)
    setOpenModal(false)
    }

 
    const getAllMeals = async() => {
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
       getAllMeals()
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
        <Box sx={style}>
        { showDetails &&
            <SingleOrderDetails data={singleRecord}/>            
          }
        </Box>
      </Modal>
    <DataTable 
    columns={columns}
     rows={records}
     editButton={false}
     deleteButton={true}
     addNewButton={true}
     setOpenModal={setOpenModal}
    // setEditRecord={setEditRecord}
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
