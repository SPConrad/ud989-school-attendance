/* STUDENTS IGNORE THIS FUNCTION
 * All this does is create an initial
 * attendance record if one is not found
 * within localStorage.
 */
(function() {
    if (!localStorage.attendance) {
        console.log('Creating attendance records...');
        function getRandom() {
            return (Math.random() >= 0.5);
        }

        var nameColumns = $('tbody .name-col'),
            attendance = {};

        nameColumns.each(function() {
            var name = this.innerText;
            attendance[name] = [];

            for (var i = 0; i <= 11; i++) {
                attendance[name].push(getRandom());
            }
        });

        localStorage.attendance = JSON.stringify(attendance);
    }
}());

var model = {
	init: function(){
	this.attendance = JSON.parse(localStorage.attendance);
	this.$allMissed = $('tbody #missedDaysTotal');
	this.$allCheckBoxes = $('tbody input');
	},


};




var octopus = {
	init: function(){
		///check missed days
		view.init();
		model.init();
		this.updateMissedDays();
		this.countMissingDays();
	},

	countMissingDays: function(){
		var studentRow;
		model.$allMissed.each(function(){ 
			studentRow = $(this).parents('tr'),
			dayChecks = $(studentRow).children('td').children('input'),
			numMissed = 0;

			dayChecks.each(function() {
				if (!$(this).prop('checked')) {
					numMissed++;
				}
			});

			$(this).text(numMissed);

		})

	},

	updateMissedDays: function(){
		$.each(model.attendance, function(name, days) {
			var studentRow = document.getElementById(name);
	        //var studentRow = $('tbody #name:contains("' + name + '")').parent('tr'),
	        var dayChecks = $(studentRow).children('.attend-col').children('input');


	        //console.log(studentRow1);
	        //console.log(studentRow);
	        dayChecks.each(function(i) {
	            $(this).prop('checked', days[i]);
	        });
    	});
		
	},

	updateCheckBoxes: function(){

	}


}

var view = {
	init: function(){
		this.numOfDays = 12;
		this.table = document.createElement("TABLE");
		this.table.setAttribute("id", "attendanceTable");
		document.body.appendChild(this.table);
		this.tableElem = document.getElementById("attendanceTable");
		this.tbody = document.createElement("TBODY");
		this.tbody.setAttribute("id", "tableTbody");
		this.tableElem.appendChild(this.tbody);
		this.tbodyELem = document.getElementById("tableTbody");
		this.tr = document.createElement("TR");
		this.tr.setAttribute("id", "tableLabelsTR");
		this.tbodyELem.appendChild(this.tr);
		this.trElem = document.getElementById("tableLabelsTR");


		this.render();   
	}, 

	render: function(){
		///create label row
		///create student name column
		///create row for each student
		///create 12 columns for days
		///create column for missed days aggregate
		//var td = document.createElement("TD");
		//var cell = document.createTextNode("cell");
		var students = ["Slappy the Frog", "Lilly the Lizard", "Paulrus the Walrus", "Gregory the Goat", "Adam the Anaconda"];

		///create TR element
		///set TR attribute
		///append tr to tableElem
		var numOfStudents = 5;


		var label = document.createElement("TR");
		///assign id
		label.setAttribute('id', 'label');
		///assign class
		label.setAttribute('class', 'label');
		///append to tbody element
		this.tbodyELem.appendChild(label);
		///create variable to store newly created element
		var labelElem = document.getElementById('label');

		var nameLabel = document.createElement("TD");
		nameLabel.setAttribute('id', 'labelRowName');
		nameLabel.setAttribute('class', 'labelRowName');
		nameLabel.innerHTML = "Student";
		labelElem.appendChild(nameLabel);
		
		///create a day label for each day
		for (var i = 0; i < this.numOfDays; i++){
			///create the box element, assgin class
			var newElem = document.createElement("TD");
			newElem.setAttribute('class', 'day-label');
			///assign innerHTML
			newElem.innerHTML = '' + (i + 1);
			///append the TD element to the label row
			labelElem.appendChild(newElem);
		}
		///create a total day label element, assign class
		var totalLabel = document.createElement("TD");
		totalLabel.setAttribute('class', 'totalLabel');
		///assign innerHTML
		totalLabel.innerHTML = "Total";
		///append to the end of the label row
		labelElem.appendChild(totalLabel);


		///create rows for each student
		for (var y = 0; y < numOfStudents; y++){
			///create the student Table Row element
			var student = document.createElement("TR");
			///assign ID
			student.setAttribute("id", students[y]);
			///assign class
			student.setAttribute("class", "student");
			///append to tbodyElement
			this.tbodyELem.appendChild(student);
			///create a variable to store the newly created element 
			var studentElem = document.getElementById(students[y]);

			///create the name box, assign class, ID, innerHTML
			var name = document.createElement("TD");
			name.setAttribute('class', 'name-col');
			name.setAttribute('id', 'name');
			name.innerHTML = students[y];
			///append to studentRow
			studentElem.appendChild(name);

			///create a checkbox for each day
			for (var i = 0; i < this.numOfDays; i++){
				///create the box element, assign class
				var newElem = document.createElement("TD");
				newElem.setAttribute('class', 'attend-col');

				///create an input element, assign type as a checkbox
				var checkbox = document.createElement('input');
				checkbox.type = "checkbox";
				///append to the TD element
				newElem.appendChild(checkbox);
				///append the TD element to the student row
				studentElem.appendChild(newElem);
				//this.tbodyELem.append(newElem);
			}

			///create a days missed element, assign ID and class
			var missedDays = document.createElement("TD");
			missedDays.setAttribute('id', 'missedDaysTotal');
			missedDays.setAttribute('class', 'missed-days-col');
			///initialize to 0
			missedDays.innerHTML = "0";
			///add to the end of the student row
			studentElem.appendChild(missedDays);
		}
	}
}

octopus.init();