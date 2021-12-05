import React from "react";
import { Spinner } from "../../../components/spinner";
import { Contract } from "ethers";
import { Balance } from "../../../components/balance";

type Props = {
  masterContract: Contract | undefined | null;
  address: string | undefined | null;
};
export const Info: React.FC<Props> = ({ address, masterContract }) => {
  const [maxTokenPerTx, setMaxTokenPerTx] = React.useState<
    number | undefined
  >();
  const [maxTokenPerWallet, setMaxTokenPerWallet] = React.useState<
    number | undefined
  >();
  const [segmentNo, setSegmentNo] = React.useState<number | undefined>();

  React.useEffect(() => {
    let isMounted = true;
    const init = async () => {
      if (!masterContract) return;
      try {
        const maxTokenPerTx = (
          await masterContract.MAX_TOKEN_PER_TX()
        ).toNumber();
        const maxTokenPerWallet = (
          await masterContract.MAX_TOKEN_PER_WALLET()
        ).toNumber();

        const segmentSize = (await masterContract.segmentSize()).toNumber();
        const totalSupply = (await masterContract.totalSupply()).toNumber();
        const segmentNo_ = (totalSupply / segmentSize).toString();
        const segmentNo = parseInt(segmentNo_);

        if (isMounted) {
          setMaxTokenPerTx(maxTokenPerTx);
          setMaxTokenPerWallet(maxTokenPerWallet);
          setSegmentNo(segmentNo);
        }
      } catch {
        setMaxTokenPerTx(undefined);
        setMaxTokenPerWallet(undefined);
        setSegmentNo(undefined);
      }
    };
    init();
    return () => {
      isMounted = false;
    };
  }, [masterContract]);

  const renderMaxTokenPerTx = () => {
    return maxTokenPerTx ? (
      <strong>{maxTokenPerTx}</strong>
    ) : (
      <Spinner color="text-light" />
    );
  };

  const renderMaxTokenPerWallet = () => {
    return maxTokenPerWallet ? (
      <strong>
        <Balance {...{ masterContract, owner: address }} />/{maxTokenPerWallet}
      </strong>
    ) : (
      <Spinner color="text-light" />
    );
  };

  const renderSegment = () => {
    const renderBenefits = (segmentNo: number): string => {
      switch (segmentNo) {
        case 0: {
          return "90% Discount for $NEMO minters.";
        }
        case 1: {
          return "50% Discount for $NEMO minters.";
        }
        default: {
          return "TBA";
        }
      }
    };
    return segmentNo ? (
      <>
        <i className="fas fa-info-circle me-2"></i>
        <strong className="me-2">Segment {segmentNo}</strong>(
        {renderBenefits(segmentNo)})
      </>
    ) : (
      <Spinner color="text-light" />
    );
  };

  return (
    <ul className="list-unstyled mb-0">
      <li>
        <span className="small">{renderSegment()}</span>
      </li>
      <li>
        <span className="small">
          * Maximum {renderMaxTokenPerTx()} zombies can mint, once.
        </span>
      </li>
      <li>
        <span className="small">
          ** Maximum {renderMaxTokenPerWallet()} zombies can collect per wallet.
        </span>
      </li>
    </ul>
  );
};
