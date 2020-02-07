const fs = require("fs");
const PDFDocument = require("pdfkit");

exports.createInvoice = (invoice, contractor, path) => {
  let doc = new PDFDocument({ size: "A4", margin: 50 });

  const invoiceEdge = 160;
  let invoiceTableTop = 330;
  const invoiceTabHeight = 30;
  const footerTop = 780;

  const taxes = calTax(invoice.subtotal);

  const totalTabs = invoice.items.length;
  const rows = Math.ceil((footerTop - invoiceTableTop) / invoiceTabHeight) - 1;
  const pages = Math.ceil(totalTabs / rows);
  for (let i = 0; i < pages; i++) {
    generateHeader(doc, contractor);
    if (i == 0) {
      generateCustomerInformation(doc, invoice, taxes, invoiceEdge);
    }
    const invoiceItems = invoice.items.splice(0, rows);

    if (i > 0) {
      invoiceTableTop = invoiceEdge;
    }
    generateInvoiceTable(doc, invoiceItems, invoiceTabHeight, invoiceTableTop);

    if (pages - i == 1) {
      const index = totalTabs - rows * i;
      generateInvoiceSubTotal(
        doc,
        invoice,
        taxes,
        invoiceTabHeight,
        invoiceTableTop,
        index
      );
    }
    const pagination = `${i + 1} / ${pages}`;
    generateFooter(doc, invoice.invoice_nr, pagination, footerTop);

    if (i < pages - 1) {
      doc.addPage({ size: "A4", margin: 50 });
    }
  }

  doc.end();
  doc.pipe(fs.createWriteStream(path));
};

const generateHeader = (doc, contractor) => {
  doc
    .image("logo.png", 50, 45, { width: 50 })
    .fillColor("#444444")
    .fontSize(20)
    .text(contractor.company, 110, 60)
    .fontSize(10)
    .text(contractor.company, 200, 50, { align: "right" })
    .text(contractor.address, 200, 65, { align: "right" })
    .text(
      `${contractor.city}, ${contractor.province}, ${contractor.country}`,
      200,
      80,
      { align: "right" }
    )
    .text(`${contractor.postalcode}`, 200, 95, { align: "right" })
    .moveDown();
};

const generateCustomerInformation = (doc, invoice, taxes, invoiceEdge) => {
  doc
    .fillColor("#444444")
    .fontSize(20)
    .text("Invoice", 50, invoiceEdge);

  generateHr(doc, 185);

  const customerInformationTop = 200;

  doc
    .fontSize(10)
    .text("Invoice Number:", 50, customerInformationTop)
    .font("Helvetica-Bold")
    .text(invoice.invoice_nr, 150, customerInformationTop)
    .font("Helvetica")
    .text("Invoice Date:", 50, customerInformationTop + 15)
    .text(formatDate(new Date()), 150, customerInformationTop + 15)
    .text("Balance Due:", 50, customerInformationTop + 30)
    .text(
      formatCurrency(invoice.subtotal + taxes.gst + taxes.qst - invoice.paid),
      150,
      customerInformationTop + 30
    )

    .font("Helvetica-Bold")
    .text(invoice.shipping.name, 300, customerInformationTop)
    .font("Helvetica")
    .text(invoice.shipping.address, 300, customerInformationTop + 15)
    .text(
      `${invoice.shipping.city}, ${invoice.shipping.state}, ${invoice.shipping.country}, ${invoice.shipping.postalcode}`,
      300,
      customerInformationTop + 30
    )
    .moveDown();

  generateHr(doc, 252);
};

const generateInvoiceTable = (
  doc,
  invoiceItems,
  invoiceTabHeight,
  invoiceTableTop
) => {
  let i;
  // const invoiceTableTop = 330;

  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    invoiceTableTop,
    "Service",
    "Description",
    "Unit Cost",
    "Quantity",
    "Line Total"
  );
  generateHr(doc, invoiceTableTop + 20);
  doc.font("Helvetica");

  for (i = 0; i < invoiceItems.length; i++) {
    const item = invoiceItems[i];
    const position = invoiceTableTop + (i + 1) * invoiceTabHeight;
    const totalPrice = formatCurrency(item.amount);
    const unitPrice = formatCurrency(item.amount / item.quantity);
    generateTableRow(
      doc,
      position,
      item.item,
      item.description,
      unitPrice,
      item.quantity,
      totalPrice
    );

    generateHr(doc, position + 20);
  }
};

const generateInvoiceSubTotal = (
  doc,
  invoice,
  taxes,
  invoiceTabHeight,
  invoiceTableTop,
  i
) => {
  const subtotalPosition = invoiceTableTop + (i + 1) * invoiceTabHeight;
  generateTableRow(
    doc,
    subtotalPosition,
    "",
    "",
    "Subtotal",
    "",
    formatCurrency(invoice.subtotal)
  );

  const gstPosition = subtotalPosition + 20;
  generateTableRow(
    doc,
    gstPosition,
    "",
    "",
    `GST: ${taxes.gstRate}%`,
    "",
    formatCurrency(taxes.gst)
  );

  const qstPosition = gstPosition + 20;
  generateTableRow(
    doc,
    qstPosition,
    "",
    "",
    `QST: ${taxes.qstRate}%`,
    "",
    formatCurrency(taxes.qst)
  );

  const paidToDatePosition = qstPosition + 20;
  generateTableRow(
    doc,
    paidToDatePosition,
    "",
    "",
    "Paid To Date",
    "",
    formatCurrency(invoice.paid)
  );

  const duePosition = paidToDatePosition + 25;
  doc.font("Helvetica-Bold");
  const blanceDue = formatCurrency(
    invoice.subtotal + taxes.gst + taxes.qst - invoice.paid
  );
  generateTableRow(doc, duePosition, "", "", "Balance Due", "", blanceDue);
  doc.font("Helvetica");
};

const generateFooter = (doc, invoice_nr, pagination, footerTop) => {
  doc
    .fontSize(10)
    .text(invoice_nr, 50, footerTop, { align: "center", width: 500 })
    .text(pagination, 495, footerTop, { align: "center", width: 90 });
};

const generateTableRow = (
  doc,
  y,
  item,
  description,
  unitCost,
  quantity,
  lineTotal
) => {
  doc
    .fontSize(10)
    .text(item, 50, y)
    .text(description, 190, y)
    .text(unitCost, 345, y, { width: 90, align: "right" })
    .text(quantity, 390, y, { width: 90, align: "right" })
    .text(lineTotal, 0, y, { align: "right" });
};

const generateHr = (doc, y) => {
  doc
    .strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(50, y)
    .lineTo(550, y)
    .stroke();
};

const formatCurrency = cents => {
  return "$" + (cents / 100).toFixed(2);
};

const calTax = cents => {
  const tax = {
    gst: 5,
    qst: 9.975
  };
  return {
    gst: (cents * tax.gst) / 100,
    gstRate: tax.gst,
    qst: (cents * tax.qst) / 100,
    qstRate: tax.qst
  };
};

const formatDate = date => {
  let day = date.getDate();
  day = day < 10 ? `0${day}` : day;
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec"
  ];
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};
