import React,{useState,useEffect} from 'react';
import { useLocalState } from '../../../Util/useLocalStorage';
import Chart from "react-apexcharts";

export default function LineChart() {

    const [jwt,setJwt] = useLocalState("","token");
    const [offres,setOffres] = useState([]);
    const [questions,setQuestions] = useState([]);
    useEffect(()=>{
        const requestOptions = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`,
            },
        }
        fetch("http://localhost:8080/api/v1/admin/MonthlyPosts",requestOptions)
        .then((response)=>{
                if(response.ok){
                    return response.json();
                }
        })
        .then((data)=>{
            setOffres(data.offre);
            setQuestions(data.questions);
        }).catch((err)=>{

        })
    },[]);

    const state = {
      options: {
          chart: {
              type: 'line',
          },
          colors: ['#974a62', '#aaaa1a'],
          xaxis: {
              categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
              labels: {
                  rotate: -45,
                  style: {
                      fontSize: '15px',
                      fontFamily: 'Arial, sans-serif',
                      fontWeight: 400
                  }
              },
              axisTicks: {
                  show: true, // Show x-axis ticks
              },
          },
          yaxis: {
              labels: {
                  formatter: function (val) {
                      return val; // Optional: You can format y-axis labels here
                  },
                  style: {
                      fontSize: '15px',
                      fontFamily: 'Arial, sans-serif',
                      fontWeight: 400
                  }
              },
          },
  
          markers: {
              size: 6,
              colors: ['#974a62', '#aaaa1a'],
              strokeWidth: 0,
          },
          grid: {
              borderColor: '#f1f1f1',
              row: {
                  colors: ['#FFFFFF', 'transparent'],
                  opacity: 0.5
              },
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
          },
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
          name: 'Offres',
          data: offres
      }, {
          name: 'Questions',
          data: questions
      }]
  };
  
  return (
      <>
          <h3 className='text-2xl text-gray-800  font-semibold pl-2 mb-14'>OFFERS AND QUESTIONS IN 2024 </h3>
          <Chart
              options={state.options}
              series={state.series}
              type="line"
              height={500}
          />
      </>
  );
  
      
      
}
