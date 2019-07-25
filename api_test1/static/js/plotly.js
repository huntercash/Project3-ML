function makeplot1() {
    Plotly.d3.json("/api/age_student_debt.json", function(data){ processData(data) } );
  
  function processData(allRows) {
      var year = [], a = [], b = [], c = [], d = [], e = [];
  
    for (var i=0; i < allRows.length; i++) {
      row = allRows[i];
      year.push( row['year'] );
      a.push( row['under_30'] );
      b.push( row['from_30_to_39'] );
      c.push( row['from_40_to_49'] );
      d.push( row['from_50_to_59'] );
      e.push( row['Over_60'] );
    }
    
    makePlotlyOne( year, a, b, c, d, e);
  }
  
  function makePlotlyOne( year, a, b, c, d, e){

    var plotDiv = document.getElementById("plot-1");

    var trace1 = {
      type: "bar",
      x: year,
      y: a,
      name: "Under 30",
    };

    var trace2 = {
      type: "bar",
      x: year,
      y: b,
      name: "30-39",
    };

    var trace3 = {
      type: "bar",
      x: year,
      y: c,
      name: "40-49",
    };

    var trace4 = {
      type: "bar",
      x: year,
      y: d,
      name: "50-59",
    };

    var trace5 = {
      type: "bar",
      x: year,
      y: e,
      name: "60+",
    };

    var traces = [trace1, trace2, trace3, trace4, trace5];

    var layout = {
      title: {
        text: 'Student Loans by Age',
        font: {
            size: 24
        }},
      barmode: 'stack',
      xaxis: {tickfont: {
          size: 14,
          color: '#000000'
        }},
      yaxis: {
        title: 'USD (billions)',
        titlefont: {
          size: 16,
          color: '#000000'
        },
        tickfont: {
          size: 14,
          color: '#000000'
        }
      }
    }

    Plotly.newPlot(plotDiv, traces, layout, {responsive: true});
  };
};
makeplot1();


function makeplot2() {
  Plotly.d3.json("api/Student_Debt_Income.json", function(data){ processData(data) } );

function processData(allRows) {
  var year = [], a = [], b = [], c = [];

  for (var i=0; i < allRows.length; i++) {
    row = allRows[i];
    year.push( row['subject'] );
    a.push( row['student_borrowing'] );
    b.push( row['male_pay'] );
    c.push( row['female_pay'] );
  }
  
  makePlotlyTwo( year, a, b, c);
}

function makePlotlyTwo(year, a, b, c){

  var plotDiv = document.getElementById("plot-2");

  var trace1 = {
    type: "bar",
    x: year,
    y: a,
    name: "Average Student Loan",
  };

  var trace2 = {
    type: "bar",
    x: year,
    y: c,
    name: "Female median pay",
  };

  var trace3 = {
    type: "bar",
    x: year,
    y: b,
    name: "Male median pay",
  };

  var traces = [trace1, trace2, trace3];

  var layout = {
    title: {
      text: '2017/2018 Average Student Loan vs Bachelor Degree Income vs Age',
      font: {
          size: 24
      }},
    xaxis: {tickfont: {
        size: 14,
        color: '#000000'
      }},
    yaxis: {
      title: 'USD',
      titlefont: {
        size: 16,
        color: '#000000'
      },
      tickfont: {
        size: 14,
        color: '#000000'
      }
    }
  }

  Plotly.newPlot(plotDiv, traces,layout, {responsive: true});
};
};
makeplot2();

function makeplot3() {
  Plotly.d3.json("/api/college_worth_it.json", function(data){ processData(data) } );

function processData(allRows) {
  var educational_attainment = [], unemployment_rate = [], median_pay = [];

  for (var i=0; i < allRows.length; i++) {
    row = allRows[i];
    educational_attainment.push( row['educational_attainment'] );
    unemployment_rate.push( row['unemployment_rate'] );
    median_pay.push( row['median_pay'] );
  }
  makePlotly( educational_attainment, unemployment_rate, median_pay);
}

function makePlotly(educational_attainment, unemployment_rate, median_pay){

  var plotDiv = document.getElementById("plot-3");

  var trace1 = {
    type: "bar",
    orientation: "h",
    x: median_pay,
    y: educational_attainment,
    name: "Median usual weekly earnings ($)",
  };

  var trace2 = {
    mode: "lines+markers",
    marker: {size:20},
    line: {width:5},
  //   orientation: "h",
    x: unemployment_rate,
    y: educational_attainment,
    xaxis: "x2",
    name: "Unemployment rate (%)",
  };

  var traces = [trace1, trace2];

  var layout = {
    // autosize: false,
    // width: 1000,
    // height: 600,
    legend: {
      xanchor: "right",
      orientation: "v",
      x: 0,
      y: 600
    },
    title: {
      text: 'Is College Worth it',
      font: {
          // family: "Courier New, monospace",
          size: 24},
          xanchor: "right",
          yanchor: "bottom",
          x: 0.3,
          y: 600
    },
    xaxis: {
      title: 'USD',
      automargin: true,
      tickangle: -45,
      tickfont: {
        size: 14,
        color: '#000000',
      }},
    yaxis: {
      automargin: true,
      titlefont: {
        size: 16,
        color: '#000000'
      },
      tickfont: {
        size: 14,
        color: '#000000'
      }
    },
  //   barmode: 'stack',
  //   barmode: 'group',
  //   bargap: 0.15,
  //   bargroupgap: 0.1,
    xaxis2: {
      title: '%',
      automargin: true,
      titlefont: {
        size: 16,
        color: '#000000'
      },
      // ticklen: 5,
      // showticklabels: false,
      tickfont: {
        size: 14,
        color: '#000000'
      },
      overlaying: 'x',
      side: 'top'
    }
  }

  Plotly.newPlot(plotDiv, traces,layout, {responsive: true});
};
};
makeplot3();