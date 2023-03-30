import { useEffect, useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { NewLayout } from '../../components/new-layout';
import axios from 'axios';
import React from 'react';
import { SlotCard } from 'src/components/inventory/SlotCard'

const InventoryPage = () => {
  const [app, setApp] = useState(null);
  const [slots, setSlots] = useState([]);
  const [totalCollections, setTotalCollections] = useState(0);
  const [slotCounts, setSlotCounts] = useState({});

  useEffect(() => {
    getSlots().then((slots) => {
      setSlots(slots)
    })
      .catch(e => { console.log('setting error: ', e.message) });
  }, []);


  useEffect(() => {
    countCollections(slotCounts).then((count) => {
      setTotalCollections(count)
    })
      .catch(e => { console.log('setting error: ', e.message) });
  }, [slotCounts]);

  useEffect(() => {
    getSlotCounts(slots).then((counts) => {
      setSlotCounts(counts)
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
              {app && slots && slotCounts ? <>
                <Typography variant="h2" sx={{ marginBottom: '5px' }}>
                  My NFTs
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
                    <SlotCard slot={slot} numCollections={slotCounts[slot.slotId]} />
                  </React.Fragment>
                ))}</Grid></Grid>


          </Grid>
        </Box>
      </Box>
    </>
  )
}

InventoryPage.getLayout = (page) => (
  <NewLayout>
    {page}
  </NewLayout>
);

export default InventoryPage;

const getApp = async () => {
  const appObject = (await axios.post('/api/app/info', {}));
  return appObject.data.app;
}

const getSlots = async () => {
  const slotsObject = (await axios.post('/api/app/slots', { idOnly: false }));

  return slotsObject.data.app.slots;
}

const countCollections = async (slotCounts) => {
  var collectionCount = 0;
  for (const key in slotCounts) {
    if (slotCounts.hasOwnProperty(key)) {
      collectionCount += slotCounts[key];
    }
  }
  return collectionCount;
}

const getSlotCounts = async (slots) => {
  var slotCounts = {};
  for (const element of slots) {
    var slotCount = await axios.post('/api/nft/slots', { slotIds:[element.slotId], countsOnly: true });
    slotCounts[element.slotId] = Object.keys(slotCount.data.nfts).length;
  }
  return slotCounts;
}

