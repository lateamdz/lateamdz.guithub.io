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
    Header
 ============================================================ */

$(".header").sticky({
    topSpacing: 0
});

$('.current').on('click', function() {
    $('.accessibilities.mobile').slideToggle(300)
})


/* =========================================================
    My account collapse
 ============================================================ */
if (jQuery('.md-my-account').length) {
    $('.expandTigger, .collapseTrigger').on('click', function(e) {
        e.preventDefault();
        $('.expandable').toggleClass('active');
        $('.my-account-container, .my-account-holder').toggleClass('expandeffect');
        $('.expandTigger, .collapseTrigger').toggleClass('active');

    });
};
