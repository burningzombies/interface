import React from "react";
import Router, { useRouter } from "next/router";
import { Spinner } from "../spinner";

type Props = {
  initialPathname: string;
};

export const Sorting: React.FC<Props> = ({ children, initialPathname }) => {
  const router = useRouter();

  const sort = async (e: React.FormEvent<HTMLSelectElement>) => {
    e.preventDefault();

    const val = e.currentTarget.value;
    Router.replace({
      pathname: initialPathname,
      query: {
        page: 1,
        gender: router.query.genger,
        background: router.query.background,
        skin: router.query.skin,
        mouth: router.query.mouth,
        eyes: router.query.eyes,
        sort: val,
      },
    });
  };

  const isReloaded = () => {
    return !router.query.page;
  };

  return (
    <div className="row">
      <div className="col-lg-4 col-md-5">
        {(() => {
          if (isReloaded())
            return (
              <div className="text-center mt-1">
                <Spinner color="text-warning" />
              </div>
            );
          return (
            <select
              defaultValue={router.query.sort}
              name="sort"
              onChange={sort}
              className="form-select shadow form-select-sm"
            >
              {children}
            </select>
          );
        })()}
      </div>
    </div>
  );
};
