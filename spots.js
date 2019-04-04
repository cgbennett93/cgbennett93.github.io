$(".hidden").hide()
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
});
$("#region").on('change', function () {
    var selectedRegion = $(this).val();
    if (selectedRegion === "norcal") {
        $("#norcal").show()
        $("#socal").hide()
        $("#central").hide();
    }
    if (selectedRegion === "central") {
        $("#norcal").hide()
        $("#socal").hide()
        $("#central").show();
    }
    if (selectedRegion === "socal") {
        $("#norcal").hide()
        $("#socal").show()
        $("#central").hide();
    }
    document.addEventListener('DOMContentLoaded', function () {
        var elems = document.querySelectorAll('select');
        var instances = M.FormSelect.init(elems);
    });
});

$(".county").on('change', function () {
    var selectedCounty = $(this).val();
    var formatted = selectedCounty.replace(" ", "-")
    var url_wind = `http://api.spitcast.com/api/county/swell/${formatted.toLowerCase()}/`;
    $.when(
        $.getJSON(url_wind)
    ).done(function (result1) {
        console.log(result1)
        var normalizeData = makeAve(result1)
        drawChart(normalizeData);
    });
})

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.parallax');
    var instances = M.Parallax.init(elems);
});


function drawChart(data) {
    console.log(data)
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.times,
            datasets: [{
                label: 'Swell Height',
                data: data.aves,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

function makeAve(surfJSON) {
    var times = [];
    var aves = [];
    for (var i = 0; i < surfJSON.length; i++) {
      var thisAve = 0;
      var thisTime = 0;
      for(var key in surfJSON[i]){
        if(surfJSON[i][key].hs){
          thisTime++
          thisAve += surfJSON[i][key].hs
        }
      }
      aves.push(3.28084 * thisAve/thisTime) 
      times.push(surfJSON[i].hour)
    }
    return {
      times: times,
      aves: aves
    }
  }