export class OrdersModel {
    constructor(items_id, items_name, order_qty, items_price, order_total) {
        this.items_id = items_id;
        this.items_name = items_name;
        this.order_qty = order_qty;
        this.items_price = items_price;
        this.order_total = order_total;
    }
}
