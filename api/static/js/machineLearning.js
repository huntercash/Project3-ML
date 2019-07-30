// function buildMetadata(university) {
//   // @TODO: Complete the following function that builds the metadata panel

//   const url = "/api/wiki/100654"; //get the url for the API
//   d3.json(`/api/wiki/${university}`).then((university) => {
//     // console.log(university)
//     // Use d3 to select the panel with id of `#university-metadata`
//     var university_metadata = d3.select("#university-metadata");
//       // Clear existed data
//       university_metadata.html("");
    
//            var row = university_metadata.append("tr");
//             Object.entries(university).forEach(([key, value]) =>
//             row.append("td").text(key));
//             // row.append("tr").text(value));
//     });
// }

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



// Build the chart 
function buildCharts(university) {
    // Build a Line Chart
    d3.json(`/api/wiki/${university}`).then((data) => { 
      console.log(data)
        var lineYValues = []
      
          lineYValues.push(data["MEAN_EARN_6"])
          lineYValues.push(data["MEAN_EARN_8"])
       

      var lineXValues = [6,8];
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
  });
}


// Function to create the new chart on change
function optionChanged(newUniversity) {
 
  // Fetch new data each time a new university is selected
  buildSummary(newUniversity);
  buildCharts(newUniversity);
  buildCard(newUniversity);
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
// buildMetadata();
buildCharts();
buildSummary();
buildCard();

