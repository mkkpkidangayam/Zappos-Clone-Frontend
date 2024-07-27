import { useContext, useRef } from "react";
import myContext from "../../context/myContextxt";
import { Link } from "react-router-dom";
import LoadingSpinner from "../Assets/LoadingSpinner";

export default function Menu() {
  const { showModal, setShowModal, product, subMenu, setMenu } =
    useContext(myContext);
  const modalRef = useRef();

  const gender = subMenu;
  const categories = product?.reduce((acc, product) => {
    if (product?.gender === gender) {
      const { main, sub } = product?.category;
      acc[main] = acc[main] || {};
      acc[main][sub] = acc[main][sub] || [];
      acc[main][sub].push(product);
    }
    return acc;
  }, {});

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  return (
    <div className="mx-auto">
      {showModal && (
        <div
          ref={modalRef}
          id="static-modal"
          data-modal-backdrop="static"
          onClick={closeModal}
          className="absolute top-9 pt-2 left-0 z-50 bg-opacity-100 w-full"
        >
          <div
            onMouseLeave={() => toggleModal()}
            className="relative p-2 w-full max-w-2xl bg-white rounded-lg shadow-md"
          >
            <button
              onClick={toggleModal}
              className="text-gray-400 bg-transparent float-right hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            >
              <svg
                className="w-3 h-3"
                fill="none"
                viewBox="0 0 14 14"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7L1 13"
                />
              </svg>
            </button>

            {product ? (
              <div className="p-4 grid grid-cols-3 gap-5">
                {Object.entries(categories).map(
                  ([mainCategory, subCategories]) => (
                    <div key={mainCategory}>
                      <h3 className="text-gray-900 text-lg font-bold mb-3 border-b border-black capitalize">
                        {mainCategory}
                      </h3>
                      <ul>
                        <li>
                          <Link
                            className="hover:text-blue-500 hover:underline"
                            to={`/p/${gender}/${mainCategory}/all`}
                            onClick={() => {
                              setShowModal(false);
                              setMenu("");
                            }}
                          >
                            All {gender}'s {mainCategory}
                          </Link>
                        </li>
                        {Object.entries(subCategories).map(
                          ([subCategory, items]) => (
                            <li key={subCategory} className="capitalize my-2">
                              <Link
                                className="hover:text-blue-500 hover:underline"
                                to={`/p/${gender}/${mainCategory}/${subCategory}`}
                                onClick={() => {
                                  setShowModal(false);
                                  setMenu("");
                                }}
                              >
                                {subCategory} ({items.length})
                              </Link>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )
                )}
              </div>
            ) : (
              <div className="w- flex justify-center">
                <LoadingSpinner />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
