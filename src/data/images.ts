import heroPhoto from '../assets/hero.jpg'
import heroPhotoMobile from '../assets/hero2.jpeg'

export const photo = (id: string, width = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`

export const face = (id: number) => `https://i.pravatar.cc/160?img=${id}`

export const images = {
  hero: heroPhoto,
  heroMobile: heroPhotoMobile,
  mechanic: photo('photo-1619642751034-765dfdf7c58e', 1400),
  camaro: photo('photo-1552519507-da3b142c6e3d', 1400),
  shop: photo('photo-1489824904134-891ab64532f1', 1600),
  garage: photo('photo-1486262715619-67b85e0b08d3', 1800),
  desert: photo('photo-1469854523086-cc02fe5d8800', 1600),
  before: photo('photo-1441148345475-03a2e82f9719', 1600),
  after: photo('photo-1494905998402-395d579af36f', 1600),
  routine: photo('photo-1549317661-bd32c8ce0db2', 1200),
  bronco: photo('photo-1533473359331-0135ef1b58bf', 1200),
  classic: photo('photo-1494976388531-d1058494cdd8', 1200),
}
