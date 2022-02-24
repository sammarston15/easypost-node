require('dotenv').config();
const Easypost = require('@easypost/api');
const api = new Easypost(process.env.testKey);
// const api = new Easypost(process.env.prodKey);

report_types = ['payment_log', 'refund', 'shipment', 'shipment_invoice', 'tracker']

// refund report
const report = new api.Report({
  type: report_types[2],
  start_date: '2021-1-04',
  end_date: '2021-10-04',
  send_email: true
});
report.save().then(console.log).catch(console.log);



