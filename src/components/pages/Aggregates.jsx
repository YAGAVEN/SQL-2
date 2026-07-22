import { useState } from 'react'
import { ChevronDown, ChevronUp, Calculator, Hash, TrendingUp, Minus, Plus } from 'lucide-react'
import CodeBlock from '../animations/CodeBlock'
import AnimationStage from '../animations/AnimationStage'
import TableGrid from '../animations/TableGrid'

export default function Aggregates() {
  const [showAnswer, setShowAnswer] = useState({})
  const [animationKey, setAnimationKey] = useState(0)
  const [activeFunction, setActiveFunction] = useState('count')

  const toggleAnswer = (questionId) => {
    setShowAnswer(prev => ({ ...prev, [questionId]: !prev[questionId] }))
  }

  const replayAnimation = () => {
    setAnimationKey(prev => prev + 1)
  }

  const aggregateFunctions = {
    count: {
      name: 'COUNT',
      icon: <Hash className="w-5 h-5" />,
      description: 'Counts the number of rows',
      examples: [
        { title: 'Count all rows', code: 'SELECT COUNT(*) FROM customers;' },
        { title: 'Count non-null values', code: 'SELECT COUNT(email) FROM customers;' },
        { title: 'Count distinct values', code: 'SELECT COUNT(DISTINCT country) FROM customers;' }
      ],
      result: 'Returns the total number of rows or non-null values'
    },
    sum: {
      name: 'SUM',
      icon: <Plus className="w-5 h-5" />,
      description: 'Adds up values in a numeric column',
      examples: [
        { title: 'Total sales', code: 'SELECT SUM(amount) FROM orders;' },
        { title: 'Sum with condition', code: 'SELECT SUM(amount) FROM orders WHERE customer_id = 1;' },
        { title: 'Sum of distinct values', code: 'SELECT SUM(DISTINCT amount) FROM orders;' }
      ],
      result: 'Returns the total sum of numeric values'
    },
    avg: {
      name: 'AVG',
      icon: <Calculator className="w-5 h-5" />,
      description: 'Calculates the average of numeric values',
      examples: [
        { title: 'Average age', code: 'SELECT AVG(age) FROM customers;' },
        { title: 'Average order value', code: 'SELECT AVG(amount) FROM orders;' },
        { title: 'Average with grouping', code: 'SELECT customer_id, AVG(amount) FROM orders GROUP BY customer_id;' }
      ],
      result: 'Returns the average (mean) of numeric values'
    },
    min: {
      name: 'MIN',
      icon: <Minus className="w-5 h-5" />,
      description: 'Finds the minimum value',
      examples: [
        { title: 'Minimum age', code: 'SELECT MIN(age) FROM customers;' },
        { title: 'Earliest date', code: 'SELECT MIN(order_date) FROM orders;' },
        { title: 'Minimum per group', code: 'SELECT customer_id, MIN(amount) FROM orders GROUP BY customer_id;' }
      ],
      result: 'Returns the smallest value in the set'
    },
    max: {
      name: 'MAX',
      icon: <TrendingUp className="w-5 h-5" />,
      description: 'Finds the maximum value',
      examples: [
        { title: 'Maximum age', code: 'SELECT MAX(age) FROM customers;' },
        { title: 'Latest date', code: 'SELECT MAX(order_date) FROM orders;' },
        { title: 'Maximum per group', code: 'SELECT customer_id, MAX(amount) FROM orders GROUP BY customer_id;' }
      ],
      result: 'Returns the largest value in the set'
    }
  }

  const sampleData = {
    headers: ['Order ID', 'Customer', 'Item', 'Amount'],
    data: [
      ['101', 'John', 'Laptop', '1299.99'],
      ['102', 'Jane', 'Mouse', '29.99'],
      ['103', 'John', 'Keyboard', '79.99'],
      ['104', 'Mike', 'Monitor', '399.99'],
      ['105', 'Sarah', 'Headphones', '149.99']
    ]
  }

  const calculationExamples = [
    {
      function: 'COUNT(*)',
      description: 'Total number of orders',
      calculation: '5 rows',
      result: '5'
    },
    {
      function: 'SUM(amount)',
      description: 'Total sales amount',
      calculation: '1299.99 + 29.99 + 79.99 + 399.99 + 149.99',
      result: '1959.95'
    },
    {
      function: 'AVG(amount)',
      description: 'Average order value',
      calculation: '1959.95 ÷ 5',
      result: '391.99'
    },
    {
      function: 'MIN(amount)',
      description: 'Smallest order',
      calculation: 'Lowest value in amount column',
      result: '29.99'
    },
    {
      function: 'MAX(amount)',
      description: 'Largest order',
      calculation: 'Highest value in amount column',
      result: '1299.99'
    }
  ]

  const interviewQuestions = [
    {
      id: 1,
      question: "What is the difference between COUNT(*) and COUNT(column_name)?",
      answer: "COUNT(*) counts all rows including NULL values, while COUNT(column_name) counts only non-NULL values in that specific column. COUNT(*) is typically used for total row count, while COUNT(column) counts rows that have actual data in that column."
    },
    {
      id: 2,
      question: "How does AVG handle NULL values?",
      answer: "AVG ignores NULL values in its calculation. If you have values 10, 20, NULL, the average would be 15 (10+20÷2), not 10 (10+20+0÷3). Only non-NULL numeric values are included in the calculation."
    },
    {
      id: 3,
      question: "Can you use multiple aggregate functions in one query?",
      answer: "Yes! You can use multiple aggregate functions in a single SELECT statement. For example: SELECT COUNT(*), AVG(price), SUM(quantity) FROM products. Each function operates independently on the data."
    }
  ]

  const commonMistakes = [
    {
      mistake: "Using AVG on non-numeric data",
      result: "Error or unexpected results",
      solution: "Only use AVG, SUM, MIN, MAX on numeric columns"
    },
    {
      mistake: "Forgetting NULL handling in COUNT",
      result: "Incorrect counts",
      solution: "Use COUNT(*) for total rows, COUNT(column) for non-null values"
    },
    {
      mistake: "Using aggregate functions without GROUP BY incorrectly",
      result: "SQL errors or wrong results",
      solution: "When using aggregates with non-aggregated columns, use GROUP BY"
    }
  ]

  const activeFunc = aggregateFunctions[activeFunction]

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Aggregate Functions
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Perform calculations on multiple rows and return single values
        </p>
      </section>

      {/* Sample Data */}
      <section className="section-card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Sample Orders Data</h2>
        <TableGrid headers={sampleData.headers} data={sampleData.data} />
      </section>

      {/* Function Selector */}
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {Object.entries(aggregateFunctions).map(([key, func]) => (
          <button
            key={key}
            onClick={() => setActiveFunction(key)}
            className={`p-4 rounded-lg border-2 transition-all ${
              activeFunction === key
                ? 'bg-blue-50 border-blue-500'
                : 'bg-white border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-2">{func.icon}</div>
              <div className="font-semibold text-sm">{func.name}</div>
            </div>
          </button>
        ))}
      </section>

      {/* Active Function Details */}
      <AnimationStage
        key={`function-${animationKey}`}
        title={`${activeFunc.name} Function`}
        onReplay={replayAnimation}
      >
        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-gray-700">{activeFunc.description}</p>
            <p className="text-sm text-gray-600 mt-2">{activeFunc.result}</p>
          </div>

          <div className="space-y-4">
            {activeFunc.examples.map((example, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">{example.title}</h4>
                <CodeBlock code={example.code} delay={index * 0.15} />
              </div>
            ))}
          </div>
        </div>
      </AnimationStage>

      {/* Calculation Examples */}
      <section className="section-card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Visual Calculation Examples</h2>
        <div className="space-y-4">
          {calculationExamples.map((example, index) => (
            <div key={index} className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-blue-700">{example.function}</h4>
                <span className="text-2xl font-bold text-purple-600">{example.result}</span>
              </div>
              <p className="text-sm text-gray-700 mb-1">{example.description}</p>
              <p className="text-xs text-gray-500 font-mono">{example.calculation}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Combined Aggregates */}
      <section className="section-card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Multiple Aggregate Functions</h2>
        <CodeBlock
          code={`-- Get comprehensive order statistics
SELECT
  COUNT(*) as total_orders,
  SUM(amount) as total_sales,
  AVG(amount) as avg_order_value,
  MIN(amount) as min_order,
  MAX(amount) as max_order
FROM orders;`}
          delay={0}
        />
        <div className="mt-4 bg-green-50 p-4 rounded-lg border border-green-200">
          <h4 className="font-semibold text-green-700 mb-2">Result Interpretation:</h4>
          <div className="grid md:grid-cols-5 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">5</div>
              <div className="text-xs text-gray-600">Total Orders</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">1959.95</div>
              <div className="text-xs text-gray-600">Total Sales</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">391.99</div>
              <div className="text-xs text-gray-600">Average</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">29.99</div>
              <div className="text-xs text-gray-600">Minimum</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">1299.99</div>
              <div className="text-xs text-gray-600">Maximum</div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="section-card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Common Mistakes to Avoid</h2>
        <div className="space-y-4">
          {commonMistakes.map((mistake, index) => (
            <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-semibold text-red-700 mb-2">❌ {mistake.mistake}</h4>
              <p className="text-sm text-gray-600 mb-1">⚠️ {mistake.result}</p>
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

      {/* Summary */}
      <section className="section-card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">📋 Summary</h2>
        <div className="space-y-3 text-gray-600">
          <p>✅ Aggregate functions perform calculations on multiple rows</p>
          <p>✅ COUNT returns the number of rows or non-null values</p>
          <p>✅ SUM adds up numeric values</p>
          <p>✅ AVG calculates the average of numeric values</p>
          <p>✅ MIN and MAX find the smallest and largest values</p>
          <p>✅ Multiple aggregates can be used in a single query</p>
        </div>
      </section>
    </div>
  )
}