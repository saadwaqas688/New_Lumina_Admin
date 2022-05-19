import React, { useEffect, useState } from 'react'
import {Box,Skeleton} from '@mui/material';
import { deleteAsset, deleteService, getService} from '../../../services/services';
import DataTable from '../../UI/DataTable/DataTable';
import Modal from "@mui/material/Modal";
import AddClassCategory from './addClassCategory';
import SingleCategoryDetails from './singleCategoryDetails';


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
  { id: 'imageContain', label: 'Title', minWidth: 100, align: 'center'},

  { id: 'Details', label: 'Details', minWidth: 100, align: 'center'},
  {
    id: 'Actions',
    label: 'Actions',
    minWidth: 100,
    align: 'center',
  },
];
export default function ViewAllClassCategories() {
  const [openModal, setOpenModal] = useState(false);

  const [EditRecord, setEditRecord] = useState(false);

  const [showDetails, setShowDetails] = useState(false);
  
  const [singleRecord, setSingleRecord] = useState()
  function handleClose(){
    setEditRecord(false)
    setShowDetails(false)
    setSingleRecord(null)
    setOpenModal(false)
    }

    const [records, setRecords] = useState()
    const [loading, setLoading] = useState(false)
    const getAllCategories = async() => {
        let list=[]
        setLoading(true)
        const querySnapshot =await getService("classCategories")

        querySnapshot.forEach((doc) => {
          list.push({id:doc.id,
              imageContain:{image:doc.data().image,title:doc.data().name},
              ...doc.data()})
                });
        setRecords(list)
        setLoading(false)
            };

    useEffect(()=>{
      getAllCategories()
       },[ ])
      
      const deleteCategory = async (record,url) => {        
        await deleteService("classCategories",record.id)
        if(url){
          deleteAsset(url)
        }
        const result =records.filter((item)=>item.id!==record.id)
        setRecords(result)
      };

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
        <SingleCategoryDetails data={singleRecord}/>
                   :
            EditRecord?
            <AddClassCategory
            
            records={records}
            setRecords={setRecords}
            handleModal={handleClose}
            getAllCategories={getAllCategories}
            recordForEdit={singleRecord}
            /> :
            <AddClassCategory  
            
            records={records}
            setRecords={setRecords}
            handleModal={handleClose}
            getAllCategories={getAllCategories}
            recordForEdit={null}
            />
            
          }
            
        </Box>
      </Modal>
 
    <DataTable 
    columns={columns}
     rows={records}
     editButton={true}
     deleteButton={true}
     firstTopButton={"Add New Category"}
     setOpenModal={setOpenModal}
    setEditRecord={setEditRecord}
    setShowDetails={setShowDetails}
    setSingleRecord={setSingleRecord}
    deleteRecord={deleteCategory}
    updateStatus={false}
     />
          </>:
          <></>

}


        </>

    )
}
