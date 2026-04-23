import ImageCard from "@/components/ImageCard";

const imageBaseUrl = (process.env.NEXT_PUBLIC_IMAGE_BASE_URL as string) || "";

const Data = {
  ship: {
    title: "Tour Ship",
    description: "This is the ship, which we will be using for the tour.",
    name: "MV Jol Safari",
    noOfImages: 20,
  },
  food: {
    title: "Food Menu",
    description:
      "Here are some of the delicious dishes that will be served on the ship.",
    src: "/others/food.webp",
  },
  floors: {
    title: "Ship's Floor Design",
    description: "Here are the floor plans for each deck.",
    src: "/others/floors.webp",
  },
};

export default function ShipImage() {
  const ship = Data["ship"];
  const food = Data["food"];
  const floors = Data["floors"];

  return (
    <main className="w-9/10 mx-auto space-y-8">
      {/* Ship */}
      <section>
        <h1 className="mt-4 text-center font-semibold text-3xl">
          {ship.title}
        </h1>
        <p className="text-center my-2">{ship.description}</p>
        <p className="text-center mb-4 text-lg font-semibold">
          Ship&apos;s Name: {ship.name}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ship.noOfImages > 1 &&
            Array.from({ length: ship.noOfImages }, (_, i) => (
              <ImageCard
                key={i}
                href={`${imageBaseUrl}/ship/${i + 1}.webp`}
                fallbackSrc={`/ship/${i + 1}.webp`}
                alt={`${i + 1}`}
              />
            ))}
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-4">
        {/* Food Menu */}
        <div>
          <h1 className="mt-4 text-center font-semibold text-3xl">
            {food.title}
          </h1>
          <p className="text-center my-2 h-15">{food.description}</p>
          <ImageCard
            className="flex"
            href={imageBaseUrl + food.src}
            fallbackSrc={food.src}
            alt={food.title}
          />
        </div>

        {/* Floors */}
        <div>
          <h1 className="mt-4 text-center font-semibold text-3xl">
            {floors.title}
          </h1>
          <p className="text-center my-2 h-15">{floors.description}</p>
          <ImageCard
            className="flex"
            href={imageBaseUrl + floors.src}
            fallbackSrc={floors.src}
            alt={floors.title}
          />
        </div>
      </section>
    </main>
  );
}
