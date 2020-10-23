import React, {useState, useLayoutEffect} from 'react';
import Chart from 'chart.js';
export default function Doughnut(props) {

    useLayoutEffect(() => {
        const ctx = document.getElementById(props.use);
        const undone = parseInt(props.chart.not_started)
        const completed = parseInt(props.chart.pending)
        const finished = parseInt(props.chart.finished)
        let myChart = new Chart(ctx, {
          type: 'doughnut',
          data: {
              labels: ['undone', 'completed', 'approved'],
              datasets: [{
                  data: [undone, completed, finished],
                  backgroundColor: [
                      'rgba(255, 136, 0, 1)',
                      'rgba(0, 245, 41, 1)',
                      'rgba(0, 138, 255, 1)',
                  ]
              }]
          }
      });

    }, [])
    return (
        <canvas id={props.use}></canvas>
    )
}