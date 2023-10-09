import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const images = [
  "https://fastly.picsum.photos/id/231/4088/2715.jpg?hmac=PxhkmiNJrVS5AgI8U-r_IsWSN5a7cTjpjIbvmtpLMDI",
  "https://fastly.picsum.photos/id/287/4288/2848.jpg?hmac=f_-W7-bOKUxLoH9uOz4Hwk9D8zYTgzbHX7i_vY_ljug",
  "https://fastly.picsum.photos/id/301/4752/3168.jpg?hmac=dIrKsPA8tl4UMnxGn-DOdnez3VS9mISb4_dYwLRnRps",
  "https://fastly.picsum.photos/id/179/2048/1365.jpg?hmac=GJyDjrvfBfjPfJPqSBd2pX6sjvsGbG10d21blr5bTS8",
  "https://fastly.picsum.photos/id/243/2300/1533.jpg?hmac=BnvN5jcWjSaFHq5vJoJjJltaTOWalVdYo2iR6-s03bI",
  "https://fastly.picsum.photos/id/406/4134/2738.jpg?hmac=aOoa9MInsnXj-oD4Q2cypCwUg53rAbmmaap3i4ykDio",
  "https://fastly.picsum.photos/id/404/3264/2176.jpg?hmac=3lDeBx5WYEse6sijzGfqsQniZqTpFmfFlDnBC3cXzao",
  "https://fastly.picsum.photos/id/353/5000/2806.jpg?hmac=QvrRaGlMinnGfuGM-yhcEwdMbIM3MXXyo0dC7PqqGc0",
  "https://fastly.picsum.photos/id/343/2304/1536.jpg?hmac=3NDuNow_H5cP8si2ejcQrSGeHCwKclLm-RUeOXnn88Q",
  "https://fastly.picsum.photos/id/339/4752/3168.jpg?hmac=U_eb-zX4p02iRWKyDTGjkCUj6w42cRGinkHolnqPfuc",
  "https://fastly.picsum.photos/id/328/3264/2448.jpg?hmac=rR8AM7aOiJkj7PHfKTv_1H0_2Mmi2tYEuXvKR1S0wNU",
];

const Home = () => {
  const generateHero = () => {
    return images[Math.floor(Math.random() * images.length)];
  };

  const [bgImage, setBgImage] = useState(generateHero());
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      let newBgImage;
      do {
        newBgImage = generateHero(images);
      } while (newBgImage === bgImage); // Ensure the new image is different

      setBgImage(newBgImage);
      setFadeIn(false); // Start the fade-out animation
      setTimeout(() => {
        setFadeIn(true); // Start the fade-in animation
      }, 700); // Delay for the fade-out effect
    }, 8000); // Change the image every 5 seconds (5000 milliseconds)

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, [images, bgImage]);

  return (
    <div
      className={`flex flex-row items-center justify-start min-h-screen bg-hero-image bg-cover bg-center md:bg-none text-white md:text-neutral-800`}
    >
      <div className="flex gap-10 flex-col text-left justify-center items-center p-4 justify-self-center w-full md:w-2/4">
        <p className="text-5xl md:text-4xl lg:text-5xl font-semibold w-4/5">
          Welcome to the Gallery
        </p>

        <p className="w-4/5 font-light">
          Hello and welcome to my gallery. I've created this space using React
          and Tailwind CSS. You'll find a variety of images here, all sourced
          from a foreign API. I invite you to explore this collection and
          appreciate the beauty of photography with me.
        </p>

        <div className="font-extralight md:font-normal w-4/5 border-t">
          <p className="mt-5">Yasir Raees Khan</p>
        </div>

        <Link
          to={"list"}
          className="rounded-full hover:text-white hover:bg-black border border-white md:border-black md:border-opacity-20 transition px-7 py-3 text-sm"
        >
          Explore
        </Link>
      </div>

      <div
        className={`min-h-screen bg-cover bg-center w-full md:block hidden ${
          fadeIn ? "opacity-100 transition-opacity duration-500" : "opacity-0"
        }`}
        style={{
          objectFit: "fill",
          backgroundImage: `url(${bgImage})`,
        }}
      />
    </div>
  );
};

export default Home;
