import { AiOutlineClose } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import ApiClient from './../../../Api/ApiClient';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';



const CreateTenderForm = ({ onClose, sourceData }) => {

  const navigate = useNavigate();
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

  {/* ------------New department search by name------------------------- */ }
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [isSelected, setIsSelected] = useState(false); // Track selection state
  {/* ------------New department search by name------------------------- */ }

  {/* ------------New sub-department search by name------------------------- */ }
  const [searchQuerysubdepartment, setSearchQuerysubdepartment] = useState('');
  const [filteredDepartmentssubdepartment, setFilteredDepartmentssubdepartment] = useState([]);
  const [selectedSubdepartment, setSelectedSubdepartment] = useState('');

  {/* ------------New sub-department search by name------------------------- */ }


  {/* ------------New Category search by name------------------------- */ }
  const [searchQueryCategory, setSearchQueryCategory] = useState('');
  const [filteredCategory, setFilteredCategory] = useState([]);
  // const [selectedCategory, setSelectedCategory] = useState(null);


  {/* ------------New Category search by name------------------------- */ }

  {/* ------------New Sector search by name------------------------- */ }

  const [searchQuerySector, setSearchQuerySector] = useState(''); // Holds the current search query for sectors
  const [filteredSubdepartmentSector, setFilteredSubdepartmentSector] = useState([]); // Holds the filtered list of sectors based on the search query


  {/* ------------New Sector search by name------------------------- */ }


  {/* ------------New Sub-Sector search by name------------------------- */ }
  const [searchQuerySubSector, setSearchQuerySubSector] = useState(''); // Track the search query
  const [selectedSubSector, setSelectedSubSector] = useState(null); // Track the selected sub-sector
  const [filteredSubSector, setFilteredSubSector] = useState([]); // Store filtered sub-sectors
  const [subSectors, setSubSectors] = useState([]); // Store all sub-sectors
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuerySubSector);

  {/* ------------New Sub-Sector search by name------------------------- */ }


  const [formDataSubmit, setFormDataSubmit] = useState({
    name: '',
    invitation_for: '',
    ref_no: '',
    type: '',
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
  });
  const [fileInput, setFileInput] = useState(null);
  const [logoInput, setLogoInput] = useState(null);

  const handleInputChange = e => {
    const { name, value } = e.target;
    console.log(`Field Name: ${name}, Value: ${value}`);
    setFormDataSubmit(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
  };


  const handleFileUpload = (e, setImage) => {
    const file = e.target.files[0];
    if (file) {
      // Validating the file type (only PDF and DOC files are allowed)
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']; // MIME types for PDF, DOC, and DOCX
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
      setImage(file); // Store the actual File object
    }
  };



  const handleLogoUpload = (e, setImage) => {
    const file = e.target.files[0];
    if (file) {
      // Validating the file type (only JPG, JPEG, PNG are allowed)
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg']; // MIME types for JPG, PNG, and JPEG
      if (!allowedTypes.includes(file.type)) {
        Swal.fire({
          title: 'Error!',
          text: 'Only JPG, JPEG, and PNG files are allowed.',
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
    } else {
      Swal.fire({
        title: 'Not Accept!',
        text: 'Please upload a valid image (PNG, JPEG, or WEBP).',
        customClass: {
          popup: 'w-72 h-auto p-3',
          title: 'text-sm',
          content: 'text-xs',
          confirmButton: 'bg-headerBtn text-white px-4 py-1 text-sm rounded-md',
        },
      });

      // Clear the input to prevent uploading an invalid file
      e.target.value = null;
      return;
    }
    if (logoInput instanceof File) {
      formdata.append('company_logo', logoInput);
    }

    console.log('Before send Data:', formdata);
    console.log('Before send Data:', formDataSubmit);

    try {
      const response = await ApiClient.post('/admin/tender', formdata);
      console.log(response.data);

      const successMessage =
        response?.data?.message || 'An unknown error occurred';
      Swal.fire({
        title: 'Success!',
        text: successMessage,
        customClass: {
          popup: 'w-80 h-auto p-2',
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

  {/* ------------New Category search by name------------------------- */ }

  useEffect(() => {
    if (searchQueryCategory) {
      setFilteredCategory(
        categories.filter(category =>
          category.name.toLowerCase().includes(searchQueryCategory.toLowerCase())
        )
      );
    } else {
      setFilteredCategory([]);
    }
  }, [searchQueryCategory, categories]);

  const handleSelectCategory = (categoryId, categoryName) => {
    setSearchQueryCategory(categoryName); // Update the input with the selected category name
    setSelectedCategory({ id: categoryId, name: categoryName }); // Set the selected category
    setFilteredCategory([]); // Clear the filtered category list
  };

  const handleSearchChangeCategory = (e) => {
    setSearchQueryCategory(e.target.value); // Update the search query
    setSelectedCategory(null); // Reset the selected category when search query changes
  };



  {/* ------------New Category search by name------------------------- */ }

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

  {/* ------------New Sector search by name------------------------- */ }

  useEffect(() => {
    if (searchQuerySector) {
      setFilteredSubdepartmentSector(
        sectors.filter(sector =>
          sector.name.toLowerCase().includes(searchQuerySector.toLowerCase())
        )
      );
    } else {
      setFilteredSubdepartmentSector([]); // Clear filtered sectors when input is empty
    }
  }, [searchQuerySector, sectors]); // 'sectors' is the array containing all sector data

  const handleSelectSector = (sectorId, sectorName) => {
    setSearchQuerySector(sectorName); // Update input value to the selected sector name
    setSelectedSector({ id: sectorId, name: sectorName }); // Set the selected sector
    setFilteredSubdepartmentSector([]); // Clear the filtered sector list
  };

  const handleSearchChangeSector = (e) => {
    setSearchQuerySector(e.target.value);
    setSelectedSector(null); // Reset selected sector when search query changes
  };

  {/* ------------New Sector search by name------------------------- */ }

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


  {/* ------------New Sub-Sector search by name------------------------- */ }


  // Effect to fetch sub-sectors from the API
  useEffect(() => {
    const fetchSubSectors = async () => {
      try {
        const response = await ApiClient.get('/admin/tender-config/sub-sector');
        // console.log('Fetched Sub-Sectors:', response.data);

        // Ensure that response.data contains the expected structure and the 'data' property is an array
        if (Array.isArray(response.data.data)) {
          setSubSectors(response.data.data); // Store the fetched sub-sectors
        } else {
          console.error('Response data does not contain an array of sub-sectors:', response.data);
        }
      } catch (error) {
        console.error('Failed to fetch sub-sectors', error);
      }
    };

    fetchSubSectors();
  }, []); // Only run once on mount

  // Debounce the search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuerySubSector);
    }, 300); // 300ms debounce delay

    return () => clearTimeout(timer); // Cleanup on every search change
  }, [searchQuerySubSector]);

  // Effect to filter sub-sectors when the debounced query changes
  useEffect(() => {
    if (debouncedQuery.trim() !== '') {
      setFilteredSubSector(
        subSectors.filter(subsector =>
          subsector.name.toLowerCase().includes(debouncedQuery.toLowerCase())
        )
      );
    } else {
      setFilteredSubSector([]); // Clear filtered list if query is empty
    }
  }, [debouncedQuery, subSectors]); // Runs whenever debounced query or subSectors change

  // Handler for input change (updating search query)
  const handleSearchChangeSubSector = (e) => {
    setSearchQuerySubSector(e.target.value); // Update the search query
    setSelectedSubSector(null); // Reset selected sub-sector when search query changes
  };

  // Handler for selecting a sub-sector
  const handleSelectSubSector = (subSectorId, subSectorName) => {
    setSearchQuerySubSector(subSectorName); // Set input field to selected sub-sector name
    setSelectedSubSector({ id: subSectorId, name: subSectorName }); // Update selected sub-sector
    setFilteredSubSector([]); // Clear filtered list after selection
  };
  {/* ------------New Sub-Sector search by name------------------------- */ }

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


  // -------------New search by name department--------------

  // Update filtered departments when search query changes
  useEffect(() => {
    if (searchQuery) {
      setFilteredDepartments(
        departments.filter(department =>
          department.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredDepartments([]);
    }
  }, [searchQuery, departments]);

  const handleSelectDepartment = (departmentId, departmentName) => {
    setSearchQuery(departmentName);  // Update the input with selected department name
    setSelectedDepartment(departmentId); // Set the selected department
    setFilteredDepartments([]); // Clear the filtered department list
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setSelectedDepartment(null); // Reset selected department when search query changes
  };
  // -------------New search by name department--------------

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

  // Sub-department get api
  const fetchSubDepartments = async () => {
    try {
      // Make the API request using ApiClient (axios)
      const response = await ApiClient.get('/admin/tender-config/sub-department', {
        params: {
          key: '',  // Provide key if needed
          limit: '', // Provide limit if needed
          skip: ''   // Provide skip if needed
        }
      });

      // Log the response data
      // console.log('Sub-department data:', response.data);

    } catch (error) {
      console.error('Error fetching sub-departments:', error.response?.data || error.message);
    }
  };

  // Call the function to fetch data
  fetchSubDepartments();

  {/* ------------New Sub-department search by name------------------------- */ }

  // Handle search input change
  const handleSearchChangesubdepartment = (event) => {
    const query = event.target.value;
    setSearchQuerysubdepartment(query);

    if (query) {
      const filtered = subdepartments.filter((subdepartment) =>
        subdepartment.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredDepartmentssubdepartment(filtered);
    } else {
      setFilteredDepartmentssubdepartment([]);
    }
  };

  // Handle selecting a sub-department
  const handleSelectSubDepartment = (id, name) => {
    setSelectedSubdepartment(name);
    setSearchQuerysubdepartment(name); // Set the input field value to the selected sub-department
    setFilteredDepartmentssubdepartment([]);
  };




  {/* ------------New Sub-department search by name------------------------- */ }

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

  // ----------------------new search by division------------------

  const [searchQueryDivision, setSearchQueryDivision] = useState("");
  const [filteredDivision, setFilteredDivision] = useState([]);

  // Handle Division Search Change
  const handleSearchChangeDivision = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQueryDivision(query);
    const filtered = divisions.filter((division) =>
      division.name.toLowerCase().includes(query)
    );
    setFilteredDivision(filtered);
  };

  // Handle Division Select
  const handleSelectDivision = (id, name) => {
    setSelectedDivision({ id, name });
    setSearchQueryDivision(name);
    setFilteredDivision([]);
  };
  // ----------------------new search by division------------------

  // ----------------------new search by districts------------------
  const [searchQueryDistrict, setSearchQueryDistrict] = useState("");
  const [filteredDistrict, setFilteredDistrict] = useState([]);

  // Handle District Search Change
  const handleSearchChangeDistrict = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQueryDistrict(query);
    const filtered = districts.filter((district) =>
      district.name.toLowerCase().includes(query)
    );
    setFilteredDistrict(filtered);
  };

  // Handle District Select
  const handleSelectDistrict = (id, name) => {
    setSelectedDistrict({ id, name });
    setSearchQueryDistrict(name);
    setFilteredDistrict([]);
  };


  // ----------------------new search by districts------------------

  // ----------------------new search by Upazila------------------

  const [selectedUpazila, setSelectedUpazila] = useState(null); // State for selected Upazila
  const [searchQueryUpazila, setSearchQueryUpazila] = useState(""); // State for search query of Upazila
  const [filteredUpazila, setFilteredUpazila] = useState([]); // State for filtered Upazilas

  const [upazilas, setUpazilas] = useState([]); // State for list of Upazilas


  // Handle search query change for filtering Upazilas
  const handleSearchChangeUpazila = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQueryUpazila(query);
    const filtered = upazilas.filter((upazila) =>
      upazila.name.toLowerCase().includes(query)
    );
    setFilteredUpazila(filtered);
  };

  // Handle selecting an Upazila from the filtered list
  const handleSelectUpazila = (id, name) => {
    setSelectedUpazila({ id, name });
    setSearchQueryUpazila(name); // Set the search query to the selected Upazila
    setFilteredUpazila([]); // Clear the filtered list after selection
  };





  // ----------------------new search by Upazila------------------

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
    if (selectedDistrict && selectedDistrict.id) {
      // Find the district using the id
      const selectedDistrictData = districts.find(
        (district) => district.id === selectedDistrict.id
      );
      // Set filtered upazilas based on the selected district
      setFilteredUpazilas(selectedDistrictData?.upazilas || []);
    } else {
      // If no district is selected, clear the filtered upazilas
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



  // -------------Source New Create Api------------------



  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [sourceName, setSourceName] = useState("");


  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
    console.log("Popup visibility toggled:", isPopupVisible);
  };

  const handleSubmitSource = async (e) => {
    e.preventDefault();
    console.log("Form submitted with sourceName:", sourceName);
    console.log("Selected Source Type:", selectedSourceType);

    const payload = {
      name: sourceName,
      type: selectedSourceType,
      details: `Collected from ${selectedSourceType} on ${new Date().toLocaleDateString()}`,
    };

    console.log("Payload to be sent:", payload);

    try {
      const response = await ApiClient.post("/admin/tender-config/source", payload);
      console.log("API Response:", response);

      if (response.status === 200 || response.status === 201) {
        await Swal.fire({
          title: "Success!",
          text: "Source created successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
        setSourceName(""); // Reset the input field
        setSelectedSourceType(""); // Reset the dropdown
        togglePopup(); // Close the modal
      } else {
        Swal.fire({
          title: "Error!",
          text: response.data.message || "Something went wrong!",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    } catch (error) {
      console.error("Error during API call:", error);

      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Something went wrong!",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };






  // -------------Source New Create Api------------------


  // -------------Department New Create Api------------------
  const [isDepartmentPopupVisible, setIsDepartmentPopupVisible] = useState(false);

  // Toggle popup visibility
  const toggleDepartmentPopup = () => {
    setIsDepartmentPopupVisible(!isDepartmentPopupVisible);
  };

  const [DepartmentName, setDepartmentName] = useState('');

  // Handle form submission
  const handleSubmitDepartment = async () => {
    if (!DepartmentName.trim()) {
      console.error('Department name is required.');
      return;
    }

    const payload = { name: DepartmentName };

    try {
      console.log('Sending payload:', payload);
      const response = await ApiClient.post('/admin/tender-config/department', payload);
      console.log('Response:', response.data);

      if (response.status === 200 || response.status === 201) {
        await Swal.fire({
          title: "Success!",
          text: "Department created successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
        setDepartmentName(""); // Reset the input field
        toggleDepartmentPopup(); // Close the modal
      } else {
        Swal.fire({
          title: "Error!",
          text: response.data.message || "Something went wrong!",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    } catch (error) {
      console.error("Error during API call:", error);

      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Something went wrong!",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  // -------------Department New Create Api------------------

  // -------------Sub-Department New Create Api------------------

  const [isSubDepartmentPopupVisible, setIsSubDepartmentPopupVisible] = useState(false);
  const [SubDepartmentName, setSubDepartmentName] = useState('');


  // Toggle popup visibility
  const toggleSubDepartmentPopup = () => {
    setIsSubDepartmentPopupVisible(!isSubDepartmentPopupVisible);
  };

  // Handle form submission
  const handleSubmitSubDepartment = async () => {
    if (!SubDepartmentName.trim()) {
      // console.error('Sub-Department name is required.');
      return;
    }

    // Include department_id in the payload
    const payload = {
      name: SubDepartmentName,
      department_id: selectedDepartment // Use the selected department id
    };

    try {
      // console.log('Sending payload:', payload);

      // Sending request with the payload using the ApiClient
      const response = await ApiClient.post('/admin/tender-config/sub-department', payload);
      // console.log('Response:', response.data);

      if (response.status === 200 || response.status === 201) {
        await Swal.fire({
          title: "Success!",
          text: "Sub-Department created successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
        setSubDepartmentName(''); // Reset the input field
        toggleSubDepartmentPopup(); // Close the modal
      } else {
        Swal.fire({
          title: "Error!",
          text: response.data.message || "Something went wrong!",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    } catch (error) {
      console.error("Error during API call:", error);

      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Something went wrong!",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  // Fetch request example (using existing selectedDepartment value)
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer <YOUR_BEARER_TOKEN>");

  const raw = JSON.stringify({
    "name": SubDepartmentName,  // Using the state for SubDepartmentName
    "department_id": selectedDepartment // Using the selected department ID from state
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("http://192.168.0.230:9009/api/v1/admin/tender-config/sub-department", requestOptions)
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));



  // -------------Sub-Department New Create Api------------------


  //  --------------category New Create Api---------------
  const [categoryName, setCategoryName] = useState("");
  const [isCategoryPopupVisible, setIsCategoryPopupVisible] = useState(false);

  // Toggle the popup visibility
  const toggleCategoryPopup = () => {
    setIsCategoryPopupVisible(!isCategoryPopupVisible);
  };

  // Handle category form submission
  const handleSubmitCategory = async () => {
    if (!categoryName.trim()) {
      console.error("Category name is required.");
      return;
    }

    const name = categoryName; // Prepare payload

    try {
      const response = await ApiClient.post(
        "/admin/tender-config/category",
        { name },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer YOUR_TOKEN_HERE`, // Replace with your actual token
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        await Swal.fire({
          title: "Success!",
          text: "Category created successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
        setCategoryName(""); // Reset the input field
        toggleCategoryPopup(); // Close the popup
        // Optionally, refresh the category list or perform other actions here
      } else {
        Swal.fire({
          title: "Error!",
          text: response.data.message || "Something went wrong!",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    } catch (error) {
      console.error("Error adding category:", error);
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Something went wrong!",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  //  --------------category New Create Api-----------------

  //  --------------Sector New Create Api-----------------
  const [isSectorPopupVisible, setIsSectorPopupVisible] = useState(false);
  const [sectorName, setSectorName] = useState("");


  // Toggle Popup Visibility
  const toggleSectorPopup = () => {
    setIsSectorPopupVisible(!isSectorPopupVisible);
  };

  // Handle Sector Submission
  const handleSubmitSector = async () => {
    // console.log("Sector Name:", sectorName);
    // console.log("Selected Category:", selectedCategory);

    if (!sectorName.trim()) {
      Swal.fire({
        title: "Error",
        text: "Sector name is required!",
        icon: "error",
        confirmButtonText: "OK",
      });
      // console.error("Error: Sector name is required!");
      return;
    }

    if (!selectedCategory || typeof selectedCategory.id !== "number") {
      Swal.fire({
        title: "Error",
        text: "Please select a valid category!",
        icon: "error",
        confirmButtonText: "OK",
      });
      // console.error("Error: Invalid category selection!");
      return;
    }

    const payload = {
      name: sectorName,
      category_id: selectedCategory.id, // Use `id` from the object
    };

    // console.log("Payload to be sent:", payload);

    try {
      const response = await ApiClient.post("/admin/tender-config/sector", payload);
      // console.log("API Response:", response);

      if (response.status === 200 || response.status === 201) {
        await Swal.fire({
          title: "Success",
          text: "Sector created successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
        setSectorName("");
        toggleSectorPopup();
      } else {
        Swal.fire({
          title: "Error",
          text: response.data.message || "Something went wrong!",
          icon: "error",
          confirmButtonText: "Try Again",
        });
        // console.error("Error response from server:", response.data);
      }
    } catch (error) {
      // console.error("Error while creating sector:", error);

      const errorMessage =
        error.response?.data?.message || "Something went wrong!";
      Swal.fire({
        title: "Error",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };
  //  --------------Sector New Create Api-----------------


  //  --------------Sub-Sector New Create Api-----------------

  const [isSubSectorPopupVisible, setIsSubSectorPopupVisible] = useState(false);
  const [subSectorName, setSubSectorName] = useState("");




  // Toggle visibility of the sub-sector popup
  const toggleSubSectorPopup = () => {
    setIsSubSectorPopupVisible(!isSubSectorPopupVisible);
  };

  // Handle form submission for Sub-Sector
  const handleSubmitSubSector = async () => {
    if (!subSectorName.trim()) {
      Swal.fire({
        title: "Error",
        text: "Sub-sector name is required!",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    if (!selectedSector || !selectedSector.id) {
      Swal.fire({
        title: "Error",
        text: "Please select a valid sector!",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    const payload = {
      name: subSectorName,
      sector_id: selectedSector.id, // Use `id` from the selected sector object
    };

    try {
      // Making the API call using axios (ApiClient)
      const response = await ApiClient.post("/admin/tender-config/sub-sector", payload);

      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          title: "Success",
          text: "Sub-sector created successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
        setSubSectorName(""); // Clear input field
        toggleSubSectorPopup(); // Close the popup
      } else {
        Swal.fire({
          title: "Error",
          text: response.data.message || "Something went wrong!",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.response?.data?.message || "Something went wrong!",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };
  //  --------------Sub-Sector New Create Api-----------------

  //  --------------Division New Create Api-----------------
  const [isDivisionPopupVisible, setIsDivisionPopupVisible] = useState(false);
  const [divisionName, setDivisionName] = useState("");



  // Toggle visibility of the division popup
  const toggleDivisionPopup = () => {
    setIsDivisionPopupVisible(!isDivisionPopupVisible);
  };

  // Handle form submission for Division
  const handleSubmitDivision = async () => {
    if (!divisionName.trim()) {
      Swal.fire({
        title: "Error",
        text: "Division name is required!",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    const payload = {
      name: divisionName,
    };

    try {
      // Use ApiClient to send the POST request
      const response = await ApiClient.post('/admin/tender-config/division', payload);

      // Check if the response is successful
      Swal.fire({
        title: "Success",
        text: "Division created successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });

      setDivisionName(""); // Clear input field
      toggleDivisionPopup(); // Close the popup

    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Something went wrong!",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };
  //  --------------Division New Create Api-----------------

  //  --------------District New Create Api-----------------
  const [isDistrictPopupVisible, setIsDistrictPopupVisible] = useState(false);
  const [districtName, setDistrictName] = useState("");



  const handleDivisionChange = (event) => {
    const selectedId = parseInt(event.target.value);
    const division = divisions.find((div) => div.id === selectedId);
    setSelectedDivision(division);
  };

  // Toggle visibility of the district popup
  const toggleDistrictPopup = () => {
    setIsDistrictPopupVisible(!isDistrictPopupVisible);
  };

  // Handle form submission for District
  const handleSubmitDistrict = async () => {
    if (!districtName.trim()) {
      Swal.fire({
        title: "Error",
        text: "District name is required!",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    if (!selectedDivision || !selectedDivision.id) {
      Swal.fire({
        title: "Error",
        text: "Please select a valid division!",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    const payload = {
      name: districtName,
      division_id: selectedDivision.id,
    };

    try {
      const token = localStorage.getItem("authToken");
      const response = await ApiClient.post(
        "/admin/tender-config/district",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        await Swal.fire({
          title: "Success!",
          text: "District created successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
        setDistrictName("");
        setSelectedDivision(null); // Clear selected division
        toggleDistrictPopup();
      } else {
        Swal.fire({
          title: "Error!",
          text: response.data.message || "Something went wrong!",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    } catch (error) {
      console.error("Error occurred:", error);
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Something went wrong!",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };


  //  --------------District New Create Api-----------------

  {/* ----------------Upazilla New Create Api----------------- */ }

  const [isUpazilaPopupVisible, setIsUpazilaPopupVisible] = useState(false);
  const [upazilaName, setUpazilaName] = useState("");


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

  const toggleUpazilaPopup = () => {
    setIsUpazilaPopupVisible(!isUpazilaPopupVisible);
  };

  const handleSubmitUpazila = async () => {

    console.log("Submitting Upazila with name:", upazilaName);

    if (!upazilaName.trim()) {
      Swal.fire({
        title: "Error",
        text: "Upazila name is required!",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    if (!selectedDistrict || !selectedDistrict.id) {
      Swal.fire({
        title: "Error",
        text: "Please select a valid district!",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    const payload = {
      name: upazilaName,
      district_id: selectedDistrict.id,
    };

    console.log("Payload for Upazila:", payload);

    try {
      const response = await ApiClient.post("/admin/tender-config/upazila", payload, {
        headers: {
          Authorization: "Bearer your-token-here",
        },
      });

      console.log("API response:", response);

      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          title: "Success",
          text: "Upazila created successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
        setUpazilaName("");
        toggleUpazilaPopup();
      } else {
        Swal.fire({
          title: "Error",
          text: response.data?.message || "Something went wrong!",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    } catch (error) {
      console.error("API call failed:", error);
      Swal.fire({
        title: "Error",
        text: error.response?.data?.message || "Something went wrong!",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }

  };




  {/* ----------------Upazilla New Create Api----------------- */ }


  return (
    <div className="block mx-auto md:p-2 p-1 w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Create Tender</h2>
        <button
          // onClick={onClose}
          onClick={() => navigate('/tenderList')}
          className="text-gray-500 text-xl font-bold hover:text-red-500"
        >
          <AiOutlineClose />
        </button>
      </div>
      <div className="bg-gray-50 p-8 rounded-lg shadow-lg w-full text-xs">
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

            {/* Org/Company name */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Org/Company name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="invitation_for"
                value={formDataSubmit.invitation_for}
                onChange={handleInputChange}
                placeholder="Enter Company name"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            {/* Title */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter Tile"
                name="name" // Ensure this matches the key in formDataSubmit state
                value={formDataSubmit.name} // Must bind to state
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
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
                value={selectedSourceType}
                onChange={e => setSelectedSourceType(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>
                  Select Source Type
                </option>
                <option value="e-GP">e-GP</option>
                <option value="Newspaper">Newspaper</option>
                <option value="Online">Online</option>
                {/* <option value="Advertisement">Third Party</option> */}
                <option value="Website">Website</option>
                <option value="Manual">Manual</option>
              </select>
            </div>
            {/* Source Dropdown */}
            <div>
              <div>

                <div className="flex items-center space-x-2">
                  <label className="block text-black font-medium">
                    Source Name <span className="text-red-500">*</span>
                  </label>
                  <button
                    onClick={togglePopup}
                    className="bg-gray-200 text-black p-1 rounded-full shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  >
                    +
                  </button>
                </div>


                {isPopupVisible && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-sm relative">

                      <button
                        onClick={togglePopup}
                        className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 focus:outline-none"
                      >
                        ✕
                      </button>


                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          <span className="text-red-500">*</span> Source Name:
                        </label>
                        <input
                          type="text"
                          value={sourceName}
                          onChange={(e) => setSourceName(e.target.value)}
                          placeholder="Enter source name"
                          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          required
                        />
                      </div>


                      <button
                        onClick={handleSubmitSource}
                        className="w-full mt-4 bg-teal-500 text-white py-2 rounded-lg flex items-center justify-center hover:bg-teal-600"
                      >
                        <span className="mr-2">➤</span> Submit
                      </button>
                    </div>
                  </div>
                )}
              </div>






              <select
                name="source_id"
                value={formDataSubmit.source_id}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">
                  Select a Source
                </option>
                {filteredSources.map(source => (
                  <option key={source.id} value={source.id}>
                    {source.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Department Dropdown */}


            {/* ----------------New department search by name----------- */}
            <div>
              {/* --------------DepartMent New Create Api----------------- */}
              <div>
                <div className="flex items-center space-x-2">
                  <label className="block text-gray-700 font-medium mb-1">Department</label>
                  <button
                    onClick={toggleDepartmentPopup}
                    className="bg-gray-200 text-black p-1 rounded-full shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  >
                    +
                  </button>
                </div>

                {isDepartmentPopupVisible && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-sm relative">
                      {/* Close Button */}
                      <button
                        onClick={toggleDepartmentPopup}
                        className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 focus:outline-none"
                      >
                        ✕
                      </button>

                      {/* Department Name Input */}
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          <span className="text-red-500">*</span> Department Name:
                        </label>
                        <input
                          type="text"
                          value={DepartmentName}
                          onChange={(e) => setDepartmentName(e.target.value)}
                          placeholder="Enter Department name"
                          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          required
                        />
                      </div>

                      {/* Submit Button */}
                      <button
                        onClick={handleSubmitDepartment}
                        className="w-full mt-4 bg-teal-500 text-white py-2 rounded-lg flex items-center justify-center hover:bg-teal-600"
                      >
                        <span className="mr-2">➤</span> Submit
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* --------------DepartMent New Create Api----------------- */}
              {/* <label className="block text-gray-700 font-medium mb-1">Department</label> */}

              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search for a department"
                className="w-full p-2 border border-gray-300 rounded-lg mb-2"
              />

              {/* Show filtered departments */}
              {!selectedDepartment && searchQuery && filteredDepartments.length > 0 && (
                <ul className="border border-gray-300 rounded-lg mt-2 max-h-48 overflow-y-auto">
                  {[...new Map(filteredDepartments.map(department =>
                    [department.name, department])).values()].map(department => (
                      <li
                        key={department.id}
                        className="p-2 cursor-pointer hover:bg-gray-200"
                        onClick={() => {
                          handleSelectDepartment(department.id, department.name);
                        }}
                      >
                        {department.name}
                      </li>
                    ))}
                </ul>
              )}
            </div>
            {/* ------------New department search by name------------------------- */}



            {/* Subdepartment Dropdown */}


            {/* ------------New Sub-department search by name------------------------- */}


            <div>

              {/* --------------Sub-DepartMent New Create Api----------------- */}
              <div>
                <div className="flex items-center space-x-2">
                  <label className="block text-gray-700 font-medium mb-1">Sub-Department</label>
                  <button
                    onClick={toggleSubDepartmentPopup}
                    className="bg-gray-200 text-black p-1 rounded-full shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  >
                    +
                  </button>
                </div>

                {isSubDepartmentPopupVisible && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-sm relative">

                      <button
                        onClick={toggleSubDepartmentPopup}
                        className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 focus:outline-none"
                      >
                        ✕
                      </button>


                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          <span className="text-red-500">*</span> Sub-Department Name:
                        </label>
                        <input
                          type="text"
                          value={SubDepartmentName}
                          onChange={(e) => setSubDepartmentName(e.target.value)}
                          placeholder="Enter Sub-Department name"
                          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          required
                        />
                      </div>


                      <button
                        onClick={handleSubmitSubDepartment}
                        className="w-full mt-4 bg-teal-500 text-white py-2 rounded-lg flex items-center justify-center hover:bg-teal-600"
                      >
                        <span className="mr-2">➤</span> Submit
                      </button>
                    </div>
                  </div>
                )}
              </div>



              {/* --------------Sub-DepartMent New Create Api----------------- */}


              {/* <label className="block text-gray-700 font-medium mb-1">Sub-Department</label> */}

              <input
                type="text"
                value={searchQuerysubdepartment}
                onChange={handleSearchChangesubdepartment}
                placeholder="Search for a sub-department"
                className="w-full p-2 border border-gray-300 rounded-lg mb-2"
              />


              {!selectedSubdepartment && searchQuerysubdepartment && filteredSubdepartments.length > 0 && (
                <ul className="border border-gray-300 rounded-lg mt-2 max-h-48 overflow-y-auto">
                  {filteredSubdepartments.map((subdepartment) => (
                    <li
                      key={subdepartment.id}
                      className="p-2 cursor-pointer hover:bg-gray-200"
                      onClick={() => handleSelectSubDepartment(subdepartment.id, subdepartment.name)}
                    >
                      {subdepartment.name}
                    </li>
                  ))}
                </ul>
              )}


            </div>









            {/* ------------New Sub-department search by name------------------------- */}





            {/* Category Dropdown */}

            {/* ------------New Category search by name------------------------- */}

            <div>

              {/* ----------------Category New Create Api---------- */}
              <div>
                {/* Category Section */}
                <div className="flex items-center space-x-2">
                  <label className="block text-gray-700 font-medium mb-1">Category</label>
                  <button
                    onClick={toggleCategoryPopup}
                    className="bg-gray-200 text-black p-1 rounded-full shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  >
                    +
                  </button>
                </div>

                {/* Category Popup */}
                {isCategoryPopupVisible && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-sm relative">
                      {/* Close Button */}
                      <button
                        onClick={toggleCategoryPopup}
                        className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 focus:outline-none"
                      >
                        ✕
                      </button>

                      {/* Category Name Input */}
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          <span className="text-red-500">*</span> Category Name:
                        </label>
                        <input
                          type="text"
                          value={categoryName}
                          onChange={(e) => setCategoryName(e.target.value)}
                          placeholder="Enter Category name"
                          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          required
                        />
                      </div>

                      {/* Submit Button */}
                      <button
                        onClick={handleSubmitCategory}
                        className="w-full mt-4 bg-teal-500 text-white py-2 rounded-lg flex items-center justify-center hover:bg-teal-600"
                      >
                        <span className="mr-2">➤</span> Submit
                      </button>
                    </div>
                  </div>
                )}
              </div>
              {/* ----------------Category New Create Api---------- */}




              <input
                type="text"
                value={searchQueryCategory}
                onChange={handleSearchChangeCategory}
                placeholder="Search for a Category"
                className="w-full p-2 border border-gray-300 rounded-lg mb-2"
              />

              {/* Show filtered categories */}
              {!selectedCategory && searchQueryCategory && filteredCategory.length > 0 && (
                <ul className="border border-gray-300 rounded-lg mt-2 max-h-48 overflow-y-auto">
                  {[...new Map(filteredCategory.map(category =>
                    [category.name, category])).values()].map(category => (
                      <li
                        key={category.id}
                        className="p-2 cursor-pointer hover:bg-gray-200"
                        onClick={() => {
                          handleSelectCategory(category.id, category.name);
                        }}
                      >
                        {category.name}
                      </li>
                    ))}
                </ul>
              )}
            </div>




            {/* ------------New Category search by name------------------------- */}







            {/* Sector Dropdown */}





            {/* ------------New Sector search by name------------------------- */}

            <div>

              {/* //  --------------Sector New Create Api----------------- */}
              <div>
                {/* Sector Section */}
                <div className="flex items-center space-x-2">
                  <label className="block text-gray-700 font-medium mb-1">Sector</label>
                  <button
                    onClick={toggleSectorPopup}
                    className="bg-gray-200 text-black p-1 rounded-full shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  >
                    +
                  </button>
                </div>

                {/* Sector Popup */}
                {isSectorPopupVisible && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-sm relative">
                      <button
                        onClick={toggleSectorPopup}
                        className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 focus:outline-none"
                      >
                        ✕
                      </button>

                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          <span className="text-red-500">*</span> Sector Name:
                        </label>
                        <input
                          type="text"
                          value={sectorName}
                          onChange={(e) => setSectorName(e.target.value)}
                          placeholder="Enter Sector name"
                          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          required
                        />
                      </div>

                      <button
                        onClick={handleSubmitSector}
                        className="w-full mt-4 bg-teal-500 text-white py-2 rounded-lg flex items-center justify-center hover:bg-teal-600"
                      >
                        <span className="mr-2">➤</span> Submit
                      </button>
                    </div>
                  </div>
                )}
              </div>


              {/* //  --------------Sector New Create Api----------------- */}




              <input
                type="text"
                value={searchQuerySector}
                onChange={handleSearchChangeSector}
                placeholder="Search for a Sector"
                className="w-full p-2 border border-gray-300 rounded-lg mb-2"
              />

              {/* Show filtered sectors based on the search query */}
              {!selectedSector && searchQuerySector && filteredSubdepartmentSector.length > 0 && (
                <ul className="border border-gray-300 rounded-lg mt-2 max-h-48 overflow-y-auto">
                  {[...new Map(filteredSubdepartmentSector.map(sector =>
                    [sector.name, sector])).values()].map(Sector => (
                      <li
                        key={Sector.id}
                        className="p-2 cursor-pointer hover:bg-gray-200"
                        onClick={() => handleSelectSector(Sector.id, Sector.name)}
                      >
                        {Sector.name}
                      </li>
                    ))}
                </ul>
              )}
            </div>

            {/* ------------New Sector search by name------------------------- */}




            {/* Subsector Dropdown */}



            {/* ------------New Sub-Sector search by name------------------------- */}
            <div>
              {/* ----------------Sub-Sector New Create Api----------------- */}
              <div>
                {/* Sub-Sector Section */}
                <div className="flex items-center space-x-2">
                  <label className="block text-gray-700 font-medium mb-1">Sub-Sector</label>
                  <button
                    onClick={toggleSubSectorPopup}
                    className="bg-gray-200 text-black p-1 rounded-full shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  >
                    +
                  </button>
                </div>

                {/* Sub-Sector Popup */}
                {isSubSectorPopupVisible && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-sm relative">
                      <button
                        onClick={toggleSubSectorPopup}
                        className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 focus:outline-none"
                      >
                        ✕
                      </button>

                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          <span className="text-red-500">*</span> Sub-Sector Name:
                        </label>
                        <input
                          type="text"
                          value={subSectorName}
                          onChange={(e) => setSubSectorName(e.target.value)}
                          placeholder="Enter Sub-Sector name"
                          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          required
                        />
                      </div>



                      {/* Submit Button */}
                      <button
                        onClick={handleSubmitSubSector}
                        className="w-full mt-4 bg-teal-500 text-white py-2 rounded-lg flex items-center justify-center hover:bg-teal-600"
                      >
                        <span className="mr-2">➤</span> Submit Sub-Sector
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* ----------------Sub-Sector New Create Api----------------- */}


              {/* Input field for searching Sub-Sector */}
              <input
                type="text"
                value={searchQuerySubSector}
                onChange={handleSearchChangeSubSector}
                placeholder="Search for a Sub-Sector"
                className="w-full p-2 border border-gray-300 rounded-lg mb-2"
              />

              {/* Display filtered sub-sectors */}
              {!selectedSubSector && searchQuerySubSector && filteredSubSector.length > 0 && (
                <ul className="border border-gray-300 rounded-lg mt-2 max-h-48 overflow-y-auto">
                  {[...new Map(filteredSubSector.map(subsector => [subsector.name, subsector])).values()].map(subsector => (
                    <li
                      key={subsector.id}
                      className="p-2 cursor-pointer hover:bg-gray-200"
                      onClick={() => handleSelectSubSector(subsector.id, subsector.name)}
                    >
                      {subsector.name}
                    </li>
                  ))}
                </ul>
              )}


            </div>

            {/* ------------New Sub-Sector search by name------------------------- */}



            {/* Division Dropdown */}


            <div>
              {/* Division Section */}
              <div className="flex items-center space-x-2">
                <label className="block text-gray-700 font-medium mb-1">Division</label>
                <button
                  onClick={toggleDivisionPopup}
                  className="bg-gray-200 text-black p-1 rounded-full shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  +
                </button>
              </div>

              {/* Division Popup */}
              {isDivisionPopupVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-sm relative">
                    <button
                      onClick={toggleDivisionPopup}
                      className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 focus:outline-none"
                    >
                      ✕
                    </button>

                    {/* Division Name Input */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        <span className="text-red-500">*</span> Division Name:
                      </label>
                      <input
                        type="text"
                        value={divisionName}
                        onChange={(e) => setDivisionName(e.target.value)}
                        placeholder="Enter Division name"
                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      onClick={handleSubmitDivision}
                      className="w-full mt-4 bg-teal-500 text-white py-2 rounded-lg flex items-center justify-center hover:bg-teal-600"
                    >
                      Submit Division
                    </button>
                  </div>
                </div>
              )}

              {/* Search for a Division */}
              <input
                type="text"
                value={searchQueryDivision}
                onChange={handleSearchChangeDivision}
                placeholder="Search for a Division"
                className="w-full p-2 border border-gray-300 rounded-lg"
              />

              {/* Show filtered divisions */}
              {!selectedDivision && searchQueryDivision && filteredDivision.length > 0 && (
                <ul className="border border-gray-300 rounded-lg mt-2 max-h-48 overflow-y-auto">
                  {filteredDivision.map((division) => (
                    <li
                      key={division.id}
                      className="p-2 cursor-pointer hover:bg-gray-200"
                      onClick={() => handleSelectDivision(division.id, division.name)}
                    >
                      {division.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>




            {/* District Dropdown */}


            <div>
              {/* District Section */}
              <div className="flex items-center space-x-2">
                <label className="block text-gray-700 font-medium mb-1">District</label>
                <button
                  onClick={toggleDistrictPopup}
                  className="bg-gray-200 text-black p-1 rounded-full shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  +
                </button>
              </div>

              {/* District Popup */}
              {isDistrictPopupVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-sm relative">
                    <button
                      onClick={toggleDistrictPopup}
                      className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 focus:outline-none"
                    >
                      ✕
                    </button>

                    {/* District Name Input */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        <span className="text-red-500">*</span> District Name:
                      </label>
                      <input
                        type="text"
                        value={districtName}
                        onChange={(e) => setDistrictName(e.target.value)}
                        placeholder="Enter District name"
                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      onClick={handleSubmitDistrict}
                      className="w-full mt-4 bg-teal-500 text-white py-2 rounded-lg flex items-center justify-center hover:bg-teal-600"
                    >
                      Submit District
                    </button>
                  </div>
                </div>
              )}

              {/* Search for a District */}
              <input
                type="text"
                value={searchQueryDistrict}
                onChange={handleSearchChangeDistrict}
                placeholder="Search for a District"
                className="w-full p-2 border border-gray-300 rounded-lg"
              />

              {/* Show filtered districts */}
              {!selectedDistrict && searchQueryDistrict && filteredDistrict.length > 0 && (
                <ul className="border border-gray-300 rounded-lg mt-2 max-h-48 overflow-y-auto">
                  {filteredDistrict.map((district) => (
                    <li
                      key={district.id}
                      className="p-2 cursor-pointer hover:bg-gray-200"
                      onClick={() => handleSelectDistrict(district.id, district.name)}
                    >
                      {district.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>



            {/* Upazila Dropdown */}



            <div>

              <div>
                <div className="flex items-center space-x-2">
                  <label className="block text-gray-700 font-medium mb-1">Upazila</label>
                  <button
                    onClick={toggleUpazilaPopup}
                    className="bg-gray-200 text-black p-1 rounded-full shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  >
                    +
                  </button>
                </div>


                {isUpazilaPopupVisible && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-sm relative">
                      {/* Close Button */}
                      <button
                        onClick={toggleUpazilaPopup}
                        className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 focus:outline-none"
                      >
                        ✕
                      </button>


                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          <span className="text-red-500">*</span> Upazila Name:
                        </label>
                        <input
                          type="text"
                          value={upazilaName}
                          onChange={(e) => setUpazilaName(e.target.value)}
                          placeholder="Enter Upazila name"
                          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          required
                        />
                      </div>





                      <button
                        onClick={handleSubmitUpazila}
                        className="w-full mt-4 bg-teal-500 text-white py-2 rounded-lg flex items-center justify-center hover:bg-teal-600"
                      >
                        Submit Upazila
                      </button>
                    </div>
                  </div>
                )}
              </div>


              <input
                type="text"
                value={searchQueryUpazila}
                onChange={handleSearchChangeUpazila}
                placeholder="Search for an Upazila"
                className="w-full p-2 border border-gray-300 rounded-lg "
              />


              {!selectedUpazila && searchQueryUpazila && filteredUpazilas.length > 0 && (
                <ul className="border border-gray-300 rounded-lg mt-2 max-h-48 overflow-y-auto">
                  {[...new Map(filteredUpazilas.map(upazila => [upazila.name, upazila])).values()].map((upazila) => (
                    <li
                      key={upazila.id}
                      className="p-2 cursor-pointer hover:bg-gray-200"
                      onClick={() => handleSelectUpazila(upazila.id, upazila.name)}
                    >
                      {upazila.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/*  Publish on*/}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Publish Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
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
            {/*  End Date*/}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                End Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="end_date"
                value={formDataSubmit.end_date}
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


            <div>
              <label className="block text-gray-700 font-medium mb-1">
                File Upload <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                onChange={e => handleFileUpload(e, setFileInput)}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>

            {/* Logo Upload */}


            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Organization Logo
              </label>
              <input
                type="file"
                onChange={e => handleLogoUpload(e, setLogoInput)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            {/* Description */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Description
              </label>
              <textarea
                type="text"
                placeholder="Enter name"
                name="description" // Ensure this matches the key in formDataSubmit state
                value={formDataSubmit.description} // Must bind to state
                onChange={handleInputChange}
                className="w-full p-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
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
export default CreateTenderForm;
