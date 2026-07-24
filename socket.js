const socket = io("https://intern-backend-2-t2wb.onrender.com");

socket.on("connect", () => {

    console.log("Connected");
    console.log(socket.id);

});

socket.on("live_users_list", (users) => {

    if ($("#liveUsersTable").length) {

        let rows = "";

        users.forEach((user) => {

            rows += `
                <tr>
                    <td>${user.name}</td>
                    <td>
                        <a href="#" class="user-link" data-email="${user.email}">
                            ${user.email}
                        </a>
                    </td>
                    <td>
                        <a href="#" class="user-link" data-email="${user.email}">
                            ${user.socketId}
                        </a>
                    </td>
                </tr>
            `;

        });

        $("#liveUsersTable").html(rows);

    }

});

$(document).on("click", ".user-link", function (e) {

    e.preventDefault();

    const email = $(this).data("email");

    $.ajax({

        url:  "https://intern-backend-2-t2wb.onrender.com/api/users",
        method: "GET",

        success: function (response) {

            const user = response.data.find(u => u.email === email);

            if (!user) {
                alert("User not found");
                return;
            }

            $("#userDetails").html(`
                <p><b>First Name:</b> ${user.firstName}</p>
                <p><b>Last Name:</b> ${user.lastName}</p>
                <p><b>Mobile:</b> ${user.mobile}</p>
                <p><b>Email:</b> ${user.email}</p>
                <p><b>Street:</b> ${user.address.street}</p>
                <p><b>City:</b> ${user.address.city}</p>
                <p><b>State:</b> ${user.address.state}</p>
                <p><b>Country:</b> ${user.address.country}</p>
                <p><b>Login ID:</b> ${user.loginId}</p>
            `);

            $("#userModal").show();

        },

        error: function () {

            alert("Unable to fetch user details.");

        }

    });

});