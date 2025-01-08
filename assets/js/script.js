/* Utility Functions */
function loadScript(src, options, onloadCallback) {
	const script = document.createElement('script');
	script.src = src;
	if (options) Object.keys(options).forEach(key => script.setAttribute(key, options[key]));
	if (onloadCallback) script.onload = onloadCallback;
	document.head.appendChild(script);
};
loadScript('https://code.jquery.com/jquery-3.7.1.js', {
	async: true,
	crossorigin: 'anonymous'
}, function(){
	console.log("Jquery Loaded");
	(function ($) {
		"use strict"
		$(document).ready(function () {
            /* Lazy Load Counter Up Functions */
            function loadCounterUpFunctions() {
                loadScript(
                    "https://cdnjs.cloudflare.com/ajax/libs/countup.js/2.8.0/countUp.umd.min.js",
                    {
                        defer: true,
                        crossorigin: "anonymous",
                    },
                    function () {
                        document.querySelectorAll('[data-target="count"]').forEach(item =>{
                            let dynamicCountStart = item.hasAttribute('data-count-start') ? item.dataset.countStart.replace(/,/g, '') || 0 : 0;
                            let dynamicCountEnd = item.hasAttribute('data-count-end') ? item.dataset.countEnd.replace(/,/g, '') || 100 : 100;
                            let dynamicDecimalCount = ((dynamicCountEnd).toString().split('.')[1] ?? '').length;
                            if(item.hasAttribute('data-count-start')) dynamicDecimalCount = Math.max(((dynamicCountStart).toString().split('.')[1] ?? '').length, dynamicDecimalCount);
                            const CountOptions = {
                                startVal: dynamicCountStart,
                                duration: ((item.dataset.countDuration * 1) / 1000) || 2,
                                decimalPlaces: dynamicDecimalCount,
                                prefix: item.dataset.countPrefix ?? '',
                                suffix: item.dataset.countSuffix ?? '',
                                enableScrollSpy: true,
                                scrollSpyOnce: item.hasAttribute('data-count-once') ? JSON.parse(item.dataset.countOnce.toLowerCase()) : true,
                            };
                            let count = new countUp.CountUp(item, dynamicCountEnd, CountOptions);
                            if (!count.error) {
                                count.start();
                            } else {
                                console.error(count.error);
                            }
                        });
                    }
                );
            }
            if($('[data-target="count"]').length > 0){
                loadCounterUpFunctions()
            };
            /* Go To Section Function */
            $('[data-goto]').on("click", function () {
                $("html,body").animate({
                    scrollTop: $($(this).data('goto')).get(0).offsetTop - 32
                }, 1000)
            });
		});

	})(jQuery)
});
