main(
	/* speed = */ 1000
);
var counter;
var interval;

function main(speed) {
	var bases = askForBases();
	var rowHeight = createTable(bases);
	var maxRows = Math.ceil($(window).height() / rowHeight);
	counter = 1;
	interval = setInterval(function() {
		$('#table > tbody > tr:first-child').before('<tr></tr>');
		var tableRowContent = '';
		for (var i = 0; i < bases.length; i++) {
			tableRowContent += '<td>' + counter.toString(bases[i]) + '</td>';
		}
		var newRow = $('#table > tbody > tr:first-child');
		newRow.height(0);
		newRow.css({
			opacity: 0
		});
		newRow.animate({
			height: [rowHeight, "linear"]
		}, speed, function() {
			newRow.html(tableRowContent);
			newRow.animate({
				opacity: [1, "linear"]
			});
			setTimeout(function() {
				newRow.remove();
			}, speed * maxRows);
		});
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
	var tableBodyRowHtml = '';
	for (var i = 0; i < bases.length; i++) {
		tableBodyRowHtml += '<td>0</td>'
	}
	var row = $('#table tbody tr').html(tableBodyRowHtml);
	return row.height();
}