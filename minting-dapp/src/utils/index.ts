export const shortPubKey = (pubkey?: string, fractionStart = 6, fractionEnd = 4) => {
  if (pubkey) {
    const start = pubkey.substring(0, fractionStart);
    const end = pubkey.substring(pubkey.length - fractionEnd);
    return `${start}...${end}`;
  }
};
