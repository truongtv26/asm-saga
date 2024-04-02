export interface IUser {
     id: number
     email: string
     password: string
     fullname: string
}

export interface IProduct {
     _id: {$oid: string}
     category: string
     img1: string
     img2?: string
     img3?: string
     img4?: string
     long_desc: string
     name: string
     price: number
     short_desc?: string
     quantity?: number
}
