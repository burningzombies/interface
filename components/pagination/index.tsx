import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
  pageIndex: number;
  lengthOf: number;
};

export const Pagination: React.FC<Props> = ({ pageIndex, lengthOf }) => {
  const router = useRouter();

  const previousPage = pageIndex === 1 ? undefined : pageIndex - 1;
  const nextPage = lengthOf < 15 ? undefined : pageIndex + 1;

  return (
    <>
      {!previousPage ? (
        <a className="btn disabled btn-dark me-2">Back</a>
      ) : (
        <Link
          href={{
            pathname: router.pathname,
            query: { ...router.query, page: previousPage },
          }}
        >
          <a className="btn btn-dark me-2">Back</a>
        </Link>
      )}
      {!nextPage ? (
        <a className="disabled btn btn-dark ms-2">Next</a>
      ) : (
        <Link
          href={{
            pathname: router.pathname,
            query: {
              ...router.query,
              page: nextPage,
            },
          }}
        >
          <a className="btn btn-dark ms-2">Next</a>
        </Link>
      )}
    </>
  );
};
