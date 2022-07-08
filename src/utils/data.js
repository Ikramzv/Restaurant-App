import I1 from "../components/images/i1.png";
import F1 from "../components/images/f1.png";
import C3 from "../components/images/c3.png";
import Fi1 from "../components/images/fi1.png";

export const heroData = [
  {
    id: 1 , name: 'IceCream', desc: 'Chocolate & vanilla', price: [ '$' ,'5.25'], imageSrc: I1 
  },
  {
    id: 2 , name: 'Strawberries', desc: 'Fresh Strawberries', price: [ '$' ,'10.25'] , imageSrc: F1
  },
  {
    id: 3 , name: 'Chicken Kebab', desc: 'Mixed Kebab Plate', price: [ '$' ,'8.25'], imageSrc: C3 
  },
  {
    id: 4 , name: 'Fish Kebab', desc: 'Mixed Fish Kebab', price: [ '$' ,'5.25' ], imageSrc: Fi1
  },
]

export const categories = [
  {
    id: 1,
    name: 'Chicken',
    urlParamName: 'chicken',
  },
  {
    id: 2,
    name: 'Curry',
    urlParamName: 'curry',
  },
  {
    id: 3,
    name: 'Rice',
    urlParamName: 'rice',
  },
  {
    id: 4,
    name: 'Fish',
    urlParamName: 'fish',
  },
  {
    id: 5,
    name: 'Fruits',
    urlParamName: 'fruits',
  },
  {
    id: 6,
    name: 'Ice-creams',
    urlParamName: 'icecreams',
  },
  {
    id: 7,
    name: 'Soft Drinks',
    urlParamName: 'drinks',
  },
]