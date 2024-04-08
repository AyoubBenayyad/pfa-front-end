import React ,{useState}from 'react';
import DashSide from './DashSide';
import DashboardContent from './Content/Dashboard';
import ChartsContent from './Content/ChartsContent';
import TablesContent from './Content/TablesContent';
import DashNav from './DashNav';

export default function Dashboard() {
  
  const [activeNavItem, setActiveNavItem] = useState(0);

  return (

    

<div class="min-h-screen flex flex-col">
  <header class="sticky top-0 pt-3 h-16 border-gray-400  border-y-2 w-full z-10 dark:bg-slate-100">
      <DashNav/>
  </header>

  <div class="flex-1 flex flex-col sm:flex-row">
    <main class="flex-1 min-w-0 overflow-auto p-10 pl-16 bg-slate-200">
    {activeNavItem === 0 && (<DashboardContent/>)}
    {activeNavItem === 1 && (<TablesContent/>)}
    {activeNavItem === 2 && (<ChartsContent/>)}
    </main>

    <nav class="order-first w-56 flex-none top-0 left-0">
    <DashSide activeNavItem={activeNavItem} setActiveNavItem={setActiveNavItem} />
    </nav>

  </div>

</div>


    




  )
}
