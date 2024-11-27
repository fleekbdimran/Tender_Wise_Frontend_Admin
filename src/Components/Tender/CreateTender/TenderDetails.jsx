import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import tenderDetailsFormImage from '../../../assets/images/tenderDetailsFormImage.png';
import { AiOutlineClose } from 'react-icons/ai';
import ApiClient from '../../../Api/ApiClient';

const TenderDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    id: '',
    tender_id: '',
    name: '',
    admin_id: '',
    earnest_money: '',
    documents_price: '',
    publish_on: '',
    opening_date: '',
    end_date: '',
    purchase_last_date: '',
    prebid_meeting_date: '',
    submission_date: '',
    company_logo: '',
    file_upload: '',
    status: '',
    permission: '',
    tender_section: '',
    type: '',
    org_company_name: '',
    reference_number: '',
    source_type: '',
    created_at: '',
    category_name: '',
    sector_name: '',
    sub_sector_id: '',
    sub_sector_name: '',
    department_name: '',
    sub_department_id: '',
    sub_department_name: '',
    division_name: '',
    district_name: '',
    upazila_id: '',
    upazila_name: '',
    source_id: '',
    source_name: '',
  });

  // Fetch Tender Details for Editing
  useEffect(() => {
    const fetchTenderDetails = async () => {
      try {
        const response = await ApiClient.get(`/admin/tender/${id}`);
        setFormData({
          ...formData,
          ...response.data.data, // Populate formData with fetched data
        });
        console.log('Tender details:', response.data.data);
      } catch (error) {
        console.error('Error fetching tender details:', error);
      }
    };

    fetchTenderDetails();
  }, [id]);

  // Handle input change
  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value, // Update field dynamically by its name
    }));
  };

  const handleClose = () => {
    navigate('/tenderList');
  };

  return (
    <div className="p-0 md:px-16 2xl:px-20 bg-white min-h-screen rounded-lg shadow-sm">
      <div className="flex items-center justify-center mb-6 2xl:mb-8 -mt-4">
        <img src={tenderDetailsFormImage} alt="" className="h-40 2xl:h-44" />
      </div>

      <div className="bg-tenderDetails shadow-md rounded-md p-6 border border-blue-300">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <img
              src="https://via.placeholder.com/50"
              alt="Tender"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h2 className="text-lg font-bold">Imran Hossain</h2>
              <p className="text-gray-500">Tender Name</p>
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-2 2xl:gap-x-28 gap-x-16 2xl:gap-y-5 gap-y-4">
          {[
            {
              label: 'Org/Company Name',
              name: 'org_company_name',
              type: 'text',
            },
            {
              label: 'Reference Number',
              name: 'reference_number',
              type: 'text',
            },
            { label: 'Earnest Money', name: 'earnest_money', type: 'text' },
            { label: 'Status', name: 'status', type: 'text' },
            { label: 'Published on', name: 'publish_on', type: 'date' },
            { label: 'Document Price', name: 'documents_price', type: 'text' },
            { label: 'Opening Date', name: 'opening_date', type: 'date' },
            { label: 'Type', name: 'type', type: 'text' },
            {
              label: 'Purchase Last Date',
              name: 'purchase_last_date',
              type: 'date',
            },
            { label: 'Category Name', name: 'category_name', type: 'text' },
            { label: 'End Date', name: 'end_date', type: 'date' },
            { label: 'Tender Section', name: 'tender_section', type: 'text' },
            { label: 'Submission Date', name: 'submission_date', type: 'date' },
            { label: 'Source Type', name: 'source_type', type: 'text' },
            {
              label: 'Prebid Meeting Date',
              name: 'prebid_meeting_date',
              type: 'date',
            },
            { label: 'Sector Name', name: 'sector_name', type: 'text' },
            { label: 'Sub-sector Name', name: 'sub_sector_name', type: 'text' },
            { label: 'Department Name', name: 'department_name', type: 'text' },
            {
              label: 'Sub-department Name',
              name: 'sub_department_name',
              type: 'text',
            },
            { label: 'Division Name', name: 'division_name', type: 'text' },
            { label: 'District Name', name: 'district_name', type: 'text' },
            { label: 'Upazila Name', name: 'upazila_name', type: 'text' },
            { label: 'Source Name', name: 'source_name', type: 'text' },
            { label: 'Create at', name: 'created_at', type: 'text' },
          ].map(({ label, name, type }) => (
            <div key={name} className="flex items-center space-x-4">
              <label
                htmlFor={name}
                className="block text-sm font-medium text-gray-700 w-1/3"
              >
                {label}:
              </label>
              <input
                id={name}
                name={name} // Matches the state key
                type={type}
                value={formData[name] || ''} // Dynamically bind the value
                onChange={handleInputChange} // Update state on change
                className="flex-1 p-2 border-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-xs"
              />
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={handleClose}
            className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            <span>Cancel</span>
          </button>
          <button
            onClick={() => console.log('Updated form data:', formData)}
            className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            <span>Update</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TenderDetails;

// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import tenderDetailsFormImage from '../../../assets/images/tenderDetailsFormImage.png';
// import { AiOutlineClose } from 'react-icons/ai';
// import ApiClient from '../../../Api/ApiClient';

// const TenderDetails = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   console.log('EditLoanPage', id);
//   const [document, setDocument] = useState(null);
//   const [formData, setFormData] = useState({
//     id: '',
//     tender_id: '',
//     name: '',
//     admin_id: '',
//     earnest_money: '',
//     documents_price: '',
//     publish_on: '',
//     opening_date: '',
//     end_date: '',
//     purchase_last_date: '',
//     prebid_meeting_date: '',
//     submission_date: '',
//     company_logo: '',
//     file_upload: '',
//     status: '',
//     permission: '',
//     tender_section: '',
//     type: '',
//     org_company_name: '',
//     reference_number: '',
//     source_type: '',
//     created_at: '',
//     category_name: '',
//     sector_name: '',
//     sub_sector_id: '',
//     sub_sector_name: '',
//     department_name: '',
//     sub_department_id: '',
//     sub_department_name: '',
//     division_name: '',
//     district_name: '',
//     upazila_id: '',
//     upazila_name: '',
//     source_id: '',
//     source_name: '',
//   });

//   // Fetch Tender details for editing
//   useEffect(() => {
//     const fetchTenderDetails = async () => {
//       try {
//         const response = await ApiClient.get(`/admin/tender/${id}`);
//         setFormData({
//           org_company_name: response.data.data.org_company_name,

//         });

//         console.log('Tender details:', response.data.data);
//       } catch (error) {
//         console.error('Error fetching loan details:', error);
//       }
//     };

//     fetchTenderDetails();
//   }, []);

//   const handleClose = () => {
//     navigate('/tenderList');
//   };
//   return (
//     <div className="p-0 md:px-16 2xl:px-20 bg-white min-h-screen rounded-lg shadow-sm">
//       {/* <div className="flex justify-between">
//         <div></div>
//         <button
//           onClick={handleClose}
//           className="text-gray-500 text-xl font-bold hover:text-red-500"
//         >
//           <AiOutlineClose />
//         </button>
//       </div> */}
//       <div className="flex items-center justify-center mb-6 2xl:mb-8 -mt-4">
//         <img src={tenderDetailsFormImage} alt="" className="h-40 2xl:h-44" />
//       </div>

//       <div className="bg-tenderDetails shadow-md rounded-md p-6 border border-blue-300">
//         <div className="flex justify-between items-center mb-6">
//           <div className="flex items-center space-x-4">
//             <img
//               src="https://via.placeholder.com/50"
//               alt="Tender"
//               className="w-12 h-12 rounded-full"
//             />
//             <div>
//               <h2 className="text-lg font-bold">Imran Hossain</h2>
//               <p className="text-gray-500">Tender Name</p>
//             </div>
//           </div>
//         </div>

//         {/* Form Fields with Date Fields */}
//         <div className="grid grid-cols-2 2xl:gap-x-28 gap-x-16 2xl:gap-y-5 gap-y-4">
//           {[
//             { label: 'Org/Company Name', type: 'text', },
//             { label: 'Reference Number', type: 'text' },
//             { label: 'Earnest Money', type: 'text' },
//             { label: 'Status', type: 'text' },
//             { label: 'Published on', type: 'date' },
//             { label: 'Document Price', type: 'text' },
//             { label: 'Opening Date', type: 'date' },
//             { label: 'Type', type: 'text' },
//             { label: 'Purchase Last Date', type: 'date' },
//             { label: 'Category Name', type: 'text' },
//             { label: 'End Date', type: 'date' },
//             { label: 'Tender Section', type: 'text' },
//             { label: 'Submission Date', type: 'date' },
//             { label: 'Source Type', type: 'text' },
//             { label: 'Prebid Meeting Date', type: 'date' },
//             { label: 'Sector Name', type: 'text' },
//             { label: 'Sub-sector Name', type: 'text' },
//             { label: 'Department Name', type: 'text' },
//             { label: 'Sub-department Name', type: 'text' },
//             { label: 'Division Name', type: 'text' },
//             { label: 'District Name', type: 'text' },
//             { label: 'Upazila Name', type: 'text' },
//             { label: 'Source Name', type: 'text' },
//             { label: 'Create at', type: 'text' },
//           ].map(({ label, type }) => (
//             <div key={label} className="flex items-center space-x-4">
//               <label className="block text-sm font-medium text-gray-700 w-1/3">
//                 {label}:
//               </label>
//               <input
//                 type={type}
//                 className="flex-1 p-2 border-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-xs"
//                 // placeholder={type === 'text' ? `Enter ${label}` : ''}
//               />
//             </div>
//             // <div key={label}>
//             //   <label className="block text-sm font-medium text-gray-700">
//             //     {label}:
//             //   </label>
//             //   <input
//             //     type="text"
//             //     className="mt-1 block w-full p-2 border-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-xs"
//             //     placeholder={`Enter ${label}`}
//             //   />
//             // </div>
//           ))}
//         </div>

//         {/* Update Button */}
//         <div className="mt-6 flex justify-end gap-4">
//           <button
//             onClick={handleClose}
//             className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
//           >
//             <span>Cancel</span>
//           </button>
//           <button className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
//             <span>Update</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TenderDetails;
