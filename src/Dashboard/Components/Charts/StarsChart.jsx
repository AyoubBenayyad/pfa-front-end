import React,{useState,useEffect} from 'react';
import { useLocalState } from '../../../Util/useLocalStorage';
import Chart from "react-apexcharts";

export default function StarsChart() {

    const [jwt,setJwt] = useLocalState("","token");
    const [stars,setStars] = useState([]);
    useEffect(()=>{
        const requestOptions = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`,
            },
        }
        fetch("http://localhost:8080/api/v1/admin/StarsStats",requestOptions)
        .then((response)=>{
                if(response.ok){
                    return response.json();
                }
        })
        .then((data)=>{
            setStars(data.reverse());
        }).catch((err)=>{

        })
    },[]);

    const state = {
        options: {
          chart: {
            type: 'bar', 
            toolbar: {
              show: false 
            }
          },
          plotOptions: {
            bar: {
              horizontal: true 
            }
          },
          colors: [ '#2D669D'],

          
          
          xaxis: {
            categories: ['1 STAR', '2 STAR','3 STAR', '4 STAR','5 STAR'].reverse(),
            labels: {
              style: {
                  fontSize: '15px', 
                  fontFamily: 'Arial, sans-serif', 
                  fontWeight: 400 
              }
          }
          },
          yaxis: {
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
        series: [{
          name: 'Number of users',
          data: stars
        }]
      };
      
      return (
        <>
          <h3 className='text-2xl text-gray-800  font-semibold pl-2'>Users ratings distribution</h3>
            <Chart
              options={state.options}
              series={state.series}
              type="bar" 
              height={400}
            />
        </>
      );
      
      
}
