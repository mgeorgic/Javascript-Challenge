// from data.js
var tableData = data;

// Setup 
var tbody = d3.select("tbody");
var button = d3.select("#filter-btn");
var inputField1 = d3.select("#datetime");
var inputField2 = d3.select("#city");
var inputField3 = d3.select("#state");
var resetbtn = d3.select("#reset-btn");
var columns = ["datetime", "city", "state", "country", "shape", "durationMinutes", "comments"]

// Populate the Data Table for columns names and rows
var populate = (dataInput) => {

	dataInput.forEach(ufo_sightings => {
		var row = tbody.append("tr");
		columns.forEach(column => row.append("td").text(ufo_sightings[column]))
	});
}

populate(data)

// Filter by date and city
// Create event handler and prevents automatic refresh
// Fetch the value of the input
button.on("click", () => {
	d3.event.preventDefault();
	var inputDate = inputField1.property("value").trim();
	var inputCity = inputField2.property("value").toLowerCase().trim();
	var inputState = inputField3.property("value").toLowerCase().trim();

	// Filter by field matching input value
	var filterDate = data.filter(data => data.datetime === inputDate);
	var filterCity = data.filter(data => data.city === inputCity);
	var filterState = data.filter(data => data.state === inputState);
	var filterData = data.filter(data => data.datetime === inputDate && data.city === inputCity && data.state ===inputState);
	var filterDateCity = data.filter(data => data.city === inputCity && data.datetime == inputDate);
	var filterDateState = data.filter(data => data.datetime === inputDate && data.state ===inputState);
	var filterCityState = data.filter(data => data.city === inputCity && data.state ===inputState);
	
	// Populate the filtered search into data table
	tbody.html('');

	let response = {filterData, filterCity, filterState, filterDate}
	
	if (response.filterData.length !== 0) {populate(filterData);}
		else if (response.filterDate.length !==0) {populate(filterDate);}
		else if (response.filterCity.length !==0) {populate(filterCity);}
		else if (response.filterState.length !==0) {populate(filterState);}
		else if (response.filterDateCity.length !==0) {populate(filterDateCity);}
		else if (response.filterDateState.length !== 0) {populate(filterDateState);}
		else if (response.filterCityState.length !== 0) {populate(filterCityState);}
		else if (response.filterDate.length !== 0 || response.filterCity.length !== 0 || response.filterState.length !== 0) {
			populate(filterState) || populate(filterCity) || populate(filterDate);}
		else {
			tbody.append("tr").append("td").text("No UFO sightings in database...yet");}
})			

resetbtn.on("click", () => {
	tbody.html('');
	populate(data)
	console.log("Table reset")
})