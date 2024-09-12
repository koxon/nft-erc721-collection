import { utils, BigNumber } from "ethers";
import React, { useCallback, useMemo, useState } from "react";
import parse from "html-react-parser";
import mustach from "../assets/mustach.png";
import Education from "../assets/charities/Education.png";
import Environment from "../assets/charities/Environment.png";
import Civil from "../assets/charities/Civil.png";
import Children from "../assets/charities/Children.png";
import Poverty from "../assets/charities/Poverty.png";
import Animals from "../assets/charities/Animals.png";
import { Link } from "react-router-dom";

interface Props {
  maxSupply: number;
  totalSupply: number;
  tokenPrice: BigNumber;
  maxMintAmountPerTx: number;
  isPaused: boolean;
  isWhitelistMintEnabled: boolean;
  isUserInWhitelist: boolean;
  contractAddress: string | null;
  mintTokens(mintAmount: number, charityId: number): Promise<void>;
  whitelistMintTokens(mintAmount: number, charityId: number): Promise<void>;
  charities: Record<string, any>[];
}

const charityImages = {
  Education: Education,
  Environment: Environment,
  Civil: Civil,
  Children: Children,
  Poverty: Poverty,
  Animals: Animals,
};

const MintWidget: React.FC<Props> = ({
  maxSupply,
  totalSupply,
  tokenPrice,
  maxMintAmountPerTx,
  isPaused,
  isWhitelistMintEnabled,
  isUserInWhitelist,
  contractAddress,
  mintTokens,
  whitelistMintTokens,
  charities,
}) => {
  const [mintAmount, setMintAmount] = useState<number>(1);
  const [charityId, setCharityId] = useState<number>(-1);

  const canWhitelistMint = useMemo((): boolean => isWhitelistMintEnabled && isUserInWhitelist, [isWhitelistMintEnabled, isUserInWhitelist]);

  const canMint = useMemo((): boolean => !isPaused || canWhitelistMint, [isPaused, canWhitelistMint]);

  const incrementMintAmount = useCallback((): void => {
    setMintAmount(Math.min(maxMintAmountPerTx, mintAmount + 1));
  }, [maxMintAmountPerTx, mintAmount]);

  const decrementMintAmount = useCallback((): void => {
    setMintAmount(Math.max(1, mintAmount - 1));
  }, [mintAmount]);

  const selectCharity = useCallback(
    (id: number): void => {
      if (id !== charityId) {
        setCharityId(id);
      }
    },
    [charityId]
  );

  const mint = useCallback(async (): Promise<void> => {
    if (charityId === -1) {
      alert("Please select the charity you want to support <3");
      return;
    }

    if (!isPaused) {
      await mintTokens(mintAmount, charityId);
    } else {
      await whitelistMintTokens(mintAmount, charityId);
    }
  }, [charityId, isPaused, mintAmount, mintTokens, whitelistMintTokens]);

  const getRandomArbitrary = useCallback((min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min)) + min;
  }, []);

  const charityDivs: JSX.Element[] = charities?.map((charity, i) => (
    <button className={`charity-grid-item ${charityId === i ? "charity-selected" : ""}`} key={`charity-${i}`} onClick={() => selectCharity(i)}>
      <img src={charityImages[charity?.short_name as keyof typeof charityImages]} alt={charity?.name} />
      {charity?.name}
    </button>
  ));

  return (
    <>
      {canMint ? (
        <div className="mint-widget">
          <div className="charity-select">
            <h1 className="generic-title">Please select a charity below</h1>
            <div className="charity-grid-container">{charityDivs}</div>
            {charityId !== -1 && <div className="charity-desc">{parse(charities[charityId].description)}</div>}
          </div>

          <div className="price">
            <img className="mustach-fryhead-img" src={mustach} />
            <small>Price</small>
            <br />
            <strong>{utils.formatEther(tokenPrice?.mul(mintAmount))} ETH</strong>
          </div>

          <div className="controls">
            <button className="decrease" onClick={decrementMintAmount}>
              -
            </button>
            <span className="mint-amount">{mintAmount}</span>
            <button className="increase" onClick={incrementMintAmount}>
              +
            </button>
            <button className="primary" onClick={mint}>
              Mint
            </button>
          </div>

          <div>
            <small>
              Verify your transaction on <Link to={`https://etherscan.io/address/${contractAddress}`}>etherscan.io</Link> and from your wallet
            </small>
          </div>
        </div>
      ) : (
        <div className="cannot-mint">
          <span className="emoji">⏳</span>
          {isWhitelistMintEnabled ? (
            <>
              You are not included in the <strong>whitelist</strong>.
            </>
          ) : (
            <>
              The contract is <strong>paused</strong>.
            </>
          )}
          <br />
          Please come back during the next sale!
        </div>
      )}
    </>
  );
};

export default MintWidget;
