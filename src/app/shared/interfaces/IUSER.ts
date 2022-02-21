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
  sex: string

}
