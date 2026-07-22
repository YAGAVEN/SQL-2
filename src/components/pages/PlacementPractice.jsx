import { useState } from 'react'
import { ChevronDown, ChevronUp, GraduationCap, Briefcase, Code, CheckCircle } from 'lucide-react'
import CodeBlock from '../animations/CodeBlock'

export default function PlacementPractice() {
  const [showAnswer, setShowAnswer] = useState({})

  const toggleAnswer = (questionId) => {
    setShowAnswer(prev => ({ ...prev, [questionId]: !prev[questionId] }))
  }

  const interviewQuestions = [
    {
      id: 1,
      category: 'Basics',
      question: "What is the difference between CHAR and VARCHAR?",
      answer: "CHAR is fixed-length (pads with spaces), VARCHAR is variable-length. CHAR(10) always uses 10 bytes, VARCHAR(10) uses only the bytes needed for the actual data plus length info."
    },
    {
      id: 2,
      category: 'Basics',
      question: "What is a NULL value in SQL?",
      answer: "NULL represents missing or unknown data, not zero or empty string. NULL is not equal to anything, even NULL itself. Use IS NULL/IS NOT NULL to check for NULL values."
    },
    {
      id: 3,
      category: 'Joins',
      question: "Explain different types of JOINs with examples.",
      answer: "INNER JOIN: only matching rows. LEFT JOIN: all left table rows, matches from right. RIGHT JOIN: all right table rows, matches from left. FULL OUTER JOIN: all rows from both tables."
    },
    {
      id: 4,
      category: 'Grouping',
      question: "Difference between WHERE and HAVING?",
      answer: "WHERE filters rows before GROUP BY, HAVING filters groups after aggregation. WHERE can't use aggregate functions, HAVING can."
    },
    {
      id: 5,
      category: 'Performance',
      question: "What are database indexes and how do they work?",
      answer: "Indexes are data structures that improve query speed. Like a book index, they allow quick lookups without scanning entire tables. Trade-offs: faster reads, slower writes, and extra storage."
    },
    {
      id: 6,
      category: 'Advanced',
      question: "Explain the difference between RANK(), DENSE_RANK(), and ROW_NUMBER().",
      answer: "ROW_NUMBER: always sequential (1,2,3,4). RANK: ties get same rank, gaps follow (1,2,2,4). DENSE_RANK: ties get same rank, no gaps (1,2,2,3)."
    },
    {
      id: 7,
      category: 'Transactions',
      question: "What is ACID in database transactions?",
      answer: "Atomicity (all or nothing), Consistency (valid state), Isolation (transactions don't interfere), Durability (committed changes persist)."
    },
    {
      id: 8,
      category: 'Normalization',
      question: "What is database normalization?",
      answer: "Process of organizing data to reduce redundancy and improve data integrity. Normal forms (1NF, 2NF, 3NF, BCNF) define rules for eliminating duplicate data and ensuring data dependencies."
    }
  ]

  const practiceProblems = [
    {
      id: 1,
      difficulty: 'Easy',
      category: 'SELECT & WHERE',
      question: 'Find all customers from the USA who are older than 25.',
      answer: `SELECT * FROM customers
WHERE country = 'USA' AND age > 25;`
    },
    {
      id: 2,
      difficulty: 'Easy',
      category: 'ORDER BY',
      question: 'List all customers sorted by age in descending order.',
      answer: `SELECT * FROM customers
ORDER BY age DESC;`
    },
    {
      id: 3,
      difficulty: 'Medium',
      category: 'GROUP BY',
      question: 'Find the total amount spent by each customer.',
      answer: `SELECT customer_id, SUM(amount) as total_spent
FROM orders
GROUP BY customer_id
ORDER BY total_spent DESC;`
    },
    {
      id: 4,
      difficulty: 'Medium',
      category: 'JOIN',
      question: 'Find customers who have placed orders with amount greater than 100.',
      answer: `SELECT DISTINCT c.*
FROM customers c
INNER JOIN orders o ON c.id = o.customer_id
WHERE o.amount > 100;`
    },
    {
      id: 5,
      difficulty: 'Medium',
      category: 'HAVING',
      question: 'Find countries with more than 2 customers.',
      answer: `SELECT country, COUNT(*) as customer_count
FROM customers
GROUP BY country
HAVING COUNT(*) > 2;`
    },
    {
      id: 6,
      difficulty: 'Hard',
      category: 'Subquery',
      question: 'Find customers who have spent more than the average customer.',
      answer: `SELECT c.*, SUM(o.amount) as total_spent
FROM customers c
INNER JOIN orders o ON c.id = o.customer_id
GROUP BY c.id
HAVING SUM(o.amount) > (
  SELECT AVG(amount) FROM orders
);`
    },
    {
      id: 7,
      difficulty: 'Hard',
      category: 'Window Functions',
      question: 'Find the top 3 customers by total spending, with their rank.',
      answer: `WITH CustomerSpending AS (
  SELECT
    customer_id,
    SUM(amount) as total_spent,
    DENSE_RANK() OVER (ORDER BY SUM(amount) DESC) as spending_rank
  FROM orders
  GROUP BY customer_id
)
SELECT cs.*, c.name
FROM CustomerSpending cs
JOIN customers c ON cs.customer_id = c.id
WHERE cs.spending_rank <= 3;`
    },
    {
      id: 8,
      difficulty: 'Hard',
      category: 'CTE',
      question: 'Find customers who have placed more than 3 orders in the last month.',
      answer: `WITH RecentOrders AS (
  SELECT customer_id, COUNT(*) as order_count
  FROM orders
  WHERE order_date >= DATE_SUB(CURRENT_DATE, INTERVAL 1 MONTH)
  GROUP BY customer_id
  HAVING COUNT(*) > 3
)
SELECT c.*, ro.order_count
FROM customers c
JOIN RecentOrders ro ON c.id = ro.customer_id;`
    }
  ]

  const commonMistakes = [
    {
      title: 'Confusion between WHERE and HAVING',
      mistake: 'Using WHERE with aggregate functions',
      correct: 'Use HAVING for aggregate filtering'
    },
    {
      title: 'Incorrect JOIN conditions',
      mistake: 'Forgetting the ON clause in JOINs',
      correct: 'Always specify join conditions with ON'
    },
    {
      title: 'NULL handling',
      mistake: 'Using = NULL instead of IS NULL',
      correct: 'Use IS NULL or IS NOT NULL for NULL checks'
    },
    {
      title: 'Column alias scope',
      mistake: 'Using SELECT aliases in WHERE clause',
      correct: 'Aliases are only available in ORDER BY and HAVING'
    },
    {
      title: 'GROUP BY issues',
      mistake: 'Selecting non-aggregated columns not in GROUP BY',
      correct: 'Include all non-aggregated SELECT columns in GROUP BY'
    }
  ]

  const difficultyColors = {
    Easy: 'bg-green-100 text-green-700 border-green-300',
    Medium: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    Hard: 'bg-red-100 text-red-700 border-red-300'
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Placement Practice
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Comprehensive interview questions and practice problems for placement preparation
        </p>
      </section>

      {/* Overview */}
      <section className="grid md:grid-cols-3 gap-6">
        <div className="section-card text-center">
          <GraduationCap className="w-12 h-12 text-blue-600 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">Interview Questions</h3>
          <p className="text-sm text-gray-600">{interviewQuestions.length} questions covering all topics</p>
        </div>
        <div className="section-card text-center">
          <Code className="w-12 h-12 text-green-600 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">Practice Problems</h3>
          <p className="text-sm text-gray-600">{practiceProblems.length} coding problems with solutions</p>
        </div>
        <div className="section-card text-center">
          <CheckCircle className="w-12 h-12 text-purple-600 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">Real-World Focus</h3>
          <p className="text-sm text-gray-600">Placement-tested content</p>
        </div>
      </section>

      {/* Interview Questions */}
      <section className="section-card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          <Briefcase className="w-6 h-6 inline mr-2" />
          Interview Questions
        </h2>
        <div className="space-y-3">
          {interviewQuestions.map((q) => (
            <div key={q.id} className="border border-gray-200 rounded-lg">
              <button
                onClick={() => toggleAnswer(q.id)}
                className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-700 rounded">
                      {q.category}
                    </span>
                    <span className="font-medium text-gray-900">{q.question}</span>
                  </div>
                </div>
                {showAnswer[q.id] ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
              </button>
              {showAnswer[q.id] && (
                <div className="px-4 pb-4 pt-2 bg-blue-50 border-t border-blue-100">
                  <p className="text-gray-700">{q.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Practice Problems */}
      <section className="section-card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          <Code className="w-6 h-6 inline mr-2" />
          Practice Problems
        </h2>
        <div className="space-y-4">
          {practiceProblems.map((problem) => (
            <div key={problem.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-semibold px-2 py-1 rounded ${difficultyColors[problem.difficulty]}`}>
                    {problem.difficulty}
                  </span>
                  <span className="text-xs font-semibold px-2 py-1 bg-purple-100 text-purple-700 rounded">
                    {problem.category}
                  </span>
                </div>
              </div>
              <p className="text-gray-700 mb-3">{problem.question}</p>
              <button
                onClick={() => toggleAnswer(`practice-${problem.id}`)}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                {showAnswer[`practice-${problem.id}`] ? 'Hide Solution' : 'Show Solution'}
              </button>
              {showAnswer[`practice-${problem.id}`] && (
                <div className="mt-3">
                  <CodeBlock code={problem.answer} delay={0} />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="section-card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Common Placement Mistakes to Avoid</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {commonMistakes.map((mistake, index) => (
            <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-semibold text-red-700 mb-2">{mistake.title}</h4>
              <p className="text-sm text-gray-600 mb-1">❌ {mistake.mistake}</p>
              <p className="text-sm text-green-600">✅ {mistake.correct}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Study Tips */}
      <section className="section-card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">📚 Study Tips for Placement Success</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-xs font-bold">1</span>
              </div>
              <p className="text-gray-700">Practice writing queries from scratch, not just reading them</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-xs font-bold">2</span>
              </div>
              <p className="text-gray-700">Understand execution order deeply - interviewers love asking about this</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-xs font-bold">3</span>
              </div>
              <p className="text-gray-700">Master JOINs and GROUP BY - they're most commonly tested</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-xs font-bold">4</span>
              </div>
              <p className="text-gray-700">Practice explaining your thought process out loud</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-xs font-bold">5</span>
              </div>
              <p className="text-gray-700">Be ready to write queries on whiteboard/paper without syntax highlighting</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-xs font-bold">6</span>
              </div>
              <p className="text-gray-700">Learn to optimize queries for performance - senior roles require this</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Reference */}
      <section className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">🎯 Quick Interview Checklist</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <h4 className="font-semibold text-blue-700 mb-2">Must Know</h4>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• SELECT, WHERE, ORDER BY</li>
              <li>• GROUP BY, HAVING</li>
              <li>• INNER/LEFT/RIGHT JOIN</li>
              <li>• Aggregate functions</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-purple-700 mb-2">Should Know</h4>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• Subqueries</li>
              <li>• UNION vs UNION ALL</li>
              <li>• NULL handling</li>
              <li>• Execution order</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-green-700 mb-2">Bonus Points</h4>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• Window functions</li>
              <li>• CTEs</li>
              <li>• Index basics</li>
              <li>• Query optimization</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Summary */}
      <section className="section-card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">📋 Summary</h2>
        <div className="space-y-3 text-gray-600">
          <p>✅ Practice regularly with real interview questions</p>
          <p>✅ Understand concepts deeply, don't memorize syntax</p>
          <p>✅ Focus on JOINs, GROUP BY, and execution order</p>
          <p>✅ Be ready to explain your thought process</p>
          <p>✅ Practice writing queries without IDE assistance</p>
          <p>✅ Learn to optimize queries for better performance</p>
        </div>
      </section>
    </div>
  )
}