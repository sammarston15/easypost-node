require('dotenv').config();


const Easypost = require('@easypost/api');
const apiKey = process.env.testKey;
// const apiKey = process.env.prodKey;
const api = new Easypost(apiKey);




api.Order.retrieve('order_af09f06c74a74c1c900c22aeb376eb20').then(order => {
    order.buy('FedEx', 'INTERNATIONAL_ECONOMY').then(console.log).catch(console.log)
}).catch(console.log);


// api.Order.retrieve('order_0e0fded9ef7d42cfb101c12076f769f7').then(console.log).catch(o => console.log(JSON.stringify(o)));