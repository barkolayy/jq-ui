$(document).ready(function() {
	$("#el1").draggable();
	$("#el1").resizable();
	$("#el2").draggable({stack:"#drop1"});
	$("#el3").draggable({stack:"#drop1"});
	$("#sort1").sortable();
	$("#drop1").droppable({
		drop:function(){	
		$("#drop1").css("background-color", "#22b348");
		$("#el2").css("display", "none")
		}
	});
	$("#drop2").droppable({
		accept: "#el3",
		drop: function(){
		$("#drop2").css("background-color", "#22b348");
		$("#el3").css("display", "none")
		}
	})
});