import React, { useEffect, useState } from 'react'
import { Box, Modal, Skeleton } from '@mui/material';
import { getService, updateService } from '../../../services/services';
import DataTable from '../../UI/DataTable/DataTable';
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
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 100 },
  { id: 'phone', label: 'Phone Number', minWidth: 100 },
  {
    id: "Details",
    label: 'Details',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 170,
    align: 'right',
  },
];
export default function ViewAllUsers() {
  const [openModal, setOpenModal] = useState(false);

  const [showDetails, setShowDetails] = useState(false);
  
  const [singleRecord, setSingleRecord] = useState()

  function handleClose(){
    setShowDetails(false)
    setSingleRecord(null)
    setOpenModal(false)
    }
    const [records, setRecords] = useState()
    const [loading, setLoading] = useState(false)
    const handelFetch = async() => {
        setLoading(true)
        let list=[];      
      const querySnapshot =await getService("Users")

      querySnapshot.forEach((doc) => {
        list.push({id:doc.id,
          ...doc.data()})
            });
      
      setRecords(list)
      setLoading(false)

      
      };

    useEffect(()=>{
        // if(!openPopup){
        handelFetch()
        // }
       },[ ])

  
    const updateStatus = async (id,status) => {
      const newStatus= status==="blocked"?"active":"blocked";
      await updateService('Users',id,{status:newStatus})
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
                // <SingleWorkOutDetails data={singleRecord}/>
                <h1>Single User Details</h1>
              }
                
    
            </Box>
          </Modal>
           
        <DataTable 
        columns={columns}
         rows={records}
         setSingleRecord={setSingleRecord}
         setOpenModal={setOpenModal}
        setShowDetails={setShowDetails}
        updateStatus={updateStatus}
         />
              </>:
              <></>
    
    }
    
    
            </>
    
        )
    }
    
    
