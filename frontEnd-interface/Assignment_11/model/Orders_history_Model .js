export class Orders_history_Model {
    constructor(order_id, date, customer_id, orders_items, discount, sub_total) {
        this.order_id = order_id;
        this.date = date;
        this.customer_id = customer_id;
        this.orders_items = orders_items;
        this.discount = discount;sub_total
        this.sub_total = sub_total;
    }
}
