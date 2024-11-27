import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import tenderDetailsFormImage from '../../../assets/images/tenderDetailsFormImage.png';
import { AiOutlineClose } from 'react-icons/ai';
import ApiClient from '../../../Api/ApiClient';
import Swal from 'sweetalert2';

const BackupTenderDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // State for form data and auxiliary inputs
  const [formData, setFormData] = useState({
    org_company_name: '',
    reference_number: '',
    earnest_money: '',
    documents_price: '',
    publish_on: '',
    opening_date: '',
    end_date: '',
    purchase_last_date: '',
    prebid_meeting_date: '',
    submission_date: '',
    status: '',
    tender_section: '',
    type: '',
    sub_sector_id: '',
    sub_department_id: '',
    source_id: '',
    upazila_id: '',
    description: '',
  });
  const [fileInput, setFileInput] = useState(null);
  const [logoInput, setLogoInput] = useState(null);
  const [logo, setLogo] = useState(null);
  const [orgName, setOrgname] = useState('');
  const [tenderName, setTenderName] = useState('');

  // Fetch Tender Details for Editing
  useEffect(() => {
    const fetchTenderDetails = async () => {
      try {
        const response = await ApiClient.get(`/admin/tender/${id}`);
        const data = response.data.data;
        setOrgname(data.org_company_name);
        setTenderName(data.name);
        setLogo(data.company_logo);
        setFormData({
          ...formData,
          ...data, // Populate formData with fetched data
        });
        console.log('Fetched Tender Details:', data);
      } catch (error) {
        console.error('Error fetching tender details:', error);
      }
    };
    fetchTenderDetails();
  }, [id]);

  // Handle input change
  const handleInputChange = e => {
    const { name, value } = e.target;

    // Convert numeric fields to numbers if necessary
    const numericFields = [
      'sub_sector_id',
      'sub_department_id',
      'source_id',
      'upazila_id',
    ];
    setFormData(prevData => ({
      ...prevData,
      [name]: numericFields.includes(name)
        ? value
          ? Number(value)
          : ''
        : value,
    }));
  };

  // Handle file upload
  const handleFileUpload = (e, setFile) => {
    const file = e.target.files[0];
    if (file) setFile(file);
  };

  // Handle form submission
  const handleSubmit = async e => {
    e.preventDefault();

    // Prepare form data
    const updateData = new FormData();

    // Append fields conditionally, ensuring valid types
    updateData.append('name', formData.name || '');
    updateData.append(
      'sub_sector_id',
      formData.sub_sector_id ? Number(formData.sub_sector_id) : ''
    ); // Ensure number or omit
    updateData.append(
      'sub_department_id',
      formData.sub_department_id ? Number(formData.sub_department_id) : ''
    );
    updateData.append(
      'source_id',
      formData.source_id ? Number(formData.source_id) : ''
    );
    updateData.append(
      'upazila_id',
      formData.upazila_id ? Number(formData.upazila_id) : ''
    );

    // Append other fields (similarly for all fields)
    updateData.append('earnest_money', formData.earnest_money || '');
    updateData.append('tender_section', formData.tender_section || '');
    updateData.append('documents_price', formData.documents_price || '');
    updateData.append('publish_on', formData.publish_on || '');
    updateData.append('opening_date', formData.opening_date || '');
    updateData.append('end_date', formData.end_date || '');
    updateData.append('purchase_last_date', formData.purchase_last_date || '');
    updateData.append(
      'prebid_meeting_date',
      formData.prebid_meeting_date || ''
    );
    updateData.append('submission_date', formData.submission_date || '');

    // File uploads
    if (fileInput instanceof File) {
      updateData.append('file_upload', fileInput);
    }
    if (logoInput instanceof File) {
      updateData.append('company_logo', logoInput);
    }

    console.log(
      'Final updateData before submission:',
      Object.fromEntries(updateData)
    );

    try {
      // Submit the form data
      const response = await ApiClient.patch(
        `/admin/tender/${id}/`,
        updateData
      );

      Swal.fire({
        title: 'Success!',
        text: response?.data?.message || 'Tender updated successfully.',
        icon: 'success',
      });

      // Navigate or refresh after success
      navigate('/tenderList');
    } catch (error) {
      // Handle errors and display message
      if (error.response) {
        Swal.fire({
          title: 'Error!',
          text: error.response.data.message || 'Failed to update tender.',
          icon: 'error',
        });
        console.error('Error response:', error.response.data);
      } else {
        console.error('Error submitting form:', error);
      }
    }
  };

  return (
    <div className="p-0 md:px-16 2xl:px-20 bg-white min-h-screen rounded-lg shadow-sm">
      <div className="flex items-center justify-center mb-6 2xl:mb-8 -mt-4">
        <img
          src={tenderDetailsFormImage}
          alt="Tender Details Form"
          className="h-40 2xl:h-44"
        />
      </div>

      <div className="bg-tenderDetails shadow-md rounded-md p-6 border border-blue-300">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <img
              src={
                logo
                  ? `http://192.168.0.230:9009/admin-files/${logo}`
                  : 'https://via.placeholder.com/50'
              }
              alt="Organization Logo"
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h2 className="text-lg font-bold">{tenderName}</h2>
              <p className="text-gray-500">{orgName}</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
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
              {
                label: 'Document Price',
                name: 'documents_price',
                type: 'text',
              },
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
              {
                label: 'Submission Date',
                name: 'submission_date',
                type: 'date',
              },
              { label: 'Source Type', name: 'source_type', type: 'text' },
              {
                label: 'Prebid Meeting Date',
                name: 'prebid_meeting_date',
                type: 'date',
              },
              { label: 'Sector Name', name: 'sector_name', type: 'text' },
              {
                label: 'Sub-sector Name',
                name: 'sub_sector_name',
                id: 'sub_sector_id',
                type: 'text',
              },
              {
                label: 'Department Name',
                name: 'department_name',
                type: 'text',
              },
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
              { label: 'Description', name: 'description', type: 'text' },
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
                  name={name}
                  type={type}
                  value={formData[name] || ''}
                  onChange={handleInputChange}
                  className="flex-1 p-2 border-2 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 text-xs"
                />
              </div>
            ))}

            {/* <div className="flex items-center space-x-4">
              <label
                htmlFor="file_upload"
                className="block text-sm font-medium text-gray-700 w-1/3"
              >
                File Upload:
              </label>
              <input
                type="file"
                onChange={e => handleFileUpload(e, setFileInput)}
                className="flex-1 p-1 border-2 rounded-md shadow-sm"
              />
            </div>
            <div className="flex items-center space-x-4">
              <label
                htmlFor="company_logo"
                className="block text-sm font-medium text-gray-700 w-1/3"
              >
                Organization Logo:
              </label>
              <input
                type="file"
                onChange={e => handleFileUpload(e, setLogoInput)}
                className="flex-1 p-1 border-2 rounded-md shadow-sm"
              />
            </div> */}
          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate('/tenderList')}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BackupTenderDetails;
