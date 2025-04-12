
import React from 'react';
import { Award, BookOpen, Brain, Sparkle, Trophy } from 'lucide-react';

type BadgeType = 'quiz-master' | 'knowledge-seeker' | 'quick-learner' | 'master-mentor' | 'study-champion';

interface BadgeDisplayProps {
  type: BadgeType;
  size?: 'small' | 'medium' | 'large';
}

const BadgeDisplay: React.FC<BadgeDisplayProps> = ({ type, size = 'medium' }) => {
  // Badge configuration
  const badges = {
    'quiz-master': {
      color: 'bg-badge-master',
      icon: <Trophy className={`${size === 'small' ? 'h-3 w-3' : size === 'large' ? 'h-6 w-6' : 'h-4 w-4'}`} />,
      label: 'Quiz Master',
      description: 'Scored 90% or higher on a quiz'
    },
    'knowledge-seeker': {
      color: 'bg-badge-advanced',
      icon: <Brain className={`${size === 'small' ? 'h-3 w-3' : size === 'large' ? 'h-6 w-6' : 'h-4 w-4'}`} />,
      label: 'Knowledge Seeker',
      description: 'Scored 70% or higher on a quiz'
    },
    'quick-learner': {
      color: 'bg-badge-beginner',
      icon: <Sparkle className={`${size === 'small' ? 'h-3 w-3' : size === 'large' ? 'h-6 w-6' : 'h-4 w-4'}`} />,
      label: 'Quick Learner',
      description: 'Scored 50% or higher on a quiz'
    },
    'master-mentor': {
      color: 'bg-study-secondary',
      icon: <BookOpen className={`${size === 'small' ? 'h-3 w-3' : size === 'large' ? 'h-6 w-6' : 'h-4 w-4'}`} />,
      label: 'Master Mentor',
      description: 'Completed 10 sessions with AI mentor'
    },
    'study-champion': {
      color: 'bg-study-primary',
      icon: <Award className={`${size === 'small' ? 'h-3 w-3' : size === 'large' ? 'h-6 w-6' : 'h-4 w-4'}`} />,
      label: 'Study Champion',
      description: 'Created 5+ flashcard sets'
    }
  };

  const badge = badges[type];
  
  // Size classes
  const sizeClasses = {
    small: {
      container: 'w-8 h-8',
      text: 'text-xs'
    },
    medium: {
      container: 'w-12 h-12',
      text: 'text-sm'
    },
    large: {
      container: 'w-16 h-16',
      text: 'text-base'
    }
  };
  
  return (
    <div className="flex flex-col items-center">
      <div className={`${badge.color} ${sizeClasses[size].container} rounded-full flex items-center justify-center text-white shadow-md mb-2`}>
        {badge.icon}
      </div>
      <span className={`font-medium ${sizeClasses[size].text} text-center`}>{badge.label}</span>
      {size === 'large' && (
        <span className="text-xs text-muted-foreground text-center mt-1">{badge.description}</span>
      )}
    </div>
  );
};

export default BadgeDisplay;
