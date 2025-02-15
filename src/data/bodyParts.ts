import { BodyPart } from '../types';

export const bodyParts: Record<string, BodyPart[]> = {
  nervous: [
    {
      id: 'brain',
      name: 'Brain',
      description: 'The control center of the nervous system, responsible for thoughts, emotions, and bodily functions.',
      system: 'nervous',
      position: [0, 1.6, 0],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
      functions: [
        'Processing sensory information',
        'Controlling voluntary movement',
        'Regulating body temperature',
        'Managing sleep cycles'
      ],
      conditions: [
        {
          name: 'Migraine',
          description: 'A neurological condition causing severe headaches and other symptoms.',
          symptoms: ['Intense headache', 'Visual disturbances', 'Nausea', 'Sensitivity to light'],
          treatments: ['Medications', 'Lifestyle changes', 'Stress management']
        }
      ],
      children: [
        {
          id: 'cerebrum',
          name: 'Cerebrum',
          description: 'The largest part of the brain, responsible for higher-order thinking.',
          system: 'nervous',
          position: [0, 1.7, 0],
          rotation: [0, 0, 0],
          scale: [0.8, 0.8, 0.8]
        }
      ]
    }
  ],
  circulatory: [
    {
      id: 'heart',
      name: 'Heart',
      description: 'A muscular organ that pumps blood throughout the body.',
      system: 'circulatory',
      position: [0, 0.2, 0],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
      functions: [
        'Pumping blood',
        'Maintaining blood pressure',
        'Distributing oxygen',
        'Removing waste products'
      ],
      conditions: [
        {
          name: 'Hypertension',
          description: 'High blood pressure that can damage blood vessels and organs.',
          symptoms: ['Headaches', 'Shortness of breath', 'Chest pain'],
          treatments: ['Medications', 'Diet changes', 'Exercise']
        }
      ]
    }
  ]
};