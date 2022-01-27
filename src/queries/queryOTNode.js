const DKGClient = require("dkg-client");

const OT_NODE_HOSTNAME = "0.0.0.0";
const OT_NODE_PORT = 8900;

let options = {
  endpoint: OT_NODE_HOSTNAME,
  port: OT_NODE_PORT,
  useSSL: false,
  maxNumberOfRetries: 60,
};
const dkg = new DKGClient(options);

// module.exports = publish = async (assets, keywords, filepath) => {
//   options = {
//     filepath,
//     assets,
//     keywords,
//     visibility: true,
//   };
//   await dkg
//     .publish(options)
//     .then((result) => {
//       console.log(JSON.stringify(result));
//     })
//     .catch((error) => {
//       console.log(`error publishing to the network. ${error}`);
//     });
// };

module.exports = {
  publish: async function publish(assets, keywords, filepath) {
    options = {
      filepath,
      assets,
      keywords,
      visibility: true,
    };
    await dkg
      .publish(options)
      .then((result) => {
        console.log(JSON.stringify(result));
      })
      .catch((error) => {
        console.log(`error publishing to the network. ${error}`);
      });
  },
  search: async function search(keywords) {
    type = Math.floor(Math.random() * 2);

    if(type == '0'){
      type = 'entities'
    }

    if(type == '1'){
      type = 'assertions'
    }

    console.log(`Searching for type: ${type}`);
    console.log(`Searching for keywords: ${keywords}`);

    options = {
      query: keywords,
      resultType: type
     };

     await dkg
     .search(options)
     .then((result) => {
 			if(result.status == 'FAILED'){
        console.log('\x1b[31mSearch Failed!')
        console.log('\x1b[31m',result.error)
 			}
   			console.log('\x1b[32mSearch Completed!')
   			console.log(' ')
   			console.log('\x1b[32mHeres a string of the result data!')
        console.log('\x1b[32m',JSON.stringify(result.data));
 			});
  },
};
