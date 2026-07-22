import { useState } from 'react'
import { ChevronDown, ChevronUp, Layout, Hash, Trophy } from 'lucide-react'
import CodeBlock from '../animations/CodeBlock'
import AnimationStage from '../animations/AnimationStage'
import TableGrid from '../animations/TableGrid'

export default function WindowFunctions() {
  const [showAnswer, setShowAnswer] = useState({})
  const [animationKey, setAnimationKey] = useState(0)
  const [activeConcept, setActiveConcept] = useState('row_number')

  const toggleAnswer = (questionId) => {
    setShowAnswer(prev => ({ ...prev, [questionId]: !prev[questionId] }))
  }

  const replayAnimation = () => {
    setAnimationKey(prev => prev + 1)
  }

  const concepts = {
    row_number: {
      name: 'ROW_NUMBER()',
      description: 'Assigns unique sequential numbers to rows',
      example: `SELECT
  customer_id,
  amount,
  ROW_NUMBER() OVER (ORDER BY amount DESC) as rank
FROM orders;`
    },
    rank: {
      name: 'RANK()',
      description: 'Assigns ranks with ties getting same rank, gaps for ties',
      example: `SELECT
  customer_id,
  amount,
  RANK() OVER (ORDER BY amount DESC) as rank
FROM orders;`
    },
    dense_rank: {
      name: 'DENSE_RANK()',
      description: 'Assigns ranks with ties getting same rank, no gaps',
      example: `SELECT
  customer_id,
  amount,
  DENSE_RANK() OVER (ORDER BY amount DESC) as rank
FROM orders;`
    },
    cte: {
      name: 'CTE (Common Table Expression)',
      description: 'Temporary result set defined in WITH clause',
      example: `WITH CustomerStats AS (
  SELECT
    customer_id,
    COUNT(*) as order_count,
    SUM(amount) as total_spent
  FROM orders
  GROUP BY customer_id
)
SELECT * FROM CustomerStats
WHERE total_spent > 1000;`
    }
  }

  const sampleData = {
    headers: ['Customer', 'Amount', 'ROW_NUMBER', 'RANK', 'DENSE_RANK'],
    data: [
      ['John', '$500', '1', '1', '1'],
      ['Jane', '$400', '2', '2', '2'],
      ['Mike', '$400', '3', '2', '2'],
      ['Sarah', '$300', '4', '4', '3']
    ]
  }

  const interviewQuestions = [
    {
      id: 1,
      question: "What's the difference between RANK() and DENSE_RANK()?",
      answer: "RANK() leaves gaps after ties (1,2,2,4), while DENSE_RANK() doesn't (1,2,2,3). If two people tie for 2nd place, RANK() puts the next person in 4th place, DENSE_RANK() puts them in 3rd place."
    },
    {
      id: 2,
      question: "When should you use CTEs vs subqueries?",
      answer: "CTEs are more readable and maintainable for complex queries. They can be referenced multiple times in the same query, support recursive queries, and make complex logic easier to understand. Use CTEs when you need to reference the same result set multiple times."
    },
    {
      id: 3,
      question: "Can you use multiple window functions in one query?",
      answer: "Yes! You can use multiple window functions with different OVER clauses in the same SELECT statement. Each function can have different partitioning, ordering, or frame specifications."
    }
  ]

  const activeConceptData = concepts[activeConcept]

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Window Functions & CTE
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Advanced SQL techniques for data analysis and query organization
        </p>
      </section>

      {/* Story Analogy */}
      <section className="section-card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">📚 The Story Analogy</h2>
        <div className="prose max-w-none">
          <p className="text-gray-600 mb-4">
            Imagine you're ranking students by test scores, but some students have the same score.
            Window functions are like a smart ranking system that can handle ties, assign ranks without gaps,
            or assign sequential numbers regardless of ties.
          </p>
          <p className="text-gray-600">
            CTEs are like creating a temporary summary table that you can reference multiple times
            in your query, making complex logic much clearer.
          </p>
        </div>
      </section>

      {/* Concept Selector */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(concepts).map(([key, concept]) => (
          <button
            key={key}
            onClick={() => setActiveConcept(key)}
            className={`p-4 rounded-lg border-2 transition-all ${
              activeConcept === key
                ? 'bg-blue-50 border-blue-500'
                : 'bg-white border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex flex-col items-center text-center">
              <Layout className="w-5 h-5 mb-2" />
              <div className="font-semibold text-sm">{concept.name}</div>
            </div>
          </button>
        ))}
      </section>

      {/* Active Concept Details */}
      <AnimationStage
        key={`concept-${animationKey}`}
        title={activeConceptData.name}
        onReplay={replayAnimation}
      >
        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-gray-700">{activeConceptData.description}</p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Example:</h4>
            <CodeBlock code={activeConceptData.example} delay={0} />
          </div>
        </div>
      </AnimationStage>

      {/* Window Functions Comparison */}
      <section className="section-card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Window Functions Comparison</h2>
        <TableGrid headers={sampleData.headers} data={sampleData.data} />
        <div className="mt-4 grid md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-3 rounded-lg">
            <h4 className="font-semibold text-blue-700 text-sm">ROW_NUMBER</h4>
            <p className="text-xs text-gray-600">Always sequential: 1,2,3,4</p>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <h4 className="font-semibold text-green-700 text-sm">RANK</h4>
            <p className="text-xs text-gray-600">Ties get same rank, gaps: 1,2,2,4</p>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg">
            <h4 className="font-semibold text-purple-700 text-sm">DENSE_RANK</h4>
            <p className="text-xs text-gray-600">Ties get same rank, no gaps: 1,2,2,3</p>
          </div>
        </div>
      </section>

      {/* Window Function Syntax */}
      <section className="section-card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Window Function Syntax</h2>
        <CodeBlock
          code={`function_name() OVER (
  PARTITION BY column1, column2  -- Group within window
  ORDER BY column3 [ASC|DESC]   -- Order within partition
  ROWS/RANGE BETWEEN ...          -- Window frame (optional)
)`}
          delay={0}
        />
        <div className="mt-4 bg-green-50 p-4 rounded-lg border border-green-200">
          <h4 className="font-semibold text-green-700 mb-2">💡 Key Points:</h4>
          <ul className="space-y-1 text-sm text-gray-700">
            <li>• PARTITION BY: Creates groups within the window</li>
            <li>• ORDER BY: Defines the order within each partition</li>
            <li>• Window functions don't reduce rows like aggregates</li>
            <li>• Can be used in SELECT and ORDER BY clauses</li>
          </ul>
        </div>
      </section>

      {/* CTE Deep Dive */}
      <section className="section-card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Common Table Expressions (CTE)</h2>
        <CodeBlock
          code={`-- Complex CTE example
WITH SalesStats AS (
  -- First CTE: Calculate sales per customer
  SELECT
    customer_id,
    COUNT(*) as orders,
    SUM(amount) as total
  FROM orders
  GROUP BY customer_id
),
HighValueCustomers AS (
  -- Second CTE: Filter high-value customers
  SELECT customer_id, total
  FROM SalesStats
  WHERE total > 1000
)
-- Main query using both CTEs
SELECT
  c.name,
  hvc.total
FROM HighValueCustomers hvc
JOIN customers c ON hvc.customer_id = c.id
ORDER BY hvc.total DESC;`}
          delay={0}
        />
        <div className="mt-4 bg-purple-50 p-4 rounded-lg border border-purple-200">
          <h4 className="font-semibold text-purple-700 mb-2">🎯 CTE Benefits:</h4>
          <ul className="space-y-1 text-sm text-gray-700">
            <li>• Breaks complex queries into readable parts</li>
            <li>• Can reference multiple CTEs in one query</li>
            <li>• Recursive CTEs for hierarchical data</li>
            <li>• Better than subqueries for maintainability</li>
          </ul>
        </div>
      </section>

      {/* Real-world Examples */}
      <section className="section-card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Real-World Examples</h2>
        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-700 mb-2">🏆 Top 3 Customers by Sales</h4>
            <CodeBlock
              code={`WITH RankedCustomers AS (
  SELECT
    customer_id,
    SUM(amount) as total_sales,
    DENSE_RANK() OVER (ORDER BY SUM(amount) DESC) as rank
  FROM orders
  GROUP BY customer_id
)
SELECT customer_id, total_sales
FROM RankedCustomers
WHERE rank <= 3;`}
              delay={0}
            />
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-700 mb-2">📊 Running Total of Orders</h4>
            <CodeBlock
              code={`SELECT
  order_id,
  amount,
  SUM(amount) OVER (
    ORDER BY order_date
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) as running_total
FROM orders;`}
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* Interview Questions */}
      <section className="section-card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">🎯 Placement Interview Questions</h2>
        <div className="space-y-3">
          {interviewQuestions.map((q) => (
            <div key={q.id} className="border border-gray-200 rounded-lg">
              <button
                onClick={() => toggleAnswer(q.id)}
                className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-900">{q.question}</span>
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

      {/* Summary */}
      <section className="section-card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">📋 Summary</h2>
        <div className="space-y-3 text-gray-600">
          <p>✅ Window functions perform calculations across related rows</p>
          <p>✅ ROW_NUMBER assigns unique sequential numbers</p>
          <p>✅ RANK handles ties with gaps, DENSE_RANK without gaps</p>
          <p>✅ CTEs create temporary result sets for complex queries</p>
          <p>✅ CTEs improve readability and maintainability</p>
          <p>✅ Master these for advanced data analysis and reporting</p>
        </div>
      </section>
    </div>
  )
}