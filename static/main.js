$('.delete').click(function () {
    $(this).parent().parent().remove();
});

$('#addUser').click(function () {
    $('#usersTable').append('<tr><td><input class="username"></td><td><input class="password" size="60" value=""></td><td></td></tr>')
});

$('#addAcl').click(function () {
    $('#aclTable').append('<tr><td><input class="username" value=""></td><td><input class="name" value=""></td><td><select class="action"><option value=""></option><option value="pull">pull</option><option value="*">*</option></select></td><td></td></tr>')
});

$('#submit').click(function () {
    var users = {};
    $('#usersTable').find('tr').each(function () {

        var username = $(this).find('.username').text() || $(this).find('.username').val();
        users[username] = {};
        users[username].password = $(this).find('.password').val();
    });

    var acl = [];
    $('#aclTable').find('tr').each(function () {
        var entry = {};
        entry.match = {};
        entry.match['account'] = $(this).find('.username').val();
        var name = $(this).find('.name').val();
        if (name) {
            entry.match['name'] = name;
        }
        entry.actions = [];
        entry.actions.push($(this).find('.action').val());

        acl.push(entry);
    });

    $.ajax({
        url: "/users",
        type: 'PUT',
        contentType: 'application/json',
        processData: false,
        data: JSON.stringify(users)
    });

    $.ajax({
        url: "/acl",
        type: 'PUT',
        contentType: 'application/json',
        processData: false,
        data: JSON.stringify(acl)
    });
});