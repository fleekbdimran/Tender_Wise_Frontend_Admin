import { AiOutlineClose } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import ApiClient from './../../../Api/ApiClient';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const CreateTenderForm = ({ onClose }) => {
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

  // const handleFileUpload = (e, setImage) => {
  //   const file = e.target.files[0];
  //   const { name } = e.target;

  //   if (file) {
  //     // Set the actual file object
  //     setImage(file);

  //     // Validate the file type if the input name is 'tender_file'
  //     if (name === 'tender_file') {
  //       if (file.type !== 'application/pdf') {
  //         // Show an error message for invalid file type
  //         Swal.fire({
  //           title: 'Not Accept!',
  //           text: 'Please upload a valid PDF file.',
  //           customClass: {
  //             popup: 'w-72 h-auto p-3',
  //             title: 'text-sm',
  //             content: 'text-xs',
  //             confirmButton:
  //               'bg-headerBtn text-white px-4 py-1 text-sm rounded-md',
  //           },
  //         });

  //         // Update errors state
  //         // setErrors(prevErrors => ({
  //         //   ...prevErrors,
  //         //   tender_file: 'Please upload a valid PDF file.',
  //         // }));

  //         // Clear the input to prevent uploading an invalid file
  //         e.target.value = null;
  //         return;
  //       } else {
  //         // Clear any existing errors if the file is valid
  //         // setErrors(prevErrors => ({
  //         //   ...prevErrors,
  //         //   tender_file: '',
  //         // }));
  //       }
  //     }
  //   }
  // };

  // const handleLogoUpload = (e, setImage) => {
  //   const file = e.target.files[0];
  //   const { name } = e.target;

  //   if (file) {
  //     // Store the actual file object
  //     setImage(file);

  //     // Validate the file type if the input name is 'company_logo'
  //     if (
  //       name === 'company_logo' &&
  //       !['image/png', 'image/jpeg', 'image/webp'].includes(file.type)
  //     ) {
  //       // Show error message for invalid file type
  //       Swal.fire({
  //         title: 'Not Accept!',
  //         text: 'Please upload a valid image (PNG, JPEG, or WEBP).',
  //         customClass: {
  //           popup: 'w-72 h-auto p-3',
  //           title: 'text-sm',
  //           content: 'text-xs',
  //           confirmButton:
  //             'bg-headerBtn text-white px-4 py-1 text-sm rounded-md',
  //         },
  //       });

  //       // Clear the input to prevent uploading an invalid file
  //       e.target.value = null;
  //       return;
  //     }


  //   }
  // };



  // const handleFileUpload = (e, setImage) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setImage(file); // Store the actual File object
  //   }
  // };

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

  // const handleLogoUpload = (e, setImage) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setImage(file); // Store the actual File object
  //   }
  // };

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


  // Category Plus icon add with 
  const [isAdding, setIsAdding] = useState(false);
  const [newCategory, setNewCategory] = useState("");



  const handleAddCategory = async () => {
    if (newCategory.trim()) {
      try {
        console.log("Adding category:", newCategory.trim());

        // API call to add category to the backend
        const response = await ApiClient.post(
          "/admin/tender-config/category",
          { name: newCategory.trim() },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer YOUR_TOKEN_HERE`,
            },
          }
        );

        // console.log("API response:", response);

        // Assuming the response contains the created category object
        const newCategoryObject = { id: response.data.id, name: newCategory.trim() };

        // console.log("New category object:", newCategoryObject);

        // Update local state with the new category
        setSelectedCategory([...categories, newCategoryObject]);

        // Clear the input and hide the form
        setNewCategory("");
        setIsAdding(false);

        // console.log("Category added successfully!");

      } catch (error) {
        // console.error("Error adding category:", error);
      }
    } else {
      // console.log("Category name is empty, cannot add.");
    }
  };



  // Sector Plus icon add

  const [isAddingSector, setIsAddingSector] = useState(false);
  const [newSector, setNewSector] = useState("");

  // Handle adding a new sector
  const handleAddSector = () => {
    if (newSector.trim()) {
      const newSectorObject = { id: filteredSectors.length + 1, name: newSector.trim() };
      setFilteredSectors([...filteredSectors, newSectorObject]); // Add the new sector to the list
      setNewSector(""); // Clear the input
      setIsAddingSector(false); // Hide the input field after adding
    }
  };

  // Sub-Sector Plus icon add

  const [isAddingSubSector, setIsAddingSubSector] = useState(false);
  const [newSubSector, setNewSubSector] = useState("");

  // Handle adding a new Sub-Sector
  const handleAddSubSector = () => {
    if (newSubSector.trim()) {
      const newSubSectorObject = { id: filteredSubsectors.length + 1, name: newSubSector.trim() };
      setFilteredSubsectors([...filteredSubsectors, newSubSectorObject]); // Add new Sub-Sector to the list
      setNewSubSector(""); // Clear input field
      setIsAddingSubSector(false); // Hide input field after adding
    }
  };

  // Department Plus icon with api
  const [isAddingDepartment, setIsAddingDepartment] = useState(false);
  const [newDepartment, setNewDepartment] = useState("");


  // Function to handle adding a new department with API integration
  const handleAddDepartment = async (name) => {
    try {
      const response = await ApiClient.post(
        "/admin/tender-config/department",
        { name },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer YOUR_TOKEN_HERE`,
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        await Swal.fire({
          title: "Success!",
          text: "Department created successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
        setIsAddingDepartment(false); // Close the input form
        setDepartments([...departments, { id: response.data.id, name }]); // Add the new department to the list
      } else {
        Swal.fire({
          title: "Error!",
          text: response.data.message || "Something went wrong!",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    } catch (error) {
      console.error("Error adding Department:", error);
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Something went wrong!",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };


  // SubDepartment + icon
  // const [selectedDepartment, setSelectedDepartment] = useState('');
  const [newSubDepartment, setNewSubDepartment] = useState('');
  const [subDepartments, setSubDepartments] = useState([]); // Sub-department array
  const [isAddingSubDepartment, setIsAddingSubDepartment] = useState(false);
  // const [formDataSubmit, setFormDataSubmit] = useState({ sub_department_id: '' }); // Form data for sub-department

  // Function to create sub-department via API
  const createSubDepartment = async (name, departmentId) => {
    try {
      const response = await ApiClient.post('/admin/tender-config/sub-department', {
        name,
        department_id: departmentId,
      });
      console.log('API Response:', response.data); // Handle the successful response
      // Update the subDepartments list with the newly created sub-department
      setSubDepartments([...subDepartments, response.data]);
    } catch (error) {
      console.error('Error creating sub-department:', error.response?.data || error.message);
    }
  };

  // Function to handle adding a new sub-department
  const handleAddSubDepartment = () => {
    if (newSubDepartment.trim()) {
      const newSubDepartmentObject = {
        id: subDepartments.length + 1,
        name: newSubDepartment.trim(),
        department_id: selectedDepartment, // Associate with selected department
      };
      setSubDepartments([...subDepartments, newSubDepartmentObject]); // Add new sub-department to the list
      setNewSubDepartment(''); // Clear input field
      setIsAddingSubDepartment(false); // Hide input field after adding

      // Optionally, you can call the API to save it
      createSubDepartment(newSubDepartment, selectedDepartment);
    }
  };


  // Division Plus icon
  const [isAddingDivision, setIsAddingDivision] = useState(false);
  const [newDivision, setNewDivision] = useState("");

  const handleAddDivision = async () => {
    if (newDivision.trim()) {
      try {
        console.log("Adding division:", newDivision.trim());

        // API call to add division to the backend
        const response = await ApiClient.post(
          "/admin/tender-config/division",
          { name: newDivision.trim() },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer YOUR_TOKEN_HERE`,
            },
          }
        );

        console.log("API response:", response);

        // Assuming the response contains the created division object
        const newDivisionObject = { id: response.data.id, name: newDivision.trim() };

        console.log("New division object:", newDivisionObject);

        // Update local state with the new division
        setDivisions([...divisions, newDivisionObject]);

        // Clear the input and hide the form
        setNewDivision("");
        setIsAddingDivision(false);

        console.log("Division added successfully!");

      } catch (error) {
        console.error("Error adding division:", error);
        // Optionally handle error (e.g., show an error message)
      }
    } else {
      console.log("Division name is empty, cannot add.");
    }
  };

  // District plus icon add
  const [isAddingDistrict, setIsAddingDistrict] = useState(false);
  const [newDistrict, setNewDistrict] = useState("");

  // Handle adding a new District
  const handleAddDistrict = () => {
    if (newDistrict.trim()) {
      const newDistrictObject = { id: districts.length + 1, name: newDistrict.trim() };
      setDistricts([...districts, newDistrictObject]); // Add new district to the list
      setNewDistrict(""); // Clear input field
      setIsAddingDistrict(false); // Hide input field after adding
    }
  };
  // Upazilla plus add icon
  const [isAddingUpazila, setIsAddingUpazila] = useState(false);
  const [newUpazila, setNewUpazila] = useState("");

  // Handle adding a new Upazila
  const handleAddUpazila = () => {
    if (newUpazila.trim()) {
      const newUpazilaObject = { id: upazilas.length + 1, name: newUpazila.trim() };
      setUpazilas([...upazilas, newUpazilaObject]); // Add new upazila to the list
      setNewUpazila(""); // Clear input field
      setIsAddingUpazila(false); // Hide input field after adding
    }
  };





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
                <option value="Advertisement">Third Party</option>
                <option value="Website">Website</option>
                <option value="Manual">Manual</option>
              </select>
            </div>
            {/* Source Dropdown */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Source Name <span className="text-red-500">*</span>
              </label>
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
            {/* <div>
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
            </div> */}

            <div className="mb-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <label className="block text-gray-700 font-medium mb-1">Department</label>
                  {/* Add the "+" icon next to the department label */}
                  <button
                    onClick={() => setIsAddingDepartment(!isAddingDepartment)} // Toggle the "Add new department" form
                    className="p-1 w-6 h-6 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none text-center"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Dropdown to select a department */}
              <div className="flex items-center space-x-2">
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)} // Set selected department
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a Department</option>
                  {departments.map((department) => (
                    <option key={department.id} value={department.id}>
                      {department.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Input field to add a new department */}
              {isAddingDepartment && (
                <div className="mt-2 flex space-x-2">
                  <input
                    type="text"
                    value={newDepartment}
                    onChange={(e) => setNewDepartment(e.target.value)} // Update new department name
                    placeholder="New department name"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => handleAddDepartment(newDepartment)} // Pass the newDepartment value to the function
                    className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none"
                  >
                    Submit
                  </button>
                </div>
              )}
            </div>



            {/* Subdepartment Dropdown */}
            {/* <div>
              <label className="block text-gray-700 font-medium mb-1">
                Sub-Department
              </label>
              <select
                name="sub_department_id"
                value={formDataSubmit.sub_department_id}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">
                  Select a Sub-department
                </option>
                {filteredSubdepartments.map(subdepartment => (
                  <option key={subdepartment.id} value={subdepartment.id}>
                    {subdepartment.name}
                  </option>
                ))}
              </select>
            </div> */}
            

            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <label className="block text-gray-700 font-medium mb-1">Sub-Department</label>
                  {/* Add the "+" icon next to the sub-department label */}
                  <button
                    onClick={() => setIsAddingSubDepartment(!isAddingSubDepartment)} // Toggle the "Add new sub-department" form
                    className="p-1 w-6 h-6 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none text-center"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Dropdown to select a sub-department */}
              <div className="flex items-center space-x-2">
                <select
                  name="sub_department_id"
                  value={formDataSubmit.sub_department_id}
                  onChange={(e) =>
                    setFormDataSubmit({
                      ...formDataSubmit,
                      sub_department_id: e.target.value,
                    })
                  } // Set selected sub-department
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a Sub-department</option>
                  {subDepartments
                    .filter((subDept) => subDept.department_id === selectedDepartment) // Filter by selected department
                    .map((subdepartment) => (
                      <option key={subdepartment.id} value={subdepartment.id}>
                        {subdepartment.name}
                      </option>
                    ))}
                </select>
              </div>

              {/* Input field to add a new sub-department */}
              {isAddingSubDepartment && (
                <div className="mt-2 flex space-x-2">
                  <input
                    type="text"
                    value={newSubDepartment}
                    onChange={(e) => setNewSubDepartment(e.target.value)} // Update new sub-department name
                    placeholder="New sub-department name"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleAddSubDepartment} // Handle adding the new sub-department
                    className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none"
                  >
                    Submit
                  </button>
                </div>
              )}


            </div>


            {/* Category Dropdown */}
            {/* 1st er ta */}
            {/* <div>
              <label className="block text-gray-700 font-medium mb-1">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">
                  Select a Category
                </option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div> */}



            {/* 3rd ta */}

            <div className="mb-1">
              {/* <div className="flex items-center justify-between">
                <label className="block text-gray-700 font-medium mb-1">Category</label>

                <button
                  onClick={() => setIsAdding(!isAdding)} // Toggle the "Add new category" form
                  className="p-1 w-6 h-6 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none text-center"
                >
                  +
                </button>
              </div> */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <label className="block text-gray-700 font-medium mb-1">Category</label>
                  {/* Add the "+" icon next to the category label */}
                  <button
                    onClick={() => setIsAdding(!isAdding)} // Toggle the "Add new category" form
                    className="p-1 w-6 h-6 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none text-center"
                  >
                    +
                  </button>
                </div>
              </div>


              {/* Dropdown to select a category */}
              <div className="flex items-center space-x-2">
                <select
                  value={selectedCategory}
                  onChange={e => setSelectedCategory(e.target.value)} // Set selected category
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a Category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Input field to add a new category */}
              {isAdding && (
                <div className="mt-2 flex space-x-2">
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)} // Update new category name
                    placeholder="New category name"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleAddCategory} // Handle adding the new category
                    className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none"
                  >
                    Submit
                  </button>
                </div>
              )}
            </div>


            {/* Sector Dropdown */}
            {/* <div>
              <label className="block text-gray-700 font-medium mb-1">
                Sector
              </label>
              <select
                value={selectedSector}
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
            </div> */}

            <div className="mb-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <label className="block text-gray-700 font-medium mb-1">Sector</label>
                  <button
                    onClick={() => setIsAddingSector(!isAddingSector)} // Toggle the "Add new sector" form
                    className="p-1 w-6 h-6 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none text-center"
                  >
                    +
                  </button>
                </div>

              </div>

              {/* Dropdown to select a sector */}
              <div className="flex items-center space-x-2">
                <select
                  value={selectedSector}
                  onChange={e => setSelectedSector(e.target.value)} // Set selected sector
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a Sector</option>
                  {filteredSectors.map(sector => (
                    <option key={sector.id} value={sector.id}>
                      {sector.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Input field to add a new sector */}
              {isAddingSector && (
                <div className="mt-2 flex space-x-2">
                  <input
                    type="text"
                    value={newSector}
                    onChange={(e) => setNewSector(e.target.value)} // Update new sector name
                    placeholder="New sector name"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleAddSector} // Handle adding the new sector
                    className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none"
                  >
                    Submit
                  </button>
                </div>
              )}
            </div>


            {/* Subsector Dropdown */}
            {/* <div>
              <label className="block text-gray-700 font-medium mb-1">
                Sub-Sector
              </label>
              <select
                name="sub_sector_id"
                value={formDataSubmit.sub_sector_id}
                onChange={handleInputChange}
                // onChange={handleSectorChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">
                  Select a Sub-sector
                </option>
                {filteredSubsectors.map(subsector => (
                  <option key={subsector.id} value={subsector.id}>
                    {subsector.name}
                  </option>
                ))}
              </select>
            </div> */}

            <div className="mb-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <label className="block text-gray-700 font-medium mb-1">Sub-Sector</label>
                  <button
                    onClick={() => setIsAddingSubSector(!isAddingSubSector)} // Toggle the "Add new sub-sector" form
                    className="p-1 w-6 h-6 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none text-center"
                  >
                    +
                  </button>
                </div>

              </div>

              {/* Dropdown to select a sub-sector */}
              <div className="flex items-center space-x-2">
                <select
                  name="sub_sector_id"
                  value={formDataSubmit.sub_sector_id}
                  onChange={handleInputChange} // Handle change in sub-sector selection
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a Sub-sector</option>
                  {filteredSubsectors.map(subsector => (
                    <option key={subsector.id} value={subsector.id}>
                      {subsector.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Input field to add a new sub-sector */}
              {isAddingSubSector && (
                <div className="mt-2 flex space-x-2">
                  <input
                    type="text"
                    value={newSubSector}
                    onChange={(e) => setNewSubSector(e.target.value)} // Update the new sub-sector name
                    placeholder="New sub-sector name"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleAddSubSector} // Handle adding the new sub-sector
                    className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none"
                  >
                    Submit
                  </button>
                </div>
              )}
            </div>

            {/* Division Dropdown */}
            {/* <div>
              <label className="block text-gray-700 font-medium mb-1">
                Division <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedDivision}
                onChange={e => setSelectedDivision(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">
                  Select a Division
                </option>
                {divisions.map(division => (
                  <option key={division.id} value={division.id}>
                    {division.name}
                  </option>
                ))}
              </select>
            </div> */}

            <div className="mb-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <label className="block text-gray-700 font-medium mb-1">Division</label>
                  <button
                    onClick={() => setIsAddingDivision(!isAddingDivision)} // Toggle the "Add new division" form
                    className="p-1 w-6 h-6 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none text-center"
                  >
                    +
                  </button>
                </div>

              </div>

              {/* Dropdown to select a division */}
              <div className="flex items-center space-x-2">
                <select
                  value={selectedDivision}
                  onChange={e => setSelectedDivision(e.target.value)} // Set selected division
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a Division</option>
                  {divisions.map(division => (
                    <option key={division.id} value={division.id}>
                      {division.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Input field to add a new division */}
              {isAddingDivision && (
                <div className="mt-2 flex space-x-2">
                  <input
                    type="text"
                    value={newDivision}
                    onChange={(e) => setNewDivision(e.target.value)} // Update new division name
                    placeholder="New division name"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleAddDivision} // Handle adding the new division
                    className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none"
                  >
                    Submit
                  </button>
                </div>
              )}
            </div>

            {/* District Dropdown */}
            {/* <div>
              <label className="block text-gray-700 font-medium mb-1">
                District <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedDistrict}
                onChange={e => setSelectedDistrict(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
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
            </div> */}

            <div className="mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <label className="block text-gray-700 font-medium mb-1">District</label>
                  <button
                    onClick={() => setIsAddingDistrict(!isAddingDistrict)} // Toggle the "Add new district" form
                    className="p-1 w-6 h-6 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none text-center"
                  >
                    +
                  </button>
                </div>

              </div>

              {/* Dropdown to select a district */}
              <div className="flex items-center space-x-2">
                <select
                  value={selectedDistrict}
                  onChange={e => setSelectedDistrict(e.target.value)} // Set selected district
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a District</option>
                  {districts.map(district => (
                    <option key={district.id} value={district.id}>
                      {district.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Input field to add a new district */}
              {isAddingDistrict && (
                <div className="mt-2 flex space-x-2">
                  <input
                    type="text"
                    value={newDistrict}
                    onChange={(e) => setNewDistrict(e.target.value)} // Update new district name
                    placeholder="New district name"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleAddDistrict} // Handle adding the new district
                    className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none"
                  >
                    Submit
                  </button>
                </div>
              )}
            </div>

            {/* Upazila Dropdown */}
            {/* <div>
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
                <option value="">
                  Select an Upazila
                </option>
                {filteredUpazilas.map(upazila => (
                  <option key={upazila.id} value={upazila.id}>
                    {upazila.name}
                  </option>
                ))}
              </select>
            </div> */}


            <div className="mb-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <label className="block text-gray-700 font-medium mb-1">
                    Upazila <span className="text-red-500">*</span>
                  </label>
                  <button
                    onClick={() => setIsAddingUpazila(!isAddingUpazila)} // Toggle the "Add new Upazila" form
                    className="p-1 w-6 h-6 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none text-center"
                  >
                    +
                  </button>
                </div>

              </div>

              {/* Dropdown to select an Upazila */}
              <div className="flex items-center space-x-2">
                <select
                  value={formDataSubmit.upazila_id}
                  onChange={handleInputChange} // Handle selecting Upazila
                  name="upazila_id"
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">
                    Select an Upazila
                  </option>
                  {filteredUpazilas.map(upazila => (
                    <option key={upazila.id} value={upazila.id}>
                      {upazila.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Input field to add a new Upazila */}
              {isAddingUpazila && (
                <div className="mt-2 flex space-x-2">
                  <input
                    type="text"
                    value={newUpazila}
                    onChange={(e) => setNewUpazila(e.target.value)} // Update new upazila name
                    placeholder="New Upazila name"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleAddUpazila} // Handle adding the new Upazila
                    className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none"
                  >
                    Submit
                  </button>
                </div>
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
            {/* <div>
              <label className="block text-gray-700 font-medium mb-1">
                Organization Logo
              </label>
              <input
                type="file"
                onChange={e => handleLogoUpload(e, setLogoInput)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div> */}

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
