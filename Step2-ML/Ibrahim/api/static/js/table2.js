var tbody = d3.select("sample-metadata");

const collegeTable = d3.json("api/val_roi.json").then(function(d) {
    d.rank = +d.rank,    
    d.school_name = d.school_name,
    d.net_roi_20_year = +d.net_roi_20_year,
    d.total_4_year_cost_usd = +d.total_4_year_cost_usd,
    d.typical_years_to_graduate = +d.typical_years_to_graduate

    for (x = 0; x < d.length; x++) {
       var row = tbody.append("tr");
        Object.entries(d[x]).forEach(([key, value]) =>
        row.append("td").text(value));
    }
});