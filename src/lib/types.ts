export type Category = 'mens'|'womens'|'accessories'
export type Collection = 'new'|'sale'|'featured'
export interface Product{
  id:string; title:string; price:number; image:string;
  category:Category; collections?:Collection[]; tags?:string[]; description?:string;
}