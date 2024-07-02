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

  RED.nodes.registerType('transaction-listener', TransactionSubscribe);

  function TransactionSubscribe(config){
    RED.nodes.createNode(this, config);

    let node = this;
    
    try {
        cacheNode = node;
        node.status({});

        var evmBlockchainConfig = RED.nodes.getNode(config.evmblockchainconfig);

        if (!evmBlockchainConfig) {
            node.status({ fill: 'red', shape: 'ring', text: 'Missing Configuration' });
        }

        const web3 = new Web3(evmBlockchainConfig.network);

        const subscription = web3.eth.subscribe('pendingTransactions', (err, res) => {
            if (err) console.error(err);
        });

        subscription
        .on("connected", function(subscriptionId){
            node.status({ fill: 'green', shape: 'dot', text: 'Connected' });
        })
        .on('data', (txHash) => {
            setTimeout(async () => {
                try {
                    let tx = await web3.eth.getTransaction(txHash);
                    if (tx) {
                            var msg = {payload: tx};
                            node.send(msg);
                    }
                } catch (err) {
                    console.error(err);
                }
            })
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