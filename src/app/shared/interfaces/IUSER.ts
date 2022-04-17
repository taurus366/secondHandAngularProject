export interface IUSER {

  id: number,
  firstName: string,
  lastName: string,
  email: string,
  roles: [
    {
      id: number,
      role: string
    }
  ],
  sex: string,
  phoneNumber: string,
  addresses: [
    {
      apartment: string
      block: string
      city: string
      detailsAboutAddress: string
      entry: string
      firstName: string
      floor: string
      id: number
      lastName: string
      municipality: string
      neighborhood: string
      phoneNumber: string
      street: string
      streetNumber: string
      zip: string
    }
  ]

}
