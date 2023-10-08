import Chart from 'chart.js/auto'; // required for charts
import { useState, useEffect } from 'react';
import { Container, Grid, Paper, Divider,Typography, Box, Stack } from '@mui/material';
import NewspaperRoundedIcon from '@mui/icons-material/NewspaperRounded';
import FlagIcon from '@mui/icons-material/Flag';
import DescriptionIcon from '@mui/icons-material/Description';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

import { TopBar } from '../'
import { getOverviewData, getFilteredData } from '../../utils';
import { LineGraph, BarGraph, Doughnut, DataList} from "../charts/";
import "./styles.css";

function Board ({ darkMode, setDarkMode, setOpenSide }){
  const [data, setData] = useState(null);

  const applyFilter = (filter, value) => {
    getFilteredData(filter, value)
    .then( result => setData(result))
  }

  const getOverview = () => {
    getOverviewData()
    .then(result => setData(result));
  }

  useEffect(() => {
      getOverview() 
  }, []);

  return (
    <Container maxWidth='xl'>

      <TopBar
       applyFilter={applyFilter}
       getOverview={getOverview}
       darkMode={darkMode}
       setDarkMode={setDarkMode}
       setOpenSide={setOpenSide}
      />
      
      <Grid container mb={4} spacing={2} sx={{ alignItems: 'center'}}>

        {/* first row */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper>
            <Stack direction='row' justifyContent='space-between'>
              <Box p={1}>
                <Typography variant='h6' gutterBottom>Total Data Analysed</Typography>
                <Typography variant='h4' gutterBottom>{data ? data.total : 0}</Typography>
                <Typography variant='button'>Trusted source and Analysed by Experts</Typography>
              </Box>
              <img src="report-2.svg" style={{ width: '40%'}} />
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={8} >
          <Paper sx={{p:2}}>
            <Typography variant='h5' gutterBottom>Statistics</Typography>
            <Typography variant='body2' gutterBottom>Data collected from various sources about different countries </Typography>
            
            <Grid container mt={2} spacing={2} >

              <Grid item md={3} xs={6} className='statics'>
                <span className='rounded-icon'><NewspaperRoundedIcon /></span>
                <div>
                  <Typography variant='h5'>{ data ? data.totalSources : 0}</Typography>
                  <Typography variant='body2'>Sources</Typography>
                </div>
              </Grid> 
              
              <Grid item md={3} xs={6} className='statics'>
                <span className='rounded-icon'><FlagIcon /></span>
                <div>
                  <Typography variant='h5'>{data ? data.others[0].country.length : 0}</Typography>
                  <Typography variant='body2'>Countries</Typography>
                </div>
              </Grid>

              <Grid item md={3} xs={6} className='statics'>
                <span className='rounded-icon'><DescriptionIcon /></span>
                <div>
                  <Typography variant='h5'>{ data ? data.others[0].topic.length : 0}</Typography>
                  <Typography variant='body2'>Topics</Typography>
                </div>
              </Grid>

              <Grid item md={3} xs={6} className='statics'>
                <span className='rounded-icon'><AccountBalanceIcon /></span>
                <div>
                  <Typography variant='h5'>{ data ? data.totalSector : 0}</Typography>
                  <Typography variant='body2'>sectors </Typography>
                </div>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* second row */}
        <Grid item xs={12} sm={6}>
          <Paper>
            <Typography variant='h6'>Publishing Report</Typography>
            <Typography variant='body2'>Number of articles published in each year</Typography>
            <LineGraph data={data ? data.others[0].publishedYear : []}/>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Paper>
            <Typography variant='h6'>Relevance Report</Typography>
            <Typography variant='body2'>Number of articles with a particular relevanve level</Typography>
            <BarGraph data={data ? data.others[0].relevance : []}/>
          </Paper>
        </Grid>

        {/* third row */}
        <Grid item xs={12} sm={6} md={4} >
          <Paper >
            <Typography variant='h6' gutterBottom>Country {data ? data.others[0].country.length : 0}</Typography>
            <Typography variant='body2' gutterBottom>Number of articles published about a country</Typography>
            <Divider />
            <DataList data={data ? data.others[0].country : []} className="scrollable" icon={<NewspaperRoundedIcon />}/>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper>
            <Typography variant='h6'>Likelihood Report</Typography>
            <Typography variant='body2'>Number of articles with different likelihoods</Typography>
            <Doughnut data={data ? data.others[0].likelihood : []}/>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper>
            <Typography variant='h6' gutterBottom>Popular Topics {data ? data.others[0].topic.length : 0}</Typography>
            <Typography variant='body2' gutterBottom>Number of articles published about a topic</Typography>
            <Divider />
            <DataList data={data ? data.others[0].topic : []} className="scrollable" icon={<DescriptionIcon />}/>
          </Paper>
        </Grid>

        {/* fourth row */}
        <Grid item xs={12} sm={6}>
          <Paper>
            <Typography variant='h6' gutterBottom>Major Regions {data ? data.others[0].regions.length : 0} </Typography>
            <Typography variant='body2' gutterBottom>Number of articles about each Region</Typography>
            <Divider />
            <DataList data={data ? data.others[0].regions : []} className="region" icon={<PublicOutlinedIcon />}/>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper>
            <Typography variant='h6'>Pestle Report</Typography>
            <Typography variant='body2'>Number of articles about each pestle</Typography>
            <BarGraph data={data ? data.others[0].pestle : []}/>
          </Paper>
        </Grid>

      </Grid>
    </Container>
  )
}

export default Board