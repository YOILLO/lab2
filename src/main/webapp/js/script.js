$(function(){
	let canv = $('.graph_canvas');

	const GRAPH_COFF = 67;
	const GRAPH_MOVE = 110;
	const Y_VALUES = ["-4", "-3", "-2", "-1", "0", "1", "2", "3", "4"];

	let r_val = window.localStorage.getItem("r_val");

	if (r_val !== null){
		redrawFromInput(window.localStorage.getItem("x_val"), window.localStorage.getItem("y_val"));

		let y = window.localStorage.getItem("y_val")

		let minDiff = Infinity;
		let nearestYValue;

		for (let i = 0; i < Y_VALUES.length; i++){
			if (Math.abs(y - Y_VALUES[i]) < minDiff){
				minDiff = Math.abs(y - Y_VALUES[i]);
				nearestYValue = Y_VALUES[i];
			}
		}


		let ySelected = $('input[name="yval"][value="'+ nearestYValue.trim() +'"]');

		$('input[name="yval"]').prop("checked", false);
		ySelected.prop("checked", true);

		//ySelected.trigger("click");

		$("#x-textinput").val(window.localStorage.getItem("x_val").toString().substring(0, 5));
		$("#r-textinput").val(r_val.toString().substring(0, 5));
	}

	function isNum(n){
		return !isNaN(parseFloat(n)) && isFinite(n);
	}

	function validate_X(){
		var x = $("#x-textinput").val().replace(",",".");
		if (isNum(x) && x >= -3 && x <= 3){
			$("#x-textinput").removeClass("text-error");
			return true;
		}
		else {
			$("#x-textinput").addClass("text-error");
			return false;
		}
	}

	function validate_Y(){
		if ($(".y-checkbox").is(":checked")){
			var y_summ = $("#y-checkbox1").is(":checked") +
				$("#y-checkbox2").is(":checked") +
				$("#y-checkbox3").is(":checked") +
				$("#y-checkbox4").is(":checked") +
				$("#y-checkbox5").is(":checked") +
				$("#y-checkbox6").is(":checked") +
				$("#y-checkbox7").is(":checked") +
				$("#y-checkbox8").is(":checked") +
				$("#y-checkbox9").is(":checked");
			if (y_summ == 1) {
				$(".y-box-label").removeClass("box-error");
				return true;
			} else{
				$(".y-box-label").addClass("box-error");
				return false;
			}
		}
		else{
			$(".y-box-label").addClass("box-error");
			return false;
		}
	}

	function validate_R(){
		var r = $("#r-textinput").val().replace(",",".");
		if (isNum(r) && r >= 2 && r <= 5){
			$("#r-textinput").removeClass("text-error");
			return true;
		}
		else {
			$("#r-textinput").addClass("text-error");
			return false;
		}
	}

	function validated_Form(){
		return validate_X() & validate_Y() & validate_R();
	}

	function clearCanvals(){
		canv[0].getContext('2d').clearRect( 0, 0, canv.width(), canv.height());
	}
	function drawPoint(x, y){
		clearCanvals();
		if(x > canv.width() || x < -canv.width() || y > canv.height() || y < -canv.height())
			return;

		let Axes = canv[0].getContext('2d');
		Axes.setLineDash([2, 2]);
		Axes.beginPath();
		Axes.moveTo(x, 110);
		Axes.lineTo(x, y);
		Axes.moveTo(110, y);
		Axes.lineTo(x, y);
		Axes.stroke();
		Axes.fillStyle = 'red';
		Axes.arc(x, y, 2, 0, 2*Math.PI);
		Axes.fill();
	}

	function redrawFromInput(x, y){
		drawPoint(x * GRAPH_COFF / r_val + GRAPH_MOVE,
			-(y / r_val * GRAPH_COFF - GRAPH_MOVE));
	}

	function canv_click(event){
		
		if(!validate_R())
			return;

		let x = (event.offsetX - GRAPH_MOVE) / GRAPH_COFF * r_val;

		if (x < -3) x = -3;
		if (x > 3) x = 3;


		let y = (-event.offsetY + GRAPH_MOVE) / GRAPH_COFF * r_val;

		let minDiff = Infinity;
		let nearestYValue;

		for (let i = 0; i < Y_VALUES.length; i++){
			if (Math.abs(y - Y_VALUES[i]) < minDiff){
				minDiff = Math.abs(y - Y_VALUES[i]);
				nearestYValue = Y_VALUES[i];
			}
		}

		drawPoint(x * GRAPH_COFF/r_val + GRAPH_MOVE, -(nearestYValue/r_val * GRAPH_COFF - GRAPH_MOVE));

		let ySelected = $('input[name="yval"][value="'+ nearestYValue.trim() +'"]');

		$('input[name="yval"]').prop("checked", false);
		ySelected.prop("checked", true);

		$("#x-textinput").val(x.toString().substring(0, 5));
	}

	canv.on("click", canv_click)

	function send_Form (event){
		event.preventDefault();
		if (!validated_Form()){
			return;
		}
		
		var x = $("#x-textinput").val();
		var y = $('input[name=yval]:checked').val();
		$.ajax({
			url: "/lab2",
			method: "POST",
			data: $(this).serialize() + "&timezone=" + new Date().getTimezoneOffset(),
			dataType: "html",
			beforeSend: function (){
				$(".button").attr("disabled", "disabled");
			},
			success: function (data){
				$(".button").attr("disabled", false);

				document.open();
				document.write(data);
				document.close();
			},
			error: function(error){
				$(".button").attr("disabled", false);
			}

		});

		window.localStorage.setItem("r_val", r_val);
		window.localStorage.setItem("x_val", x);
		window.localStorage.setItem("y_val", y);
	}

	$("#input-form").on("submit", send_Form);

	function reset(event){
		$.ajax({
			url: "/lab2",
			method: "POST",
			data: "clear=true",
			dataType: "html",
			beforeSend: function (){
				$(".button").attr("disabled", "disabled");
			},
			success: function (data){
				$(".button").attr("disabled", false);

				document.open();
				document.write(data);
				document.close();
			},
			error: function(error){
				$(".button").attr("disabled", false);
			}
		});

		window.localStorage.removeItem("r_val");
		window.localStorage.removeItem("x_val");
		window.localStorage.removeItem("y_val");

		return true;
	}

	$("#input-form").on("reset", reset);

	function newR(event){
		if (!validate_R())
			return;
		r_val = $('#r-textinput').val();
	}

	$('#r-textinput').on("change", newR);
})