import { useState } from 'react'
import { ChevronDown, ChevronUp, Plus, Edit, Trash } from 'lucide-react'
import CodeBlock from '../animations/CodeBlock'
import AnimationStage from '../animations/AnimationStage'
import TableGrid from '../animations/TableGrid'

export default function Crud() {
  const [showAnswer, setShowAnswer] = useState({})
  const [animationKey, setAnimationKey] = useState(0)
  const [activeOperation, setActiveOperation] = useState('create')

  const toggleAnswer = (questionId) => {
    setShowAnswer(prev => ({ ...prev, [questionId]: !prev[questionId] }))
  }

  const replayAnimation = () => {
    setAnimationKey(prev => prev + 1)
  }

  const operations = {
    create: {
      name: 'CREATE',
      icon: <Plus className="w-6 h-6" />,
      color: 'green',
      description: 'Add new records to a table',
      examples: [
        {
          title: 'Insert single row',
          code: `INSERT INTO customers (first_name, last_name, age, country)\nVALUES ('John', 'Doe', 28, 'USA');`
        },
        {
          title: 'Insert multiple rows',
          code: `INSERT INTO customers (first_name, last_name, age)\nVALUES \n  ('Jane', 'Smith', 32),\n  ('Mike', 'Johnson', 25),\n  ('Sarah', 'Williams', 29);`
        },
        {
          title: 'Insert with specific columns',
          code: `INSERT INTO customers (first_name, country)\nVALUES ('David', 'Canada');`
        }
      ]
    },
    read: {
      name: 'READ',
      icon: <Edit className="w-6 h-6" />,
      color: 'blue',
      description: 'Retrieve data from database',
      examples: [
        {
          title: 'Select all columns',
          code: `SELECT * FROM customers;`
        },
        {
          title: 'Select specific columns',
          code: `SELECT first_name, last_name FROM customers;`
        },
        {
          title: 'Select with conditions',
          code: `SELECT * FROM customers WHERE age > 25;`
        }
      ]
    },
    update: {
      name: 'UPDATE',
      icon: <Edit className="w-6 h-6" />,
      color: 'yellow',
      description: 'Modify existing records',
      examples: [
        {
          title: 'Update single column',
          code: `UPDATE customers\nSET age = 29\nWHERE customer_id = 1;`
        },
        {
          title: 'Update multiple columns',
          code: `UPDATE customers\nSET age = 30, country = 'Canada'\nWHERE customer_id = 2;`
        },
        {
          title: 'Update with condition',
          code: `UPDATE customers\nSET country = 'USA'\nWHERE country = 'US';`
        }
      ]
    },
    delete: {
      name: 'DELETE',
      icon: <Trash className="w-6 h-6" />,
      color: 'red',
      description: 'Remove records from database',
      examples: [
        {
          title: 'Delete specific row',
          code: `DELETE FROM customers\nWHERE customer_id = 1;`
        },
        {
          title: 'Delete with condition',
          code: `DELETE FROM customers\nWHERE age < 18;`
        },
        {
          title: 'Delete all rows (careful!)',
          code: `DELETE FROM customers;\n-- This removes ALL rows!`
        }
      ]
    }
  }

  const interviewQuestions = [
    {
      id: 1,
      question: "What is the difference between DELETE and TRUNCATE?",
      answer: "DELETE is a DML operation that can be rolled back, fires triggers, and operates on rows individually. TRUNCATE is a DDL operation that cannot be rolled back, doesn't fire triggers, resets identity values, and is faster for large tables."
    },
    {
      id: 2,
      question: "Can UPDATE affect multiple rows at once?",
      answer: "Yes! UPDATE can modify multiple rows that match the WHERE condition. Always be careful with UPDATE statements - test your WHERE clause first with a SELECT to ensure you're updating the right rows."
    },
    {
      id: 3,
      question: "What happens if you omit the WHERE clause in UPDATE or DELETE?",
      answer: "The operation affects ALL rows in the table! This is dangerous. Always include a WHERE clause unless you intentionally want to modify/delete every row. Many developers recommend writing the WHERE clause before the UPDATE/DELETE keyword."
    }
  ]

  const commonMistakes = [
    {
      mistake: "Forgetting WHERE clause in UPDATE/DELETE",
      consequence: "Updates or deletes all rows in the table",
      solution: "Always double-check your WHERE clause"
    },
    {
      mistake: "Wrong column order in INSERT",
      consequence: "Data goes into wrong columns",
      solution: "Specify column names explicitly"
    },
    {
      mistake: "Not considering NULL values in UPDATE",
      consequence: "Unexpected results when filtering",
      solution: "Use IS NULL/IS NOT NULL for NULL checks"
    }
  ]

  const activeOp = operations[activeOperation]

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          CRUD Operations
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Master the four fundamental database operations: Create, Read, Update, Delete
        </p>
      </section>

      {/* CRUD Overview */}
      <section className="section-card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">CRUD Overview</h2>
        <div className="grid md:grid-cols-4 gap-4">
          {Object.entries(operations).map(([key, op]) => (
            <div key={key} className="text-center">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl mb-3 ${
                key === 'create' ? 'bg-green-100' :
                key === 'read' ? 'bg-blue-100' :
                key === 'update' ? 'bg-yellow-100' : 'bg-red-100'
              }`}>
                {op.icon}
              </div>
              <h3 className="font-semibold text-gray-900">{op.name}</h3>
              <p className="text-sm text-gray-600">{op.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Operation Selector */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(operations).map(([key, op]) => (
          <button
            key={key}
            onClick={() => setActiveOperation(key)}
            className={`p-4 rounded-lg border-2 transition-all ${
              activeOperation === key
                ? 'bg-blue-50 border-blue-500'
                : 'bg-white border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-2">{op.icon}</div>
              <div className="font-semibold text-sm">{op.name}</div>
            </div>
          </button>
        ))}
      </section>

      {/* Active Operation Details */}
      <AnimationStage
        key={`crud-${animationKey}`}
        title={`${activeOp.name} Operation`}
        onReplay={replayAnimation}
      >
        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-gray-700">{activeOp.description}</p>
          </div>

          <div className="space-y-4">
            {activeOp.examples.map((example, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">{example.title}</h4>
                <CodeBlock code={example.code} delay={index * 0.15} />
              </div>
            ))}
          </div>
        </div>
      </AnimationStage>

      {/* CRUD Animation Example */}
      <section className="section-card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">CRUD Animation Example</h2>
        <AnimationStage
          key={`crud-demo-${animationKey}`}
          title="Watch CRUD operations in action"
          onReplay={replayAnimation}
        >
          <div className="space-y-4">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Customers Table</h4>
              <TableGrid
                key={`crud-table-${animationKey}`}
                headers={['ID', 'Name', 'Age', 'Country']}
                data={[
                  ['1', 'John Doe', '28', 'USA'],
                  ['2', 'Jane Smith', '32', 'UK'],
                  ['3', 'Mike Johnson', '25', 'Canada']
                ]}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <Plus className="w-4 h-4 text-green-600" />
                  <span className="font-medium text-green-700">CREATE</span>
                </div>
                <p className="text-xs text-gray-600">Add: INSERT new customers</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <Edit className="w-4 h-4 text-blue-600" />
                  <span className="font-medium text-blue-700">READ</span>
                </div>
                                        <p className="text-xs text-gray-600">View: SELECT customers</p>
              </div>
              <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                <div className="flex items-center gap-2 mb-2">
                  <Edit className="w-4 h-4 text-yellow-600" />
                  <span className="font-medium text-yellow-700">UPDATE</span>
                </div>
                <p className="text-xs text-gray-600">Change: UPDATE customer info</p>
              </div>
              <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                <div className="flex items-center gap-2 mb-2">
                  <Trash className="w-4 h-4 text-red-600" />
                  <span className="font-medium text-red-700">DELETE</span>
                </div>
                <p className="text-xs text-gray-600">Remove: DELETE customers</p>
              </div>
            </div>
          </div>
        </AnimationStage>
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

      {/* Summary */}
      <section className="section-card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">📋 Summary</h2>
        <div className="space-y-3 text-gray-600">
          <p>✅ CRUD represents the four basic operations of persistent storage</p>
          <p>✅ CREATE (INSERT) adds new records to the database</p>
          <p>✅ READ (SELECT) retrieves data from the database</p>
          <p>✅ UPDATE modifies existing records in the database</p>
          <p>✅ DELETE removes records from the database</p>
          <p>✅ Always use WHERE clauses carefully in UPDATE and DELETE operations</p>
        </div>
      </section>
    </div>
  )
}