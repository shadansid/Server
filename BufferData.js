const WebSocket = require('ws');

const BufferData = () => {
  const ws = new WebSocket('wss://stream.binance.com:9443/stream?streams=ethusdt@trade/dogeusdt@trade/btcusdt@trade/lunausdt@trade/bnbusdt@trade/solusdt@trade/xrpusdt@trade/adausdt@trade/ltcusdt@trade/btcbusd@trade');
  
  ws.on('message', (message) => {
    setTimeout(() => {
      console.log(message);
    }, 3000);
  });
};

module.exports = BufferData;
