<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Blood Bank Admin Panel</title>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
<style>
/* Add background styling */
body {
background-image: url('background.png'); /* Replace with the path to your PNG image */
background-size: cover;
background-repeat: no-repeat;
background-attachment: fixed;
color: white; /* Ensures text is visible on dark backgrounds */
}

.container {
background-color: rgba(0, 0, 0, 0.7); /* Add a semi-transparent background for better text readability */
padding: 20px;
border-radius: 10px;
}

h1, h3, table, input, button {
color: white; /* Text color to contrast the background */
}

input::placeholder {
color: #ddd; /* Placeholder text color for better visibility */
}
</style>
</head>
<body ng-app="adminApp" ng-controller="AdminController">
<div class="container mt-5">
<h1 class="text-center">Blood Bank Admin Panel</h1>

<!-- Add Donor -->
<form class="mb-4" ng-submit="addDonor()" name="donorForm" novalidate>
<h3>Add New Donor</h3>
<div class="mb-3">
<input type="text" class="form-control" ng-model="newDonor.donor_name" placeholder="Donor Name" required>
</div>
<div class="mb-3">
<input type="text" class="form-control" ng-model="newDonor.blood_group" placeholder="Blood Group (e.g., A+)" required>
</div>
<div class="mb-3">
<input type="text" class="form-control" ng-model="newDonor.contact_number"
placeholder="Contact Number" required
ng-pattern="/^\d{10}$/">
<!-- Error message for invalid contact number -->
<div class="text-danger" ng-show="donorForm.$submitted && donorForm.contact_number.$error.pattern">
Contact number must be exactly 10 digits.
</div>
</div>
<div class="mb-3">
<input type="date" class="form-control" ng-model="newDonor.last_donation_date" required>
</div>
<button type="submit" class="btn btn-primary" ng-disabled="donorForm.$invalid">Add Donor</button>
</form>

<!-- Donor Table -->
<h3>Donor Records</h3>
<table class="table table-bordered">
<thead>
<tr>
<th>ID</th>
<th>Donor Name</th>
<th>Blood Group</th>
<th>Contact Number</th>
<th>Last Donation Date</th>
<th>Actions</th>
</tr>
</thead>
<tbody>
<tr ng-repeat="donor in donors track by $index">
<!-- Dynamically assign ID based on index -->
<td>{{ $index + 1 }}</td>
<td>{{ donor.donor_name }}</td>
<td>{{ donor.blood_group }}</td>
<td>{{ donor.contact_number }}</td>
<td>{{ donor.last_donation_date }}</td>
<td>
<button class="btn btn-danger btn-sm" ng-click="deleteDonor(donor.id)">Delete</button>
</td>
</tr>
</tbody>
</table>
</div>

<script>
const app = angular.module('adminApp', []);

app.controller('AdminController', function($scope, $http) {
$scope.donors = [];
$scope.newDonor = {};

// Load all donors
$scope.loadDonors = function() {
$http.get('/donors').then((response) => {
$scope.donors = response.data;
}, (error) => {
console.error('Error fetching donors:', error);
});
};

// Add a donor
$scope.addDonor = function() {
if ($scope.donorForm.$valid) {
$http.post('/add-donor', $scope.newDonor).then((response) => {
alert(response.data.message);
$scope.loadDonors();
$scope.newDonor = {};
}, (error) => {
console.error('Error adding donor:', error);
});
}
};

// Delete a donor
$scope.deleteDonor = function(id) {
if (confirm('Are you sure you want to delete this donor?')) {
$http.delete(`/delete-donor/${id}`).then((response) => {
alert(response.data.message);
$scope.loadDonors();
}, (error) => {
console.error('Error deleting donor:', error);
});
}
};

// Initial load
$scope.loadDonors();
});
</script>
</body>
</html>

