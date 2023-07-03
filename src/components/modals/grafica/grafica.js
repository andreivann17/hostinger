import {useRef, useState} from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    RadialLinearScale,
    LinearScale,
    LineElement,
    BarElement,
    PointElement,
    Title,
    Tooltip,
    
    Legend,
    elements,
  } from 'chart.js';
  import { Bar,getElementAtEvent,Doughnut, Line } from 'react-chartjs-2';

  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    RadialLinearScale,
    Legend,
    LineElement,
    PointElement,
  );


//import './assets/css/bootstrap.css';
function card({data,title,dataLabels,type,options}) {
  const chartRef = useRef()
 
  return (
    <div style={{ width: '100%', height: '100%' }}>
          {
            type=="BAR"&&
            <Bar
            ref={chartRef}
        
           options={options}
            data={{
              labels:dataLabels ,
              datasets: [{
                  label: title,
              
                  backgroundColor: ['#375b8175','#3498db75'],
                 
                
      
              
              borderColor: ['#2f4d6c75','#3498db75'],
      
              
                  pointBackgroundColor: "#fff",
                  pointBorderColor: "#fff",
                  data: data
              }
              
              ],
            }}
            
       />
      
          } {
            
            type=="BARHORIZ"&&
            <Bar
            
            data={{
              labels: dataLabels,
              datasets: [
                {
                  label: title,
                  data: data,
                  backgroundColor: ["rgba(55, 91, 129, 0.5)", "rgba(52, 152, 219, 0.5)"],
                  borderColor: ["#2f4d6c", "#3498db"],
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
              scales: {
                xAxes: [
                  {
                    ticks: {
                      autoSkip: false,
                      maxRotation: 0,
                      minRotation: -90,
                    },
                  },
                ],
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                    },
                  },
                ],
              },
            }}
          />
      
          }
           {
            type=="LINE"&&
            <Line
            ref={chartRef}
            options={{
              maintainAspectRatio: false,
            }}
         
            data={{
               labels: dataLabels,
           
               datasets: data
               ,
             }}
       />
      
          }
        </div>
 
  );
}

export default card;
