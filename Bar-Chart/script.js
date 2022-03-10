const padding = 50;
const w = 1000;
const h = 1000;

document.addEventListener('DOMContentLoaded',function(){

    document.getElementById('getMessage').onclick= () => {
      
        fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
        .then(response => response.json())
        .then(data => {
            let gdp_data = data.data
            
            let html = "";
            console.log(gdp_data)

            
            
        
            
            //d3 visualisation
            const min_date = d3.min(gdp_data, (d) => parseInt(d[0].substring(0,4)))
            const max_date = d3.max(gdp_data, (d) => parseInt(d[0].substring(0,4)))
            console.log(min_date)
            console.log(max_date)
            const min_gdp_val = d3.min(gdp_data, (d) => d[1]);
            const max_gdp_val = d3.max(gdp_data, (d) => d[1])
            console.log(min_gdp_val)
            console.log(max_gdp_val)

            const yscale = d3.scaleLinear()
                        .domain([0, max_gdp_val])
                        .range([h - padding, padding]);
            console.log(yscale(300))            
            const xscale = d3.scaleLinear()
                        .domain([min_date , max_date])
                        .range([padding , w - padding]);
            console.log( xscale(5))                        
            const xaxis = d3.axisBottom(xscale)
            const yaxis = d3.axisLeft(yscale)            
            const svg = d3.select("section")
                        .append("svg")
                        .attr("width", w)
                        .attr("height", h);

                    // to work on visualization later
                    svg.selectAll("rect")
                        .data(gdp_data)
                        .enter()
                        .append("rect")
                        .attr("x", function(d, i){ return i*(6)})
                        .attr("y", (d , i) => h - d[1])
                        .attr("width", 3)
                        .attr("height", function( d , i) {return d[1]}) 
                        .attr("class","bar")
                        .append("title")
                        .text((d) => d[0])

                    svg.append("g")
                        .attr("transform", "translate(0," + (h - padding) + ")")
                        .attr("id", "x-axis")
                        .call(xaxis);
                    svg.append("g")
                        .attr("transform", "translate(" + padding + ",0)")
                        .attr("id", "y-axis")
                        .call(yaxis)


            gdp_data.forEach(function(val) {

                const keys = Object.keys(val);
                html += "<div class = 'data'>";

                keys.forEach(function(key) {
                    
                    html += "<strong>" + key + "</strong>: " + val[key] + "<br>";
                });

                html += "</div><br>";
            });

            document.getElementById('message').innerHTML = html;
        })
      
    };

});


        