/**
 * Mdsoft INT
 *
 * @category    Front end
 * @package     Main js
 * @copyright   Copyright (c) 2016 MDWEB. (http://www.mdweb-int.com)
 * @author      BESSROUR Ahmed (ahmed.bessrour@gmail.com)
 */


var $ = jQuery.noConflict();


/* =========================================================
 modal chargement
 ============================================================ */
window.onload=function(){
    $('#modalFR').modal('show');
    $('#modalAR').modal('show');
}


/* =========================================================
 Back to top
 ============================================================ */
$(".back-top").hide();
// fade in #back-top
$(function() {
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.back-top').fadeIn();
        } else {
            $('.back-top').fadeOut();
        }
    });

    // scroll body to 0px on click
    $('.back-top a').click(function() {
        $('body,html').animate({
            scrollTop: 0
        }, 600);
        return false;
    });

});

/* =========================================================
Numbers only
 ============================================================ */
function numbersOnly(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}


/* =========================================================
    Header
 ============================================================ */

$(".header").sticky({
    topSpacing: 0
});

$('.current').on('click', function(e) {
    e.preventDefault();
    $("body").toggleClass("toggled");
})


/* =========================================================
    My account collapse
 ============================================================ */
if (jQuery('.md-my-account').length) {
    $('.collapseTrigger').on('click', function(e) {
        e.preventDefault();
        $('.expandable').toggleClass('active');
        $('.my-account-container').toggleClass('expandeffect');
        $('.collapseTrigger').toggleClass('active');


        if($('body').hasClass('ar')){
            if($('.collapseTrigger').text() === "المزيد من التفاصيل"){
                $('.collapseTrigger').text("رجوع")
                $('.expandTiggerIcon img').attr('src' , 'images/icons/arrow.png');
            }else{
                $('.collapseTrigger').text("المزيد من التفاصيل");
                $('.expandTiggerIcon img').attr('src' , 'images/icons/plus.png');
            }
        }else{
            if($('.collapseTrigger').text() === "Voir tous les détails"){
                $('.collapseTrigger').text("Retour")
                $('.expandTiggerIcon img').attr('src' , 'images/icons/arrow.png');
            }else{
                $('.collapseTrigger').text("Voir tous les détails");
                $('.expandTiggerIcon img').attr('src' , 'images/icons/plus.png');
            }
        }
        if($('.collapseTrigger').not('active')){
            $('body,html').animate({
                scrollTop: 0
            }, 600);
            return false;
        }

    });
};


/* =========================================================
    My account collapse
 ============================================================ */
if (jQuery('.md-number-validation').length) {

    $('#validationForm').formValidation({
        framework: 'bootstrap',
        icon: {
            valid: 'fa fa-check',
            invalid: 'fa fa-times',
            validating: 'fa fa-refresh'
        },
        err: {
            container: 'popover'
        },
        fields: {
            number: {
                validators: {
                    notEmpty: {
                        message: "saisir votre numéro"
                    },
                    regexp: {
                        regexp: '^0(5)[0-9]{8}$',
                        message: "(05)xxxxxxxx"
                    }
                }
            }
        }
    }).on('success.form.fv', function(e) {
        e.preventDefault();
        $('.validation').fadeOut('fast', function() {
            $('.confiramation').fadeIn();
        });

    });
    $('#confiramationForm').formValidation({
        framework: 'bootstrap',
        icon: {
            valid: 'fa fa-check',
            invalid: 'fa fa-times',
            validating: 'fa fa-refresh'
        },
        err: {
            container: 'popover'
        },
        fields: {
            cNumber: {
                validators: {
                    notEmpty: {
                        message: "Ce champ est obligatoire"
                    }
                }
            }
        }
    }).on('success.form.fv', function(e) {
        e.preventDefault();
        alert('Achat valider');
    });
};



 
$(function(){

    /**
     * HEIGHT AUTO
    ============================================================================================== */
    heightAuto();
    
    $bgColor = $('#main-content section:last-child .section-content').css('background-color');
    
    function heightAuto(){
        height = $(window).height() - 125;
    }

    $('#main-content').css('min-height', height).css({
        'min-height': height,
        'background': $bgColor
    });

    $(window).resize(function(){
        heightAuto();
    });
    
});
$(function() {

    /**
     * HEIGHT AUTO
    ============================================================================================== */
    heightAuto();

    $bgColor = $('#main-content section:last-child .section-content').css('background-color');

    function heightAuto() {
        height = $(window).height() - 125;
    }

    $('#main-content').css('min-height', height).css({
        'min-height': height,
        'background': $bgColor
    });
	heightAuto();
	var maxHeight = 0;
    function heightUnify(divClass,width,padding){
		if($(window).width() >width-16){		
		$(divClass).each(function(){
			if ($(this).height() > maxHeight) { maxHeight = $(this).height(); }
		});
		$(divClass).css("min-height", maxHeight+padding); // 30 est relative au Padding
		}else{
		$(divClass).css("min-height", "inherit"); // 30 est relative au Padding
		}
	}
	
	heightUnify(".my-account-holder",990,36);
	
	$(window).resize(function() {
		heightUnify(".my-account-holder",990,36);
	});

});
