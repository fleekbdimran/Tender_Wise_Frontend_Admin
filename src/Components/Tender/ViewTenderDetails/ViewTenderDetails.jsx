
const ViewTenderDetails = () => {
    return (
        <div className="container mx-auto p-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-800">SingleTender View</h1>
              <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 17l-5-5m0 0l5-5m-5 5h12"
                  />
                </svg>
                Edit
              </button>
            </div>
    
            {/* Tender Details */}
            <div className="flex items-center justify-center mb-8">
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mr-4">
              <img src="/src/image/Rectangle 82.png" alt="Logo" className="" style={{ height: 90, width:100 }} />
              </div>
              <div>
              <p className="text-gray-500">Tender ID</p>
                <h2 className="text-xl font-semibold text-gray-700">
                  Tender for buy cars
                </h2>
                
              </div>



            </div>
    
            {/* Tender Information Table */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-700">
              {[
                ["Earnest Money", ],
                ["Status", ],
                ["Document Price", ],
                ["Category Name", ],
                ["Published on", ],
                ["Sector Name", ],
                ["Opening Date", ],
                ["Sub-sector Name", ],
                ["End Date", ],
                ["Department Name", ],
                ["Purchase Last Date", ],
                ["Sub-department Name", ],
                ["Prebid Meeting Date", ],
                ["Division Name", ],

                ["Submission Date", ],
                ["District Name", ],
            
                ["Tender Section", ],
                ["Upazila Name", ],
                ["Type", ],
                ["Source Name", ],
                ["Source Type", ],
                ["Create At", ],
              ].map(([label, value], idx) => (
                <div
                  key={idx}
                  className="border-b pb-2 flex justify-between items-center"
                >
                  <span className="font-medium text-gray-600">{label}</span>
                  <span className="text-gray-800">{value}</span>
                </div>
              ))}
            </div>
    
            {/* PDF Button */}
            <div className="mt-6 flex justify-center">
              <button className="bg-gray-200 px-6 py-3 rounded-md text-gray-700 hover:bg-gray-300">
                View the PDF
              </button>
            </div>
          </div>
        </div>
      );
    };
export default ViewTenderDetails
