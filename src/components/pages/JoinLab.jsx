import { useState } from 'react'
import { ChevronDown, ChevronUp, Merge, ArrowLeftRight, ArrowRight, ArrowLeft } from 'lucide-react'
import CodeBlock from '../animations/CodeBlock'
import AnimationStage from '../animations/AnimationStage'
import TableGrid from '../animations/TableGrid'
import JoinConnector from '../animations/JoinConnector'

export default function JoinLab() {
  const [showAnswer, setShowAnswer] = useState({})
  const [animationKey, setAnimationKey] = useState(0)
  const [activeJoin, setActiveJoin] = useState('inner')

  const toggleAnswer = (questionId) => {
    setShowAnswer(prev => ({ ...prev, [questionId]: !prev[questionId] }))
  }

  const replayAnimation = () => {
    setAnimationKey(prev => prev + 1)
  }

  const customersTable = ['John (ID:1)', 'Jane (ID:2)', 'Mike (ID:3)', 'Sarah (ID:4)']
  const ordersTable = ['Order 101 (Cust:1)', 'Order 102 (Cust:1)', 'Order 103 (Cust:2)', 'Order 104 (Cust:5)']

  const joinTypes = {
    inner: {
      name: 'INNER JOIN',
      icon: <Merge className="w-5 h-5" />,
      description: 'Returns only matching rows from both tables',
      matches: ['John + Order 101', 'John + Order 102', 'Jane + Order 103']
    },
    left: {
      name: 'LEFT JOIN',
      icon: <ArrowLeft className="w-5 h-5" />,
      description: 'Returns all rows from left table, matching rows from right',
      matches: ['John + Order 101', 'John + Order 102', 'Jane + Order 103', 'Mike + NULL', 'Sarah + NULL']
    },
    right: {
      name: 'RIGHT JOIN',
      icon: <ArrowRight className="w-5 h-5" />,
      description: 'Returns all rows from right table, matching rows from left',
      matches: ['John + Order 101', 'John + Order 102', 'Jane + Order 103', 'NULL + Order 104']
    },
    full: {
      name: 'FULL OUTER JOIN',
      icon: <ArrowLeftRight className="w-5 h-5" />,
      description: 'Returns all rows from both tables',
      matches: ['John + Order 101', 'John + Order 102', 'Jane + Order 103', 'Mike + NULL', 'Sarah + NULL', 'NULL + Order 104']
    }
  }

  const joinExamples = {
    inner: `-- Find customers who placed orders
SELECT customers.name, orders.order_id
FROM customers
INNER JOIN orders ON customers.id = orders.customer_id;`,
    left: `-- All customers, even those without orders
SELECT customers.name, orders.order_id
FROM customers
LEFT JOIN orders ON customers.id = orders.customer_id;`,
    right: `-- All orders, even unmatched ones
SELECT customers.name, orders.order_id
FROM customers
RIGHT JOIN orders ON customers.id = orders.customer_id;`,
    full: `-- All customers and all orders
SELECT customers.name, orders.order_id
FROM customers
FULL OUTER JOIN orders ON customers.id = orders.customer_id;`
  }

  const interviewQuestions = [
    {
      id: 1,
      question: "What is the difference between INNER JOIN and LEFT JOIN?",
      answer: "INNER JOIN returns only rows where there's a match in both tables. LEFT JOIN returns all rows from the left table, and matching rows from the right table (NULL if no match). LEFT JOIN is useful when you want to preserve all records from the primary table regardless of matches."
    },
    {
      id: 2,
      question: "Can a LEFT JOIN return more rows than the left table?",
      answer: "Yes! If a row in the left table matches multiple rows in the right table, it appears multiple times in the result. For example, one customer with multiple orders would appear multiple times."
    },
    {
      id: 3,
      question: "What happens with NULL values in JOIN conditions?",
      answer: "NULL values never match each other in JOIN conditions. If customer_id is NULL in either table, those rows won't match in an INNER JOIN. In LEFT/RIGHT joins, unmatched rows show NULL for the missing table's columns."
    }
  ]

  const commonMistakes = [
    {
      mistake: "Forgetting the ON clause",
      consequence: "Syntax error",
      solution: "Always specify the join condition with ON"
    },
    {
      mistake: "Using WHERE instead of ON for join conditions",
      consequence: "Different behavior (cross join instead)",
      solution: "Use ON for join conditions, WHERE for filtering"
    },
    {
      mistake: "Joining on wrong columns",
      consequence: "Incorrect matches or Cartesian product",
      solution: "Ensure you're joining on the correct key columns"
    }
  ]

  const activeJoinData = joinTypes[activeJoin]

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          JOIN Lab
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Master SQL joins with interactive animations and examples
        </p>
      </section>

      {/* Story Analogy */}
      <section className="section-card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">📚 The Story Analogy</h2>
        <div className="prose max-w-none">
          <p className="text-gray-600 mb-4">
            Imagine you have two lists: <strong>customers</strong> and <strong>orders</strong>. Each order has a customer ID,
            but not every customer has placed an order, and some orders might have invalid customer IDs.
          </p>
          <p className="text-gray-600">
            JOINs are like a matching system that connects related information across these lists.
            Different JOIN types decide what happens when there isn't a perfect match.
          </p>
        </div>
      </section>

      {/* Sample Tables */}
      <section className="grid md:grid-cols-2 gap-6">
        <div className="section-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">👥 Customers Table</h3>
          <TableGrid
            headers={['ID', 'Name']}
            data={[
              ['1', 'John'],
              ['2', 'Jane'],
              ['3', 'Mike'],
              ['4', 'Sarah']
            ]}
          />
        </div>
        <div className="section-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">📦 Orders Table</h3>
          <TableGrid
            headers={['Order ID', 'Customer ID', 'Amount']}
            data={[
              ['101', '1', '$150'],
              ['102', '1', '$200'],
              ['103', '2', '$75'],
              ['104', '5', '$125']
            ]}
          />
        </div>
      </section>

      {/* Join Type Selector */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(joinTypes).map(([key, join]) => (
          <button
            key={key}
            onClick={() => setActiveJoin(key)}
            className={`p-4 rounded-lg border-2 transition-all ${
              activeJoin === key
                ? 'bg-blue-50 border-blue-500'
                : 'bg-white border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-2">{join.icon}</div>
              <div className="font-semibold text-sm">{join.name}</div>
            </div>
          </button>
        ))}
      </section>

      {/* Active Join Animation */}
      <AnimationStage
        key={`join-${animationKey}`}
        title={`${activeJoinData.name} Animation`}
        onReplay={replayAnimation}
      >
        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-gray-700">{activeJoinData.description}</p>
          </div>

          <JoinConnector
            key={`join-connector-${animationKey}-${activeJoin}`}
            leftTable={customersTable}
            rightTable={ordersTable}
            joinType={activeJoin.toUpperCase()}
            leftKey="customer_id"
            rightKey="customer_id"
            matches={activeJoinData.matches}
            delay={0}
          />

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">SQL Query:</h4>
            <CodeBlock code={joinExamples[activeJoin]} delay={0.5} />
          </div>
        </div>
      </AnimationStage>

      {/* Join Comparison */}
      <section className="section-card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Join Type Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border border-gray-300">Join Type</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border border-gray-300">Left Table</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border border-gray-300">Right Table</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border border-gray-300">Unmatched Left</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border border-gray-300">Unmatched Right</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-900 border border-gray-200">INNER</td>
                <td className="px-4 py-3 text-sm text-green-600 border border-gray-200">✅ Matched only</td>
                <td className="px-4 py-3 text-sm text-green-600 border border-gray-200">✅ Matched only</td>
                <td className="px-4 py-3 text-sm text-red-600 border border-gray-200">❌ Excluded</td>
                <td className="px-4 py-3 text-sm text-red-600 border border-gray-200">❌ Excluded</td>
              </tr>
              <tr className="bg-white hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-900 border border-gray-200">LEFT</td>
                <td className="px-4 py-3 text-sm text-green-600 border border-gray-200">✅ All</td>
                <td className="px-4 py-3 text-sm text-green-600 border border-gray-200">✅ Matched only</td>
                <td className="px-4 py-3 text-sm text-green-600 border border-gray-200">✅ Included (NULL)</td>
                <td className="px-4 py-3 text-sm text-red-600 border border-gray-200">❌ Excluded</td>
              </tr>
              <tr className="bg-white hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-900 border border-gray-200">RIGHT</td>
                <td className="px-4 py-3 text-sm text-green-600 border border-gray-200">✅ Matched only</td>
                <td className="px-4 py-3 text-sm text-green-600 border border-gray-200">✅ All</td>
                <td className="px-4 py-3 text-sm text-red-600 border border-gray-200">❌ Excluded</td>
                <td className="px-4 py-3 text-sm text-green-600 border border-gray-200">✅ Included (NULL)</td>
              </tr>
              <tr className="bg-white hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-900 border border-gray-200">FULL OUTER</td>
                <td className="px-4 py-3 text-sm text-green-600 border border-gray-200">✅ All</td>
                <td className="px-4 py-3 text-sm text-green-600 border border-gray-200">✅ All</td>
                <td className="px-4 py-3 text-sm text-green-600 border border-gray-200">✅ Included (NULL)</td>
                <td className="px-4 py-3 text-sm text-green-600 border border-gray-200">✅ Included (NULL)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Multiple Joins */}
      <section className="section-card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Multiple JOINs</h2>
        <CodeBlock
          code={`-- Join three tables together
SELECT
  customers.name,
  orders.order_id,
  shippings.status
FROM customers
INNER JOIN orders ON customers.id = orders.customer_id
LEFT JOIN shippings ON orders.order_id = shippings.order_id
WHERE orders.amount > 100;`}
          delay={0}
        />
        <div className="mt-4 bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-700 mb-2">💡 Tips for Multiple JOINs:</h4>
          <ul className="space-y-1 text-sm text-gray-700">
            <li>• Each JOIN needs its own ON clause</li>
            <li>• You can mix different JOIN types in one query</li>
            <li>• Order of JOINs matters for performance</li>
            <li>• Use table aliases for cleaner code</li>
          </ul>
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="section-card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Common Mistakes to Avoid</h2>
        <div className="space-y-4">
          {commonMistakes.map((mistake, index) => (
            <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-semibold text-red-700 mb-2">❌ {mistake.mistake}</h4>
              <p className="text-sm text-gray-600 mb-1">⚠️ {mistake.consequence}</p>
              <p className="text-sm text-green-600">✅ {mistake.solution}</p>
            </div>
          ))}
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

      {/* MySQL Note */}
      <section className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-yellow-800 mb-2">⚠️ MySQL Note</h3>
        <p className="text-gray-700">
          MySQL doesn't support FULL OUTER JOIN directly. To achieve the same result, you can use a UNION of LEFT JOIN and RIGHT JOIN,
          or use LEFT JOIN with a UNION to include the unmatched rows from the right table.
        </p>
      </section>

      {/* Summary */}
      <section className="section-card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">📋 Summary</h2>
        <div className="space-y-3 text-gray-600">
          <p>✅ INNER JOIN returns only matching rows from both tables</p>
          <p>✅ LEFT JOIN returns all rows from left table, matches from right</p>
          <p>✅ RIGHT JOIN returns all rows from right table, matches from left</p>
          <p>✅ FULL OUTER JOIN returns all rows from both tables</p>
          <p>✅ Use ON clause to specify join conditions</p>
          <p>✅ Mastering JOINs is essential for working with relational databases</p>
        </div>
      </section>
    </div>
  )
}