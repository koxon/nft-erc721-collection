import { useCallback, useMemo } from "react";
import mainImg from "../assets/img/main-img.png";
import bottomImg from "../assets/img/bottom-img.jpg";
// import mainBg from "../assets/img/list-ch.png";
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
import { useContractDetails } from "hooks/useContractInfo";
import Header from "./Header";
import Loader from "./Loader";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useNavigate } from "react-router-dom";
import { routePaths } from "routes/routePaths";
import { useWindowWidth } from "@react-hook/window-size";
import CreatorThesis from "./CreatorThesis";
import fh1 from "../assets/img/preview/1.png";
import fh2 from "../assets/img/preview/2.png";
import fh3 from "../assets/img/preview/3.png";
import fh4 from "../assets/img/preview/4.png";
import fh5 from "../assets/img/preview/5.png";

const nfts = [
  {
    name: "Fry Head #1",
    description: "The Fry Heads",
    backround: "#876D4E",
    src: fh1
  },
  {
    name: "Fry Head #2",
    description: "The Fry Heads",
    backround: "#44856B",
    src: fh2
  },
  {
    name: "Fry Head #3",
    description: "The Fry Heads",
    backround: "#717D61",
    src: fh3
  },
  {
    name: "Fry Head #4",
    description: "The Fry Heads",
    backround: "#876D4E",
    src: fh4
  },
  {
    name: "Fry Head #5",
    description: "The Fry Heads",
    backround: "#44856B",
    src: fh5
  }
];

export default function Home() {
  const { openConnectModal } = useConnectModal();
  const navigate = useNavigate();
  const windowWidth = useWindowWidth({ wait: 0 });

  const { chainId, isConnected } = useAccount();

  const isTestnet = useMemo((): boolean => chainId === CollectionConfig.testnet.chainId, [chainId]);

  const { totalSupply, maxSupply, tokenPrice, isLoading } = useContractDetails({
    isTestnet,
  });

  const sendEmail = useCallback(() => {
    window.open("mailto:fryheads@gmail.com", "_blank");
  }, []);

  const remainingNfts = useMemo(() => maxSupply - totalSupply, [maxSupply, totalSupply]);

  const nftList = useMemo(() => {
    if (windowWidth <= 1050) {
      return nfts.slice(0, -4);
    } else if (windowWidth <= 1340) {
      return nfts.slice(0, -2);
    } else {
      return nfts;
    }
  }, [windowWidth]);

  return (
    <div className="home-section">
      <Header />
      <div className="main-section">
        <img src={mainImg} alt="" className="main-img" />
        {/* <img src={mainBg} alt="" className="main-bg-img" /> */}
      </div>
      <div className="content-box">
        <div className="main-text">
          <h1 className="main-title">Mint a NFT</h1>
          <p className="sub-title">Give to charity</p>
          <p className="title-text">
            {windowWidth <= 400 ? (
              <>
                50% of the mint price and
                <br /> secondary sales fees are sent to
              </>
            ) : (
              "50% of the mint price and secondary sales fees"
            )}
            <span>
              {windowWidth >= 400 && "are sent to the "}
              charity of your choice, in perpetuity.
            </span>
            <br></br>
            <span>
              In partnership with
              <Link to="https://thegivingblock.com/" target="_blank" rel="noreferrer">
                <img src={givingblock} alt="" className="givingblock" />{" "}
              </Link>
            </span>
          </p>
          <MainButton
            title={isConnected ? "Mint NFT" : "Connect wallet"}
            onClick={!isConnected ? openConnectModal : () => navigate(generatePath(routePaths.mint))}
          />
          <MainButton
            title={"Buy from Marketplace"}
            onClick={!isConnected ? openConnectModal : () => navigate(generatePath(routePaths.mint))}
          />
        </div>
        {windowWidth > 860 && <CreatorThesis />}
        <div className="collection-section">
          <div className="collection-header">
            <div className="collection-title">
              <h2>Collection preview</h2>
              <div>
                {isLoading ? <Loader width="16" /> : remainingNfts} {windowWidth > 550 && "Fry Heads to mint"} remaining
              </div>
            </div>
            <Link to="https://opensea.io/collection/fryheadsnft" target="_blank" rel="noreferrer">
              {windowWidth <= 550 ? "All collection" : "See entire collection"} <Opensee />
            </Link>
          </div>

          <div className="nft-cards">
            {nftList.map((nft) => (
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

        {windowWidth <= 860 && <CreatorThesis />}
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
              <Link to="https://twitter.com/nft_freezer" target="_blank" rel="noreferrer">
                <X />
              </Link>
              <Link to="https://opensea.io/collection/fryheadsnft" target="_blank" rel="noreferrer">
                <OpenseeBl />
              </Link>
            </span>
          </div>
        </div>

        <img src={bottomImg} alt="" className="bottom-img" />
      </div>
      <Footer />
    </div>
  );
}
