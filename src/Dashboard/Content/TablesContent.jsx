import React from 'react'
import UsersTable from "../Components/Tables/Table"
import TablePosts from '../Components/Tables/TablePosts';
import TableUsers from '../Components/Tables/TableUsers';
export default function TablesContent() {
  return (<div>
        <div className='bg-white rounded-lg p-3 mt-4 w-full'>
            <UsersTable/>
        </div>
        <div className='bg-white rounded-lg p-3 mt-4 w-full'>
            <TableUsers/>
        </div>
        <div className='bg-white rounded-lg p-3 mt-4 w-full'>
            <TablePosts/>
        </div>
    </div>
  )
}
