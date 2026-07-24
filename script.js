const BASE_URL = "https://intern-backend-2-t2wb.onrender.com/api/users";

// Save User
$("#userForm").submit(function (e) {

    e.preventDefault();

    const user = {

        firstName: $("#firstName").val(),
        lastName: $("#lastName").val(),
        mobile: $("#mobile").val(),
        email: $("#email").val(),

        street: $("#street").val(),
        city: $("#city").val(),
        state: $("#state").val(),
        country: $("#country").val(),

        loginId: $("#loginId").val(),
        password: $("#password").val()

    };

    $.ajax({

        url: BASE_URL,

        method: "POST",

        contentType: "application/json",

        data: JSON.stringify(user),

        success: function (response) {

            alert(response.message);

            $("#userForm")[0].reset();

        },

        error: function (error) {

            alert(error.responseJSON.message);

        }

    });

});

// Display Users
if ($("#tableBody").length) {

    $.ajax({

        url: BASE_URL,

        method: "GET",

        success: function (response) {

            let rows = "";

            response.data.forEach(function (user) {

                rows += `
                <tr>
                    <td>${user.firstName}</td>
                    <td>${user.lastName}</td>
                    <td>${user.mobile}</td>
                    <td>${user.email}</td>
                    <td>${user.address.street}</td>
                    <td>${user.address.city}</td>
                    <td>${user.address.state}</td>
                    <td>${user.address.country}</td>
                    <td>${user.loginId}</td>
                </tr>
                `;

            });

            $("#tableBody").html(rows);

        }

    });

}