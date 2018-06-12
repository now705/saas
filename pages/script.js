function initXHR(x, value) {
	console.log(x); 
	if (x == 'home') {
		document.getElementById("home").style.display = "block";
		document.getElementById("courseList").style.display = "none";
		document.getElementById("gList").style.display = "none";
	}
	else if (x == 'courseList') {
		//		retrieveActiveCoursesFromServer('/app/json/courses.json');
		retrieveActiveCoursesFromServer('/app/course/', 'courseList');
		document.getElementById("home").style.display = "none";
		document.getElementById("courseList").style.display = "block";
		document.getElementById("gList").style.display = "none";		
	}
	else if (x == 'gList') {
		retrieveActiveCoursesFromServer('/app/course/' + value, 'gList');
		document.getElementById("home").style.display = "none";
		document.getElementById("courseList").style.display = "none";
		document.getElementById("gList").style.display = "block";
	}
	else {
		document.getElementById("home").style.display = "block";
		document.getElementById("courseList").style.display = "none";
		document.getElementById("gList").style.display = "none";
	}
}

function retrieveActiveCoursesFromServer(url, operation) {
	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var returnValues = JSON.parse(xmlhttp.responseText);
			if (operation == "courseList") {
				populateCoursesView('courses', returnValues);
			}
			else if (operation == "gList") {
				//alert(returnValues);
				populateCourseItems('assessments', returnValues);				
			}
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

//DOM based function
function populateCoursesView(elementId, courses) {
	var element = document.getElementById(elementId);
	var newElement = "";

	for (var i = 0; i < courses.length; i++) {

		newElement += "<tr>";
		newElement += "<th scope=\"row\">" + (i + 1) + "</th>";
		newElement += "<td><a href=\"javascript:initXHR('gList'," +  
		(i+1) + ")\">"  + courses[i].name + "</a></td>";
		newElement += "<td>" + courses.length + "</td>";
		newElement += "<td>" + courses[i].due + "</td>";			
		newElement += "<td>Public</td>";
		newElement += "</tr>"
		
	}

	element.innerHTML = newElement;
}

//DOM based function
function populateCourseItems2(elementId, course) {
	var courseItems = course.assessments;
	var element = document.getElementById(elementId);
	var newElement = "";

	for (var i = 0; i < courseItems.length; i++) {
		newElement += "<tr>";
		newElement += "<td>" + courseItems[i].description + "</td>";
		newElement += "<td><span class=\"badge\">" + courseItems[i].shared + "</span></td>";
		newElement += "<td>";
		newElement += "<div class=\"input-group\">";
		newElement += "<span class=\"input-group-addon\" style=\"border-style:none;\">";
		newElement += "<input type=\"checkbox\">";
		newElement += "</span>";
		newElement += "</div>";
		newElement += "</td>";
		newElement += "</tr>";
	}

	element.innerHTML = newElement;	
}

//JQuery based function
function populateCourseItems(elementId, course) {
	var courseItems = course.assessments;
	var newElement = "";

	for (var i = 0; i < courseItems.length; i++) {
		newElement += "<tr>";
		newElement += "<td>" + courseItems[i].description + "</td>";
		newElement += "<td>" + courseItems[i].options[0] + "</td>";
		newElement += "<td><span class=\"badge\">" + courseItems[i].shared + "</span></td>";
		newElement += "<td>";
		newElement += "<div class=\"input-group\">";
		newElement += "<span class=\"input-group-addon\" style=\"border-style:none;\">";
		newElement += "<input type=\"checkbox\">";
		newElement += "</span>";
		newElement += "</div>";
		newElement += "</td>";
		newElement += "</tr>";
	}
	$("#" + elementId).append(newElement);
}
