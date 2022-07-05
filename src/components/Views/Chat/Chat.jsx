import { Box, Grid, TextField, Typography } from "@mui/material";
import { AvatarWrapper, ChatBox } from "./Chat.style";
import ProfileImage from "../../../assets/images/profileImg.png";
import { convertTimeStampToTime } from "../../../Utils/utils";
import { useState } from "react";
import Button from "../../UI/Button/Button";
import { SendIcon } from "../../Icons/SendIcon";

import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../../../config /Firebase/firebase";
import { query, orderBy, limit } from "firebase/firestore";

const Chat = ({ previousData }) => {
  console.log("previousData", previousData);
  const [message, setMessage] = useState("");

  const messagesRef = collection(
    db,
    "orders_chat",
    `chat_room_${previousData.id}`,
    "messages"
  );

  const [messages] = useCollectionData(
    query(messagesRef, orderBy("createdAt"), limit(25)),
    { idField: "id" }
  );

  async function handleClick(e) {
    // setLoading(true)
    e.preventDefault();
    const data = {
      _id: previousData.orderBy,
      text: message,
      createdAt: Timestamp.now(),
      user: { _id: "admin" },
    };

    await addDoc(
      collection(db, "orders_chat", `chat_room_${previousData.id}`, "messages"),
      data
    );
  }

  return (
    <Grid container spacing={2}>
      <Grid item md={12}>
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          Chat Messages
        </Typography>
      </Grid>
      {messages?.map((item, index) => {
        if (item.user._id === "admin") {
          return (
            <Grid item xs={12}>
              <ChatBox background="#ddd" border="1px solid #ccc">
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <AvatarWrapper alt="Remy Sharp" src={ProfileImage} />
                  <Typography variant="body1" sx={{ marginLeft: "20px" }}>
                    {item.text}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    color: "#aaa",
                  }}
                >
                  <Typography variant="body1">
                    {convertTimeStampToTime(new Date(item.createdAt.toDate()))}
                  </Typography>
                </Box>
              </ChatBox>
            </Grid>
          );
        } else {
          return (
            <Grid item xs={12}>
              <ChatBox background="#f1f1f1" border="1px solid #dedede">
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <AvatarWrapper alt="Remy Sharp" />
                  <Typography variant="body1" sx={{ marginLeft: "20px" }}>
                    {item.text}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    color: "#aaa",
                  }}
                >
                  <Typography variant="body1">
                    {convertTimeStampToTime(new Date(item.createdAt.toDate()))}
                  </Typography>
                </Box>
              </ChatBox>
            </Grid>
          );
        }
      })}

      <Grid item xs={12}>
        <Box sx={{ display: "flex" }}>
          <TextField
            variant="outlined"
            placeholder="Enter Message"
            fullWidth
            required
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={handleClick}
            endIcon={<SendIcon />}
          ></Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Chat;
