import React from 'react'
import CardList from '../CardList';
import UsersTable from "../Components/Tables/Table"
import StarsChart from '../Components/Charts/StarsChart';
import Donut from '../Components/Charts/Donut';
import LineChart from '../Components/Charts/LineChart';
import ChartFiliere from '../Components/Charts/ChartFiliere';
import ChartBar from '../Components/Charts/ChartBar';
import TablePosts from '../Components/Tables/TablePosts';
import TableUsers from '../Components/Tables/TableUsers';


export default function DashboardContent() {
  return (
    <div>
        <div className='pb-5'>
            <CardList/>
        </div>
        <div className='bg-white rounded-lg p-3 mt-4 w-full'>
            <UsersTable/>
        </div>
        <div className='flex gap-x-5'>
            <div className='bg-white rounded-lg p-3 mt-4 w-3/5'>
                <ChartBar/>
            </div>
            <div className='bg-white rounded-lg p-3 mt-4 w-2/5'>
                <Donut/>
            </div>
        </div>
        <div className='bg-white rounded-lg p-3 mt-4 w-full'>
            <TableUsers/>
        </div>
        <div className='bg-white rounded-lg p-3 mt-4 w-full'>
            <StarsChart/>
        </div>
        <div className='flex gap-x-5'>
            <div className='bg-white rounded-lg p-3 mt-4 w-2/5'>
                <ChartFiliere/>
            </div>
            <div className='bg-white rounded-lg p-3 mt-4 w-3/5 '>
                <LineChart/>
            </div>
        </div>
        <div className='bg-white rounded-lg p-3 mt-4 w-full'>
            <TablePosts/>
        </div>
    </div>
  )
}
