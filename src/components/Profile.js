import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { fontSize } from "@mui/system";

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    marginTop:200,
    margin: "auto",
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.3)",
    borderRadius: 16,
    overflow: "hidden",
    fontSize:30
  },
  content: {
    padding: 24,
},
title: {
    marginBottom: 8,
},
subtitle: {
    marginBottom: 16,
    fontSize:'50px'
  },
});

const Profile = () => {
  const classes = useStyles();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const id = localStorage.getItem("userId");
        console.log(id)
        const res = await axios.post(`http://localhost:5000/api/user/detail/${id}`);
        const data = res.data;

        setUser(data.user);
        console.log(data.user)
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  return (
    <Card variant="outlined" className={classes.root}>
      {user && (
        <>
          <CardContent className={classes.content} style={{fontSize:'50px'}}>
            <Typography variant="h5" className={classes.title} style={{fontSize:'40px'}}>
             Name : {user.name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" className={classes.subtitle} style={{fontSize:'30px'}}>
              Email : {user.email}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary" style={{fontSize:'30px'}}>
              Total Blogs: {user.blogs.length}
            </Typography>
          </CardContent>
        </>
      )}
    </Card>
  );
};

export default Profile;
