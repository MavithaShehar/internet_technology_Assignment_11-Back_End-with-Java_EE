import {OrdersModel} from "../model/ordersModel.js"
import {customer_db} from "../db/db.js";
import {items_db} from "../db/db.js";
import {orders_db} from "../db/db.js"
import {loadCustomers} from "../controller/orderController.js";
import {loadItems} from "../controller/orderController.js";
import {loadHistory} from "../controller/orderHistoryController.js";
// import {purchase_orders_db} from "../db/db.js";
// import {Ord} from "../model/Orders_history_Model .js"


$('#customer-section').css('display', 'none');
$('#item-section').css('display', 'none');
$('#order-section').css('display', 'none');
$('#dashboard-section').css('display', 'block');
$('#order-history-section').css('display', 'none');



$('#customer-nav').on('click', () => {
    $('#customer-section').css('display', 'block');
    $('#item-section').css('display', 'none');
    $('#order-section').css('display', 'none');
    $('#dashboard-section').css('display', 'none');
    $('#order-history-section').css('display', 'none');
});

$('#item-nav').on('click', () => {

    $('#customer-section').css('display', 'none');
    $('#order-section').css('display', 'none');
    $('#item-section').css('display', 'block');
    $('#dashboard-section').css('display', 'none');
    $('#order-history-section').css('display', 'none');
});

$('#order-history-nav').on('click', () => {

    loadHistory();

    $('#order-history-section').css('display', 'block');
    $('#customer-section').css('display', 'none');
    $('#order-section').css('display', 'none');
    $('#item-section').css('display', 'none');
    $('#dashboard-section').css('display', 'none');
});

$('#order-nav').on('click', () => {

    console.log("index item")

    loadCustomers();
    loadItems();
    $('#customer-section').css('display', 'none');
    $('#item-section').css('display', 'none');
    $('#order-section').css('display', 'block');
    $('#dashboard-section').css('display', 'none');
    $('#order-history-section').css('display', 'none');

});

$('#dash-nav').on('click', () => {
    $('#customer-section').css('display', 'none');
    $('#item-section').css('display', 'none');
    $('#order-section').css('display', 'none');
    $('#dashboard-section').css('display', 'block');
    $('#order-history-section').css('display', 'none');
});

