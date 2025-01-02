import { useState, useEffect } from "react";
import { EditOutlined, CloseOutlined, SendOutlined, SearchOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import ApiClient from "../../../Api/ApiClient";



function AddCategoryModal({ isOpen, onClose }) {
  const [categoryName, setCategoryName] = useState("");
  const [categoriesList, setCategoriesList] = useState("");
  const [addCategoriesDropdown, setAddCategoriesDropdown] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await ApiClient.get(`/admin/tender-config/department`);
        if (response.data?.data) {
          const activeCategories = response.data.data.filter(
            (category) => category.department_status === 1
          );
          setAddCategoriesDropdown(activeCategories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setCategoriesList(inputValue);

    if (inputValue.trim() === "") {
      setSuggestions([]);
    } else {
      const filteredSuggestions = addCategoriesDropdown.filter((category) =>
        category.name.toLowerCase().includes(inputValue.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    }
  };

  const handleSuggestionClick = (category) => {
    setCategoriesList(category.name);
    setSuggestions([]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    console.log(categoryName, categoriesList);
    try {
      const selectedCategory = addCategoriesDropdown.find(
        (category) => category.name === categoriesList
      );
      const response = await ApiClient.post("/admin/tender-config/sub-department", {
        name: categoryName,
        department_id: selectedCategory?.id || "",
      });
      if (response.data.success === "false") {
        Swal.fire("Error!", response.data.message, "error");
      } else {
        Swal.fire({
          title: "Success!",
          text: response.data.message,
          icon: "success",
          confirmButtonText: "OK"
        }).then(() => {

          window.location.reload(); // Reload the page
        });
      }
    } catch (error) {
      Swal.fire("Error!", error.response?.data?.message || "Something went wrong!", "error");
      console.log(error.response?.data?.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <CloseOutlined />
        </button>
        <h2 className="text-xl font-semibold mb-6">Add Sector</h2>
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              <span className="text-red-500">*</span> Name:
            </label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Enter Category Name"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              <span className="text-red-500">*</span> Category:
            </label>
            <input
              type="text"
              value={categoriesList}
              onChange={handleInputChange}
              placeholder="Type to search..."
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              required
            />
            {suggestions.length > 0 && (
              <ul className="border border-gray-300 mt-2 rounded-md shadow-sm bg-white max-h-40 overflow-y-auto">
                {suggestions.map((category) => (
                  <li
                    key={category.id}
                    onClick={() => handleSuggestionClick(category)}
                    className="px-4 py-2 hover:bg-teal-500 hover:text-white cursor-pointer"
                  >
                    {category.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            type="submit"
            className="bg-teal-500 text-white px-6 py-3 rounded-lg flex items-center justify-center w-full"
          >
            <SendOutlined className="mr-2" /> Submit
          </button>
        </form>
      </div>
    </div>
  );
}















function EditCategoryModal({ isOpen, onClose, category, onSubmit }) {
  const [categoryName, setCategoryName] = useState("");
  const [categoryStatus, setCategoryStatus] = useState("1");
  const [categoriesList, setCategoriesList] = useState([]); 
  const [suggestions, setSuggestions] = useState([]);
  const [addCategoriesDropdown, setAddCategoriesDropdown] = useState([]);


  // Load initial category data
  useEffect(() => {
    if (category) {
      console.log(category);
      setCategoryName(category.name || "");

      setCategoryStatus(category.status?.toString() || "1");
     
      const selectedCategory = addCategoriesDropdown.find(
        (cat) => cat.id === category.id
      );
      if (selectedCategory) {
        setCategoriesList(selectedCategory.name); 
      }
    }
  }, [category, addCategoriesDropdown]); 

  // Fetch categories for dropdown
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await ApiClient.get(`/admin/tender-config/department`);
        if (response.data?.data) {
          const activeCategories = response.data.data.filter(
            (category) => category.department_status === 1
          );
          setAddCategoriesDropdown(activeCategories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);


  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setCategoriesList(inputValue);

    if (inputValue.trim() === "") {
      setSuggestions([]);
    } else {
      const filteredSuggestions = addCategoriesDropdown.filter((category) =>
        category.name.toLowerCase().includes(inputValue.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    }
  };



  const handleSuggestionClick = (category) => {
    setCategoriesList(category.name);
    setSuggestions([]);
  };


  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Find the category object by name to get its ID
    const selectedCategory = addCategoriesDropdown.find(
      (cat) => cat.name === categoriesList
    );

    console.log(categoryName, categoryStatus, selectedCategory);

    try {
      const response = await ApiClient.patch(
        `/admin/tender-config/sub-department/${category.id}`,
        {
          name: categoryName,
          status: Number(categoryStatus),
          department_id: selectedCategory.id // Send the selected category's ID
        }
      );

      if (response.data.success === "false") {
        console.log(response.data.message);
      } else {
        Swal.fire({
          title: "Success!",
          text: response.data.message,
          icon: "success",
          confirmButtonText: "OK"
        }).then(() => {
          onSubmit(); // Refresh data
          window.location.reload(); // Reload the page
        });
      }
    } catch (error) {
      Swal.fire("Error!", response.data.message, "error");
    }
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <CloseOutlined />
        </button>

        <h2 className="text-xl font-semibold mb-6">Edit Sector</h2>

        <form onSubmit={handleFormSubmit} className="space-y-6">
          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              <span className="text-red-500">*</span> Name:
            </label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Edit Category Name"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              required
            />
          </div>

          {/* Dropdown for selecting category */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              <span className="text-red-500">*</span> Category:
            </label>
            <input
              type="text"
              value={categoriesList}
              onChange={handleInputChange}
              placeholder="Type to search..."
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              required
            />
            {suggestions.length > 0 && (
              <ul className="border border-gray-300 mt-2 rounded-md shadow-sm bg-white max-h-40 overflow-y-auto">
                {suggestions.map((category) => (
                  <li
                    key={category.id}
                    onClick={() => handleSuggestionClick(category)}
                    className="px-4 py-2 hover:bg-teal-500 hover:text-white cursor-pointer"
                  >
                    {category.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Status Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status:
            </label>
            <select
              value={categoryStatus}
              onChange={(e) => setCategoryStatus(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
            >
              <option value="1">Available</option>
              <option value="0">Unavailable</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-teal-500 text-white px-6 py-3 rounded-lg flex items-center justify-center w-full"
          >
            <SendOutlined className="mr-2" /> Update
          </button>
        </form>
      </div>
    </div>
  );
}










function SubDepartment() {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [type, setType] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalItems , setTotalItems] = useState(0);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      const queryParams = new URLSearchParams();
      if (keyword) queryParams.append("key", keyword);
      if (type) queryParams.append("type", type);


      try {
        const response = await ApiClient.get(
          `/admin/tender-config/sub-department?${queryParams.toString()}`
        );
        setTotalItems(response.data.total);
        if (response.data?.data) {
          setCategories(response.data.data);
          setFilteredCategories(response.data.data);
           ;

        }
      } catch (error) {
        console.error("Error fetching categories:", error);

      }
    };

    fetchCategories();
  }, [keyword, type]);

  // Add category
  const handleAddCategory = async () => {

    setIsAddModalOpen(false);
  };

  // Edit category
  const handleEditCategory = async () => {

    setIsEditModalOpen(false);
  };

  // Handle edit modal open
  const handleCategoryNameEdit = (category) => {
    setEditingCategory(category);
    setIsEditModalOpen(true);
  };

  // Handle search
  useEffect(() => {
    const filtered = categories.filter((category) => {
      const matchesKeyword = category.name.toLowerCase().includes(keyword.toLowerCase());
      const matchesType = type ? category.status === parseInt(type) : true;  
      return matchesKeyword && matchesType;
    });

    setFilteredCategories(filtered);
    setCurrentPage(1); // ফিল্টারিং করলে পেজ আবার প্রথমে আসবে
  }, [categories, keyword, type]); // যেকোনো একটিই পরিবর্তিত হলে এটি চলবে


  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCategories.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="h-screen w-full flex flex-col p-4 bg-gray-100 gap-2">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Sub Department={totalItems}</h2>

      <div className="flex items-center justify-between mb-4">

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-teal-500 text-white px-7 py-3 rounded-lg ml-4"
        >
          Create
        </button>

        <div className="flex items-center gap-4">
         
          <div className="flex items-center  justify-end">
            <input
              type="text"
              placeholder="Search by Name"
              className="px-4 py-2 border border-gray-300 rounded-l-md w-[250px]"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button className="bg-teal-500 text-white px-4 py-2 rounded-r-md flex items-center">
              <SearchOutlined />
            </button>
          </div>

          <div className="flex justify-center gap-2 items-center">
            <p className="">status:</p>
            <select
              id="type"
              className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-auto p-3"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">All</option>
              <option value="1">Available</option>
              <option value="0">UnAvailable</option>
            </select>
          </div>

        </div>



      </div>

      <AddCategoryModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddCategory}
      />

      <EditCategoryModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        category={editingCategory}
        onSubmit={handleEditCategory}
      />

      <div className="flex-grow overflow-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">ID</th>
              <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">Name</th>
              <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">Status</th>
              <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((category, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{indexOfFirstItem + index + 1}</td>
                <td className="px-4 py-2 border-b">{category.name}</td>
                <td className="px-4 py-2 border-b">
                  <span
                    className={`px-2 py-1 rounded-full text-xs cursor-pointer ${category.status === 1
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                      }`}
                  >
                    {category.status === 1 ? "Available" : "Unavailable"}
                  </span>
                </td>
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={() => handleCategoryNameEdit(category)}
                    className="text-blue-500 hover:underline flex items-center"
                  >
                    <EditOutlined className="mr-1" /> Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4">
        {Array.from(
          { length: Math.ceil(filteredCategories.length / itemsPerPage) },
          (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-4 py-2 mx-1 rounded ${currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
            >
              {i + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default SubDepartment;