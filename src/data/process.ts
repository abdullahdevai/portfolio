export interface ProcessStep {
  id: number
  title: string
  description: string
}

export const processSteps: ProcessStep[] = [
  { id: 1, title: 'Discover', description: 'Understand the requirements, users and constraints before anything is designed.' },
  { id: 2, title: 'Design', description: 'Plan the UI and user experience — structure, flows, interaction and motion.' },
  { id: 3, title: 'Build', description: 'Develop the application with clean, reusable components and a performance budget.' },
  { id: 4, title: 'Launch', description: 'Test, optimise and deploy — then iterate with real usage data.' },
]
