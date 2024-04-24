$(function() {
  /* ChartJS
   * -------
   * Data and config for chartjs
   */
  'use strict';
  var data = {
    labels: ["2013", "2014", "2014", "2015", "2016", "2017"],
    datasets: [{
      label: '# of Votes',
      data: [10, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(173, 216, 230, 0.2)', // Azul Pastel
        'rgba(176, 224, 230, 0.2)', // Azul Pastel
        'rgba(135, 206, 250, 0.2)', // Azul Céu
        'rgba(70, 130, 180, 0.2)',  // Azul Aço
        'rgba(0, 191, 255, 0.2)',   // Azul Claro
        'rgba(30, 144, 255, 0.2)'   // Azul Real
      ],
      borderColor: [
        'rgba(173, 216, 230, 1)',   // Azul Pastel
        'rgba(176, 224, 230, 1)',   // Azul Pastel
        'rgba(135, 206, 250, 1)',   // Azul Céu
        'rgba(70, 130, 180, 1)',    // Azul Aço
        'rgba(0, 191, 255, 1)',     // Azul Claro
        'rgba(30, 144, 255, 1)'     // Azul Real
      ],
      borderWidth: 1,
      fill: false
    }]
  };
  
  var multiLineData = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [{
        label: 'Dataset 1',
        data: [12, 19, 3, 5, 2, 3],
        borderColor: [
          'rgba(144, 238, 144, 1)' // Verde Pálido
        ],
        borderWidth: 2,
        fill: false
      },
      {
        label: 'Dataset 2',
        data: [5, 23, 7, 12, 42, 23],
        borderColor: [
          'rgba(152, 251, 152, 1)' // Verde Pálido
        ],
        borderWidth: 2,
        fill: false
      },
      {
        label: 'Dataset 3',
        data: [15, 10, 21, 32, 12, 33],
        borderColor: [
          'rgba(173, 255, 47, 1)' // Verde Limão
        ],
        borderWidth: 2,
        fill: false
      }
    ]
  };
  
  var options = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    },
    legend: {
      display: false
    },
    elements: {
      point: {
        radius: 0
      }
    }

  };
  var doughnutPieData = {
    datasets: [{
      data: [30, 40, 30],
      backgroundColor: [
        'rgba(144, 238, 144, 0.5)', // Verde Pálido
        'rgba(152, 251, 152, 0.5)', // Verde Pálido
        'rgba(173, 255, 47, 0.5)',  // Verde Limão
      ],
      borderColor: [
        'rgba(144, 238, 144, 1)',   // Verde Pálido
        'rgba(152, 251, 152, 1)',   // Verde Pálido
        'rgba(173, 255, 47, 1)',    // Verde Limão
      ],
    }],
  
    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [
      'Green',
      'Light Green',
      'Lime Green',
    ]
  };
  
  var doughnutPieOptions = {
    responsive: true,
    animation: {
      animateScale: true,
      animateRotate: true
    }
  };
  
  var areaData = {
    labels: ["2013", "2014", "2015", "2016", "2017"],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(173, 216, 230, 0.2)', // Azul Pastel
        'rgba(176, 224, 230, 0.2)', // Azul Pastel
        'rgba(135, 206, 250, 0.2)', // Azul Céu
        'rgba(70, 130, 180, 0.2)',  // Azul Aço
        'rgba(0, 191, 255, 0.2)',   // Azul Claro
        'rgba(30, 144, 255, 0.2)'   // Azul Real
      ],
      borderColor: [
        'rgba(173, 216, 230, 1)',   // Azul Pastel
        'rgba(176, 224, 230, 1)',   // Azul Pastel
        'rgba(135, 206, 250, 1)',   // Azul Céu
        'rgba(70, 130, 180, 1)',    // Azul Aço
        'rgba(0, 191, 255, 1)',     // Azul Claro
        'rgba(30, 144, 255, 1)'     // Azul Real
      ],
      borderWidth: 1,
      fill: true, // 3: no fill
    }]
  };
  

  var areaOptions = {
    plugins: {
      filler: {
        propagate: true
      }
    }
  }

  var multiAreaData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [{
        label: 'Facebook',
        data: [8, 11, 13, 15, 12, 13, 16, 15, 13, 19, 11, 14],
        borderColor: ['rgba(144, 238, 144, 0.5)'], // Verde Pálido
        backgroundColor: ['rgba(144, 238, 144, 0.5)'], // Verde Pálido
        borderWidth: 1,
        fill: true
      },
      {
        label: 'Twitter',
        data: [7, 17, 12, 16, 14, 18, 16, 12, 15, 11, 13, 9],
        borderColor: ['rgba(173, 216, 230, 0.5)'], // Azul Pastel
        backgroundColor: ['rgba(173, 216, 230, 0.5)'], // Azul Pastel
        borderWidth: 1,
        fill: true
      },
      {
        label: 'Linkedin',
        data: [6, 14, 16, 20, 12, 18, 15, 12, 17, 19, 15, 11],
        borderColor: ['rgba(176, 224, 230, 0.5)'], // Azul Pastel
        backgroundColor: ['rgba(176, 224, 230, 0.5)'], // Azul Pastel
        borderWidth: 1,
        fill: true
      }
    ]
  };
  
  var scatterChartData = {
    datasets: [{
        label: 'First Dataset',
        data: [{
            x: -10,
            y: 0
          },
          {
            x: 0,
            y: 3
          },
          {
            x: -25,
            y: 5
          },
          {
            x: 40,
            y: 5
          }
        ],
        backgroundColor: [
          'rgba(144, 238, 144, 0.2)' // Verde Pálido
        ],
        borderColor: [
          'rgba(144, 238, 144, 1)' // Verde Pálido
        ],
        borderWidth: 1
      },
      {
        label: 'Second Dataset',
        data: [{
            x: 10,
            y: 5
          },
          {
            x: 20,
            y: -30
          },
          {
            x: -25,
            y: 15
          },
          {
            x: -10,
            y: 5
          }
        ],
        backgroundColor: [
          'rgba(173, 216, 230, 0.2)' // Azul Pastel
        ],
        borderColor: [
          'rgba(173, 216, 230, 1)' // Azul Pastel
        ],
        borderWidth: 1
      }
    ]
  };
  

  var scatterChartOptions = {
    scales: {
      xAxes: [{
        type: 'linear',
        position: 'bottom'
      }]
    }
  }
  // Get context with jQuery - using jQuery's .get() method.
  if ($("#barChart").length) {
    var barChartCanvas = $("#barChart").get(0).getContext("2d");
    // This will get the first returned node in the jQuery collection.
    var barChart = new Chart(barChartCanvas, {
      type: 'bar',
      data: data,
      options: options
    });
  }

  if ($("#lineChart").length) {
    var lineChartCanvas = $("#lineChart").get(0).getContext("2d");
    var lineChart = new Chart(lineChartCanvas, {
      type: 'line',
      data: data,
      options: options
    });
  }

  if ($("#linechart-multi").length) {
    var multiLineCanvas = $("#linechart-multi").get(0).getContext("2d");
    var lineChart = new Chart(multiLineCanvas, {
      type: 'line',
      data: multiLineData,
      options: options
    });
  }

  if ($("#areachart-multi").length) {
    var multiAreaCanvas = $("#areachart-multi").get(0).getContext("2d");
    var multiAreaChart = new Chart(multiAreaCanvas, {
      type: 'line',
      data: multiAreaData,
      options: multiAreaOptions
    });
  }

  if ($("#doughnutChart").length) {
    var doughnutChartCanvas = $("#doughnutChart").get(0).getContext("2d");
    var doughnutChart = new Chart(doughnutChartCanvas, {
      type: 'doughnut',
      data: doughnutPieData,
      options: doughnutPieOptions
    });
  }

  if ($("#pieChart").length) {
    var pieChartCanvas = $("#pieChart").get(0).getContext("2d");
    var pieChart = new Chart(pieChartCanvas, {
      type: 'pie',
      data: doughnutPieData,
      options: doughnutPieOptions
    });
  }

  if ($("#areaChart").length) {
    var areaChartCanvas = $("#areaChart").get(0).getContext("2d");
    var areaChart = new Chart(areaChartCanvas, {
      type: 'line',
      data: areaData,
      options: areaOptions
    });
  }

  if ($("#scatterChart").length) {
    var scatterChartCanvas = $("#scatterChart").get(0).getContext("2d");
    var scatterChart = new Chart(scatterChartCanvas, {
      type: 'scatter',
      data: scatterChartData,
      options: scatterChartOptions
    });
  }

  if ($("#browserTrafficChart").length) {
    var doughnutChartCanvas = $("#browserTrafficChart").get(0).getContext("2d");
    var doughnutChart = new Chart(doughnutChartCanvas, {
      type: 'doughnut',
      data: browserTrafficData,
      options: doughnutPieOptions
    });
  }
});