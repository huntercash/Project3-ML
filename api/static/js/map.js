var url = "https://raw.githubusercontent.com/shawnbot/topogram/master/data/us-states.geojson";
var geojson_total;
var geojson_avg;

d3.json(url, function (new_data) {
  console.log(new_data)

  var myMap = L.map("map", {
    center: [39.50, -98.35],
    zoom: 5
  });


  // Adding a tile layer (the background map image) to our map
  // We use the addTo method to add objects to our map
  // var mapbox_streets = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  //   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  //   maxZoom: 20,
  //   id: "mapbox.streets",
  //   accessToken: API_KEY
  // }).addTo(myMap);

  var light = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 20,
    id: "mapbox.light",
    accessToken: API_KEY
  });

  var dark = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 20,
    id: "mapbox.dark",
    accessToken: API_KEY
  }).addTo(myMap);


  // path to data from DB or url for total data
  var loansURL = "../static/js/clean_data/loans_by_state.json";

  // getting data from RESTfull API for total student loan
  d3.json(loansURL, function (loans_data) {
    // console.log(loans_data)

    // adding total student loan info into geoJson object
    for (i = 0; i < new_data.features.length; i++) {
      Object.entries(loans_data).forEach(([key, value]) => {
        if (value.City == new_data.features[i].properties.name) {
          new_data.features[i].properties.labelrank = value.Amount_loans_awarded;
          // console.log(new_data.features[i].properties.labelrank)
        }
      })
    }
    


    // // getting data from API of json file

    var avgURL = "../static/js/clean_data/avg_sl_debt_by_state.json"
   

    d3.json(avgURL, function (avg_data) {

     // adding total student loan info into geoJson object
    for (i = 0; i < new_data.features.length; i++) {
      Object.entries(avg_data).forEach(([key, value]) => {
        if (value.State == new_data.features[i].properties.name) {
          new_data.features[i].properties.name_len = value.avg_2019;
          // console.log(value.State)
          // console.log(value.avg_2019)
          // console.log(new_data.features[i].properties.name_len)
        }
      })
    }



      // creating layer for total student loan
      geojson_total = L.choropleth(new_data, {

        valueProperty: "labelrank",

        // Set color scale
        scale: ["#ffffb2", "#b10026"],

        // Number of breaks in step range
        steps: 10,

        // q for quartile, e for equidistant, k for k-means
        mode: "q",
        style: {
          // Border color
          color: "#fff",
          weight: 1,
          fillOpacity: 0.8
        },

       onEachFeature(feature, layer) {
          layer.on({
              mouseover: highlightFeature,
              mouseout: resetHighlight_total,
              click: zoomToFeature
          });
      }

      // }).addTo(myMap);
    });
   

       // adding hover code to layer

       function highlightFeature(e){
        var layer = e.target;

        layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7
        })

        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }
        info.update(layer.feature.properties);
      };

      function resetHighlight_total(e) {
        geojson_total.resetStyle(e.target);
        info.update();
      };
      
      function zoomToFeature(e) {
        map.fitBounds(e.target.getBounds());
      };

      // adding popup text on hover 

      var info = L.control();

      info.onAdd = function (map) {
          this._div = L.DomUtil.create('div', 'total_info'); // create a div with a class "info"
          this.update();
          return this._div;
      };

      // method that we will use to update the control based on feature properties passed
      info.update = function (props) {
          this._div.innerHTML = '<h4>Total Student Loan</h4><hr>' +  (props ?
              '<b>' + props.name + '</b><br />' + '$' + props.labelrank
              : 'Hover over a state');
      };

      info.addTo(myMap);

        // Binding a pop-up to each layer

      
      // creating layer for income
      geojson_avg = L.choropleth(new_data, {

        valueProperty: "name_len",

        // Set color scale
        scale: ["#ffffb2", "#016703"],

        // Number of breaks in step range
        steps: 10,

        // q for quartile, e for equidistant, k for k-means
        mode: "q",
        style: {
          // Border color
          color: "#fff",
          weight: 1,
          fillOpacity: 0.8
        },

        onEachFeature(feature, layer) {
          layer.on({
              mouseover: highlightFeature_avg,
              mouseout: resetHighlight_avg,
              click: zoomToFeature
          });
      }
      }).addTo(myMap);

    // adding code to hover over layer 
      function highlightFeature_avg(e){
        var layer = e.target;

        layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7
        })

        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }
        avg_info.update(layer.feature.properties);
      };

      function resetHighlight_avg(e) {
        geojson_avg.resetStyle(e.target);
        avg_info.update();
      };
      
      function zoomToFeature(e) {
        map.fitBounds(e.target.getBounds());
      };

      // adding popup text on hover 

      var avg_info = L.control();

      avg_info.onAdd = function (map) {
          this._div = L.DomUtil.create('div', 'avg_info'); // create a div with a class "info"
          this.update();
          return this._div;
      };

      // method that we will use to update the control based on feature properties passed

      avg_info.update = function (props) {
          this._div.innerHTML = '<h4>Average Student Loan</h4><hr>' +  (props ?
              '<b>' + props.name + '</b><br />' + '$' + props.name_len
              : 'Hover over a state');
      };


      avg_info.addTo(myMap);


      // adding few basemaps
          var baseMaps = {
            // "Streets map": mapbox_streets,
            "Light map": light,
            "Dark Map": dark
          };

          // Overlays that may be toggled on or off
          var overlayMaps = {
            "Total Federal Student Loans": geojson_total,
            "Average Student Loan": geojson_avg
          };

          
          // Pass our map layers into our layer control
          // Add the layer control to the map
          L.control.layers(baseMaps, overlayMaps, { collapsed: true}).addTo(myMap);
          
      
      
      
      //closing d3 call to income
    });



    //closing d3 call to total student loan
  });


  //closing d3 call to original geojson
});