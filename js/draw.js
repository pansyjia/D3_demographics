var data = [];
var USER_SEX = "2",
    USER_RACESIMP = "1",
    USER_AGEGRP = "2";

var category_colors = {
    // TODO implement this based on what we did in class
    "married": { desc: "Married", color: "#5B7BE9" }, 
    "children": { desc: "Own children in Household", color: "#E0D22E" },
    "healthcare": { desc: "Has Healthcare Coverage", color: "#2CCEF6" },
    "college": { desc: "Bachelor's Degree or More", color: "#FB7F23" },
    "employed": { desc: "Employed", color: "#D63CA3" },
    "selfemp": { desc: "Self-employed<sup>*</sup>", color: "#c38014" },
    "publictrans": { desc: " Primarily Pub. Trans. to Work<sup>*</sup>", color: "#E24062" },
    "income_moremed": { desc: "Personal Income Above Nat. Med.", color: "#5BB923" },
    "inpoverty": { desc: "Below Poverty Line", color: "#555" },
    "isveteran": { desc: "Veteran", color: "#B190D0" },
    "bornoutus": { desc: "Born Outside US", color: "#bcc832" },
    "diffmovecog": { desc: "Cog. or Phys. Difficulty", color: "#ee7b9c" },
    "diffhearvis": { desc: "Hearing or Vis. Difficulty", color: "#f299b3"},
    "widowed": { desc: "Widowed", color: "#01d99f" },
}

$(document).ready(function () {
    loadData();
    wireButtonClickEvents();
});

// Loads the CSV file 
function loadData() {
    // load the demographics.csv file    
    // assign it to the data variable, and call the visualize function by first filtering the data
    // call the visualization function by first findingDataItem
    d3.csv("data/demographics.csv", function (d) {
        data = d;
        data.forEach(function (item) {
        item.n = parseInt(item.n);
        });

    visualizeSquareChart(findDataItem());

    });
}

// Finds the dataitem that corresponds to USER_SEX + USER_RACESIMP + USER_AGEGRP variable values
function findDataItem() {
    // you will find the SINGLE item in "data" array that corresponds to 
    //the USER_SEX (sex), USER_RACESIMP (racesimp), and USER_AGEGRP(agegrp) variable values
  

    //HINT: uncomment and COMPLETE the below lines of code
    var item = data.filter(function (d) {
        return d.sex == USER_SEX && d.racesimp == USER_RACESIMP && d.agegrp == USER_AGEGRP;
        
    });

    if (item.length == 1) {
       return item[0];
    }
    return null;

}

var bg_color = "#e0e0e0";

//Pass a single dataitem to this function by first calling findDataItem. visualizes square chart
function visualizeSquareChart(item) {

    // visualize the square plot per attribute in the category_color variable

    //HINT: you will iterate through the category_colors variable and draw a square chart for each item
    var fields = d3.keys(category_colors)

    // Dimensions of chart
    var margin = { top: 0, right: 0, bottom: 0, left: 6 },
    width = 134 - margin.left - margin.right,
    height = 134 - margin.top - margin.bottom; 

    var x = d3.scaleLinear()
            .rangeRound([0, width]);
    var y = d3.scaleLinear()
            .rangeRound([0, height]);
    var format = d3.format(",d");


    fields.forEach(function(v,i) {


        var window_width = parseInt(d3.select('#chart1').style('width'), 10);
        if (window_width > 400) {
            var holder_width = (width+margin.left+margin.right)+"px";
        } else {
            var holder_width = "50%";
        }

        var div = d3.select("#chart1").append("div")
                .attr("id", "holder" + v)
                .attr("class", "chartholder")
                .style("width", holder_width)
       
        div.append("h6").html(category_colors[v].desc)

        var svg = div.append("svg")
                .attr("class", "squarepie")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                // .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
        var rectWidth = 12.3;

        var cell = svg.append("g")
                .attr("id", "vf"+v)
                .selectAll(".cell")
                .enter().append("g")
                .attr("class", "cell")
        
            cell.append("rect")
                .data(d3.range(100).reverse())
                .enter().append("rect")
                .attr("x", function (d, i) {
                            return rectWidth * (i %10);
                })
                .attr("y", function (d, i) {
                            return rectWidth * Math.floor(i / 10);
                }) 
                .attr("height", rectWidth)
                .attr("width", rectWidth)
                .attr("stroke", "white")
                .style("fill", function(d,i) {
                    if (i < (100-item[v])) {
                        return bg_color;
                    } else {
                        return category_colors[v].color;
                    }
                });
        

    });
        

    // Update the count div whose id is "n" with item.total    
    d3.select("#n").text(format(item.total));



}


//EXTRA CREDITS
function wireButtonClickEvents() {
    // We have three groups of button, each sets one variable value. 
    //The first one is done for you. Try to implement it for the other two groups

    //SEX
    d3.selectAll("#sex .button").on("click", function () {
        USER_SEX = d3.select(this).attr("data-val");
        d3.select("#sex .current").classed("current", false);
        d3.select(this).classed("current", true);
        $("#chart1").empty();
        // TODO: find the data item and invoke the visualization function
       
    });

    // RACE
    d3.selectAll("#racesimp .button").on("click", function () {
        USER_SEX = d3.select(this).attr("data-val");
        d3.select("#racesimp .current").classed("current", false);
        d3.select(this).classed("current", true);
        $("#chart1").empty();
    });

    //AGEGROUP
    d3.selectAll("agegrp .button").on("click", function () {
        USER_SEX = d3.select(this).attr("data-val");
        d3.select("#agegrp .current").classed("current", false);
        d3.select(this).classed("current", true);   
        $("#chart1").empty();
    });


}



