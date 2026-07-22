import { useState } from 'react'
import { ChevronDown, ChevronUp, ListOrdered, ArrowDown } from 'lucide-react'
import CodeBlock from '../animations/CodeBlock'
import AnimationStage from '../animations/AnimationStage'
import ExecutionPipeline from '../animations/ExecutionPipeline'

export default function ExecutionOrder() {
  const [showAnswer, setShowAnswer] = useState({})
  const [animationKey, setAnimationKey] = useState(0)
  const [currentStep, setCurrentStep] = useState(-1)

  const toggleAnswer = (questionId) => {
    setShowAnswer(prev => ({ ...prev, [questionId]: !prev[questionId] }))
  }

  const replayAnimation = () => {
    setAnimationKey(prev => prev + 1)
    setCurrentStep(-1)
    // Auto-advance through steps
    let step = -1
    const interval = setInterval(() => {
      step++
      if (step <= 7) {
        setCurrentStep(step)
      } else {
        clearInterval(interval)
      }
    }, 1000)
  }

  const executionSteps = [
    {
      phase: 'FROM',
      description: 'Identify and join tables to get the base data set'
    },
    {
      phase: 'ON',
      description: 'Apply join conditions to combine tables'
    },
    {
      phase: 'JOIN',
      description: 'Perform the actual join operation'
    },
    {
      phase: 'WHERE',
      description: 'Filter rows based on conditions'
    },
    {
      phase: 'GROUP BY',
      description: 'Group rows based on specified columns'
    },
    {
      phase: 'HAVING',
      description: 'Filter groups based on conditions'
    },
    {
      phase: 'SELECT',
      description: 'Choose columns and perform calculations'
    },
    {
      phase: 'DISTINCT',
      description: 'Remove duplicate rows'
    },
    {
      phase: 'ORDER BY',
      description: 'Sort the result set'
    },
    {
      phase: 'LIMIT',
      description: 'Restrict the number of rows returned'
    }
  ]

  const interviewQuestions = [
    {
      id: 1,
      question: "Why does WHERE come before GROUP BY but HAVING comes after?",
      answer: "WHERE filters individual rows before they're grouped, while HAVING filters the grouped results after aggregation. You can't use aggregate functions in WHERE because the aggregation hasn't happened yet."
    },
    {
      id: 2,
      question: "Can you use column aliases in WHERE clause?",
      answer: "No! Column aliases defined in SELECT are processed after WHERE. Use the actual column name or expression in WHERE, or wrap in a subquery if you need to filter by alias."
    },
    {
      id: 3,
      question: "Why is execution order different from the order we write SQL?",
      answer: "SQL is declarative - you tell the database WHAT you want, not HOW to get it. The written order is optimized for readability, while execution order is optimized for performance and correctness."
    }
  ]

  const practicalExample = `-- A complex query showing execution order
SELECT
  country,
  COUNT(*) as customer_count,
  AVG(age) as avg_age
FROM customers
WHERE age > 18
GROUP BY country
HAVING COUNT(*) > 2
ORDER BY customer_count DESC
LIMIT 5;`

  const stepByStep = [
    { step: '1. FROM', action: 'Start with customers table' },
    { step: '2. WHERE', action: 'Filter to keep only rows where age > 18' },
    { step: '3. GROUP BY', action: 'Group remaining rows by country' },
    { step: '4. HAVING', action: 'Keep only groups with more than 2 customers' },
    { step: '5. SELECT', action: 'Calculate COUNT and AVG for each group' },
    { step: '6. ORDER BY', action: 'Sort groups by customer_count descending' },
    { step: '7. LIMIT', action: 'Return only the top 5 results' }
  ]

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          SQL Execution Order
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Understanding how SQL processes queries differently from how we write them
        </p>
      </section>

      {/* Story Analogy */}
      <section className="section-card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">📚 The Story Analogy</h2>
        <div className="prose max-w-none">
          <p className="text-gray-600 mb-4">
            Imagine following a recipe. You write it in the order: "Add eggs, mix well, bake for 30 minutes."
            But the actual <strong>execution order</strong> might be: preheat oven, get ingredients, mix, bake.
          </p>
          <p className="text-gray-600">
            SQL is similar - we write queries in a logical order for readability,
            but the database executes them in a specific order for efficiency and correctness.
          </p>
        </div>
      </section>

      {/* Written vs Execution Order */}
      <section className="section-card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Written Order vs Execution Order</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-700 mb-3">📝 Written Order (Human-Readable)</h3>
            <CodeBlock
              code={`SELECT country, COUNT(*)
FROM customers
WHERE age > 18
GROUP BY country
HAVING COUNT(*) > 2
ORDER BY COUNT(*) DESC
LIMIT 5;`}
              delay={0}
            />
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-700 mb-3">⚙️ Execution Order (How DB Processes)</h3>
            <div className="space-y-2">
              {['FROM customers', 'WHERE age > 18', 'GROUP BY country', 'HAVING COUNT(*) > 2', 'SELECT country, COUNT(*)', 'ORDER BY COUNT(*) DESC', 'LIMIT 5'].map((step, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                    {index + 1}
                  </div>
                  <span className="text-gray-700">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Animated Pipeline */}
      <section className="section-card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Interactive Execution Pipeline</h2>
        <AnimationStage
          key={`pipeline-${animationKey}`}
          title="Watch the execution order"
          onReplay={replayAnimation}
        >
          <ExecutionPipeline
            key={`pipeline-anim-${animationKey}`}
            steps={executionSteps}
            currentStep={currentStep}
            delay={0}
          />
        </AnimationStage>
      </section>

      {/* Detailed Steps */}
      <section className="section-card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Step-by-Step Example</h2>
        <CodeBlock code={practicalExample} delay={0} />
        <div className="mt-6 space-y-3">
          {stepByStep.map((item, index) => (
            <div key={index} className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold flex-shrink-0">
                {index + 1}
              </div>
              <div>
                <div className="font-semibold text-gray-900">{item.step}</div>
                <div className="text-sm text-gray-600">{item.action}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why It Matters */}
      <section className="section-card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why Execution Order Matters</h2>
        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-semibold text-red-700 mb-2">❌ Common Error: Alias in WHERE</h4>
            <CodeBlock
              code={`-- This won't work!
SELECT country, COUNT(*) as cnt
FROM customers
WHERE cnt > 2  -- Error: alias not defined yet
GROUP BY country;`}
              delay={0}
            />
            <p className="text-sm text-gray-600 mt-2">Aliases from SELECT aren't available in WHERE (SELECT comes after WHERE)</p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-700 mb-2">✅ Correct Approach</h4>
            <CodeBlock
              code={`-- Use HAVING for aggregate filtering
SELECT country, COUNT(*) as cnt
FROM customers
WHERE age > 18
GROUP BY country
HAVING COUNT(*) > 2  -- HAVING works with aggregates`}
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* Performance Implications */}
      <section className="section-card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Performance Implications</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-700 mb-2">🚀 Early Filtering</h4>
            <p className="text-sm text-gray-700 mb-2">
              Use WHERE to filter rows early, reducing data for later operations.
            </p>
            <CodeBlock
              code={`-- Good: Filter early
SELECT * FROM large_table
WHERE status = 'active'
GROUP BY category;`}
              delay={0}
            />
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-yellow-700 mb-2">⚠️ Late Filtering</h4>
            <p className="text-sm text-gray-700 mb-2">
              HAVING filters after grouping, which processes more data.
            </p>
            <CodeBlock
              code={`-- Less efficient: More data processed
SELECT * FROM large_table
GROUP BY category
HAVING status = 'active';`}
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* Quick Reference */}
      <section className="section-card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Quick Reference Guide</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border border-gray-300">Order</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border border-gray-300">Clause</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border border-gray-300">Purpose</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border border-gray-300">Can Use Aggregates?</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-900 border border-gray-200">1</td>
                <td className="px-4 py-3 text-sm text-gray-600 border border-gray-200">FROM</td>
                <td className="px-4 py-3 text-sm text-gray-600 border border-gray-200">Get base data</td>
                <td className="px-4 py-3 text-sm text-red-600 border border-gray-200">❌</td>
              </tr>
              <tr className="bg-white hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-900 border border-gray-200">2</td>
                <td className="px-4 py-3 text-sm text-gray-600 border border-gray-200">WHERE</td>
                <td className="px-4 py-3 text-sm text-gray-600 border border-gray-200">Filter rows</td>
                <td className="px-4 py-3 text-sm text-red-600 border border-gray-200">❌</td>
              </tr>
              <tr className="bg-white hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-900 border border-gray-200">3</td>
                <td className="px-4 py-3 text-sm text-gray-600 border border-gray-200">GROUP BY</td>
                <td className="px-4 py-3 text-sm text-gray-600 border border-gray-200">Group rows</td>
                <td className="px-4 py-3 text-sm text-red-600 border border-gray-200">❌</td>
              </tr>
              <tr className="bg-white hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-900 border border-gray-200">4</td>
                <td className="px-4 py-3 text-sm text-gray-600 border border-gray-200">HAVING</td>
                <td className="px-4 py-3 text-sm text-gray-600 border border-gray-200">Filter groups</td>
                <td className="px-4 py-3 text-sm text-green-600 border border-gray-200">✅</td>
              </tr>
              <tr className="bg-white hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-900 border border-gray-200">5</td>
                <td className="px-4 py-3 text-sm text-gray-600 border border-gray-200">SELECT</td>
                <td className="px-4 py-3 text-sm text-gray-600 border border-gray-200">Choose columns</td>
                <td className="px-4 py-3 text-sm text-green-600 border border-gray-200">✅</td>
              </tr>
              <tr className="bg-white hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-900 border border-gray-200">6</td>
                <td className="px-4 py-3 text-sm text-gray-600 border border-gray-200">ORDER BY</td>
                <td className="px-4 py-3 text-sm text-gray-600 border border-gray-200">Sort results</td>
                <td className="px-4 py-3 text-sm text-green-600 border border-gray-200">✅</td>
              </tr>
              <tr className="bg-white hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-900 border border-gray-200">7</td>
                <td className="px-4 py-3 text-sm text-gray-600 border border-gray-200">LIMIT</td>
                <td className="px-4 py-3 text-sm text-gray-600 border border-gray-200">Restrict rows</td>
                <td className="px-4 py-3 text-sm text-green-600 border border-gray-200">✅</td>
              </tr>
            </tbody>
          </table>
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
          <p>✅ SQL executes in a specific order different from written order</p>
          <p>✅ FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT</p>
          <p>✅ Column aliases from SELECT aren't available in WHERE</p>
          <p>✅ Use WHERE for row filtering, HAVING for group filtering</p>
          <p>✅ Understanding execution order helps optimize queries</p>
          <p>✅ This knowledge is crucial for writing correct, efficient SQL</p>
        </div>
      </section>
    </div>
  )
}