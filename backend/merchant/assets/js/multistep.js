
//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches
var error = false;


// first name
$("#fname").keyup(function() {
    var fname = $("#fname").val();
    if (fname == '') {
        $("#error-fname").text('Enter your First name.');
        $("#fname").addClass("box_error");
        error = true;
    } else {
        $("#error-fname").text('');
        error = false;
    }
    if ((fname.length <= 2) || (fname.length > 20)) {
        $("#error-fname").text("User length must be between 2 and 20 Characters.");
        $("#fname").addClass("box_error");
        error = true;
    }
    if (!isNaN(fname)) {
        $("#error-fname").text("Only Characters are allowed.");
        $("#fname").addClass("box_error");
        error = true;
    } else {
        $("#fname").removeClass("box_error");
    }
});

// last name
$("#lname").keyup(function() {
    var lname = $("#lname").val();
    if (lname != lname) {
        $("#error-lname").text('Enter your Last name.');
        $("#lname").addClass("box_error");
        error = true;
    } else {
        $("#error-lname").text('');
        error = false;
    }
    if ((lname.length <= 2) || (lname.length > 20)) {
        $("#error-lname").text("User length must be between 2 and 20 Characters.");
        $("#lname").addClass("box_error");
        error = true;
    }
    if (!isNaN(lname)) {
        $("#error-lname").text("Only Characters are allowed.");
        $("#lname").addClass("box_error");
        error = true;
    } else {
        $("#lname").removeClass("box_error");
    }
});
// phone
$("#phone").keyup(function() {
    var phone = $("#phone").val();
    if (phone != phone) {
        $("#error-phone").text('Enter your Phone number.');
        $("#phone").addClass("box_error");
        error = true;
    } else {
        $("#error-phone").text('');
        error = false;
    }
    if (phone.length != 10) {
        $("#error-phone").text("Mobile number must be of 10 Digits only.");
        $("#phone").addClass("box_error");
        error = true;
    } else {
        $("#phone").removeClass("box_error");
    }
});


$(".next").click(function(){

	// first name
    if ($("#fname").val() == '') {
        $("#error-fname").text('Enter your First name.');
        $("#fname").addClass("box_error");
        error = true;
    } else {
        var fname = $("#fname").val();
        if (fname != fname) {
            $("#error-fname").text('First name is required.');
            error = true;
        } else {
            $("#error-fname").text('');
            error = false;
            $("#fname").removeClass("box_error");
        }
        if ((fname.length <= 2) || (fname.length > 20)) {
            $("#error-fname").text("User length must be between 2 and 20 Characters.");
            error = true;
        }
        if (!isNaN(fname)) {
            $("#error-fname").text("Only Characters are allowed.");
            error = true;
        } else {
            $("#fname").removeClass("box_error");
        }
    }

	    // last name
    if ($("#lname").val() == '') {
        $("#error-lname").text('Enter your Last name.');
        $("#lname").addClass("box_error");
        error = true;
    } else {
        var lname = $("#lname").val();
        if (lname != lname) {
            $("#error-lname").text('Last name is required.');
            error = true;
        } else {
            $("#error-lname").text('');
            error = false;
        }
        if ((lname.length <= 2) || (lname.length > 20)) {
            $("#error-lname").text("User length must be between 2 and 20 Characters.");
            error = true;
        } 
        if (!isNaN(lname)) {
            $("#error-lname").text("Only Characters are allowed.");
            error = true;
        } else {
            $("#lname").removeClass("box_error");
        }
    }
    // phone
    if ($("#phone").val() == '') {
        $("#error-phone").text('Enter your Phone number.');
        $("#phone").addClass("box_error");
        error = true;
    } else {
        var phone = $("#phone").val();
        if (phone != phone) {
            $("#error-phone").text('Phone number is required.');
            error = true;
        } else {
            $("#error-phone").text('');
            error = false;
        }
        if (phone.length != 10) {
            $("#error-phone").text("Mobile number must be of 10 Digits only.");
            error = true;
        } else {
            $("#phone").removeClass("box_error");
        }
    }

	if (!error) {
		if(animating) return false;
		animating = true;
		
		current_fs = $(this).parent();
		next_fs = $(this).parent().next();
		
		//activate next step on progressbar using the index of next_fs
		$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
		
		//show the next fieldset
		next_fs.show(); 
		//hide the current fieldset with style
		current_fs.animate({opacity: 0}, {
			step: function(now, mx) {
				//as the opacity of current_fs reduces to 0 - stored in "now"
				//1. scale current_fs down to 80%
				scale = 1 - (1 - now) * 0.2;
				//2. bring next_fs from the right(50%)
				left = (now * 50)+"%";
				//3. increase opacity of next_fs to 1 as it moves in
				opacity = 1 - now;
				current_fs.css({
			'transform': 'scale('+scale+')',
			'position': 'absolute'
		});
				next_fs.css({'left': left, 'opacity': opacity});
			}, 
			duration: 800, 
			complete: function(){
				current_fs.hide();
				animating = false;
			}, 
			//this comes from the custom easing plugin
			easing: 'easeInOutBack'
		});
	}
});

$(".previous").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();
	
	//de-activate current step on progressbar
	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
	
	//show the previous fieldset
	previous_fs.show(); 
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale previous_fs from 80% to 100%
			scale = 0.8 + (1 - now) * 0.2;
			//2. take current_fs to the right(50%) - from 0%
			left = ((1-now) * 50)+"%";
			//3. increase opacity of previous_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({'left': left});
			previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});





