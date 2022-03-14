export interface ICLOTHES {

  content: [
    {
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
      }
    }
  ]
  ,
  pageable: {
    sort: {
      empty: false,
      sorted: true,
      unsorted: false
    },
    offset: number,
    pageNumber: number,
    pageSize: number,
    paged: boolean,
    unpaged: boolean
  },
  last: boolean,
  totalPages: number,
  totalElements: number,
  size: number,
  number: number,
  sort: {
    empty: boolean,
    sorted: boolean,
    unsorted: boolean
  },
  first: boolean,
  numberOfElements: number,
  empty: boolean

}

