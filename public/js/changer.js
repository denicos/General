$('#nxt').on('click', function() {
    moveTab("Next");
});
$('#prv').on('click', function() {
    moveTab("Previous");
});


function moveTab(nextOrPrev) {
    var currentTab = "";
    $('.nav-tabs li').each(function() {
        if ($(this).hasClass('active')) {
            currentTab = $(this);
        }
    });
    if (nextOrPrev == "Next") {
        if (currentTab.next().length) {
            currentTab.removeClass('active');
            currentTab.next().addClass('active');
        } else {} // do nothing for now

    } else {
        if (currentTab.prev().length) {
            currentTab.removeClass('active');
            currentTab.prev().addClass('active');
        } else {} //do nothing for now 
    }
}