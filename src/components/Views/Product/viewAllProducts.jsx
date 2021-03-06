
import React, { useEffect, useState } from 'react'
import {Box,Skeleton} from '@mui/material';
import { deleteAsset, deleteService, getService} from '../../../services/services';
import DataTable from '../../UI/DataTable/DataTable';
import Modal from "@mui/material/Modal";
import AddProduct from './addProduct';
import SingleProductDetails from './singleProductDetails';


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

const columns = [
  { id: 'imageContain', label: 'Title', minWidth: 170 ,align: 'center'},
  { id: 'price', label: 'Price', minWidth: 100, align: 'center'
},
{ id: 'discountPrice', label: 'DiscountPrice', minWidth: 100, align: 'center'
},
  {
    id: "quantity",
    label: 'Quantity',
    minWidth: 170,
    align: 'center'
  },
  { id: 'Details', label: 'Details', minWidth: 100,align: 'center' },
  {
    id: 'Actions',
    label: 'Actions',
    minWidth: 170,
    align: 'center'
  },
];
export default function ViewAllProducts() {
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
    const getAllProducts = async() => {
        let list=[]
        setLoading(true)
        const querySnapshot =await getService("shop")

        querySnapshot.forEach((doc) => {
          list.push({id:doc.id,
              imageContain:{image:doc.data().image,title:doc.data().name},
              ...doc.data()})
                });
        setRecords(list)
        setLoading(false)
            };

    useEffect(()=>{
      getAllProducts()
       },[ ])
      
      const deleteMeal = async (record,url) => {        
        await deleteService("shop",record.id)
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
          {/* <Paper sx={{width:'500',height:'500'}}> */}
        { showDetails ?
            <SingleProductDetails data={singleRecord}/>
                   :
            EditRecord?
            <AddProduct 
            
            records={records}
            setRecords={setRecords}
            handleModal={handleClose}
            getAllProducts={getAllProducts}
            recordForEdit={singleRecord}
            /> :
            <AddProduct  
            
            records={records}
            setRecords={setRecords}
            handleModal={handleClose}
            getAllProducts={getAllProducts}
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
     secondTopButton={"Add New Product"}
     setOpenModal={setOpenModal}
    setEditRecord={setEditRecord}
    setShowDetails={setShowDetails}
    setSingleRecord={setSingleRecord}
    deleteRecord={deleteMeal}
    updateStatus={false}
     />
          </>:
          <></>

}


        </>

    )
}
