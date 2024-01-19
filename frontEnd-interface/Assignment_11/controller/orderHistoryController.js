import {OrdersModel} from "../model/ordersModel.js"
import {customer_db, orders_db} from "../db/db.js";
import {items_db} from "../db/db.js";
import {orders_history_db} from "../db/db.js"
import {ItemModel} from "../model/itemModel.js";
import {Orders_history_Model} from "../model/Orders_history_Model .js"


// load order history
export const loadHistory = () => {

    $('#order-history-tbl-body').empty();

    orders_history_db.map((item, index) => {
        let tbl_row = `<tr>
                        <td class="order_id">${item.order_id}</td>
                        <td class="date">${item.date}</td>
                        <td class="customer_id">${item.customer_id}</td>
                        <td class="ordersModel"> <button type="button" class="btn btn-info">Click</button> </td>
                        <td class="discount">${item.discount}</td>
                        <td class="sub_total">${item.sub_total}</td>
                        </tr>`;
        $('#order-history-tbl-body').append(tbl_row);
    });

};


$("#order-history-tbl-body").on('click', 'tr', function (){

    let selectedId = $(this).find("td:nth-child(1)").text();
    console.log("order Id is : ",selectedId);

    let index = orders_history_db.findIndex(order => order.order_id === selectedId);
    console.log(index);

    if(index == -1) return;

    $('#order-history-items-tbl-body').empty();
    orders_history_db[index].orders_items.map((item) => {

        let tbl_row = `<tr>
                        <td class="items_id">${item.items_id}</td>
                        <td class="items_name">${item.items_name}</td>
                        <td class="items_price">${item.items_price}</td>
                        <td class="items_qty">${item.order_qty}</td>
                        </tr>`;
        $('#order-history-items-tbl-body').append(tbl_row);


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
