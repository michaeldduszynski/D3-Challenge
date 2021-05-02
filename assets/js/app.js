// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 700;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

  var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


// Import Data from csv
d3.csv("assets/data/data.csv").then( healthData => {
  healthData.forEach( data => {
      data.state = data.state
      data.poverty = +data.poverty
      data.healthcare= +data.healthcare
      data.abbr = data.abbr
      });

  //Create scale functions
  var xLinearScale = d3.scaleLinear()
    .domain([8, d3.max(healthData, d => d.poverty)])
    .range([0, width]);

  var yLinearScale = d3.scaleLinear()
    .domain([3, d3.max(healthData, d => d.healthcare)])
    .range([height, 0]);
  
  //Create axis functions
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);


  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  chartGroup.append("g")
    .call(leftAxis);

  var circlesGroup = chartGroup.selectAll("circle")
    .data(healthData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", "15")
    .attr("fill", "purple")
    .style("text-anchor", "middle")
    .attr("opacity", ".75");

  var circlesGroup = chartGroup.selectAll()
    .data(healthData)
    .enter()
    .append("text")
    .attr("x", d => xLinearScale(d.poverty))
    .attr("y", d => yLinearScale(d.healthcare))
    .style("font-size", "13px")
    .style("text-anchor", "middle")
    .style('fill', 'white')
    .text(d => (d.abbr))

// Adding Tooltips  
  var toolTip = d3.tip()
    .attr("class", "toolTip")
    .offset([80, -60])
    .html( function (d) {
      return (`${d.state}<br>Poverty: ${d.poverty}%<br>HealthCare: ${d.healthcare}%`);
    });

  chartGroup.call(toolTip);

var toolTip = d3.select("body").append("div")

  .on("mouseout", (data, index) => {
      toolTip.hide(data);
    });


    chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 40)
    .attr("x", -50 - (height / 2))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .attr("font-family", "sans-serif")
    .attr("font-size", "20px")
    .style('stroke', 'Black')
    .text("Lacks Healthcare %");

    chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
    .attr("class", "axisText")
    .attr("font-family", "sans-serif")
    .attr("font-size", "20px")
    .style('stroke', 'Black')
    .text("Poverty %");

makeResponsive();

}).catch(function(error) {
  console.log(error);
});
  
