import React, { useState } from 'react';
import { Divider ,
        Drawer , 
        IconButton ,
        List, 
        ListItem ,
        ListItemText , 
        ListSubheader , 
        makeStyles ,
} from '@material-ui/core/';
import clsx from "clsx";

import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'
import GetAppIcon from '@material-ui/icons/GetApp';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '150%',
    maxWidth: 450,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
    marginLeft: "0.8rem",
  },
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
}));



const anchor = 'right';

export default function ShopListDrawer() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [shoplist, setShoplist] = useState([]);
  const slurl = "/api/listshoplist?name=" + sessionStorage.getItem('user');

  // console.log(shopList);

  const toggleDrawer = (o) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(o);      
    fetch(slurl).then((response) => response.json().then((data) => {
      setShoplist(data.map(d => d.ingredient))
    }))
  };

  const downloadContent = (event) => {
    var array = Object.values(shoplist).toString().replaceAll(',','\n');
    // console.log(array);
    var atag = document.createElement("a");
    var file = new Blob([array], {type: "text/plain", endings: 'native'});
    atag.href = URL.createObjectURL(file);
    atag.download = 'My Shopping List';
    atag.click();
  }

  const list = (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom"
      })}
      // style={{verticalAlign:"top", marginTop:0}}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List className={classes.root} subheader={<li />}>
      <ListSubheader 
      className={classes.listSection}
      id="myshoppinglist">
        My Shopping List
        <IconButton
        onClick={downloadContent}>
          <GetAppIcon/>
        </IconButton>
      </ListSubheader>
      <Divider />
      {shoplist.map((text) => (
        <ListItem key={text} className={classes.ul}>
          <ListItemText 
          primary={text} 
          style={{textTransform:"capitalize"}}/>
        </ListItem>
      ))}

      </List>
    </div>
  );

  return (
    <div>
      <React.Fragment key={anchor}>
        <IconButton onClick={toggleDrawer(true)}>
          <ShoppingBasketIcon style={{fill: "white"}}/>
        </IconButton>
        <Drawer anchor={anchor} open={open} onClose={toggleDrawer(false)}>
          {list}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
