import { Link } from "react-router-dom";
import creator from "../assets/img/creator.png";

export default function CreatorThesis() {
  return (
    <div className="creator-thesis-section">
      <div className="creator-header">
        <img src={creator} alt="" />
        <div className="creator-title">
          <h3>
            <Link to="https://www.linkedin.com/in/nicolas-menciere-a987b61/" target="_blank" rel="noreferrer">
              Nicolas Mencière
            </Link>
          </h3>
          <p>Creator</p>
        </div>
      </div>
      <div className="arrow" />
      <div className="creator-text">
        “Digital assets can turn creativity into a powerful force for good. Every FryHeads NFT sold or traded is a step towards making a real difference in the world. 
        Our mission is to harness the potential of NFTs to support charitable causes and bring about positive change. 
        With each purchase, collectors become part of a larger movement, where art and philanthropy intersect to create a brighter future for those in need. 
        Together, we can prove that the digital revolution isn&#39;t just about greed and speculation, but also about compassion and community.”
      </div>
    </div>
  );
}
