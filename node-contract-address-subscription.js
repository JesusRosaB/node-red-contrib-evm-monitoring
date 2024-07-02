/*
  ***************************************************************
  *  node-red-contrib-evm-monitoring                            *
  *  Jesús Rosa Bilbao (jesus.rosa@uca.es) &                    *
  *  Juan Boubeta Puig (juan.boubeta@uca.es)                    *
  *  University of Cadiz                                        *
  *                                                             *
  ***************************************************************
*/
var Web3 = require('web3');

module.exports = function(RED) {

  RED.nodes.registerType('contract-address-subscription', ContractAddressSubscribe);

  function ContractAddressSubscribe(config){
    RED.nodes.createNode(this, config);

    let node = this;

    try {
      var evmBlockchainConfig = RED.nodes.getNode(config.evmblockchainconfig);
      var addressConfig = RED.nodes.getNode(config.addressconfig);

      if (!evmBlockchainConfig) {
        node.status({ fill: 'red', shape: 'ring', text: 'Missing Configuration' });
      }

      if (!addressConfig) {
        node.status({ fill: 'red', shape: 'ring', text: 'Missing Address' });
      }

      const web3 = new Web3(evmBlockchainConfig.network);

      cacheNode = node;
      node.status({});

      var subscription = web3.eth.subscribe('logs', {
          address: addressConfig.address
      }, function(error, result){
          if (!error)
              console.log(result);
      })
      .on("connected", function(subscriptionId){
          node.status({ fill: 'green', shape: 'dot', text: 'Connected' });
      })
      .on("data", function(log){
          var msg = {payload: log};
          node.send(msg);
      });   
    }
    catch(e) {
      node.error(e);
    }

    this.on('close', function(done) {
      if (subscription) {
        subscription.unsubscribe(function(error, success) {
          if (success) {
            node.status({ fill: 'red', shape: 'ring', text: 'Disconnected' });
          }
          done();
        });
      } else {
        done();
      }
    });
  }
}