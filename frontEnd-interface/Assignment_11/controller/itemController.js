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


// Clean inputs
const cleanInputs = () => {
    $('#items_id').val('');
    $('#items_name').val('');
    $('#items_qty').val('');
    $('#items_price').val('');
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



// Load items
export const loadItems = () => {
    $('#items-tbl-body').empty();

    items_db.map((item, index) => {
        let tbl_row = `<tr>
                        <td class="items_id">${item.items_id}</td>
                        <td class="items_name">${item.items_name}</td>
                        <td class="items_qty">${item.items_qty}</td>
                        <td class="items_price">${item.items_price}</td>
                        </tr>`;
        $('#items-tbl-body').append(tbl_row);
    });
};

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

        Swal.fire(
            'Success!',
            'Customer has been saved successfully!',
            'success'
        );

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


    let items = new ItemModel(items_id, items_name, items_qty, items_price);
    items_db.push(items);

    cleanInputs();
    loadItems();
    generateItemsId();
});

// Update item
$('#items-btns>button').eq(1).on('click', () => {
    let items_id = $('#items_id').val();
    let items_name = $('#items_name').val();
    let items_qty = $('#items_qty').val();
    let items_price = $('#items_price').val();

    let items_obj = new ItemModel(items_id, items_name, items_qty, items_price);

    // Find item index
    let index = items_db.findIndex(item => item.items_id === items_id);

    if (index !== -1) {
        // Update the item in the database
        items_db[index] = items_obj;

        // Clear the input fields
        cleanInputs();

        // Reload items
        loadItems();
    }
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

    let index = $(this).index();

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
    let items_search = $('#items-search').val().toLowerCase();

    let results = items_db.filter(item =>
        item.items_name.toLowerCase().includes(items_search) ||
        item.items_id.toLowerCase().includes(items_search) ||
        item.items_id.toLowerCase().includes(items_search)
    );

    $('#items-tbl-body').empty();
    results.forEach(item => {
        let tbl_row = `<tr>
                        <td class="items_id">${item.items_id}</td>
                        <td class="items_name">${item.items_name}</td>
                        <td class="items_qty">${item.items_qty}</td>
                        <td class="items_price">${item.items_price}</td>
                        </tr>`;
        $('#items-tbl-body').append(tbl_row);
    });
});
