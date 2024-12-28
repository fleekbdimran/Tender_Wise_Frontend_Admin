import { AiOutlineClose } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import ApiClient from '../../../Api/ApiClient';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import tenderDetailsFormImage from '../../../assets/images/tenderDetailsFormImage.png';
import { PHOTO_BASE_URL_Admin } from '../../../Api/config';
const SingleTenderDetails = ({ onClose }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedSector, setSelectedSector] = useState('');
  const [filteredSectors, setFilteredSectors] = useState([]);
  const [filteredSubsectors, setFilteredSubsectors] = useState([]);
  const [filteredSubdepartments, setFilteredSubdepartments] = useState([]);

  // State for division, district, and upazila
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  // State for source
  const [selectedSourceType, setSelectedSourceType] = useState('');
  const [filteredSources, setFilteredSources] = useState([]);
  const [logo, setLogo] = useState(null);
  const [orgName, setOrgname] = useState('');
  const [tenderName, setTenderName] = useState('');
  const [formDataSubmit, setFormDataSubmit] = useState({
    name: '',
    invitation_for: '',
    ref_no: '',
    type: '',
    status: '',
    permission: '',
    sub_sector_id: '',
    sub_department_id: '',
    source_id: '',
    upazila_id: '',
    earnest_money: '',
    documents_price: '',
    publish_on: '',
    opening_date: '',
    end_date: '',
    purchase_last_date: '',
    prebid_meeting_date: '',
    submission_date: '',
    description: '',
    tender_section: '',
    company_logo: '',
    file_upload:'',
  });
  const [fileInput, setFileInput] = useState(null);
  const [logoInput, setLogoInput] = useState(null);
   const [companyLogoPreview, setCompanyLogoPreview] = useState(null);
   const [tenderFileName, setTenderFileName] = useState(null);

  // Fetch Tender Details for Editing
  useEffect(() => {
    const fetchTenderDetails = async () => {
      try {
        const response = await ApiClient.get(`/admin/tender/${id}`);
        const data = response.data.data;
        setSelectedCategory(data.category_id);
        setSelectedSector(data.sector_id);
        setSelectedDepartment(data.department_id);
        setSelectedDivision(data.division_id);
        setSelectedDistrict(data.district_id);
        // setSelectedSourceType(data.source_id);
        setOrgname(data.org_company_name);
        setTenderName(data.name);
        setLogo(data.company_logo);
        setFormDataSubmit({
          ...formDataSubmit,
          ...data, // Populate formData with fetched data
        });
        // Set previews for file-based fields
        if (data.company_logo) {
          // setCompanyLogoPreview(`${company_logo}`);
          setCompanyLogoPreview(data.company_logo.split('/').pop());
        } else {
          setCompanyLogoPreview('not provided'); // Display "null" if company_logo is not available
        }
        if (data.file_upload) {
          setTenderFileName(data.file_upload.split('/').pop());
        } else {
          setTenderFileName('not provided'); // Display "null" if company_logo is not available
        }
        console.log('Fetched Tender Details:', data);
      } catch (error) {
        console.error('Error fetching tender details:', error);
      }
    };
    fetchTenderDetails();
    // Reload after 1 seconds
    // const interval = setInterval(() => {
    //   fetchTenderDetails();
    // }, 1000);
    // return () => clearInterval(interval);
  }, [id]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    console.log(`Field Name: ${name}, Value: ${value}`);
    setFormDataSubmit(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // const handleFileUpload = (e, setImage) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setImage(file); // Store the actual File object
  //   }
  // };

  const handleFileUpload = (e, setFileInput) => {
    const file = e.target.files[0];
    if (file) {
      // Validating the file type (only PDF and DOC/DOCX are allowed)
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']; // MIME types for PDF, DOC, DOCX
      if (!allowedTypes.includes(file.type)) {
        Swal.fire({
          title: 'Error!',
          text: 'Only PDF and DOC files are allowed.',
          icon: 'error',
          confirmButtonText: 'Okay',
        });
        e.target.value = ''; // Clear the input if the file type is invalid
        return; // Stop further processing if file type is invalid
      }
  
      // If the file type is valid, store the file
      setFileInput(file); // Store the actual File object
    }
  };

  
  // const handleLogoUpload = (e, setImage) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setImage(file); // Store the actual File object
  //   }
  // };
  const handleLogoUpload = (e, setImage) => {
    const file = e.target.files[0];
    if (file) {
      // Validating the file type (only JPG, PNG, and JPEG are allowed)
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg']; // MIME types for JPG, PNG, JPEG
      if (!allowedTypes.includes(file.type)) {
        Swal.fire({
          title: 'Error!',
          text: 'Only JPG, PNG, and JPEG files are allowed.',
          icon: 'error',
          confirmButtonText: 'Okay',
        });
        e.target.value = ''; // Clear the input if the file type is invalid
        return; // Stop further processing if file type is invalid
      }
  
      // If the file type is valid, store the file
      setImage(file); // Store the actual File object
    }
  };
  
  const handleSubmit = async e => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append('name', formDataSubmit.name || '');
    formdata.append('invitation_for', formDataSubmit.invitation_for || '');
    formdata.append('ref_no', formDataSubmit.ref_no || '');
    formdata.append('type', formDataSubmit.type || '');
    formdata.append('status', formDataSubmit.status || '');
    formdata.append('permission', formDataSubmit.permission || '');
    formdata.append('sub_sector_id', formDataSubmit.sub_sector_id || '');
    formdata.append(
      'sub_department_id',
      formDataSubmit.sub_department_id || ''
    );
    formdata.append('source_id', formDataSubmit.source_id || '');
    formdata.append('upazila_id', formDataSubmit.upazila_id || '');
    formdata.append('earnest_money', formDataSubmit.earnest_money || 0.00);
    formdata.append('documents_price', formDataSubmit.documents_price || 0.00);
    formdata.append('publish_on', formDataSubmit.publish_on || '');

    formdata.append('opening_date', formDataSubmit.opening_date || '');
    formdata.append('end_date', formDataSubmit.end_date || '');
    formdata.append(
      'purchase_last_date',
      formDataSubmit.purchase_last_date || ''
    );
    formdata.append(
      'prebid_meeting_date',
      formDataSubmit.prebid_meeting_date || ''
    );
    formdata.append('submission_date', formDataSubmit.submission_date || '');
    formdata.append('description', formDataSubmit.description || '');
    formdata.append('tender_section', formDataSubmit.tender_section || '');

    if (fileInput instanceof File) {
      formdata.append('file_upload', fileInput);
    }
    if (logoInput instanceof File) {
      formdata.append('company_logo', logoInput);
    }

    console.log('Before send Data:', formdata);
    console.log('Before send Data:', formDataSubmit);

    try {
      // const response = await ApiClient.post('/admin/tender', formdata);
      const response = await ApiClient.patch(`/admin/tender/${id}/`, formdata);
      console.log(response.data);

      const successMessage =
        response?.data?.message || 'An unknown error occurred';
      Swal.fire({
        title: 'Success!',
        text: successMessage,
        customClass: {
          popup: 'w-72 h-auto p-2',
          title: 'text-lg',
          content: 'text-xs',
          confirmButton: 'bg-blue-600 text-white px-4 py-1 text-sm rounded-md',
        },
      });
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message || 'An unknown error occurred';
      Swal.fire({
        title: 'Failed!',
        text: errorMessage,
        customClass: {
          popup: 'w-72 h-auto p-2',
          title: 'text-lg',
          content: 'text-xs',
          confirmButton: 'bg-blue-600 text-white px-4 py-1 text-sm rounded-md',
        },
      });
    }
  };

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await ApiClient.get('/admin/tender-config/category');
        if (response.data.success) {
          setCategories(response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch all sectors once
  useEffect(() => {
    const fetchAllSectors = async () => {
      try {
        const response = await ApiClient.get('/admin/tender-config/sector');
        if (response.data.success) {
          setSectors(response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch sectors:', error);
      }
    };
    fetchAllSectors();
  }, []);

  // Fetch subsectors based on selected sector
  useEffect(() => {
    if (selectedSector) {
      const selectedSectorData = sectors.find(
        sector => sector.id === parseInt(selectedSector)
      );
      if (selectedSectorData && selectedSectorData.sub_sectors) {
        setFilteredSubsectors(selectedSectorData.sub_sectors);
      } else {
        setFilteredSubsectors([]);
      }
    } else {
      setFilteredSubsectors([]);
    }
  }, [selectedSector, sectors]);

  // Filter sectors based on selected category
  useEffect(() => {
    if (selectedCategory) {
      const filtered = sectors.filter(
        sector => sector.category_id === parseInt(selectedCategory)
      );
      setFilteredSectors(filtered);
    } else {
      setFilteredSectors([]);
    }
  }, [selectedCategory, sectors]);

  // Fetch departments
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await ApiClient.get('/admin/tender-config/department');
        if (response.data.success) {
          setDepartments(response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch departments:', error);
      }
    };
    fetchDepartments();
  }, []);

  // Fetch subdepartments based on selected department
  useEffect(() => {
    if (selectedDepartment) {
      const selectedDepartmentData = departments.find(
        department => department.id === parseInt(selectedDepartment)
      );
      if (selectedDepartmentData && selectedDepartmentData.sub_departments) {
        setFilteredSubdepartments(selectedDepartmentData.sub_departments);
      } else {
        setFilteredSubdepartments([]);
      }
    } else {
      setFilteredSubdepartments([]);
    }
  }, [selectedDepartment, departments]);

  // Fetch divisions with districts
  useEffect(() => {
    const fetchDivisions = async () => {
      try {
        const response = await ApiClient.get('/admin/tender-config/division');
        if (response.data.success) {
          setDivisions(response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch divisions:', error);
      }
    };
    fetchDivisions();
  }, []);

  // Fetch districts with upazilas
  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const response = await ApiClient.get('/admin/tender-config/district');
        if (response.data.success) {
          setDistricts(response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch districts:', error);
      }
    };
    fetchDistricts();
  }, []);

  // Filter districts based on selected division
  useEffect(() => {
    if (selectedDivision) {
      const selectedDivisionData = divisions.find(
        division => division.id === parseInt(selectedDivision)
      );
      setFilteredDistricts(selectedDivisionData?.districts || []);
    } else {
      setFilteredDistricts([]);
    }
  }, [selectedDivision, divisions]);

  // Filter upazilas based on selected district
  useEffect(() => {
    if (selectedDistrict) {
      const selectedDistrictData = districts.find(
        district => district.id === parseInt(selectedDistrict)
      );
      setFilteredUpazilas(selectedDistrictData?.upazilas || []);
    } else {
      setFilteredUpazilas([]);
    }
  }, [selectedDistrict, districts]);

  // Fetch sources by type using Axios
  const fetchSourcesByType = async type => {
    try {
      const response = await ApiClient.get(
        `/admin/tender-config/source?type=${type}`
      );
      if (response.data.success) {
        setFilteredSources(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch sources:', error);
    }
  };

  // Fetch sources when the selected type changes
  useEffect(() => {
    if (selectedSourceType) {
      fetchSourcesByType(selectedSourceType);
    } else {
      setFilteredSources([]);
    }
  }, [selectedSourceType]);

  return (
    <div className="block mx-auto md:p-2 p-1 w-full">
      <div className="flex items-center justify-center mb-6 2xl:mb-8 -mt-4">
        <img
          src={tenderDetailsFormImage}
          alt="Tender Details Form"
          className="h-40 2xl:h-44"
        />
      </div>
      <div className="bg-tenderDetails shadow-md rounded-md p-6 border border-blue-300">
        {/* <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <img
              src={
                logo
                  ? // ? `http://192.168.0.230:9009/admin-files/${logo}`
                    `${PHOTO_BASE_URL_Admin}${logo}`
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

          <div className="flex gap-2 mt-2 items-center">
                  <p>View Tender Details in pdf: </p>
                  <a
                    href={`${PHOTO_BASE_URL_Admin}${tenderFileName}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-center items-center border border-gray-300 px-2 py-2 text-xs rounded-md shadow-sm w-full sm:w-1/3 bg-white text-black hover:text-blue-600 hover:border-blue-600"
                  >
                    📄 View PDF
                  </a>
                </div>
        </div> */}

<div className="flex justify-between items-center mb-6">
  <div className="flex items-center space-x-4">
    <img
      src={
        logo
          ? `${PHOTO_BASE_URL_Admin}${logo}` // Dynamically set logo if available
          : 'https://via.placeholder.com/50' // Placeholder if logo is missing
      }
      alt="Organization Logo"
      className="w-16 h-16 rounded-full"
    />
    <div>
      <h2 className="text-lg font-bold">{tenderName}</h2>
      <p className="text-gray-500">{orgName}</p>
    </div>
  </div>

  <div className="flex gap-2 items-center mt-2">
  <p className="">Tender Details View In PDF: </p>
  <a
    href={`${PHOTO_BASE_URL_Admin}${tenderFileName}`}
    target="_blank"
    rel="noopener noreferrer"
    className="flex justify-center items-center border border-gray-300 px-2 py-2 text-xs rounded-md shadow-sm w-full sm:w-auto bg-white text-black hover:text-blue-600 hover:border-blue-600"
  >
    📄 View PDF
  </a>
</div>


</div>


        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 2xl:grid-cols-4 gap-6">
            {/* Reference No */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Reference No
              </label>
              <input
                type="text"
                name="ref_no"
                value={formDataSubmit.ref_no}
                onChange={handleInputChange}
                placeholder="Enter Reference No "
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Title */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter name"
                name="name" // Ensure this matches the key in formDataSubmit state
                value={formDataSubmit.name} // Must bind to state
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            {/* Invitation for */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Org/Company Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="invitation_for"
                value={formDataSubmit.invitation_for}
                onChange={handleInputChange}
                placeholder="Enter invitation for"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Tender section Dropdown */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                name="status"
                value={formDataSubmit.status}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="" disabled>
                  Select status
                </option>
                <option value="1">Live</option>
                <option value="0">Expired</option>
              </select>
            </div>
            {/* permission */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Permission <span className="text-red-500">*</span>
              </label>
              <select
                name="permission"
                value={formDataSubmit.permission}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="" disabled>
                  Select Permission
                </option>
                <option value="publish">Publish</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            {/* Tender section Dropdown */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Tender Section <span className="text-red-500">*</span>
              </label>
              <select
                name="tender_section"
                value={formDataSubmit.tender_section}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="" disabled>
                  Select Tender Section
                </option>
                <option value="private">Private Tender</option>
                <option value="govt">Govt. Tender</option>
                <option value="international">International Tender</option>
                <option value="local">Local Tender</option>
              </select>
            </div>
            {/* Tender Type Dropdown */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Type <span className="text-red-500">*</span>
              </label>
              <select
                name="type"
                value={formDataSubmit.type}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="" disabled>
                  Select Type
                </option>
                <option value="free">Free Tender</option>
                <option value="hot">Hot Tender</option>
                <option value="popular">Popular Tender</option>
                <option value="corrigendum">Corrigendum Tender</option>
                <option value="int_popular">Int Popular Tender</option>
              </select>
            </div>

            {/* Source Type Dropdown */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Source Type <span className="text-red-500">*</span>
              </label>
              <select
                // value={selectedSourceType}
                name="source_type"
                value={formDataSubmit.source_type}
                // onChange={e => setSelectedSourceType(e.target.value)}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>
                  Select Source Type
                </option>
                <option value="e-GP">e-GP</option>
                <option value="Newspaper">Newspaper</option>
                <option value="Online">Online</option>
                <option value="Advertisement">Third Party</option>
                <option value="Website">Website</option>
                <option value="Manual">Manual</option>
              </select>
            </div>
            {/* Source Name Dropdown */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Source Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="source_name"
                value={formDataSubmit.source_name}
                onChange={handleInputChange}
                placeholder="Enter Earnest Money"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {/* <select
                name="source_id"
                value={formDataSubmit.source_name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="" disabled>
                  Select a Source
                </option>
                {filteredSources.map(source => (
                  <option key={source.id} value={source.id}>
                    {source.name}
                  </option>
                ))}
              </select> */}
            </div>
            {/* Department Dropdown */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Department
              </label>
              <select
                value={selectedDepartment}
                onChange={e => setSelectedDepartment(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">
                  Select a Department
                </option>
                {departments.map(department => (
                  <option key={department.id} value={department.id}>
                    {department.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Subdepartment Dropdown */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Sub-Department
              </label>
              <select
                name="sub_department_id"
                value={formDataSubmit.sub_department_id}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" >
                  Select a Sub-department
                </option>
                {filteredSubdepartments.map(subdepartment => (
                  <option key={subdepartment.id} value={subdepartment.id}>
                    {subdepartment.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Dropdown */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Category
              </label>
              <select
                value={selectedCategory}
                // value={formDataSubmit.category_name}
                onChange={e => setSelectedCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" >
                  Select a Category
                </option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sector Dropdown */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Sector
              </label>
              <select
                value={selectedSector}
                // value={formDataSubmit.sector_name}
                onChange={e => setSelectedSector(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">
                  Select a Sector
                </option>
                {filteredSectors.map(sector => (
                  <option key={sector.id} value={sector.id}>
                    {sector.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Subsector Dropdown */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Sub-Sector
              </label>
              <select
                name="sub_sector_id"
                value={formDataSubmit.sub_sector_id}
                // value={selectedSector}
                onChange={handleInputChange}
                // onChange={handleSectorChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" >
                  Select a Sub-sector
                </option>
                {filteredSubsectors.map(subsector => (
                  <option key={subsector.id} value={subsector.id}>
                    {subsector.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Division Dropdown */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Division <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedDivision}
                onChange={e => setSelectedDivision(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" >
                  Select a Division
                </option>
                {divisions.map(division => (
                  <option key={division.id} value={division.id}>
                    {division.name}
                  </option>
                ))}
              </select>
            </div>

            {/* District Dropdown */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                District <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedDistrict}
                onChange={e => setSelectedDistrict(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">
                  Select a District
                </option>
                {filteredDistricts.map(district => (
                  <option key={district.id} value={district.id}>
                    {district.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Upazila Dropdown */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Upazila <span className="text-red-500">*</span>
              </label>
              <select
                value={formDataSubmit.upazila_id}
                onChange={handleInputChange}
                name="upazila_id"
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" >
                  Select an Upazila
                </option>
                {filteredUpazilas.map(upazila => (
                  <option key={upazila.id} value={upazila.id}>
                    {upazila.name}
                  </option>
                ))}
              </select>
            </div>

            {/*  Publish Date*/}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Publish date <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="publish_on"
                value={formDataSubmit.publish_on}
                onChange={handleInputChange}
                // onChange={handlePublishOnDateChange}
                placeholder="Enter Earnest Money"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            {/*  Opening Date*/}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Opening Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="opening_date"
                value={formDataSubmit.opening_date}
                onChange={handleInputChange}
                placeholder="Enter Date"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
           
            {/*  Pharchase Last Date*/}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Pharchase Last Date
              </label>
              <input
                type="date"
                name="purchase_last_date"
                value={formDataSubmit.purchase_last_date}
                onChange={handleInputChange}
                placeholder="Enter Date"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/*  Prebid Meeting Date*/}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Prebid Meeting Date
              </label>
              <input
                type="date"
                name="prebid_meeting_date"
                value={formDataSubmit.prebid_meeting_date}
                onChange={handleInputChange}
                placeholder="Enter Date"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/*  Submission Date*/}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Submission Date<span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="submission_date"
                value={formDataSubmit.submission_date}
                onChange={handleInputChange}
                placeholder="Enter Date"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Earnest Money*/}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Earnest Money
              </label>
              <input
                type="text"
                name="earnest_money"
                value={formDataSubmit.earnest_money}
                onChange={handleInputChange}
                placeholder="Enter Earnest Money"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onInput={e => {
                  e.target.value = e.target.value
                    .replace(/[^0-9.]/g, '') // Allows only numbers and a decimal point
                    .replace(/(\..*?)\./g, '$1') // Ensures only one decimal point
                    .replace(/(\.\d{2})\d+/g, '$1'); // Limits to two digits after the decimal point
                }}
              />
            </div>
            {/* Document Price*/}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Document Price
              </label>
              <input
                type="text"
                name="documents_price"
                value={formDataSubmit.documents_price}
                onChange={handleInputChange}
                placeholder="Enter Earnest Money"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onInput={e => {
                  e.target.value = e.target.value
                    .replace(/[^0-9.]/g, '') // Allows only numbers and a decimal point
                    .replace(/(\..*?)\./g, '$1') // Ensures only one decimal point
                    .replace(/(\.\d{2})\d+/g, '$1'); // Limits to two digits after the decimal point
                }}
              />
            </div>

            {/* File Upload */}
            {/* <div>
              <label className="block text-gray-700 font-medium mb-1">
                File Upload
              </label>
              <input
                type="file"
                onChange={e => handleFileUpload(e, setFileInput)}
                className="w-full p-2 border border-gray-300 rounded-lg bg-white"
              />
              {tenderFileName && (
               
                <div className="flex gap-2 mt-2 items-center">
                  <p>Previous File: </p>
                  <a
                    href={`${PHOTO_BASE_URL_Admin}${tenderFileName}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-center items-center border border-gray-300 px-2 py-2 text-xs rounded-md shadow-sm w-full sm:w-1/3 bg-white text-black hover:text-blue-600 hover:border-blue-600"
                  >
                    📄 View PDF
                  </a>
                </div>
              )}
            </div> */}

<div>
  <label className="block text-gray-700 font-medium mb-1">
    File Upload
  </label>
  <input
    type="file"
    onChange={e => handleFileUpload(e, setFileInput)}
    className="w-full p-2 border border-gray-300 rounded-lg bg-white"
  />
  {tenderFileName && (
    <div className="flex gap-2 mt-2 items-center">
      <p>Previous File: </p>
      <a
        href={`${PHOTO_BASE_URL_Admin}${tenderFileName}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex justify-center items-center border border-gray-300 px-2 py-2 text-xs rounded-md shadow-sm w-full sm:w-1/3 bg-white text-black hover:text-blue-600 hover:border-blue-600"
      >
        📄 View PDF
      </a>
    </div>
  )}
</div>

            {/* Logo Upload */}
            {/* <div>
              <label className="block text-gray-700 font-medium mb-1">
                Organization Logo
              </label>
              <input
                type="file"
                onChange={e => handleLogoUpload(e, setLogoInput)}
                className="w-full p-2 border border-gray-300 rounded-lg bg-white"
              />
              {companyLogoPreview && (
              
                <div className="flex gap-2 mt-2 items-center">
                  <p>Previous Logo: </p>
                  <a
                    href={`${PHOTO_BASE_URL_Admin}${companyLogoPreview}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-center items-center border border-gray-300 px-2 py-2 text-xs rounded-md shadow-sm w-full sm:w-1/3 bg-white text-black hover:text-blue-600 hover:border-blue-600"
                  >
                    📄 View Logo
                  </a>
                </div>
              )}
            </div> */}

<div>
  <label className="block text-gray-700 font-medium mb-1">
    Organization Logo
  </label>
  <input
    type="file"
    onChange={e => handleLogoUpload(e, setLogoInput)}
    className="w-full p-2 border border-gray-300 rounded-lg bg-white"
  />
  {companyLogoPreview && (
    <div className="flex gap-2 mt-2 items-center">
      <p>Previous Logo: </p>
      <a
        href={`${PHOTO_BASE_URL_Admin}${companyLogoPreview}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex justify-center items-center border border-gray-300 px-2 py-2 text-xs rounded-md shadow-sm w-full sm:w-1/3 bg-white text-black hover:text-blue-600 hover:border-blue-600"
      >
        📄 View Logo
      </a>
    </div>
  )}
</div>

            {/* Description */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Description
              </label>
              <textarea
                type="text"
                placeholder="Enter Descriptions"
                name="description" // Ensure this matches the key in formDataSubmit state
                value={formDataSubmit.description} // Must bind to state
                onChange={handleInputChange}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="1"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate('/tenderList')}
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SingleTenderDetails;
