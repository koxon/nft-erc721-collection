import React, { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ethers } from "ethers";
import angel from "../assets/angel.png";
import Logo from "../assets/intro.png";

import { CollectionConfig } from "../config/collectionConfig";
import CollectionStatus from "./CollectionStatus";
import MintWidget from "./MintWidget";
import Whitelist from "../lib/Whitelist";
import contractAbi from "../abi/fryHeadsNft.json";

import ConnectButton from "./ConnectButton";
import { useAccount } from "wagmi";
import { useEthersSigner } from "../hooks/useEthersSigner";
import { useContractDetails } from "../hooks/useContractInfo";
import { useCharities } from "../hooks/useCharities";
import Footer from "./Footer";

const Dapp: React.FC = () => {
  const { address, chainId, isConnected } = useAccount();
  const signer = useEthersSigner();
  const isTestnet = useMemo((): boolean => chainId === CollectionConfig.testnet.chainId, [chainId]);

  const { totalSupply, maxSupply, maxMintAmountPerTx, isPaused, tokenPrice, isWhitelistMintEnabled } = useContractDetails({ isTestnet });
  const { charities } = useCharities({ isTestnet });

  // const [merkleProofManualAddress, setMerkleProofManualAddress] = useState<string>("");
  // const [merkleProofManualAddressFeedbackMessage, setMerkleProofManualAddressFeedbackMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const colectionContract = useMemo(
    () => new ethers.Contract(isTestnet ? CollectionConfig.contractAddressTest : CollectionConfig.contractAddress, contractAbi, signer),
    [signer, isTestnet]
  );

  const mintTokens = useCallback(
    async (amount: number, charityId: number) => {
      try {
        const transactionResponse = await colectionContract?.mint(amount, charityId, { value: tokenPrice?.mul(amount) });
        await transactionResponse.wait(1);
      } catch (e) {
        setErrorMessage((e as Error).message);
        console.log(e);
      }
    },
    [colectionContract, tokenPrice]
  );

  const whitelistMintTokens = async (amount: number, charityId: number): Promise<void> => {
    try {
      const transactionResponse = await colectionContract.whitelistMint(amount, charityId, Whitelist.getProofForAddress(address!), {
        value: tokenPrice?.mul(amount),
      });
      await transactionResponse.wait(1);
      alert("Your token has been minted.");
    } catch (e) {
      setErrorMessage((e as Error).message);
    }
  };

  const isMainnet = useMemo((): boolean => chainId === CollectionConfig.mainnet.chainId, [chainId]);
  const isUserInWhitelist = useMemo((): boolean => Whitelist.contains(address!), [address]);

  const marketplaceUrl = useMemo((): string => {
    return CollectionConfig.marketplaceConfig.generateCollectionUrl(CollectionConfig.marketplaceIdentifier, isMainnet);
  }, [isMainnet]);

  // const copyMerkleProofToClipboard = (): void => {
  //   const merkleProof = Whitelist.getRawProofForAddress(address ?? merkleProofManualAddress);

  //   if (merkleProof.length < 1) {
  //     setMerkleProofManualAddressFeedbackMessage("The given address is not in the whitelist, please double-check.");
  //     return;
  //   }

  //   navigator.clipboard.writeText(merkleProof);
  //   setMerkleProofManualAddressFeedbackMessage(
  //     <>
  //       <strong>Congratulations!</strong> <span className="emoji">🎉</span>
  //       <br />
  //       Your Merkle Proof <strong>has been copied to the clipboard</strong>. You can paste it into{" "}
  //       <Link to={generateContractUrl()} target="_blank" rel="noreferrer">
  //         {networkConfig.blockExplorer.name}
  //       </Link>{" "}
  //       to claim your tokens.
  //     </>
  //   );
  // };

  return (
    <>
      <img id="logo" src={Logo} alt="Logo" />
      {!isMainnet && isConnected && !isTestnet ? (
        <div className="not-mainnet">
          You are not connected to the main network.
          <span className="small">
            Current network: <strong>{chainId}</strong>
          </span>
        </div>
      ) : null}
      {errorMessage ? (
        <div className="error">
          <p>{errorMessage}</p>
          <button onClick={() => {}}>Close</button>
        </div>
      ) : null}
      <div className="no-wallet">
        <div className="use-block-explorer">
          <img className="angel-fryhead-img" src={angel} />
          <div className="intro-title-box">
            <h1 className="intro-title">Fry Heads are charitable NFTs</h1>
            <strong>
              50% of the mint price and secondary sales fees are sent to
              <Link to="https://thegivingblock.com/" target="_blank" rel="noreferrer">
                {" "}
                The Giving Block
              </Link>
              , in perpetuity.
            </strong>
          </div>
        </div>
      </div>
      {!isConnected ? (
        <div className="no-wallet">
          You need to be on the Ethereum blockchain and have ETH tokens to mint your Fry Heads. <br />
          <br />
          Transfer your ETH to your wallet, connect it to this page by clicking the &quot;Connect Wallet&quot; bellow and mint your first Fry Heads!
        </div>
      ) : null}

      {!isConnected ? <ConnectButton /> : null}

      <div className="no-wallet">
        <button className="primary" onClick={() => window.open("https://twitter.com/FryHeadsNFT", "_blank", "noopener,noreferrer")}>
          Contact us on Twitter
        </button>
        <br></br>
        <button className="primary" onClick={() => window.open("https://opensea.io/collection/fryheadsnft", "_blank", "noopener,noreferrer")}>
          Opensea collection
        </button>
      </div>

      {isConnected ? (
        <>
          <>
            <CollectionStatus
              userAddress={address}
              contractAddress={colectionContract.address}
              maxSupply={maxSupply}
              totalSupply={totalSupply}
              isPaused={isPaused}
              isWhitelistMintEnabled={isWhitelistMintEnabled}
              isUserInWhitelist={isUserInWhitelist}
            />
            {totalSupply < maxSupply ? (
              <MintWidget
                maxSupply={maxSupply}
                totalSupply={totalSupply}
                tokenPrice={tokenPrice}
                maxMintAmountPerTx={maxMintAmountPerTx}
                isPaused={isPaused}
                isWhitelistMintEnabled={isWhitelistMintEnabled}
                isUserInWhitelist={isUserInWhitelist}
                contractAddress={colectionContract.address}
                mintTokens={(mintAmount, charityId) => mintTokens(mintAmount, charityId)}
                whitelistMintTokens={(mintAmount, charityId) => whitelistMintTokens(mintAmount, charityId)}
                charities={charities}
              />
            ) : (
              <div className="collection-sold-out">
                <h2>
                  Tokens have been <strong>sold out</strong>! <span className="emoji">🥳</span>
                </h2>
                You can buy from our beloved holders on{" "}
                <Link to={marketplaceUrl} target="_blank" rel="noreferrer">
                  {CollectionConfig.marketplaceConfig.name}
                </Link>
                .
              </div>
            )}

            <Footer contractAddress={colectionContract.address} />
          </>
        </>
      ) : null}
    </>
  );
};

export default Dapp;
