import ApiError from "../../errors/ApiError";
import { IBannerInterface } from "./banner.interface";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Create A Banner
// export const postBannerServices = async (): Promise<IBannerInterface | {}> => {
//   const createBanner: IBannerInterface | {} = await prisma.banner.create({
//     data: {
//       title: "Banner 1",
//       path: "image.jpg",
//       paths: {
//         url: "image.jpg",
//         alt: "Sample Banner",
//       },
//       pathssss: [
//         { url: "image1.jpg", alt: "Image 1" },
//         { url: "image2.jpg", alt: "Image 2" },
//       ],
//     },
//   });
//   return createBanner;
// };

export const postBannerServices = async (): Promise<IBannerInterface | {}> => {
    // throw new ApiError(400, "Admin Not Found !");
    // throw new Error("Admin Not Found !");
  await prisma.reTable.createMany({
    data: [{ name: "Reference A" }, { name: "Reference B" }],
  });
  const createBanner = await prisma.banner.create({
    data: {
        // id: 5,
    //   title: "Banner 1",
      path: "main.jpg",
      paths: {
        url: "main.jpg",
        alt: "Main Banner",
      },
      pathssss: {
        create: [
          {
            url: "image1.jpg",
            alt: "Image 1",
            ref_id: 1,
          },
          {
            url: "image2.jpg",
            alt: "Image 2",
            ref_id: 2,
          },
        ],
      },
    },
    include: {
      pathssss: true, // optional, if you want to return related images
    },
  });
  return createBanner;
};

// Find Banner
export const findAllBannerServices = async (): Promise<
  IBannerInterface[] | any
> => {
  const banners = await prisma.banner.findMany({
    include: {
      pathssss: {
        include: {
          reTable: true, // include related ReTable data
        },
      },
    },
  });

  return banners;
};
