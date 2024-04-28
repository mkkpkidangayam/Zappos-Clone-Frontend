import { useContext, useRef } from "react";
import myContext from "../../context/myContextxt";

export default function MenMenu() {
  const { showModal, setShowModal, product, menu } = useContext(myContext);
  const modelRef = useRef();

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const closeModel = (e) => {
    if (modelRef.current === e.target) {
      setShowModal(false);
    }
  };

  // const

  return (
    <div>
      {showModal ? (
        <div
          ref={modelRef}
          id="static-modal"
          data-modal-backdrop="static"
          onClick={closeModel}
          className="absolute top-40 right-0 left-0 z-50 w-full h-screen bg-[#242424df] bg-opacity-50"
        >
          <div className="relative left-14 p-2 w-full max-w-2xl">
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow">
              {/* Modal header */}
              <button
                onClick={toggleModal}
                className="text-gray-400 bg-transparent float-end hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
              <div className="flex items-center justify-between p-4 border-b rounded-t">
                <h3 className="mt-2 font-semibold text-gray-900">Shoes</h3>
                <h3 className="mt-2 font-semibold text-gray-900">
                  Clothing
                </h3>
                <h3 className="mt-2 pr-4 font-semibold text-gray-900">
                  Accessories & More
                </h3>
              </div>
              {/* Modal body */}
              <div className="pl-6 grid grid-cols-3 gap-5">
                {/* shoe sub categorys */}
                <div>
                  <ul>
                    <li>mk</li>
                    <li>mk</li>
                  </ul>
                </div>

                {/* cloth sub categorys */}
                <div>
                  <ul>
                    <li>kp</li>
                    <li>kp</li>
                  </ul>
                </div>

                {/* Accessories & More sub categorys */}
                <div>
                  <ul>
                    <li>kp</li>
                    <li>kp</li>
                  </ul>
                </div>
              </div>
              {/* Modal footer */}
              <div className="flex items-center justify-end p-4 rounded-b">
                <button>mkkp</button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
