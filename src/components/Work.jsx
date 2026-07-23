import { useReveal } from "../hooks.js";
import WorkArt from "./WorkArt.jsx";

export default function Work(props) {
  const onOpen = props.onOpen;
  const ref = useReveal({ repeat: true });
  const projects = [
    {
      id: "commodifi",
      name: "CommodiFi - Indonesia's Real-World Assets, On-Chain",
      cat: "Web3 · RWA Tokenization · 2026",
      tag: "Web3 RWA",
      yr: "2026",
      art: "rwa",
      cover: "/assets/CommodiFi.jpg",
      video: "/assets/CommodiFi-demo.mp4",
      size: "large",
      link: "https://commodifi.netlify.app/",
      desc: "Indonesia's commodities, tokenized on-chain. A full-stack RWA protocol that brings gold, nickel, crude palm oil, and coal on-chain as ERC-20 tokens, each backed by tracked reserves and a Chainlink-style price oracle. Users mint and redeem assets and watch their portfolio value update live. Built end-to-end with Solidity contracts (47 Foundry tests, verified on Sepolia), a React dApp, and a Node indexer + REST API.",
      year: "2026",
      tools: "Solidity · Foundry · React · Vite · wagmi · viem · Node · Ethereum Sepolia",
      tags: ["RWA Tokenization", "Smart Contracts", "Price Oracle", "Mint & Redeem", "Indexer + REST API"],
    },
    {
      id: "equinoxfi",
      name: "EquinoxFi - DeFi Swap, Staking & Sell Platform",
      cat: "Web3 · DeFi · 2026",
      tag: "Web3 DeFi",
      yr: "2026",
      art: "defi",
      cover: "/assets/EquinoxFi.jpg",
      size: "med-r",
      link: "https://equinoxfi.vercel.app/",
      desc: "Swap easily, stake instantly. A decentralized exchange where users swap tokens, provide liquidity to pools, stake for yield, and track holdings in a portfolio view. Wallet onboarding via RainbowKit, on-chain interactions through Wagmi and Viem, with Uniswap-style AMM flows powered by Solidity smart contracts.",
      year: "2026",
      tools: "React · Solidity · Wagmi · Viem · RainbowKit · Uniswap",
      tags: ["Token Swap", "Staking", "Liquidity Pools", "Smart Contracts"],
    },
    {
      id: "mosaicnft",
      name: "MosaicNFT - Full-stack NFT Marketplace",
      cat: "Web3 · NFT Marketplace · 2026",
      tag: "Web3 NFT",
      yr: "2026",
      art: "nft",
      cover: "/assets/MosaicNFT.jpg",
      size: "med-r",
      link: "https://mosaicnft.netlify.app/",
      desc: "Pieces. Collected. Connected. A full-stack NFT marketplace on Ethereum Sepolia where users mint, list, auction, make offers, and buy, with royalties honored on every secondary sale. Features gasless lazy minting via EIP-712 signed vouchers (mint-on-buy, no upfront gas) and a The Graph subgraph that powers all listings, auctions, offers, and history. Built with Foundry-tested Solidity contracts (ReentrancyGuard, pull-payments, fuzz-tested price splits), a React + Vite + TS dApp, IPFS storage via Pinata, and Netlify Functions for the voucher store.",
      year: "2026",
      tools: "Solidity · Foundry · The Graph · React · Vite · TypeScript · wagmi · viem · RainbowKit · IPFS · Ethereum Sepolia",
      tags: ["NFT Marketplace", "Lazy Minting", "Auctions & Offers", "Royalties", "Subgraph"],
    },
    {
      id: "zenithdao",
      name: "ZenithDAO - On-chain DAO Governance",
      cat: "Web3 · DAO Governance · 2026",
      tag: "Web3 DAO",
      yr: "2026",
      art: "dao",
      cover: "/assets/ZenithDAO.jpg",
      size: "med-r",
      link: "https://zenithdao.vercel.app/",
      desc: "Govern the treasury, without limits. An on-chain DAO governance platform on Ethereum Sepolia where $ZNTH holders propose, vote, delegate, and execute treasury decisions trustlessly, enforced entirely by smart contracts. Includes a live treasury dashboard, proposal lifecycle tracking, vote delegation, and a test-token faucet.",
      year: "2026",
      tools: "React · Solidity · Wagmi · Viem · RainbowKit · Ethereum Sepolia",
      tags: ["DAO Governance", "On-chain Voting", "Vote Delegation", "Treasury"],
    },
  ];
  return (
    <section id="work" className="section">
      <div ref={ref} className="reveal reveal-anim">
        <div className="work-head">
          <div>
            <div className="section-label anim-left" style={{ "--d": "60ms" }}>
              <span className="section-num">02</span> Selected Work
            </div>
            <h2 className="work-title anim-left" style={{ "--d": "220ms" }}>
              Things I've <span className="italic-accent">shipped.</span>
            </h2>
          </div>
        </div>
        <div className="work-grid">
          {projects.map((p, i) => (
            <button
              key={p.id}
              className={"work-card anim-up " + p.size}
              style={{ "--d": 320 + i * 200 + "ms" }}
              onClick={() => onOpen(p)}
            >
            <div className="work-art">
              {p.cover ? (
                <img className="work-art-cover" src={p.cover} alt={p.name} />
              ) : (
                <>
                  <div className={"work-art-fill art-" + p.art} />
                  <WorkArt kind={p.art} />
                </>
              )}
            </div>
            <div className="work-tag-top">{p.tag}</div>
            <div className="work-year-chip">{p.yr}</div>
            <div className="work-meta">
              <div className="work-meta-main">
                <div className="work-name">{p.name}</div>
                <div className="work-cat">{p.cat}</div>
                <div className="work-reveal">
                  <p className="work-desc">{p.desc}</p>
                  <div className="work-chips">
                    {p.tags.map((t) => (
                      <span key={t} className="work-chip">
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="work-open-hint">Open case study</span>
                </div>
              </div>
              <div className="work-arrow">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </div>
            </div>
          </button>
        ))}
        </div>
        <a
          className="work-banner anim-up"
          style={{ "--d": "1120ms" }}
          href="https://github.com/rizqwijaya"
          target="_blank"
          rel="noopener noreferrer"
          data-hover={true}
        >
          <span className="work-banner-text">
            <span className="work-banner-label">
              Want the full picture?
            </span>
            <span className="work-banner-big">
              Explore more builds on <strong>GitHub</strong>
            </span>
          </span>
          <span className="work-banner-arrow" aria-hidden="true">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </span>
        </a>
      </div>
    </section>
  );
}
