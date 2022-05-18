import React, { useEffect, useState } from 'react'
import { Skeleton } from '@mui/material';
import { getService, updateService } from '../../../services/services';
import DataTable from '../../UI/DataTable/DataTable';
const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 100 },
  { id: 'phone', label: 'Phone Number', minWidth: 100 },
  {
    id: 'status',
    label: 'Status',
    minWidth: 170,
    align: 'right',
  },
];
export default function ViewAllUsers() {
  
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
    
        records &&
        
           
        <DataTable 
        columns={columns}
         rows={records}
        updateStatus={updateStatus}
         />
    
    }
    
    
            </>
    
        )
    }
    
    
