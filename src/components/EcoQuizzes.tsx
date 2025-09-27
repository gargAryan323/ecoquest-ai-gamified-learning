import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  Clock, 
  Trophy, 
  CheckCircle, 
  XCircle, 
  Zap,
  Star,
  Play,
  RotateCcw,
  BookOpen,
  Target
} from 'lucide-react';

interface Quiz {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  duration: string;
  points: number;
  questions: Question[];
  category: string;
}

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const sampleQuizzes: Quiz[] = [
  {
    id: '1',
    title: 'Climate Change Fundamentals',
    description: 'Test your knowledge about global warming, greenhouse gases, and climate impacts.',
    difficulty: 'Easy',
    duration: '5 mins',
    points: 150,
    category: 'Climate Science',
    questions: [
      {
        id: '1',
        question: 'Which gas contributes most to global warming?',
        options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Argon'],
        correctAnswer: 1,
        explanation: 'Carbon dioxide is the primary greenhouse gas responsible for global warming.'
      },
      {
        id: '2',
        question: 'What causes sea level rise?',
        options: ['Ocean currents', 'Thermal expansion and melting ice', 'Wind patterns', 'Moon phases'],
        correctAnswer: 1,
        explanation: 'Sea level rises due to thermal expansion of warming oceans and melting ice sheets.'
      }
    ]
  },
  {
    id: '2',
    title: 'Renewable Energy Quiz',
    description: 'Explore different types of renewable energy sources and their applications.',
    difficulty: 'Medium',
    duration: '8 mins',
    points: 250,
    category: 'Clean Energy',
    questions: [
      {
        id: '1',
        question: 'Which renewable energy source is most abundant globally?',
        options: ['Wind', 'Solar', 'Hydro', 'Geothermal'],
        correctAnswer: 1,
        explanation: 'Solar energy is the most abundant renewable energy source available on Earth.'
      }
    ]
  },
  {
    id: '3',
    title: 'Biodiversity Challenge',
    description: 'Advanced questions about ecosystems, species conservation, and biodiversity hotspots.',
    difficulty: 'Hard',
    duration: '12 mins',
    points: 400,
    category: 'Ecology',
    questions: [
      {
        id: '1',
        question: 'Which region has the highest biodiversity in India?',
        options: ['Western Ghats', 'Himalayas', 'Desert regions', 'Coastal plains'],
        correctAnswer: 0,
        explanation: 'The Western Ghats are one of the worlds biodiversity hotspots with incredible species richness.'
      }
    ]
  }
];

const QuizCard = ({ quiz, onStart }: { quiz: Quiz; onStart: (quiz: Quiz) => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.02, y: -5 }}
    className="group cursor-pointer"
  >
    <Card className="p-6 h-full bg-gradient-to-br from-card to-muted border-0 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${
            quiz.difficulty === 'Easy' ? 'bg-eco-nature' : 
            quiz.difficulty === 'Medium' ? 'bg-eco-earth' : 'bg-eco-secondary'
          } animate-pulse-eco`} />
          <span className="text-sm font-medium text-muted-foreground">{quiz.category}</span>
        </div>
        <div className="flex items-center space-x-1 text-primary font-bold">
          <Zap className="w-4 h-4" />
          <span>{quiz.points}</span>
        </div>
      </div>

      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
        {quiz.title}
      </h3>
      
      <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
        {quiz.description}
      </p>

      <div className="flex items-center justify-between text-sm mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{quiz.duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-eco-earth" />
            <span className="text-muted-foreground">{quiz.difficulty}</span>
          </div>
        </div>
      </div>

      <Button 
        onClick={() => onStart(quiz)}
        className="w-full bg-eco-gradient hover:opacity-90 text-white group-hover:shadow-lg"
      >
        <Play className="w-4 h-4 mr-2" />
        Start Quiz
      </Button>
    </Card>
  </motion.div>
);

const QuizPlayer = ({ quiz, onComplete }: { quiz: Quiz; onComplete: (score: number) => void }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer === quiz.questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    
    if (currentQuestion === quiz.questions.length - 1) {
      setIsComplete(true);
      onComplete(score + (selectedAnswer === quiz.questions[currentQuestion].correctAnswer ? 1 : 0));
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;
  const question = quiz.questions[currentQuestion];

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="p-8 bg-gradient-to-br from-card to-muted border-0 shadow-xl">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gradient-eco">{quiz.title}</h2>
            <div className="flex items-center space-x-2 text-primary font-bold">
              <Trophy className="w-5 h-5" />
              <span>{quiz.points} points</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Question {currentQuestion + 1} of {quiz.questions.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-foreground mb-6">
            {question.question}
          </h3>

          <div className="grid gap-3">
            {question.options.map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswerSelect(index)}
                className={`p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                  selectedAnswer === index
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border hover:border-primary/50 bg-background'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedAnswer === index
                      ? 'border-primary bg-primary text-white'
                      : 'border-muted-foreground'
                  }`}>
                    <span className="text-sm font-medium">
                      {String.fromCharCode(65 + index)}
                    </span>
                  </div>
                  <span className="font-medium">{option}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 p-4 bg-eco-primary/10 rounded-lg border border-eco-primary/20"
            >
              <div className="flex items-start space-x-3">
                {selectedAnswer === question.correctAnswer ? (
                  <CheckCircle className="w-5 h-5 text-eco-nature mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 text-destructive mt-0.5" />
                )}
                <div>
                  <p className="font-medium text-foreground mb-1">
                    {selectedAnswer === question.correctAnswer ? 'Correct!' : 'Incorrect'}
                  </p>
                  <p className="text-sm text-muted-foreground">{question.explanation}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setShowExplanation(!showExplanation)}
            disabled={selectedAnswer === null}
          >
            <BookOpen className="w-4 h-4 mr-2" />
            {showExplanation ? 'Hide' : 'Show'} Explanation
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={selectedAnswer === null}
            className="bg-eco-gradient hover:opacity-90 text-white"
          >
            {currentQuestion === quiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default function EcoQuizzes() {
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [quizComplete, setQuizComplete] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const handleStartQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setQuizComplete(false);
    setFinalScore(0);
  };

  const handleQuizComplete = (score: number) => {
    setFinalScore(score);
    setQuizComplete(true);
  };

  const handleReturnToQuizzes = () => {
    setSelectedQuiz(null);
    setQuizComplete(false);
    setFinalScore(0);
  };

  if (selectedQuiz && !quizComplete) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <Button
            variant="outline"
            onClick={handleReturnToQuizzes}
            className="mb-8"
          >
            ← Back to Quizzes
          </Button>
          <QuizPlayer quiz={selectedQuiz} onComplete={handleQuizComplete} />
        </div>
      </section>
    );
  }

  if (quizComplete && selectedQuiz) {
    const percentage = (finalScore / selectedQuiz.questions.length) * 100;
    const earnedPoints = Math.round((percentage / 100) * selectedQuiz.points);

    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8"
            >
              <div className="w-24 h-24 bg-eco-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                <Trophy className="w-12 h-12 text-white" />
              </div>
              
              <h2 className="text-4xl font-bold text-gradient-eco mb-4">
                Quiz Complete!
              </h2>
              
              <p className="text-xl text-muted-foreground mb-8">
                You scored {finalScore} out of {selectedQuiz.questions.length} questions
              </p>

              <div className="bg-eco-gradient rounded-xl p-8 text-white mb-8">
                <div className="text-6xl font-bold mb-2">{Math.round(percentage)}%</div>
                <div className="text-lg opacity-90 mb-4">Success Rate</div>
                <div className="flex items-center justify-center space-x-2">
                  <Zap className="w-5 h-5" />
                  <span className="text-xl font-bold">+{earnedPoints} Eco Points</span>
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <Button
                  onClick={() => handleStartQuiz(selectedQuiz)}
                  variant="outline"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Retake Quiz
                </Button>
                <Button
                  onClick={handleReturnToQuizzes}
                  className="bg-eco-gradient hover:opacity-90 text-white"
                >
                  <Target className="w-4 h-4 mr-2" />
                  Try Another Quiz
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="quizzes" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center bg-primary/10 rounded-full px-4 py-2 text-primary text-sm font-medium mb-4">
            <Brain className="w-4 h-4 mr-2" />
            Interactive Learning Experience
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gradient-eco mb-6">
            Eco Knowledge Quizzes
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Test your environmental knowledge with our interactive quizzes. Earn eco-points, 
            unlock achievements, and track your learning progress across various topics.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleQuizzes.map((quiz, index) => (
            <motion.div
              key={quiz.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <QuizCard quiz={quiz} onStart={handleStartQuiz} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}