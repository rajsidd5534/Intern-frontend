const BASE_URL = "https://intern-backend-2-t2wb.onrender.com";

// Save User
$("#userForm").submit(function (e) {

    e.preventDefault();

    const alphabetRegex = /^[A-Za-z\s]+$/;

    if (!alphabetRegex.test($("#firstName").val())) {
        alert("First Name should contain only alphabets.");
        return;
    }

    if (!alphabetRegex.test($("#lastName").val())) {
        alert("Last Name should contain only alphabets.");
        return;
    }

    if (!alphabetRegex.test($("#city").val())) {
        alert("City should contain only alphabets.");
        return;
    }

    if (!alphabetRegex.test($("#state").val())) {
        alert("State should contain only alphabets.");
        return;
    }

    if (!alphabetRegex.test($("#country").val())) {
        alert("Country should contain only alphabets.");
        return;
    }

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

         socket.emit("join_live_users", {

        name: response.data.firstName + " " + response.data.lastName,

        email: response.data.email

         });
            alert(response.message);
            $("#userForm")[0].reset();

        },

        error: function (error) {

            if (error.responseJSON && error.responseJSON.message) {
                alert(error.responseJSON.message);
            } else {
                alert("Invalid input. Please check all fields.");
            }

        }

    });

});

// Display Users
if ($("#tableBody").length) {

    $.ajax({

        url: "https://intern-backend-2-t2wb.onrender.com/api/users",
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