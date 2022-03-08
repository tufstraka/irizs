const padding = 50;
const w = 1000;
const h = 1000;

document.addEventListener('DOMContentLoaded',function(){
    
    document.getElementById('getMessage').onclick= () => {
      
        fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
        .then(response => response.json())
        .then(data => {
            let country_data = data.data
            
            let html = "";
            //console.log(country_data)
            
        
            
            //d3 visualisation
            const min_date = d3.min(country_data, (d) => d[0])
            const max_date = d3.max(country_data, (d) => d[0])
            console.log(min_date)
            console.log(max_date)
            const min_gdp_val = d3.min(country_data, (d) => d[1]);
            const max_gdp_val = d3.max(country_data, (d) => d[1])
            console.log(min_gdp_val)
            console.log(max_gdp_val)

            const yscale = d3.scaleLinear()
                        .domain([0, max_gdp_val])
                        .range([h - padding, padding]);
            const xscale = d3.scaleLinear()
                        .domain([0 , max_date])
                        .range([padding , w - padding]);            
            const xaxis = d3.axisBottom(xscale)
            const yaxis = d3.axisLeft(yscale)            
            const svg = d3.select("section")
                        .append("svg")
                        .attr("width", w)
                        .attr("height", h);

                    // to work on visualization later
                    svg.selectAll("rect")
                        .data(country_data[1])
                        .enter()
                        .append("rect")
                        .attr("class" , "bar")
                        .attr("x", (d, i) =>i*30)
                        .attr("y", (d, i) =>  d)
                        .attr("width", 800)
                        .attr("height", 800)
                        .attr("fill", "#B4D8D8")

                    svg.append("g")
                        .attr("transform", "translate(0," + (h - padding) + ")")
                        .call(xaxis.tickFormat(d3.timeFormat("%Y-%m-%d")));
                    svg.append("g")
                        .attr("transform", "translate(" + padding + ",0)")
                        .call(yaxis)


            country_data.forEach(function(val) {

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


        