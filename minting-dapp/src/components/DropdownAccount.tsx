import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { shortPubKey } from "utils";
import { useDisconnect } from "wagmi";

export default function DropdownAccount({ address }: { address: `0x${string}` }) {
  const { disconnect } = useDisconnect();
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton
          className="main-button connect-button"
          style={{
            fontSize: "14px",
          }}
        >
          {shortPubKey(address)}
          <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-[#2c231b] shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="">
          {/* <MenuItem>
            <a href="#" className="block w-full px-4 py-2 text-left text-sm text-white data-[focus]:text-black ">
              Support
            </a>
          </MenuItem> */}

          <MenuItem>
            <button className="block w-full px-4 py-2 text-left text-sm text-white data-[focus]:bg-[#3a312a] rounded-md" onClick={() => disconnect()}>
              Disconnect
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}
