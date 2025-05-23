

import { DataTable } from 'components/data-table';
import React, { useEffect, useState } from 'react'
import { httpsService } from 'services/https.service';
import { columns } from './components/columns';
import { Download, Filter, RefreshCw, Search, UserPlus, Users } from 'lucide-react';
export interface User {
  no: number;
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  name: string;
  emaiL: string;
  createdAt: Date;
  isAdmin: boolean;
  profile: { name: string }[];
}
const UserManagement = () => {

  const [usersWithNumbers, setUsersWithNumbers] = useState<User[]>([]);
  const [totalUsers, setTotalUsers]: any = useState();
const service = new httpsService();


 useEffect(() => {
  fetchAllUsers(0)
  }, []);
      async function fetchAllUsers(session: any) {
        const model = {
          
        };
        try {
          const res = service
            .post(model, "user/list", session)
            .then((results: any) => {
              if (results?.response?.code === 200) {
                console.log("the users refered list", results);
                const usersWithNumbersData: User[] = results.data.map(
                  (user: User, index: number) => ({
                    ...user,
                    name: user.firstName + " " + user.lastName,
                    profileName: user.role,
                    no: index + 1,
                  })
                ); /* .filter((user: User) => user.isAdmin === false) */
                setUsersWithNumbers(usersWithNumbersData);
    
                // Set the state with modified user data
                setUsersWithNumbers(usersWithNumbersData);
                console.log("my users with nimber date", usersWithNumbersData);
    
               
                const totalRefUsers = usersWithNumbersData.length;
                setTotalUsers(totalRefUsers);
                console.log("Length of the data:", totalRefUsers);
              } else {
                console.log("erro")
              }
            });
        } catch (error) {
          console.error("Error:", error);
        }
      }
  return (
    <div>
 <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
                  <p className="text-sm text-gray-500">Manage and organize your users</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </button>
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add User
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Users</p>
                <p className="text-2xl font-semibold text-gray-900">1,234</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Active Users</p>
                <p className="text-2xl font-semibold text-gray-900">1,180</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Pending</p>
                <p className="text-2xl font-semibold text-gray-900">32</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Inactive</p>
                <p className="text-2xl font-semibold text-gray-900">22</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex-1 max-w-lg">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
           
              </div>
            </div>
            
       
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">All Users</h3>
            <p className="mt-1 text-sm text-gray-500">
              A list of all users in your account including their name, title, email and role.
            </p>
          </div>
          
          <div className="overflow-hidden">
            {/* Replace this div with your actual DataTable component */}
            <DataTable columns={columns} data={usersWithNumbers} />
          </div>
        </div>
      </div>
    </div>
                 </div>
  )
}

export default UserManagement


