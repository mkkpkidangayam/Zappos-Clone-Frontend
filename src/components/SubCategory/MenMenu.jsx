import { useContext, useRef } from "react";
import myContext from "../../context/myContextxt";


export default function MenMenu() {
  const { showModal, setShowModal } = useContext(myContext);
  const modelRef = useRef()


  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const closeModel = (e) => {
    if (modelRef.current === e.target) {
      setShowModal(false)
    }
  }

  return (
    <div>
      {showModal ? (
      <div
      ref={modelRef}
        id="static-modal"
        data-modal-backdrop="static"
        onClick={closeModel}
        className="absolute top-40 right-0 left-0 z-50 w-full h-[200%] bg-[#242424df] bg-opacity-50"
      >
        <div className="relative left-14 p-4 w-full max-w-2xl">
          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow">
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 border-b rounded-t">
              <h3 className="text-xl font-semibold text-gray-900">
                Shoes  
              </h3>
              <h3 className="text-xl font-semibold text-gray-900">
              Clothing  
              </h3>
              <h3 className="text-xl font-semibold text-gray-900">
              Accessories & More  
              </h3>
              <button
                onClick={toggleModal}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
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
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* Modal body */}
            <div className="p-4 space-y-4">
              <p className="text-base leading-relaxed text-gray-500">
                With less than a month to go before the European Union enacts
                new consumer privacy laws for its citizens, companies around the
                world are updating their terms of service agreements to comply.
              </p>
              <p className="text-base leading-relaxed text-gray-500">
                The European Union’s General Data Protection Regulation
                (G.D.P.R.) goes into effect on May 25 and is meant to ensure a
                common set of data rights in the European Union. It requires
                organizations to notify users as soon as possible of high-risk
                data breaches that could personally affect them.
              </p>
            </div>
            {/* Modal footer */}
            <div className="flex items-center justify-end p-4 border-t rounded-b">
              
            </div>
          </div>
        </div>
      </div>
      ): null}
    </div>
  );
}
