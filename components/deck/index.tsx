import React from "react";
import { Spinner } from "../spinner";
import { Pagination } from "../pagination";
import { useRouter } from "next/router";
import { Card } from "../card";
import { Zombie } from "../../types";

interface Data {
  zombies: Array<Zombie>;
}

type Props = {
  data: Data | undefined;
  error: Error | undefined;
  mutate: any; // eslint-disable-line @typescript-eslint/no-explicit-any
};

export const Deck: React.FC<Props> = ({ ...args }) => {
  const router = useRouter();

  const pageIndex = parseInt(router.query.page as string);

  if (!args.data && !args.error)
    return (
      <div className="text-center mt-5">
        <Spinner color="text-light" />
      </div>
    );

  if (args.error)
    return (
      <div className="text-center mt-5">
        <span className="text-light">
          Sorry for that, something went wrong if it continues, please report
          us: boo@burningzombies.com
        </span>
      </div>
    );

  if (!args.data || !(args.data.zombies.length > 0))
    return (
      <div className="text-center mt-5">
        <span className="text-light">Hmm..., Here it is so silent!</span>
      </div>
    );

  return (
    <div>
      <div className="row">
        {args.data.zombies.map((zombie) => (
          <div
            key={zombie.id}
            className="mt-4 col-lg-4 col-md-6 col-sm-12 col-xs-12"
          >
            {args.data && <Card {...{ ...zombie }} mutate={args.mutate} />}
          </div>
        ))}
      </div>
      <div className="text-center mt-5">
        <Pagination lengthOf={args.data.zombies.length} pageIndex={pageIndex} />
      </div>
    </div>
  );
};
