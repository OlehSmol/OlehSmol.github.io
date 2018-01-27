import * as d3 from "d3";

let width = 960, height = 570, padding = 50;

const scaleX = d3.scaleLinear()
    .domain([-150, 280])
    .range([padding, width-padding]);

const scaleY = d3.scaleLinear()
    .domain([-170, 180])
    .range([height-padding, padding]);

let color = d3.scaleThreshold()
    .domain([0,1,2,3,4,5,6])
    .range(["silver", "#8D7019",  "#003D2E", "#5B105B", "#8D5119", "#FFAA00", "#84182B"]);

function drawPCA(period) {
    d3.json("/data/data.json", (err, data) => {
        render(data.data);
});

    const render = (data) => {
        d3.selectAll("svg .country")
            .transition()
            .duration(3000)
            .attr("transform", d => "translate(" +  scaleX(d[period].x)  + ',' +  scaleY(d[period].y)+ ")");

        d3.selectAll("svg .country rect")
            .transition()
            .duration(3000)
            .attr("fill", d => color(d[period].cluster) )
    };
}

function initPCA(period) {
    const svg = d3.select(".tabs__content")
        .append("svg")
        .attr("width", width)
        .attr("height", height)

    d3.json("/data/data.json", (err, data) => {
        render(data.data);
    });

    const render = (data) => {
        let yAxis = d3.axisLeft()
            .scale(scaleY);

        let xAxis = d3.axisBottom()
            .scale(scaleX);
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate("+padding+",0)")
            .call(yAxis);

        svg.append("g")
            .attr("class", "xaxis axis")  // two classes, one for css formatting, one for selection below
            .attr("transform", "translate(0," + (height - padding) + ")")
            .call(xAxis);

        const countries = svg
            .selectAll(".country")
            .data(data)
            .enter()
            .append('g')
            .attr("class", "country")
            .attr("transform", d => "translate(" +  scaleX(d[period].x)  + ',' +  scaleY(d[period].y)+ ")")
            .on('mousemove',function(d){
                d3.select(this).raise();
            })

        countries
            .append("rect")
            .attr("width", 50)
            .attr("height", 30)
            .attr("fill", d => color(d[period].cluster) )
            .attr("opacity", 0.7)
            .attr('rx', 10)
            .on('mousemove',function(d){
                d3.select(this)
                    .style("opacity", 1);
            })
            .on('mouseout', function(d){
                d3.select(this)
                    .style("opacity", 0.8);
            });

        countries
            .append("text")
            .data(data)
            .text(d => d.country)
            .attr("transform", "translate(5, 20)")
            .attr('pointer-events', 'none')
            .attr("font-size", "20px");
    };
}

export default {initPCA, drawPCA};
