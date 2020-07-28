function loadAllData() {
    $.ajax({
        url: '/api/tasks',
        type: 'GET'
    })
    .then(res => {
        var data = res.data;
        var arrTodo = data.filter(function(item){
            return item.status == 'todo'
        });
        var arrDoing = data.filter(function(item){
            return item.status == 'doing'
        });
        var arrDone = data.filter(function(item){
            return item.status == 'done'
        });

        loadData($('#todo'), arrTodo);
        loadData($('#doing'), arrDoing);
        loadData($('#done'), arrDone);
        pretty();

        $( ".column" ).droppable({
            drop: function( event, ui ) {
                var idTask = ui.draggable.attr('id');
                var newStatus = $(this).attr('id');
                $.ajax({
                    url: '/api/tasks/' + idTask,
                    type: 'PUT',
                    data: {
                        status: newStatus
                    }
                })
                .then(res => {
                    alert('Transfer task done');
                })
                .catch(err => {
                    console.log(err);
                })
            }
        });
    })
    .catch(err => {
        console.log(err);
    })
}

loadAllData();

function loadData(container, data) {
    for (let i = 0; i < data.length; i++) {
        const task = data[i];
        container.append(`
            <div class="portlet" id=${task._id}>
                <div class="portlet-header">${task.title}</div>
                <div class="portlet-content">
                    <b>Description</b>: ${task.description}
                    <br>
                    <b>Deadline</b>: ${task.deadline}
                    <br>
                    <b>Member</b>: ${task.member}
                </div>
            </div>
        `)
    }
}

function pretty() {
    $( ".column" ).sortable({
        connectWith: ".column",
        handle: ".portlet-header",
        cancel: ".portlet-toggle",
        placeholder: "portlet-placeholder ui-corner-all"
    });

    $( ".portlet" )
        .addClass( "ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" )
        .find( ".portlet-header" )
        .addClass( "ui-widget-header ui-corner-all" )
        .prepend( "<span class='ui-icon ui-icon-minusthick portlet-toggle'></span>");

    $( ".portlet-toggle" ).on( "click", function() {
        var icon = $( this );
        icon.toggleClass( "ui-icon-minusthick ui-icon-plusthick" );
        icon.closest( ".portlet" ).find( ".portlet-content" ).toggle();
    });
}