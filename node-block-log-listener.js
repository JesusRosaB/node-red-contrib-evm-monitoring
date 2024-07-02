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

  RED.nodes.registerType('block-logs-listener', BlockLogSubscribe);

  function BlockLogSubscribe(config){
    RED.nodes.createNode(this, config);

    let node = this;
    
    try {
      var evmBlockchainConfig = RED.nodes.getNode(config.evmblockchainconfig);
      
      cacheNode = node;
      node.status({});

      if (!evmBlockchainConfig) {
        node.status({ fill: 'red', shape: 'ring', text: 'Missing Configuration' });
      }

      const web3 = new Web3(evmBlockchainConfig.network);

      var subscription = web3.eth.subscribe('newBlockHeaders', function(error, result){
      if (!error) {
          console.log(result);

          return;
      }
        console.error(error);
      })
      .on("connected", function(subscriptionId){
        node.status({ fill: 'green', shape: 'dot', text: 'Connected' });
      })
      .on("data", function(blockHeader){
        var msg = {payload: blockHeader};
        node.send(msg);
      })
      .on("error", console.error);    
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