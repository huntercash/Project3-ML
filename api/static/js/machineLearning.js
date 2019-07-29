function buildMetadata(sample) {
  // @TODO: Complete the following function that builds the metadata panel
  // Use `d3.json` to fetch the metadata for a sample 
  const url = "../static/test.json"; //get the url for the API
  d3.json(url).then((sampleNames) => {
    console.log(sample)
    // Use d3 to select the panel with id of `#sample-metadata`
    var sample_metadata = d3.select("#sample-metadata");
      // Clear existed data
      sample_metadata.html("");
    
           var row = sample_metadata.append("tr");
            Object.entries(sample).forEach(([key, value]) =>
            row.append("td").text(key));
            // row.append("td").text(value));
    });
}

function buildcard(sample) {
  // @TODO: Complete the following function that builds the metadata panel
  // Use `d3.json` to fetch the metadata for a sample 
  const url = "../static/test.json"; //get the url for the API
  d3.json(url).then((sampleNames) => {
    // Use d3 to select the panel with id of `#sample-metadata`
    var sample_summary = d3.select("#sample-summary");
      // Clear existed data
      sample_summary.html("");
    
           var row = sample_summary.append("p");
            Object.entries(sample).forEach(([key, value]) => {
              console.log(sample.key)
              
               if ( key == "Logo_URL") {
                row.append("p").text(`${value}`);
               }
               if (key =="institution_name"|| key == "Motto") {
                row.append("p").text(`${value}`);
               }
              //  if (key =="institution_name"|| key == "Motto") {
              //   row.append("td").text(`${value}`);
              //  }
            });

            // row.append("td").text(value));
    });
}



// Build the chart 
function buildCharts(sample) {
   
    // Build a Line Chart

    d3.json("../static/test.json").then((sample) => { 
        var lineYValues = []
      
        sample.forEach(function(row){
          lineYValues.push(row["Income 1 year after Graduation"])
          lineYValues.push(row["Income 4 year after Graduation"])
          lineYValues.push(row["Income 6 year after Graduation"])
          lineYValues.push(row["Income 8 year after Graduation"])
          lineYValues.push(row["Predicted Income"])
        }) 

      var lineXValues = [1,4,6,8,10];
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
  d3.json("../static/test.json").then((sampleNames) => {
    sampleNames.forEach((sample) => {

      selector
        .append("option")
        .text(sample.institution_name)
        .property("value", sample.institution_name);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
    buildcard(firstSample);
  });
}

// Function to create the new chart on change
// function optionChanged(newSample) {
//   // Fetch new data each time a new sample is selected
//   buildCharts(newSample);
//   buildMetadata(newSample);
// }

// Initialize the dashboard
init();

