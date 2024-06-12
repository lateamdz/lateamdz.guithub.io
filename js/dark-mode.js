

$(document).ready(function() {
    //check if this is user's first time on page
    if(!getCookie('Theme')){
		if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            currentTheme = "dark";
        } else {
            currentTheme = "light";
        }
    } else {
        currentTheme = getCookie('Theme');
    }
    setTheme(currentTheme);
});

$(".inner-switch").on("click", function () {
    if ($("body").hasClass("dark")) {
        setTheme('light');
    } else {
        setTheme('dark');
    }
});

$(".dark-btn-mobile").on("click", function () {
	$( ".current" ).click();
    if ($("body").hasClass("dark")) {
        setTheme('light');
    } else {
        setTheme('dark');
    }
});

// DARK MODE TOGGLE FUNCTION
var setTheme = function (theme) {
    if (theme === 'dark') {
        $("body").addClass("dark");
        $(".inner-switch").text("Mode Nuit : ON");
		$(".dark-btn-mobile .dark-btn-caption").text("Désactiver mode nuit");
        setCookie('Theme', 'dark', 999);
		$(".fb-zik-img").attr("src","images/icons/fb-haya-music-dark.svg");
		$(".fb-flix-img").attr("src","images/icons/fb-anaflix-dark.svg");
		$(".fb-zik-flix-img").attr("src","images/icons/fb-zik-flix-dark.gif");
    } else {
        $("body").removeClass("dark");
        $(".inner-switch").text("Mode Nuit : OFF");
		$(".dark-btn-mobile .dark-btn-caption").text("Activer mode nuit");
        setCookie('Theme', 'light', 999);
		$(".fb-zik-img").attr("src","images/icons/fb-haya-music.svg");
		$(".fb-flix-img").attr("src","images/icons/fb-anaflix.svg");
		$(".fb-zik-flix-img").attr("src","images/icons/fb-zik-flix.gif");
		
    }
};

// COOKIE HANDLING

function getCookie(name) {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}

function setCookie(name, value, days) {
    var d = new Date;
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
    document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
}

function deleteCookie(name) {
    setCookie(name, '', -1);
}
