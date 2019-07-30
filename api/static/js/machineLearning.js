function buildMetadata(sample) {
  // @TODO: Complete the following function that builds the metadata panel
  // Use `d3.json` to fetch the metadata for a sample 
  const url = "/api/wiki/100654"; //get the url for the API
  d3.json(url).then((sample) => {
    // console.log(sample)
    // Use d3 to select the panel with id of `#sample-metadata`
    var sample_metadata = d3.select("#sample-metadata");
      // Clear existed data
      sample_metadata.html("");
    
           var row = sample_metadata.append("tr");
            Object.entries(sample).forEach(([key, value]) =>
            row.append("td").text(key));
            // row.append("tr").text(value));
    });
}

function buildCard(sample) {
 
  d3.json("/api/wiki/100654").then((sample) => {
    // Use d3 to select the panel with id of `#sample-metadata`
    var sample_summary = d3.select("#sample-summary");
      // Clear existed data
      sample_summary.html("");
    
           var row = sample_summary
           
            Object.entries(sample).forEach(([key, value]) => {

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
function buildCharts(sample) {
    // Build a Line Chart
    d3.json("/api/wiki/100654").then((sample) => { 
      console.log(sample)
        var lineYValues = []
      
        // sample.forEach(function(row){
          lineYValues.push(sample["MEAN_EARN_6"])
          lineYValues.push(sample["MEAN_EARN_8"])
        // }) 

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
  // Use the list of sample names to populate the select options
  d3.json("/api/id_and_name.json").then((sampleNames) => {
    sampleNames.forEach((sample) => {

      selector
        .append("option")
        .text(sample.INSTNM)
        .property("value", sample.UNITID);
    });
  });
}


// Function to create the new chart on change
function optionChanged(sample) {
  var unit= sample
  console.log(unit)
  // Fetch new data each time a new sample is selected
  buildCharts(sample);
  buildMetadata(sample);
}

function buildSummary(sample) {
 console.log(sample)
  const url=`/api/wiki/100654`;
  // console.log(url)
  
  d3.json(url).then((sample) => {
    console.log(sample)
    // Use d3 to select the panel with id of `#sample-metadata`
    var sample_summary = d3.select("#summary");
      // Clear existed data
      sample_summary.html("");
    
           var row = sample_summary
           
            Object.entries(sample).forEach(([key, value]) => {
              
               if ( key == "INSTNM") {
                row.append("h3").text(`${value}`);
               }
 
              if (key =="SNIPPET") {
                row.append("p").text(`${value}`);
               }

            });

            // row.append("td").text(value));
    });
}

// Initialize the dashboard
init();
// buildMetadata();
buildCharts();
buildSummary();
buildCard();

