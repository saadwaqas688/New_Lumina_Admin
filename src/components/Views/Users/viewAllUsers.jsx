import React, { useEffect, useState } from "react";
import { Box, Skeleton, Typography } from "@mui/material";
import { getService, updateService } from "../../../services/services";
import DataTable from "../../UI/DataTable/DataTable";
import Modal from "@mui/material/Modal";
import SingleUserDetails from "./singleUserDetails";
import EditUser from "./EditUser";
import SelectMui from "../../UI/SelectMui/SelectMui";
const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "email", label: "Email", minWidth: 100 },
  { id: "phone", label: "Phone Number", minWidth: 100 },
  { id: "Details", label: "View Details", minWidth: 170 },
  {
    id: "status",
    label: "Status",
    minWidth: 170,
    align: "right",
  },
  {
    id: "Actions",
    label: "Actions",
    minWidth: 170,
    align: "right",
  },
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  height: "60%",
  overflow: "scroll",
  bgcolor: "background.paper",
  border: "2px solid #fbbe36",
  p: 4,
  boxShadow: 24,
  borderRadius: 2,
};

const categories = [
  { id: "2", value: "monthlySubscriber" },
  { id: "3", value: "yearlySubscriber" },
  { id: "4", value: "onDemand" },
];
export default function ViewAllUsers() {
  const [openModal, setOpenModal] = React.useState(false);

  const [EditRecord, setEditRecord] = React.useState(false);

  const [showDetails, setShowDetails] = React.useState(false);
  const [selectedValue, setSelectedValue] = useState("All");
  const [filterData, setFilterData] = useState(null);

  const [singleRecord, setSingleRecord] = useState();
  function handleClose() {
    setEditRecord(false);
    setShowDetails(false);
    setSingleRecord(null);
    setFilterData(null)
    setOpenModal(false);
    setSelectedValue("All")

  }

  const [records, setRecords] = useState();
  const [loading, setLoading] = useState(false);
  const getAllUsers = async () => {
    setLoading(true);
    let list = [];
    const querySnapshot = await getService("Users");

    querySnapshot.forEach((doc) => {
      list.push({ id: doc.id, ...doc.data() });
    });

    setRecords(list);
    setLoading(false);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  async function updateStatus(id, status) {
    const newStatus = status === "blocked" ? "active" : "blocked";
    await updateService("Users", id, { status: newStatus });
    let updatedData = records;
    updatedData = updatedData.map((item) => {
      if (item.id === id) {
        item.status = newStatus;
      }
      return item;
    });
    setRecords(updatedData);
  }

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    if (value === "All") {
      setFilterData(null);
    } else {
      const result = records.filter((i) => i.typeOfUser === value);
      setFilterData(result);
    }
  };

  return (
    <>
      {loading ? (
        <>
          <Skeleton variant="text" height={100} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="rectangular" height={300} />
        </>
      ) : records ? (
        <>
          <Modal
            open={openModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              {showDetails ? (
                <SingleUserDetails data={singleRecord} />
              ) : EditRecord ? (
                <EditUser
                  records={records}
                  setRecords={setRecords}
                  handleModal={handleClose}
                  getAllUsers={getAllUsers}
                  recordForEdit={singleRecord}
                />
              ) : (
                <></>
              )}
            </Box>
          </Modal>
          <Box
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
              Number of Users {filterData ? filterData.length : records.length}
            </Typography>
          </Box>

          <DataTable
            columns={columns}
            rows={filterData ? filterData : records}
            editButton={true}
            updateStatus={updateStatus}
            setOpenModal={setOpenModal}
            setEditRecord={setEditRecord}
            setShowDetails={setShowDetails}
            setSingleRecord={setSingleRecord}
          />
        </>
      ) : (
        <></>
      )}
    </>
  );
}
