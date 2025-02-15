import { SystemInfo } from '../types';

export const systems: SystemInfo[] = [
  {
    id: 'nervous',
    name: 'Nervous System',
    description: 'The nervous system is a complex network that controls all bodily functions through electrical signals.',
    color: '#00fff2',
    facts: [
      'The brain contains about 86 billion neurons',
      'Neurons can transmit signals at speeds up to 268 mph',
      'The nervous system includes the brain, spinal cord, and nerves'
    ]
  },
  {
    id: 'circulatory',
    name: 'Circulatory System',
    description: 'The circulatory system moves blood, nutrients, and oxygen throughout the body.',
    color: '#ff0066',
    facts: [
      'The heart beats about 100,000 times per day',
      'Blood vessels would stretch 60,000 miles if laid end to end',
      'The heart pumps about 2,000 gallons of blood each day'
    ]
  },
  {
    id: 'muscular',
    name: 'Muscular System',
    description: 'The muscular system enables movement and maintains posture through contraction and relaxation.',
    color: '#ff9900',
    facts: [
      'There are over 600 muscles in the human body',
      'Muscles make up about 40% of total body weight',
      'The strongest muscle is the masseter (jaw muscle)'
    ]
  },
  {
    id: 'skeletal',
    name: 'Skeletal System',
    description: 'The skeletal system provides structure, protection, and enables movement through joints and attachments.',
    color: '#ffffff',
    facts: [
      'The adult human body has 206 bones',
      'The smallest bone is in the middle ear',
      'Bones are stronger than steel, pound for pound'
    ]
  }
];