import { Box, Modal, Skeleton } from '@mui/material';
import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../../config /Firebase/firebase'
import { deleteAsset, getService, updateService } from '../../../services/services'
import DataTable from '../../UI/DataTable/DataTable';
import SingleClassDetails from '../ClassCategories/categoryDetails';
import AddClass from './addClass';
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
  { id: 'classCategory', label: 'Category', minWidth: 100 },
  { id: 'startingDate', label: 'Starting Date', minWidth: 100 },
  { id: 'Details', label: 'Details', minWidth: 100 },
  {
    id: 'Actions',
    label: 'Actions',
    minWidth: 170,
    align: 'right',
  },
];

export default function ViewAllClasses() {
  
    const [equipments, setEquipments] = useState()
    const [records, setRecords] = useState()
    const [categories, setCategories] = useState()
    const [loading, setLoading] = useState(false)
    const [openModal, setOpenModal] = useState(false);

    const [EditRecord, setEditRecord] = useState(false);
  
    const [showDetails, setShowDetails] =useState(false);
    
    const [singleRecord, setSingleRecord] = useState()
  
    function handleClose(){
      setEditRecord(false)
      setShowDetails(false)
      setSingleRecord(null)
      setOpenModal(false)
      }   
    const getAllClasses = async() => {
        let list=[]      
        let newList=[]
        setLoading(true)
        const querySnapshot =await getService("classCategories")

        querySnapshot.forEach((doc) => {
          list.push({id:doc.id,
              ...doc.data()})
                });

                list.map((item)=>{
                  return(
                  
                 item.classes.map((item)=> {
                   return(
                     item.imageContain={image:item.image,title:item.title},
                     item.classCategory=item.category.value,
                     item.startingDate=(new Date(item.startingDate.toDate())).toDateString(),
                    newList.push(item)
                   )
                  }))
                })


                console.log('allClasses+++++====',list)

        setRecords(newList)
        setLoading(false)
            };
            
            const getAllClassCategories = async() => {
              let list=[]
              setLoading(true)
              const querySnapshot =await getService("classCategories")

      
              querySnapshot.forEach((doc) => {
                list.push({id:doc.id,
                    value:doc.data().name})
                      });
              setCategories(list)
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


       getAllClasses()
       getAllClassCategories()
       getAllProducts()
      
       },[ ])
      
      const deleteClass = async (item,url) => {
        const docRef = doc(db, "classCategories", item.category.id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
        console.log("Document data viky: from viewallcallsses", docSnap.data());

          let list=docSnap.data()
         list.classes = list.classes.filter((i)=>i.id!==item.id);
          await updateService("classCategories",item.category.id,list)
            const result =records.filter((i)=>i.id!==item.id)
            setRecords(result)
    
        } else {
          console.log("No such document!");
          // setLoading(false)
        }        
        if(url){
          deleteAsset(url)
        }
     
      };

      console.log('records meray records',records)
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
      <SingleClassDetails/>                 :
          EditRecord?
          <AddClass  
          
          records={records}
          setRecords={setRecords}
          handleModal={handleClose}
          getAllClasses={getAllClasses}
          equipments={equipments}
          categories={categories}
          recordForEdit={singleRecord}
          />
           :
          <AddClass  
          
          records={records}
          setRecords={setRecords}
          handleModal={handleClose}
          getAllClasses={getAllClasses}
          equipments={equipments}
          categories={categories}
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
   topLinkButton={"View All Categories"}
   secondTopButton={"Add New Class"}
   setOpenModal={setOpenModal}
  setEditRecord={setEditRecord}
  setShowDetails={setShowDetails}
  setSingleRecord={setSingleRecord}
  deleteRecord={deleteClass}
   />
        </>:
        <></>

}


      </>

  )
}
