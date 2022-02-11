import React from "react";
import { Spinner } from "../../../components/spinner";
import { Contract } from "ethers";
import Image from "next/image";

// DeFi
import pangolin from "../../../assets/defi-round-players/pangolin.png";
import joe from "../../../assets/defi-round-players/joe.jpg";
import penguin from "../../../assets/defi-round-players/penguin.png";
import avalaunch from "../../../assets/defi-round-players/avalaunch.jpg";
import avaware from "../../../assets/defi-round-players/avaware.jpg";
import yetiswap from "../../../assets/defi-round-players/yetiswap.jpg";
import maxi from "../../../assets/defi-round-players/maxi.jpg";
import hurricane from "../../../assets/defi-round-players/hurricane.jpg";
import qi from "../../../assets/defi-round-players/qi.svg";

// NFT Players
import APA from "../../../assets/nft-round-players/i-APA.png";
import AVAXAPE from "../../../assets/nft-round-players/i-AVAXAPE.png";
import FIRAT_NFT from "../../../assets/nft-round-players/i-FIRAT_NFT.png";
import chikn from "../../../assets/nft-round-players/i-chikn.png";
import HRO from "../../../assets/nft-round-players/i-HRO.png";
import NEMO from "../../../assets/nft-round-players/i-NEMO.png";
import POLICE from "../../../assets/nft-round-players/i-POLICE.png";
import PUNK from "../../../assets/nft-round-players/i-PUNK.png";
import SEAL from "../../../assets/nft-round-players/i-SEAL.png";
import TBC from "../../../assets/nft-round-players/i-TBC.png";

type Player = {
  image: StaticImageData;
  title: string;
  href: string;
};

const DEFI_PLAYERS = [
  {
    image: pangolin,
    title: "Pangolin",
    href: "https://twitter.com/pangolindex",
  },
  {
    image: joe,
    title: "Trader Joe",
    href: "https://twitter.com/traderjoe_xyz",
  },
  {
    image: penguin,
    title: "Penguin Finance",
    href: "https://twitter.com/penguin_defi",
  },
  {
    image: avalaunch,
    title: "Avalaunch",
    href: "https://twitter.com/AvalaunchApp",
  },
  {
    image: avaware,
    title: "Avaware",
    href: "https://twitter.com/AvawareAVE",
  },
  {
    image: qi,
    title: "BENQI",
    href: "https://twitter.com/BenqiFinance",
  },
  {
    image: hurricane,
    title: "HurricaneSwap",
    href: "https://twitter.com/HurricaneSwap",
  },
  {
    image: maxi,
    title: "Maximizer",
    href: "https://twitter.com/maximizer_xyz",
  },
  {
    image: yetiswap,
    title: "Yeti Swap",
    href: "https://twitter.com/YetiSwap",
  },
];

const NFT_PLAYERS = [
  {
    image: APA,
    title: "Avalanche Party Animals",
    href: "https://twitter.com/apa_nft",
  },
  {
    image: AVAXAPE,
    title: "Avax Apes",
    href: "https://twitter.com/AvaxApesNFT",
  },
  {
    image: FIRAT_NFT,
    title: "Firat NFTs Collection",
    href: "https://twitter.com/firatinsayfasi",
  },
  {
    image: chikn,
    title: "chikn",
    href: "https://twitter.com/chikn_nft",
  },
  {
    image: HRO,
    title: "Heroes Token",
    href: "https://twitter.com/heroesofnft",
  },
  {
    image: NEMO,
    title: "Neon Monsters",
    href: "https://twitter.com/0xNeonMonsters",
  },
  {
    image: POLICE,
    title: "Police & Thief Game",
    href: "https://twitter.com/policethiefnft",
  },
  {
    image: PUNK,
    title: "Avax Punks",
    href: "https://twitter.com/avaxpunks",
  },
  {
    image: SEAL,
    title: "Crypto Seals",
    href: "https://twitter.com/CryptoSeals",
  },
  {
    image: TBC,
    title: "Tiny Bones Club",
    href: "https://twitter.com/TinyBonesClub",
  },
];

type Props = {
  masterContract: Contract | undefined | null;
};
export const Info: React.FC<Props> = ({ masterContract }) => {
  const [segmentNo, setSegmentNo] = React.useState<number | undefined>();

  React.useEffect(() => {
    let isMounted = true;
    const init = async () => {
      if (!masterContract) return;
      try {
        const nextTokenId = await masterContract.nextTokenId();
        const segmentNo = (
          await masterContract.segmentNoOfToken(nextTokenId)
        ).toNumber();

        if (isMounted) {
          setSegmentNo(segmentNo);
        }
      } catch {
        setSegmentNo(undefined);
      }
    };
    init();
    return () => {
      isMounted = false;
    };
  }, [masterContract]);

  const renderPlayers = (players: Array<Player>) => {
    return (
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <ul className="d-block mb-0 list-inline">
            {players.map((p, index) => (
              <li key={index} className="list-inline-item">
                <a
                  href={p.href}
                  className="link-light small"
                  rel="noreferrer"
                  target="_blank"
                >
                  <i className="me-1 fab fa-twitter"></i>
                  {p.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  const renderPlayersOnlyImage = (players: Array<Player>) => {
    return (
      <ul className="d-block mb-0 list-inline">
        {players.map((p, index) => (
          <li key={index} className="list-inline-item">
            <Image
              src={p.image}
              width={30}
              height={30}
              className="rounded-circle border border-dark border-1"
              alt={p.title}
            />
          </li>
        ))}
      </ul>
    );
  };

  const renderSegment = () => {
    return typeof segmentNo !== "undefined" ? (
      <div className="mt-5 w-100">
        <div className="mb-3 text-center text-shadow">
          {(() => {
            if (segmentNo === 0)
              return (
                <div>
                  <div>
                    <i className="fas fa-hashtag me-1"></i>Neon Monsters Round
                  </div>
                  <p>It&apos;s mintable 90% discounted for a zombie.</p>
                </div>
              );

            if (segmentNo > 0 && segmentNo < 5)
              return (
                <div>
                  <div className="mb-2">
                    <i className="fas fa-hashtag me-1"></i>NFT Round
                  </div>
                  <p>
                    It can mint with a 10% discount if you&apos;re the holder of
                    one of the tokens below.
                  </p>
                  {renderPlayers(NFT_PLAYERS)}
                </div>
              );

            if (segmentNo > 4)
              return (
                <div>
                  <div className="mb-2">
                    <i className="fas fa-hashtag me-1"></i>DeFi Round
                  </div>
                  <p>
                    It can mint with a 10% discount if you&apos;re the holder of
                    one of the tokens below.
                  </p>
                  {renderPlayers(DEFI_PLAYERS)}
                </div>
              );

            return null;
          })()}
        </div>
        <div className="" style={{ marginLeft: `${segmentNo * 11}%` }}>
          <i className="fa-2x fas fa-map-pin text-shadow"></i>
        </div>
        <div
          className="progress shadow mb-3 bg-dark"
          style={{ height: "2.5rem" }}
        >
          <div
            className="progress-bar bg-info"
            role="progressbar"
            style={{ width: "11.2%" }}
            aria-valuenow={22}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div className="text-center mt-1">
              <Image
                src={NEMO}
                width={30}
                height={30}
                className="rounded-circle border border-dark border-1"
                alt="Neon Monsters"
              />
            </div>
          </div>
          <div
            className="progress-bar bg-success"
            role="progressbar"
            style={{ width: "44.4%" }}
            aria-valuenow={78}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            {renderPlayersOnlyImage(NFT_PLAYERS)}
          </div>
          <div
            className="progress-bar bg-danger"
            role="progressbar"
            style={{ width: "44.4%" }}
            aria-valuenow={78}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            {renderPlayersOnlyImage(DEFI_PLAYERS)}
          </div>
        </div>
      </div>
    ) : (
      <div className="text-center">
        <Spinner color="text-light" />
      </div>
    );
  };

  return <div>{renderSegment()}</div>;
};
