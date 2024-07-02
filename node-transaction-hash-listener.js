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

  RED.nodes.registerType('transaction-hash-listener', TransactionHashSubscribe);

  function TransactionHashSubscribe(config){
    RED.nodes.createNode(this, config);

    let node = this;
    let subscription = null;

    try {
      node.status({});

      var evmBlockchainConfig = RED.nodes.getNode(config.evmblockchainconfig);

      if (!evmBlockchainConfig) {
        node.status({ fill: 'red', shape: 'ring', text: 'Missing Configuration' });
        return;
      }

      const web3 = new Web3(evmBlockchainConfig.network);

      subscription = web3.eth.subscribe('pendingTransactions', function(error, result) {
        if (error) {
          node.error(error);
        }
      })
      .on("connected", function(subscriptionId){
        node.status({ fill: 'green', shape: 'dot', text: 'Connected' });
      })
      .on("data", function(txHash){
        var msg = {payload: txHash};
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