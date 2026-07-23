import { Fragment } from "react";

export default function Marquee() {
  const items = [
    { name: "Blockchain Development", sub: "EVM · Layer 2 · DeFi" },
    { name: "Smart Contract Development", sub: "Solidity · Hardhat · Security" },
    { name: "Web3 Development", sub: "dApps · Ethers.js · Wagmi" },
    { name: "Smart Contract Auditing", sub: "Security · Foundry · Gas Optimization" },
  ];
  const loop = items.concat(items, items);
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {loop.map((t, i) => (
          <Fragment key={i}>
            <span className="marquee-item">{t.name}</span>
            <span className="marquee-dot" />
            <span className="marquee-item outline">{t.sub}</span>
            <span className="marquee-dot" />
          </Fragment>
        ))}
      </div>
    </div>
  );
}
