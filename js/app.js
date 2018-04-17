$(document).ready( function() {

// Users JS HERE

//store users in local storage (http session)

if(localStorage.getItem("users") === null) {
	localStorage.setItem("users", JSON.stringify(users));
};

let current_users = JSON.parse(localStorage.getItem("users"));

// Add user to UI list
var list_user = function(user, index) {

	$("ul").append("<li> <a href='/users/?user_id=" + index + "' >" + user["name"] + ", Age: " + user["age"] + "</a></li>");
};

for(let i = 0; i < current_users.length; i++ ) {

	var current_user = current_users[i];
	list_user(current_user, i);

};


// The average age 

var average = function(users_array) {

	let total_age = 0;

	for(let i = 0; i < users_array.length; i++ ) {
		total_age = total_age + users_array[i].age;
	};

	let average_age = total_age / users_array.length;

	// update UI
	$("#average").html(average_age);


};


// The oldest person in the collection 

var eldest = function(users_array) {


	let elder_index = 0;

	for(let i = 0; i < users_array.length; i++ ) {

		if (users_array[i].age > users_array[elder_index].age) {
			elder_index = i;
		}
	};

	let eldest = users_array[elder_index];

	// update UI
	$("#eldest").html(eldest.name + " : " + eldest.age);

};


// The youngest person in the collection 

var youngest = function(users_array) {

	let younger_index = 0;

	for(let i = 0; i < users_array.length; i++ ) {

		if (users_array[i].age < users_array[younger_index].age) {
			younger_index = i;
		}
	};

	let youngest = users_array[younger_index];

	// update UI
	$("#youngest").html(youngest.name + " : " + youngest.age);

};


// Run data analysis functions here

var present_data = function() {

	average(users);
	eldest(users);
	youngest(users);

};

present_data();

// New User Form Handling

$("button").on("click", function(event) {

	event.preventDefault();

	let new_user = new User;

	name = $("#name_input").val();
	age = $("#age_input").val();

	new_user.name = name;
	new_user.age = Number(age);

	//add new user to current users array
	users.push(new_user);

	// store new users array
	localStorage.setItem("users", JSON.stringify(users));

	// Add new user to user list
	$("ul").append("<li> <a href='/users/?user_id=" + users.length + "' >" + new_user.name + ", Age: " + new_user.age + "</a></li>");

	//recalculate and present new data
	present_data();


});

});


