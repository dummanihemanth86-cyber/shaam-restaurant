export type MenuItem = {
  id: string
  name: string
  category: string
  description: string
  image: string
  price: number | null
  singlePrice: number | null
  fullPrice: number | null
  isVeg: boolean
  isAvailable: boolean
  isFeatured: boolean
  priceVerified: boolean
}

type MenuInput = Omit<MenuItem, 'image'> & { image?: string }

const generatedImageOverrides: Record<string, string> = {
  'double-chicken-noodles': '/images/menu/double-chicken-noodles-ai.webp',
  'chicken-curry': '/images/menu/chicken-curry-ai.webp',
  'chicken-masala': '/images/menu/chicken-masala-ai.webp',
  'garlic-chicken': '/images/menu/garlic-chicken-ai.webp',
  'butter-chicken': '/images/menu/butter-chicken-ai.webp',
  'afghani-chicken': '/images/menu/afghani-chicken-ai.webp',
  'telangana-chicken': '/images/menu/telangana-chicken-ai.webp',
  'andhra-chicken': '/images/menu/andhra-chicken-ai.webp',
  'kadai-chicken': '/images/menu/kadai-chicken-ai.webp',
  'mathi-chicken': '/images/menu/mathi-chicken-ai.webp',
  'punjabi-chicken': '/images/menu/punjabi-chicken-ai.webp',
  'chicken-moghalai': '/images/menu/chicken-moghalai-ai.webp',
  'kali-mirchi-chicken': '/images/menu/kali-mirchi-chicken-ai.webp',
  'achari-murgh-chicken': '/images/menu/achari-murgh-chicken-ai.webp',
  'mutton-curry': '/images/menu/mutton-curry-ai.webp',
  'mutton-masala': '/images/menu/mutton-masala-ai.webp',
  'mutton-rogan-curry': '/images/menu/mutton-rogan-curry-ai.webp',
  'kadai-mutton': '/images/menu/kadai-mutton-ai.webp',
  'mutton-moghalai': '/images/menu/mutton-moghalai-ai.webp',
  'fish-curry': '/images/menu/fish-curry-ai.webp',
  'fish-masala': '/images/menu/fish-masala-ai.webp',
  'kadai-fish': '/images/menu/kadai-fish-ai.webp',
  'prawns-curry': '/images/menu/prawns-curry-ai.webp',
  'prawns-masala': '/images/menu/prawns-masala-ai.webp',
  'kadai-prawns': '/images/menu/kadai-prawns-ai.webp',
  'chicken-biryani': '/images/menu/chicken-biryani-ai.webp',
  'mutton-biryani': '/images/menu/mutton-biryani-ai.webp',
  'veg-biryani': '/images/menu/veg-biryani-ai.webp',
  'special-chicken-biryani': '/images/menu/special-chicken-biryani-ai.webp',
  'egg-biryani': '/images/menu/egg-biryani-ai.webp',
  'chicken-mandi': '/images/menu/chicken-mandi-ai.webp',
  'mutton-mandi': '/images/menu/mutton-mandi-ai.webp',
  'special-chicken-mandi': '/images/menu/special-chicken-mandi-ai.webp',
  'family-mandi': '/images/menu/family-mandi-ai.webp',
  'grilled-chicken-mandi': '/images/menu/grilled-chicken-mandi-ai.webp',
  'tandoori-chicken': '/images/menu/tandoori-chicken-ai.webp',
  'chicken-tikka': '/images/menu/chicken-tikka-ai.webp',
  'grilled-chicken': '/images/menu/grilled-chicken-ai.webp',
}

const item = (input: MenuInput): MenuItem => ({
  ...input,
  image: generatedImageOverrides[input.id] ?? input.image ?? `/images/menu/${input.id}.webp`,
})

// Page 1 menu entries and prices use the owner-provided corrections. Unknown prices stay null.
export const menuItems: MenuItem[] = [
  item({ id:'veg-manchuria', name:'Veg Manchuria', category:'Veg Starters', description:'A savoury vegetarian starter from the Shaam menu.', price:99, singlePrice:null, fullPrice:null, isVeg:true, isAvailable:true, isFeatured:true, priceVerified:true, image:'/images/menu/veg-manchuria-ai.webp' }),
  item({ id:'paneer-65', name:'Paneer 65', category:'Veg Starters', description:'A paneer starter, served Shaam style.', price:139, singlePrice:null, fullPrice:null, isVeg:true, isAvailable:true, isFeatured:false, priceVerified:true, image:'/images/menu/paneer-65-ai.webp' }),
  item({ id:'paneer-manchurian', name:'Paneer Manchuria', category:'Veg Starters', description:'A vegetarian favourite with paneer.', price:139, singlePrice:null, fullPrice:null, isVeg:true, isAvailable:true, isFeatured:false, priceVerified:true, image:'/images/menu/paneer-manchurian-ai.webp' }),
  item({ id:'chilli-paneer', name:'Chilli Paneer', category:'Veg Starters', description:'Paneer with a lively chilli flavour.', price:139, singlePrice:null, fullPrice:null, isVeg:true, isAvailable:true, isFeatured:false, priceVerified:true, image:'/images/menu/chilli-paneer-ai.webp' }),
  item({ id:'veg-spring-roll', name:'Veg Spring Roll', category:'Veg Starters', description:'A crisp vegetarian starter.', price:139, singlePrice:null, fullPrice:null, isVeg:true, isAvailable:true, isFeatured:false, priceVerified:true, image:'/images/menu/veg-spring-roll-ai.webp' }),
  item({ id:'ginger-veg-manchuria', name:'Ginger Veg Manchuria', category:'Veg Starters', description:'Veg Manchuria with ginger flavour.', price:139, singlePrice:null, fullPrice:null, isVeg:true, isAvailable:true, isFeatured:false, priceVerified:true, image:'/images/menu/ginger-veg-manchuria-ai.webp' }),

  item({ id:'chicken-hot-soup', name:'Chicken Hot & Soup', category:'Soups', description:'A warming chicken soup from the menu.', price:99, singlePrice:null, fullPrice:null, isVeg:false, isAvailable:true, isFeatured:false, priceVerified:true , image:'/images/menu/chicken-hot-soup-ai.webp' }),
  item({ id:'chicken-manchuria-soup', name:'Chicken Manchuria Soup', category:'Soups', description:'Chicken Manchuria served in a comforting soup.', price:99, singlePrice:null, fullPrice:null, isVeg:false, isAvailable:true, isFeatured:false, priceVerified:true , image:'/images/menu/chicken-manchuria-soup-ai.webp' }),
  item({ id:'chicken-noodles-soup', name:'Chicken Noodles Soup', category:'Soups', description:'A warming soup with chicken and noodles.', price:99, singlePrice:null, fullPrice:null, isVeg:false, isAvailable:true, isFeatured:false, priceVerified:true , image:'/images/menu/chicken-noodles-soup-ai.webp' }),
  item({ id:'veg-hot-soup', name:'Veg Hot & Soup', category:'Soups', description:'A warming vegetarian soup.', price:89, singlePrice:null, fullPrice:null, isVeg:true, isAvailable:true, isFeatured:false, priceVerified:true , image:'/images/menu/veg-hot-soup-ai.webp' }),

  item({ id:'veg-fried-rice', name:'Veg Fried Rice', category:'Fried Rice', description:'A vegetarian rice dish from the Shaam menu.', price:79, singlePrice:null, fullPrice:null, isVeg:true, isAvailable:true, isFeatured:false, priceVerified:true, image:'/images/menu/veg-fried-rice-ai.webp' }),
  item({ id:'schezwan-fried-rice', name:'Schezwan Fried Rice', category:'Fried Rice', description:'Fried rice with Schezwan flavour.', price:89, singlePrice:null, fullPrice:null, isVeg:true, isAvailable:true, isFeatured:false, priceVerified:true , image:'/images/menu/schezwan-fried-rice-ai.webp' }),
  item({ id:'paneer-fried-rice', name:'Paneer Fried Rice', category:'Fried Rice', description:'Fried rice with paneer.', price:99, singlePrice:null, fullPrice:null, isVeg:true, isAvailable:true, isFeatured:false, priceVerified:true , image:'/images/menu/paneer-fried-rice-ai.webp' }),
  item({ id:'mushroom-fried-rice', name:'Mushroom Fried Rice', category:'Fried Rice', description:'Fried rice with mushroom.', price:99, singlePrice:null, fullPrice:null, isVeg:true, isAvailable:true, isFeatured:false, priceVerified:true , image:'/images/menu/mushroom-fried-rice-ai.webp' }),
  item({ id:'jeera-rice', name:'Jeera Rice', category:'Fried Rice', description:'Rice seasoned with jeera.', price:89, singlePrice:null, fullPrice:null, isVeg:true, isAvailable:true, isFeatured:false, priceVerified:true , image:'/images/menu/jeera-rice-ai.webp' }),
  item({ id:'curd-rice', name:'Curd Rice', category:'Fried Rice', description:'A comforting rice and curd dish.', price:99, singlePrice:null, fullPrice:null, isVeg:true, isAvailable:true, isFeatured:false, priceVerified:true , image:'/images/menu/curd-rice-ai.webp' }),
  item({ id:'veg-pulav', name:'Veg Pulav', category:'Fried Rice', description:'A vegetarian rice dish.', price:99, singlePrice:null, fullPrice:null, isVeg:true, isAvailable:true, isFeatured:false, priceVerified:true , image:'/images/menu/veg-pulav-ai.webp' }),
  item({ id:'chicken-fried-rice', name:'Chicken Fried Rice', category:'Fried Rice', description:'A chicken rice dish from the Shaam menu.', price:99, singlePrice:null, fullPrice:null, isVeg:false, isAvailable:true, isFeatured:true, priceVerified:true, image:'/images/menu/chicken-fried-rice-ai.webp' }),
  item({ id:'double-egg-fried-rice', name:'Double Egg Fried Rice', category:'Fried Rice', description:'Fried rice with double egg.', price:109, singlePrice:null, fullPrice:null, isVeg:false, isAvailable:true, isFeatured:false, priceVerified:true , image:'/images/menu/double-egg-fried-rice-ai.webp' }),
  item({ id:'mix-fried-rice', name:'Mix Fried Rice', category:'Fried Rice', description:'A mixed fried rice from the Shaam menu.', price:129, singlePrice:null, fullPrice:null, isVeg:false, isAvailable:true, isFeatured:false, priceVerified:true , image:'/images/menu/mix-fried-rice-ai.webp' }),

  item({ id:'egg-65', name:'Egg 65', category:'Non-Veg Starters', description:'An egg starter from the Shaam menu.', price:149, singlePrice:null, fullPrice:null, isVeg:false, isAvailable:true, isFeatured:false, priceVerified:true , image:'/images/menu/egg-65-ai.webp' }),
  item({ id:'egg-manchuria', name:'Egg Manchuria', category:'Non-Veg Starters', description:'A savoury egg starter.', price:149, singlePrice:null, fullPrice:null, isVeg:false, isAvailable:true, isFeatured:false, priceVerified:true , image:'/images/menu/egg-manchuria-ai.webp' }),
  item({ id:'egg-fry', name:'Egg Fry', category:'Non-Veg Starters', description:'A simple egg starter.', price:149, singlePrice:null, fullPrice:null, isVeg:false, isAvailable:true, isFeatured:false, priceVerified:true , image:'/images/menu/egg-fry-ai.webp' }),
  item({ id:'egg-bujji', name:'Egg Bujji', category:'Non-Veg Starters', description:'A classic egg starter.', price:99, singlePrice:null, fullPrice:null, isVeg:false, isAvailable:true, isFeatured:false, priceVerified:true , image:'/images/menu/egg-bujji-ai.webp' }),
  item({ id:'apollo-fish', name:'Apollo Fish', category:'Non-Veg Starters', description:'A fish starter, available in single and full portions.', price:null, singlePrice:149, fullPrice:269, isVeg:false, isAvailable:true, isFeatured:false, priceVerified:true, image:'/images/menu/apollo-fish-ai.webp' }),
  item({ id:'chicken-fry', name:'Chicken Fry', category:'Non-Veg Starters', description:'A chicken starter, available in single and full portions.', price:null, singlePrice:149, fullPrice:269, isVeg:false, isAvailable:true, isFeatured:false, priceVerified:true , image:'/images/menu/chicken-fry-ai.webp' }),
  item({ id:'loose-prawns', name:'Loose Prawns', category:'Non-Veg Starters', description:'A prawn starter, available in single and full portions.', price:null, singlePrice:149, fullPrice:269, isVeg:false, isAvailable:true, isFeatured:false, priceVerified:true , image:'/images/menu/loose-prawns-ai.webp' }),
  item({ id:'chilli-prawns', name:'Chilli Prawns', category:'Non-Veg Starters', description:'A prawn starter with chilli flavour, single and full portions.', price:null, singlePrice:149, fullPrice:269, isVeg:false, isAvailable:true, isFeatured:false, priceVerified:true, image:'/images/menu/chilli-prawns-ai.webp' }),
  item({ id:'chicken-65', name:'Chicken 65', category:'Non-Veg Starters', description:'A chicken starter, available in single and full portions.', price:null, singlePrice:129, fullPrice:229, isVeg:false, isAvailable:true, isFeatured:true, priceVerified:true, image:'/images/menu/chicken-65-ai.webp' }),
  item({ id:'chicken-manchuria', name:'Chicken Manchuria', category:'Non-Veg Starters', description:'A chicken starter, available in single and full portions.', price:null, singlePrice:129, fullPrice:229, isVeg:false, isAvailable:true, isFeatured:false, priceVerified:true, image:'/images/menu/chicken-manchuria-ai.webp' }),
  item({ id:'chicken-lollipop', name:'Chicken Lollipop', category:'Non-Veg Starters', description:'A chicken starter, available in single and full portions.', price:null, singlePrice:129, fullPrice:229, isVeg:false, isAvailable:true, isFeatured:false, priceVerified:true, image:'/images/menu/chicken-lollipop-ai.webp' }),
  item({ id:'chicken-chilli', name:'Chicken Chilli', category:'Non-Veg Starters', description:'A chicken starter, available in single and full portions.', price:null, singlePrice:129, fullPrice:229, isVeg:false, isAvailable:true, isFeatured:false, priceVerified:true, image:'/images/menu/chicken-chilli-ai.webp' }),
  item({ id:'ginger-chicken', name:'Ginger Chicken', category:'Non-Veg Starters', description:'A chicken starter, available in single and full portions.', price:null, singlePrice:129, fullPrice:229, isVeg:false, isAvailable:true, isFeatured:false, priceVerified:true , image:'/images/menu/ginger-chicken-ai.webp' }),
  item({ id:'chicken-majestic', name:'Chicken Majestic', category:'Non-Veg Starters', description:'A chicken starter, available in single and full portions.', price:null, singlePrice:139, fullPrice:239, isVeg:false, isAvailable:true, isFeatured:false, priceVerified:true, image:'/images/menu/chicken-majestic-ai.webp' }),
  item({ id:'chicken-555', name:'Chicken 555', category:'Non-Veg Starters', description:'A chicken starter, available in single and full portions.', price:null, singlePrice:139, fullPrice:239, isVeg:false, isAvailable:true, isFeatured:false, priceVerified:true , image:'/images/menu/chicken-555-ai.webp' }),
  item({ id:'schezwan-chicken', name:'Schezwan Chicken', category:'Non-Veg Starters', description:'A chicken starter, available in single and full portions.', price:null, singlePrice:129, fullPrice:239, isVeg:false, isAvailable:true, isFeatured:false, priceVerified:true , image:'/images/menu/schezwan-chicken-ai.webp' }),
  item({ id:'kaju-chicken', name:'Kaju Chicken', category:'Non-Veg Starters', description:'A chicken starter, available in single and full portions.', price:null, singlePrice:129, fullPrice:239, isVeg:false, isAvailable:true, isFeatured:false, priceVerified:true , image:'/images/menu/kaju-chicken-ai.webp' }),
  item({ id:'mutton-fry', name:'Mutton Fry', category:'Non-Veg Starters', description:'A mutton starter, available in single and full portions.', price:null, singlePrice:129, fullPrice:239, isVeg:false, isAvailable:true, isFeatured:false, priceVerified:true , image:'/images/menu/mutton-fry-ai.webp' }),
  item({ id:'mutton-65', name:'Mutton 65', category:'Non-Veg Starters', description:'A mutton starter from the Shaam menu.', price:279, singlePrice:null, fullPrice:null, isVeg:false, isAvailable:true, isFeatured:false, priceVerified:true , image:'/images/menu/mutton-65-ai.webp' }),

  item({ id:'veg-soft-noodles', name:'Veg Soft Noodles', category:'Chinese', description:'A vegetarian noodles dish.', price:79, singlePrice:null, fullPrice:null, isVeg:true, isAvailable:true, isFeatured:false, priceVerified:true , image:'/images/menu/veg-soft-noodles-ai.webp' }),
  item({ id:'veg-schezwan-noodles', name:'Veg Schezwan Noodles', category:'Chinese', description:'Vegetarian noodles with Schezwan flavour.', price:89, singlePrice:null, fullPrice:null, isVeg:true, isAvailable:true, isFeatured:false, priceVerified:true , image:'/images/menu/veg-schezwan-noodles-ai.webp' }),
  item({ id:'egg-soft-noodles', name:'Egg Soft Noodles', category:'Chinese', description:'Soft noodles with egg.', price:89, singlePrice:null, fullPrice:null, isVeg:false, isAvailable:true, isFeatured:false, priceVerified:true , image:'/images/menu/egg-soft-noodles-ai.webp' }),
  item({ id:'double-egg-noodles', name:'Double Egg Soft Noodles', category:'Chinese', description:'Soft noodles with double egg.', price:99, singlePrice:null, fullPrice:null, isVeg:false, isAvailable:true, isFeatured:false, priceVerified:true , image:'/images/menu/double-egg-noodles-ai.webp' }),
  item({ id:'chicken-soft-noodles', name:'Chicken Soft Noodles', category:'Chinese', description:'Soft noodles with chicken.', price:99, singlePrice:null, fullPrice:null, isVeg:false, isAvailable:true, isFeatured:false, priceVerified:true, image:'/images/menu/chicken-soft-noodles-ai.webp' }),
  item({ id:'schezwan-chicken-noodles', name:'Schezwan Chicken Soft Noodles', category:'Chinese', description:'Chicken noodles with Schezwan flavour.', price:99, singlePrice:null, fullPrice:null, isVeg:false, isAvailable:true, isFeatured:false, priceVerified:true , image:'/images/menu/schezwan-chicken-noodles-ai.webp' }),
  item({ id:'double-chicken-noodles', name:'Double Chicken Noodles', category:'Chinese', description:'A chicken noodles dish.', price:109, singlePrice:null, fullPrice:null, isVeg:false, isAvailable:true, isFeatured:false, priceVerified:true }),

  ...[
    ['chicken-curry','Chicken Curry',129],['chicken-masala','Chicken Masala',139],['garlic-chicken','Garlic Chicken',139],['butter-chicken','Butter Chicken',139],['afghani-chicken','Afghani Chicken',139],['telangana-chicken','Telangana Chicken',139],['andhra-chicken','Andhra Chicken',139],['kadai-chicken','Kadai Chicken',139],['mathi-chicken','Mathi Chicken',139],['punjabi-chicken','Punjabi Chicken',139],['chicken-moghalai','Chicken Moghalai',139],['kali-mirchi-chicken','Kali Mirchi Chicken',139],['achari-murgh-chicken','Achari Murgh Chicken',139],
  ].map(([id,name,price]) => item({ id:String(id), name:String(name), category:'Chicken Curries', description:`${name} from the Shaam menu.`, price:Number(price), singlePrice:null, fullPrice:null, isVeg:false, isAvailable:true, isFeatured:false, priceVerified:true, ...(id==='butter-chicken'?{image:'/images/menu/butter-chicken.webp'}:{}) })),
  ...[
    ['mutton-curry','Mutton Curry',149],['mutton-masala','Mutton Masala',149],['mutton-rogan-curry','Mutton Rogan Curry',149],['kadai-mutton','Kadai Mutton',159],['mutton-moghalai','Mutton Moghalai',159],
  ].map(([id,name,price]) => item({ id:String(id), name:String(name), category:'Mutton Curries', description:`${name} from the Shaam menu.`, price:Number(price), singlePrice:null, fullPrice:null, isVeg:false, isAvailable:true, isFeatured:false, priceVerified:true })),
  ...[
    ['fish-curry','Fish Curry',149],['fish-masala','Fish Masala',149],['kadai-fish','Kadai Fish',159],['prawns-curry','Prawns Curry',149],['prawns-masala','Prawns Masala',149],['kadai-prawns','Kadai Prawns',159],
  ].map(([id,name,price]) => item({ id:String(id), name:String(name), category:'Fish Curries', description:`${name} from the Shaam menu.`, price:Number(price), singlePrice:null, fullPrice:null, isVeg:false, isAvailable:true, isFeatured:false, priceVerified:true })),

  ...[
    ['chicken-biryani','Chicken Biryani','non-veg'],['mutton-biryani','Mutton Biryani','non-veg'],['veg-biryani','Veg Biryani','veg'],['special-chicken-biryani','Special Chicken Biryani','non-veg'],['egg-biryani','Egg Biryani','non-veg'],
  ].map(([id,name,type]) => item({ id:String(id), name:String(name), category:'Biryani', description:'Call to confirm availability and price.', price:null, singlePrice:null, fullPrice:null, isVeg:type==='veg', isAvailable:true, isFeatured:false, priceVerified:false, image:id==='mutton-biryani'?'/images/menu/mutton-biryani-variant-2.webp':`/images/menu/${id}.webp` })),
  ...[
    ['chicken-mandi','Chicken Mandi','non-veg'],['mutton-mandi','Mutton Mandi','non-veg'],['special-chicken-mandi','Special Chicken Mandi','non-veg'],['family-mandi','Family Mandi','non-veg'],['grilled-chicken-mandi','Grilled Chicken Mandi','non-veg'],
  ].map(([id,name,type]) => item({ id:String(id), name:String(name), category:'Mandi', description:'Call to confirm availability and price.', price:null, singlePrice:null, fullPrice:null, isVeg:type==='veg', isAvailable:true, isFeatured:false, priceVerified:false, image:`/images/menu/${id}.webp` })),
  ...[
    ['tandoori-chicken','Tandoori Chicken'],['grilled-chicken','Grilled Chicken'],['chicken-tikka','Chicken Tikka'],
  ].map(([id,name]) => item({ id:String(id), name:String(name), category:'Tandoori', description:'Call to confirm availability and price.', price:null, singlePrice:null, fullPrice:null, isVeg:false, isAvailable:true, isFeatured:false, priceVerified:false, image:`/images/menu/${id}.webp` })),
]

export const categories = ['All','Biryani','Mandi','Veg Starters','Non-Veg Starters','Soups','Fried Rice','Chinese','Chicken Curries','Mutton Curries','Fish Curries','Tandoori']
