import React, { useEffect, useState } from 'react'
import { Box, Skeleton } from '@mui/material';
import { getService, updateService } from '../../../services/services';
import DataTable from '../../UI/DataTable/DataTable';
import Modal from "@mui/material/Modal";
import SingleUserDetails from './singleUserDetails';
import EditUser from './EditUser';
const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 100 },
  { id: 'phone', label: 'Phone Number', minWidth: 100 },
  { id: 'Details', label: 'View Details', minWidth: 170 },
  {
    id: 'status',
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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
   height:"60%",
  overflow:'scroll',
  bgcolor: "background.paper",
  border: "2px solid #fbbe36",
  p:4,
  boxShadow: 24,
  borderRadius: 2,
};
export default function ViewAllUsers() {
  const [openModal, setOpenModal] = React.useState(false);

  const [EditRecord, setEditRecord] = React.useState(false);

  const [showDetails, setShowDetails] = React.useState(false);
  
  const [singleRecord, setSingleRecord] = useState()
  function handleClose(){
    setEditRecord(false)
    setShowDetails(false)
    setSingleRecord(null)
    setOpenModal(false)
    }

  
    const [records, setRecords] = useState()
    const [loading, setLoading] = useState(false)
    const getAllUsers = async() => {
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
          getAllUsers()
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
            { showDetails ?
                <SingleUserDetails data={singleRecord}/>
                       :
                EditRecord?
                <EditUser
                
                records={records}
                setRecords={setRecords}
                handleModal={handleClose}
                getAllUsers={getAllUsers}
                recordForEdit={singleRecord}
                /> 
                :
                <></>
                
              }
            </Box>
          </Modal>    
        <DataTable 
        columns={columns}
         rows={records}
         editButton={true}
        updateStatus={updateStatus}
        setOpenModal={setOpenModal}
        setEditRecord={setEditRecord}
        setShowDetails={setShowDetails}
        setSingleRecord={setSingleRecord}
        
         />
           </>:
          <></>
    
    }
    
    
            </>
    
        )
    }
    
    
