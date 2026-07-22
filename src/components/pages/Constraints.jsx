import { useState } from 'react'
import { ChevronDown, ChevronUp, Shield, Key, Ban, CheckCircle, Star } from 'lucide-react'
import CodeBlock from '../animations/CodeBlock'
import AnimationStage from '../animations/AnimationStage'
import TableGrid from '../animations/TableGrid'

export default function Constraints() {
  const [showAnswer, setShowAnswer] = useState({})
  const [animationKey, setAnimationKey] = useState(0)
  const [activeConstraint, setActiveConstraint] = useState('primary')

  const toggleAnswer = (questionId) => {
    setShowAnswer(prev => ({ ...prev, [questionId]: !prev[questionId] }))
  }

  const replayAnimation = () => {
    setAnimationKey(prev => prev + 1)
  }

  const constraints = {
    primary: {
      name: 'PRIMARY KEY',
      icon: <Key className="w-5 h-5" />,
      color: 'blue',
      description: 'Uniquely identifies each record in a table',
      rules: ['Must contain unique values', 'Cannot contain NULL values', 'Each table can have only one PRIMARY KEY'],
      example: `CREATE TABLE customers (\n  customer_id INT PRIMARY KEY,\n  name VARCHAR(50)\n);`,
      violationExample: `-- This would fail: duplicate key\nINSERT INTO customers VALUES (1, 'John');\nINSERT INTO customers VALUES (1, 'Jane'); -- ERROR!`
    },
    foreign: {
      name: 'FOREIGN KEY',
      icon: <Shield className="w-5 h-5" />,
      color: 'green',
      description: 'Links data between tables',
      rules: ['Must match an existing value in referenced table', 'Enforces referential integrity', 'Can be NULL unless specified otherwise'],
      example: `CREATE TABLE orders (\n  order_id INT PRIMARY KEY,\n  customer_id INT,\n  FOREIGN KEY (customer_id) REFERENCES customers(customer_id)\n);`,
      violationExample: `-- This would fail: customer_id doesn't exist\nINSERT INTO orders VALUES (1, 999); -- ERROR!`
    },
    unique: {
      name: 'UNIQUE',
      icon: <Star className="w-5 h-5" />,
      color: 'purple',
      description: 'Ensures all values in a column are different',
      rules: ['All values must be unique', 'Allows one NULL value (in some databases)', 'Multiple UNIQUE constraints per table'],
      example: `CREATE TABLE customers (\n  id INT PRIMARY KEY,\n  email VARCHAR(100) UNIQUE\n);`,
      violationExample: `-- This would fail: duplicate email\nINSERT INTO customers VALUES (1, 'john@email.com');\nINSERT INTO customers VALUES (2, 'john@email.com'); -- ERROR!`
    },
    notNull: {
      name: 'NOT NULL',
      icon: <Ban className="w-5 h-5" />,
      color: 'red',
      description: 'Ensures a column cannot have NULL value',
      rules: ['Column must have a value', 'Enforced at INSERT and UPDATE', 'Multiple NOT NULL constraints per table'],
      example: `CREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50) NOT NULL\n);`,
      violationExample: `-- This would fail: missing required value\nINSERT INTO customers (id) VALUES (1); -- ERROR!`
    },
    check: {
      name: 'CHECK',
      icon: <CheckCircle className="w-5 h-5" />,
      color: 'yellow',
      description: 'Ensures values meet a specific condition',
      rules: ['Custom boolean expression', 'Can reference multiple columns', 'Evaluated for INSERT/UPDATE'],
      example: `CREATE TABLE customers (\n  id INT PRIMARY KEY,\n  age INT CHECK (age >= 18 AND age <= 100)\n);`,
      violationExample: `-- This would fail: age condition violated\nINSERT INTO customers VALUES (1, 15); -- ERROR!`
    }
  }

  const interviewQuestions = [
    {
      id: 1,
      question: "What is the difference between PRIMARY KEY and UNIQUE?",
      answer: "PRIMARY KEY automatically creates a UNIQUE constraint and NOT NULL constraint, while UNIQUE allows NULL values (in most databases). A table can have only one PRIMARY KEY but multiple UNIQUE constraints."
    },
    {
      id: 2,
      question: "Can a FOREIGN KEY be NULL?",
      answer: "Yes, unless explicitly declared as NOT NULL. A NULL foreign key means no relationship is established, whereas a non-NULL value must reference an existing primary key in the related table."
    },
    {
      id: 3,
      question: "What happens if you try to delete a row that's referenced by a FOREIGN KEY?",
      answer: "By default, the database prevents deletion. You can specify ON DELETE CASCADE (automatically delete related rows), ON DELETE SET NULL (set foreign key to NULL), or ON DELETE SET DEFAULT (set to default value)."
    }
  ]

  const tableOperations = [
    {
      operation: 'CREATE TABLE',
      description: 'Creates a new table with specified structure',
      example: `CREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50) NOT NULL,\n  email VARCHAR(100) UNIQUE\n);`
    },
    {
      operation: 'ALTER TABLE',
      description: 'Modifies existing table structure',
      example: `-- Add column\nALTER TABLE customers ADD age INT;\n\n-- Drop column\nALTER TABLE customers DROP COLUMN age;`
    },
    {
      operation: 'DROP TABLE',
      description: 'Removes table and all its data permanently',
      example: `DROP TABLE customers; -- Be careful!`
    }
  ]

  const activeConstraintData = constraints[activeConstraint]

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Constraints & Table Operations
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Learn how to enforce data integrity and manage database structures
        </p>
      </section>

      {/* Constraint Types */}
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {Object.entries(constraints).map(([key, constraint]) => (
          <button
            key={key}
            onClick={() => setActiveConstraint(key)}
            className={`p-4 rounded-lg border-2 transition-all ${
              activeConstraint === key
                ? `bg-${constraint.color}-50 border-${constraint.color}-300`
                : 'bg-white border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-2">{constraint.icon}</div>
              <div className="font-semibold text-sm">{constraint.name}</div>
            </div>
          </button>
        ))}
      </section>

      {/* Active Constraint Details */}
      <AnimationStage
        key={`constraint-${animationKey}`}
        title={activeConstraintData.name}
        onReplay={replayAnimation}
      >
        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-gray-700">{activeConstraintData.description}</p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Rules:</h4>
            <ul className="space-y-2">
              {activeConstraintData.rules.map((rule, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
                  <span className="text-gray-700">{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">✅ Correct Usage:</h4>
            <CodeBlock code={activeConstraintData.example} delay={0} />
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">❌ Constraint Violation:</h4>
            <CodeBlock code={activeConstraintData.violationExample} delay={0.2} />
          </div>
        </div>
      </AnimationStage>

      {/* Table Operations */}
      <section className="section-card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Table Operations</h2>
        <div className="space-y-6">
          {tableOperations.map((op, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">{op.operation}</h4>
              <p className="text-sm text-gray-600 mb-3">{op.description}</p>
              <CodeBlock code={op.example} delay={index * 0.1} />
            </div>
          ))}
        </div>
      </section>

      {/* Constraint Violation Animation */}
      <section className="section-card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Constraint Violation Animation</h2>
        <AnimationStage
          key={`violation-${animationKey}`}
          title="Try inserting invalid data"
          onReplay={replayAnimation}
        >
          <div className="space-y-4">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Customers Table (email must be UNIQUE)</h4>
              <TableGrid
                key={`violation-table-${animationKey}`}
                headers={['ID', 'Name', 'Email']}
                data={[
                  ['1', 'John', 'john@email.com'],
                  ['2', 'Jane', 'jane@email.com']
                ]}
              />
            </div>

            <div className="flex items-center gap-4">
              <CodeBlock
                code="INSERT INTO customers VALUES (3, 'Mike', 'john@email.com');"
                delay={0.5}
              />
              <div className="text-red-600 font-semibold">❌ ERROR: Duplicate email!</div>
            </div>
          </div>
        </AnimationStage>
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
          <p>✅ Constraints enforce data integrity at database level</p>
          <p>✅ PRIMARY KEY uniquely identifies each row</p>
          <p>✅ FOREIGN KEY establishes relationships between tables</p>
          <p>✅ UNIQUE ensures all values are different</p>
          <p>✅ NOT NULL prevents missing values</p>
          <p>✅ CHECK validates data against conditions</p>
        </div>
      </section>
    </div>
  )
}