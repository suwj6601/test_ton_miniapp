export const shortenAddress = (address: string, first = 6, last = 4) => {
  return `${address.slice(0, first)}...${address.slice(-last)}`;
};
