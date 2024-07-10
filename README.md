node-red-contrib-evm-monitoring
===================

node-red-contrib-evm-monitoring is a package that bundles a set of Node-RED nodes that can be used to monitor EVM-compatible blockchain networks. 

Currently, there are eight nodes implemented:

 - node-block-log-listener: listener that allows listening to new blocks being mined in real time on the configured blockchain network.
 - node-contract-address-subscription: listener allowing to subscribe to listen for new transactions from the address of the smart contract configured for the configured blockchain network.
 - node-fromaddress-subscription: listener that allows listening to new transactions that are mined in real time on the configured blockchain network and whose origin is the configured address. Please note that this address can be the address of a user or a smart contract.
 - node-get-block-details: allows to obtain specific details of a block already mined in the configured blockchain network from the block hash or block number.
 - node-get-transaction-details: allows to obtain specific details of a transaction already mined in the configured blockchain network from the hash of the transaction.
 - node-toaddress-subscription: listener that allows listening to new transactions that are mined in real time on the configured blockchain network and whose destination is the configured address. Please note that this address can be the address of a user or a smart contract.
 - node-transaction-hash-listener: listener that allows to obtain the hash of new transactions that are mined in real time in the configured blockchain network. 
 - node-transaction-listener: listener that allows you to listen to new transactions being mined in real time on the configured blockchain network. 

Installation
------
To install the package, just run the following command in your Node-RED user directory (normally `~/.node-red`):

    git clone https://github.com/JesusRosaB/node-red-contrib-evm-monitoring.git
    
    npm install node-red-contrib-evm-monitoring

Usage
------
Just like any Node-RED node, simply drag the desired node and drop it on the main canvas/flow. However, as a requirement, each msg containing the input data to the nodes in this package must be in `msg.payload`. In addition, all results generated as a consequence of using these nodes will also be found in the msg object, concretely, in `msg.payload`.

Examples
------
Below, you can find several simple examples (JSON code of flows). To use it, you just need to import the streams into node-red. These examples are a basic implementation of the nodes presented in this package to see their operation and requirements.

    [{"id":"f6f2187d.f17ca8","type":"tab","label":"Flow 1","disabled":false,"info":""},{"id":"cde75c64fb0db5fc","type":"evm-blockchain-config","name":"sepolia","network":"wss://sepolia.infura.io/ws/v3/YOUR_API_KEY"},{"id":"43d803c0850b4a94","type":"block-logs-listener","z":"f6f2187d.f17ca8","name":"","evmblockchainconfig":"cde75c64fb0db5fc","x":170,"y":160,"wires":[["80b52a627c5733a9"]]},{"id":"80b52a627c5733a9","type":"debug","z":"f6f2187d.f17ca8","name":"debug 1","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":460,"y":160,"wires":[]}]

<b><i><sup>Block log listener flow example</sup></i></b>

    [{"id":"f6f2187d.f17ca8","type":"tab","label":"Flow 1","disabled":false,"info":""},{"id":"cde75c64fb0db5fc","type":"evm-blockchain-config","name":"sepolia","network":"wss://sepolia.infura.io/ws/v3/YOUR_API_KEY"},{"id":"80b52a627c5733a9","type":"debug","z":"f6f2187d.f17ca8","name":"debug 1","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":460,"y":160,"wires":[]},{"id":"b67a873b420defc6","type":"transaction-listener","z":"f6f2187d.f17ca8","name":"","evmblockchainconfig":"cde75c64fb0db5fc","x":210,"y":160,"wires":[["80b52a627c5733a9"]]}]

<b><i><sup>Transaction listener flow example</sup></i></b>

    [{"id":"f6f2187d.f17ca8","type":"tab","label":"Flow 1","disabled":false,"info":""},{"id":"e0129b5c0c726ecb","type":"evm-blockchain-config","name":"","network":"wss://sepolia.infura.io/ws/v3/YOUR_API_KEY"},{"id":"7cef3f63c5600442","type":"address-config","name":"smart contract","address":"0xb86B97fA050e3Ddd1AeF09eE4257155Db6cDd1f4"},{"id":"d5bc8f79b76ec659","type":"contract-address-subscription","z":"f6f2187d.f17ca8","name":"","evmblockchainconfig":"e0129b5c0c726ecb","addressconfig":"7cef3f63c5600442","x":190,"y":180,"wires":[["2fb78fa8430ffda9"]]},{"id":"2fb78fa8430ffda9","type":"debug","z":"f6f2187d.f17ca8","name":"debug 1","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":460,"y":180,"wires":[]}]

<b><i><sup>Contract address subscription flow example</sup></i></b>

    [{"id":"f6f2187d.f17ca8","type":"tab","label":"Flow 1","disabled":false,"info":""},{"id":"e0129b5c0c726ecb","type":"evm-blockchain-config","name":"","network":"wss://sepolia.infura.io/ws/v3/YOUR_API_KEY"},{"id":"7cef3f63c5600442","type":"address-config","name":"public account","address":"0x2079C8653588FfE5AD54EA97aD39E8E83985ffC3"},{"id":"2fb78fa8430ffda9","type":"debug","z":"f6f2187d.f17ca8","name":"debug 1","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":460,"y":180,"wires":[]},{"id":"068cfe504bca80f5","type":"fromaddress-subscription","z":"f6f2187d.f17ca8","name":"","evmblockchainconfig":"e0129b5c0c726ecb","addressconfig":"7cef3f63c5600442","x":180,"y":180,"wires":[["2fb78fa8430ffda9"]]}]

<b><i><sup>From address subscription flow example</sup></i></b>

    [{"id":"f6f2187d.f17ca8","type":"tab","label":"Flow 1","disabled":false,"info":""},{"id":"e0129b5c0c726ecb","type":"evm-blockchain-config","name":"","network":"wss://sepolia.infura.io/ws/v3/YOUR_API_KEY"},{"id":"7cef3f63c5600442","type":"address-config","name":"public account","address":"0x2079C8653588FfE5AD54EA97aD39E8E83985ffC3"},{"id":"2fb78fa8430ffda9","type":"debug","z":"f6f2187d.f17ca8","name":"debug 1","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":460,"y":180,"wires":[]},{"id":"88397716dcfa5f5e","type":"toaddress-subscription","z":"f6f2187d.f17ca8","name":"","evmblockchainconfig":"e0129b5c0c726ecb","addressconfig":"7cef3f63c5600442","x":190,"y":180,"wires":[["2fb78fa8430ffda9"]]}]

<b><i><sup>To address subscription flow example</sup></i></b>

    [{"id":"f6f2187d.f17ca8","type":"tab","label":"Flow 1","disabled":false,"info":""},{"id":"cde75c64fb0db5fc","type":"evm-blockchain-config","name":"sepolia","network":"wss://sepolia.infura.io/ws/v3/YOUR_API_KEY"},{"id":"80b52a627c5733a9","type":"debug","z":"f6f2187d.f17ca8","name":"debug 1","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":680,"y":160,"wires":[]},{"id":"e222d59ebe97dd04","type":"transaction-hash-listener","z":"f6f2187d.f17ca8","name":"","evmblockchainconfig":"cde75c64fb0db5fc","x":130,"y":160,"wires":[["60d4cedaa7d02c17"]]},{"id":"60d4cedaa7d02c17","type":"get-transaction-details","z":"f6f2187d.f17ca8","name":"","evmblockchainconfig":"cde75c64fb0db5fc","detail":"alldetails","x":430,"y":160,"wires":[["80b52a627c5733a9"]]}]

<b><i><sup>Transaction hash listener + get transaction details flow example</sup></i></b>

License
------
node-red-contrib-evm-monitoring is available under Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0) License. See the [LICENSE](https://github.com/JesusRosaB/node-red-contrib-evm-monitoring/blob/main/LICENSE) file for more info.