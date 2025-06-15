import { FilterIcon, PlusIcon, SearchIcon } from "lucide-react";


type Customer = {
  id: string;
  name: string;
  email: string;
  location: string;
  orders: number;
  totalSpent: number;
  lastOrder: string;
};

const customers: Customer[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      location: 'New York, USA',
      orders: 5,
      totalSpent: 625.45,
      lastOrder: '2023-06-15'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      location: 'London, UK',
      orders: 3,
      totalSpent: 268.50,
      lastOrder: '2023-06-16'
    },
    {
      id: '3',
      name: 'Robert Johnson',
      email: 'robert@example.com',
      location: 'Toronto, Canada',
      orders: 7,
      totalSpent: 890.25,
      lastOrder: '2023-06-17'
    },
    {
      id: '4',
      name: 'Emily Davis',
      email: 'emily@example.com',
      location: 'Sydney, Australia',
      orders: 2,
      totalSpent: 110.50,
      lastOrder: '2023-06-18'
    },
    {
      id: '5',
      name: 'Michael Wilson',
      email: 'michael@example.com',
      location: 'Berlin, Germany',
      orders: 4,
      totalSpent: 425.75,
      lastOrder: '2023-06-19'
    },
  ];




  // Customers Section Component
const Customers = () => {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Customers Management</h2>
          <button className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark">
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Customer
          </button>
        </div>
        
        <div className="mb-6 flex items-center">
          <div className="relative flex-grow max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search customers..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
          <button className="ml-3 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
            <FilterIcon className="h-4 w-4 mr-1" />
            Filter
          </button>
        </div>
  
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Spent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Order</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-gray-600">{customer.name.charAt(0)}</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                        <div className="text-sm text-gray-500">{customer.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.orders}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${customer.totalSpent.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.lastOrder}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-3">View</button>
                    <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  

  export default Customers