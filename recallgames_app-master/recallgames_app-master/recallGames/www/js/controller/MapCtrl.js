angular.module('MapCtrl', [])


/* _____________________ MAP CTRL ____________________ */
.controller('MapController',function($scope, $rootScope, $http, $cordovaGeolocation, $stateParams, $ionicModal, leafletData,$filter, Countries,Continents, $state, CONFIG) {
	
	// ARRAY OF COLORS
	// 			 YELLOW,     BLUE,     RED,      ORANGE,  GREEN,  		
	var color = ['#fccf3c','#2166ae','#bf1e2b','#ef7a1f','#2baf2b'];
    
	/**
	** Function used to pick a color randomly
	**/
    var getColor = function(){
        return 	color[Math.floor((Math.random())*5)];
    };


    // MAP INIT
	var map = new L.Map('map', {
      zoomControl: false,		// Disable zoom button 
      center: [43, 0],			// Point which the map will center at init
      zoom: 3					// Level of zoom at init
    });

	// TILE LAYER INIT
    /*var tileLayer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				        attribution: '',
				        maxZoom: 18,
				    });*/
var tileLayer = L.tileLayer('http://{s}.tile.openstreetmap.se/hydda/base/{z}/{x}/{y}.png', {
				        attribution: '',
				        maxZoom: 18,
				    });

    tileLayer.addTo(map);


    // WHEN ZOOM < 2 CONTINENTS SHAPES ARE DISPLAYED
    map.on('zoomend',function(){
    	if(map.getZoom()<2){
    		removeShapes();
			loadAndOrDisplayContinents(true);
    	}
    })

    /**
	** Function used to remove all Shapes from the map except the tile layer
	**/
    var removeShapes = function(){
    	map.eachLayer(function (layer) {
    		if(layer !== tileLayer){
		    	map.removeLayer(layer);
		    }
		});
    }

    /**
	** Function used to add event on continents shape click
	**/
    var onContinentShapeClick = function(code){
    	removeShapes();
    	//loadAndOrDisplayCountries(true);

    	switch(code){
    		case "SA": // SOUTH AMERICA
    			map.setView([-17.245744, -63.017578],3);
    			loadAndOrDisplayCountries(true,code);
    		break;

    		case "NA": // NORTH AMERICA
    			map.setView([53.370221, -113.642578],2);    		
    			loadAndOrDisplayCountries(true,code);
    		break;

    		case "OC": // OCEANIA
    			map.setView([-24.146754,133.154297],3);		
    			loadAndOrDisplayCountries(true,code);    
    		break;

    		case "AF": // AFRICA
    			map.setView([8.993600, 21.005859],2);    		
    			loadAndOrDisplayCountries(true,code);
    		break;

    		case "EU": // EUROPE
    			map.setView([48.421910,10.854492],3);
    			loadAndOrDisplayCountries(true,code);
    		break;

    		case "AS":
    			map.setView([42.859860,106.962891],2);    		
    			loadAndOrDisplayCountries(true,code);
    		break;

    		default:
    			alert("error");
    	}


    }


    /**
    ** Function used to load and display according to the given parameter continents from the online API 
    **/
    var loadAndOrDisplayContinents = function(display){
		
		if($scope.continents == undefined){
			// Get all countries from API
			$http.get('http://' + CONFIG.domain +'/geojson/continents').success(function(dataContinents) {

				// Store all countries locally
				//Continents.addAll(dataContinents.features); 

				$scope.continents = dataContinents.features;
				if (display){
					// Array of continents shapes 
					$scope.continentsShapes = new Array();

			    	// Go throught all continents
					for(var i=0;i<$scope.continents.length;i++){

						// Add a shape to the shapes array
						$scope.continentsShapes[i] = L.geoJson($scope.continents[i].geometry,$scope.continents[i].style).addTo(map);

						$scope.continentsShapes[i].on('click', L.bind(onContinentShapeClick, null, $scope.continents[i].properties.code));

					}
				}
			});
		}else{
			if (display){
					// Array of continents shapes 
				$scope.continentsShapes = new Array();

		    	// Go throught all continents
				for(var i=0;i<$scope.continents.length;i++){

					// Add a shape to the shapes array
					$scope.continentsShapes[i] = L.geoJson($scope.continents[i].geometry,$scope.continents[i].style).addTo(map);

					$scope.continentsShapes[i].on('click', L.bind(onContinentShapeClick, null, $scope.continents[i].properties.code));

				}
			}
		}
    }




    /**
    ** Function used to load and display according to the given parameter counntries from the online API 
    **/
    var loadAndOrDisplayCountries = function(display, code){
	    $scope.continent = {};

		if($scope.continent[code] == undefined){
			// Get all countries from API
			$http.get('http://' + CONFIG.domain +'/geojson/continent/'+code).success(function(data1) {

				// Store all countries locally
				//Countries.addAll(data1.features); 

				$scope.continent[code] = data1.features;

				if(display){
					// Array of countries shapes 
					$scope.countriesShapes = new Array();

					if($scope.continent[code].length > 0){
						// Go throught all countries
						for(var i=0;i<$scope.continent[code].length;i++){

							// If the current country has a game count > 0 
							if($scope.continent[code][i].properties.game_count !== 0){
								
								// Add a shape to the shapes array
								$scope.countriesShapes[i] = L.geoJson($scope.continent[code][i].geometry,{
																	    fillColor: getColor(),
															            weight: 2,
															            opacity: 1,
															            color: 'white',
															            dashArray: '3',
															            fillOpacity: 0.7
																	}).addTo(map);
								// Add a popup to the current shape
								$scope.countriesShapes[i].bindPopup('<span style="font-weight:bold;">'+$scope.continent[code][i].properties.name + "</span><br>" + $scope.continent[code][i].properties.game_count + " games<br>" + 
							               	"<a href=\"#/tab/map/collection?countryId="+$scope.continent[code][i].properties.id+"&mapMode=true\">Games list</a>");
								
							}
						}
					}else{
						alert("None country which contains sports was found in this continent");
						loadAndOrDisplayContinents(true);
					}
				}
			});
		}else{
			if(display){
				// Array of countries shapes 
				$scope.countriesShapes = new Array();
				if($scope.continent[code].length > 0){
					// Go throught all countries
					for(var i=0;i<$scope.continent[code].length;i++){

						// If the current country has a game count > 0 
						if($scope.continent[code][i].properties.game_count !== 0){
							
							// Add a shape to the shapes array
							$scope.countriesShapes[i] = L.geoJson($scope.continent[code][i].geometry,{
																    fillColor: getColor(),
														            weight: 2,
														            opacity: 1,
														            color: 'white',
														            dashArray: '3',
														            fillOpacity: 0.7
																}).addTo(map);
							// Add a popup to the current shape
							$scope.countriesShapes[i].bindPopup('<span style="font-weight:bold;">'+$scope.continent[code][i].properties.name + "</span><br>" + $scope.continent[code][i].properties.game_count + " games<br>" + 
						               	"<a href=\"#/tab/map/collection?countryId="+$scope.continent[code][i].properties.id+"&mapMode=true\">Games list</a>");
							
						}
					}	
				}else{
						alert("None country which contains sports was found in this continent")
				}
			}
		}
	}





    // WHEN THE MAP IS LOADED
	angular.element(document).ready(function () {
		loadAndOrDisplayContinents(true);
		//loadAndOrDisplayCountries(false);

	});
})
