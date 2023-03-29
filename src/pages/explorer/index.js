import { useEffect, useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { NewLayout } from '../../components/new-layout';
import axios from 'axios';
import React from 'react';
import { SlotCard } from 'src/components/SlotCard'

const ExplorerPage = () => {
  const [app, setApp] = useState(null);
  const [slots, setSlots] = useState([]);
  const [totalCollections, setTotalCollections] = useState(0);

  const [chosenSlot, setChosenSlot] = useState(null);

  useEffect(() => {
    getSlots().then((slots) => {
      setSlots(slots)
    })
      .catch(e => { console.log('setting error: ', e.message) });
  }, []);


  useEffect(() => {
    sumCollections(slots).then((count) => {
      setTotalCollections(count)
    })
      .catch(e => { console.log('setting error: ', e.message) });
  }, [slots]);

  useEffect(() => {
    getApp().then((app) => {
      setApp(app)
    })
      .catch(e => { console.log('setting error: ', e.message) });
  }, []);

  return (
    <>
      <Box
        sx={{
          backgroundColor: 'none',
          py: 5
        }}
      >

        <Box
          sx={{
            width: '85%',
            alignSelf: 'stretch',
            marginLeft: "auto",
            marginRight: "auto",
            py: 1,
            px: 5,
            backgroundColor: 'none'
          }}
        >
          <Grid container spacing={2}>
            <Grid item>
              {app && !chosenSlot ? <>
                <Typography variant="h2" sx={{ marginBottom: '5px' }}>
                  NFT Explorer
                </Typography>
                <Typography variant="p2" sx={{ fontWeight: 'bold', lineHeight: '40px', fontSize: { xs: '12px', sm: '14px', md: '16px', lg: '16px', xl: '18px' } }}>
                  App:&nbsp;
                </Typography>
                <Typography variant="p2" sx={{ font: 'nunito', lineHeight: '40px', fontSize: { xs: '12px', sm: '14px', md: '16px', lg: '16x', xl: '18px' } }}>
                  {app.appName} <br></br>
                </Typography>
                <Typography variant="p2" sx={{ font: 'nunito', fontWeight: 'bold', lineHeight: '40px', fontSize: { xs: '12px', sm: '14px', md: '16px', lg: '16x', xl: '18px' } }}>
                  Total Slots:&nbsp;
                </Typography>
                <Typography variant="p2" sx={{ font: 'nunito', lineHeight: '40px', fontSize: { xs: '12px', sm: '14px', md: '16px', lg: '16x', xl: '18px' } }}>
                  {slots.length} &emsp;
                </Typography>
                <Typography variant="p2" sx={{ font: 'nunito', fontWeight: 'bold', lineHeight: '40px', fontSize: { xs: '12px', sm: '14px', md: '16px', lg: '16x', xl: '18px' } }}>
                  Total Collections:&nbsp;
                </Typography>
                <Typography variant="p2" sx={{ font: 'nunito', lineHeight: '40px', fontSize: { xs: '12px', sm: '14px', md: '16px', lg: '16x', xl: '18px' } }}>
                  {totalCollections} <br></br>
                </Typography>
                <Typography variant="h4" sx={{ font: 'nunito', lineHeight: '50px' }}>
                  Select Slot:
                </Typography></>
                : <></>}</Grid>
            <Grid item>
              <Grid container spacing={2}>
                {slots && slots.map((slot) => (

                  <React.Fragment key={slot.slotId}>
                    <SlotCard slot={slot} setChosenSlot={setChosenSlot} />
                  </React.Fragment>
                ))}</Grid></Grid>


          </Grid>
        </Box>
      </Box>
    </>
  )
}

ExplorerPage.getLayout = (page) => (
  <NewLayout>
    {page}
  </NewLayout>
);

export default ExplorerPage;

const getApp = async () => {
  const appObject = (await axios.post('/api/app/info', {}));
  return appObject.data.app;
}

const getSlots = async () => {
  const slotsObject = (await axios.post('/api/app/slots', { idOnly: false }));

  return slotsObject.data.app.slots;
}

const sumCollections = async (slots) => {
  var collections = 0;
  slots.forEach(element => {
    collections = collections + element.collections.length
  });
  return collections;
}