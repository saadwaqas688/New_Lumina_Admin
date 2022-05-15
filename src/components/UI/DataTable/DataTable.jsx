import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box,Typography } from '@mui/material';
import Button from "../Button/Button";
import EditIcon from '../../Icons/EditIcon';
import DeleteIcon from '../../Icons/DeleteIcon';



export default function DataTable({columns,
                                  rows,
                                  addNewButton,
                                  handelDelete,
                                  editButton,
                                  setOpenModal,
                                  deleteButton,
                                  setEditRecord,
                                  setShowDetails,
                                  setSingleRecord,
                                  deleteRecord,
                                  updateStatus,

}) {
    console.log('rows',rows)
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

//   const openInPopup = item => {
//     setRecordForEdit(item)
//     setOpenPopup(true)
// }
function openInPopup(record,state){
  if(state==="edit"){
    setEditRecord(true)
    setSingleRecord(record)
  }else if(state==="details"){
    setShowDetails(true)
    setSingleRecord(record)
  }
  setOpenModal(true)
}

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        {
            addNewButton &&
                  <Button variant="contained" onClick={openInPopup}>Add New</Button>                      
        }

      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead  >
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      
                      const value = row[column.id];
                      console.log('value++++++',value)
                      const assetUrl=value==="imageContain"?value.image:'';
                    if(column.id==="imageContain"){
                         return (<TableCell key={column.id} align={column.align}>
                       <Box sx={{ display:'flex',flexDirection: 'column',justifyContent:'center',alignItems:'center'}}>
                                      <img src={value.image} 
                                      alt="Preview" 
                                      width='100' 
                                      height='100' 
                                      style={{borderRadius:'10px'}}
                                      />
                            <Typography variant="body1" color="secondary"  >
                                          {value.title}
                           </Typography>
                                 </Box>
                    </TableCell>)
                
                    
                    }else if(column.id==="Details"){
                        return (
                          <TableCell key={column.id} align={column.align}>
                                <Button
                                variant="contained"
                                color="primary"
                                onClick={() => { openInPopup(row,"details") }} >
                                  View Details
                                </Button>
                                   </TableCell>
                          );

                    }else if(column.id==="status"){
                        
                        return (   <TableCell key={column.id} align={column.align}>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() => { updateStatus(row.id,value)}} >
                                  {value}
                                </Button>
                        {/* <Button variant="contained"  color="secondary" onClick={()=>updateStatus(row.id,value)}>{value}</Button>                       */}
                       </TableCell>
                        )

                    }else if(column.id==="Actions"){
                          if(editButton && deleteButton){
                            return (
                                <TableCell key={column.id} align={column.align}>
                                <EditIcon  
                                variant="contained"
                                color="secondary"
                                onClick={() => { openInPopup(row,'edit') }} />
                                  <DeleteIcon
                                  variant="contained"
                                  color="primary"
                                  onClick={() => { deleteRecord(row.id,assetUrl) }}  
                                   />
                                   </TableCell>
                            )

                          }else if(editButton){
                              return(
                                <TableCell key={column.id} align={column.align}>
                                <EditIcon  
                                variant="contained"
                                color="primary"
                                onClick={() => { openInPopup(row,'edit') }} />
                                   </TableCell>
                              )
                          } else {
                           return(  <TableCell key={column.id} align={column.align}>
                            <DeleteIcon
                            variant="contained"
                            color="primary"
                            onClick={() => { handelDelete(row.id,assetUrl) }}  
                             />
                            </TableCell>)
                          }
                       
                          
                           
                          }
                       

                    
                    
                    else{
                      return (

                      
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    }
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
