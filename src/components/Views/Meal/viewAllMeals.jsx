import React, { useEffect, useState } from 'react'
// import FormikForm from './addMeal';
import {Box,Skeleton, Typography} from '@mui/material';
import { deleteAsset, deleteService, getService, updateService } from '../../../services/services';
// import Popup from '../../UI/Popup/Popup';
import DataTable from '../../UI/DataTable/DataTable';
import Modal from "@mui/material/Modal";
import AddMeal from './addMeal'; 
import SingleMealDetails from './singleMealDetails'
import SelectMui from '../../UI/SelectMui/SelectMui';

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
  { id: 'imageContain', label: 'Title', minWidth: 100,    align: 'center'},
  { id: 'Details', label: 'Details', minWidth: 100, align: 'center'
},
  {
    id: "status",
    label: 'Status',
    minWidth: 100,
    align: 'center',
  },
  {
    id: 'Actions',
    label: 'Actions',
    minWidth: 100,
    align: 'center',
  },
];
export default function ViewAllMeals() {
  const [openModal, setOpenModal] = useState(false);

  const [EditRecord, setEditRecord] = useState(false);
  const [categories, setCategories] = useState()
  const [showDetails, setShowDetails] = useState(false);
  
  const [singleRecord, setSingleRecord] = useState()

  const [records, setRecords] = useState()
  const [loading, setLoading] = useState(false)

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

    useEffect(()=>{
       getAllMeals()
       getAllMealCategories()
       },[ ])
      
      const deleteMeal = async (record,url) => {        
        if(url){
          deleteAsset(url)
        }
        await deleteService("meal",record.id)
        const result =records.filter((item)=>item.id!==record.id)
        setRecords(result)
        if(filterData){
          const result =filterData.filter((i)=>i.id!==record.id)
          setFilterData(result)
        }
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

    const getAllMealCategories = async() => {
      let list=[]
      setLoading(true)
      const querySnapshot =await getService("mealCategories")


      querySnapshot.forEach((doc) => {
        list.push({id:doc.id,
            value:doc.data().name})
              });
      setCategories(list)
      setLoading(false)
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
            categories={categories}

            /> :
            <AddMeal  
            
            records={records}
            setRecords={setRecords}
            handleModal={handleClose}
            getAllMeals={getAllMeals}
            recordForEdit={null}
            categories={categories}

            />
            
          }
            

          {/* </Paper> */}
        </Box>
      </Modal>

 { categories &&    <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <SelectMui
              options={categories}
              handleChange={handleChange}
              selectedValue={selectedValue}
            />
            <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
              Number of Meals {filterData ? filterData.length : records.length}
            </Typography>
          </Box>}
    <DataTable 
    columns={columns}
    rows={filterData?filterData:records}
    editButton={true}
     deleteButton={true}
     topLinkButton={{text:"View All Categories",link:"/mealCategories"}}
    //  addNewButton={true}
     secondTopButton={"Add Meal"}
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
