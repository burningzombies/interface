import React from "react";
import { useRouter } from "next/router";

type Props = {
  name: string;
  attributes: Array<{
    id: string;
    type: string;
    value: string;
  }>;
};

export const Attributes: React.FC<Props> = ({ name, attributes }) => {
  const router = useRouter();

  return (
    <div className="row my-4">
      <div className="col-lg-6">
        <ul className="list-unstyled">
          {attributes
            .filter((z) => {
              if (["Background", "Skin", "Eyes"].includes(z.type)) return z;
            })
            .map((z) => (
              <li key={z.id} className="text-truncate">
                <span className="text-uppercase small text-secondary">
                  {z.type}:
                </span>{" "}
                {z.value}
              </li>
            ))}
        </ul>
      </div>
      <div className="col-lg-6">
        <ul className="list-unstyled">
          {attributes
            .filter((z) => {
              if (["Nose Accessory", "Mouth"].includes(z.type)) return z;
            })
            .map((z) => (
              <li key={z.id} className="text-truncate">
                <span className="text-uppercase small text-secondary">
                  {z.type}:
                </span>{" "}
                {z.value}
              </li>
            ))}
          <li className="text-truncate">
            <a
              role="button"
              data-bs-dismiss="modal"
              onClick={() =>
                router.push(
                  `/zombies/${encodeURIComponent(name.toLowerCase())}`
                )
              }
              className="link-light fst-italic"
            >
              More...
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
