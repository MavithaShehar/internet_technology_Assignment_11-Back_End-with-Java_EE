import { ItemModel } from "../model/itemModel.js";
import {customer_db, items_db} from "../db/db.js";
import {OrdersModel} from "../model/ordersModel.js";
import {orders_db} from "../db/db.js"

// let item1 = new ItemModel("I001" , "aa" , 10 , 100);
// let item2 = new ItemModel("I002" , "bb" , 15 , 150);
// let item3 = new ItemModel("I003" , "cc" , 20 , 200);
//
// items_db.push(item1);
// items_db.push(item2);
// items_db.push(item3);


let row_index = -1;

// Clean inputs
const cleanInputs = () => {
    $('#items_id').val('');
    $('#items_name').val('');
    $('#items_qty').val('');
    $('#items_price').val('');

    row_index = -1;
};

// generate Items ID
function generateItemsId() {
    if (items_db.length === 0) {
        $("#items_id").val("I001");
        return;
    }
    let lastId = items_db[items_db.length - 1].items_id;
    lastId = lastId.substring(1);

    let newId = Number.parseInt(lastId) + 1 + "";
    newId = newId.padStart(3, "0");

    $("#items_id").val("I" + newId);
}



//Load items
export const loadItems = () => {


    $.ajax({
        url: 'http://localhost:8080/scope/items',
        method: 'GET',
        dataType: 'json',
        success: function (data) {

            $('#items-tbl-body').empty();

            data.map((item, index) => {

                $("#items-tbl-body").append(`<tr>
                        <td class="items_id">${item.i_id}</td>
                        <td class="items_name">${item.i_name}</td>
                        <td class="items_qty">${item.i_qty}</td>
                        <td class="items_price">${item.i_price}</td>
                        </tr>`);

            });
        },
        error: function (xhr, status, error) {
            console.error('AJAX request failed: ' + status + ', ' + error);
        }
    });
};

loadItems();

generateItemsId();
// Add item
$('#items-btns>button').eq(0).on('click', () => {

    let items_id = $('#items_id').val();
    let items_name = $('#items_name').val();
    let items_qty = $('#items_qty').val();
    let items_price = $('#items_price').val();


    if (items_id){
        $("#items_id").css("border", "");

        let index = items_db.findIndex(item => item.items_id === items_id);

        if (index !== -1) {
            Swal.fire({
                icon: 'error',
                title: 'Duplicate Items ID',
                text: 'Please Check Items ID Now !!',
                footer: '<a href="">Why do I have this issue?</a>'
            })
            return;
        }

    if(items_name){

    if (items_qty){

    if (items_price) {

        let items = new ItemModel(items_id, items_name, items_qty, items_price);
        items_db.push(items);

        var data = {
            i_id:items.items_id,
            i_name:items.items_name,
            i_qty:items.items_qty,
            i_price:items.items_price
        }

        console.log(JSON.stringify(items));

        $.ajax({
            url: 'http://localhost:8080/scope/items',
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
        loadItems();
        generateItemsId();



    }else {
        toastr.error('Please Enter Items Price');
        return;
    }

    }else {
        toastr.error('Please Enter Items quantity');
        return;
    }

    }else {
        toastr.error('Please Enter Items Name');
        return;
    }

    }else {
        $("#items_id").css("border", "1px solid red");
        toastr.error('Invalid Customer Item Id');
        return;
    }



});

// Update item
$('#items-btns>button').eq(1).on('click', () => {

    console.log("items update")

    let items_id = $('#items_id').val();
    let items_name = $('#items_name').val();
    let items_qty = $('#items_qty').val();
    let items_price = $('#items_price').val();

    console.log(items_id);
    console.log(items_name);
    console.log(items_qty);
    console.log(items_price);

    let items_obj = new ItemModel(items_id, items_name, items_qty, items_price);

    // Find item index
   // let index = items_db.findIndex(item => item.items_id === items_id);

    if (row_index > 0) {
        // Update the item in the database
        //items_db[index] = items_obj;

        var data = {
            i_id:items_obj.items_id,
            i_name:items_obj.items_name,
            i_qty:items_obj.items_qty,
            i_price:items_obj.items_price
        }

        console.log(JSON.stringify(items));

        $.ajax({
            url: 'http://localhost:8080/scope/items',
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

        // Clear the input fields
        cleanInputs();

        // Reload items
        loadItems();
    }

    // Clear the input fields
    cleanInputs();

    // Reload items
    loadItems();

    generateItemsId();
});

// Delete item
$('#items-btns>button').eq(2).on('click', () => {
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
            let items_id = $("#items_id").val();
            let index = items_db.findIndex(item => item.items_id === items_id);

            if (index !== -1) {
                // Remove the item from the database
                items_db.splice(index, 1);

                Swal.fire(
                    'Deleted!',
                    'Your item has been deleted.',
                    'success'
                );

                $.ajax({
                    url: 'http://localhost:8080/scope/customer?i_id=' + items_id,
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

                // Reload items
                loadItems();
            }
        }
    });

});

// Fill item
$('#items-tbl-body').on('click', 'tr', function () {

    console.log("tuch");

    row_index = 1;

    let items_id = $(this).find('.items_id').text();
    let items_name = $(this).find('.items_name').text();
    let items_qty = $(this).find('.items_qty').text();
    let items_price = $(this).find('.items_price').text();

    $('#items_id').val(items_id);
    $('#items_name').val(items_name);
    $('#items_qty').val(items_qty);
    $('#items_price').val(items_price);
});

// Search items
$('#items-search').on('input', () => {

    let search_term = $('#items-search').val();

    $.ajax({
        url: 'http://localhost:8080/scope/items?i_id='+search_term,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            let items = data;

            $('#items_id').val(items.i_id);
            $('#items_name').val(items.i_name);
            $('#items_qty').val(items.i_qty);
            $('#items_price').val(items.i_price);

        },
        error: function (xhr, status, error) {
            console.error('AJAX request failed: ' + status + ', ' + error);
        }
    });




    //let items_search = $('#items-search').val().toLowerCase();
    // let results = items_db.filter(item =>
    //     item.items_name.toLowerCase().includes(items_search) ||
    //     item.items_id.toLowerCase().includes(items_search) ||
    //     item.items_id.toLowerCase().includes(items_search)
    // );
    //
    // $('#items-tbl-body').empty();
    // results.forEach(item => {
    //     let tbl_row = `<tr>
    //                     <td class="items_id">${item.items_id}</td>
    //                     <td class="items_name">${item.items_name}</td>
    //                     <td class="items_qty">${item.items_qty}</td>
    //                     <td class="items_price">${item.items_price}</td>
    //                     </tr>`;
    //     $('#items-tbl-body').append(tbl_row);
    // });



});
