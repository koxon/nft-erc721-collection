import React, { useMemo } from "react";
import { Link } from "react-router-dom";

type Props = {
  userAddress?: string;
  contractAddress: string | null;
  totalSupply: number;
  maxSupply: number;
  isPaused: boolean;
  isWhitelistMintEnabled: boolean;
  isUserInWhitelist: boolean;
};

const CollectionStatus: React.FC<Props> = ({ userAddress, contractAddress, totalSupply, maxSupply, isPaused, isWhitelistMintEnabled }) => {
  const isSaleOpen = useMemo((): boolean => isWhitelistMintEnabled || !isPaused, [isPaused, isWhitelistMintEnabled]);

  return (
    <div className="collection-status">
      <div className="user-address">
        <span className="label">Your address</span>
        <span className="address">{userAddress}</span>
      </div>

      <div className="contract-address">
        <span className="address">
          <Link to={`https://etherscan.io/address/${contractAddress}`} target="_blank" rel="noopener noreferrer">
            FryHeads Contract address
          </Link>
        </span>
      </div>

      <div className="supply">
        <span className="label">Supply</span>
        {totalSupply}/{maxSupply}
      </div>

      <div className="current-sale">
        <span className="label">Sale status</span>
        {isSaleOpen ? <>{isWhitelistMintEnabled ? "Whitelist only" : "Open"}</> : "Closed"}
      </div>
    </div>
  );
};

export default CollectionStatus;
