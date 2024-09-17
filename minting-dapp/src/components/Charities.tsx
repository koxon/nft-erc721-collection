import Education from "../assets/charities/Education.png";
import Environment from "../assets/charities/Environment.png";
import Civil from "../assets/charities/Civil.png";
import Children from "../assets/charities/Children.png";
import Poverty from "../assets/charities/Poverty.png";
import Animals from "../assets/charities/Animals.png";
import { useCharities } from "hooks/useCharities";
import { useAccount } from "wagmi";
import { useMemo } from "react";
import { CollectionConfig } from "config/collectionConfig";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

export default function Charities() {
  const { chainId } = useAccount();
  const isTestnet = useMemo((): boolean => chainId === CollectionConfig.testnet.chainId, [chainId]);
  const { charities } = useCharities({ isTestnet });

  return charities.length ? (
    <div className="charities-section">
      <div className="charities-title">Charities</div>
      <div className="charities">
        {charities.map((charity, index) => {
          const charityImage = {
            Education: Education,
            Environment: Environment,
            Civil: Civil,
            Children: Children,
            Poverty: Poverty,
            Animals: Animals,
          }[charity?.short_name];

          return (
            <Link
              className="charity"
              key={charity?.name || index}
              to={parse(charity?.description || "")[1]?.props?.href}
              target="_blank"
              rel="noreferrer"
            >
              <img src={charityImage} alt={charity?.short_name} />
              <h3>{charity?.name}</h3>
            </Link>
          );
        })}
      </div>
    </div>
  ) : null;
}
