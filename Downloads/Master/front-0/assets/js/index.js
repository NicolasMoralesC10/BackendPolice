var options = {
    chart: {
      type: 'line'
      
    },
    colors: ['#F44336', '#E91E63', '#9C27B0'],
    series: [{
      name: 'sales',
      data: [30,40,35,50,49,60,70,91,125]
    }],
    
    xaxis: {
      categories: [1991,1992,1993,1994,1995,1996,1997, 1998,1999]
    }
  }
  
  var chart = new ApexCharts(document.querySelector("#chart"), options);
  
  chart.render();

  var options = {
    chart: {
      type: 'line'
    },
    series: [{
      name: 'sales',
      data: [125,20,60,50,70,60,55,100,90]
    }],grid: {
        row: {
          colors: ['#F44336', '#E91E63', '#9C27B0']
        },
        column: {
          colors: ['#F44336', '#E91E63', '#9C27B0']
        }
      },
      
    xaxis: {
      categories: [2000,2001,2004,2004,2005,2006,2007,2008,2009]
    }
  }
  
  var chart = new ApexCharts(document.querySelector("#chart2"), options);
  
  chart.render();

  
