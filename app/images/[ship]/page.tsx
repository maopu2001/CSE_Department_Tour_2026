import ImageCard from "@/components/ImageCard";
import { use } from "react";

const imageBaseUrl = (process.env.NEXT_PUBLIC_IMAGE_BASE_URL as string) || "";

type Props = {
  params: Promise<{ ship: "first" | "second" }>;
};

const Data = {
  first: {
    title: "Ship - First Choice",
    description: "This is the first choice ship.",
    noOfImages: 17,
  },
  second: {
    title: "Ship - Second Choice",
    description: "This is the second choice ship.",
    noOfImages: 26,
  },
  food: {
    title: "Probable Food Menu",
    noOfImages: 2,
  },
};

export default function ShipImage({ params }: Props) {
  const { ship } = use(params);

  if (ship !== "first" && ship !== "second" && ship !== "food") {
    return null;
  }

  return (
    <div className="w-9/10 mx-auto">
      <h1 className="my-2 text-center font-semibold text-3xl">
        {Data[ship].title}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Data[ship].noOfImages > 1 &&
          Array.from({ length: Data[ship].noOfImages }, (_, i) => (
            <ImageCard
              key={i}
              href={`${imageBaseUrl}/${ship}/${i + 1}.webp`}
              fallbackSrc={`/${ship}/${i + 1}.webp`}
              alt={`${i + 1}`}
            />
          ))}
      </div>
    </div>
  );
}
