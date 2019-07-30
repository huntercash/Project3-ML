var tbody = d3.select("tbody");

const collegeTable = d3.json("api/institutions.json").then(function(d) {
    d.institution_name = d.institution_name,    
    d.street = d.street,
    d.state = d.state,
    d.website = d.website,
    d.zipcode = +d.zipcode

    for (x = 0; x < d.length; x++) {
       var row = tbody.append("tr");
        Object.entries(d[x]).forEach(([key, value]) =>
        row.append("td").text(value));
    }
});

$("#search").on("keyup", function() {
    var value = $(this).val();

    $("table tr").each(function(index) {
        if (index !== 0) {

            $row = $(this);

            var id = $row.find("td:first").text();

            if (id.indexOf(value) !== 0) {
                $row.hide();
            }
            else {
                $row.show();
            }
        }
    });
});