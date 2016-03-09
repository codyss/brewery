// 'use strict';
//
//
// // import the mongoose helper utilities
// // var utils = require('../utils');
// var should = require('should');
// var mailer = require('../../../server/app/configure/pwreset');
//
//
// describe('mailer: models', function () {
//
//
//   describe('#sendOne()', function (done) {
//
//
//     it('should render the password reset templates correctly', function (done) {
//       var locals = {
//         email: 'one@example.com',
//         subject: 'Password reset',
//         name: 'Forgetful User',
//         resetUrl: 'http;//localhost:1337/password_reset/'
//       };
//       mailer.sendOne('password_reset', locals, function (err, responseStatus, html, text) {
//         should.not.exist(err);
//         responseStatus.should.include("OK");
//         text.should.include("Please follow this link to reset your password " + locals.resetUrl);
//         html.should.include("Please follow this link to reset your password <a href=\"" + locals.resetUrl + "\">" + locals.resetUrl + "</a>");
//         done();
//       });
//     });
//   });
//
//
// });