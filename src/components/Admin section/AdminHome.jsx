import React from "react";

const AdminHome = () => {
  return (
    <div>
      <div className="grid grid-cols-5 grid-rows-5 gap-4">
        <div className="row-span-5">1</div>
        <div className="col-span-4">2</div>
        <div className="col-span-4 row-span-4 col-start-2 row-start-2">3</div>
      </div>
    </div>
  );
};

export default AdminHome;
