import * as d3 from "d3";

let width = 960, height = 570;

let color = d3.scaleThreshold()
    .domain([0,1,2,3,4,5,6])
    .range(["silver", "black", "yellow", "brown", "orange", "blue", "green"]);

let projection = d3.geoMercator()
    .scale(130)
    .translate( [width / 2, height / 1.5]);

let path = d3.geoPath().projection(projection);

function drawMap(period) {
    d3.queue()
        .defer(d3.json, "/data/world_countries.json")
        .defer(d3.json, "/data/data.json")
        .await(ready);

    function ready(error, map_data, clusters) {
        let populationById = {};
        console.log(clusters)
        clusters.data.forEach(function(d) { populationById[d.country] = + d[period].cluster;});
        map_data.features.forEach(function(d) { populationById[d.id] ? d.cluster = populationById[d.id] : d.cluster = -1 });
        d3.selectAll("svg .map path")
            .data(map_data.features)
            .transition()
            .delay(500)
            .style("fill", function(d) { return color(d.cluster); })

    }
}

function initMap(period) {
    let svg = d3.select(".tabs__content")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append('g')
        .attr('class', 'map');
    console.log(svg)
    d3.queue()
        .defer(d3.json, "/data/world_countries.json")
        .defer(d3.json, "/data/data.json")
        .await(ready);

    function ready(error, data, population) {
        let populationById = {};
        console.log(population)
        population.data.forEach(function(d) { populationById[d.country] = + d[period].cluster;});
        data.features.forEach(function(d) { populationById[d.id] ? d.cluster = populationById[d.id] : d.cluster = -1 });

        svg.append("g")
            .attr("class", "countries")
            .selectAll("path")
            .data(data.features)
            .enter().append("path")
            .attr("d", path)
            .style("fill", function(d) { return color(d.cluster); })
            .style('stroke', 'white')
            .style('stroke-width', 1.5)
            .style("opacity",0.8)
            .style("stroke","white")
            .style('stroke-width', 0.3)
    }
}

export default {initMap, drawMap};

