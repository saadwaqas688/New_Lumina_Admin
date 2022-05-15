import React, { useEffect, useState } from 'react'
import DataTable from '../../UI/DataTable/DataTable';
import Modal from "@mui/material/Modal";
import { getService, updateService } from '../../../services/services';
import { Box,Skeleton } from '@mui/material';
import AddAdminUser from './addAdminUser';
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #fbbe36",
    boxShadow: 24,
    p: 8,
    borderRadius: 2,
  };
const columns = [
  { id: 'email', label: 'Email', minWidth: 100 }, 
  { id: 'time', label: 'Time', minWidth: 100 },
  {
    id: "status",
    label: 'Status',
    minWidth: 170,
    align: 'right',
  },
];
export default function ViewAllAdminUsers() {
  const [openModal, setOpenModal] = useState(false);

  function handleClose(){
    setOpenModal(false)
    getAllAdminUsers()
    }
    const [records, setRecords] = useState()
    const [loading, setLoading] = useState(false)
    const getAllAdminUsers = async() => {
        let list=[]
        setLoading(true)
        const querySnapshot =await getService("adminUsers")

        querySnapshot.forEach((doc) => {
          list.push({id:doc.id,
              ...doc.data()})
                });
        setRecords(list)
        setLoading(false)
            };

    useEffect(()=>{
       getAllAdminUsers()
       },[ ])
      
          const updateStatus = async (id,status) => {
          const newStatus= status==="blocked"?"active":"blocked";
          await updateService('adminUsers',id,{status:newStatus})
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
        { 
            <AddAdminUser  
            
            handleModal={handleClose}
            />
            
          }
        </Box>
      </Modal>
    <DataTable 
     columns={columns}
     rows={records}
     editButton={false}
     setOpenModal={setOpenModal}
     deleteButton={false}
     addNewButton={true}
     updateStatus={updateStatus}
     />
          </>:
          <></>

}


        </>

    )
}
