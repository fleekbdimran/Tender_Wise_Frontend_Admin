import { AiOutlineClose } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import ApiClient from './../../../Api/ApiClient';
import Swal from 'sweetalert2';
import tenderDetailsFormImage from '../../../assets/images/tenderDetailsFormImage.png';
import { useNavigate, useParams } from 'react-router-dom';

const TenderDetails = ({ onClose }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [fileInput, setFileInput] = useState(null);
  const [logoInput, setLogoInput] = useState(null);
  const [logo, setLogo] = useState(null);
  const [orgName, setOrgName] = useState('');
  const [tenderName, setTenderName] = useState('');

  const [formDataSubmit, setFormDataSubmit] = useState({
    id: '',
    tender_id: '',
    name: '',
    sector_name:'',
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
    source_type: '',
    org_company_name: '',
    reference_number: '',
    category_id: '',
    category_name: '',
    sector_id: '',
    sub_sector_id: '',
    sub_sector_name: '',
    department_id: '',
    department_name: '',
    sub_department_id: '',
    sub_department_name: '',
    division_id: '',
    division_name: '',
    district_id: '',
    district_name: '',
    upazila_id: '',
    upazila_name: '',
    source_id: '',
    source_name: '',
    created_at: '',
    description: '',
  });

  const [categories, setCategories] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [sources, setSources] = useState([]);

  const [filteredSectors, setFilteredSectors] = useState([]);
  const [filteredSubsectors, setFilteredSubsectors] = useState([]);
  const [filteredSubdepartments, setFilteredSubdepartments] = useState([]);
  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedSector, setSelectedSector] = useState('');
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedSourceType, setSelectedSourceType] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Tender details for editing
        const tenderResponse = await ApiClient.get(`/admin/tender/${id}`);
        const tenderData = tenderResponse.data.data;
        setOrgName(tenderData.org_company_name);
        setTenderName(tenderData.name);
        setLogo(tenderData.company_logo);
        setFormDataSubmit(prevState => ({ ...prevState, ...tenderData }));

        // Fetching Categories, Sectors, Departments, Divisions, and Districts
        const [
          categoriesResponse,
          sectorsResponse,
          departmentsResponse,
          divisionsResponse,
          districtsResponse,
          sourcesResponse,
        ] = await Promise.all([
          ApiClient.get('/admin/tender-config/category'),
          ApiClient.get('/admin/tender-config/sector'),
          ApiClient.get('/admin/tender-config/department'),
          ApiClient.get('/admin/tender-config/division'),
          ApiClient.get('/admin/tender-config/district'),
          ApiClient.get('/admin/tender-config/source'),
        ]);

        if (categoriesResponse.data.success)
          setCategories(categoriesResponse.data.data);
        if (sectorsResponse.data.success) setSectors(sectorsResponse.data.data);
        if (departmentsResponse.data.success)
          setDepartments(departmentsResponse.data.data);
        if (divisionsResponse.data.success)
          setDivisions(divisionsResponse.data.data);
        if (districtsResponse.data.success)
          setDistricts(districtsResponse.data.data);
        if (sourcesResponse.data.success) setSources(sourcesResponse.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  // const handleInputChange = e => {
  //   const { name, value } = e.target;
  //   setFormDataSubmit(prevDetails => ({ ...prevDetails, [name]: value }));
  // };
  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormDataSubmit(prevData => ({
      ...prevData,
      [name]: value, // This ensures that each input field updates the formDataSubmit state
    }));
  };


  const handleFileUpload = (e, setImage) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const updateData = new FormData();

    // Append form data fields
    Object.keys(formDataSubmit).forEach(key => {
      if (formDataSubmit[key]) updateData.append(key, formDataSubmit[key]);
    });

    // File uploads
    if (fileInput instanceof File) updateData.append('file_upload', fileInput);
    if (logoInput instanceof File) updateData.append('company_logo', logoInput);

    try {
      const response = await ApiClient.patch(
        `/admin/tender/${id}/`,
        updateData
      );
      Swal.fire({
        title: 'Success!',
        text: response.data.message,
        icon: 'success',
      });
      navigate('/tenderList');
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || 'Failed to update tender.',
        icon: 'error',
      });
      console.error('Error:', error);
    }
  };

  // Filters for selecting categories, sectors, etc.
  useEffect(() => {
    if (selectedCategory) {
      const filtered = sectors.filter(
        sector => sector.category_id === parseInt(selectedCategory)
      );
      setFilteredSectors(filtered);
    }
  }, [selectedCategory, sectors]);

  useEffect(() => {
    if (selectedSector) {
      const selectedSectorData = sectors.find(
        sector => sector.id === parseInt(selectedSector)
      );
      setFilteredSubsectors(selectedSectorData?.sub_sectors || []);
    }
  }, [selectedSector, sectors]);

  useEffect(() => {
    if (selectedDepartment) {
      const selectedDepartmentData = departments.find(
        department => department.id === parseInt(selectedDepartment)
      );
      setFilteredSubdepartments(selectedDepartmentData?.sub_departments || []);
    }
  }, [selectedDepartment, departments]);

  useEffect(() => {
    if (selectedDivision) {
      const selectedDivisionData = divisions.find(
        division => division.id === parseInt(selectedDivision)
      );
      setFilteredDistricts(selectedDivisionData?.districts || []);
    }
  }, [selectedDivision, divisions]);

  useEffect(() => {
    if (selectedDistrict) {
      const selectedDistrictData = districts.find(
        district => district.id === parseInt(selectedDistrict)
      );
      setFilteredUpazilas(selectedDistrictData?.upazilas || []);
    }
  }, [selectedDistrict, districts]);

  const handleClose = () => navigate('/tenderList');

  return (
    <div className="block mx-auto md:p-2 p-1 w-full">
      {/* <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Tender Details View</h2>
        <button
          // onClick={onClose}
          onClick={handleClose}
          className="text-gray-500 text-xl font-bold hover:text-red-500"
        >
          <AiOutlineClose />
        </button>
      </div> */}
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

        <div className="p-8 w-full text-xs">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 2xl:gap-x-28 gap-x-16 2xl:gap-y-5 gap-y-4">
              {/* Reference Number */}
              <div className="flex items-center space-x-4">
                <label className="block text-sm font-medium text-gray-700 w-1/3">
                  Reference No:
                </label>
                <input
                  type="text"
                  name="reference_number"
                  value={formDataSubmit.reference_number}
                  onChange={handleInputChange}
                  placeholder="Enter Reference No"
                  className="flex-1 p-2 border-2 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 text-xs"
                />
              </div>

              {/* Title */}
              <div className="flex items-center space-x-4">
                <label className="block text-sm font-medium text-gray-700 w-1/3">
                  Title:
                </label>
                <input
                  type="text"
                  name="name"
                  value={formDataSubmit.name}
                  onChange={handleInputChange}
                  placeholder="Enter name"
                  className="flex-1 p-2 border-2 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 text-xs"
                />
              </div>

              {/* Invitation for */}
              <div className="flex items-center space-x-4">
                <label className="block text-sm font-medium text-gray-700 w-1/3">
                  Org/Company name:
                </label>
                <input
                  type="text"
                  name="org_company_name"
                  value={formDataSubmit.org_company_name}
                  onChange={handleInputChange}
                  placeholder="Enter invitation for"
                  className="flex-1 p-2 border-2 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 text-xs"
                />
              </div>

              {/* Tender Section */}
              <div className="flex items-center space-x-4">
                <label className="block text-sm font-medium text-gray-700 w-1/3">
                  Tender Section <span className="text-red-500">*</span>
                </label>
                <select
                  name="tender_section"
                  value={formDataSubmit.tender_section}
                  onChange={handleInputChange}
                  className="flex-1 p-2 border-2 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 text-xs"
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

              {/* Tender Type */}
              <div className="flex items-center space-x-4">
                <label className="block text-sm font-medium text-gray-700 w-1/3">
                  Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="type"
                  value={formDataSubmit.type}
                  onChange={handleInputChange}
                  className="flex-1 p-2 border-2 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 text-xs"
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

              {/* Category */}
              <div className="flex items-center space-x-4">
                <label className="block text-sm font-medium text-gray-700 w-1/3">
                  Category:
                </label>
                <select
                  value={formDataSubmit.category_id}
                  onChange={e => handleInputChange(e)} // Update formDataSubmit directly
                  className="flex-1 p-2 border-2 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 text-xs"
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

              {/* Sector */}
              <div className="flex items-center space-x-4">
                <label className="block text-sm font-medium text-gray-700 w-1/3">
                  Sector:
                </label>
                <select
                  name="sector_id" // Ensure you're using the correct name here (sector_id)
                  value={formDataSubmit.sector_id || ''} // Ensure it's matching formDataSubmit
                  onChange={handleInputChange} // Update formDataSubmit directly
                  className="flex-1 p-2 border-2 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 text-xs"
                >
                  <option value="" disabled>
                    Select a Sector
                  </option>
                  {filteredSectors.map(sector => (
                    <option key={sector.id} value={sector.id}>
                      {' '}
                      {/* Use sector.id for value */}
                      {sector.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subsector */}
              <div className="flex items-center space-x-4">
                <label className="block text-sm font-medium text-gray-700 w-1/3">
                  Subsector:
                </label>
                <select
                  name="sub_sector_id"
                  value={formDataSubmit.sub_sector_id}
                  onChange={handleInputChange}
                  className="flex-1 p-2 border-2 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 text-xs"
                >
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

              {/* Department */}
              <div className="flex items-center space-x-4">
                <label className="block text-sm font-medium text-gray-700 w-1/3">
                  Department:
                </label>
                <select
                  value={formDataSubmit.department_id}
                  onChange={e => setSelectedDepartment(e.target.value)}
                  className="flex-1 p-2 border-2 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 text-xs"
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

              {/* Subdepartment */}
              <div className="flex items-center space-x-4">
                <label className="block text-sm font-medium text-gray-700 w-1/3">
                  Subdepartment:
                </label>
                <select
                  name="sub_department_id"
                  value={formDataSubmit.sub_department_id}
                  onChange={handleInputChange}
                  className="flex-1 p-2 border-2 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 text-xs"
                >
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

              {/* Division */}
              <div className="flex items-center space-x-4">
                <label className="block text-sm font-medium text-gray-700 w-1/3">
                  Division <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedDivision}
                  onChange={e => setSelectedDivision(e.target.value)}
                  className="flex-1 p-2 border-2 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 text-xs"
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

              {/* District */}
              <div className="flex items-center space-x-4">
                <label className="block text-sm font-medium text-gray-700 w-1/3">
                  District <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedDistrict}
                  onChange={e => setSelectedDistrict(e.target.value)}
                  className="flex-1 p-2 border-2 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 text-xs"
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

              {/* Upazila */}
              <div className="flex items-center space-x-4">
                <label className="block text-sm font-medium text-gray-700 w-1/3">
                  Upazila <span className="text-red-500">*</span>
                </label>
                <select
                  value={formDataSubmit.upazila_id}
                  onChange={handleInputChange}
                  name="upazila_id"
                  className="flex-1 p-2 border-2 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 text-xs"
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

              {/* Description */}
              <div className="flex items-center space-x-4">
                <label className="block text-sm font-medium text-gray-700 w-1/3">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formDataSubmit.description}
                  onChange={handleInputChange}
                  placeholder="Enter description"
                  className="flex-1 p-2 border-2 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 text-xs"
                  rows="3"
                  required
                />
              </div>

              {/* File Upload */}
              <div className="flex items-center space-x-4">
                <label className="block text-sm font-medium text-gray-700 w-1/3">
                  File Upload:
                </label>
                <input
                  type="file"
                  onChange={e => handleFileUpload(e, setFileInput)}
                  className="flex-1 p-2 border-2 rounded-md shadow-sm text-xs"
                />
              </div>
            </div>

            {/* Submit and Back Buttons */}
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
    </div>
  );
};
export default TenderDetails;