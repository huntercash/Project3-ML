// plot 2, us debt bal by type
d3.csv("/static/csv/us_debt_bal_by_type.csv").then(function(us_debt_bal_by_type) {
  var loanType = []
  var loanSize = []

  us_debt_bal_by_type.forEach(function(row){
    row['Amount (in trillions)'] = +row['Amount (in trillions)']
    loanSize.push(row['Amount (in trillions)'])
    loanType.push(row['Loan Type'])
  })

  var data = [{
    values: loanSize,
    labels: loanType,
    type: "pie",
    marker: {

    }
  }]

  var layout = {
    title: "US Loan Size by Type (in trillions)",
    heigth: 400,
    width: 600
  }

  Plotly.newPlot('us_debt_bal_by_type', data, layout, {responsive: true});
});



// stu_loan_debt_snapshot TABLE Plot (plot 3)
// get the data
d3.csv("/static/csv/stu_loan_debt_snapshot.csv").then(function(stu_loan_debt_snapshot) {
  var details = []
  var amount = []

  stu_loan_debt_snapshot.forEach(function(row) {
    details.push(row['Details'])
    amount.push(row['Amount'])
  })

  var values = [details, amount]
  
  var data = [{
    type: 'table',
    header: {
      values: [["<b>DETAILS</b>"], ["<b>AMOUNT</b>"]],
      align: ["left", "center"],
      line: {width: 1, color: '#506784'},
      fill: {color: '#119DFF'},
      font: {family: "Arial", size: 12, color: "white"}
    },
    cells: {
      values: values,
      align: ["left", "center"],
      line: {color: "#506784", width: 1},
     fill: {color: ['#25FEFD', 'white']},
      font: {family: "Arial", size: 11, color: ["#506784"]}
    }
  }]
  
  Plotly.plot('table', data);
});


//plot 4
// yearly_portfolio_summary
// get the data
d3.csv("/static/csv/yearly_portfolio_summary.csv").then(function(yearly_portfolio_summary) {
      var years = [], directLoans = [], perkinsLoans = [], ffels  = [], totalLoans = []
      var dlRecipients = [], perkinsRecipients = [], ffelRecipients = [], totalRecipients = []

      yearly_portfolio_summary.forEach(function(row){

        row['Direct Loans'] = +row['Direct Loans']
        row['FFEL'] = +row['FFEL']
        row['Perkins'] = +row['Perkins']
        row[' Total loans'] = +row['Total loans']
        row['DL Recipients'] = +row['DL Recipients']
        row['FFEl Recipients'] = +row['FFEl Recipients']
        row['Perkins Recipients'] = +row['Perkins Recipients']
        row['Total Recipients'] = +row['Total Recipients']
        

        years.push(year = row['Year'])
        directLoans.push(dl = row['Direct Loans'])
        ffels.push(ffel = row['FFEL'])
        perkinsLoans.push(perkins = row['Perkins'])
        totalLoans.push(totalLoan = row[' Total loans'])
        dlRecipients.push(row['DL Recipients'])
        perkinsRecipients.push(row['Perkins Recipients'])
        ffelRecipients.push(row['FFEl Recipients'])
        totalRecipients.push(row['Total Recipients'])
      })


  var trace1 = {
    x: years,
    y: directLoans,
    type: 'line',
    name: 'Direct Loans'
  };

  var trace2 = {
    x: years,
    y: perkinsLoans,
    type: 'line',
    name: 'Perkins'
  };
  var trace3 = {
    x: years,
    y: ffels,
    type: 'line',
    name:'FFEL'
  };
  var trace4 = {
    x: years,
    y: totalLoans,
    type: 'line',
    name: 'Total Loans'
  };

  var data = [trace1, trace2, trace3, trace4];

  var layout = {
    title: 'Loans Outsanding by Loan Types',
    xaxis: {
      title: 'Year'
    },
    yaxis: {
      title: 'Amount (in billions)'
    }
  };

  Plotly.newPlot('yearly_portfolio_summary-1', data, layout, {responsive: true});


  var trace1 = {
    x: years,
    y: dlRecipients,
    type: 'line',
    name: 'Direct Loan'
  };

  var trace2 = {
    x: years,
    y: perkinsRecipients,
    type: 'line',
    name: 'Perkins'
  };
  var trace3 = {
    x: years,
    y: ffelRecipients,
    type: 'line',
    name: 'FFEL'
  };
  var trace4 = {
    x: years,
    y: totalRecipients,
    type: 'line',
    name: 'Total'
  };

  var data = [trace1, trace2, trace3, trace4];

  var layout = {
    title: 'Number of Recipeints by Loan Types',
    xaxis: {
      title: 'Year'
    },
    yaxis: {
      title: 'Amount (in millions)'
    }
  };

  Plotly.newPlot('yearly_portfolio_summary-2', data, layout, {responsive: true});
});


// plot 5 dl_status.csv
d3.csv("/static/csv/dl_status.csv").then(function(dl_status) {
  var years = [], inSchs = [], graces = [], forbears = [], defers = [], cummuls = [], repays = [], others = []

  dl_status.forEach(function(row){

    row['In-School'] = +row['In-School']
    row['Grace'] = +row['Grace']
    row['Repayment'] = +row['Repayment']
    row['Deferment'] = +row['Deferment']
    row['Forbearance'] = +row['Forbearance']
    row['Cumulative in Default'] = +row['Cumulative in Default']
    row['Other'] = +row['Other']

    years.push(row['Year'])
    inSchs.push(row['In-School'])
    graces.push(row['Grace'])
    repays.push(row['Repayment'])
    forbears.push(row['Forbearance'])
    defers.push(row['Deferment'])
    cummuls.push(row['Cumulative in Default'])
    others.push(row['Other'])


  })

  var trace1 = {
    x: years,
    y: inSchs,
    mode: 'lines',
    name: 'In-School'
  };
  
  var trace2 = {
    x: years,
    y: graces,
    mode: 'lines',
    name: 'Grace'
  };
  
  var trace3 = {
    x: years,
    y: repays,
    mode: 'lines',
    name: 'Repayment'
  };

  var trace4 = {
    x: years,
    y: forbears,
    mode: 'lines',
    name: 'Forbearance'
  };

  var trace5 = {
    x: years,
    y: defers,
    mode: 'lines',
    name: 'Deferment'
  };

  var trace6 = {
    x: years,
    y: others,
    mode: 'lines',
    name: 'Others'
  };

  var trace7 = {
    x: years,
    y: cummuls,
    mode: 'lines',
    name: 'Cummulative in Default'
  };
  
  var data = [trace1, trace2, trace3, trace4, trace5, trace6, trace7];
  
  var layout = {
    title: 'Direct Loan Portfolio by Loan Status ',
    xaxis: {
      title: 'Year'
    },
    yaxis: {
      title: 'Amount (in billions)'
    }
  };
  
  Plotly.newPlot('dl_status', data, layout, {responsive: true});

});


// Plot 6

d3.csv("/static/csv/serious_deliquency.csv").then(function(serious_deliquency) {
  var years = [], gen18 = [], gen30 = [], gen40 = [], gen50 = [], all = []

  serious_deliquency.forEach(function(row){

    gen18.push(row["18-29"] = +row["18-29"])
    gen30.push(row["30-39"] = +row["30-39"])
    gen40.push(row["40-49"] = +row["40-49"])
    gen50.push(row["50+"] = +row["50+"])
    years.push(row['Year'])
    
  })

  var trace1 = {
    x: years,
    y: gen18,
    mode: 'lines',
    name: '18-29'
  };
  
  var trace2 = {
    x: years,
    y: gen30,
    mode: 'lines',
    name: '30-39'
  };
  
  var trace3 = {
    x: years,
    y: gen40,
    mode: 'lines',
    name: '40-49'
  };

  var trace4 = {
    x: years,
    y: gen50,
    mode: 'lines',
    name: '50+'
  };

  var trace5 = {
    x: years,
    y: all,
    mode: 'lines',
    name: 'Total'
  };

  
  var data = [trace1, trace2, trace3, trace4, trace5];
  
  var layout = {
    title: 'Loans By Age Group',
    xaxis: {
      title: 'Year'
    },
    yaxis: {
      title: 'Amount (in billions)'
    }
  };
  
  Plotly.newPlot('serious_deliquency', data, layout);
});



