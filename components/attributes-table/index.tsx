import React from "react";
import useSWR from "swr";
import { fetcher } from "../../utils";
import { getTraits } from "../../utils/queries";
import { Spinner } from "../spinner";
import { useWeb3 } from "../../hooks/use-web3";
import { Web3Wrapper } from "../web3-wrapper";

interface Trait {
  type: string;
  value: string;
  amount: number;
  id: string;
}
interface Collection {
  totalSupply: number;
}

interface Data {
  traits: Array<Trait>;
  collection: Collection;
}

const renderTh = (val: string, w: number) => {
  return (
    <th
      style={{ width: `${w}%` }}
      scope="col"
      className="text-truncate border-secondary"
    >
      {val}
    </th>
  );
};

const renderTd = (trait: Trait, totalSupply: number) => {
  return (
    <tr key={trait.id}>
      <td className="text-truncate">{trait.type}</td>
      <td className="text-truncate">{trait.value}</td>
      <td className="text-truncate">
        {(1 / (trait.amount / totalSupply)).toFixed(2)}
      </td>
      <td className="text-truncate">{trait.amount}</td>
    </tr>
  );
};

export const AttributesTable: React.FC = () => {
  const [sale, setSale] = React.useState<boolean | undefined>();
  const { data, error } = useSWR<Data, Error>(getTraits, fetcher);

  const { isReady, provider, address, chainId, masterContract } = useWeb3();

  React.useEffect(() => {
    let isMounted = true;
    const init = async () => {
      if (!isReady || !masterContract) return;

      try {
        const saleStatus = await masterContract.isSaleActive();
        if (isMounted) setSale(saleStatus);
      } catch {
        setSale(undefined);
      }
    };
    init();
    return () => {
      isMounted = false;
    };
  }, [isReady, masterContract]);

  if (!data && !error) {
    return (
      <div className="text-center my-5">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <div className="text-center my-5">{error.message}</div>;
  }

  if (!data) {
    return <div className="text-center my-5">Failed to fetch!</div>;
  }

  return (
    <div className="table-responsive">
      <Web3Wrapper
        {...{ isReady, provider, address, chainId }}
        wrapperStyle="text-start text-dark m-0"
        spinnerStyle="text-dark"
      >
        {(() => {
          if (sale === false) {
            return (
              <>
                <i
                  className="text-success text-shadow fas fa-circle me-2"
                  title="Finished"
                ></i>
                <span className="small text-shadow fw-bold">
                  Minting is not active.
                </span>
              </>
            );
          }
          if (sale === true) {
            return (
              <>
                <i
                  className="text-danger text-shadow fas fa-circle me-2"
                  title="Active"
                ></i>
                <span className="small text-shadow fw-bold">
                  Scores may change while minting is active.
                </span>
              </>
            );
          }
          return <Spinner />;
        })()}
      </Web3Wrapper>
      <div className="table-responsive">
        <table className="mt-2 table table-dark table-striped">
          <thead>
            <tr>
              {renderTh("Type", 30)}
              {renderTh("Value", 30)}
              {renderTh("Score", 20)}
              {renderTh("Amount", 20)}
            </tr>
          </thead>
          <tbody>
            {data.traits.map((trait) =>
              renderTd(trait, data.collection.totalSupply)
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
