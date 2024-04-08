import React, { useEffect, useState } from 'react';
import Chart from "react-apexcharts";
import { useLocalState } from '../../../Util/useLocalStorage';

export default function Donut() {
    const [jwt,setJwt] = useLocalState("","token");
    const [offre,setOffre] = useState(0);
    const [question,setQuestion] = useState(0);
    useEffect(()=>{
        const requestOptions = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`,
            },
        }
        fetch("http://localhost:8080/api/v1/admin/offreQuestion",requestOptions)
        .then((response)=>{
                if(response.ok){
                    return response.json();
                }
        })
        .then((data)=>{
            setOffre(data.offre);
            setQuestion(data.question);
        }).catch((err)=>{

        })
    },[]);
    const state = {
      options: {
          labels: ['Offers', 'Questions'],
          dataLabels: {
              enabled: true,
              formatter: function (val, opts) {
                  return opts.w.globals.series[opts.seriesIndex];
              },
              style: {
                  fontSize: '12px',
                  colors: ['#ffffff']
              }
          },
          colors: ['#60A3D9', '#003B73'],
          legend: {
              labels: {
                  style: {
                      fontSize: '20px'
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
      series: [offre, question]
  };
  
  return (
      <>
          <h3 className='text-2xl text-gray-800  font-semibold pl-2 mb-14'>Offre and question distribution</h3>
          <Chart
              options={state.options}
              series={state.series}
              type="pie"
              width="480"
              height={600}
          />
      </>
  );
  
      
}
