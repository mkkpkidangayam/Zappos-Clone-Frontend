import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
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
        const { totalOrderCount, totalOrderPrice, monthlyRevenue } =
          response.data;
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

  return (
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer>
        <LineChart data={orderData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
