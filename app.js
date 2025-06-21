var app = angular.module('bloodBankApp', []);

app.controller('BloodBankController', function($scope, $http) {
// Initialize donor object
$scope.donor = {
donor_name: '',
blood_group: '',
contact_number: '',
last_donation_date: ''
};

// Fetch all donors
$scope.getDonors = function() {
$http.get('/donors').then(function(response) {
$scope.donors = response.data.donors;
}, function(error) {
console.error('Error fetching donors:', error);
});
};

// Add a new donor
$scope.addDonor = function() {
$http.post('/add-blood-donor', $scope.donor).then(function(response) {
alert(response.data.message);
$scope.getDonors(); // Refresh the donor list
$scope.donor = {};  // Clear the form
}, function(error) {
alert('Error: ' + error.data.error);
});
};

// Fetch donors on load
$scope.getDonors();
});
