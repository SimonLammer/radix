main(
	/* speed = */ 1000
);
var interval;

function main(speed) {
	var bases = askForBases();
	createTable(bases);
	var counter = 0;
	interval = setInterval(function() {
		var tableRowHtml = '<tr>';
		for (var i = 0; i < bases.length; i++) {
			tableRowHtml += '<td>' + counter.toString(bases[i]) + '</td>';
		}
		tableRowHtml += '</tr>';
		$('#table > tbody > tr:first-child').before(tableRowHtml);
		counter++;
	}, speed);
}

function askForBases() {
	var input = prompt("Which bases do you want to display? (seperate with ,)");
	if (input == null) {
		alert('Reload the page to start the application');
		return null;
	}
	var basesSplit = input.split(',');
	var bases = [];
	for (var i = 0; i < basesSplit.length; i++) {
		bases[i] = parseInt(basesSplit[i]);
		if (isNaN(bases[i]) || bases[i] < 2 || bases[i] > 36) {
			alert('\'' + basesSplit[i] + '\' is not a valid base');
			return askForBases();
		}
	}
	return bases;
}

function createTable(bases) {
	var relativeColumnWidth = 100 / bases.length;
	var tableHeaderHtml = '';
	for (var i = 0; i < bases.length - 1; i++) {
		
		tableHeaderHtml += '<td width="' + relativeColumnWidth + '%">' + bases[i] + '</td>';
	}
	tableHeaderHtml += '<td>' + bases[bases.length - 1] + '</td>';
	$('#table thead tr').html(tableHeaderHtml);
}