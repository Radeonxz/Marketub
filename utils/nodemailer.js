const moduleName = 'utils/nodemailer';

const path = require('path');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

const config = require(path.join(__base, 'config/config'));

const nodemailerSetup = (template) => {
  const smtpTransport = nodemailer.createTransport({
    service: config.nodemailer.service,
    auth: {
      user: config.nodemailer.email,
      pass: config.nodemailer.password,
    }
  });

  const handlebarsOptions = {
    viewEngine: {
      partialsDir: path.resolve(__base, 'mailTemplates/'),
      layoutsDir: path.resolve(__base, 'mailTemplates/'),
      defaultLayout: `${template}.hbs`,
    },
    viewPath: path.resolve(__base, 'mailTemplates/'),
    extName: '.hbs'
  };
  
  smtpTransport.use('compile', hbs(handlebarsOptions));
  return smtpTransport;
};

exports.nodemailerSetup = nodemailerSetup;