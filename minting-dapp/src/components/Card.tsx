import { ethers, utils } from "ethers";
import nftPl from "../assets/img/fryhead-pl.png";
import { ReactComponent as Eth } from "../assets/svg/eth-icon.svg";
import MainButton from "./MainButton";
import Loader from "./Loader";

type CardProps = {
  nft: { name: string; description: string; backround: string };
  tokenPrice: ethers.BigNumber;
  isLoading: boolean;
  onClick?: () => void;
};

export default function Card({ nft, tokenPrice, isLoading, onClick }: CardProps) {
  return (
    <div className="nft-card-box">
      <div className="img-box" style={{ background: nft.backround }}>
        <img src={nftPl} alt="" />
        <div className="img-price">
          {isLoading ? <Loader /> : utils.formatEther(tokenPrice)}
          <span>ETH</span>
          <Eth />
        </div>
      </div>
      <div className="nft-info">
        <h3>{nft.name}</h3>
        <p>{nft.description}</p>
        <div className="price-section">
          <span>Bind {isLoading ? <Loader width="14" /> : utils.formatEther(tokenPrice)} ETH</span>
          <MainButton className={"secoundary-button"} title="Mint" onClick={onClick} />
        </div>
      </div>
    </div>
  );
}
