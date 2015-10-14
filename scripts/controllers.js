var childLaborMap = angular.module('childLaborMap', []);

childLaborMap.controller('countryDetailCtrl', ['$scope', 'd3', function($scope, d3) {
	// var countries = [
	// 	{name: "Chile",
	// 	 iso: "CHI"},
	// 	{name: "United States",
	// 	 iso: "USA"}
	// ];
	$scope.countries = [];
	$scope.countryData = d3.json("data/countries_2013.json", function(error, countries2013, d3) {

		//$scope.countries = [];

		var getCountries = function(countries2013) {
				for (var item in countries2013) {
					// create the ISO3 key
					//var country = countries2013[item].ISO3;

					// create an object for each country under it's ISO3
					//countries[country] = {};

					var country = {};

					// get the name of each country to display on hover
					country.iso = countries2013[item].ISO3;
					country.name = countries2013[item].Name;


					if (countries2013[item].Advancement_Level && countries2013[item].Advancement_Level !== '') {
						// get the fillKey value for each country to change it's color based on the advancement level
						country.fillKey = countries2013[item].Advancement_Level;

						// get the advancement level for each country
						country.advancementLevel = countries2013[item].Advancement_Level;
					}

					country.goods = [];

					for (var k in countries2013[item].Goods) {
						if (countries2013[item].Goods && countries2013[item].Goods.length > 0) {
							
							// get the information for each good and store it as an object within the goods array
							var good = {};

							good = {'name': countries2013[item].Goods[k].Good_Name,
									'good-sector': countries2013[item].Goods[k].Good_Sector,
									'child-labor': countries2013[item].Goods[k].Child_Labor,
									'forced-labor': countries2013[item].Goods[k].Forced_Labor,
									'forced-child-labor': countries2013[item].Goods[k].Forced_Child_Labor,
									'icon': 'design/icon-sets/' + countries2013[item].Goods[k].Good_Name + '.png'};
							country.goods.push(good);
						}
					}
					$scope.countries.push(country);
				}
			};
			getCountries(countries2013);
			console.log($scope.countries);
		});
}]);