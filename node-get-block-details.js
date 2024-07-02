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

  RED.nodes.registerType('get-block-details', getBlockDetails);

  function getBlockDetails(config){
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
          let block = await web3.eth.getBlock(msg.payload);
          switch (config.detail){
            case "difficulty":
              msg.payload = block.difficulty;
              break;
            case "extradata":
              msg.payload = block.extraData;
              break;
            case "gaslimit":
              msg.payload = block.gasLimit;
              break;
            case "gasused":
              msg.payload = block.gasUsed;
              break;
            case "hash":
              msg.payload = block.hash;
              break;
            case "logsbloom":
              msg.payload = block.logsBloom;
              break;
            case "miner":
              msg.payload = block.miner;
              break;
            case "mixhash":
              msg.payload = block.mixHash;
              break;
            case "nonce":
              msg.payload = block.nonce;
              break;
            case "number":
              msg.payload = block.number;
              break;
            case "parenthash":
              msg.payload = block.parentHash;
              break;
            case "receiptsroot":
              msg.payload = block.receiptsRoot;
              break;
            case "sha3uncles":
              msg.payload = block.sha3Uncles;
              break;
            case "size":
              msg.payload = block.size;
              break;
            case "stateRoot":
              msg.payload = block.stateRoot;
              break;
            case "timestamp":
              msg.payload = block.timestamp;
              break;
            case "totaldifficulty":
              msg.payload = block.totalDifficulty;
              break;
            case "transactions":
              msg.payload = block.transactions;
              break;
            case "transactionsroot":
              msg.payload = block.transactionsRoot;
              break;
            case "uncles":
              msg.payload = block.uncles;
              break;
            case "withdrawals":
                msg.payload = block.withdrawals;
                break;
            case "withdrawalsroot":
              msg.payload = block.withdrawalsRoot;
              break;
            default:
              msg.payload = block;
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