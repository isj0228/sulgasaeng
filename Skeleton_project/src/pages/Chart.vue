<template>
  <div>
    <!-- Pie Chart -->
    <div class="card shadow mb-4">
      <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">Pie Chart</h6>
      </div>
      <div class="card-body">
        <div class="chart-pie pt-4">
          <canvas id="myPieChart"></canvas>
        </div>
      </div>
    </div>

    <!-- Bar Chart -->
    <div class="card shadow mb-4">
      <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">Bar Chart</h6>
      </div>
      <div class="card-body">
        <div class="chart-bar">
          <canvas id="myBarChart"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
  mounted() {
    // Pie Chart Example
    var ctxPie = document.getElementById("myPieChart");
    var myPieChart = new Chart(ctxPie, {
      type: 'doughnut',
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: ['#f6c23e', '#36b9cc', '#4e73df', '#1cc88a', '#6610f2', '#e74a3b'],
          hoverBackgroundColor: ['#f0c24e', '#2a96ad', '#375abd', '#17a673', '#5a1de1', '#d73a28'],
          hoverBorderColor: "rgba(234, 236, 244, 1)",
        }],
      },
      options: {
        maintainAspectRatio: false,
        tooltips: {
          backgroundColor: "rgb(255,255,255)",
          bodyFontColor: "#858796",
          borderColor: '#dddfeb',
          borderWidth: 1,
          xPadding: 15,
          yPadding: 15,
          displayColors: false,
          caretPadding: 10,
        },
        legend: {
          display: false
        },
        cutoutPercentage: 80,
      },
    });

    // Bar Chart Example
    var ctxBar = document.getElementById("myBarChart");
    var myBarChart = new Chart(ctxBar, {
      type: 'bar',
      data: {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [{
          label: "Revenue",
          backgroundColor: "#4e73df",
          hoverBackgroundColor: "#2e59d9",
          borderColor: "#4e73df",
          data: [4215, 5312, 6251, 7841, 9821, 14984],
        }],
      },
      options: {
        maintainAspectRatio: false,
        layout: {
          padding: {
            left: 10,
            right: 25,
            top: 25,
            bottom: 0
          }
        },
        scales: {
          xAxes: [{
            time: {
              unit: 'month'
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            ticks: {
              maxTicksLimit: 6
            },
            maxBarThickness: 25,
          }],
          yAxes: [{
            ticks: {
              min: 0,
              max: 15000,
              maxTicksLimit: 5,
              padding: 10,
              // Include a dollar sign in the ticks
              callback: function(value, index, values) {
                return '$' + number_format(value);
              }
            },
            gridLines: {
              color: "rgb(234, 236, 244)",
              zeroLineColor: "rgb(234, 236, 244)",
              drawBorder: false,
              borderDash: [2],
              zeroLineBorderDash: [2]
            }
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          titleMarginBottom: 10,
          titleFontColor: '#6e707e',
          titleFontSize: 14,
          backgroundColor: "rgb(255,255,255)",
          bodyFontColor: "#858796",
          borderColor: '#dddfeb',
          borderWidth: 1,
          xPadding: 15,
          yPadding: 15,
          displayColors: false,
          caretPadding: 10,
          callbacks: {
            label: function(tooltipItem, chart) {
              var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
              return datasetLabel + ': $' + number_format(tooltipItem.yLabel);
            }
          }
        },
      }
    });
  }
}
</script>