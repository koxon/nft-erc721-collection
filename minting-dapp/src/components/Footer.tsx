import { Link } from "react-router-dom";

type Props = {
  contractAddress: string;
};

export default function Footer({ contractAddress }: Props) {
  return (
    <>
      <div className="footer">
        <div>
          <h1 className="generic-title">Anyone can trigger the distribution of funds to charities</h1>
          <div>
            <div>
              Execute the &quot;withdraw&quot; method of smart contract on{" "}
              <Link to={"https://etherscan.io/address/" + contractAddress} target="_blank" rel="noreferrer">
                etherscan.io
              </Link>
              . If there are any WETH tokens in the contract, execute the &quot;withdrawETH&quot; method first to transform them into ETH.
            </div>
          </div>
        </div>
      </div>

      <div className="footer">
        <div>
          To know which charity your NFT supports you can use the <strong>tokenCharity(token_id)</strong> contract function to get the charity ID
          associated with it. Then you can use the <strong>charities(charity_id)</strong> contract function to get the charity detailed information.
          You can run those functions directly from <Link to="https://etherscan.io/">etherscan.io</Link>.
        </div>
      </div>
    </>
  );
}
