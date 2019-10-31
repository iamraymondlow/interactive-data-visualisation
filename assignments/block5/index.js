const data = (function() {
        var json = null;
        $.ajax({
            'async': false,
            'global': false,
            'url': "stopActivity.json",
            'dataType': "json",
            'success': function (data) {
                json = data;
            }
        });
        return json;
    })();

// import data from 'stopActivity.json'

// Variables for Dashboard view
var vehicleType = document.getElementById('vehicleType')
var batchSize = document.getElementById('batchSize')
var industryType = document.getElementById('industryType')
var commodityType = document.getElementById('commodityType')
var placeType = document.getElementById('placeType')

var activityType = document.getElementById('activityType')
var busFirstActivity = document.getElementById('busFirstActivity')
var busSecondActivity = document.getElementById('busSecondActivity')
var busSecondLastActivity = document.getElementById('busSecondLastActivity')
var busLastActivity = document.getElementById('busLastActivity')
var freightFirstActivity = document.getElementById('freightFirstActivity')
var freightSecondActivity = document.getElementById('freightSecondActivity')
var freightSecondLastActivity = document.getElementById('freightSecondLastActivity')
var freightLastActivity = document.getElementById('freightLastActivity')


function createNonRadialChart(chartVariable, chartType, data, chartLabel) {
    new Chart(chartVariable, {
        type: chartType,
        data: {
            labels: chartLabel,
            datasets: [{
                data: data,
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                borderWidth: 1,
                lineTension: 0,
            }]
        },
        options: {
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    barThickness: 20,
                    ticks: {
                        beginAtZero: true
                    }
                }],
                yAxes: [{
                    barThickness: 10,
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}


function createRadialChart(chartVariable, chartType, data, chartLabel) {
    new Chart(chartVariable, {
        type: chartType,
        data: {
            labels: chartLabel,
            datasets: [{
                data: data,
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                borderWidth: 1
            }]
        },
        options: {
        legend: {
            display: true,
                position: 'left',
        },
    }
});
}

function calculateBatchSize() {
    var batchSize = data.reduce( (acc, o) => (acc[o.Batch] = (acc[o.Batch] || 0)+1, acc), {} );
    var keyValuePair = extractKeyValue(batchSize)

    return keyValuePair
}

function extractKeyValue(array) {
    var key = Object.keys(array)
    var value = Object.values(array)
    return [key, value]
}

function filterData(data, key, value) {
    var filteredData = data.filter(d => d[key] == value)
    return filteredData
}

function countOneHotEncodedField(data, fieldLabel) {
    var count = []
    for (var i=0; i<fieldLabel.length; i++) {
        count.push(countOccurrence(data, fieldLabel[i])[1]);
    }
    console.log(count)
    return count
}

function countOccurrence(data, fieldLabel) {
    var sum = data.reduce(function(sums, entry) {
        sums[entry[fieldLabel]] = (sums[entry[fieldLabel]] || 0) + 1
        return sums
        },{})
    return sum
}

const backgroundColor = ['rgba(230, 25, 75, 0.7)', 'rgba(60, 180, 75, 0.7)', 'rgba(255, 225, 25, 0.7)', 'rgba(0, 130, 200, 0.7)', 'rgba(245, 130, 48, 0.7)', 'rgba(145, 30, 180, 0.7)', 'rgba(70, 240, 240, 0.7)', 'rgba(240, 50, 230, 0.7)', 'rgba(210, 245, 60, 0.7)', 'rgba(250, 190, 190, 0.7)', 'rgba(0, 128, 128, 0.7)', 'rgba(230, 190, 255, 0.7)', 'rgba(170, 110, 40, 0.7)', 'rgba(255, 250, 200, 0.7)', 'rgba(128, 0, 0, 0.7)', 'rgba(170, 255, 195, 0.7)', 'rgba(128, 128, 0, 0.7)', 'rgba(255, 215, 180, 0.7)', 'rgba(0, 0, 128, 0.7)', 'rgba(128, 128, 128, 0.7)']
const borderColor = ['rgba(230, 25, 75, 1)', 'rgba(60, 180, 75, 1)', 'rgba(255, 225, 25, 1)', 'rgba(0, 130, 200, 1)', 'rgba(245, 130, 48, 1)', 'rgba(145, 30, 180, 1)', 'rgba(70, 240, 240, 1)', 'rgba(240, 50, 230, 1)', 'rgba(210, 245, 60, 1)', 'rgba(250, 190, 190, 1)', 'rgba(0, 128, 128, 1)', 'rgba(230, 190, 255, 1)', 'rgba(170, 110, 40, 1)', 'rgba(255, 250, 200, 1)', 'rgba(128, 0, 0, 1)', 'rgba(170, 255, 195, 1)', 'rgba(128, 128, 0, 1)', 'rgba(255, 215, 180, 1)', 'rgba(0, 0, 128, 1)', 'rgba(128, 128, 128, 1)']

const vehicleType_column = ['Articulated Vehicle', 'Cement Mixer', 'Truck-Crane', 'Mobile Crane', 'Others', 'Recovery Vehicle', 'Tipper', 'Single Unit', 'Truck', 'Truck-Detachable Trailer', 'Truck-Other', 'Bus']
const industryType_column = ['Accommodation','Agriculture','Manufacturing','RetailFB','RetailNonFB','Industry_Unknown','Construction','TransportStorage','Utilities','Wholesale','OtherServices','Mining']
const commodityType_column = ['PerishableFood','Metals','RubberPlastic','ConsolidatedItem','Machinery','ClothingTextiles','Vehicles','Mineral','Passengers','LiveAnimal','Chemicals','Miscellaneous','Sundry','WoodPaper','NonPerishableFood','Containers','Waste','Other','Pharmaceuticals','BondedGoods']
const placeType_column = ['Residence', 'Transfer', 'Retail', 'Headquarter', 'Factory','Warehouse', 'DistributionCenter', 'ContainerYard', 'IntermediateStorage', 'Natural', 'Construction', 'Facility', 'Park', 'Other']
const activityType_column = ['PickupCargo','DeliverCargo','Fail','PickupContainer','DropoffContainer','PickupTrailer','DropoffTrailer','ProvideService','Passenger','Fueling','Maintenance','Resting','Meal','Shift','OtherWork','Queuing','Personal','Other']

const batchSize_label = ['Batch 1','Batch 2','Batch 3','Batch 4','Batch 5']
const vehicleType_label = ['Articulated Vehicle', 'Cement Mixer', 'Truck-Crane', 'Mobile Crane', 'Others', 'Recovery Vehicle', 'Tipper', 'Single Unit', 'Truck', 'Truck-Detachable Trailer', 'Truck-Other', 'Bus']
const industryType_label = ['Accommodation','Agriculture','Manufacturing','Retail (F&B)','Retail (Non-F&B)','Unknown','Construction','Transport Storage','Utilities','Wholesale','Other Services','Mining']
const commodityType_label = ['Perishable Food','Metals','Rubber Plastic','Consolidated Item','Machinery','Clothing Textiles','Vehicles','Mineral','Passengers','Live Animal','Chemicals','Miscellaneous','Sundry','WoodPaper','Non-Perishable Food','Containers','Waste','Other','Pharmaceuticals','Bonded Goods']
const placeType_label = ['Residence', 'Transfer', 'Retail', 'Headquarter', 'Factory','Warehouse', 'Distribution Center', 'Container Yard', 'Intermediate Storage', 'Natural', 'Construction', 'Facility', 'Park', 'Other']
const activityType_label = ['Pickup Cargo','Deliver Cargo','Fail','Pickup Container','Dropoff Container','Pickup Trailer','Dropoff Trailer','Provide Service','Passenger','Fueling','Maintenance','Resting','Meal','Shift','Other Work','Queuing','Personal','Other']


if (batchSize) {
    var batchSizeKeyValue = calculateBatchSize()
    createNonRadialChart(batchSize, 'line', batchSizeKeyValue[1], batchSize_label)
}

if (vehicleType) {
    var vehicleTypeCount = countOneHotEncodedField(data, vehicleType_column)
    createNonRadialChart(vehicleType, 'bar', vehicleTypeCount, vehicleType_label)
}

if (industryType) {
    var industryTypeCount = countOneHotEncodedField(data, industryType_column)
    createRadialChart(industryType, 'doughnut', industryTypeCount, industryType_label)
}

if (commodityType) {
    var commodityTypeCount = countOneHotEncodedField(data, commodityType_column)
    createRadialChart(commodityType, 'pie', commodityTypeCount, commodityType_label)
}

if (placeType) {
    var placeTypeCount = countOneHotEncodedField(data, placeType_column)
    createNonRadialChart(placeType, 'horizontalBar', placeTypeCount, placeType_label)
}

if (activityType) {
    var activityTypeCount = countOneHotEncodedField(data, activityType_column)
    createNonRadialChart(activityType, 'bar', activityTypeCount, activityType_label)
}

if (busFirstActivity) {
    var filteredData = filterData(data, 'Bus', 1)
    var filteredData = filterData(filteredData, 'FirstStop', 1)
    var activityTypeCount = countOneHotEncodedField(filteredData, activityType_column)
    createRadialChart(busFirstActivity, 'pie', activityTypeCount, activityType_label)
}

if (busSecondActivity) {
    var filteredData = filterData(data, 'Bus', 1)
    var filteredData = filterData(filteredData, 'SecondStop', 1)
    var activityTypeCount = countOneHotEncodedField(filteredData, activityType_column)
    createRadialChart(busSecondActivity, 'pie', activityTypeCount, activityType_label)
}

if (busSecondLastActivity) {
    var filteredData = filterData(data, 'Bus', 1)
    var filteredData = filterData(filteredData, 'SecondLastStop', 1)
    var activityTypeCount = countOneHotEncodedField(filteredData, activityType_column)
    createRadialChart(busSecondLastActivity, 'pie', activityTypeCount, activityType_label)
}

if (busLastActivity) {
    var filteredData = filterData(data, 'Bus', 1)
    var filteredData = filterData(filteredData, 'LastStop', 1)
    var activityTypeCount = countOneHotEncodedField(filteredData, activityType_column)
    createRadialChart(busLastActivity, 'pie', activityTypeCount, activityType_label)
}

if (freightFirstActivity) {
    var filteredData = filterData(data, 'Bus', 0)
    var filteredData = filterData(filteredData, 'FirstStop', 1)
    var activityTypeCount = countOneHotEncodedField(filteredData, activityType_column)
    createRadialChart(freightFirstActivity, 'pie', activityTypeCount, activityType_label)
}

if (freightSecondActivity) {
    var filteredData = filterData(data, 'Bus', 0)
    var filteredData = filterData(filteredData, 'SecondStop', 1)
    var activityTypeCount = countOneHotEncodedField(filteredData, activityType_column)
    createRadialChart(freightSecondActivity, 'pie', activityTypeCount, activityType_label)
}

if (freightSecondLastActivity) {
    var filteredData = filterData(data, 'Bus', 0)
    var filteredData = filterData(filteredData, 'SecondLastStop', 1)
    var activityTypeCount = countOneHotEncodedField(filteredData, activityType_column)
    createRadialChart(freightSecondLastActivity, 'pie', activityTypeCount, activityType_label)
}

if (freightLastActivity) {
    var filteredData = filterData(data, 'Bus', 0)
    var filteredData = filterData(filteredData, 'LastStop', 1)
    var activityTypeCount = countOneHotEncodedField(filteredData, activityType_column)
    createRadialChart(freightLastActivity, 'pie', activityTypeCount, activityType_label)
}
