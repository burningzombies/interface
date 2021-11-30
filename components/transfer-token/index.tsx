import React from "react";
import { Spinner } from "../spinner";
import { utils } from "ethers";
import { errorHandler } from "../../utils";
import { useAlert } from "react-alert";
import { useWeb3 } from "../../hooks/use-web3";
import { sleep } from "../../utils";
import { APP } from "../../utils/consts";

type Props = {
  tokenId: string;
  className: string;
  from: string;
  mutate: any; // eslint-disable-line @typescript-eslint/no-explicit-any
};

export const TransferToken: React.FC<Props> = ({
  from,
  className,
  tokenId,
  mutate,
}) => {
  const { isReady, provider, address, chainId, masterContract } = useWeb3();
  const alert = useAlert();
  const [loading, setLoading] = React.useState<boolean>(false);

  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const changeInputValue = (val: string) => {
    if (inputRef.current === null) return;
    inputRef.current.value = val;
  };

  const transferToken = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading || !masterContract) return;
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const to = formData.get("to") as string;

    try {
      if (!utils.isAddress(to)) {
        alert.error(<>Please, enter a valid avalanche c-chain address.</>);
        await sleep(200);
        changeInputValue("");
        setLoading(false);
        return;
      }
      const tx = await masterContract.transferFrom(from, to, tokenId);
      await tx.wait();

      alert.success(<>The token is transferred to {to}.</>);

      mutate();
      setLoading(false);
      changeInputValue("");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);
      setLoading(false);
      changeInputValue("");
      alert.error(
        <>{errorHandler(err)}</>
      );
    }
  };

  const renderModal = () => {
    return (
      <div
        className="modal fade"
        id={`transferToken_${tokenId}`}
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content bg-dark">
            <div className="modal-header border-bottom border-secondary">
              <h5
                className="modal-title text-warning text-shadow"
                id="exampleModalLabel"
              >
                Transfer Token
              </h5>
              <button
                type="button"
                className="btn btn-sm btn-danger"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fas fa-times-circle"></i>
              </button>
            </div>
            <div className="modal-body text-shadow text-light">
              <form
                id={`transferTokenForm_${tokenId}`}
                onSubmit={transferToken}
              >
                <div className="col-auto">
                  <input
                    ref={inputRef}
                    name="to"
                    type="text"
                    placeholder="Please enter the wallet address."
                    className="form-control shadow border border-2 border-secondary"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer border-top border-secondary">
              <button
                type="submit"
                form={`transferTokenForm_${tokenId}`}
                className="btn btn-warning btn btn-primary"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                Transfer
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (
    !isReady ||
    !provider ||
    !address ||
    !chainId ||
    (chainId &&
      (chainId !== APP.CHAIN_ID ||
        address.toLowerCase() !== from.toLowerCase()))
  )
    return null;

  return (
    <>
      <button
        className={className}
        data-bs-toggle="modal"
        data-bs-target={`#transferToken_${tokenId}`}
      >
        {loading ? (
          <Spinner
            color={className.includes("text-dark") ? "text-dark" : "text-light"}
          />
        ) : (
          <i className="fas fa-rocket"></i>
        )}
      </button>
      {renderModal()}
    </>
  );
};
