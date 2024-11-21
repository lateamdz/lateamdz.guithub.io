$(function() {
     
	$('.changeNum').click(function() {
		 $('.numBox').hide();
		 $(".SendNum").fadeIn(500);
        
    });
	
	$('.btnAnnule').click(function() {
		 $('#field-error').html("");
		 $(".SendNum").hide();
		  $('.numBox').fadeIn(500);
        
    });
	
	
	
$(".form-num").validate({
  // Specify the validation rules
  rules: {
    field: {
		
      required: true,
      number: true,
	  minlength: 8,
	  maxlength: 8,
	  
    }
	
	
},

  // Specify the validation error messages
  messages: {
 field: {
          required: "* Veuiller saisir un numÃ©ro de tÃ©lÃ©phone valide",
		  number: "* Veuiller saisir un numÃ©ro de tÃ©lÃ©phone valide",
         minlength:"* Veuiller saisir un numÃ©ro de tÃ©lÃ©phone valide",
		 maxlength:"* Veuiller saisir un numÃ©ro de tÃ©lÃ©phone valide",
      },
	  
     
  },

  submitHandler: function(form) {
    
  }
});



$("#myform").validate({
	ignore:'',
            rules: {
                "checkbox[]": {
                    required: true,
                    minlength: 1
                },
                "offre": {
                    required: true,
                  
                },
            },

            // FIX
            // Using highlight and unhighlight options we can add the error class to the parent ul which can then be selected and styled
            highlight: function (element, errorClass, validClass) {
                $(element).addClass(errorClass).removeClass(validClass);
                // Keeps the default behaviour, adding error class to element but seems to break the default radio group behaviour but the below fixes that
                $(element).closest('ul').addClass(errorClass);
                // add error class to ul element for checkbox groups and radio inputs
            },
            unhighlight: function (element, errorClass, validClass) {
                $(element).removeClass(errorClass).addClass(validClass);
                // keeps the default behaviour removing error class from elements
                $(element).closest('ul').removeClass(errorClass);
                // remove error class from ul element for checkbox groups and radio inputs
            },
            // FIX END

            errorLabelContainer: ".js-errors",
            errorElement: "li",

            messages: {
                "checkbox[]": "* veuillez accepter les conditions d'utilisation",
                "offre": "* veuillez choisir une offre ",
                email: ""
            },
			
			 submitHandler: function(form) {
    
  }
        });
	
});