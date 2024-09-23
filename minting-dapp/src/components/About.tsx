import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function About() {
  return (
    <div className="about-page">
      <Header />

      <div className="main-section">
        <div className="content-box ">
          <div className="main-text">
            <p className="title-text">The Fry Heads are the first charitable NFTs. We wanted our NFTs to impact the real world and be useful.</p>
            <p className="title-text">
              When you mint a Fry Head, 50% of the minting cost (outside of gas fees) is given to the charity index of your choice. 50% of the
              creator&apos;s fee is also given to charity during secondary sales on NFT marketplaces.
            </p>
            <p className="title-text">
              The charity wallets are owned and operated by{" "}
              <Link className="" to="https://thegivingblock.com/" target="_blank" rel="noreferrer">
                The Giving Block.
              </Link>
            </p>
            <p className="title-text">
              Charity donations remains on the FryHeads contract until someone triggers the distribution of the tokens by executing the
              &apos;withdraw&apos; method of the FryHeads smart contract.
            </p>
            <p className="title-text">
              In association with{" "}
              <Link className="" to="https://NFTFreezer.com" target="_blank" rel="noreferrer">
                NFTFreezer.com
              </Link>
              .{" "}
              <b>
                <br></br>Get 50% off on NFT Freezer if you have a Fry Head in your wallet.
              </b>
            </p>
            <p className="title-text">
              <b>Supported charities:</b>
            </p>
            <p className="title-text">
              <ul>
                <li>
                  <div>
                    <b>Education</b>
                  </div>
                  <div>Contract: 0xC40F82716642DE7e09053510d584888C424413ED</div>
                  <div>
                    <Link to="https://thegivingblock.com/impact-index-funds/education/" target="_blank" rel="noreferrer">
                      See on The Giving Block
                    </Link>
                  </div>
                </li>
                <li>
                  <div>
                    <b>Environment</b>
                  </div>
                  <div>Contract: 0x9D0CBf22Ea2132D6E8EBdd6DdC760b309bFa4cc6</div>
                  <div>
                    <Link to="https://thegivingblock.com/impact-index-funds/environment/" target="_blank" rel="noreferrer">
                      See on The Giving Block
                    </Link>
                  </div>
                </li>
                <li>
                  <div>
                    <b>Civil & Human Rights</b>
                  </div>
                  <div>Contract: 0xD23C066530b47cB2246F5CaeD48330fAb0F750AA</div>
                  <div>
                    <Link to="https://thegivingblock.com/impact-index-funds/civil-human-rights/" target="_blank" rel="noreferrer">
                      See on The Giving Block
                    </Link>
                  </div>
                </li>
                <li>
                  <div>
                    <b>Children & Youth</b>
                  </div>
                  <div>Contract: 0xcE7348719d5d98Cf1a6876205A4d519Ae8E47a6d</div>
                  <div>
                    <Link to="https://thegivingblock.com/impact-index-funds/children-youth/" target="_blank" rel="noreferrer">
                      See on The Giving Block
                    </Link>
                  </div>
                </li>
                <li>
                  <div>
                    <b>Poverty & Housing</b>
                  </div>
                  <div>Contract: 0x2FB414edE7579a4E0932fbAF78f539c4C27fB1E6</div>
                  <div>
                    <Link to="https://thegivingblock.com/impact-index-funds/poverty-housing/" target="_blank" rel="noreferrer">
                      See on The Giving Block
                    </Link>
                  </div>
                </li>
                <li>
                  <div>
                    <b>Animals</b>
                  </div>
                  <div>Contract: 0xd71A6a4D4F4CD8D85E25898Da566179D9f9D8eE1</div>
                  <div>
                    <Link to="https://thegivingblock.com/impact-index-funds/animals/" target="_blank" rel="noreferrer">
                      See on The Giving Block
                    </Link>
                  </div>
                </li>
              </ul>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// charities.push(charity({
//   name: "Education",
//   short_name: "Education",
//   description: "Support US-based charities devoted to providing high-quality education. <a href='https://thegivingblock.com/impact-index-funds/education/' target='_blank'>See on The Giving Block</a>",
//   //addr: 0x886206B3c8E3D877755E16d013412C1686827133, // Dev wallets 133
//   addr: 0xC40F82716642DE7e09053510d584888C424413ED, // REAL ones
//   count: 0
// }));
// charities.push(charity({
//   name: "Environment",
//   short_name: "Environment",
//   description: "Support US-based charities protecting the environment. <a href='https://thegivingblock.com/impact-index-funds/environment/' target='_blank'>See on The Giving Block</a>",
//   // addr: 0x95Bb8d2D7dac1B1c125877B22Dfd29B69d951c51, //Dev wallets c51
//   addr: 0x9D0CBf22Ea2132D6E8EBdd6DdC760b309bFa4cc6,
//   count: 0
// }));
// charities.push(charity({
//   name: "Civil & Human Rights",
//   short_name: "Civil",
//   description: "Support US-based charities focused on civil and human rights issues. <a href='https://thegivingblock.com/impact-index-funds/civil-human-rights/' target='_blank'>See on The Giving Block</a>",
//   //addr: 0x886206B3c8E3D877755E16d013412C1686827133,
//   addr: 0xD23C066530b47cB2246F5CaeD48330fAb0F750AA,
//   count: 0
// }));
// charities.push(charity({
//   name: "Children & Youth",
//   short_name: "Children",
//   description: "Support US-based charities serving the needs of children. <a href='https://thegivingblock.com/impact-index-funds/children-youth/' target='_blank'>See on The Giving Block</a>",
//   //addr: 0x95Bb8d2D7dac1B1c125877B22Dfd29B69d951c51,
//   addr: 0xcE7348719d5d98Cf1a6876205A4d519Ae8E47a6d,
//   count: 0
// }));
// charities.push(charity({
//   name: "Poverty & Housing",
//   short_name: "Poverty",
//   description: "Support US-based charities working to relieve the difficulties of poverty and homelessness. <a href='https://thegivingblock.com/impact-index-funds/poverty-housing/' target='_blank'>See on The Giving Block</a>",
//   //addr: 0x886206B3c8E3D877755E16d013412C1686827133,
//   addr: 0x2FB414edE7579a4E0932fbAF78f539c4C27fB1E6,
//   count: 0
// }));
// charities.push(charity({
//   name: "Animals",
//   short_name: "Animals",
//   description: "Support US-based charities devoted to animal rights and protection. <a href='https://thegivingblock.com/impact-index-funds/animals/' target='_blank'>See on The Giving Block</a>",
//   //addr: 0x95Bb8d2D7dac1B1c125877B22Dfd29B69d951c51,
//   addr: 0xd71A6a4D4F4CD8D85E25898Da566179D9f9D8eE1,
//   count: 0
// }));
