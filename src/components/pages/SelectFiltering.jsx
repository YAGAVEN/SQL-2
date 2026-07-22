import { useState } from 'react'
import { ChevronDown, ChevronUp, Filter, ArrowUpDown, Hash, Eye } from 'lucide-react'
import CodeBlock from '../animations/CodeBlock'
import AnimationStage from '../animations/AnimationStage'
import TableGrid from '../animations/TableGrid'
import FilterFade from '../animations/FilterFade'
import SortSwap from '../animations/SortSwap'

export default function SelectFiltering() {
  const [showAnswer, setShowAnswer] = useState({})
  const [animationKey, setAnimationKey] = useState(0)
  const [activeClause, setActiveClause] = useState('select')

  const toggleAnswer = (questionId) => {
    setShowAnswer(prev => ({ ...prev, [questionId]: !prev[questionId] }))
  }

  const replayAnimation = () => {
    setAnimationKey(prev => prev + 1)
  }

  const clauses = {
    select: {
      name: 'SELECT',
      icon: <Eye className="w-5 h-5" />,
      description: 'Choose columns to retrieve',
      examples: [
        { title: 'All columns', code: 'SELECT * FROM customers;' },
        { title: 'Specific columns', code: 'SELECT first_name, last_name FROM customers;' },
        { title: 'With alias', code: 'SELECT first_name AS name FROM customers;' }
      ]
    },
    where: {
      name: 'WHERE',
      icon: <Filter className="w-5 h-5" />,
      description: 'Filter rows based on conditions',
      examples: [
        { title: 'Simple condition', code: "SELECT * FROM customers WHERE age > 25;" },
        { title: 'Multiple conditions', code: "SELECT * FROM customers WHERE age > 25 AND country = 'USA';" },
        { title: 'Pattern matching', code: "SELECT * FROM customers WHERE first_name LIKE 'J%';" }
      ]
    },
    orderBy: {
      name: 'ORDER BY',
      icon: <ArrowUpDown className="w-5 h-5" />,
      description: 'Sort result sets',
      examples: [
        { title: 'Ascending', code: 'SELECT * FROM customers ORDER BY age ASC;' },
        { title: 'Descending', code: 'SELECT * FROM customers ORDER BY age DESC;' },
        { title: 'Multiple columns', code: 'SELECT * FROM customers ORDER BY country, age DESC;' }
      ]
    },
    distinct: {
      name: 'DISTINCT',
      icon: <Hash className="w-5 h-5" />,
      description: 'Remove duplicate rows',
      examples: [
        { title: 'Unique values', code: 'SELECT DISTINCT country FROM customers;' },
        { title: 'Unique combinations', code: 'SELECT DISTINCT country, age FROM customers;' }
      ]
    },
    limit: {
      name: 'LIMIT',
      icon: <Hash className="w-5 h-5" />,
      description: 'Restrict number of rows returned',
      examples: [
        { title: 'First N rows', code: 'SELECT * FROM customers LIMIT 5;' },
        { title: 'With offset', code: 'SELECT * FROM customers LIMIT 5 OFFSET 10;' }
      ]
    }
  }

  const operators = [
    { symbol: '=', name: 'Equal', example: "age = 25" },
    { symbol: '<>', name: 'Not equal', example: "age <> 25" },
    { symbol: '>', name: 'Greater than', example: "age > 25" },
    { symbol: '<', name: 'Less than', example: "age < 25" },
    { symbol: '>=', name: 'Greater or equal', example: "age >= 25" },
    { symbol: '<=', name: 'Less or equal', example: "age <= 25" },
    { symbol: 'AND', name: 'Logical AND', example: "age > 25 AND country = 'USA'" },
    { symbol: 'OR', name: 'Logical OR', example: "age < 25 OR age > 60" },
    { symbol: 'IN', name: 'In list', example: "country IN ('USA', 'UK', 'Canada')" },
    { symbol: 'LIKE', name: 'Pattern match', example: "first_name LIKE 'J%'" },
    { symbol: 'BETWEEN', name: 'Range', example: "age BETWEEN 25 AND 35" },
    { symbol: 'IS NULL', name: 'Null check', example: "email IS NULL" }
  ]

  const interviewQuestions = [
    {
      id: 1,
      question: "What is the difference between WHERE and HAVING?",
      answer: "WHERE filters individual rows before GROUP BY, while HAVING filters grouped results after aggregation. WHERE works with row-level data, HAVING works with aggregate functions."
    },
    {
      id: 2,
      question: "How does LIKE work for pattern matching?",
      answer: "LIKE uses wildcard characters: '%' matches any sequence of characters, '_' matches a single character. 'J%' finds strings starting with J, '%@gmail.com' finds Gmail addresses, '_a%' finds strings where 'a' is the second character."
    },
    {
      id: 3,
      question: "What's the difference between = and IN?",
      answer: "= compares against a single value, while IN compares against a list of values. IN is essentially shorthand for multiple OR conditions with = comparisons."
    }
  ]

  const sampleData = {
    headers: ['ID', 'Name', 'Age', 'Country'],
    data: [
      ['1', 'John Doe', '28', 'USA'],
      ['2', 'Jane Smith', '32', 'UK'],
      ['3', 'Mike Johnson', '25', 'Canada'],
      ['4', 'Sarah Williams', '29', 'USA'],
      ['5', 'David Brown', '35', 'Australia']
    ]
  }

  const whereAnimationData = [
    { data: 'John Doe - 28 - USA', passes: true },
    { data: 'Jane Smith - 32 - UK', passes: false },
    { data: 'Mike Johnson - 25 - Canada', passes: false },
    { data: 'Sarah Williams - 29 - USA', passes: true },
    { data: 'David Brown - 35 - Australia', passes: false }
  ]

  const sortAnimationData = [
    { id: 1, data: 'Mike Johnson - 25' },
    { id: 2, data: 'John Doe - 28' },
    { id: 3, data: 'Sarah Williams - 29' },
    { id: 4, data: 'Jane Smith - 32' },
    { id: 5, data: 'David Brown - 35' }
  ]

  const activeClauseData = clauses[activeClause]

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          SELECT & Filtering
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Learn to retrieve and filter data effectively
        </p>
      </section>

      {/* Sample Table */}
      <section className="section-card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Sample Data</h2>
        <TableGrid headers={sampleData.headers} data={sampleData.data} />
      </section>

      {/* Clause Selector */}
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {Object.entries(clauses).map(([key, clause]) => (
          <button
            key={key}
            onClick={() => setActiveClause(key)}
            className={`p-4 rounded-lg border-2 transition-all ${
              activeClause === key
                ? 'bg-blue-50 border-blue-500'
                : 'bg-white border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-2">{clause.icon}</div>
              <div className="font-semibold text-sm">{clause.name}</div>
            </div>
          </button>
        ))}
      </section>

      {/* Active Clause Details */}
      <AnimationStage
        key={`clause-${animationKey}`}
        title={`${activeClauseData.name} Clause`}
        onReplay={replayAnimation}
      >
        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-gray-700">{activeClauseData.description}</p>
          </div>

          <div className="space-y-4">
            {activeClauseData.examples.map((example, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">{example.title}</h4>
                <CodeBlock code={example.code} delay={index * 0.15} />
              </div>
            ))}
          </div>
        </div>
      </AnimationStage>

      {/* WHERE Operators */}
      <section className="section-card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">WHERE Clause Operators</h2>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-3">
          {operators.map((op, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
              <code className="text-sm font-semibold text-blue-600">{op.symbol}</code>
              <p className="text-xs text-gray-600 mt-1">{op.name}</p>
              <p className="text-xs text-gray-500 mt-1 font-mono">{op.example}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Filter Animation */}
      <section className="section-card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">WHERE Filtering Animation</h2>
        <AnimationStage
          key={`filter-${animationKey}`}
          title="Watch WHERE filter rows in action"
          onReplay={replayAnimation}
        >
          <FilterFade
            key={`filter-anim-${animationKey}`}
            rows={whereAnimationData}
            condition="age > 25 AND country = 'USA'"
            delay={0}
          />
        </AnimationStage>
      </section>

      {/* Sort Animation */}
      <section className="section-card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">ORDER BY Sorting Animation</h2>
        <AnimationStage
          key={`sort-${animationKey}`}
          title="Watch ORDER BY sort the results"
          onReplay={replayAnimation}
        >
          <SortSwap
            key={`sort-anim-${animationKey}`}
            items={sortAnimationData}
            sortKey="age"
            ascending={true}
            delay={0}
          />
        </AnimationStage>
      </section>

      {/* Complex Example */}
      <section className="section-card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Complex Query Example</h2>
        <CodeBlock
          code={`-- Find US customers over 25, sorted by age
SELECT
  first_name,
  last_name,
  age
FROM customers
WHERE country = 'USA' AND age > 25
ORDER BY age ASC
LIMIT 10;`}
          delay={0}
        />
        <div className="mt-4 bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-700 mb-2">Query Breakdown:</h4>
          <ul className="space-y-1 text-sm text-gray-700">
            <li>🔹 <strong>SELECT</strong>: Gets name and age columns</li>
            <li>🔹 <strong>FROM</strong>: Searches customers table</li>
            <li>🔹 <strong>WHERE</strong>: Only US customers over 25</li>
            <li>🔹 <strong>ORDER BY</strong>: Sorts by age (youngest first)</li>
            <li>🔹 <strong>LIMIT</strong>: Returns maximum 10 results</li>
          </ul>
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
          <p>✅ SELECT specifies which columns to retrieve</p>
          <p>✅ WHERE filters rows based on conditions</p>
          <p>✅ ORDER BY sorts the result set</p>
          <p>✅ DISTINCT removes duplicate values</p>
          <p>✅ LIMIT restricts the number of rows returned</p>
          <p>✅ Combine clauses to build powerful queries</p>
        </div>
      </section>
    </div>
  )
}