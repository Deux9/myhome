$(document).ready(function() {
	
	var location = ort
	var loci = 0
	
	getweather(location,loci);
	buttons(location,loci);
  
  	$("#weathernext").click(function() {
		loci = loci + 1;
		getweather(location,loci);
		buttons(location,loci);
	});
	
	$("#weatherprev").click(function() {
		loci = loci - 1
		getweather(location,loci);
		buttons(location,loci);
	});
});

function buttons(location,loci) {
	if (loci <= 0) {
		$("#weatherprev").hide();
	} else {
		$("#weatherprev").show();
	};
	if (loci >= location.length - 1) {
		$("#weathernext").hide();
	} else {
		$("#weathernext").show();
	}
}	

function getweather(location,loci){
  $.simpleWeather({
    location: location[loci],
    woeid: '',
    unit: 'c',
    success: function(weather) {
      day0 = '<i class="icon-'+weather.code+'"></i>   '+weather.temp+'&deg'+weather.units.temp;
      $("#day0").html(day0);
      
      var day = [0,0,0,0]
      var iday = [0,0,0,0]
      var tday = [0,0,0,0]
      for (var i = 1; i<5; i++) {
		day[i] = weather.forecast[i].day;	
			day[i] = day[i].replace("Mon","Mo");
			day[i] = day[i].replace("Tue","Di");
			day[i] = day[i].replace("Wed","Mi");
			day[i] = day[i].replace("Thu","Do");
			day[i] = day[i].replace("Fri","Fr");
			day[i] = day[i].replace("Sat","Sa");
			day[i] = day[i].replace("Sun","So");
		iday[i] = '<i class="icon-'+weather.forecast[i].code+'"></i>';
		tday[i] = weather.forecast[i].low+'/'+weather.forecast[i].high+'&deg'+weather.units.temp;
		$("#iday"+i).html(iday[i]);
		$("#day"+i).html(day[i]);
		$("#tday"+i).html(tday[i]);
		$("#location").html(location[loci]);
		
		};
	},

    error: function(error) {
      $("#day0").html('<p>'+error+'</p>');
    }
  });
};
