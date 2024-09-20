import { useAccount } from "wagmi";
import { Menu, MenuButton } from "@headlessui/react";
import logo from "../assets/img/logo.png";
import DropdownAccount from "./DropdownAccount";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { generatePath, Link } from "react-router-dom";
import { routePaths } from "routes/routePaths";
import { useLocation } from "react-router-dom";
import clsx from "clsx";
import { useWindowWidth } from "@react-hook/window-size";

export default function Header() {
  const { openConnectModal } = useConnectModal();
  const { address, isConnected } = useAccount();
  const { pathname } = useLocation();
  const windowWidth = useWindowWidth({ wait: 0 });

  return (
    <div className="header-section">
      <Link to={generatePath(routePaths.home)} className="header-logo">
        <img src={logo} alt="logo" />
        Fry<span>Heads</span>
      </Link>
      {windowWidth > 600 && (
        <div className="header-links">
          <Link to={generatePath(routePaths.home)} className={clsx({ active: pathname === generatePath(routePaths.home) })}>
            Home
          </Link>
          <Link to={generatePath(routePaths.mint)} className={clsx({ active: pathname === generatePath(routePaths.mint) })}>
            Mint NFT
          </Link>
          <Link to={generatePath(routePaths.about)} className={clsx({ active: pathname === generatePath(routePaths.about) })}>
            About
          </Link>
        </div>
      )}
      {isConnected && address ? (
        <DropdownAccount address={address} />
      ) : (
        <Menu as="div">
          <MenuButton className="main-button connect-button" onClick={openConnectModal}>
            Connect wallet
          </MenuButton>
        </Menu>
      )}
    </div>
  );
}
function useMediaQuery(arg0: string) {
  throw new Error("Function not implemented.");
}
