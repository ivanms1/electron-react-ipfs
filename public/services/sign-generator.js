const NodeRSA = require("node-rsa");

export default async function signGenerator(data) {
  const { privateKey, ...rest } = data;

  const privateK = new NodeRSA(privateKey);

  const jsonString = JSON.stringify({ ...rest });

  const sign = privateK.sign(jsonString, "base64");

  return {
    ...rest,
    sign,
  };
}
