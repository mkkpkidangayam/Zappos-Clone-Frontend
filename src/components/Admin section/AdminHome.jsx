import RevenueChart from "./Revenuechart";
import SecondChart from "./SecondChart";

const AdminHome = () => {
  return (
    <div>
      <div>
        <h1 className="text-center text-4xl font-bold font-serif text-green-800 py-2">
          Welcome Admin...
        </h1>
        <hr />
        <div className="flex flex-col justify-evenly h-screen">
          <div className="flex justify-center">
            <p className="text-center text-[200px] text-transparent font-serif bg-clip-text font-extrabold bg-center bg-[url('https://media.licdn.com/dms/image/C561BAQEIPV76nJFFsQ/company-background_10000/0/1584409661241/zapposcom_cover?e=2147483647&v=beta&t=rmXnB4efRTXuqmIrTBVpNbmtZIqWG-uiTtkfuozpXvw')]">
              ZAPPOS
            </p>
          </div>
          <div className="flex justify-center">
            <RevenueChart />
          </div>
          <div className="flex justify-center">
            <SecondChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
