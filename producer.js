var Kafka = require("node-rdkafka");
var producer = Kafka.Producer({
  debug: "all",
  "metadata.broker.list": "localhost:9093",
  "security.protocol": "ssl",
  "ssl.key.location": "/var/www/html/sslcerts/client_localhostclient.key",
  "ssl.keystore.password": "abcdefgh",
  "api.version.request": true
});
console.log(Kafka.features);

// producer.connect();
producer.connect(null, (err, metadata) => {
  // console.log(metadata);
  // console.error(err);
  console.log("Connected");
});

producer.on("ready", function () {
  console.log("in ready");
  try {
    producer.produce("topic1", null, new Buffer("Awesome"), null, Date.now());
    console.log("produced");
  } catch (err) {
    console.log("A error occured");
  }
});

// Any errors we encounter, including connection errors
producer.on("event.error", function (err) {
  console.log("Error from producer");
  console.log(err);
});

producer.on("event.log", function (event) {
  //console.log(event);
  // const loggedEvent = {
  // 	severity: event.severity,
  // 	fac: event.fac
  // };
  // if (event.severity >= 7) {
  // 	console.log(loggedEvent, event.message);
  // } else if (event.severity === 6 || event.severity === 5) {
  // 	console.log(loggedEvent, event.message);
  // } else if (event.severity === 4) {
  // 	console.log(loggedEvent, event.message);
  // } else if (event.severity > 0) {
  // 	console.log(loggedEvent, event.message);
  // } else {
  // 	console.log(loggedEvent, event.message);
  // }
  // console.log("/n /n /n");
});
