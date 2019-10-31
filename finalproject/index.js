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

// Variables for Dashboard view
var vehicleType = document.getElementById('vehicleType');
var batchSize = document.getElementById('batchSize');
var industryType = document.getElementById('industryType');
var commodityType = document.getElementById('commodityType');
var placeType = document.getElementById('placeType');

var activityType = document.getElementById('activityType');
var busFirstActivity = document.getElementById('busFirstActivity');
var busSecondActivity = document.getElementById('busSecondActivity');
var busSecondLastActivity = document.getElementById('busSecondLastActivity');
var busLastActivity = document.getElementById('busLastActivity');
var freightFirstActivity = document.getElementById('freightFirstActivity');
var freightSecondActivity = document.getElementById('freightSecondActivity');
var freightSecondLastActivity = document.getElementById('freightSecondLastActivity');
var freightLastActivity = document.getElementById('freightLastActivity');

var mapView = document.getElementById('mapContainer');

const rangeMax = 2000;
const rangeMin = 0;
const targetMax = 100;
const targetMin = 10;

function createNonRadialChart(chartVariable, chartType, data, chartLabel) {
    var newChart = new Chart(chartVariable, {
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
    return newChart;
}

function createRadialChart(chartVariable, chartType, data, chartLabel) {
    var newChart = new Chart(chartVariable, {
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
    return newChart;
}

function calculateBatchSize() {
    var batchSize = data.reduce( (acc, o) => (acc[o.Batch] = (acc[o.Batch] || 0)+1, acc), {} );
    var keyValuePair = extractKeyValue(batchSize);

    return keyValuePair;
}

function extractKeyValue(array) {
    var key = Object.keys(array);
    var value = Object.values(array);
    return [key, value];
}

function filterData(data, key, value) {
    var filteredData = data.filter(d => d[key] == value);
    return filteredData;
}

function countOneHotEncodedField(data, fieldLabel) {
    var count = [];
    for (var i=0; i<fieldLabel.length; i++) {
        count.push(countOccurrence(data, fieldLabel[i])[1]);
    }
    return count;
}

function countOccurrence(data, fieldLabel) {
    var sum = data.reduce(function(sums, entry) {
        sums[entry[fieldLabel]] = (sums[entry[fieldLabel]] || 0) + 1
        return sums;
    },{});
    return sum;
}

function scaleDuration(duration) {
    if (duration > rangeMax) {
        return 50;
    }
    else {
        var bubbleSize = ((duration - rangeMin) / (rangeMax - rangeMin)) * (targetMax - targetMin) + targetMin;
        return bubbleSize;
    }

}

function plotStopClusters(map, data, clusteringLayer, stopDurationObjects) {
    if (clusteringLayer) {
        map.removeLayer(clusteringLayer);
    }
    if (stopDurationObjects !== undefined || stopDurationObjects.length !== 0) {
        map.removeObjects(stopDurationObjects);
    }

    // First we need to create an array of DataPoint objects,
    // for the ClusterProvider
    var dataPoints = data.map(function (item) {
        return new H.clustering.DataPoint(item['StopLat'], item['StopLon']);
    });

    // Create a clustering provider with custom options for clusterizing the input
    var clusteredDataProvider = new H.clustering.Provider(dataPoints, {
        clusteringOptions: {
            // Maximum radius of the neighbourhood
            eps: 32,
            // minimum weight of points required to form a cluster
            minWeight: 2
        }
    });

    // Create a layer tha will consume objects from our clustering provider
    var clusteringLayer = new H.map.layer.ObjectLayer(clusteredDataProvider);

    // To make objects from clustering provder visible,
    // we need to add our layer to the map
    map.addLayer(clusteringLayer);

    return clusteringLayer;
}

function plotStopDuration(map, data, clusteringLayer, stopDurationObjects) {
    if (clusteringLayer) {
        map.removeLayer(clusteringLayer);
    }
    if (stopDurationObjects !== undefined || stopDurationObjects.length !== 0) {
        map.removeObjects(stopDurationObjects);
    }

    var stopDurationObjects = [];

    for (var i=0; i<data.length; i++) {
        var circle = new H.map.Circle(
            {lng: data[i]['StopLon'], lat: data[i]['StopLat']},
            scaleDuration(data[i]['StopDuration']),
            {style: {
                    strokeColor: 'rgba(192,0,0,1)',
                    fillColor: 'rgba(192,0,0,0.3)'
                }});
        stopDurationObjects.push(circle);
    }
    map.addObjects(stopDurationObjects);

    return stopDurationObjects;
}

const backgroundColor = ['rgba(230, 25, 75, 0.6)', 'rgba(60, 180, 75, 0.6)', 'rgba(255, 225, 25, 0.6)', 'rgba(0, 130, 200, 0.6)', 'rgba(245, 130, 48, 0.6)', 'rgba(145, 30, 180, 0.6)', 'rgba(70, 240, 240, 0.6)', 'rgba(240, 50, 230, 0.6)', 'rgba(210, 245, 60, 0.6)', 'rgba(250, 190, 190, 0.6)', 'rgba(0, 128, 128, 0.6)', 'rgba(230, 190, 255, 0.6)', 'rgba(170, 110, 40, 0.6)', 'rgba(255, 250, 200, 0.6)', 'rgba(128, 0, 0, 0.6)', 'rgba(170, 255, 195, 0.6)', 'rgba(128, 128, 0, 0.6)', 'rgba(255, 215, 180, 0.6)', 'rgba(0, 0, 128, 0.6)', 'rgba(128, 128, 128, 0.6)'];
const borderColor = ['rgba(230, 25, 75, 1)', 'rgba(60, 180, 75, 1)', 'rgba(255, 225, 25, 1)', 'rgba(0, 130, 200, 1)', 'rgba(245, 130, 48, 1)', 'rgba(145, 30, 180, 1)', 'rgba(70, 240, 240, 1)', 'rgba(240, 50, 230, 1)', 'rgba(210, 245, 60, 1)', 'rgba(250, 190, 190, 1)', 'rgba(0, 128, 128, 1)', 'rgba(230, 190, 255, 1)', 'rgba(170, 110, 40, 1)', 'rgba(255, 250, 200, 1)', 'rgba(128, 0, 0, 1)', 'rgba(170, 255, 195, 1)', 'rgba(128, 128, 0, 1)', 'rgba(255, 215, 180, 1)', 'rgba(0, 0, 128, 1)', 'rgba(128, 128, 128, 1)'];

const vehicleType_column = ['Articulated Vehicle', 'Cement Mixer', 'Truck-Crane', 'Mobile Crane', 'Others', 'Recovery Vehicle', 'Tipper', 'Single Unit', 'Truck', 'Truck-Detachable Trailer', 'Truck-Other', 'Bus'];
const industryType_column = ['Accommodation','Agriculture','Manufacturing','RetailFB','RetailNonFB','Industry_Unknown','Construction','TransportStorage','Utilities','Wholesale','OtherServices','Mining'];
const commodityType_column = ['PerishableFood','Metals','RubberPlastic','ConsolidatedItem','Machinery','ClothingTextiles','Vehicles','Mineral','Passengers','LiveAnimal','Chemicals','Miscellaneous','Sundry','WoodPaper','NonPerishableFood','Containers','Waste','Other','Pharmaceuticals','BondedGoods'];
const placeType_column = ['Residence', 'Transfer', 'Retail', 'Headquarter', 'Factory','Warehouse', 'DistributionCenter', 'ContainerYard', 'IntermediateStorage', 'Natural', 'Construction', 'Facility', 'Park', 'Other'];
const activityType_column = ['PickupCargo','DeliverCargo','Fail','PickupContainer','DropoffContainer','PickupTrailer','DropoffTrailer','ProvideService','Passenger','Fueling','Maintenance','Resting','Meal','Shift','OtherWork','Queuing','Personal','Other'];

const batchSize_label = ['Batch 1','Batch 2','Batch 3','Batch 4','Batch 5']
const vehicleType_label = ['Articulated Vehicle', 'Cement Mixer', 'Truck-Crane', 'Mobile Crane', 'Others', 'Recovery Vehicle', 'Tipper', 'Single Unit', 'Truck', 'Truck-Detachable Trailer', 'Truck-Other', 'Bus'];
const industryType_label = ['Accommodation','Agriculture','Manufacturing','Retail (F&B)','Retail (Non-F&B)','Unknown','Construction','Transport Storage','Utilities','Wholesale','Other Services','Mining'];
const commodityType_label = ['Perishable Food','Metals','Rubber Plastic','Consolidated Item','Machinery','Clothing Textiles','Vehicles','Mineral','Passengers','Live Animal','Chemicals','Miscellaneous','Sundry','WoodPaper','Non-Perishable Food','Containers','Waste','Other','Pharmaceuticals','Bonded Goods'];
const placeType_label = ['Residence', 'Transfer', 'Retail', 'Headquarter', 'Factory','Warehouse', 'Distribution Center', 'Container Yard', 'Intermediate Storage', 'Natural', 'Construction', 'Facility', 'Park', 'Other'];
const activityType_label = ['Pickup Cargo','Deliver Cargo','Fail','Pickup Container','Dropoff Container','Pickup Trailer','Dropoff Trailer','Provide Service','Passenger','Fueling','Maintenance','Resting','Meal','Shift','Other Work','Queuing','Personal','Other'];

if (batchSize) {
    var batchSizeKeyValue = calculateBatchSize();
    createNonRadialChart(batchSize, 'line', batchSizeKeyValue[1], batchSize_label);
};

if (vehicleType) {
    var filteredData = data;
    var vehicleTypeCount = countOneHotEncodedField(filteredData, vehicleType_column);
    var vehicleTypeChart = createNonRadialChart(vehicleType, 'bar', vehicleTypeCount, vehicleType_label);

    $('#vehicleType-dropdown a').on('click', function(){
        vehicleTypeChart.destroy();
        var selected = $(this).text();
        if (selected === 'Batch 1') {
            var value = 1;
            filteredData = filterData(data, 'Batch', value);
        }
        else if (selected === 'Batch 2') {
            var value = 2;
            filteredData = filterData(data, 'Batch', value);
        }
        else if (selected === 'Batch 3') {
            var value = 3;
            filteredData = filterData(data, 'Batch', value);
        }
        else if (selected === 'Batch 4') {
            var value = 4;
            filteredData = filterData(data, 'Batch', value);
        }
        else if (selected === 'Batch 5') {
            var value = 5;
            filteredData = filterData(data, 'Batch', value);
        }
        else {
            filteredData = data;
        }
        var vehicleTypeCount = countOneHotEncodedField(filteredData, vehicleType_column);
        vehicleTypeChart = createNonRadialChart(vehicleType, 'bar', vehicleTypeCount, vehicleType_label);
    })
};

if (industryType) {
    var filteredData = data;
    var industryTypeCount = countOneHotEncodedField(filteredData, industryType_column);
    var industryTypeChart = createRadialChart(industryType, 'doughnut', industryTypeCount, industryType_label);

    $('#industryType-dropdown a').on('click', function(){
        industryTypeChart.destroy();
        var selected = $(this).text();
        if (selected === 'Batch 1') {
            var value = 1;
            filteredData = filterData(data, 'Batch', value);
        }
        else if (selected === 'Batch 2') {
            var value = 2;
            filteredData = filterData(data, 'Batch', value);
        }
        else if (selected === 'Batch 3') {
            var value = 3;
            filteredData = filterData(data, 'Batch', value);
        }
        else if (selected === 'Batch 4') {
            var value = 4;
            filteredData = filterData(data, 'Batch', value);
        }
        else if (selected === 'Batch 5') {
            var value = 5;
            filteredData = filterData(data, 'Batch', value);
        }
        else {
            filteredData = data;
        }
        var industryTypeCount = countOneHotEncodedField(filteredData, industryType_column);
        industryTypeChart = createRadialChart(industryType, 'doughnut', industryTypeCount, industryType_label);
    })
};

if (commodityType) {
    var filteredData = data;
    var commodityTypeCount = countOneHotEncodedField(filteredData, commodityType_column);
    var commodityTypeChart = createRadialChart(commodityType, 'pie', commodityTypeCount, commodityType_label);

    $('#commodityType-dropdown a').on('click', function(){
        commodityTypeChart.destroy();
        var selected = $(this).text();
        if (selected === 'Batch 1') {
            var value = 1;
            filteredData = filterData(data, 'Batch', value);
        }
        else if (selected === 'Batch 2') {
            var value = 2;
            filteredData = filterData(data, 'Batch', value);
        }
        else if (selected === 'Batch 3') {
            var value = 3;
            filteredData = filterData(data, 'Batch', value);
        }
        else if (selected === 'Batch 4') {
            var value = 4;
            filteredData = filterData(data, 'Batch', value);
        }
        else if (selected === 'Batch 5') {
            var value = 5;
            filteredData = filterData(data, 'Batch', value);
        }
        else {
            filteredData = data;
        }
        var commodityTypeCount = countOneHotEncodedField(filteredData, commodityType_column);
        commodityTypeChart = createRadialChart(commodityType, 'pie', commodityTypeCount, commodityType_label);
    })
};

if (placeType) {
    var filteredData = data;
    var placeTypeCount = countOneHotEncodedField(filteredData, placeType_column);
    var placeTypeChart = createNonRadialChart(placeType, 'horizontalBar', placeTypeCount, placeType_label);

    $('#placeType-dropdown a').on('click', function() {
        placeTypeChart.destroy();
        var selected = $(this).text();
        if (selected === 'Batch 1') {
            var value = 1;
            filteredData = filterData(data, 'Batch', value);
        }
        else if (selected === 'Batch 2') {
            var value = 2;
            filteredData = filterData(data, 'Batch', value);
        }
        else if (selected === 'Batch 3') {
            var value = 3;
            filteredData = filterData(data, 'Batch', value);
        }
        else if (selected === 'Batch 4') {
            var value = 4;
            filteredData = filterData(data, 'Batch', value);
        }
        else if (selected === 'Batch 5') {
            var value = 5;
            filteredData = filterData(data, 'Batch', value);
        }
        else {
            filteredData = data;
        }
        var placeTypeCount = countOneHotEncodedField(filteredData, placeType_column);
        placeTypeChart = createNonRadialChart(placeType, 'horizontalBar', placeTypeCount, placeType_label);
    })
};

if (activityType) {
    var filteredData = data;
    var activityTypeCount = countOneHotEncodedField(filteredData, activityType_column);
    var activityTypeChart = createNonRadialChart(activityType, 'bar', activityTypeCount, activityType_label);

    $('#activityType-dropdown a').on('click', function() {
        activityTypeChart.destroy();
        var selected = $(this).text();
        if (selected === 'Articulated Vehicle') {
            filteredData = filterData(data, 'Articulated Vehicle', 1);
        }
        else if (selected === 'Cement Mixer') {
            filteredData = filterData(data, 'Cement Mixer', 1);
        }
        else if (selected === 'Mobile Crane') {
            filteredData = filterData(data, 'Mobile Crane', 1);
        }
        else if (selected === 'Recovery Vehicle') {
            filteredData = filterData(data, 'Recovery Vehicle', 1);
        }
        else if (selected === 'Tipper') {
            filteredData = filterData(data, 'Tipper', 1);
        }
        else if (selected === 'Single Unit') {
            filteredData = filterData(data, 'Single Unit', 1);
        }
        else if (selected === 'Truck') {
            filteredData = filterData(data, 'Truck', 1);
        }
        else if (selected === 'Truck-Crane') {
            filteredData = filterData(data, 'Truck-Crane', 1);
        }
        else if (selected === 'Truck-Detachable Trailer') {
            filteredData = filterData(data, 'Truck-Detachable Trailer', 1);
        }
        else if (selected === 'Truck-Other') {
            filteredData = filterData(data, 'Truck-Other', 1);
        }
        else if (selected === 'Bus') {
            filteredData = filterData(data, 'Bus', 1);
        }
        else if (selected === 'Others') {
            filteredData = filterData(data, 'Others', 1);
        }
        else {
            filteredData = data;
        }
        var activityTypeCount = countOneHotEncodedField(filteredData, activityType_column);
        activityTypeChart = createNonRadialChart(activityType, 'bar', activityTypeCount, activityType_label);
    })
};

if (busFirstActivity) {
    var filteredData = filterData(data, 'Bus', 1);
    var filteredData = filterData(filteredData, 'FirstStop', 1);
    var activityTypeCount = countOneHotEncodedField(filteredData, activityType_column);
    createRadialChart(busFirstActivity, 'pie', activityTypeCount, activityType_label);
};

if (busSecondActivity) {
    var filteredData = filterData(data, 'Bus', 1);
    var filteredData = filterData(filteredData, 'SecondStop', 1);
    var activityTypeCount = countOneHotEncodedField(filteredData, activityType_column);
    createRadialChart(busSecondActivity, 'pie', activityTypeCount, activityType_label);
};

if (busSecondLastActivity) {
    var filteredData = filterData(data, 'Bus', 1);
    var filteredData = filterData(filteredData, 'SecondLastStop', 1);
    var activityTypeCount = countOneHotEncodedField(filteredData, activityType_column);
    createRadialChart(busSecondLastActivity, 'pie', activityTypeCount, activityType_label);
};

if (busLastActivity) {
    var filteredData = filterData(data, 'Bus', 1);
    var filteredData = filterData(filteredData, 'LastStop', 1);
    var activityTypeCount = countOneHotEncodedField(filteredData, activityType_column);
    createRadialChart(busLastActivity, 'pie', activityTypeCount, activityType_label);
};

if (freightFirstActivity) {
    var filteredData = filterData(data, 'Bus', 0);
    filteredData = filterData(filteredData, 'FirstStop', 1);
    var activityTypeCount = countOneHotEncodedField(filteredData, activityType_column);
    var freightFirstActivityChart = createRadialChart(freightFirstActivity, 'pie', activityTypeCount, activityType_label);

    $('#freightFirstActivity-dropdown a').on('click', function() {
        freightFirstActivityChart.destroy();
        var selected = $(this).text();
        if (selected === 'Articulated Vehicle') {
            filteredData = filterData(data, 'Articulated Vehicle', 1);
            filteredData = filterData(filteredData, 'FirstStop', 1);
        }
        else if (selected === 'Cement Mixer') {
            filteredData = filterData(data, 'Cement Mixer', 1);
            filteredData = filterData(filteredData, 'FirstStop', 1);
        }
        else if (selected === 'Mobile Crane') {
            filteredData = filterData(data, 'Mobile Crane', 1);
            filteredData = filterData(filteredData, 'FirstStop', 1);
        }
        else if (selected === 'Recovery Vehicle') {
            filteredData = filterData(data, 'Recovery Vehicle', 1);
            filteredData = filterData(filteredData, 'FirstStop', 1);
        }
        else if (selected === 'Tipper') {
            filteredData = filterData(data, 'Tipper', 1);
            filteredData = filterData(filteredData, 'FirstStop', 1);
        }
        else if (selected === 'Single Unit') {
            filteredData = filterData(data, 'Single Unit', 1);
            filteredData = filterData(filteredData, 'FirstStop', 1);
        }
        else if (selected === 'Truck') {
            filteredData = filterData(data, 'Truck', 1);
            filteredData = filterData(filteredData, 'FirstStop', 1);
        }
        else if (selected === 'Truck-Crane') {
            filteredData = filterData(data, 'Truck-Crane', 1);
            filteredData = filterData(filteredData, 'FirstStop', 1);
        }
        else if (selected === 'Truck-Detachable Trailer') {
            filteredData = filterData(data, 'Truck-Detachable Trailer', 1);
            filteredData = filterData(filteredData, 'FirstStop', 1);
        }
        else if (selected === 'Truck-Other') {
            filteredData = filterData(data, 'Truck-Other', 1);
            filteredData = filterData(filteredData, 'FirstStop', 1);
        }
        else if (selected === 'Bus') {
            filteredData = filterData(data, 'Bus', 1);
            filteredData = filterData(filteredData, 'FirstStop', 1);
        }
        else if (selected === 'Others') {
            filteredData = filterData(data, 'Others', 1);
            filteredData = filterData(filteredData, 'FirstStop', 1);
        }
        else {
            filteredData = filterData(data, 'Bus', 0);
            filteredData = filterData(filteredData, 'FirstStop', 1);
        }
        var activityTypeCount = countOneHotEncodedField(filteredData, activityType_column);
        freightFirstActivityChart = createRadialChart(freightFirstActivity, 'pie', activityTypeCount, activityType_label);
    })
};

if (freightSecondActivity) {
    var filteredData = filterData(data, 'Bus', 0);
    filteredData = filterData(filteredData, 'SecondStop', 1);
    var activityTypeCount = countOneHotEncodedField(filteredData, activityType_column);
    var freightSeondActivityChart = createRadialChart(freightSecondActivity, 'pie', activityTypeCount, activityType_label);

    $('#freightSecondActivity-dropdown a').on('click', function() {
        freightSeondActivityChart.destroy();
        var selected = $(this).text();
        if (selected === 'Articulated Vehicle') {
            filteredData = filterData(data, 'Articulated Vehicle', 1);
            filteredData = filterData(filteredData, 'SecondStop', 1);
        }
        else if (selected === 'Cement Mixer') {
            filteredData = filterData(data, 'Cement Mixer', 1);
            filteredData = filterData(filteredData, 'SecondStop', 1);
        }
        else if (selected === 'Mobile Crane') {
            filteredData = filterData(data, 'Mobile Crane', 1);
            filteredData = filterData(filteredData, 'SecondStop', 1);
        }
        else if (selected === 'Recovery Vehicle') {
            filteredData = filterData(data, 'Recovery Vehicle', 1);
            filteredData = filterData(filteredData, 'SecondStop', 1);
        }
        else if (selected === 'Tipper') {
            filteredData = filterData(data, 'Tipper', 1);
            filteredData = filterData(filteredData, 'SecondStop', 1);
        }
        else if (selected === 'Single Unit') {
            filteredData = filterData(data, 'Single Unit', 1);
            filteredData = filterData(filteredData, 'SecondStop', 1);
        }
        else if (selected === 'Truck') {
            filteredData = filterData(data, 'Truck', 1);
            filteredData = filterData(filteredData, 'SecondStop', 1);
        }
        else if (selected === 'Truck-Crane') {
            filteredData = filterData(data, 'Truck-Crane', 1);
            filteredData = filterData(filteredData, 'SecondStop', 1);
        }
        else if (selected === 'Truck-Detachable Trailer') {
            filteredData = filterData(data, 'Truck-Detachable Trailer', 1);
            filteredData = filterData(filteredData, 'SecondStop', 1);
        }
        else if (selected === 'Truck-Other') {
            filteredData = filterData(data, 'Truck-Other', 1);
            filteredData = filterData(filteredData, 'SecondStop', 1);
        }
        else if (selected === 'Bus') {
            filteredData = filterData(data, 'Bus', 1);
            filteredData = filterData(filteredData, 'SecondStop', 1);
        }
        else if (selected === 'Others') {
            filteredData = filterData(data, 'Others', 1);
            filteredData = filterData(filteredData, 'SecondStop', 1);
        }
        else {
            filteredData = filterData(data, 'Bus', 0);
            filteredData = filterData(filteredData, 'SecondStop', 1);
        }
        var activityTypeCount = countOneHotEncodedField(filteredData, activityType_column);
        freightSeondActivityChart = createRadialChart(freightSecondActivity, 'pie', activityTypeCount, activityType_label);
    })
}

if (freightSecondLastActivity) {
    var filteredData = filterData(data, 'Bus', 0);
    filteredData = filterData(filteredData, 'SecondLastStop', 1);
    var activityTypeCount = countOneHotEncodedField(filteredData, activityType_column);
    var freightSecondLastActivityChart = createRadialChart(freightSecondLastActivity, 'pie', activityTypeCount, activityType_label);

    $('#freightSecondLastActivity-dropdown a').on('click', function() {
        freightSecondLastActivityChart.destroy();
        var selected = $(this).text();
        if (selected === 'Articulated Vehicle') {
            filteredData = filterData(data, 'Articulated Vehicle', 1);
            filteredData = filterData(filteredData, 'SecondLastStop', 1);
        }
        else if (selected === 'Cement Mixer') {
            filteredData = filterData(data, 'Cement Mixer', 1);
            filteredData = filterData(filteredData, 'SecondLastStop', 1);
        }
        else if (selected === 'Mobile Crane') {
            filteredData = filterData(data, 'Mobile Crane', 1);
            filteredData = filterData(filteredData, 'SecondLastStop', 1);
        }
        else if (selected === 'Recovery Vehicle') {
            filteredData = filterData(data, 'Recovery Vehicle', 1);
            filteredData = filterData(filteredData, 'SecondLastStop', 1);
        }
        else if (selected === 'Tipper') {
            filteredData = filterData(data, 'Tipper', 1);
            filteredData = filterData(filteredData, 'SecondLastStop', 1);
        }
        else if (selected === 'Single Unit') {
            filteredData = filterData(data, 'Single Unit', 1);
            filteredData = filterData(filteredData, 'SecondLastStop', 1);
        }
        else if (selected === 'Truck') {
            filteredData = filterData(data, 'Truck', 1);
            filteredData = filterData(filteredData, 'SecondLastStop', 1);
        }
        else if (selected === 'Truck-Crane') {
            filteredData = filterData(data, 'Truck-Crane', 1);
            filteredData = filterData(filteredData, 'SecondLastStop', 1);
        }
        else if (selected === 'Truck-Detachable Trailer') {
            filteredData = filterData(data, 'Truck-Detachable Trailer', 1);
            filteredData = filterData(filteredData, 'SecondLastStop', 1);
        }
        else if (selected === 'Truck-Other') {
            filteredData = filterData(data, 'Truck-Other', 1);
            filteredData = filterData(filteredData, 'SecondLastStop', 1);
        }
        else if (selected === 'Bus') {
            filteredData = filterData(data, 'Bus', 1);
            filteredData = filterData(filteredData, 'SecondLastStop', 1);
        }
        else if (selected === 'Others') {
            filteredData = filterData(data, 'Others', 1);
            filteredData = filterData(filteredData, 'SecondLastStop', 1);
        }
        else {
            filteredData = filterData(data, 'Bus', 0);
            filteredData = filterData(filteredData, 'SecondLastStop', 1);
        }
        var activityTypeCount = countOneHotEncodedField(filteredData, activityType_column);
        freightSecondLastActivityChart = createRadialChart(freightSecondLastActivity, 'pie', activityTypeCount, activityType_label);
    })
}

if (freightLastActivity) {
    var filteredData = filterData(data, 'Bus', 0);
    filteredData = filterData(filteredData, 'LastStop', 1);
    var activityTypeCount = countOneHotEncodedField(filteredData, activityType_column);
    var freightLastActivityChart = createRadialChart(freightLastActivity, 'pie', activityTypeCount, activityType_label);

    $('#freightLastActivity-dropdown a').on('click', function() {
        freightLastActivityChart.destroy();
        var selected = $(this).text();
        if (selected === 'Articulated Vehicle') {
            filteredData = filterData(data, 'Articulated Vehicle', 1);
            filteredData = filterData(filteredData, 'LastStop', 1);
        }
        else if (selected === 'Cement Mixer') {
            filteredData = filterData(data, 'Cement Mixer', 1);
            filteredData = filterData(filteredData, 'LastStop', 1);
        }
        else if (selected === 'Mobile Crane') {
            filteredData = filterData(data, 'Mobile Crane', 1);
            filteredData = filterData(filteredData, 'LastStop', 1);
        }
        else if (selected === 'Recovery Vehicle') {
            filteredData = filterData(data, 'Recovery Vehicle', 1);
            filteredData = filterData(filteredData, 'LastStop', 1);
        }
        else if (selected === 'Tipper') {
            filteredData = filterData(data, 'Tipper', 1);
            filteredData = filterData(filteredData, 'LastStop', 1);
        }
        else if (selected === 'Single Unit') {
            filteredData = filterData(data, 'Single Unit', 1);
            filteredData = filterData(filteredData, 'LastStop', 1);
        }
        else if (selected === 'Truck') {
            filteredData = filterData(data, 'Truck', 1);
            filteredData = filterData(filteredData, 'LastStop', 1);
        }
        else if (selected === 'Truck-Crane') {
            filteredData = filterData(data, 'Truck-Crane', 1);
            filteredData = filterData(filteredData, 'LastStop', 1);
        }
        else if (selected === 'Truck-Detachable Trailer') {
            filteredData = filterData(data, 'Truck-Detachable Trailer', 1);
            filteredData = filterData(filteredData, 'LastStop', 1);
        }
        else if (selected === 'Truck-Other') {
            filteredData = filterData(data, 'Truck-Other', 1);
            filteredData = filterData(filteredData, 'LastStop', 1);
        }
        else if (selected === 'Bus') {
            filteredData = filterData(data, 'Bus', 1);
            filteredData = filterData(filteredData, 'LastStop', 1);
        }
        else if (selected === 'Others') {
            filteredData = filterData(data, 'Others', 1);
            filteredData = filterData(filteredData, 'LastStop', 1);
        }
        else {
            filteredData = filterData(data, 'Bus', 0);
            filteredData = filterData(filteredData, 'LastStop', 1);
        }
        var activityTypeCount = countOneHotEncodedField(filteredData, activityType_column);
        freightLastActivityChart = createRadialChart(freightLastActivity, 'pie', activityTypeCount, activityType_label);
    })
};

if (mapView) {
    // Obtain the default map types from the platform object:
    var defaultLayers = platform.createDefaultLayers();

    // Instantiate (and display) a map object:
    var map = new H.Map(
        mapView,
        defaultLayers.normal.map,
        {
            zoom: 11,
            center: { lng: 103.8198, lat: 1.3521 }
        });
    var mapEvents = new H.mapevents.MapEvents(map);
    var behavior = new H.mapevents.Behavior(mapEvents);
    var ui = H.ui.UI.createDefault(map, defaultLayers);

    var filteredData = data;
    var stopDurationObjects = [];
    var clusteringLayer = plotStopClusters(map, data, null, stopDurationObjects);

    $('#map-dropdown a').on('click', function() {
        var selected = $(this).text();
        if (selected === 'Pickup Cargo') {
            filteredData = filterData(data, 'PickupCargo', 1);
        }
        else if (selected === 'Deliver Cargo') {
            filteredData = filterData(data, 'DeliverCargo', 1);
        }
        else if (selected === 'Fail') {
            filteredData = filterData(data, 'Fail', 1);
        }
        else if (selected === 'Pickup Container') {
            filteredData = filterData(data, 'PickupContainer', 1);
        }
        else if (selected === 'Dropoff Container') {
            filteredData = filterData(data, 'DropoffContainer', 1);
        }
        else if (selected === 'Pickup Trailer') {
            filteredData = filterData(data, 'PickupTrailer', 1);
        }
        else if (selected === 'Dropoff Trailer') {
            filteredData = filterData(data, 'DropoffTrailer', 1);
        }
        else if (selected === 'Provide Service') {
            filteredData = filterData(data, 'ProvideService', 1);
        }
        else if (selected === 'Passenger') {
            filteredData = filterData(data, 'Passenger', 1);
        }
        else if (selected === 'Fueling') {
            filteredData = filterData(data, 'Fueling', 1);
        }
        else if (selected === 'Maintenance') {
            filteredData = filterData(data, 'Maintenance', 1);
        }
        else if (selected === 'Resting') {
            filteredData = filterData(data, 'Resting', 1);
        }
        else if (selected === 'Meal') {
            filteredData = filterData(data, 'Meal', 1);
        }
        else if (selected === 'Shift') {
            filteredData = filterData(data, 'Shift', 1);
        }
        else if (selected === 'OtherWork') {
            filteredData = filterData(data, 'OtherWork', 1);
        }
        else if (selected === 'Queuing') {
            filteredData = filterData(data, 'Queuing', 1);
        }
        else if (selected === 'Personal') {
            filteredData = filterData(data, 'Personal', 1);
        }
        else if (selected === 'Other') {
            filteredData = filterData(data, 'Other', 1);
        }
        else {
            filteredData = data;
        }

        if ($('#stopDistribution-label').hasClass('active')) {
            clusteringLayer = plotStopClusters(map, filteredData, clusteringLayer, stopDurationObjects);
            stopDurationObjects = [];
        }
        else {
            stopDurationObjects = plotStopDuration(map, filteredData, clusteringLayer, stopDurationObjects);
        }
    })
}
