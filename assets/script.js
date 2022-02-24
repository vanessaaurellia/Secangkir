$(document).ready(function() {
	$('.minus').click(function () {
		var $input = $(this).parent().find('input');
		var count = parseInt($input.val()) - 1;
		count = count < 1 ? 1 : count;
		$input.val(count);
		$input.change();
		return false;
	});
	$('.plus').click(function () {
		var $input = $(this).parent().find('input');
		$input.val(parseInt($input.val()) + 1);
		$input.change();
		return false;
	});
});

var remove = document.getElementsByClassName('btn-danger');
for(var i=0; i<remove.length; i++){
	var button = remove[i]
	button.addEventListener('click', function(event){
		var buttonClicked = event.target;
		buttonClicked.parentElement.parentElement.remove();
	})
}