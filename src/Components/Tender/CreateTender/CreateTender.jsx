import { EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Pagination } from 'antd';
import { AiOutlineFile, AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import ApiClient from './../../../Api/ApiClient';
// Sample Admin List
const adminUserList = [
  {
    id: 91,
    name: 'Grand',
    email: 'Free',
    expiredDate: '10-02-2025',
    createdDate: '10-11-2024',
    group: 'Not Available',
    status: 'Publish',
  },
  {
    id: 90,
    name: 'Rose',
    email: 'Popular',
    expiredDate: '29-12-2024',
    createdDate: '29-10-2024',
    group: 'Not Available',
    status: 'Pending',
  },
];

const CreateTenderForm = ({ onClose }) => {
  const [categories, setCategories] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [subdepartments, setSubdepartments] = useState([]);
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
  const [selectedUpazila, setSelectedUpazila] = useState('');
  // State for source
  const [sources, setSources] = useState([]);
  const [selectedSourceType, setSelectedSourceType] = useState('');
  const [filteredSources, setFilteredSources] = useState([]);

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
        `/admin/tender-config/source?type=${type}`,
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

    const [selectedFile, setSelectedFile] = useState(null);

    // const handleChange = e => {
    //   const { name, value } = e.target;
    //   setFormData({ ...formData, [name]: value });
    // };

    const handleFileChange = e => {
      setSelectedFile(e.target.files[0]);
    };

  return (
    <div className="block mx-auto p-8 w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Create Tender</h2>
        <button
          onClick={onClose}
          className="text-gray-500 text-xl font-bold hover:text-red-500"
        >
          <AiOutlineClose />
        </button>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full">
        <form>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 2xl:grid-cols-4 gap-6">
            {/* Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter name"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Invitation for */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Invitation for <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter invitation for"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Reference No */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Reference No <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter Reference No "
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Tender section Dropdown */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Tender Section <span className="text-red-500">*</span>
              </label>
              <select
                // value={selectedSourceType}
                // onChange={e => setSelectedSourceType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                // value={selectedSourceType}
                // onChange={e => setSelectedSourceType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>
                  Select Type
                </option>
                <option value="free">Free Tender</option>
                <option value="hot">Hot Tender</option>
                <option value="popular">Popular Tender</option>
                <option value="int_popular">Int Popular Tender</option>
              </select>
            </div>

            {/* Category Dropdown */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Category<span className="text-red-500">*</span>
              </label>
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>
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
                Sector <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedSector}
                onChange={e => setSelectedSector(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>
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
                Subsector <span className="text-red-500">*</span>
              </label>
              <select className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="" disabled>
                  Select a Subsector
                </option>
                {filteredSubsectors.map(subsector => (
                  <option key={subsector.id} value={subsector.id}>
                    {subsector.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Department Dropdown */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Department <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedDepartment}
                onChange={e => setSelectedDepartment(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>
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
                Subdepartment <span className="text-red-500">*</span>
              </label>
              <select className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="" disabled>
                  Select a Subdepartment
                </option>
                {filteredSubdepartments.map(subdepartment => (
                  <option key={subdepartment.id} value={subdepartment.id}>
                    {subdepartment.name}
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
                <option value="" disabled>
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
                <option value="" disabled>
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
                value={selectedUpazila}
                onChange={e => setSelectedUpazila(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>
                  Select an Upazila
                </option>
                {filteredUpazilas.map(upazila => (
                  <option key={upazila.id} value={upazila.id}>
                    {upazila.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Source Type Dropdown */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Source Type <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedSourceType}
                onChange={e => setSelectedSourceType(e.target.value)}
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
            {/* Source Dropdown */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Source <span className="text-red-500">*</span>
              </label>
              <select className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="" disabled>
                  Select a Source
                </option>
                {filteredSources.map(source => (
                  <option key={source.id} value={source.id}>
                    {source.name}
                  </option>
                ))}
              </select>
            </div>
            {/* Earnest Money*/}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Earnest Money <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter Earnest Money"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Document Price*/}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Document Price <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter Earnest Money"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/*  Publish on*/}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Publish on <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                placeholder="Enter Earnest Money"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/*  Opening Date*/}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Opening Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                placeholder="Enter Date"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/*  End Date*/}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                End Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                placeholder="Enter Date"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/*  Pharchase Last Date*/}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Pharchase Last Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                placeholder="Enter Date"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/*  Prebid Meeting Date*/}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Prebid Meeting Date<span className="text-red-500">*</span>
              </label>
              <input
                type="date"
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
                placeholder="Enter Date"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* File Upload */}
            <div className="mt-0">
              <label
                htmlFor="fileInput"
                className="block text-gray-700 font-medium mb-0"
              >
                <AiOutlineFile className="inline text-gray-500 mr-1" /> File
                Upload
              </label>
              <input
                type="file"
                id="fileInput"
                className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleFileChange}
              />
              {selectedFile && (
                <p className="mt-2 text-sm text-gray-600">
                  Selected File:{' '}
                  <span className="font-medium text-gray-800">
                    {selectedFile.name}
                  </span>
                </p>
              )}
            </div>
            <div className="mt-0">
              <label
                htmlFor="fileInput"
                className="block text-gray-700 font-medium mb-0"
              >
                <AiOutlineFile className="inline text-gray-500 mr-1" />{' '}
                Organization Logo
              </label>
              <input
                type="file"
                id="fileInput"
                className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleFileChange}
              />
              {selectedFile && (
                <p className="mt-2 text-sm text-gray-600">
                  Selected File:{' '}
                  <span className="font-medium text-gray-800">
                    {selectedFile.name}
                  </span>
                </p>
              )}
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              className="w-full sm:w-[200px] px-5 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


const CreateTender = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [viewTenderDetails, setViewTenderDetails] = useState(null);
  const [editTender, setEditTender] = useState(null);

  const handleSearch = e => {
    setSearchTerm(e.target.value);
  };

  const filteredAdminList = adminUserList.filter(admin =>
    admin.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedAdminList = filteredAdminList.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  const handleViewTender = admin => {
    setViewTenderDetails(admin);
  };

  const handleEditTender = () => {
    setEditTender(viewTenderDetails);
    setViewTenderDetails(null); // Hide view form
  };

  const [selectedFile, setSelectedFile] = useState(null);
  // Handle file selection
  const handleFileChange = event => {
    const file = event.target.files[0];
    setSelectedFile(file); // Update state with the selected file
  };
  // Simulate file upload
  const handleFileUpload = () => {
    if (selectedFile) {
      console.log('Uploading file:', selectedFile);
      alert(`File "${selectedFile.name}" has been uploaded!`);
      setSelectedFile(null); // Clear the selected file after upload
    } else {
      alert('Please select a file to upload.');
    }
  };

  const data = [
    { label: 'Name', value: 'Imran' },
    { label: 'Earnest Money', value: '' },
    { label: 'Document Price', value: '' },
    { label: 'Published On', value: '' },
    { label: 'Opening Date', value: '' },
    { label: 'End Date', value: '' },
    { label: 'Purchase Last Date', value: '' },
    { label: 'Prebid Meeting Date', value: '' },
    { label: 'Submission Date', value: '' },
    { label: 'Tender Section', value: '' },
    { label: 'Type', value: '' },
    { label: 'Source Type', value: '' },
    { label: 'Status', value: '' },
    { label: 'Category Name', value: '' },
    { label: 'Sector Name', value: '' },
    { label: 'SubSector Name', value: '' },
    { label: 'Department Name', value: '' },
    { label: 'Sub Department Name', value: '' },
    { label: 'Division Name', value: '' },
    { label: 'District Name', value: '' },
    { label: 'Upazila Name', value: '' },
    { label: 'Source Name', value: '' },
    { label: 'Created At', value: '' },
  ];

  return (
    <div className="p-6 bg-gray-100">
      {!showCreateForm && !viewTenderDetails && !editTender && (
        <div className="mb-4 flex justify-between items-center">
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-teal-500 text-white px-7 py-3 rounded-lg flex items-center"
          >
            <AiOutlinePlus className="mr-2" />
            Create
          </button>
          <div className="flex items-center border border-gray-300 rounded p-2 w-1/2">
            <SearchOutlined className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search by Tender Name"
              value={searchTerm}
              onChange={handleSearch}
              className="w-full text-sm outline-none"
            />
          </div>
        </div>
      )}

      {showCreateForm ? (
        <CreateTenderForm onClose={() => setShowCreateForm(false)} />
      ) : viewTenderDetails ? (
        <div className="p-6 bg-gray-100 min-h-screen">
          <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Header Section */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h1 className="text-2xl font-bold text-teal-600">
                Single Tender View
              </h1>
              <div className="flex space-x-4">
                {/* Close Button */}
                <button
                  onClick={() => setViewTenderDetails(null)}
                  className="px-6 py-2 bg-red-500 text-white font-medium rounded-lg shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                >
                  Close
                </button>
                {/* Edit Button */}
                {/* <button
        onClick={handleEditTender}
        className="px-6 py-2 bg-blue-500 text-white font-medium rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        Edit Tender
      </button> */}
                {/* Update Button */}
                <button className="flex items-center px-6 py-2 bg-teal-500 text-white font-medium rounded-md shadow hover:bg-teal-600">
                  <span className="mr-2">✏️</span> Update
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-3 gap-6 p-6">
              {/* Details Section */}
              <div className="col-span-2">
                {/* <table className="table-auto w-full text-left text-sm border-separate border-spacing-y-2">
        <tbody>
          {[
            { label: "Name", value: "Imran" },
            { label: "Earnest Money", value: "" },
            { label: "Document Price", value: "" },
            { label: "Published On", value: "" },
            { label: "Opening Date", value: "" },
            { label: "End Date", value: "" },
            { label: "Purchase Last Date", value: "" },
            { label: "Prebid Meeting Date", value: "" },
            { label: "Submission Date", value: "" },
            { label: "Tender Section", value: "" },
            { label: "Type", value: "" },
            { label: "Source Type", value: "" },
            { label: "Status", value: "" },
            { label: "Category Name", value: "" },
            { label: "Sector Name", value: "" },
            { label: "SubSector Name", value: "" },
            { label: "Department Name", value: "" },
            { label: "Sub Department Name", value: "" },
            { label: "Division Name", value: "" },
            { label: "District Name", value: "" },
            { label: "Upazila Name", value: "" },
            { label: "Source Name", value: "" },
            { label: "Created At", value: "" },
          ].map((item, index) => (
            <tr key={index}>
              <td className="font-medium text-gray-700 py-2">{item.label}</td>
              <td className="py-2 text-gray-600">{item.value || "---"}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
                <div className="p-4">
                  <table className="table-auto w-full text-left text-sm border-separate border-spacing-y-2">
                    <tbody>
                      {data.map((item, index) => (
                        <tr key={index}>
                          <td className="font-medium text-gray-700 py-2">
                            {item.label}
                          </td>
                          <td className="py-2 text-gray-600">
                            {item.value || '---'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Image and Actions Section */}
              <div className="col-span-1 flex flex-col items-center">
                {/* Image Display */}
                <div className="relative w-full h-48 mb-4">
                  <img
                    src="https://via.placeholder.com/300"
                    alt="Room"
                    className="w-full h-full object-cover rounded-md"
                  />
                  <span className="absolute top-2 left-2 bg-teal-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
                    142
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 border-b text-center">ID</th>
                  <th className="p-3 border-b text-center">Name</th>
                  <th className="p-3 border-b text-center">Type</th>
                  <th className="p-3 border-b text-center">Status</th>
                  <th className="p-3 border-b text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedAdminList.map(admin => (
                  <tr key={admin.id} className="text-center">
                    <td className="p-3 border-b">{admin.id}</td>
                    <td className="p-3 border-b">{admin.name}</td>
                    <td className="p-3 border-b">{admin.email}</td>
                    <td className="p-3 border-b">{admin.status}</td>
                    <td className="p-3 border-b">
                      <button
                        className="text-blue-600"
                        onClick={() => handleViewTender(admin)}
                      >
                        <AiOutlineEye className="text-gray-600" size={24} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-center">
            <Pagination
              current={currentPage}
              total={filteredAdminList.length}
              pageSize={pageSize}
              onChange={handlePageChange}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CreateTender;

// // Form for Creating or Editing Tenders
// const CreateTenderForm = ({ onClose }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     invitationFor: '',
//     referenceNo: '',
//     tenderSection: '',
//     type: '',
//     category: '',
//     sector: '',
//     subSector: '',
//     department: '',
//     subDepartment: '',
//     division: '',
//     district: '',
//     upazila: '',
//     earnestMoney: '',
//     documentPrice: '',
//     publicOn: '',
//     openingDate: '',
//     endDate: '',
//     purchaseLastDate: '',
//     prebidMeetingDate: '',
//     submissionDate: '',
//     description: '',
//   });

  // const [selectedFile, setSelectedFile] = useState(null);

  // const handleChange = e => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  // const handleFileChange = e => {
  //   setSelectedFile(e.target.files[0]);
  // };

//   const handleSubmit = e => {
//     e.preventDefault();

//     // Validation
//     const requiredFields = [
//       'name',
//       'invitationFor',
//       'referenceNo',
//       'publicOn',
//       'openingDate',
//       'endDate',
//       'submissionDate',
//     ];
//     for (const field of requiredFields) {
//       if (!formData[field]) {
//         alert(`Please fill in the ${field} field.`);
//         return;
//       }
//     }

//     console.log('Form submitted:', { ...formData, selectedFile });

//     onClose(); // Close the form
//   };

//   return (
    // <div className="block mx-auto p-8 w-full max-w-4xl">
    //   <div className="flex justify-between items-center mb-6">
    //     <h2 className="text-2xl font-semibold">Create Tender</h2>
    //     <button
    //       onClick={onClose}
    //       className="text-gray-500 text-xl font-bold hover:text-red-500"
    //     >
    //       <AiOutlineClose />
    //     </button>
    //   </div>
    //   <div className="bg-white p-8 rounded-lg shadow-lg w-full">
    //     <form onSubmit={handleSubmit}>
    //       <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
    //         {[
    //           { label: 'Name', id: 'name', type: 'text' },
    //           { label: 'Invitation for', id: 'invitationFor', type: 'text' },
    //           { label: 'Reference No', id: 'referenceNo', type: 'text' },
    //           { label: 'Tender Section', id: 'tenderSection', type: 'text' },
    //           { label: 'Type', id: 'type', type: 'text' },
    //           { label: 'Category', id: 'category', type: 'text' },
    //           { label: 'Sector', id: 'sector', type: 'text' },
    //           { label: 'Sub Sector', id: 'subSector', type: 'text' },
    //           { label: 'Department', id: 'department', type: 'text' },
    //           { label: 'Sub Department', id: 'subDepartment', type: 'text' },
    //           { label: 'Division', id: 'division', type: 'text' },
    //           { label: 'District', id: 'district', type: 'text' },
    //           { label: 'Upazila', id: 'upazila', type: 'text' },
              // { label: 'Earnest Money', id: 'earnestMoney', type: 'text' },
              // { label: 'Document Price', id: 'documentPrice', type: 'text' },
              // { label: 'Public on', id: 'publicOn', type: 'date' },
              // { label: 'Opening Date', id: 'openingDate', type: 'date' },
              // { label: 'End Date', id: 'endDate', type: 'date' },
    //           {
    //             label: 'Purchase last date',
    //             id: 'purchaseLastDate',
    //             type: 'date',
    //           },
    //           {
    //             label: 'Prebid meeting date',
    //             id: 'prebidMeetingDate',
    //             type: 'date',
    //           },
    //           { label: 'Submission date', id: 'submissionDate', type: 'date' },
    //           { label: 'Description', id: 'description', type: 'text' },
    //         ].map(({ label, id, type }) => (
    //           <div key={id} className="w-full">
                // <label
                //   className="block text-gray-700 font-medium mb-1"
                //   htmlFor={id}
                // >
                //   {label}
                // </label>
    //             <input
    //               type={type}
    //               id={id}
    //               name={id}
                  // className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    //               placeholder={`Enter ${label}`}
    //               value={formData[id]}
    //               onChange={handleChange}
    //               required={['name', 'publicOn', 'submissionDate'].includes(id)}
    //             />
    //           </div>
    //         ))}

            // {/* File Upload */}
            // <div className="mt-6">
            //   <label
            //     htmlFor="fileInput"
            //     className="block text-gray-700 font-medium mb-2"
            //   >
            //     <AiOutlineFile className="inline text-gray-500 mr-1" /> File
            //     Upload
            //   </label>
            //   <input
            //     type="file"
            //     id="fileInput"
            //     className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            //     onChange={handleFileChange}
            //   />
            //   {selectedFile && (
            //     <p className="mt-2 text-sm text-gray-600">
            //       Selected File:{' '}
            //       <span className="font-medium text-gray-800">
            //         {selectedFile.name}
            //       </span>
            //     </p>
            //   )}
            // </div>
            // <div className="mt-6">
            //   <label
            //     htmlFor="fileInput"
            //     className="block text-gray-700 font-medium mb-2"
            //   >
            //     <AiOutlineFile className="inline text-gray-500 mr-1" />{' '}
            //     Organization Logo
            //   </label>
            //   <input
            //     type="file"
            //     id="fileInput"
            //     className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            //     onChange={handleFileChange}
            //   />
            //   {selectedFile && (
            //     <p className="mt-2 text-sm text-gray-600">
            //       Selected File:{' '}
            //       <span className="font-medium text-gray-800">
            //         {selectedFile.name}
            //       </span>
            //     </p>
            //   )}
            // </div>
    //       </div>

    //       <div className="mt-8 flex justify-center">
    //         <button
    //           type="submit"
    //           className="w-full sm:w-[200px] px-5 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    //         >
    //           Submit
    //         </button>
    //       </div>
    //     </form>
    //   </div>
    // </div>
//   );
// };
