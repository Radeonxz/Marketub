const { createInvoice } = require('./createInvoice.js');

const invoice = {
  shipping: {
    client_id: 520,
    name: 'John Doe',
    address: '1234 Main Street',
    city: 'San Francisco',
    state: 'CA',
    country: 'US',
    postalcode: 94111
  },
  items: [
    {
      item: 'ACT-800',
      description: 'Toner Cartridge',
      quantity: 2,
      amount: 6000
    },
    {
      item: 'MAIL',
      description: 'USB Cable Extender',
      quantity: 1,
      amount: 2000
    },
    {
      item: 'LONGNAME',
      description: 'Toner Cartridge',
      quantity: 2,
      amount: 6000
    },
    {
      item: 'VERYLONG-NAME',
      description: 'USB Cable Extender',
      quantity: 1,
      amount: 2000
    },
    {
      item: 'VERYVERY-LONG-NAME',
      description: 'Description can also be very long enough',
      quantity: 2,
      amount: 6000
    }
  ],
  subtotal: 0,
  paid: 0,
  invoice_nr: 131902
};

const contractor = {
  user_id: 250,
  company: 'Dumy Inc.',
  address: '250 Dumy Street',
  city: 'Dumy City',
  province: 'DY',
  country: 'DY',
  postalcode: '2D5 U0M',
  footer: 'Please pay your bill on time!'
}
const prefix = 'INV';
const date = new Date();
let month = date.getMonth() + 1;
month = month < 10 ? `0${month}` : month;
const name = `${prefix}${invoice.invoice_nr}_${contractor.user_id}_${invoice.shipping.client_id}_AT_${date.getFullYear()}${month}${date.getDate()}.pdf`

for(let i = 0; i < invoice.items.length; i++) {
  invoice.subtotal += invoice.items[i].amount;
}

createInvoice(invoice, contractor, name);