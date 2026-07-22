import { useState } from 'react'
import { ChevronDown, ChevronUp, Search, Layers } from 'lucide-react'
import CodeBlock from '../animations/CodeBlock'

export default function Subqueries() {
  const [showAnswer, setShowAnswer] = useState({})

  const toggleAnswer = (questionId) => {
    setShowAnswer(prev => ({ ...prev, [questionId]: !prev[questionId] }))
  }

  const subqueryTypes = [
    {
      type: 'Scalar Subquery',
      description: 'Returns a single value',
      example: `SELECT name, (SELECT MAX(amount) FROM orders) as max_amount FROM customers;`
    },
    {
      type: 'Row Subquery',
      description: 'Returns a single row',
      example: `SELECT * FROM customers WHERE (first_name, last_name) = (SELECT first_name, last_name FROM customers WHERE id = 1);`
    },
    {
      type: 'Column Subquery',
      description: 'Returns a single column',
      example: `SELECT name FROM customers WHERE id IN (SELECT customer_id FROM orders WHERE amount > 100);`
    },
    {
      type: 'Table Subquery',
      description: 'Returns a full table',
      example: `SELECT * FROM (SELECT * FROM orders WHERE amount > 100) as high_value_orders;`
    }
  ]

  const interviewQuestions = [
    {
      id: 1,
      question: "What is the difference between correlated and uncorrelated subqueries?",
      answer: "Uncorrelated subqueries can run independently of the outer query and execute once. Correlated subqueries reference columns from the outer query and execute once for each row processed by the outer query, which can be slower."
    },
    {
      id: 2,
      question: "When should you use subqueries vs JOINs?",
      answer: "Use subqueries for simple, single-value lookups or when logic is clearer. Use JOINs for combining data from multiple tables, especially with large datasets. JOINs are generally more efficient for data retrieval."
    },
    {
      id: 3,
      question: "Can subqueries be used in SELECT, FROM, and WHERE clauses?",
      answer: "Yes! In SELECT clause: scalar subqueries for calculations. In FROM clause: table subqueries as derived tables. In WHERE clause: filtering with subqueries. Each has different use cases and performance considerations."
    }
  ]

  const useCases = [
    {
      title: 'Find customers with orders above average',
      code: `SELECT * FROM customers
WHERE id IN (
  SELECT customer_id FROM orders
  WHERE amount > (SELECT AVG(amount) FROM orders)
);`
    },
    {
      title: 'Find highest value orders',
      code: `SELECT customer_id, amount
FROM orders
WHERE amount = (SELECT MAX(amount) FROM orders);`
    },
    {
      title: 'Customers with no orders',
      code: `SELECT * FROM customers
WHERE id NOT IN (SELECT customer_id FROM orders);`
    }
  ]

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Subqueries
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Learn to write queries within queries
        </p>
      </section>

      {/* Story Analogy */}
      <section className="section-card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">📚 The Story Analogy</h2>
        <div className="prose max-w-none">
          <p className="text-gray-600 mb-4">
            Imagine you need to find customers who spent more than the average order amount.
            You can't know the average until you calculate it, so you need a <strong>query within a query</strong>.
          </p>
          <p className="text-gray-600">
            Subqueries are like having a research assistant who does preliminary work
            and hands you the answer to use in your main query.
          </p>
        </div>
      </section>

      {/* Subquery Types */}
      <section className="section-card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Types of Subqueries</h2>
        <div className="space-y-4">
          {subqueryTypes.map((subquery, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <Search className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-gray-900">{subquery.type}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">{subquery.description}</p>
              <CodeBlock code={subquery.example} delay={index * 0.1} />
            </div>
          ))}
        </div>
      </section>

      {/* WHERE Clause Subqueries */}
      <section className="section-card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Subqueries in WHERE Clause</h2>
        <div className="space-y-4">
          {useCases.map((useCase, index) => (
            <div key={index} className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h3 className="font-semibold text-blue-700 mb-2">{useCase.title}</h3>
              <CodeBlock code={useCase.code} delay={index * 0.15} />
            </div>
          ))}
        </div>
      </section>

      {/* FROM Clause Subqueries */}
      <section className="section-card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Subqueries in FROM Clause (Derived Tables)</h2>
        <CodeBlock
          code={`-- Find average order value per customer
SELECT customer_avg.customer_id, customer_avg.avg_amount
FROM (
  SELECT customer_id, AVG(amount) as avg_amount
  FROM orders
  GROUP BY customer_id
) as customer_avg
WHERE customer_avg.avg_amount > 100;`}
          delay={0}
        />
        <div className="mt-4 bg-green-50 p-4 rounded-lg border border-green-200">
          <h4 className="font-semibold text-green-700 mb-2">💡 Derived Tables</h4>
          <p className="text-sm text-gray-700">
            Subqueries in FROM clause create temporary result sets (derived tables) that you can query like regular tables.
            Always alias your derived tables with 'as table_name'.
          </p>
        </div>
      </section>

      {/* Correlated vs Uncorrelated */}
      <section className="section-card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Correlated vs Uncorrelated Subqueries</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h3 className="font-semibold text-purple-700 mb-2">Uncorrelated (Faster)</h3>
            <CodeBlock
              code={`-- Runs once, independent
SELECT * FROM customers
WHERE country = (SELECT country FROM customers WHERE id = 1);`}
              delay={0}
            />
            <p className="text-sm text-gray-600 mt-2">Subquery executes once and results are reused</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <h3 className="font-semibold text-orange-700 mb-2">Correlated (Slower)</h3>
            <CodeBlock
              code={`-- Runs for each customer row
SELECT * FROM customers c
WHERE amount > (
  SELECT AVG(amount) FROM orders o
  WHERE o.customer_id = c.customer_id
);`}
              delay={0.2}
            />
            <p className="text-sm text-gray-600 mt-2">Subquery references outer query, runs per row</p>
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
          <p>✅ Subqueries are queries nested inside another query</p>
          <p>✅ Can be used in SELECT, FROM, WHERE, and HAVING clauses</p>
          <p>✅ Uncorrelated subqueries execute once, correlated execute per row</p>
          <p>✅ Consider using JOINs instead of subqueries for better performance</p>
          <p>✅ Always alias derived tables when using in FROM clause</p>
        </div>
      </section>
    </div>
  )
}