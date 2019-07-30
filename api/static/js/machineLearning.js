function buildCard(university) {
  console.log(university)
 
  d3.json(`/api/wiki/${university}`).then((data) => {
    console.log(data)
    // Use d3 to select the panel with id of `#university-metadata`
    var university_summary = d3.select("#university-summary");
      // Clear existed data
      university_summary.html("");
    
           var row = university_summary
           
            Object.entries(data).forEach(([key, value]) => {

              if (key =="ADM_RATE_ALL") {
                row.append("p").text(`Admission Rate: ${value}`);
               }
               if (key =="NICKNAME") {
                row.append("p").text(`Nickname: ${value}`);
               }
               if (key =="MOTTO") {
                row.append("p").text(`Motto: ${value}`);
               }
               if (key =="AGE_ENTRY") {
                row.append("p").text(`Age of Entry: ${value}`);
               }
               if (key =="YEAR_EST") {
                row.append("p").text(`Established: ${value}`);
               }
               if (key =="CAMPUS") {
                row.append("p").text(`Campus: ${value}`);
               }
               if (key =="GRAD_DEBT_MDN") {
                row.append("p").text(`Graduating Median Debt: ${value}`);
               }
               if (key =="CONTROL") {
                row.append("p").text(`Type: ${value}`);
               }
               if (key =="SAT_AVG_ALL") {
                row.append("p").text(`Average SAT Score: ${value}`);
               }
               if (key =="STUDENT_POP") {
                row.append("p").text(`Student Population: ${value}`);
               }
               if (key =="TUITIONFEE_IN") {
                row.append("p").text(`Tuition Fee IN: ${value}`);
               }
               if (key =="TUITIONFEE_OUT") {
                row.append("p").text(`Tuition Fee Out: ${value}`);
               }

            });
    });
}


function predictedIncome (university) {
  d3.json(`/api/model/${university}`).then((data) => { 
    var predicted_income= d3.select("#predicted-income");
      // Clear existed data
      var actualIncome = data[0].MEAN_EARN_10
      var predictedIncome = data[0].PREDICTED_INCOME

      

      predicted_income.html("");
           var row = predicted_income.append("tr");
            Object.entries(data[0]).forEach(([key, value]) => {
            if (key =="PREDICTED_INCOME") {
              row.append("p").text(`Predicted Mean Income: $ ${Math.round(value*1.21)}`);
             }
             if (key =="MEAN_EARN_10") {
              row.append("p").text(`Actual Mean Income: $ ${Math.round(value*1.21)}`);
             }
            
      })
      if (actualIncome > predictedIncome) {
        row.append("p").text(`Below Actual`)
        .attr('class', 'good');;
       }
       else {
        row.append("p").text(`Above Actual`)
        .attr('class', 'poor');
       }
  });
};


// Build the chart 
function buildCharts(university) {
    // Build a Line Chart
    d3.json(`/api/model/${university}`).then((data) => { 
      
        var lineYValues = []
       
        lineYValues.push(`${Math.round(data[0]["MEAN_EARN_6"]*1.21)}`)
        lineYValues.push(`${Math.round(data[0]["MEAN_EARN_8"]*1.21)}`)
        lineYValues.push(`${Math.round(data[0]["PREDICTED_INCOME"]*1.21)}`)
       

      var lineXValues = [6,8,10];
      var lineData = [{
        x: lineXValues,
        y: lineYValues,
        type: 'line',
      }];
      var lineLayout= {
        title: "Earnings After Years of Graduation ",
        xaxis: {
            title: "Years After Graduation"
          },
          yaxis: {
            title: "Earnings"
          }
      };
      console.log(lineYValues)
      console.log(lineXValues)

    // Show the graph on the ID of line in the html
    Plotly.newPlot('line', lineData, lineLayout);
    });
//   });   
};

// function to create the dropdown menu for the names
function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");
  // Use the list of university names to populate the select options
  d3.json("/api/id_and_name.json").then((universityNames) => {
    universityNames.forEach((university) => {

      selector
        .append("option")
        .text(university.INSTNM)
        .property("value", university.UNITID);
    });

    var firstSample = "100654"
    console.log(firstSample)
    buildCharts(firstSample);
    buildSummary(firstSample);
    buildCard(firstSample);
    predictedIncome(firstSample);
  });
}


// Function to create the new chart on change
function optionChanged(newUniversity) {
 
  // Fetch new data each time a new university is selected
  buildSummary(newUniversity);
  buildCharts(newUniversity);
  buildCard(newUniversity);
  predictedIncome(newUniversity);
  // buildMetadata(newUniversity);
  

}



function buildSummary(university) {

  d3.json(`/api/wiki/${university}`).then((data) => {


    // Use d3 to select the panel with id of `#university-metadata`
    var university_summary = d3.select("#summary");
      // Clear existed data
      university_summary.html("");
    
           var row = university_summary
           
            Object.entries(data).forEach(([key, value]) => {
              
               if ( key == "INSTNM") {
                row.append("h3").text(`${value}`);
               }
 
              if (key =="SNIPPET") {
                row.append("p").text(`${value}`);
               }

            });
    });
}

// Initialize the dashboard
init();


