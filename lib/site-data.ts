export const galleryCards = [
  { id: 'love', icon: '❤️', title: 'Love', product: '/images/couple.webp', color: '#F5F0E8', copy: 'Warm ballroom light for vows, anniversaries, and first dances.' },
  { id: 'milestones', icon: '🎓', title: 'Milestones', product: '/images/graduation.webp', color: '#E8F1F5', copy: 'Cool mist, polished concrete, and the proof that you could.' },
  { id: 'firsts', icon: '🏍️', title: 'Firsts', product: '/images/motorcycle.webp', color: '#1A1A1A', copy: 'Dark garage energy for the machines that made you feel free.' },
  { id: 'family', icon: '👨‍👩‍👧', title: 'Family', product: '/images/family.webp', color: '#FDFBF7', copy: 'Soft sunlight and quiet rooms for the people who made it matter.' },
  { id: 'companions', icon: '🐾', title: 'Companions', product: '/images/companion.webp', color: '#F5F0E8', copy: 'Tiny pawprints, warm floors, and portraits of loyal friends.' },
  { id: 'imagination', icon: '✨', title: 'Imagination', product: '/images/spiderman.webp', color: '#111B3D', copy: 'Nebula light, marble pedestals, and icons you can hold.' },
] as const;

export const storyStages = [
  { title: 'Love', text: 'Remember the first time your heart raced?', image: '/images/couple.webp', color: '#D4A373', enter: 'scale' },
  { title: 'Achievement', text: 'Remember the first moment you realized you could?', image: '/images/graduation.webp', color: '#1D3557', enter: 'up' },
  { title: 'Firsts', text: 'Remember the first thing that made you feel free?', image: '/images/motorcycle.webp', color: '#E8A87C', enter: 'left' },
  { title: 'Family', text: 'Remember the people who made the moment matter?', image: '/images/family.webp', color: '#F5F0E8', enter: 'zoom' },
] as const;

export const worldStyles = {
  love: {
    background: 'radial-gradient(circle at 50% 30%, #F5F0E8 0%, #E3D6C8 100%)',
    texture: 'linear-gradient(90deg, rgba(74,64,48,.08) 1px, transparent 1px)',
    text: '#4A4030',
    headline: 'A warm, golden ballroom for the day time stopped.',
    description: 'The Vows, the Wooden Clock, and the First Dance cross-dissolve like photographs being remembered.',
    tabs: ['The Vows', 'The Wooden Clock', 'First Dance'],
    price: 8500,
  },
  milestones: {
    background: 'linear-gradient(135deg, #E8F1F5 0%, #B0C4DE 100%)',
    texture: 'linear-gradient(135deg, rgba(29,53,87,.12) 1px, transparent 1px)',
    text: '#1D3557',
    headline: 'A clean gallery for achievement, relief, and becoming.',
    description: 'Graduation caps, plaques, and framed tiny victories sit in cool blue studio light.',
    tabs: ['Graduation', 'Promotion', 'First Win'],
    price: 7500,
  },
  firsts: {
    background: 'radial-gradient(circle at 50% 50%, #2A2A2A 0%, #0A0A0A 100%)',
    texture: 'linear-gradient(90deg, rgba(255,107,53,.16) 1px, transparent 1px)',
    text: '#FFFFFF',
    headline: 'Legends you can hold. Icons you can own.',
    description: 'A charcoal garage with engine-glow sparks, steel texture, and sweeping neon beams.',
    tabs: ['Motorcycle', 'First Car', 'Garage Icon'],
    price: 9500,
  },
  family: {
    background: 'radial-gradient(circle at 50% 50%, #FDFBF7 0%, #E8DFD3 100%)',
    texture: 'radial-gradient(circle, rgba(212,163,115,.18) 1px, transparent 1px)',
    text: '#4A4030',
    headline: 'The people who made the moment matter.',
    description: 'Soft carpets, warm sand motes, and sunlight for portraits that feel held, not displayed.',
    tabs: ['Parents', 'Eid Portrait', 'Generations'],
    price: 10500,
  },
  companions: {
    background: 'radial-gradient(circle at 50% 40%, #F5F0E8 0%, #D9C8B4 100%)',
    texture: 'radial-gradient(circle, rgba(74,64,48,.12) 1px, transparent 1px)',
    text: '#4A4030',
    headline: 'For loyal friends, soft paws, and little shadows.',
    description: 'A gentle floor-level portrait world for pets and the companions who never asked for anything.',
    tabs: ['Paw Portrait', 'With Family', 'Memorial'],
    price: 6500,
  },
  imagination: {
    background: 'radial-gradient(circle at 50% 50%, #1A1A40 0%, #0A0A1A 100%)',
    texture: 'radial-gradient(circle, rgba(138,43,226,.20) 1px, transparent 1px)',
    text: '#FFFFFF',
    headline: 'A deep nebula for heroes, symbols, and impossible scenes.',
    description: 'Purple and gold energy arcs around a floating marble base for collectibles with mythic presence.',
    tabs: ['Hero Pose', 'Fantasy Scene', 'Iconic Collection'],
    price: 9000,
  },
} as const;

export const configuratorDefaults = {
  basePrice: 8500,
  grandPrice: 11500,
  addOns: { extraPerson: 1500, engraving: 500, displayCase: 1500 },
  layers: [
    { key: 'base', label: 'Base silhouette', src: '/images/layers/base.webp' },
    { key: 'skin', label: 'Skin tone overlay', src: '/images/layers/skin-warm.webp' },
    { key: 'outfit', label: 'Outfit overlay', src: '/images/layers/outfit-gold.webp' },
    { key: 'accessory', label: 'Accessory overlay', src: '/images/layers/bouquet.webp' },
    { key: 'pedestal', label: 'Pedestal overlay', src: '/images/layers/pedestal-wood.webp' },
  ],
};
