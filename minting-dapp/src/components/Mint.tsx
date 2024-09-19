import mintImg from "../assets/img/mint-img.png";
import { ReactComponent as Plus } from "../assets/svg/plus.svg";
import { ReactComponent as Minus } from "../assets/svg/minus.svg";
import { useAccount, useSwitchChain } from "wagmi";
import Header from "./Header";
import { useCallback, useMemo, useState } from "react";
import { CollectionConfig } from "config/collectionConfig";
import Charities from "./Charities";
import { useEthersSigner } from "hooks/useEthersSigner";
import { useContractDetails } from "hooks/useContractInfo";
import { ethers, utils } from "ethers";
import MainButton from "./MainButton";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { Link } from "react-router-dom";
import contractAbi from "../abi/fryHeadsNft.json";
import Whitelist from "../lib/Whitelist";
import Loader from "./Loader";
import Footer from "./Footer";
import { infoAlert, errorAlert, successAlert, dismissAlert, warningAlert } from "utils/toastGroup";

export default function Mint() {
  const { openConnectModal } = useConnectModal();
  const [charityId, setCharityId] = useState<number | undefined>();
  const [mintAmount, setMintAmount] = useState<number>(1);
  const [mintLoading, setMintLoading] = useState(false);
  const { address, chainId, isConnected } = useAccount();
  const { switchChainAsync } = useSwitchChain();
  const signer = useEthersSigner();

  const isTestnet = useMemo((): boolean => chainId === CollectionConfig.testnet.chainId, [chainId]);

  const { totalSupply, maxSupply, maxMintAmountPerTx, isPaused, tokenPrice, isWhitelistMintEnabled, payableToCharity, refetch, isLoading } =
    useContractDetails({
      isTestnet,
    });

  const selectCharity = useCallback(
    (id: number) => {
      !mintLoading && setCharityId(id);
    },
    [mintLoading]
  );

  const incrementMintAmount = useCallback((): void => {
    setMintAmount(Math.min(maxMintAmountPerTx, mintAmount + 1));
  }, [maxMintAmountPerTx, mintAmount]);

  const decrementMintAmount = useCallback((): void => {
    setMintAmount(Math.max(1, mintAmount - 1));
  }, [mintAmount]);

  const colectionContract = useMemo(
    () => new ethers.Contract(isTestnet ? CollectionConfig.contractAddressTest : CollectionConfig.contractAddress, contractAbi, signer),
    [signer, isTestnet]
  );

  const mintTokens = useCallback(
    async (amount: number, charityId: number) => {
      try {
        setMintLoading(true);
        infoAlert("Confirm the transaction in your wallet.");
        const transactionResponse = await colectionContract?.mint(amount, charityId, { value: tokenPrice?.mul(amount) });
        dismissAlert();
        infoAlert("Transaction sent, waiting for confirmation.", { autoClose: 20_000 });
        await transactionResponse.wait(1);
        dismissAlert();
        successAlert("Your token has been minted successfully.");
        refetch();
      } catch (e) {
        dismissAlert();
        errorAlert("Error minting token, see console for more details.");
        console.log(e);
      } finally {
        setMintLoading(false);
      }
    },
    [colectionContract, tokenPrice, refetch]
  );

  const whitelistMintTokens = useCallback(
    async (amount: number, charityId: number): Promise<void> => {
      try {
        setMintLoading(true);
        infoAlert("Confirm the transaction in your wallet.");
        const transactionResponse = await colectionContract.whitelistMint(amount, charityId, Whitelist.getProofForAddress(address!), {
          value: tokenPrice?.mul(amount),
        });
        dismissAlert();
        infoAlert("Transaction sent, waiting for confirmation.", { autoClose: 20_000 });
        await transactionResponse.wait(1);
        dismissAlert();
        successAlert("Your token has been minted successfully.");
        refetch();
      } catch (e) {
        console.log(e);
        dismissAlert();
        errorAlert("Error minting token, see console for more details.");
      } finally {
        setMintLoading(false);
      }
    },
    [colectionContract, tokenPrice, address, refetch]
  );

  const mint = useCallback(async (): Promise<void> => {
    if (charityId === undefined) {
      warningAlert("Please select a charity to mint a token.");
      return;
    }
    if (chainId !== CollectionConfig.testnet.chainId && chainId !== CollectionConfig.mainnet.chainId) {
      await switchChainAsync({ chainId: CollectionConfig.mainnet.chainId });
      return;
    }

    const balance = await signer?.getBalance();

    if (balance && balance.lt(tokenPrice?.mul(mintAmount))) {
      errorAlert("Insufficient balance in your wallet.");
      return;
    }

    if (!isPaused) {
      await mintTokens(mintAmount, charityId);
    } else {
      await whitelistMintTokens(mintAmount, charityId);
    }
  }, [charityId, isPaused, mintAmount, mintTokens, whitelistMintTokens, signer, tokenPrice, chainId, switchChainAsync]);

  const isSaleOpen = useMemo((): boolean => isWhitelistMintEnabled || !isPaused, [isPaused, isWhitelistMintEnabled]);
  const isUserInWhitelist = useMemo((): boolean => Whitelist.contains(address!), [address]);
  const canWhitelistMint = useMemo((): boolean => isWhitelistMintEnabled && isUserInWhitelist, [isWhitelistMintEnabled, isUserInWhitelist]);
  const canMint = useMemo((): boolean => !isPaused || canWhitelistMint, [isPaused, canWhitelistMint]);

  return (
    <div className="mint-page">
      <Header />
      <div className="info-box">
        <div className="info-item">
          <div className="title-info">Supply</div>
          <div className="value-info">
            {isLoading ? (
              <Loader width="18" />
            ) : (
              <>
                {totalSupply}/{maxSupply.toLocaleString()}
              </>
            )}
          </div>
        </div>
        <div className="info-item">
          <div className="title-info">Paid to charity</div>
          <div className="value-info">{isLoading ? <Loader width="18" /> : utils.formatEther(payableToCharity)} ETH</div>
        </div>
        <div className="info-item">
          <div className="title-info">Sale status</div>
          <div className="value-info">
            {isLoading ? <Loader width="18" /> : <>{isSaleOpen ? <>{isWhitelistMintEnabled ? "Whitelist only" : "Open"}</> : "Closed"}</>}
          </div>
        </div>
      </div>
      <div className="info-box mint-box">
        <div className="charities-box">
          <Charities fromMint selectCharity={selectCharity} charityId={charityId} />
        </div>
        <div className="mint-section">
          <img src={mintImg} alt="" className="mint-img" />
          <h3>Price</h3>
          <p>{isLoading ? <Loader width="20" /> : utils.formatEther(tokenPrice?.mul(mintAmount))} ETH</p>
          <div className="controls-input">
            <button className="decrease" onClick={decrementMintAmount} disabled={!canMint || mintLoading}>
              <Minus />
            </button>
            <span className="mint-amount">{mintAmount}</span>
            <button className="decrease" onClick={incrementMintAmount} disabled={!canMint || mintLoading}>
              <Plus />
            </button>
          </div>
          <MainButton
            disabled={!canMint || mintLoading}
            title={isConnected ? "Mint NFT" : "Connect wallet"}
            onClick={!isConnected ? openConnectModal : () => void mint()}
          />
          <div className="verify-transaction">
            Verify your transaction on{" "}
            <Link
              to={
                isTestnet
                  ? `https://sepolia.etherscan.io/address/${CollectionConfig.contractAddressTest}`
                  : `https://etherscan.io/address/${CollectionConfig.contractAddress}`
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              etherscan.io
            </Link>
            <br />
            and from your wallet
          </div>
        </div>
      </div>
      <div className="info-box mint-box faq-box">
        <div className="title">Triggering Fund Distribution to Charities</div>
        <div className="desctiption">
          <div className="sub-title">Anyone can initiate the distribution of funds to charities by following these steps:</div>
          <div>
            1. Go to{" "}
            <Link
              to={
                isTestnet
                  ? `https://sepolia.etherscan.io/address/${CollectionConfig.contractAddressTest}`
                  : `https://etherscan.io/address/${CollectionConfig.contractAddress}`
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              etherscan.io.
            </Link>
          </div>
          <div>2. Execute the &quot;withdraw&quot; method of the smart contract.</div>
          <div>3. If there are any WETH tokens in the contract, first execute the &quot;withdrawETH&quot; method to convert them into ETH.</div>
        </div>
        <div className="desctiption">
          <div className="sub-title">To determine which charity your NFT supports, follow these steps:</div>
          <div>1. Use the tokenCharity(token_id) contract function to retrieve the charity ID associated with your NFT.</div>
          <div>2. Next, use the charities(charity_id) contract function to access detailed information about the charity.</div>
          <div className="last-step">
            You can execute these functions directly on{" "}
            <Link
              to={
                isTestnet
                  ? `https://sepolia.etherscan.io/address/${CollectionConfig.contractAddressTest}`
                  : `https://etherscan.io/address/${CollectionConfig.contractAddress}`
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              etherscan.io.
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
