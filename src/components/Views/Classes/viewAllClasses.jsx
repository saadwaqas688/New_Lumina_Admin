import { Box,Modal, Skeleton } from '@mui/material';
import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../../config /Firebase/firebase'
import { deleteAsset, getService, updateService } from '../../../services/services'
import DataTable from '../../UI/DataTable/DataTable';
import SelectMui from '../../UI/SelectMui/SelectMui';
import AddClass from './addClass';
import SingleClassDetails from './singleClassDetails';
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
  { id: 'imageContain', label: 'Title', minWidth: 100,align: 'center' },
  { id: 'classCategory', label: 'Category', minWidth: 100,align: 'center' },
  { id: 'startingDate', label: 'Starting Date', minWidth: 100,align: 'center' },
  { id: 'Details', label: 'Details', minWidth: 100,align: 'center'},
  {
    id: 'Actions',
    label: 'Actions',
    minWidth: 100,
    align: 'center',
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
    const [selectedValue,setSelectedValue]=useState("All")
    const [filterData,setFilterData]=useState(null)
  
    function handleClose(){
      setEditRecord(false)
      setShowDetails(false)
      setSingleRecord(null)
      setSelectedValue("All")
      setFilterData(null)
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
                     item.equipments=item.equipments.map((ele)=>{
                       return ele.id
                     }),


                    newList.push(item)
                   )
                  }))
                })

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
                                value:doc.data().name,record:{id:doc.id,...doc.data()}
                                })
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
          try{

            let list=docSnap.data()
           list.classes = list.classes.filter((i)=>i.id!==item.id);
            await updateService("classCategories",item.category.id,list)
              
              const result =records.filter((i)=>i.id!==item.id)
              setRecords(result)
              if(filterData){
                const result =filterData.filter((i)=>i.id!==item.id)
                setFilterData(result)
              }
          }catch(error){
            
          alert("error occur")
          }
     
    
        } else {
          console.log("No such document!");
          // setLoading(false)
        }        
        if(url){
          deleteAsset(url)
        }
     
      };

      const handleChange = (event) => {
        const value=event.target.value
        setSelectedValue(value);
        if(value==="All"){
          setFilterData(null)
        }else{
          const result =records.filter((i)=>i.category.value===value)
          setFilterData(result)
        }  
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
      <SingleClassDetails  handleModal={handleClose} getAllClasses={getAllClasses} data={singleRecord}/>                 :
          EditRecord?
          <AddClass  
          handleModal={handleClose}
          getAllClasses={getAllClasses}
          equipments={equipments}
          categories={categories}
          recordForEdit={singleRecord}
          />
           :
          <AddClass  
          handleModal={handleClose}
          getAllClasses={getAllClasses}
          equipments={equipments}
          categories={categories}
          recordForEdit={null}
          />
          
        }
                </Box>
    </Modal>
    { categories &&

<SelectMui options={categories} handleChange={handleChange} selectedValue={selectedValue}/>
                }

  <DataTable 
  columns={columns}
   rows={filterData?filterData:records}
   deleteButton={true}
   editButton={true}
   topLinkButton={{text:"View All Categories",link:"/classesCategories"}}
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
