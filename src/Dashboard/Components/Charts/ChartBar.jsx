import React, { useEffect, useState } from 'react'
import Chart from "react-apexcharts";
import { useLocalState } from '../../../Util/useLocalStorage';

export default function ChartBar() {
    const [jwt,setJwt] = useLocalState("","token");
    const [job,setJob] = useState([]);
    const [intern,setIntern] = useState([]);

    useEffect(()=>{
        const requestOptions = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`,
            },
        }
        fetch("http://localhost:8080/api/v1/admin/offreByCity",requestOptions)
        .then((response)=>{
                if(response.ok){
                    return response.json();
                }
        })
        .then((data)=>{
            setJob(data.job);
            setIntern(data.intern);
        }).catch((err)=>{

        })
    },[]);

    const state = {
      options: {
          colors: ['#5e8fa1', '#59a667'],
          chart: {
              id: "basic-bar"
          },
          xaxis: {
              categories: [
                  "Casablanca",
                  "Fes",
                  "Rabat",
                  "Tanger",
                  "Meknes",
                  "Tetouan"
              ],
              labels: {
                  style: {
                      fontSize: '16px',
                      fontFamily: 'Arial, sans-serif',
                      fontWeight: 400
                  }
              }
          },
          yaxis: {
              labels: {
                  style: {
                      fontSize: '19px',
                      fontFamily: 'Arial, sans-serif',
                      fontWeight: 400
                  }
              }
          },
          legend: {
              labels: {
                  style: {
                      fontSize: '20px' // Adjust font size for series names
                      // Add more font properties as needed
                  }
              }
          },
          animations: {
              enabled: true, // Enable animations
              easing: 'easeinout', // Specify easing function
              speed: 1000, // Specify animation speed in milliseconds
              animateGradually: {
                  enabled: true,
                  delay: 150 // Specify delay between series animation
              },
              dynamicAnimation: {
                  enabled: true,
                  speed: 350 // Specify dynamic animation speed
              }
          }
      },
      series: [
          {
              name: "Jobs",
              data: job
          },
          {
              name: "Internships",
              data: intern
          }
      ]
  };
  
  return (
      <>
          <h3 className='text-2xl text-gray-800  font-semibold pl-2 mb-14'>JOBS AND INTERNSHIPS PER CITY</h3>
          <Chart
              options={state.options}
              series={state.series}
              type="bar"
              height={380}
          />
      </>
  )
  
}
