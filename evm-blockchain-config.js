/*
  ***************************************************************
  *  node-red-contrib-evm-monitoring                            *
  *  Jesús Rosa Bilbao (jesus.rosa@uca.es) &                    *
  *  Juan Boubeta Puig (juan.boubeta@uca.es)                    *
  *  University of Cadiz                                        *
  *                                                             *
  ***************************************************************
*/
module.exports = function(RED) {
  function EvmBlockchainConfigNode(config) {
    RED.nodes.createNode(this, config);
    this.network = config.network;
  }
  RED.nodes.registerType('evm-blockchain-config', EvmBlockchainConfigNode);
};