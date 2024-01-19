import {customer_db, orders_db} from '../db/db.js';
import {CustomerModel} from '../model/customerModel.js';

const sriLankanMobileNumberRegex = /^(\+94|0)[1-9][0-9]{8}$/;

// clean inputs
const cleanInputs = () => {
    $('#customer_id').val('');
    $('#customer_name').val('');
    $('#customer_address').val('');
    $('#customer_mobile').val('');
};

// generate oder ID
function generateCustomerId() {
    if (customer_db.length === 0) {
        $("#customer_id").val("C001");
        return;
    }
    let lastId = customer_db[customer_db.length - 1].customer_id;
    lastId = lastId.substring(1);

    let newId = Number.parseInt(lastId) + 1 + "";
    newId = newId.padStart(3, "0");

    $("#customer_id").val("C" + newId);
}

// load customers
const loadCustomers = () => {

    $('#customer-tbl-body').empty();

    $.ajax({
        url: 'http://localhost:8080/scope/customer',
        method: 'GET',
        dataType: 'json',
        success: function (data) {

            data.map((item, index) => {

            $("#customer-tbl-body").append(`<tr>
                        <td class="customer_id">${item.c_id}</td>
                        <td class="customer_name">${item.c_name}</td>
                        <td class="customer_address">${item.c_address}</td>
                        <td class="customer_mobile">${item.c_contact}</td>
                        </tr>`);

            });
        },
        error: function (xhr, status, error) {
            console.error('AJAX request failed: ' + status + ', ' + error);
        }
    });

}

loadCustomers();

generateCustomerId();

// Add customer
$('#customer-btns>button').eq(0).on('click', () => {

    console.log("hello customer");


    let customer_id = $('#customer_id').val();
    let customer_name = $('#customer_name').val();
    let customer_address = $('#customer_address').val();
    let customer_mobile = $('#customer_mobile').val();


    if (customer_id) {
        let index = customer_db.findIndex(item => item.customer_id === customer_id);

        if (index !== -1) {
            Swal.fire({
                icon: 'error',
                title: 'Duplicate Customer ID',
                text: 'Please Check Customer ID Now !!',
                footer: '<a href="">Why do I have this issue?</a>'
            })
            return;
        }

        if(customer_name) {

            if(customer_address) {

                let isValid = sriLankanMobileNumberRegex.test(customer_mobile);
                if(customer_mobile && isValid) {

                    let customer = new CustomerModel(customer_id, customer_name, customer_address, customer_mobile);
                    customer_db.push(customer);

                    var data = {
                        c_id:customer.customer_id,
                        c_name:customer.customer_name,
                        c_address:customer.customer_address,
                        c_contact:customer.customer_mobile
                    }

                    console.log(JSON.stringify(customer));

                    $.ajax({
                        url: 'http://localhost:8080/scope/customer',
                        method: 'POST',
                        dataType: 'json',
                        contentType:'application/json',
                        data:JSON.stringify(data),
                        success: function (data) {
                            console.log(data)
                        },
                        error: function (xhr, status, error) {
                            console.log('AJAX request failed'+status);
                        }
                    });


                    Swal.fire(
                        'Success!',
                        'Customer has been saved successfully!',
                        'success'
                    );

                    cleanInputs();
                    loadCustomers(); // call load customer function

                } else {
                    toastr.error('Invalid Customer Mobile Number');
                }

            } else {
                toastr.error('Invalid Customer Address');
            }

        } else {
            toastr.error('Invalid Customer First Name');
        }

    } else {
        toastr.error('Invalid Customer Id');
    }

    const customer_count = customer_db.length;
    $('#customers_count').text(customer_count);

    generateCustomerId();

});



// update
$("#customer-btns>button").eq(1).on("click", () => {

    console.log("hello customer update")

    let customer_id = $('#customer_id').val();
    let customer_name = $('#customer_name').val();
    let customer_address = $('#customer_address').val();
    let customer_mobile = $('#customer_mobile').val();

    let customer_obj = new CustomerModel(customer_id, customer_name, customer_address, customer_mobile);

    // find item index
    let index = customer_db.findIndex(item => item.customer_id === customer_id);

    if (index !== -1){

        // update item in the db
        customer_db[index] = customer_obj;

        var data = {
            c_id:customer_obj.customer_id,
            c_name:customer_obj.customer_name,
            c_address:customer_obj.customer_address,
            c_contact:customer_obj.customer_mobile
        }

        console.log(JSON.stringify(customer));

        $.ajax({
            url: 'http://localhost:8080/scope/customer',
            method: 'PUT',
            dataType: 'json',
            contentType:'application/json',
            data:JSON.stringify(data),
            success: function (data) {
                console.log(data)
            },
            error: function (xhr, status, error) {
                console.log('AJAX request failed'+status);
            }
        });
        // clear();
        cleanInputs();

        // load customer data
        loadCustomers();

    }
// Clear the input fields
    cleanInputs();
    // load student data
    loadCustomers();

    generateCustomerId();

})

// delete
$("#customer-btns>button").eq(2).on("click", () => {

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete this!'
    }).then((result) => {
        if (result.isConfirmed) {

            let customer_id = $("#customer_id").val();

            // find item index
            let index = customer_db.findIndex(item => item.customer_id === customer_id);

            // remove the item from the db
            customer_db.splice(index, 1);

            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )

            $.ajax({
                url: 'http://localhost:8080/scope/customer?c_id=' + customer_id,
                method: 'DELETE',
                dataType: 'json',
                contentType:'application/json',
                success: function (data) {
                    Swal.fire(
                        'Success',
                        'Customer deleted successfully',
                        'success'
                    )

                    // Clear the input fields
                    cleanInputs();
                    // load student data
                    loadCustomers();

                },
                error: function (xhr, status, error) {
                    console.log('AJAX request failed'+status);
                }
            });

            // Clear the input fields
            cleanInputs();
            // load student data
            loadCustomers();

        }
    })
})

// fill customer
$('#customer-tbl-body').on('click', 'tr' , function() {
    let index = $(this).index();

    let customer_id = $(this).find('.customer_id').text();
    let customer_name = $(this).find('.customer_name').text();
    let customer_address = $(this).find('.customer_address').text();
    let customer_mobile = $(this).find('.customer_mobile').text();

    $('#customer_id').val(customer_id);
    $('#customer_name').val(customer_name);
    $('#customer_address').val(customer_address);
    $('#customer_mobile').val(customer_mobile);

    console.log("customer_id: ", customer_id);
});


// serch customer

$('#customer-search').on('input', () => {
    let search_term = $('#customer-search').val();

    $.ajax({
        url: 'http://localhost:8080/scope/customer?c_id='+search_term,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            let customer = data;

            $('#customer_id').val(customer.c_id);
            $('#customer_name').val(customer.c_name);
            $('#customer_address').val(customer.c_address);
            $('#customer_mobile').val(customer.c_contact);

        },
        error: function (xhr, status, error) {
            console.error('AJAX request failed: ' + status + ', ' + error);
        }
    });

    // let results = customer_db.filter((item) =>
    //
    //     item.customer_id.toLowerCase().startsWith(search_term.toLowerCase()) ||item.customer_name.toLowerCase().startsWith(search_term.toLowerCase()) || item.customer_address.toLowerCase().startsWith(search_term.toLowerCase()) || item.customer_mobile.startsWith(search_term)
    //
    // );
    //
    //
    // console.log(results);
    //
    // $('#customer-tbl-body').empty();
    // results.map((item, index) => {
    //     let tbl_row = `<tr><td class="customer_id">${item.customer_id}</td><td class="customer_name">${item.customer_name}</td><td class="customer_last_name">${item.customer_last_name}</td><td class="customer_mobile">${item.customer_mobile}</td></tr>`;
    //     $('#customer-tbl-body').append(tbl_row);
    // });

});


// let customer1 = new CustomerModel("C001" , "Shehar" , "Alpitiya" , "0758745308");
// let customer2 = new CustomerModel("C002" , "Shehar" , "Alpitiya" , "0758745308");
// let customer3 = new CustomerModel("C003" , "Shehar" , "Alpitiya" , "0758745308");
// let customer4 = new CustomerModel("C004" , "Shehar" , "Alpitiya" , "0758745308");
// let customer5 = new CustomerModel("C005" , "Shehar" , "Alpitiya" , "0758745308");
//
// customer_db.push(customer1);
// customer_db.push(customer2);
// customer_db.push(customer3);
// customer_db.push(customer4);
// customer_db.push(customer5);


