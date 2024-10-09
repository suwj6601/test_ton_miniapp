const { getHttpEndpoint } = require("@orbs-network/ton-access");
const {
  TonClient,
  JettonMaster,
  Address,
  JettonWallet,
  fromNano,
} = require("@ton/ton");

const JETTON_MASTER_ADDRESS =
  "kQB8StgTQXidy32a8xfu7j4HMoWYV0b0cFM8nXsP2cza_QVS";
const USER_WALLET_ADDRESS = "0QA662Xatr91ToqtUYoMxnzUsLhpVdsjTWPZTF2PkCLjh9Vh";

const getJettonBalance = async () => {
  const endpoint = await getHttpEndpoint({
    network: true ? "testnet" : "mainnet",
  });
  const tonClient = new TonClient({ endpoint });
  let master = tonClient.open(
    JettonMaster.create(Address.parse(JETTON_MASTER_ADDRESS))
  );

  try {
    const walletAddress = await master.getWalletAddress(
      Address.parse(USER_WALLET_ADDRESS)
    );
    let jettonWallet = tonClient.open(JettonWallet.create(walletAddress));
    const jettonBalance = await jettonWallet.getBalance();
    console.log("jettonBalance: ", fromNano(jettonBalance));
  } catch (error) {
    console.log("getJettonBalance() error", error);
  }
};

getJettonBalance();
