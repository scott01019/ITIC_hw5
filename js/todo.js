$(document).ready(function() {					//	on document load
	$('#count-complete').hide();				//	hide count-complete filter text
	$('#count-incomplete').hide();				//	hide count incomplete filter text

	$('#item-input').keypress(function(e) {		//	on keypress while focusing on item-input
		if (e.which == 13)						//	check if keypressed is enter
		{
			addListItem();						//	add new item to the list
		}
	});

	$('#add-item').click(addListItem);			//	on click of the add item button add new item to the list

	$('#clear-all').click(function() {			//	on click of the clear all button
		$('#todo-list').children().remove();	//	clear all list items
		updateCounts();							//	update count filter values
	});

	$('#clear-complete').click(function() {		//	on click of the clear complete button
		$('#todo-list').children().filter('.todo-complete').remove();	//	remove all completed list items
		updateCounts();							//	update count filter values
	});

	$('ul').on('click', 'li > #delete', function() {	//	on clcik of the delete button of a list item
		$(this).parent().remove();						//	remove the item from the list
		updateCounts();									//	update count filter values
	});

	$('ul').on('click', 'li.todo-item', function() {	//	on click of a list item
		$(this).toggleClass('todo-complete');			//	toggle the todo-complete class
		updateCounts();									//	update count filter values
	});

	$('#show-all').click(function() {			//	on click of show all filter
		$('.count').hide();						//	hide all count filter text
		$('#count-all').show();					//	show the count all filter text
		$('li.todo-item').show();				//	show all of the items on the list
	});

	$('#show-incomplete').click(function() {	//	on click of the show incomplete filter
		$('.count').hide();						//	hide all count filter text
		$('#count-incomplete').show();			//	show the count incomplete filter text
		$('li.todo-item').show().filter('.todo-complete').hide();	//	show all items on list and then hide all completed items
	});

	$('#show-complete').click(function() {		//	on click of the show complete filter
		$('.count').hide();						//	hide all count filter text
		$('#count-complete').show();			//	show the count complete filter text
		$('li.todo-item').hide().filter('.todo-complete').show();	//	hide all items on list and then show all completed items
	});
});

function addListItem() {
	if ($('#item-input').val())					//	if item-input text entry has a value
	{
		$('#todo-list').append(createListItem($('#item-input').val()));		//	create a new list item for value and add it to the end of the list
		$('#item-input').val('').focus();		//	clear the value of the item-input text form and focus on it
		updateCounts();							//	update count filter values
	}
}

function createListItem(value) {
	var listItem = '<li class="todo-item">' 
	+ value 
	+ '<button id="delete" type="button" class="btn btn-default pull-right btn-delete" aria-label="Left Align">'
	+ '<span class="glyphicon glyphicon glyphicon-remove" aria-hidden="true"></span>'
	+'</button></li>';							//	create a list item with the value
	return listItem;							//	return the new list item
}

function updateCounts() {
	var all = $('#todo-list').children().length;	//	get the number of current list items
	var complete = $('#todo-list').children().filter('.todo-complete').length;	//	get the number of completed list items
	$('#count-all').text(all + ' total items');		//	set the count all filter text with updated value
	$('#count-complete').text(complete + ' completed items');	//	set the count complete filter text with updated value
	$('#count-incomplete').text(all - complete + ' incomplete items');	//	set the count incomplete filter text with updated value
}