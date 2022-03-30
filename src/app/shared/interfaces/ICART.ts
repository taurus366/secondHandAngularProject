export interface ICART {

      id: number,
      type: string,
      brand: string,
      size: string,
      sex: string,
      color: string,
      season: string,
      composition: string,
      description: string,
      startPrice: number,
      newPrice: number,
      likes: number,
      sidePictures: [
        {
          url: string,
          publicId: string
        },
        {
          url: string,
          publicId: string
        }
      ],
      coverPicture: {
        url: string,
        publicId: string
      },
      frontPicture: {
        url: string,
        publicId: string
      },
      quantity: number

}
