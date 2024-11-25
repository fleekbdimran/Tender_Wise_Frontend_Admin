

const PendingPublishTender = () => {
  const data = [
    { id: 91, name: "Grand", type: "Free", status: "Publish" },
    { id: 90, name: "Rose", type: "Popular", status: "Pending" },
  ];

  return (
    <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Pending Publish Tender</h2>
      <div className="overflow-x-auto">
        
        <table className="min-w-full border-collapse border border-gray-200 text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 px-4 py-2">ID</th>
              <th className="border border-gray-200 px-4 py-2">Name</th>
              <th className="border border-gray-200 px-4 py-2">Email</th>
              <th className="border border-gray-200 px-4 py-2">Phone</th>
              <th className="border border-gray-200 px-4 py-2">Tender Name</th>
              <th className="border border-gray-200 px-4 py-2">Status</th>
              <th className="border border-gray-200 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="border border-gray-200 px-4 py-2">{item.id}</td>
                <td className="border border-gray-200 px-4 py-2">{item.name}</td>
                <td className="border border-gray-200 px-4 py-2">{item.email}</td>
                <td className="border border-gray-200 px-4 py-2">{item.phone}</td>
                <td className="border border-gray-200 px-4 py-2">{item.status}</td>
                <td className="border border-gray-200 px-4 py-2">{item.Action}</td>
                <td className="border border-gray-200 px-4 py-2 text-center">
                  <button className="text-gray-600 hover:text-gray-800">
                    👁
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingPublishTender;

