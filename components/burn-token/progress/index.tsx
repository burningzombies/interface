import React from "react";
import { Contract } from "ethers";
import { Spinner } from "../../spinner";

const progressInfoList = (): React.ReactNode => {
  const li = (i: React.ReactNode) => {
    return (
      <li className="list-inline-item">
        <span className="small">{i}</span>
      </li>
    );
  };

  return (
    <ul className="list-inline text-secondary">
      {li(
        <>
          <i className="text-success fas fa-circle"></i> Minted
        </>
      )}
      {li(
        <>
          <i className="text-warning fas fa-circle"></i> Burned
        </>
      )}
      {li(
        <>
          <i className="text-dark fas fa-circle"></i> Unclaimed
        </>
      )}
    </ul>
  );
};

type Props = {
  masterContract: Contract | null | undefined;
};

export const Progress: React.FC<Props> = ({ masterContract }) => {
  const [minted, setMinted] = React.useState<number>(0);
  const [burned, setBurned] = React.useState<number>(0);
  const [fetched, setFetched] = React.useState<boolean>(false);

  React.useEffect(() => {
    let isMounted = true;
    const init = async () => {
      if (!masterContract) return;
      try {
        const currentTokenId = await masterContract.currentTokenId();
        const totalSupply = await masterContract.totalSupply();
        const maxSupply = await masterContract.MAX_SUPPLY();
        if (isMounted) {
          setMinted(parseFloat(((totalSupply / maxSupply) * 100).toFixed(2)));
          setBurned(
            parseFloat(
              (((currentTokenId - totalSupply) / maxSupply) * 100).toFixed(2)
            )
          );
          setFetched(true);
        }
      } catch (err) {
        setMinted(0);
        setBurned(0);
        setFetched(false);
      }
    };
    init();
    const interval = setInterval(() => init(), 1000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [masterContract]);

  return (
    <>
      <span className="text-light">
        {fetched ? (
          <span className="fw-bold">{(burned + minted).toFixed(2)}%</span>
        ) : (
          <Spinner color="text-light" />
        )}{" "}
        of zombies are gone, keep going!
      </span>
      <div className="my-2 progress bg-dark shadow" style={{ height: "3rem" }}>
        <div
          className="progress-bar bg-success"
          role="progressbar"
          style={{
            width: `${minted}%`,
          }}
          aria-valuenow={minted}
          aria-valuemin={0}
          aria-valuemax={100}
          title="Minted"
        >
          <span className="fw-bold text-light">
            <i className="fas fa-2x fa-lock"></i>
          </span>
        </div>
        <div
          className="progress-bar bg-warning"
          role="progressbar"
          style={{
            width: `${burned}%`,
          }}
          aria-valuenow={burned}
          aria-valuemin={0}
          aria-valuemax={100}
          title="Burned"
        >
          <span className="fw-bold text-dark">
            <i className="fas fa-2x fa-fire"></i>
          </span>
        </div>
      </div>
      <div className="mt-3">{progressInfoList()}</div>
    </>
  );
};
