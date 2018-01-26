import * as d3 from "d3";

let width = 960, height = 600;

const scaleX = d3.scaleLinear()
    .domain([-150, 280])
    .range([  0, width]);

const scaleY = d3.scaleLinear()
    .domain([-170, 180])
    .range([height, 0]);

let color = d3.scaleThreshold()
    .domain([0,1,2,3,4,5,6])
    .range(["silver", "black", "yellow", "brown", "orange", "blue", "green"]);

function drawPCA(period) {
    d3.json("/data/data.json", (err, data) => {
        render(data.data);
});

    const render = (data) => {
        d3.selectAll("svg .country")
            .transition()
            .duration(3000)
            .attr("transform", d => "translate(" +  scaleX(d[period].x)  + ',' +  scaleY(d[period].y)+ ")");

        d3.selectAll("svg .country circle")
            .data(data)
            .transition()
            .duration(3000)
            .style("fill", d => color(d[period].cluster));
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
        const countries = svg
            .selectAll(".country")
            .data(data)
            .enter()
            .append('g')
            .attr("class", "country")
            .attr("transform", d => "translate(" +  scaleX(d[period].x)  + ',' +  scaleY(d[period].y)+ ")");

        countries
            .append("circle")
            .data(data)
            .attr("r", 10)
            .attr("fill", d => color(d[period].cluster) );

        countries
            .append("rect")
            .attr("width", 42)
            .attr("height", 30)
            .attr("fill", 'yellow')
            .attr("opacity", 0.6)
            .attr("transform", "translate(" + 0 + ',' +  -20 + ")") //placing as the text background
            .attr('rx', 10)  // rounding edges

        countries
            .append("text")
            .data(data)
            .text(d => d.country)
    .attr("font-size", "20px");
    };
}

export default {initPCA, drawPCA};
