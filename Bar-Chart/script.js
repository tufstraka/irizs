const padding = 45;
const barWidth = 3;
const w = 1100;
const h = 1000;


document.addEventListener('DOMContentLoaded',function(){

    document.getElementById('getMessage').onclick= () => {
      
        fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
        .then(response => response.json())
        .then(data => {
            let gdp_data = data.data.map((item) => item[1])
            let years = data.data.map((item) => new Date(item[0]));
            let scaledGDP = [];

            let tooltip = d3.select('section')
                .append('div')
                .attr('id' , 'tooltip')
                .style('opacity' , 0)
                
            let overlay = d3.select('section')
                .append('div')
                .attr('class', 'overlay')
                .style('opacity', 0);                

            

            //d3 visualisation
            const min_date = d3.min(years)
            const max_date = d3.max(years)
            
            const min_gdp_val = d3.min(gdp_data);
            const max_gdp_val = d3.max(gdp_data)
            

            const yscale = d3.scaleLinear()
                        .domain([0, max_gdp_val])
                        .range([h - padding, padding]);

            scaledGDP = gdp_data.map((item) => (yscale(item) - padding))
                       
           
            const xscale = d3.scaleTime()
                        .domain([min_date , max_date])
                        .range([padding , w - padding]);

                                    
            const xaxis = d3.axisBottom(xscale)
            const yaxis = d3.axisLeft(yscale)            
            const svg = d3.select("section")
                        .append("svg")
                        .attr("width", w)
                        .attr("height", h);

                    // to work on visualization later
                    svg.selectAll("rect")
                        .data(scaledGDP)
                        .enter()
                        .append("rect")
                        .attr("x", function(d, i){ return xscale(years[i])})
                        .attr("y", (d) => {
                            return h - (padding + d);
                        })
                        .attr("width", barWidth)
                        .attr("height", function( d , i) {return d})
                        .attr("data-date", (d , i) => data.data[i][0])
                        .attr("data-gdp", (d , i) => data.data[i][1])
                        .attr("class","bar")
                        .attr("index", (d , i) => i)
                        //.append("title")
                        //.text()
                        //.on('mouseover' , )

                    svg.append("g")
                        .attr("transform", "translate(0," + (h - padding) + ")")
                        .attr("id", "x-axis")
                        .call(xaxis);

                    svg.append("g")
                        .attr("transform", "translate(" + padding + ",0)")
                        .attr("id", "y-axis")
                        .call(yaxis)
        
        })
      
    };

});


        