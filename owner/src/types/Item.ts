export interface ItemInfo{
    image: string[]
    price: number
    description: string
    name: string
    venue_id: string
    
}


export interface Item{
    _id?: string
    image: string[]
    venue_id: string
    price: number
    description: string
    name: string
    items?: string[]
    status?: string
    //itemInfo?: ItemInfo
}