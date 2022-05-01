import { utils, BigNumber } from 'ethers';
import React from 'react';
import NetworkConfigInterface from '../../../../smart-contract/lib/NetworkConfigInterface';

interface Props {
  networkConfig: NetworkConfigInterface;
  maxSupply: number;
  totalSupply: number;
  tokenPrice: BigNumber;
  maxMintAmountPerTx: number;
  isPaused: boolean;
  isWhitelistMintEnabled: boolean;
  isUserInWhitelist: boolean;
  mintTokens(mintAmount: number, charityId: number): Promise<void>;
  whitelistMintTokens(mintAmount: number, charityId: number): Promise<void>;
}

interface State {
  mintAmount: number;
  charityId: number;
}

const defaultState: State = {
  mintAmount: 1,
  charityId: -1
};

export default class MintWidget extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = defaultState;
  }

  private canMint(): boolean {
    return !this.props.isPaused || this.canWhitelistMint();
  }

  private canWhitelistMint(): boolean {
    return this.props.isWhitelistMintEnabled && this.props.isUserInWhitelist;
  }

  private incrementMintAmount(): void {
    this.setState({
      mintAmount: Math.min(this.props.maxMintAmountPerTx, this.state.mintAmount + 1),
    });
  }

  private decrementMintAmount(): void {
    this.setState({
      mintAmount: Math.max(1, this.state.mintAmount - 1),
    });
  }

  private selectCharity(id: number): void {
    if (id == this.state.charityId)
      return;

    this.setState({
      charityId: id
    });
  }

  private async mint(): Promise<void> {
    if (this.state.charityId == -1) {
      alert("Please select the charity you want to give to");
      return;
    }

    if (!this.props.isPaused) {
      await this.props.mintTokens(this.state.mintAmount, this.state.charityId);

      return;
    }

    await this.props.whitelistMintTokens(this.state.mintAmount, this.state.charityId);
  }

  private getRandomArbitrary(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  render() {
    return (
      <>
        {this.canMint() ?
          <div className="mint-widget">
            <div className="preview">
              <img src={"/build/images/previews/" + this.getRandomArbitrary(1, 70).toString() + ".png"} alt="Collection preview" />
              <span><small>"greetings human!"</small></span>
            </div>
          
            <div className="price">
              <strong>Total price:</strong> {utils.formatEther(this.props.tokenPrice.mul(this.state.mintAmount))} {this.props.networkConfig.symbol}
            </div>

            <div className="charity-select">
              <div className="charity-label">20% of the price will be sent to the <a href="https://thegivingblock.com/donate/" target="_blank">Giving Block</a> charity fund of your choice. Please select one below.</div>
              <div className="charity-grid-container">
                <button className={"charity-grid-item " + (this.state.charityId==0 ? "charity-selected" : null)}
                     onClick={() => this.selectCharity(0)}><img src="/build/images/charities/Environment.png" />Environment</button>
                <button className={"charity-grid-item " + (this.state.charityId==1 ? "charity-selected" : null)}
                     onClick={() => this.selectCharity(1)}><img src="/build/images/charities/Civil.png" />Civil &amp; Human Rights</button>
                <button className={"charity-grid-item " + (this.state.charityId==2 ? "charity-selected" : null)}
                     onClick={() => this.selectCharity(2)}><img src="/build/images/charities/Children.png" />Children &amp; Youth</button>
                <button className={"charity-grid-item " + (this.state.charityId==3 ? "charity-selected" : null)}
                     onClick={() => this.selectCharity(3)}><img src="/build/images/charities/Poverty.png" />Poverty &amp; Housing</button>
                <button className={"charity-grid-item " + (this.state.charityId==4 ? "charity-selected" : null)}
                     onClick={() => this.selectCharity(4)}><img src="/build/images/charities/Animals.png" />Animals</button>
                <button className={"charity-grid-item " + (this.state.charityId==5 ? "charity-selected" : null)}
                     onClick={() => this.selectCharity(5)}><img src="/build/images/charities/Education.png" />Education</button>
              </div>
              <div className="charity-label">Select the amount of Fry Heads NFTs you want to mint then click "Mint".</div>
            </div>

            <div className="controls">
              <button className="decrease" onClick={() => this.decrementMintAmount()}>-</button>
              <span className="mint-amount">{this.state.mintAmount}</span>
              <button className="increase" onClick={() => this.incrementMintAmount()}>+</button>
              <button className="primary" onClick={() => this.mint()}>Mint</button>
            </div>
          </div>
          :
          <div className="cannot-mint">
            <span className="emoji">⏳</span>
            
            {this.props.isWhitelistMintEnabled ? <>You are not included in the <strong>whitelist</strong>.</> : <>The contract is <strong>paused</strong>.</>}<br />
            Please come back during the next sale!
          </div>
        }
      </>
    );
  }
}
