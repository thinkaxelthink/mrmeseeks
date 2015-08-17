'use strict';

require('./helpers/let');

var chai = require('chai'),
    expect = chai.expect,
    setupRequest = require('./helpers/request'),
    App = require('./../index'),
    yaml_config = require('node-yaml-config'),
    config = yaml_config.load(__dirname + '/../config.yml');

describe('/cmd', function(){
    setupRequest({
        request_attrs: {
            method: 'POST',
            host: 'http://localhost',
            port: '5000',
            path: '/cmd'
        }
    });

    describe('When POST request is sent', function(){
        it('Then responds with an object', function(done){
             var params = {
                 token: config.slack.token,
                 text: '/mrmeeseeks what are lattices?',
                 trigger_word: '/mrmeeseeks',
                 user_name: 'Steve'
             };

             this.request.send(params).expect(200).expect(function(res){
                 expect(res.body.text).to.equal('Hi Steve, I\'m Mr. MeeSeeks Look at me!');
                 expect(res.body.username).to.equal('Mr. Meeseeks');
                 expect(res.body.icon_emoji).to.equal(':mrmeeseeks:');
             }).end(done);
        });
    });
});
