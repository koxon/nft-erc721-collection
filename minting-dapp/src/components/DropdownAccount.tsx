import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon, HomeIcon, ArrowLeftStartOnRectangleIcon, ShoppingBagIcon, Square3Stack3DIcon } from "@heroicons/react/20/solid";
import { shortPubKey } from "utils";
import { useDisconnect } from "wagmi";
import { useMediaQuery } from "usehooks-ts";
import { generatePath, Link, useLocation } from "react-router-dom";
import { routePaths } from "routes/routePaths";
import clsx from "clsx";

export default function DropdownAccount({ address }: { address: `0x${string}` }) {
  const { disconnect } = useDisconnect();
  const { pathname } = useLocation();
  const isMobile = useMediaQuery("(max-width: 600px)");
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="main-button connect-button">
          {isMobile ? shortPubKey(address, 5, 3) : shortPubKey(address)}
          <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-white" />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-[#2c231b] shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-2">
          {isMobile && (
            <>
              <MenuItem>
                <Link
                  to={generatePath(routePaths.home)}
                  // className="block w-full px-4 py-2 text-left text-sm text-white data-[focus]:bg-[#3a312a] rounded-md"
                  className={clsx("flex items-center w-full px-2 py-2 text-left text-sm text-white data-[focus]:bg-[#3a312a] rounded-md", {
                    ["font-bold"]: pathname === generatePath(routePaths.home),
                  })}
                >
                  <HomeIcon className="w-4 h-4 mr-2" />
                  Home
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  to={generatePath(routePaths.mint)}
                  // className="block w-full px-4 py-2 text-left text-sm text-white data-[focus]:bg-[#3a312a] rounded-md"
                  className={clsx("flex items-center w-full px-2 py-2 text-left text-sm text-white data-[focus]:bg-[#3a312a] rounded-md", {
                    ["font-bold"]: pathname === generatePath(routePaths.mint),
                  })}
                >
                  <ShoppingBagIcon className="w-4 h-4 mr-2" />
                  Mint NFT
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  to={generatePath(routePaths.about)}
                  // className="block w-full px-4 py-2 text-left text-sm text-white data-[focus]:bg-[#3a312a] rounded-md"
                  className={clsx("flex items-center w-full px-2 py-2 text-left text-sm text-white data-[focus]:bg-[#3a312a] rounded-md", {
                    ["font-bold"]: pathname === generatePath(routePaths.about),
                  })}
                >
                  <Square3Stack3DIcon className="w-4 h-4 mr-2" />
                  About
                </Link>
              </MenuItem>
            </>
          )}

          <MenuItem>
            <button
              className="flex items-center w-full px-2 py-2 text-left text-sm text-white data-[focus]:bg-[#3a312a] rounded-md"
              onClick={() => disconnect()}
            >
              <ArrowLeftStartOnRectangleIcon className="w-4 h-4 mr-2" />
              Disconnect
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}
