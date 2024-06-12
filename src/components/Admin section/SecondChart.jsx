import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { BarChart } from '@mui/x-charts/BarChart';
import { Axios } from '../../MainPage'; // Update the import path as necessary
import Cookies from 'js-cookie';

export default function SecondChart() {
  const [seriesNb, setSeriesNb] = React.useState(3);
  const [itemNb, setItemNb] = React.useState(3);
  const [skipAnimation, setSkipAnimation] = React.useState(false);
  const [series, setSeries] = React.useState([]);

  React.useEffect(() => {
    Axios.get('/admin/order-status', {
      headers: {
        Authorization: Cookies.get('adminToken'),
      },
    })
      .then((response) => {
        const { totalOrderCount, totalOrderPrice, monthlyRevenue } = response.data;

        const newSeries = [
          {
            label: 'Total Orders',
            data: Array(20).fill(totalOrderCount),
            highlightScope: 'series',
          },
          {
            label: 'Total Revenue',
            data: Array(20).fill(totalOrderPrice),
            highlightScope: 'series',
          },
          {
            label: 'Monthly Revenue',
            data: Array(20).fill(monthlyRevenue),
            highlightScope: 'series',
          },
        ];

        setSeries(newSeries);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleItemNbChange = (event, newValue) => {
    if (typeof newValue !== 'number') {
      return;
    }
    setItemNb(newValue);
  };

  const handleSeriesNbChange = (event, newValue) => {
    if (typeof newValue !== 'number') {
      return;
    }
    setSeriesNb(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <BarChart
        height={300}
        series={series
          .slice(0, seriesNb)
          .map((s) => ({ ...s, data: s.data.slice(0, itemNb) }))}
        skipAnimation={skipAnimation}
      />
      {/* <FormControlLabel
        checked={skipAnimation}
        control={
          <Checkbox onChange={(event) => setSkipAnimation(event.target.checked)} />
        }
        label="Skip Animation"
        labelPlacement="end"
      /> */}
      {/* <Typography id="input-item-number" gutterBottom>
        Number of items
      </Typography>
      <Slider
        value={itemNb}
        onChange={handleItemNbChange}
        valueLabelDisplay="auto"
        min={1}
        max={20}
        aria-labelledby="input-item-number"
      />
      <Typography id="input-series-number" gutterBottom>
        Number of series
      </Typography> */}
      {/* <Slider
        value={seriesNb}
        onChange={handleSeriesNbChange}
        valueLabelDisplay="auto"
        min={1}
        max={10}
        aria-labelledby="input-series-number"
      /> */}
    </Box>
  );
}
