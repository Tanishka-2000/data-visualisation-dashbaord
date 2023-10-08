import { List, ListItem, ListItemText, ListItemIcon } from '@mui/material';

const DataList = ({data, className, icon}) => {
  return (
    <List className={className}>
        {data.map(item => (
            <ListItem key={item._id}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={item._id ? item._id : 'Random'}/>
                {item.count}
            </ListItem>
        ))}
    </List>
  )
}

export default DataList