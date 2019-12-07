$(document).ready(() => {

    let isEditing = false;
    let userID;


    // Get Users
    $.ajax({
        method: 'Get',
        dataType: 'Json',
        url: 'https://jsonplaceholder.typicode.com/users'
    }).done(users => {
        $.each(users, (i, user) => {
            $('#tableResults').append(`
                <tr>
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.username}</td>
                    <td>${user.company.name}</td>
                    <td>${user.email}</td>
                    <td class="text-center"><button id="edit" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#userModal"><i class="fas fa-user-edit"></i></button></td>
                    <td class="text-center"><button id="delete" class="btn btn-primary btn-sm"><i class="fas fa-user-slash"></i></button></td>
                </tr>
            `);
        })
    })

    
    // Get User
    $(document).on('click', '#edit', e => {

        isEditing = true;
        if (e.target.nodeName === 'I') {
            userID = e.target.parentNode.parentNode.parentNode.children[0].innerHTML;
        } else if (e.target.nodeName === 'BUTTON') {
            userID = e.target.parentNode.parentNode.children[0].innerHTML;
        }
        
        $.ajax({
            method: 'Get',
            dataType: 'Json',
            url: `https://jsonplaceholder.typicode.com/users/${userID}`,
        }).done(userInfo => {
            $('#name').val(`${userInfo.name}`);
            $('#username').val(`${userInfo.username}`);
            $('#company').val(`${userInfo.company.name}`);
            $('#email').val(`${userInfo.email}`);
        });

    });


    // User Submit
    $('#userForm').submit(e => {
        e.preventDefault();
    
        let name = $('#name').val();
        let username = $('#username').val();
        let company = $('#company').val();
        let email = $('#email').val();
        let url = 'https://jsonplaceholder.typicode.com/users';

        console.log(isEditing);

        // Put User
        if (isEditing) {

            $.ajax({
                method: 'Put',
                dataType: 'Json',
                url: `https://jsonplaceholder.typicode.com/users/${userID}`,
                data: {
                    name: name,
                    username: username,
                    company: company,
                    email: email
                }
            }).done(() => {
                $('#userForm').trigger('reset');
                isEditing = false;
            });

        // Post User    
        } else if (!isEditing) {

            $.post(
                'https://jsonplaceholder.typicode.com/users', {
                name: name,
                username: username,
                company: company,
                email: email
            }).done(newUser => {
                $('#userForm').trigger('reset');
    
                $('#tableResults').append(`
                    <tr>
                        <td>${newUser.id}</td>
                        <td>${newUser.name}</td>
                        <td>${newUser.username}</td>
                        <td>${newUser.company}</td>
                        <td>${newUser.email}</td>
                        <td class="text-center"><button class="btn btn-primary btn-sm"><i class="fas fa-user-edit"></i></button></td>
                        <td class="text-center"><button class="btn btn-primary btn-sm"><i class="fas fa-user-slash"></i></button></td>
                    </tr>
                `);
            });

        }
    
    })

    // Delete User
    $(document).on('click', '#delete', e => {

        let userID;
        if (e.target.nodeName === 'I') {
            userID = e.target.parentNode.parentNode.parentNode.children[0].innerHTML;
        } else if (e.target.nodeName === 'BUTTON') {
            userID = e.target.parentNode.parentNode.children[0].innerHTML;
        }
        
        $.ajax({
            method: 'Delete',
            dataType: 'Json',
            url: `https://jsonplaceholder.typicode.com/users/${userID}`
        }).done();

    });

})
