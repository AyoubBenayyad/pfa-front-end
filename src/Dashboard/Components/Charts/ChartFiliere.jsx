import React, { useEffect, useState } from 'react'
import Chart from "react-apexcharts";
import { useLocalState } from '../../../Util/useLocalStorage';

export default function ChartFiliere() {
    const [jwt,setJwt] = useLocalState("","token");
    const [users,setUsers] = useState([]);
    const [posts,setPosts] = useState([]);

    useEffect(()=>{
        const requestOptions = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`,
            },
        }
        fetch("http://localhost:8080/api/v1/admin/FiliereStats",requestOptions)
        .then((response)=>{
                if(response.ok){
                    return response.json();
                }
        })
        .then((data)=>{
            setUsers(data.users);
            setPosts(data.posts);
        }).catch((err)=>{
        })
    },[]);


    const state = {
        options: {
          colors: ['#5885AF', '#874484'],
          chart: {
            id: "basic-bar"
          },
          xaxis: {
            categories: [ "INFO",
            "INDUS",
            "GTR",
            "GSEII",
            "MSA",
            "GESI"]
          },
            labels: {
              style: {
                  fontSize: '18px', 
                  fontFamily: 'Arial, sans-serif', 
                  fontWeight: 400 
              },
          },
          yaxis:{
            labels: {
              style: {
                  fontSize: '15px', 
                  fontFamily: 'Arial, sans-serif', 
                  fontWeight: 400 
              }
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

        series: [
          {
            name: "Posts",
            data: posts
          },
          {
            name: "Users",
            data: users
          }
        ]
      };

  return (
    <>
    <h3 className='text-2xl text-gray-800  font-semibold pl-2 mb-14'>USERS AND POSTS PER DOMAIN </h3>
<Chart
              options={state.options}
              series={state.series}
              type="bar"
              height={500}
            />
    </>
  )
}
