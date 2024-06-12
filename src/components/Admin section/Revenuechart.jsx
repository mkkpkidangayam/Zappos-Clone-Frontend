import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  Brush
} from "recharts";
import { Axios } from "../../MainPage";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function RevenueChart() {
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    Axios.get("/admin/order-status", {
      headers: {
        Authorization: Cookies.get("adminToken"),
      },
    })
      .then((response) => {
        const { totalOrderCount, totalOrderPrice, monthlyRevenue } = response.data;
        setOrderData([
          { name: "Total Orders", value: totalOrderCount },
          { name: "Total Revenue", value: totalOrderPrice },
          { name: "Monthly Revenue", value: monthlyRevenue },
        ]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border p-2 rounded shadow-lg">
          <p className="label">{`${label} : ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer>
        <LineChart data={orderData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" fillOpacity={1} fill="url(#colorValue)" />
          <Brush dataKey="name" height={30} stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

