export type ProjectFilter = 'all' | 'web' | 'ai' | 'game';

export type Category = Exclude<ProjectFilter, 'all'>;
