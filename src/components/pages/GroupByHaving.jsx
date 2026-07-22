import { useState } from 'react'
import { ChevronDown, ChevronUp, Group, Filter, Users } from 'lucide-react'
import CodeBlock from '../animations/CodeBlock'
import AnimationStage from '../animations/AnimationStage'
import TableGrid from '../animations/TableGrid'
import GroupMerge from '../animations/GroupMerge'

export default function GroupByHaving() {
  const [showAnswer, setShowAnswer] = useState({})
  const [animationKey, setAnimationKey] = useState(0)

  const toggleAnswer = (questionId) => {
    setShowAnswer(prev => ({ ...prev, [questionId]: !prev[questionId] }))
  }

  const replayAnimation = () => {
    setAnimationKey(prev => prev + 1)
  }

  const sampleData = {
    headers: ['Customer', 'Country', 'Order Amount'],
    data: [
      ['John', 'USA', '150'],
      ['Jane', 'UK', '200'],
      ['Mike', 'USA', '75'],
      ['Sarah', 'USA', '300'],
      ['David', 'UK', '125']
    ]
  }

  const groupAnimationData = [
    {
      key: 'USA',
      items: ['John: $150', 'Mike: $75', 'Sarah: $300'],
      count: 3
    },
    {
      key: 'UK',
      items: ['Jane: $200', 'David: $125'],
      count: 2
    }
  ]

  const interviewQuestions = [
    {
      id: 1,
      question: "What is the difference between WHERE and HAVING?",
      answer: "WHERE filters individual rows before GROUP BY, while HAVING filters grouped results after aggregation. WHERE works with row-level conditions, HAVING works with aggregate functions like COUNT, SUM, AVG."
    },
    {
      id: 2,
      question: "Can you use GROUP BY without aggregate functions?",
      answer: "Technically yes, but it's rarely useful. GROUP BY without aggregates just returns unique rows, similar to DISTINCT. Most GROUP BY queries include aggregate functions to summarize grouped data."
    },
    {
      id: 3,
      question: "What happens if you include a column in SELECT that's not in GROUP BY?",
      answer: "In most databases, this causes an error. All non-aggregated columns in SELECT must appear in GROUP BY. Some databases like MySQL may return arbitrary values, but this is unreliable."
    }
  ]

  const groupByExample = `-- Group by country and calculate statistics
SELECT
  country,
  COUNT(*) as customer_count,
  SUM(amount) as total_sales,
  AVG(amount) as avg_order_value
FROM customers
GROUP BY country
ORDER BY total_sales DESC;`

  const havingExample = `-- Find countries with total sales over 500
SELECT
  country,
  SUM(amount) as total_sales
FROM customers
GROUP BY country
HAVING SUM(amount) > 500
ORDER BY total_sales DESC;`

  const executionOrder = [
    { step: 1, phase: 'FROM', description: 'Choose the table' },
    { step: 2, phase: 'WHERE', description: 'Filter rows before grouping' },
    { step: 3, phase: 'GROUP BY', description: 'Group rows by specified columns' },
    { step: 4, phase: 'HAVING', description: 'Filter groups after aggregation' },
    { step: 5, phase: 'SELECT', description: 'Select columns and aggregates' },
    { step: 6, phase: 'ORDER BY', description: 'Sort the final results' }
  ]

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          GROUP BY & HAVING
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Learn to group data and filter grouped results
        </p>
      </section>

      {/* Story Analogy */}
      <section className="section-card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">📚 The Story Analogy</h2>
        <div className="prose max-w-none">
          <p className="text-gray-600 mb-4">
            Imagine you're organizing a large conference with attendees from different countries.
            Instead of looking at each attendee individually, you want to <strong>group</strong> them by country
            and see statistics like how many people came from each country.
          </p>
          <p className="text-gray-600">
            GROUP BY works the same way - it organizes rows into groups based on common values,
            then lets you perform calculations on each group.
          </p>
        </div>
      </section>

      {/* Sample Data */}
      <section className="section-card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Sample Customer Data</h2>
        <TableGrid headers={sampleData.headers} data={sampleData.data} />
      </section>

      {/* GROUP BY Animation */}
      <section className="section-card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">GROUP BY Animation</h2>
        <AnimationStage
          key={`groupby-${animationKey}`}
          title="Watch GROUP BY organize data"
          onReplay={replayAnimation}
        >
          <GroupMerge
            key={`groupby-anim-${animationKey}`}
            groups={groupAnimationData}
            groupBy="country"
            delay={0}
          />
        </AnimationStage>
      </section>

      {/* GROUP BY Basics */}
      <section className="section-card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">GROUP BY Basics</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <Group className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-blue-700">GROUP BY Purpose</h3>
            </div>
            <p className="text-sm text-gray-700">
              Organizes rows into groups based on common column values
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-green-700">With Aggregates</h3>
            </div>
            <p className="text-sm text-gray-700">
              Performs calculations on each group separately
            </p>
          </div>
        </div>
        <CodeBlock code={groupByExample} delay={0} />
        <div className="mt-4 bg-green-50 p-4 rounded-lg border border-green-200">
          <h4 className="font-semibold text-green-700 mb-2">Expected Results:</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded">
              <div className="font-semibold text-gray-900">USA</div>
              <div className="text-sm text-gray-600">3 customers, $525 total</div>
            </div>
            <div className="bg-white p-3 rounded">
              <div className="font-semibold text-gray-900">UK</div>
              <div className="text-sm text-gray-600">2 customers, $325 total</div>
            </div>
          </div>
        </div>
      </section>

      {/* HAVING Clause */}
      <section className="section-card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">HAVING Clause</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <div className="flex items-center gap-2 mb-2">
              <Filter className="w-5 h-5 text-yellow-600" />
              <h3 className="font-semibold text-yellow-700">HAVING vs WHERE</h3>
            </div>
            <p className="text-sm text-gray-700">
              WHERE filters rows before grouping, HAVING filters groups after aggregation
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold text-purple-700">Aggregate Filtering</h3>
            </div>
            <p className="text-sm text-gray-700">
              HAVING can filter based on aggregate function results
            </p>
          </div>
        </div>
        <CodeBlock code={havingExample} delay={0} />
        <div className="mt-4 bg-purple-50 p-4 rounded-lg border border-purple-200">
          <h4 className="font-semibold text-purple-700 mb-2">Result:</h4>
          <p className="text-gray-700">Only USA group shown (total sales: $525 &gt; $500)</p>
        </div>
      </section>

      {/* Execution Order */}
      <section className="section-card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Query Execution Order</h2>
        <div className="space-y-2">
          {executionOrder.map((step) => (
            <div key={step.step} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                {step.step}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900">{step.phase}</div>
                <div className="text-sm text-gray-600">{step.description}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section-card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">WHERE vs HAVING Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border border-gray-300">Feature</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border border-gray-300">WHERE</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border border-gray-300">HAVING</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-700 border border-gray-200">Timing</td>
                <td className="px-4 py-3 text-sm text-gray-600 border border-gray-200">Before GROUP BY</td>
                <td className="px-4 py-3 text-sm text-gray-600 border border-gray-200">After GROUP BY</td>
              </tr>
              <tr className="bg-white hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-700 border border-gray-200">Filters</td>
                <td className="px-4 py-3 text-sm text-gray-600 border border-gray-200">Individual rows</td>
                <td className="px-4 py-3 text-sm text-gray-600 border border-gray-200">Grouped results</td>
              </tr>
              <tr className="bg-white hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-700 border border-gray-200">Can use aggregates</td>
                <td className="px-4 py-3 text-sm text-red-600 border border-gray-200">❌ No</td>
                <td className="px-4 py-3 text-sm text-green-600 border border-gray-200">✅ Yes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="section-card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Common Mistakes to Avoid</h2>
        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-semibold text-red-700 mb-2">❌ Forgetting GROUP BY column in SELECT</h4>
            <CodeBlock
              code="-- Wrong: country not in GROUP BY\nSELECT country, COUNT(*) FROM customers;"
              delay={0}
            />
            <p className="text-sm text-green-600 mt-2">✅ Always include non-aggregated columns in GROUP BY</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-semibold text-red-700 mb-2">❌ Using WHERE with aggregate functions</h4>
            <CodeBlock
              code="-- Wrong: WHERE with aggregate\nSELECT country, COUNT(*) \nFROM customers \nWHERE COUNT(*) > 2 \nGROUP BY country;"
              delay={0.1}
            />
            <p className="text-sm text-green-600 mt-2">✅ Use HAVING for aggregate filtering</p>
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
          <p>✅ GROUP BY organizes rows into groups based on common values</p>
          <p>✅ Use aggregate functions with GROUP BY to calculate group statistics</p>
          <p>✅ HAVING filters groups after aggregation</p>
          <p>✅ WHERE filters rows before grouping</p>
          <p>✅ Execution order: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY</p>
          <p>✅ Always include non-aggregated SELECT columns in GROUP BY</p>
        </div>
      </section>
    </div>
  )
}