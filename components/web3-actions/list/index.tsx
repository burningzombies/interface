import React from "react";
import { Contract } from "ethers";
import { Spinner } from "../../spinner";
import avax from "../../../assets/avax-logo.svg";
import Image from "next/image";
import { APP } from "../../../utils/consts";
import { utils } from "ethers";
import { errorHandler } from "../../../utils";
import { useAlert } from "react-alert";

type Props = {
  size: string;
  tokenId: string;
  masterContract: Contract | undefined | null;
  marketContract: Contract | undefined | null;
  mutate: any; // eslint-disable-line @typescript-eslint/no-explicit-any
};

export const List: React.FC<Props> = ({
  tokenId,
  size,
  masterContract,
  marketContract,
  mutate,
}) => {
  const alert = useAlert();
  const [loading, setLoading] = React.useState<boolean>(false);

  const listToken = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading || !masterContract || !marketContract) return;
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const tokenPrice = formData.get("tokenPrice") as string;

    try {
      const approval = await masterContract.getApproved(tokenId);
      if (approval.toLowerCase() !== APP.MARKET_CONTRACT.toLowerCase()) {
        alert.info(
          <>
            Waiting for approval <Spinner color="text-dark" />
          </>
        );
        const tx = await masterContract.approve(APP.MARKET_CONTRACT, tokenId);
        await tx.wait();
      }

      const tx = await marketContract.createListing(
        tokenId,
        utils.parseUnits(tokenPrice, 18)
      );
      await tx.wait();

      alert.success(<>The token is successfully listed.</>);

      mutate();
      setLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);
      setLoading(false);
      alert.error(
        <>{errorHandler(err)}</>
      );
    }
  };

  const renderModal = () => {
    return (
      <div
        className="modal fade"
        id={`listToken_${tokenId}`}
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <div className="modal-dialog">
          <div className="modal-content bg-dark">
            <div className="modal-header border-bottom border-secondary">
              <h5
                className="modal-title text-warning text-shadow"
                id="exampleModalLabel"
              >
                Listing Price
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
                className="row"
                id={`listTokenForm_${tokenId}`}
                onSubmit={listToken}
              >
                <div className="col-lg-2 col-md-2 d-sm-none d-md-block text-center">
                  <div style={{ marginTop: ".7rem", marginBottom: ".7rem" }}>
                    <Image src={avax} width={150} height={150} alt="$AVAX" />
                  </div>
                </div>
                <div className="col-lg-10 col-md-10 d-sm-none d-md-block">
                  <input
                    name="tokenPrice"
                    type="number"
                    min={0.0}
                    step={0.01}
                    className="form-control form-control-lg shadow border border-2 border-secondary"
                    defaultValue={2.5}
                    required={true}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer border-top border-secondary">
              <button
                type="submit"
                form={`listTokenForm_${tokenId}`}
                className="btn btn-warning btn btn-primary"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                List
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <button
        className={`btn btn-light ${size}`}
        data-bs-toggle="modal"
        data-bs-target={`#listToken_${tokenId}`}
      >
        {loading ? <Spinner color="text-dark" /> : <>List</>}
      </button>
      {renderModal()}
    </>
  );
};
