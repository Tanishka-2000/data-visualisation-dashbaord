import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, IconButton,
  Divider, Typography, Drawer, Box, useMediaQuery, Stack, Toolbar } from '@mui/material';
import GridViewIcon from '@mui/icons-material/GridView';
import BackIcon from '@mui/icons-material/ArrowBack';
import { menuItems } from "./menuItems"

const drawerWidth = 260;

function SideBar ({ openSide, setOpenSide }){

  const matches = useMediaQuery('(max-width:900px)'); // toggle sidebar for small screens

  return (
    <Drawer 
        className='drawer'
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth
          },
        }}
        variant={matches ? "temporary" : "persistent"}
        anchor="left"
        open={matches ? openSide : true} 
      >
        <Stack direction='row' gap={1} alignItems='center' p={2}>
            <GridViewIcon fontSize='large'/>
            <Typography variant="h5" sx={{ flex: 1}}>Dashboard</Typography>
            { matches && <IconButton onClick={() => setOpenSide(false)}><BackIcon /></IconButton> }
        </Stack>

        <Divider />
        
        <List>
          <ListSubheader>APPS & PAGES</ListSubheader>
          {menuItems.map((item) => (
            <ListItem key={item.id} disablePadding >
              <ListItemButton>
                <ListItemIcon sx={{minWidth:35 }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        
      </Drawer>
  )
}

export default SideBar