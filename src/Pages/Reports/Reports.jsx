import React, { useEffect } from 'react'
import ReportsGrid from '../../Componente/ReportsGrid/ReportsGrid';
import { useDispatch } from 'react-redux';
import { fetchReports } from '../../redux/Slices/reportsSlice';
import ReportsNav from '../../Componente/ReportsNav/ReportsNav';
export default function Reports() {
   const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(fetchReports());
    }, []);
  
    return (
      <React.Fragment>
        <div className="flex flex-col w-full ">
          {/* Navigation Bar */}
         <ReportsNav/>
  
          {/* Main Content */}
          <div className="flex flex-col flex-grow pt-4 md:pt-6 lg:pt-8">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <ReportsGrid />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
}
