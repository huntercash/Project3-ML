function buildMetadata(sample) {
  // @TODO: Complete the following function that builds the metadata panel
  // Use `d3.json` to fetch the metadata for a sample 
  const url = "../static/test.json"; //get the url for the API
  d3.json(url).then((sampleNames) => {
    // Use d3 to select the panel with id of `#sample-metadata`
    var sample_metadata = d3.select("#sample-metadata");
      // Clear existed data
      sample_metadata.html("");
      // Use `Object.entries` to add each key and value pair to the panel
      Object.entries(sample).forEach(([key, value]) => {

        row = sample_metadata.append("p");
        row.text(`${key} : ${value}`);
      });
    });
}



// Build the chart 
function buildCharts(sample) {
   
    // Build a Line Chart

    d3.json("../static/test.json").then((sample) => { 
        var lineYValues = []
      
        sample.forEach(function(row){
        //   row['Amount (in trillions)'] = +row['Amount (in trillions)']
          lineYValues.push(row["Income 1 year after Graduation"])
          lineYValues.push(row["Income 4 year after Graduation"])
          lineYValues.push(row["Income 6 year after Graduation"])
          lineYValues.push(row["Income 8 year after Graduation"])
          lineYValues.push(row["Predicted Income"])
        })
        console.log(sample[0]) 
      var lineXValues = [1,4,6,8,10];
    //   var pieHover = data.otu_labels.slice(0,10);
      var lineData = [{
        x: lineXValues,
        y: lineYValues,
        // hovertext: pieHover,
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

    // Show the graph on the ID of pie in the html
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

//table for additional school info

// d3.json('data.json', function (error,data) {

//     function tabulate(data, columns) {
//           var table = d3.select('body').append('table')
//           var thead = table.append('thead')
//           var	tbody = table.append('tbody');
  
//           // append the header row
//           thead.append('tr')
//             .selectAll('th')
//             .data(columns).enter()
//             .append('th')
//               .text(function (column) { return column; });
  
//           // create a row for each object in the data
//           var rows = tbody.selectAll('tr')
//             .data(data)
//             .enter()
//             .append('tr');
  
//           // create a cell in each row for each column
//           var cells = rows.selectAll('td')
//             .data(function (row) {
//               return columns.map(function (column) {
//                 return {column: column, value: row[column]};
//               });
//             })
//             .enter()
//             .append('td')
//               .text(function (d) { return d.value; });
  
//         return table;
//       }
  
//       // render the table(s)
//       tabulate(data, ['date', 'close']); // 2 column table
  
//   });
