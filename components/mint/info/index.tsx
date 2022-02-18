import React from "react";
import { Spinner } from "../../../components/spinner";
import { Contract } from "ethers";
import Image from "next/image";

// NFT Players
import NEMO from "../../../assets/nft-round-players/i-NEMO.png";
import SAPLING from "../../../assets/sapling.jpg";
import BBULLS from "../../../assets/bossbulls.jpg";
import DEGENS from "../../../assets/degens.jpg";

type Player = {
  image: StaticImageData;
  title: string;
  href: string;
};

const NFT_PLAYERS = [
  {
    image: NEMO,
    title: "Neon Monsters",
    href: "https://twitter.com/0xNeonMonsters",
  },
  {
    image: SAPLING,
    title: "Avax Sapling",
    href: "https://twitter.com/AvaxSapling",
  },
  {
    image: BBULLS,
    title: "Boss Bulls",
    href: "https://twitter.com/avaxbossbulls",
  },
  {
    image: DEGENS,
    title: "ClubDegen.avax",
    href: "https://twitter.com/AVAXClubDegen",
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
        <div className="col-lg-8">
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
            if (segmentNo > 0)
              return (
                <div>
                  <div className="mb-2">
                    <i className="fas fa-hashtag me-1"></i>NFT Round
                  </div>
                  <p>
                    It can mint with discount up to 75% if you&apos;re the
                    holder of one of the tokens below.
                  </p>
                  {renderPlayers(NFT_PLAYERS)}
                </div>
              );

            return (
              <div>
                <div>
                  <i className="fas fa-hashtag me-1"></i>Neon Monsters Round
                </div>
                <p>It&apos;s mintable 90% discounted for a zombie.</p>
              </div>
            );
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
            aria-valuenow={11.2}
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
            style={{ width: "88.8%" }}
            aria-valuenow={88.8}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            {renderPlayersOnlyImage(NFT_PLAYERS)}
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
