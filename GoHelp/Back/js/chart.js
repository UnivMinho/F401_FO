$(function() {
  /* ChartJS
   * -------
   * Data and config for chartjs
   */
  'use strict';
  
  // Recuperar dados do localStorage
  const storedInitiatives = JSON.parse(localStorage.getItem("initiatives"));

  // Verificar se os dados foram corretamente recuperados
  if (!storedInitiatives) {
    console.error("Dados das iniciativas não encontrados no localStorage.");
    return;
  }

  console.log("Iniciativas:", storedInitiatives);

  // Contar o número de iniciativas de cada tipo
  const initiativeTypes = {
    Limpeza: 0,
    Reflorestação: 0,
    Campanhas: 0
  };

  storedInitiatives.forEach(initiative => {
    if (initiative.type in initiativeTypes) {
      initiativeTypes[initiative.type]++;
    }
  });

  // Configuração dos dados para o gráfico de donut
  var doughnutPieData = {
    datasets: [{
      data: [
        initiativeTypes.Limpeza,
        initiativeTypes.Reflorestação,
        initiativeTypes.Campanhas
      ],
      backgroundColor: [
        'rgba(144, 238, 144, 0.5)', // Verde pastel
        'rgba(102, 205, 170, 0.5)', // Verde médio água-marinha
        'rgba(135, 206, 250, 0.5)'  // Azul claro
      ],
      borderColor: [
        'rgba(144, 238, 144, 1)',   // Verde pastel
        'rgba(102, 205, 170, 1)',   // Verde médio água-marinha
        'rgba(135, 206, 250, 1)'    // Azul claro
      ],
    }],
    labels: [
      'Limpeza',
      'Reflorestação',
      'Campanhas'
    ]
  };

  var doughnutPieOptions = {
    responsive: true,
    animation: {
      animateScale: true,
      animateRotate: true
    }
  };

  // Inicializar o gráfico de donut
  var doughnutChartCanvas = $("#doughnutChart").get(0).getContext("2d");
  var doughnutChart = new Chart(doughnutChartCanvas, {
    type: 'doughnut',
    data: doughnutPieData,
    options: doughnutPieOptions
  });


  

  // Outros gráficos (mantidos do seu código original)
  var data = {
    labels: ["2013", "2014", "2015", "2016", "2017", "2018"],
    datasets: [{
      label: '# of Votes',
      data: [10, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
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
          '#587ce4'
        ],
        borderWidth: 2,
        fill: false
      },
      {
        label: 'Dataset 2',
        data: [5, 23, 7, 12, 42, 23],
        borderColor: [
          '#ede190'
        ],
        borderWidth: 2,
        fill: false
      },
      {
        label: 'Dataset 3',
        data: [15, 10, 21, 32, 12, 33],
        borderColor: [
          '#f44252'
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
  var areaData = {
    labels: ["2013", "2014", "2015", "2016", "2017"],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
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
        borderColor: ['rgba(255, 99, 132, 0.5)'],
        backgroundColor: ['rgba(255, 99, 132, 0.5)'],
        borderWidth: 1,
        fill: true
      },
      {
        label: 'Twitter',
        data: [7, 17, 12, 16, 14, 18, 16, 12, 15, 11, 13, 9],
        borderColor: ['rgba(54, 162, 235, 0.5)'],
        backgroundColor: ['rgba(54, 162, 235, 0.5)'],
        borderWidth: 1,
        fill: true
      },
      {
        label: 'Linkedin',
        data: [6, 14, 16, 20, 12, 18, 15, 12, 17, 19, 15, 11],
        borderColor: ['rgba(255, 206, 86, 0.5)'],
        backgroundColor: ['rgba(255, 206, 86, 0.5)'],
        borderWidth: 1,
        fill: true
      }
    ]
  };

  var multiAreaOptions = {
    plugins: {
      filler: {
        propagate: true
      }
    },
    elements: {
      point: {
        radius: 0
      }
    },
    scales: {
      xAxes: [{
        gridLines: {
          display: false
        }
      }],
      yAxes: [{
        gridLines: {
          display: false
        }
      }]
    }
  }

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
          'rgba(255, 99, 132, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)'
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
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1
      }
    ]
  }

  var scatterChartOptions = {
    scales: {
      xAxes: [{
        type: 'linear',
        position: 'bottom'
      }]
    }
  }

 
 
 
 
 
 
  $(function() {
    'use strict';
  
    // Função para recuperar dados do localStorage
    function getLocalStorageData(key) {
      return JSON.parse(localStorage.getItem(key));
    }
  
    function updateBarChart(data) {
      var barChartCanvas = $("#barChart").get(0).getContext("2d");
      var barChart = new Chart(barChartCanvas, {
        type: 'bar',
        data: data,
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          },
          legend: {
            display: true
          },
          elements: {
            point: {
              radius: 0
            }
          }
        }
      });
    }
  
    function processData(users, initiatives) {
      var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      var newVolunteersByMonth = new Array(12).fill(0);
      var materialsCount = {};
  
      users.forEach(user => {
        var creationDate = new Date(user.dataCriado);
        var monthIndex = creationDate.getMonth();
        newVolunteersByMonth[monthIndex]++;
      });
  
      initiatives.forEach(initiative => {
        if (["Por realizar", "A decorrer", "Concluída"].includes(initiative.status)) {
          initiative.materiais.forEach(material => {
            if (materialsCount[material.nome]) {
              materialsCount[material.nome] += parseInt(material.quantidade);
            } else {
              materialsCount[material.nome] = parseInt(material.quantidade);
            }
          });
        }
      });
  
      var barChartData = {
        labels: months,
        datasets: [{
          label: 'Novos Voluntários',
          data: newVolunteersByMonth,
          backgroundColor: 'rgba(144, 238, 144, 0.5)', // Verde pastel
          borderColor: 'rgba(144, 238, 144, 1)', // Verde pastel
          borderWidth: 1
        }]
      };
  
      return { barChartData };
    }
  
    // Inicialização dos gráficos com o ano atual
    var currentYear = new Date().getFullYear();
    $('#dropdownMenuDate2').text('Year: ' + currentYear);
  
    var storedUsers = getLocalStorageData("usersData");
    var storedInitiatives = getLocalStorageData("initiatives");
  
    if (storedUsers && storedInitiatives) {
      var { barChartData } = processData(storedUsers, storedInitiatives);
      updateBarChart(barChartData);
    }
  });
  
  

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
      data: doughnutPieData,
      options: doughnutPieOptions
    });
  }
});
