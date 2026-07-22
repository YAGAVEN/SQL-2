import { useState } from 'react'
import { ChevronDown, ChevronUp, FolderOpen, Edit, Search, Shield, RefreshCw } from 'lucide-react'
import CodeBlock from '../animations/CodeBlock'
import AnimationStage from '../animations/AnimationStage'

export default function CommandTypes() {
  const [showAnswer, setShowAnswer] = useState({})
  const [activeCategory, setActiveCategory] = useState('ddl')

  const toggleAnswer = (questionId) => {
    setShowAnswer(prev => ({ ...prev, [questionId]: !prev[questionId] }))
  }

  const commandCategories = {
    ddl: {
      name: 'DDL',
      fullName: 'Data Definition Language',
      icon: <FolderOpen className="w-6 h-6" />,
      description: 'Defines database structures and schemas',
      color: 'blue',
      commands: [
        {
          name: 'CREATE',
          description: 'Creates new database objects (tables, views, indexes)',
          example: 'CREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);'
        },
        {
          name: 'ALTER',
          description: 'Modifies existing database objects',
          example: 'ALTER TABLE customers ADD email VARCHAR(100);'
        },
        {
          name: 'DROP',
          description: 'Deletes database objects permanently',
          example: 'DROP TABLE customers;'
        },
        {
          name: 'TRUNCATE',
          description: 'Removes all rows from a table but keeps the structure',
          example: 'TRUNCATE TABLE customers;'
        }
      ]
    },
    dml: {
      name: 'DML',
      fullName: 'Data Manipulation Language',
      icon: <Edit className="w-6 h-6" />,
      description: 'Manages data within database objects',
      color: 'green',
      commands: [
        {
          name: 'INSERT',
          description: 'Adds new rows to a table',
          example: 'INSERT INTO customers (name, email) VALUES (\'John\', \'john@email.com\');'
        },
        {
          name: 'UPDATE',
          description: 'Modifies existing data in a table',
          example: 'UPDATE customers SET email = \'new@email.com\' WHERE id = 1;'
        },
        {
          name: 'DELETE',
          description: 'Removes rows from a table',
          example: 'DELETE FROM customers WHERE id = 1;'
        }
      ]
    },
    dql: {
      name: 'DQL',
      fullName: 'Data Query Language',
      icon: <Search className="w-6 h-6" />,
      description: 'Retrieves data from database',
      color: 'purple',
      commands: [
        {
          name: 'SELECT',
          description: 'Queries and retrieves data from one or more tables',
          example: 'SELECT name, email FROM customers WHERE country = \'USA\';'
        }
      ]
    },
    dcl: {
      name: 'DCL',
      fullName: 'Data Control Language',
      icon: <Shield className="w-6 h-6" />,
      description: 'Controls access to database data',
      color: 'red',
      commands: [
        {
          name: 'GRANT',
          description: 'Gives user permissions to access data',
          example: 'GRANT SELECT, INSERT ON customers TO user_name;'
        },
        {
          name: 'REVOKE',
          description: 'Removes user permissions',
          example: 'REVOKE INSERT ON customers FROM user_name;'
        }
      ]
    },
    tcl: {
      name: 'TCL',
      fullName: 'Transaction Control Language',
      icon: <RefreshCw className="w-6 h-6" />,
      description: 'Manages transactions in database',
      color: 'yellow',
      commands: [
        {
          name: 'COMMIT',
          description: 'Saves all changes made during transaction',
          example: 'COMMIT;'
        },
        {
          name: 'ROLLBACK',
          description: 'Undoes changes made during transaction',
          example: 'ROLLBACK;'
        },
        {
          name: 'SAVEPOINT',
          description: 'Creates points within transactions to rollback to',
          example: 'SAVEPOINT save_point_name;'
        }
      ]
    }
  }

  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 text-blue-700',
    green: 'bg-green-50 border-green-200 text-green-700',
    purple: 'bg-purple-50 border-purple-200 text-purple-700',
    red: 'bg-red-50 border-red-200 text-red-700',
    yellow: 'bg-yellow-50 border-yellow-200 text-yellow-700'
  }

  const interviewQuestions = [
    {
      id: 1,
      question: "What is the difference between DELETE and TRUNCATE?",
      answer: "DELETE is a DML operation that can be rolled back, operates on rows individually, and triggers constraints. TRUNCATE is a DDL operation that cannot be rolled back, is faster, resets identity values, and doesn't fire triggers."
    },
    {
      id: 2,
      question: "Can DDL commands be rolled back?",
      answer: "Generally, DDL commands cannot be rolled back because they perform auto-commit. However, some databases like Oracle allow rolling back DDL commands within transactions."
    },
    {
      id: 3,
      question: "What happens when you use COMMIT vs ROLLBACK?",
      answer: "COMMIT saves all changes made in the current transaction, making them permanent and visible to other users. ROLLBACK undoes all changes made in the current transaction, returning the database to its state before the transaction began."
    }
  ]

  const practiceQuestions = [
    {
      id: 1,
      question: "Which command type would you use to create a new table?",
      answer: "DDL (Data Definition Language) - specifically the CREATE TABLE command."
    },
    {
      id: 2,
      question: "How would you grant SELECT permission on a table to a user?",
      answer: "Use DCL command: GRANT SELECT ON table_name TO user_name;"
    },
    {
      id: 3,
      question: "What's the difference between DROP and DELETE?",
      answer: "DROP is DDL that removes the entire table structure and data. DELETE is DML that removes only data rows while keeping the table structure."
    }
  ]

  const activeCommands = commandCategories[activeCategory]

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          SQL Command Types
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Understanding the different categories of SQL commands
        </p>
      </section>

      {/* Command Categories Grid */}
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {Object.entries(commandCategories).map(([key, category]) => (
          <button
            key={key}
            onClick={() => setActiveCategory(key)}
            className={`p-4 rounded-lg border-2 transition-all ${
              activeCategory === key
                ? `${colorClasses[category.color]} border-current`
                : 'bg-white border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-2">{category.icon}</div>
              <div className="font-semibold text-sm">{category.name}</div>
              <div className="text-xs opacity-75 mt-1">{category.fullName}</div>
            </div>
          </button>
        ))}
      </section>

      {/* Active Category Details */}
      <AnimationStage
        key={activeCategory}
        title={activeCommands.fullName}
        onReplay={() => setActiveCategory(activeCategory)}
      >
        <div className="space-y-6">
          <div className={`p-4 rounded-lg border ${colorClasses[activeCommands.color]}`}>
            <div className="flex items-center gap-3 mb-2">
              {activeCommands.icon}
              <h3 className="text-xl font-semibold">{activeCommands.fullName}</h3>
            </div>
            <p className="text-gray-700">{activeCommands.description}</p>
          </div>

          <div className="space-y-4">
            {activeCommands.commands.map((command, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">
                  {command.name}
                </h4>
                <p className="text-sm text-gray-600 mb-3">{command.description}</p>
                <CodeBlock code={command.example} delay={index * 0.1} />
              </div>
            ))}
          </div>
        </div>
      </AnimationStage>

      {/* Visual Comparison */}
      <section className="section-card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Quick Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border border-gray-300">Category</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border border-gray-300">Main Purpose</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border border-gray-300">Key Commands</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border border-gray-300">Can Rollback?</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-900 border border-gray-200">DDL</td>
                <td className="px-4 py-3 text-sm text-gray-600 border border-gray-200">Structure</td>
                <td className="px-4 py-3 text-sm text-gray-600 border border-gray-200">CREATE, ALTER, DROP</td>
                <td className="px-4 py-3 text-sm text-gray-600 border border-gray-200">❌ No</td>
              </tr>
              <tr className="bg-white hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-900 border border-gray-200">DML</td>
                <td className="px-4 py-3 text-sm text-gray-600 border border-gray-200">Data</td>
                <td className="px-4 py-3 text-sm text-gray-600 border border-gray-200">INSERT, UPDATE, DELETE</td>
                <td className="px-4 py-3 text-sm text-gray-600 border border-gray-200">✅ Yes</td>
              </tr>
              <tr className="bg-white hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-900 border border-gray-200">DQL</td>
                <td className="px-4 py-3 text-sm text-gray-600 border border-gray-200">Retrieval</td>
                <td className="px-4 py-3 text-sm text-gray-600 border border-gray-200">SELECT</td>
                <td className="px-4 py-3 text-sm text-gray-600 border border-gray-200">N/A</td>
              </tr>
              <tr className="bg-white hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-900 border border-gray-200">DCL</td>
                <td className="px-4 py-3 text-sm text-gray-600 border border-gray-200">Permissions</td>
                <td className="px-4 py-3 text-sm text-gray-600 border border-gray-200">GRANT, REVOKE</td>
                <td className="px-4 py-3 text-sm text-gray-600 border border-gray-200">❌ No</td>
              </tr>
              <tr className="bg-white hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-900 border border-gray-200">TCL</td>
                <td className="px-4 py-3 text-sm text-gray-600 border border-gray-200">Transactions</td>
                <td className="px-4 py-3 text-sm text-gray-600 border border-gray-200">COMMIT, ROLLBACK</td>
                <td className="px-4 py-3 text-sm text-gray-600 border border-gray-200">✅ Yes</td>
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
                {showAnswer[q.id] ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
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

      {/* Practice Questions */}
      <section className="section-card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">✍️ Practice Questions</h2>
        <div className="space-y-4">
          {practiceQuestions.map((q) => (
            <div key={q.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Question {q.id}:</h4>
              <p className="text-gray-700 mb-3">{q.question}</p>
              <button
                onClick={() => toggleAnswer(`practice-${q.id}`)}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                {showAnswer[`practice-${q.id}`] ? 'Hide Answer' : 'Show Answer'}
              </button>
              {showAnswer[`practice-${q.id}`] && (
                <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                  <p className="text-gray-700 font-medium">Answer: {q.answer}</p>
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
          <p>✅ SQL commands are organized into 5 main categories based on their purpose</p>
          <p>✅ DDL (Data Definition Language) manages database structures</p>
          <p>✅ DML (Data Manipulation Language) manages data within structures</p>
          <p>✅ DQL (Data Query Language) retrieves data from the database</p>
          <p>✅ DCL (Data Control Language) manages permissions and access</p>
          <p>✅ TCL (Transaction Control Language) manages transactions</p>
        </div>
      </section>
    </div>
  )
}