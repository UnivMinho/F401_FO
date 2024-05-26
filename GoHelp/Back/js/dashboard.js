(function($) {
  'use strict';
  $(document).ready(function() {
      const orderChartElement = $("#order-chart");

      // Verificar a existência do elemento antes de continuar
      if (!orderChartElement.length) {
          console.error("Elemento #order-chart não encontrado.");
          return;
      }

      // Recuperar dados do localStorage
      const storedInitiatives = JSON.parse(localStorage.getItem("initiatives"));
      const storedUsersArray = JSON.parse(localStorage.getItem("usersData"));

      // Verificar se os dados foram corretamente recuperados
      if (!storedInitiatives || !storedUsersArray) {
          console.error("Dados não encontrados no localStorage.");
          return;
      }

      console.log("Iniciativas:", storedInitiatives);
      console.log("Usuários:", storedUsersArray);

      // Processar os dados para obter voluntários e iniciativas por mês
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const dataByMonth = months.map(month => ({ month, volunteers: 0, initiatives: 0 }));

      storedInitiatives.forEach(initiative => {
          const date = new Date(initiative.date);
          const monthIndex = date.getMonth();

          if (Array.isArray(initiative.associatedVolunteers)) {
              dataByMonth[monthIndex].volunteers += initiative.associatedVolunteers.length;
          } else {
              console.warn("Iniciativa sem voluntários válidos:", initiative);
          }
          dataByMonth[monthIndex].initiatives += 1;
      });

      // Adicionar a contagem de utilizadores para os meses
      storedUsersArray.forEach(user => {
          const volunteerCreationMonth = new Date(user.dataCriado).getMonth();
          dataByMonth[volunteerCreationMonth].volunteers += 1;
      });

      const labels = dataByMonth.map(item => item.month);
      const volunteerData = dataByMonth.map(item => item.volunteers);
      const initiativeData = dataByMonth.map(item => item.initiatives);

      var areaData = {
          labels: labels,
          datasets: [
              {
                  data: volunteerData,
                  borderColor: '#66bb6a', // Verde pastel para a linha dos voluntários
                  backgroundColor: 'rgba(102, 187, 106, 0.2)', // Verde pastel com transparência
                  borderWidth: 2,
                  fill: true,
                  label: "Voluntários"
              },
              {
                  data: initiativeData,
                  borderColor: '#338a3e', // Verde mais escuro para a linha das iniciativas
                  backgroundColor: 'rgba(51, 138, 62, 0.2)', // Verde mais escuro com transparência
                  borderWidth: 2,
                  fill: true,
                  label: "Iniciativas"
              }
          ]
      };

      var areaOptions = {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
              filler: {
                  propagate: false
              }
          },
          scales: {
              xAxes: [{
                  display: true,
                  ticks: {
                      display: true,
                      padding: 10,
                      fontColor:"#6C7383"
                  },
                  gridLines: {
                      display: false,
                      drawBorder: false,
                      color: 'transparent',
                      zeroLineColor: '#eeeeee'
                  }
              }],
              yAxes: [{
                  display: true,
                  ticks: {
                      display: true,
                      autoSkip: false,
                      maxRotation: 0,
                      stepSize: 10,
                      min: 0,
                      max: Math.max(...volunteerData.concat(initiativeData)) + 10,
                      padding: 18,
                      fontColor:"#6C7383"
                  },
                  gridLines: {
                      display: true,
                      color:"#f2f2f2",
                      drawBorder: false
                  }
              }]
          },
          legend: {
              display: true
          },
          tooltips: {
              enabled: true
          },
          elements: {
              line: {
                  tension: .35
              },
              point: {
                  radius: 3
              }
          }
      };

      var revenueChartCanvas = orderChartElement.get(0).getContext("2d");
      var revenueChart = new Chart(revenueChartCanvas, {
          type: 'line',
          data: areaData,
          options: areaOptions
      });







   
   
      (function($) {
        'use strict';
        $(document).ready(function() {
            const salesChartElement = $("#sales-chart");
    
            if (!salesChartElement.length) {
                console.error("Elemento #sales-chart não encontrado.");
                return;
            }
    
            // Recuperar dados do localStorage
            const storedInitiatives = JSON.parse(localStorage.getItem("initiatives"));
    
            // Verificar se os dados foram corretamente recuperados
            if (!storedInitiatives) {
                console.error("Dados das iniciativas não encontrados no localStorage.");
                return;
            }
    
            console.log("Iniciativas:", storedInitiatives);
    
            // Processar os dados para obter iniciativas aceites e recusadas por mês
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const dataByMonth = months.map(month => ({ month, aceites: 0, recusadas: 0 }));
    
            storedInitiatives.forEach(initiative => {
                const date = new Date(initiative.date);
                const monthIndex = date.getMonth();
    
                if (initiative.status === "Por realizar") {
                    dataByMonth[monthIndex].aceites += 1;
                } else if (initiative.status === "Recusada") {
                    dataByMonth[monthIndex].recusadas += 1;
                }
            });
    
            const labels = dataByMonth.map(item => item.month);
            const aceitesData = dataByMonth.map(item => item.aceites);
            const recusadasData = dataByMonth.map(item => item.recusadas);
    
            var SalesChartCanvas = salesChartElement.get(0).getContext("2d");
            var SalesChart = new Chart(SalesChartCanvas, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Iniciativas Aceites',
                            data: aceitesData,
                            backgroundColor: 'rgba(102, 187, 106, 0.5)', // Verde pastel com transparência
                            borderColor: '#66bb6a', // Verde pastel
                            borderWidth: 1
                        },
                        {
                            label: 'Iniciativas Recusadas',
                            data: recusadasData,
                            backgroundColor: 'rgba(51, 138, 62, 0.5)', // Verde mais escuro com transparência
                            borderColor: '#338a3e', // Verde mais escuro
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    cornerRadius: 5,
                    responsive: true,
                    maintainAspectRatio: true,
                    layout: {
                        padding: {
                            left: 0,
                            right: 0,
                            top: 20,
                            bottom: 0
                        }
                    },
                    scales: {
                        yAxes: [{
                            display: true,
                            gridLines: {
                                display: true,
                                drawBorder: false,
                                color: "#F2F2F2"
                            },
                            ticks: {
                                display: true,
                                min: 0,
                                max: Math.max(...aceitesData.concat(recusadasData)) + 5,
                                autoSkip: true,
                                maxTicksLimit: 10,
                                fontColor:"#6C7383"
                            }
                        }],
                        xAxes: [{
                            stacked: false,
                            ticks: {
                                beginAtZero: true,
                                fontColor: "#6C7383"
                            },
                            gridLines: {
                                color: "rgba(0, 0, 0, 0)",
                                display: false
                            },
                            barPercentage: 1
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
                },
            });
    
            document.getElementById('sales-legend').innerHTML = SalesChart.generateLegend();
        });
    })(jQuery);
    
    





    
    if ($("#sales-chart-dark").length) {
      var SalesChartCanvas = $("#sales-chart-dark").get(0).getContext("2d");
      var SalesChart = new Chart(SalesChartCanvas, {
        type: 'bar',
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May"],
          datasets: [{
              label: 'Offline Sales',
              data: [480, 230, 470, 210, 330],
              backgroundColor: '#98BDFF'
            },
            {
              label: 'Online Sales',
              data: [400, 340, 550, 480, 170],
              backgroundColor: '#4B49AC'
            }
          ]
        },
        options: {
          cornerRadius: 5,
          responsive: true,
          maintainAspectRatio: true,
          layout: {
            padding: {
              left: 0,
              right: 0,
              top: 20,
              bottom: 0
            }
          },
          scales: {
            yAxes: [{
              display: true,
              gridLines: {
                display: true,
                drawBorder: false,
                color: "#575757"
              },
              ticks: {
                display: true,
                min: 0,
                max: 500,
                callback: function(value, index, values) {
                  return  value + '$' ;
                },
                autoSkip: true,
                maxTicksLimit: 10,
                fontColor:"#F0F0F0"
              }
            }],
            xAxes: [{
              stacked: false,
              ticks: {
                beginAtZero: true,
                fontColor: "#F0F0F0"
              },
              gridLines: {
                color: "#575757",
                display: false
              },
              barPercentage: 1
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
        },
      });
      document.getElementById('sales-legend').innerHTML = SalesChart.generateLegend();
    }
    if ($("#north-america-chart").length) {
      var areaData = {
        labels: ["Jan", "Feb", "Mar"],
        datasets: [{
            data: [100, 50, 50],
            backgroundColor: [
               "#4B49AC","#FFC100", "#248AFD",
            ],
            borderColor: "rgba(0,0,0,0)"
          }
        ]
      };
      var areaOptions = {
        responsive: true,
        maintainAspectRatio: true,
        segmentShowStroke: false,
        cutoutPercentage: 78,
        elements: {
          arc: {
              borderWidth: 4
          }
        },      
        legend: {
          display: false
        },
        tooltips: {
          enabled: true
        },
        legendCallback: function(chart) { 
          var text = [];
          text.push('<div class="report-chart">');
            text.push('<div class="d-flex justify-content-between mx-4 mx-xl-5 mt-3"><div class="d-flex align-items-center"><div class="mr-3" style="width:20px; height:20px; border-radius: 50%; background-color: ' + chart.data.datasets[0].backgroundColor[0] + '"></div><p class="mb-0">Offline sales</p></div>');
            text.push('<p class="mb-0">88333</p>');
            text.push('</div>');
            text.push('<div class="d-flex justify-content-between mx-4 mx-xl-5 mt-3"><div class="d-flex align-items-center"><div class="mr-3" style="width:20px; height:20px; border-radius: 50%; background-color: ' + chart.data.datasets[0].backgroundColor[1] + '"></div><p class="mb-0">Online sales</p></div>');
            text.push('<p class="mb-0">66093</p>');
            text.push('</div>');
            text.push('<div class="d-flex justify-content-between mx-4 mx-xl-5 mt-3"><div class="d-flex align-items-center"><div class="mr-3" style="width:20px; height:20px; border-radius: 50%; background-color: ' + chart.data.datasets[0].backgroundColor[2] + '"></div><p class="mb-0">Returns</p></div>');
            text.push('<p class="mb-0">39836</p>');
            text.push('</div>');
          text.push('</div>');
          return text.join("");
        },
      }
      var northAmericaChartPlugins = {
        beforeDraw: function(chart) {
          var width = chart.chart.width,
              height = chart.chart.height,
              ctx = chart.chart.ctx;
      
          ctx.restore();
          var fontSize = 3.125;
          ctx.font = "500 " + fontSize + "em sans-serif";
          ctx.textBaseline = "middle";
          ctx.fillStyle = "#13381B";
      
          var text = "90",
              textX = Math.round((width - ctx.measureText(text).width) / 2),
              textY = height / 2;
      
          ctx.fillText(text, textX, textY);
          ctx.save();
        }
      }
      var northAmericaChartCanvas = $("#north-america-chart").get(0).getContext("2d");
      var northAmericaChart = new Chart(northAmericaChartCanvas, {
        type: 'doughnut',
        data: areaData,
        options: areaOptions,
        plugins: northAmericaChartPlugins
      });
      document.getElementById('north-america-legend').innerHTML = northAmericaChart.generateLegend();
    }
    if ($("#north-america-chart-dark").length) {
      var areaData = {
        labels: ["Jan", "Feb", "Mar"],
        datasets: [{
            data: [100, 50, 50],
            backgroundColor: [
               "#4B49AC","#FFC100", "#248AFD",
            ],
            borderColor: "rgba(0,0,0,0)"
          }
        ]
      };
      var areaOptions = {
        responsive: true,
        maintainAspectRatio: true,
        segmentShowStroke: false,
        cutoutPercentage: 78,
        elements: {
          arc: {
              borderWidth: 4
          }
        },      
        legend: {
          display: false
        },
        tooltips: {
          enabled: true
        },
        legendCallback: function(chart) { 
          var text = [];
          text.push('<div class="report-chart">');
            text.push('<div class="d-flex justify-content-between mx-4 mx-xl-5 mt-3"><div class="d-flex align-items-center"><div class="mr-3" style="width:20px; height:20px; border-radius: 50%; background-color: ' + chart.data.datasets[0].backgroundColor[0] + '"></div><p class="mb-0">Offline sales</p></div>');
            text.push('<p class="mb-0">88333</p>');
            text.push('</div>');
            text.push('<div class="d-flex justify-content-between mx-4 mx-xl-5 mt-3"><div class="d-flex align-items-center"><div class="mr-3" style="width:20px; height:20px; border-radius: 50%; background-color: ' + chart.data.datasets[0].backgroundColor[1] + '"></div><p class="mb-0">Online sales</p></div>');
            text.push('<p class="mb-0">66093</p>');
            text.push('</div>');
            text.push('<div class="d-flex justify-content-between mx-4 mx-xl-5 mt-3"><div class="d-flex align-items-center"><div class="mr-3" style="width:20px; height:20px; border-radius: 50%; background-color: ' + chart.data.datasets[0].backgroundColor[2] + '"></div><p class="mb-0">Returns</p></div>');
            text.push('<p class="mb-0">39836</p>');
            text.push('</div>');
          text.push('</div>');
          return text.join("");
        },
      }
      var northAmericaChartPlugins = {
        beforeDraw: function(chart) {
          var width = chart.chart.width,
              height = chart.chart.height,
              ctx = chart.chart.ctx;
      
          ctx.restore();
          var fontSize = 3.125;
          ctx.font = "500 " + fontSize + "em sans-serif";
          ctx.textBaseline = "middle";
          ctx.fillStyle = "#fff";
      
          var text = "90",
              textX = Math.round((width - ctx.measureText(text).width) / 2),
              textY = height / 2;
      
          ctx.fillText(text, textX, textY);
          ctx.save();
        }
      }
      var northAmericaChartCanvas = $("#north-america-chart-dark").get(0).getContext("2d");
      var northAmericaChart = new Chart(northAmericaChartCanvas, {
        type: 'doughnut',
        data: areaData,
        options: areaOptions,
        plugins: northAmericaChartPlugins
      });
      document.getElementById('north-america-legend').innerHTML = northAmericaChart.generateLegend();
    }






    $(function() {
      'use strict';
    
      // Função para recuperar dados do localStorage
      function getLocalStorageData(key) {
        return JSON.parse(localStorage.getItem(key));
      }
    
      if ($("#south-america-chart").length) {
        // Recuperar dados das iniciativas do localStorage
        var storedInitiatives = getLocalStorageData("initiatives");
    
        // Verificar se os dados foram corretamente recuperados
        if (!storedInitiatives) {
          console.error("Dados das iniciativas não encontrados no localStorage.");
          return;
        }
    
        // Inicializar um objeto para armazenar os materiais e suas quantidades
        var materialsCount = {};
    
        // Percorrer todas as iniciativas e somar as quantidades dos materiais com base no status
        storedInitiatives.forEach(initiative => {
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
    
        // Preparar os dados para o gráfico
        var materialNames = Object.keys(materialsCount);
        var materialQuantities = Object.values(materialsCount);
    
        var areaData = {
          labels: materialNames,
          datasets: [{
            data: materialQuantities,
            backgroundColor: [
              'rgba(144, 238, 144, 0.5)', // Verde pastel
              'rgba(102, 205, 170, 0.5)', // Verde médio água-marinha
              'rgba(135, 206, 250, 0.5)', // Azul claro
              'rgba(255, 182, 193, 0.5)', // Rosa claro
              'rgba(255, 223, 186, 0.5)', // Pêssego
              'rgba(255, 239, 213, 0.5)'  // Creme
            ],
            borderColor: [
              'rgba(144, 238, 144, 1)',   // Verde pastel
              'rgba(102, 205, 170, 1)',   // Verde médio água-marinha
              'rgba(135, 206, 250, 1)',   // Azul claro
              'rgba(255, 182, 193, 1)',   // Rosa claro
              'rgba(255, 223, 186, 1)',   // Pêssego
              'rgba(255, 239, 213, 1)'    // Creme
            ]
          }]
        };
    
        var areaOptions = {
          responsive: true,
          maintainAspectRatio: true,
          segmentShowStroke: false,
          cutoutPercentage: 78,
          elements: {
            arc: {
              borderWidth: 4
            }
          },
          legend: {
            display: false
          },
          tooltips: {
            enabled: true
          },
          legendCallback: function(chart) {
            var text = [];
            text.push('<div class="report-chart">');
            chart.data.labels.forEach((label, index) => {
              text.push('<div class="d-flex justify-content-between mx-4 mx-xl-5 mt-3"><div class="d-flex align-items-center"><div class="mr-3" style="width:20px; height:20px; border-radius: 50%; background-color: ' + chart.data.datasets[0].backgroundColor[index] + '"></div><p class="mb-0">' + label + '</p></div>');
              text.push('<p class="mb-0">' + chart.data.datasets[0].data[index] + '</p>');
              text.push('</div>');
            });
            text.push('</div>');
            return text.join("");
          }
        };
    
        var southAmericaChartPlugins = {
          beforeDraw: function(chart) {
            var width = chart.chart.width,
                height = chart.chart.height,
                ctx = chart.chart.ctx;
    
            ctx.restore();
            var fontSize = 3.125;
            ctx.font = "600 " + fontSize + "em sans-serif";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "#000";
    
            var text = "",
                textX = Math.round((width - ctx.measureText(text).width) / 2),
                textY = height / 2;
    
            ctx.fillText(text, textX, textY);
            ctx.save();
          }
        };
    
        var southAmericaChartCanvas = $("#south-america-chart").get(0).getContext("2d");
        var southAmericaChart = new Chart(southAmericaChartCanvas, {
          type: 'doughnut',
          data: areaData,
          options: areaOptions,
          plugins: southAmericaChartPlugins
        });
        document.getElementById('south-america-legend').innerHTML = southAmericaChart.generateLegend();
      }
    });
    

    //nome mensagem inicial
document.addEventListener("DOMContentLoaded", function() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  if (userData) {
    const name = userData.name; 
    const mensagem = document.getElementById("mensagem");
    mensagem.textContent = `Bem-Vindo, ${name}`;
  }
});
    
    









    if ($("#south-america-chart-dark").length) {
      var areaData = {
        labels: ["Jan", "Feb", "Mar"],
        datasets: [{
            data: [60, 70, 70],
            backgroundColor: [
              "#4B49AC","#FFC100", "#248AFD",
            ],
            borderColor: "rgba(0,0,0,0)"
          }
        ]
      };
      var areaOptions = {
        responsive: true,
        maintainAspectRatio: true,
        segmentShowStroke: false,
        cutoutPercentage: 78,
        elements: {
          arc: {
              borderWidth: 4
          }
        },      
        legend: {
          display: false
        },
        tooltips: {
          enabled: true
        },
        legendCallback: function(chart) { 
          var text = [];
          text.push('<div class="report-chart">');
            text.push('<div class="d-flex justify-content-between mx-4 mx-xl-5 mt-3"><div class="d-flex align-items-center"><div class="mr-3" style="width:20px; height:20px; border-radius: 50%; background-color: ' + chart.data.datasets[0].backgroundColor[0] + '"></div><p class="mb-0">Offline sales</p></div>');
            text.push('<p class="mb-0">495343</p>');
            text.push('</div>');
            text.push('<div class="d-flex justify-content-between mx-4 mx-xl-5 mt-3"><div class="d-flex align-items-center"><div class="mr-3" style="width:20px; height:20px; border-radius: 50%; background-color: ' + chart.data.datasets[0].backgroundColor[1] + '"></div><p class="mb-0">Online sales</p></div>');
            text.push('<p class="mb-0">630983</p>');
            text.push('</div>');
            text.push('<div class="d-flex justify-content-between mx-4 mx-xl-5 mt-3"><div class="d-flex align-items-center"><div class="mr-3" style="width:20px; height:20px; border-radius: 50%; background-color: ' + chart.data.datasets[0].backgroundColor[2] + '"></div><p class="mb-0">Returns</p></div>');
            text.push('<p class="mb-0">290831</p>');
            text.push('</div>');
          text.push('</div>');
          return text.join("");
        },
      }
      var southAmericaChartPlugins = {
        beforeDraw: function(chart) {
          var width = chart.chart.width,
              height = chart.chart.height,
              ctx = chart.chart.ctx;
      
          ctx.restore();
          var fontSize = 3.125;
          ctx.font = "600 " + fontSize + "em sans-serif";
          ctx.textBaseline = "middle";
          ctx.fillStyle = "#fff";
      
          var text = "76",
              textX = Math.round((width - ctx.measureText(text).width) / 2),
              textY = height / 2;
      
          ctx.fillText(text, textX, textY);
          ctx.save();
        }
      }
      var southAmericaChartCanvas = $("#south-america-chart-dark").get(0).getContext("2d");
      var southAmericaChart = new Chart(southAmericaChartCanvas, {
        type: 'doughnut',
        data: areaData,
        options: areaOptions,
        plugins: southAmericaChartPlugins
      });
      document.getElementById('south-america-legend').innerHTML = southAmericaChart.generateLegend();
    }

    function format ( d ) {
      // `d` is the original data object for the row
      return '<table cellpadding="5" cellspacing="0" border="0" style="width:100%;">'+
          '<tr class="expanded-row">'+
              '<td colspan="8" class="row-bg"><div><div class="d-flex justify-content-between"><div class="cell-hilighted"><div class="d-flex mb-2"><div class="mr-2 min-width-cell"><p>Policy start date</p><h6>25/04/2020</h6></div><div class="min-width-cell"><p>Policy end date</p><h6>24/04/2021</h6></div></div><div class="d-flex"><div class="mr-2 min-width-cell"><p>Sum insured</p><h5>$26,000</h5></div><div class="min-width-cell"><p>Premium</p><h5>$1200</h5></div></div></div><div class="expanded-table-normal-cell"><div class="mr-2 mb-4"><p>Quote no.</p><h6>Incs234</h6></div><div class="mr-2"><p>Vehicle Reg. No.</p><h6>KL-65-A-7004</h6></div></div><div class="expanded-table-normal-cell"><div class="mr-2 mb-4"><p>Policy number</p><h6>Incsq123456</h6></div><div class="mr-2"><p>Policy number</p><h6>Incsq123456</h6></div></div><div class="expanded-table-normal-cell"><div class="mr-2 mb-3 d-flex"><div class="highlighted-alpha"> A</div><div><p>Agent / Broker</p><h6>Abcd Enterprices</h6></div></div><div class="mr-2 d-flex"> <img src="../../images/faces/face5.jpg" alt="profile"/><div><p>Policy holder Name & ID Number</p><h6>Phillip Harris / 1234567</h6></div></div></div><div class="expanded-table-normal-cell"><div class="mr-2 mb-4"><p>Branch</p><h6>Koramangala, Bangalore</h6></div></div><div class="expanded-table-normal-cell"><div class="mr-2 mb-4"><p>Channel</p><h6>Online</h6></div></div></div></div></td>'
          '</tr>'+
      '</table>';
  }
  var table = $('#example').DataTable( {
    "ajax": "js/data.txt",
    "columns": [
        { "data": "Quote" },
        { "data": "Product" },
        { "data": "Business" },
        { "data": "Policy" }, 
        { "data": "Premium" }, 
        { "data": "Status" }, 
        { "data": "Updated" }, 
        {
          "className":      'details-control',
          "orderable":      false,
          "data":           null,
          "defaultContent": ''
        }
    ],
    "order": [[1, 'asc']],
    "paging":   false,
    "ordering": true,
    "info":     false,
    "filter": false,
    columnDefs: [{
      orderable: false,
      className: 'select-checkbox',
      targets: 0
    }],
    select: {
      style: 'os',
      selector: 'td:first-child'
    }
  } );
$('#example tbody').on('click', 'td.details-control', function () {
  var tr = $(this).closest('tr');
  var row = table.row( tr );

  if ( row.child.isShown() ) {
      // This row is already open - close it
      row.child.hide();
      tr.removeClass('shown');
  }
  else {
      // Open this row
      row.child( format(row.data()) ).show();
      tr.addClass('shown');
  }
} );
  
  });
})(jQuery);