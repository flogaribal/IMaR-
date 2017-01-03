angular.module('OtherCtrl', [])


/* _____________________ OTHER CTRL ____________________ */
.controller('OtherCtrl', function($scope,$state) {
	// VAR INIT
	$nbClicksContact = 0;
	$nbClicksAbout = 0;
	$nbClicksPartners = 0;
	$nbClicksCoFunding = 0;



	/**
	** Function used when the user click on contact item
	**/
	$scope.showContact = function() {
		// Increment number of click
		$nbClicksContact++;

		if($nbClicksContact % 2 != 0 ){ // DISPLAY CONTACT
			document.getElementById("contact").style.display = 'block';
		}else{							// HIDE CONTACT
			document.getElementById("contact").style.display = 'none';			
		}

		//var fbURL=""+ "&output=embed";

	}

	/**
	** Function used when the user click on about
	**/
	$scope.showAbout = function() {
		// Increment number of click
		$nbClicksAbout++;
		if($nbClicksAbout % 2 != 0 ){	// DISPLAY ABOUT
			document.getElementById("about").style.display = 'block';
		}else{							// HIDE ABOUT
			document.getElementById("about").style.display = 'none';			
		}
	}

	/**
	** Function used when the user click on partners
	**/
	$scope.showPartners = function(){
		// Increment number of click		
		$nbClicksPartners++;
		if($nbClicksPartners % 2 != 0 ){	// DISPLAY PARTNERS
			document.getElementById("partners").style.display = 'block';		
		}else{								// HIDE PARTNERS 
			document.getElementById("partners").style.display = 'none';
		}
	}

	/**
	** Function used when the user click on co-funding
	**/
	$scope.showCoFunding = function(){
		// Increment number of click		
		$nbClicksCoFunding++;
		if($nbClicksCoFunding % 2 != 0 ){	// DISPLAY PARTNERS
			document.getElementById("coFunding").style.display = 'block';		
		}else{								// HIDE PARTNERS 
			document.getElementById("coFunding").style.display = 'none';
		}
	}
})
