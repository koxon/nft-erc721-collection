import React, { useCallback, useMemo } from "react";
import mainImg from "../assets/img/main-img.png";
import bottomImg from "../assets/img/bottom-img.png";
import mainBg from "../assets/img/list-ch.png";
import etherscan from "../assets/img/etherscan.png";
import { ReactComponent as Opensee } from "../assets/svg/opensee.svg";
import { ReactComponent as OpenseeBl } from "../assets/svg/os.svg";
import { ReactComponent as X } from "../assets/svg/x.svg";
import givingblock from "../assets/img/givingblock.png";
import { generatePath, Link } from "react-router-dom";
import MainButton from "./MainButton";
import Card from "./Card";
import Footer from "./Footer";
import Charities from "./Charities";
import { CollectionConfig } from "config/collectionConfig";
import { useAccount } from "wagmi";
import { useEthersSigner } from "hooks/useEthersSigner";
import { useContractDetails } from "hooks/useContractInfo";
import { useCharities } from "hooks/useCharities";
import { ethers } from "ethers";
import contractAbi from "../abi/fryHeadsNft.json";
import Header from "./Header";
import Loader from "./Loader";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useNavigate } from "react-router-dom";
import { routePaths } from "routes/routePaths";

const nfts = [
  {
    name: "Fry Head #1",
    description: "The Fry Heads",
    backround: "#876D4E",
  },
  {
    name: "Fry Head #2",
    description: "The Fry Heads",
    backround: "#44856B",
  },
  {
    name: "Fry Head #3",
    description: "The Fry Heads",
    backround: "#717D61",
  },
  {
    name: "Fry Head #4",
    description: "The Fry Heads",
    backround: "#876D4E",
  },
  {
    name: "Fry Head #5",
    description: "The Fry Heads",
    backround: "#44856B",
  },
  {
    name: "Fry Head #6",
    description: "The Fry Heads",
    backround: "#876D4E",
  },
  {
    name: "Fry Head #7",
    description: "The Fry Heads",
    backround: "#44856B",
  },
  {
    name: "Fry Head #8",
    description: "The Fry Heads",
    backround: "#717D61",
  },
  {
    name: "Fry Head #9",
    description: "The Fry Heads",
    backround: "#876D4E",
  },
  {
    name: "Fry Head #10",
    description: "The Fry Heads",
    backround: "#44856B",
  },
];

export default function Home() {
  const { openConnectModal } = useConnectModal();
  const navigate = useNavigate();

  const { address, chainId, isConnected } = useAccount();
  const signer = useEthersSigner();
  const isTestnet = useMemo((): boolean => chainId === CollectionConfig.testnet.chainId, [chainId]);

  const { totalSupply, maxSupply, maxMintAmountPerTx, isPaused, tokenPrice, isWhitelistMintEnabled, refetch, isLoading } = useContractDetails({
    isTestnet,
  });
  const { charities } = useCharities({ isTestnet });

  const colectionContract = useMemo(
    () => new ethers.Contract(isTestnet ? CollectionConfig.contractAddressTest : CollectionConfig.contractAddress, contractAbi, signer),
    [signer, isTestnet]
  );

  const sendEmail = useCallback(() => {
    window.open("mailto:support@fryheads.com", "_blank");
  }, []);

  const remainingNfts = useMemo(() => maxSupply - totalSupply, [maxSupply, totalSupply]);

  return (
    <div className="home-section">
      <Header />
      <div className="main-section">
        <img src={mainImg} alt="" className="main-img" />
        <img src={mainBg} alt="" className="main-bg-img" />
      </div>
      <div className="main-text">
        <h1 className="main-title">Mint a NFT</h1>
        <p className="sub-title">Give to charity</p>
        <p className="title-text">
          50% of the mint price and secondary sales fees <br />
          <span>
            are sent to
            <Link to="https://thegivingblock.com/" target="_blank" rel="noreferrer">
              <img src={givingblock} alt="" className="givingblock" />{" "}
            </Link>
            in perpetuity.
          </span>
        </p>
        <MainButton
          title={isConnected ? "Mint NFT" : "Connect wallet"}
          onClick={!isConnected ? openConnectModal : () => navigate(generatePath(routePaths.mint))}
        />
      </div>

      <div className="collection-section">
        <div className="collection-header">
          <div className="collection-title">
            <h2>Notre Collection</h2>
            <div>{isLoading ? <Loader width="16" /> : remainingNfts} Fry Heads to mint remaining</div>
          </div>
          <Link to="https://opensea.io/collection/fryheadsnft" target="_blank" rel="noreferrer">
            See entire collection <Opensee />
          </Link>
        </div>

        <div className="nft-cards">
          {nfts.map((nft) => (
            <Card
              key={nft.name}
              nft={nft}
              tokenPrice={tokenPrice}
              isLoading={isLoading}
              onClick={!isConnected ? openConnectModal : () => navigate(generatePath(routePaths.mint))}
            />
          ))}
        </div>
      </div>
      <Charities />
      <div className="charity-text-section">
        <div className="charity-text">
          “Charity is the heartbeat of humanity, <br /> a testament to our shared <br /> compassion and commitment to <br /> uplifting one another.”
        </div>
        <MainButton
          className={"secoundary-button"}
          title={isConnected ? "Mint NFT" : "Connect wallet"}
          onClick={!isConnected ? openConnectModal : () => navigate(generatePath(routePaths.mint))}
        />
      </div>
      <div className="contact-section">
        <div className="mail" onClick={sendEmail}>
          Contact@fryheads.com
        </div>
        <div className="contract">
          Contract address
          <Link
            to={
              isTestnet
                ? `https://sepolia.etherscan.io/address/${CollectionConfig.contractAddressTest}`
                : `https://etherscan.io/address/${CollectionConfig.contractAddress}`
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={etherscan} alt="" />
          </Link>
        </div>
        <div className="find-us">
          Find us on
          <span>
            <Link to="https://twitter.com/FryHeadsNFT" target="_blank" rel="noreferrer">
              <X />
            </Link>
            <Link to="https://opensea.io/collection/fryheadsnft" target="_blank" rel="noreferrer">
              <OpenseeBl />
            </Link>
          </span>
        </div>
      </div>
      <img src={bottomImg} alt="" className="bottom-img" />
      <Footer />
    </div>
  );
}
