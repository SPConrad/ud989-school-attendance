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


		var labelRow = document.createElement("TR");
		labelRow.setAttribute('id', 'labelRow');
		labelRow.setAttribute('class', 'labelRow');
		this.tbodyELem.appendChild(labelRow);
		var labelRowElem = document.getElementById('labelRow');
		var nameLabel = document.createElement("TD");
		nameLabel.setAttribute('id', 'labelRowName');
		nameLabel.setAttribute('class', 'labelRowName');
		nameLabel.innerHTML = "Student";
		labelRowElem.appendChild(nameLabel);
		
		for (var i = 0; i < this.numOfDays; i++){
			var dayColumnLabel = document.createElement("TR");
			dayColumnLabel.innerHTML = '' + (i + 1);
			labelRowElem.appendChild(dayColumnLabel);
		}


		///create rows for each student
		for (var y = 0; y < numOfStudents; y++){
			var student = document.createElement("TR");
			student.setAttribute("id", students[y]);
			student.setAttribute("class", "student");
			this.tbodyELem.appendChild(student);
			var studentElem = document.getElementById(students[y]);
			///student name
			//var studentName = '<td class="name-col">' + name[x] + '</td>';
			var name = document.createElement("TD");
			name.setAttribute('class', 'name-col');
			name.setAttribute('id', 'name');
			name.innerHTML = students[y];
			studentElem.appendChild(name);
			//var studentName = '<td class="name-col">Sean</td>';
			//this.tbodyELem.append(studentName)
			for (var i = 0; i < this.numOfDays; i++){
				var newElem = '<td class="attend-col"><input type="checkbox"></td>';
				var newElem = document.createElement("TD");
				newElem.setAttribute('class', 'attend-col');
				var checkbox = document.createElement('input');
				checkbox.type = "checkbox";
				newElem.appendChild(checkbox);
				studentElem.appendChild(newElem);
				//this.tbodyELem.append(newElem);
			}
			var missedDays = document.createElement("TD");
			missedDays.setAttribute('id', 'missedDaysTotal');
			missedDays.setAttribute('class', 'missed-days-col');
			missedDays.innerHTML = "0";
			studentElem.appendChild(missedDays);
			//this.tbodyELem.append('</tr>')
		}
	}
}

octopus.init();