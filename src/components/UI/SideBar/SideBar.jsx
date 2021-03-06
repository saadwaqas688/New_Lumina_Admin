import {
    AccountBox,
    Article,
    Group,
    RestaurantMenu,
    FitnessCenter,
    ShoppingCart,
    ShoppingBasketRounded
  } from "@mui/icons-material";
  import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
  } from "@mui/material";
  import React from "react";
  import {useLocation} from 'react-router';
    const SideBar = () => {
    const { pathname } = useLocation();
    return (
          <List >
            <ListItem >
              <ListItemButton component="a" href="/meal" selected={pathname==='/meal'?true:false}>
                <ListItemIcon >
                  <RestaurantMenu sx={{color:'#ff6699' , fontSize:'40px'}}/>
                </ListItemIcon>
                <ListItemText sx={{color:"purple"}} primary="Meal" />
              </ListItemButton>
            </ListItem>
            <ListItem  >
              <ListItemButton component="a" href="/AdminUsers" selected={pathname==='/AdminUsers'?true:false}>
                <ListItemIcon >
                  <AccountBox sx={{color:'#ff6699' , fontSize:'40px'}} />
                </ListItemIcon>
                <ListItemText sx={{color:"purple"}}  primary="Manage Admin Users" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton component="a" href="/Classes" selected={pathname==='/Classes'?true:false}>
                <ListItemIcon >
                  <FitnessCenter sx={{color:'#ff6699' , fontSize:'40px'}}/>
                </ListItemIcon>
                <ListItemText sx={{color:"purple"}} primary="Classes" />
              </ListItemButton>
            </ListItem>
            <ListItem  >
              <ListItemButton component="a" href="/blogs" selected={pathname==='/blogs'?true:false}>
                <ListItemIcon>
                  <Article sx={{color:'#ff6699' , fontSize:'40px'}}/>
                </ListItemIcon>
                <ListItemText sx={{color:"purple"}} primary="Blogs" />
              </ListItemButton>
            </ListItem>
            {/* <ListItem>
              <ListItemButton component="a" href="/workOuts">
                <ListItemIcon >
                  <Article sx={{color:'#ff6699' , fontSize:'40px'}}/>
                </ListItemIcon>
                <ListItemText sx={{color:"purple"}} primary="Work Outs" />
              </ListItemButton>
            </ListItem> */}
            <ListItem >
              <ListItemButton component="a" href="/users" selected={pathname==='/users'?true:false}>
                <ListItemIcon>
                  <Group sx={{color:'#ff6699' , fontSize:'40px'}}/>
                </ListItemIcon>
                <ListItemText  sx={{color:"purple"}} primary="Users" />
              </ListItemButton>
            </ListItem>
            {/* <ListItem >
              <ListItemButton component="a" href="#simple-list">
                <ListItemIcon>
                  <Storefront sx={{color:'#ff6699' , fontSize:'40px'}}/>
                </ListItemIcon>
                <ListItemText  sx={{color:"purple"}} primary="Instructors" />
              </ListItemButton>
            </ListItem> */}
            <ListItem >
              <ListItemButton component="a" href="/orders" selected={pathname==='/orders'?true:false}>
                <ListItemIcon>
                  <ShoppingCart sx={{color:'#ff6699' , fontSize:'40px'}}/>
                </ListItemIcon>
                <ListItemText sx={{color:"purple"}} primary="Orders" />
              </ListItemButton>
            </ListItem>
            <ListItem  >
              <ListItemButton component="a" href="/shop" selected={pathname==='/shop'?true:false}>
                <ListItemIcon>
                  <ShoppingBasketRounded sx={{color:'#ff6699' , fontSize:'40px'}}/>
                </ListItemIcon>
                <ListItemText sx={{color:"purple"}} primary="Shop" />
              </ListItemButton>
            </ListItem>
            <ListItem >
              <ListItemButton component="a" href="/">
                <ListItemIcon>
                  <AccountBox sx={{color:'#ff6699' , fontSize:'40px'}}/>
                </ListItemIcon>
                <ListItemText sx={{color:"purple"}} primary="Log Out" />
              </ListItemButton>
            </ListItem> 
            {/* <ListItem >
              <ListItemButton component="a" href="#simple-list">
                <ListItemIcon>
                  <AccountBox sx={{color:'#ff6699' , fontSize:'40px'}}/>
                </ListItemIcon>
                <ListItemText sx={{color:"purple"}} primary="Customer Support" />
              </ListItemButton>
            </ListItem>
            <ListItem >
              <ListItemButton component="a" href="#simple-list">
                <ListItemIcon>
                  <AccountBox sx={{color:'#ff6699' , fontSize:'40px'}}/>
                </ListItemIcon>
                <ListItemText sx={{color:"purple"}}primary="About Us" />
              </ListItemButton>
            </ListItem>
            <ListItem >
              <ListItemButton component="a" href="#simple-list">
                <ListItemIcon>
                  <AccountBox sx={{color:'#ff6699' , fontSize:'40px'}}/>
                </ListItemIcon>
                <ListItemText sx={{color:"purple"}} primary="Log Out" />
              </ListItemButton>
            </ListItem> */}
          </List>
    );
  };
  
  export default SideBar;
  