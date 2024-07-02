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

  RED.nodes.registerType('get-transaction-details', getTransactionDetails);

  function getTransactionDetails(config){
    RED.nodes.createNode(this, config);

    let node = this;
    node.status({});

    try {
      var evmBlockchainConfig = RED.nodes.getNode(config.evmblockchainconfig);

      if (!evmBlockchainConfig) {
        node.status({ fill: 'red', shape: 'ring', text: 'Missing Configuration' });
      }

      const web3 = new Web3(evmBlockchainConfig.network);
      
      this.on("input", function(msg) {
        setTimeout(async () => {
          let tx = await web3.eth.getTransaction(msg.payload);
          switch (config.detail){
            case "blockhash":
              msg.payload = tx.blockHash;
              break;
            case "blocknumber":
              msg.payload = tx.blockNumber;
              break;
            case "from":
              msg.payload = tx.from;
              break;
            case "gas":
              msg.payload = tx.gas;
              break;
            case "gasprice":
              msg.payload = tx.gasPrice;
              break;
            case "hash":
              msg.payload = tx.hash;
              break;
            case "input":
              msg.payload = tx.input;
              break;
            case "nonce":
              msg.payload = tx.nonce;
              break;
            case "r":
              msg.payload = tx.r;
              break;
            case "s":
              msg.payload = tx.s;
              break;
            case "to":
              msg.payload = tx.to;
              break;
            case "transactionindex":
              msg.payload = tx.transactionIndex;
              break;
            case "type":
              msg.payload = tx.type;
              break;
            case "v":
              msg.payload = tx.v;
              break;
            case "value":
              msg.payload = tx.value;
              break;
            default:
              msg.payload = tx;
              break;
          }
          node.send(msg);
        })
      })
    } catch(e) {
        node.error(e);
    }
  }
}