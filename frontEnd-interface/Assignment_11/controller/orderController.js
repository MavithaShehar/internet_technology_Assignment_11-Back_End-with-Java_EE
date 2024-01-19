import {OrdersModel} from "../model/ordersModel.js"
import {customer_db} from "../db/db.js";
import {items_db} from "../db/db.js";
import {orders_db} from "../db/db.js"
import {orders_history_db} from "../db/db.js"
import {ItemModel} from "../model/itemModel.js";
import {Orders_history_Model} from "../model/Orders_history_Model .js"

function getLastCustomerId(customer_db) {
    const lastIndex = customer_db.length - 1;
    if (lastIndex >= 0) {
        return customer_db[lastIndex].customer_id;
    } else {
        return null;
    }
}

// Example usage:

const lastCustomerId = getLastCustomerId(customer_db);

if (lastCustomerId !== null) {
    console.log("Last Customer ID:", lastCustomerId);
} else {
    console.log("The array is empty. There are no customer IDs.");
}


// date pick
const loadDate = () => {

    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const nowDate = yyyy + '-' + mm + '-' + dd;

    console.log(nowDate);
    document.getElementById("datePicker").defaultValue = nowDate;


}

// generate oder ID
function generateOderId() {
    if (orders_history_db.length === 0) {
        $("#order_id").val("O001");
        return;
    }
    let lastId = orders_history_db[orders_history_db.length - 1].order_id;
    lastId = lastId.substring(1);

    let newId = Number.parseInt(lastId) + 1 + "";
    newId = newId.padStart(3, "0");

    $("#order_id").val("O" + newId);
}



// load customers
export const loadCustomers = () => {

    getLastCustomerId(customer_db);
    loadDate();

    $("#customer").empty();
    $("#customer").append(`<option selected hidden>Select Customer</option>`);
    customer_db.map((customer) => {
        $("#customer").append(`<option value="${customer.customer_id}">${customer.customer_id}</option>`);
    });
};

generateOderId();

// load customers for order customer text field
$("#customer").on('change' , ()=> {
    let customerId = $("#customer").val();

    // Find the customer in the customer_db array based on customer_id
    let customer = customer_db.find(customer => customer.customer_id === customerId);

    // Find the index of the customer in the customer_db array
    let cusRowIndex = customer_db.findIndex(customer => customer.customer_id === customerId);

    let customer_id = customer_db[cusRowIndex].customer_id;
    let customer_name = customer_db[cusRowIndex].customer_name;
    let customer_address = customer_db[cusRowIndex].customer_address;
    let customer_mobile = customer_db[cusRowIndex].customer_mobile;

    // $('#customer_id').val(customer_id);
    $('#order_customer_name').val(customer_name);
    $('#order_customer_address').val(customer_address);
    $('#order_customer_mobile').val(customer_mobile);

});


// load items
export const loadItems = () => {

    $("#items").empty();
    $("#items").append(`<option selected hidden>Select Item</option>`);
    items_db.map((items) => {
        $("#items").append(`<option value="${items.items_id}">${items.items_id}</option>`);
    });
};

//load customers for order customer text field
$("#items").on('change', () => {
    let itemsId = $("#items").val();

    // Find the items in the items_db array based on items_id
    let items = items_db.find(items => items.items_id === itemsId);

     // Check if the item exists in the items_db array
    if (items) {
        // If it exists, find the index
        let itmRowIndex = items_db.findIndex(item => item.items_id === itemsId);

        //Access properties of the selected item
        let items_id = items.items_id;
        let order_items_name = items.items_name;
        let order_items_qty = items.items_qty;
        let order_items_price = items.items_price;

        // $('#items_id').val(items_id);
        $('#order_items_name').val(order_items_name);
        $('#store_items_qty').val(order_items_qty);
        $('#order_items_price').val(order_items_price);

        // Now, you can use these properties as needed
    } else {
        toastr.error("Item not found in Data Base");
    }
});


// Handle "Add Items" button click
$('#add_items').eq(0).on('click', () => {

    const order_id =$("#order_id").val();

    let index = orders_history_db.findIndex(item => item.order_id === order_id);

    $("#discount").val(0);

    if (index !== -1)  {
        toastr.error("Order ID is null or empty.");
        $("#order_id").css("border", "2px solid red");
        return;
    }else {
        $("#order_id").css("border", "");
    }


    // Continue with processing order items
    let order_items_id =  $('#items').val();
    let order_qty = parseFloat($("#order_qty").val());
    let order_items_name = $("#order_items_name").val(); // Assuming it's a string, not a number
    let order_items_price = parseFloat($("#order_items_price").val());
    let store_items_qty = parseFloat($("#store_items_qty").val());


    // Validate order_qty and order_items_price
    if (isNaN(order_qty) ) {
        toastr.error("Invalid input for order quantity or price.");
        return;
    }

    // Check if store_items_qty is available
    if (store_items_qty === 0) {
        toastr.error("This Item is out of Stock.");
        return;
    }

    if (store_items_qty < order_qty) {
        toastr.error("This Item Cunt not in Stock .");
        return;
    }

    // Check if order_qty is greater than 0
    if (order_qty === 0) {
        toastr.error("Please Input the Order Count of This Item.");
        return;
    }

    // Proceed with calculations and updates
    let total = some(order_qty, order_items_price);
    reduce(order_qty);
    dataLabel(total);

    // Create an order instance and push it into orders_db
    lodeDatabase(order_items_id, order_items_name, order_qty, order_items_price, total);


    $('#order_qty').val('');

    loadOrders();

    updateTbl(order_items_id);

});

// calqulate balance
$('#cash, #discount').on('input', () => {

    subTotal();
});

const lodeDatabase = (order_items_id, order_items_name, order_qty, order_items_price, total) => {
    let index = orders_db.findIndex(item => item.items_id === order_items_id);

    if (index !== -1) {
        // Update an existing order if it exists
        orders_db[index].items_qty = order_items_id;
        orders_db[index].items_name = order_items_name;
        orders_db[index].order_qty += order_qty;
        orders_db[index].items_price = order_items_price;
        orders_db[index].order_total += total;
    } else {
        // Create a new order if it doesn't exist
        let order = new OrdersModel(order_items_id, order_items_name, order_qty, order_items_price, total);
        orders_db.push(order);
    }
}

//updateTbl items tabel
const updateTbl = (order_items_id) => {

    let items = order_items_id;

    let order_items_name = $('#order_items_name').val();
    let order_items_price = $('#order_items_price').val();
    let store_items_qty = $('#store_items_qty').val();

    let items_obj = new ItemModel(items, order_items_name, store_items_qty, order_items_price);

    // find item index
    let index = items_db.findIndex(item => item.items_id === items);

    // update item in the db
    items_db[index] = items_obj;

    newloadItems();

}

// Load new items table lode
const newloadItems = () => {
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


// load order table
const loadOrders = () => {

    console.log("ORDERS IS ", orders_db);


    $('#order-tbl-body').empty();

    orders_db.map((item, index) => {
        let tbl_row = `<tr>
                        <td class="order_itrms_id">${item.items_id}</td>
                        <td class="order_itrms_name">${item.items_name}</td>
                        <td class="order_itrms_qty">${item.order_qty}</td>
                        <td class="order_itrms_price">${item.items_price}</td>
                        <td class="order_itrms_total">${item.order_total}</td>
                         <td class="selection"><button type="button" style="margin-left: 100px" class="btn btn-danger">X</button></i></td>
                        </tr>`;
        $('#order-tbl-body').append(tbl_row);
    });

};



// Calculate total price of items
const some = (order_qty, order_items_price) => {
    let total = order_qty * order_items_price;
    console.log("*** Total is: ", total);
    return total;
};

// Reduce store items quantity
const reduce = (order_qty) => {
    let store_qty = parseFloat($("#store_items_qty").val());

    if (isNaN(store_qty) || isNaN(order_qty)) {
        console.log("Invalid input for store quantity or order quantity.");
        return;
    }

    let reducedQty = store_qty - order_qty;
    $('#store_items_qty').val(reducedQty);
}

// Set total for label
let runningTotal = 0;
const dataLabel = (total) => {
    runningTotal += total;
    $("#total_mount").text(runningTotal);
    $("#sub_total_label #sub_total").text(runningTotal);


}

// Calculate subtotal with discount
const subTotal = () => {
    let discount = parseFloat($("#discount").val());
    let cash = parseFloat($("#cash").val());
    let total = parseFloat($('#total_mount').text());

    let discountedAmount = total * (discount / 100);
    let subTotal = total - discountedAmount;
    let change = cash - subTotal;

    // Update the sub-total label
    $("#sub_total_label #sub_total").text(subTotal);
    $("#balance").val(change);


}



let total_amount_pre_day = 0;
let sale_count =0

$('#purchase').on('click', () => {

    let order_id = $('#order_id').val();
    let index = orders_history_db.findIndex(order => order.order_id === order_id);

    let total_amount = $('#sub_total').text(); // Get the text content
    total_amount = parseFloat(total_amount);
    total_amount_pre_day = total_amount_pre_day+total_amount;
    $('#total-amount-pre-day').text(total_amount_pre_day);


    if (index !== -1) {
        Swal.fire({
            icon: 'error',
            title: 'This Order ID is Already Exists',
            text: 'Please Check Orders ID Now !!',
        });
        return;
    }

    Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`
    }).then((result) => {

        if (result.isConfirmed) {
            Swal.fire("Saved!", "", "success");

            lod_order_history();
            sale_count ++;
            $("#sale_count").text(sale_count);
            generateOderId();

        } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
        }
    });


});


const lod_order_history = () => {
    let order_id = $('#order_id').val();
    let customer_id = $('#customer').val();
    let datePicker = $('#datePicker').val();
    let discount = $('#discount').val();
    let sub_total = $('#sub_total').text();

    let order_items = orders_db.slice();

    let order = new Orders_history_Model(
        order_id,
        datePicker,
        customer_id,
        order_items,
        discount,
        sub_total
    );

    orders_history_db.push(order);

    // Reset values
    runningTotal = 0;
    $('#total_mount').text("0");
    $('#sub_total').text("0");
    $('#cash').val("");
    $('#balance').val("");
    $('#order-tbl-body').empty();


    orders_db.length = 0;

};


// delete
$('#order-tbl-body').on('click', '.selection button', function () {
    console.log("click Remove button");
    console.log("click Remove button")

    const orderID = $(this).closest('tr').find('.order_itrms_id').text();
    const indexToRemove = orders_db.findIndex(item => item.items_id === orderID);
    const items_db_index = items_db.findIndex(item => item.items_id === orderID);

    const order_qty = parseFloat(orders_db[indexToRemove].order_qty);

    const order_total = parseFloat(orders_db[indexToRemove].order_total);
    const old_total = $('#total_mount').text();
    const sub_total_label = $('#sub_total_label').text();

    const stock_qty = parseFloat(items_db[items_db_index].items_qty);

    const new_qty = stock_qty + order_qty;

    const new_total = old_total - order_total;
    const new_sub_total = sub_total_label - old_total
    $('#total_mount').text(new_total);
    $("#sub_total_label #sub_total").text(new_total);

    runningTotal -=new_total;
    total_amount_pre_day -=new_total;

    $('#store_items_qty').val(new_qty) ;
        orders_db.splice(indexToRemove, 1);
        updateTbl(orderID);
        loadOrders();
});

// search orders
$('#order_id').on('input', () => {
    let search_term = $('#order_id').val();


    let results = orders_db.filter((item) =>

        item.items_name.toLowerCase().startsWith(search_term.toLowerCase()) || item.order_qty.toLowerCase().startsWith(search_term.toLowerCase()) || item.items_price.startsWith(search_term)|| item.order_total.startsWith(search_term)
    )
});