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
  function AddressConfigNode(n) {
    RED.nodes.createNode(this,n);
    this.name = n.name;
    this.address = n.address;
  }
  RED.nodes.registerType("address-config", AddressConfigNode);
}