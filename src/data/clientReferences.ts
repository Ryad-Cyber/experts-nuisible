export type ClientReference = {
  id: string;
  name: string;
  logo: string;
};

export const CLIENT_REFERENCES: ClientReference[] = [
  {
    id: "paprec",
    name: "Paprec",
    logo: "/paprec.jpg",
  },
  {
    id: "cesap",
    name: "Cesap",
    logo: "/cesap.png",
  },
];