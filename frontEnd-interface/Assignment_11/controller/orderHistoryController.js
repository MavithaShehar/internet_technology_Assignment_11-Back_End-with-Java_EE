import {OrdersModel} from "../model/ordersModel.js"
import {customer_db, orders_db} from "../db/db.js";
import {items_db} from "../db/db.js";
import {orders_history_db} from "../db/db.js"
import {ItemModel} from "../model/itemModel.js";
import {Orders_history_Model} from "../model/Orders_history_Model .js"


// load order history
export const loadHistory = () => {

    $.ajax({
        url:'http://localhost:8080/scope/order',
        method: 'GET',
        dataType: 'json',
        success:function (data){
            $('#order-history-tbl-body').empty();

            data.map((item, index) => {

                $("#order-history-tbl-body").append(`<tr>
                        <td class="order_id">${item.o_id}</td>
                        <td class="date">${item.o_date}</td>
                        <td class="customer_id">${item.c_id}</td>
                        <td class="ordersModel">  <button type="button" class="btn btn-info">${item.o_items}</button></td>
                        <td class="discount">${item.discount}</td>
                        <td class="sub_total">${item.amount}</td>
                            </tr>`);

            });

        },
        error: function (xhr, status, error) {
            console.error('AJAX request failed: ' + status + ', ' + error);
        }

        });

};


$("#order-history-tbl-body").on('click', 'tr', function (){

    let selectedId = $(this).find("td:nth-child(1)").text();
    console.log("order Id is : ",selectedId);

    $.ajax({
        url:'http://localhost:8080/scope/order_items?o_id='+selectedId,
        method: 'GET',
        dataType: 'json',
        success:function (data){
            $('#order-history-items-tbl-body').empty();

            data.map((item, index) => {

                $("#order-history-items-tbl-body").append(`<tr>
                         <td class="items_id">${item.i_id}</td>
                        <td class="items_name">${item.i_name}</td>
                        <td class="items_price">${item.i_qty}</td>
                        <td class="items_qty">${item.i_price}</td>
                            </tr>`);

            });

        },
        error: function (xhr, status, error) {
            console.error('AJAX request failed: ' + status + ', ' + error);
        }

    });

});


// serch by orders

$('#orders-search').on('input', () => {
    let search_term = $('#orders-search').val();

    let results = orders_history_db.filter((item) =>
        item.order_id.toLowerCase().startsWith(search_term.toLowerCase())
    );

    $('#order-history-tbl-body').empty();
    results.forEach((item) => {
        let tbl_row = `<tr>
                        <td class="order_id">${item.order_id}</td>
                        <td class="date">${item.date}</td>
                        <td class="customer_id">${item.customer_id}</td>
                        <td class="ordersModel"> <button type="button" class="btn btn-info">Info</button> </td>
                        <td class="discount">${item.discount}</td>
                        <td class="sub_total">${item.sub_total}</td>
                        </tr>`;
        $('#order-history-tbl-body').append(tbl_row);
    });
});
