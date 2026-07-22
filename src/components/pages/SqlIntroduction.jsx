import { useState } from 'react'
import { Play, ChevronDown, ChevronUp } from 'lucide-react'
import AnimationStage from '../animations/AnimationStage'
import TableGrid from '../animations/TableGrid'
import CodeBlock from '../animations/CodeBlock'

export default function SqlIntroduction() {
  const [showAnswer, setShowAnswer] = useState({})
  const [animationKey, setAnimationKey] = useState(0)

  const toggleAnswer = (questionId) => {
    setShowAnswer(prev => ({ ...prev, [questionId]: !prev[questionId] }))
  }

  const replayAnimation = () => {
    setAnimationKey(prev => prev + 1)
  }

  const sampleData = {
    headers: ['ID', 'Name', 'Age', 'Country'],
    data: [
      ['1', 'John Doe', '28', 'USA'],
      ['2', 'Jane Smith', '32', 'UK'],
      ['3', 'Mike Johnson', '25', 'Canada']
    ]
  }

  const learningObjectives = [
    'Understand what SQL is and why it matters',
    'Learn how SQL powers modern databases',
    'See the basics of database structure',
    'Get ready for advanced SQL concepts'
  ]

  const interviewQuestions = [
    {
      id: 1,
      question: "What is SQL and what does it stand for?",
      answer: "SQL stands for Structured Query Language. It's a standard language for managing and manipulating relational databases. SQL is used to insert, update, retrieve, and delete data in databases."
    },
    {
      id: 2,
      question: "What are the main types of SQL commands?",
      answer: "SQL commands are categorized into: DDL (Data Definition Language) - CREATE, ALTER, DROP; DML (Data Manipulation Language) - INSERT, UPDATE, DELETE; DQL (Data Query Language) - SELECT; DCL (Data Control Language) - GRANT, REVOKE; and TCL (Transaction Control Language) - COMMIT, ROLLBACK."
    },
    {
      id: 3,
      question: "What is a primary key?",
      answer: "A primary key is a column (or set of columns) that uniquely identifies each row in a table. It must contain unique values, cannot contain NULL values, and each table can have only one primary key."
    },
    {
      id: 4,
      question: "What is the difference between WHERE and HAVING?",
      answer: "WHERE filters individual rows before GROUP BY, while HAVING filters grouped rows after aggregation. WHERE works with row-level data, HAVING works with aggregate results."
    }
  ]

  const commonMistakes = [
    {
      mistake: "Forgetting to check for NULL values",
      correction: "Use IS NULL or IS NOT NULL instead of = NULL or <> NULL",
      example: "Wrong: WHERE name = NULL\nRight: WHERE name IS NULL"
    },
    {
      mistake: "Confusion between single quotes and double quotes",
      correction: "Use single quotes for strings and dates, double quotes are for column names with spaces",
      example: "Wrong: WHERE name = \"John\"\nRight: WHERE name = 'John'"
    },
    {
      mistake: "Not using proper column aliases in aggregates",
      correction: "Always alias your aggregate columns for clarity",
      example: "Wrong: SELECT COUNT(*)\nRight: SELECT COUNT(*) as total_count"
    }
  ]

  const practiceQuestions = [
    {
      id: 1,
      question: "Write a SQL query to select all columns from a table called 'employees'",
      answer: "SELECT * FROM employees;"
    },
    {
      id: 2,
      question: "Write a query to find employees who are older than 30",
      answer: "SELECT * FROM employees WHERE age > 30;"
    },
    {
      id: 3,
      question: "How would you count the total number of employees?",
      answer: "SELECT COUNT(*) FROM employees;"
    }
  ]

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Introduction to SQL
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover the language that powers data management across the world
        </p>
      </section>

      {/* Learning Objectives */}
      <section className="section-card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Learning Objectives</h2>
        <ul className="grid md:grid-cols-2 gap-3">
          {learningObjectives.map((objective, index) => (
            <li key={index} className="flex items-start gap-2">
              <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <div className="w-2 h-2 bg-blue-600 rounded-full" />
              </div>
              <span className="text-gray-700">{objective}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Story Analogy */}
      <section className="section-card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">📚 The Story Analogy</h2>
        <div className="prose max-w-none">
          <p className="text-gray-600 mb-4">
            Imagine SQL as the <strong>universal language</strong> for talking to enormous digital filing cabinets.
            Just like you might ask a librarian to find all books by a specific author, SQL lets you ask databases
            to find, organize, and manipulate data in powerful ways.
          </p>
          <p className="text-gray-600">
            Think of a database as a giant spreadsheet system where SQL is your super-powered assistant that can
            instantly find patterns, combine information, and answer complex questions that would take humans
            hours to figure out manually.
          </p>
        </div>
      </section>

      {/* Theory */}
      <section className="section-card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Understanding SQL</h2>
        <div className="space-y-4 text-gray-600">
          <p>
            <strong>SQL (Structured Query Language)</strong> is the standard programming language for managing
            relational databases. It's used by data analysts, developers, and business professionals to:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Query and retrieve specific data from databases</li>
            <li>Insert, update, and delete data records</li>
            <li>Create and modify database structures</li>
            <li>Set permissions and security controls</li>
            <li>Perform complex data analysis and reporting</li>
          </ul>
          <p>
            What makes SQL powerful is its declarative nature - you tell the database <em>what</em> you want,
            not <em>how</em> to get it. The database engine figures out the most efficient way to process your request.
          </p>
        </div>
      </section>

      {/* Database Structure Example */}
      <section className="section-card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">What a Database Looks Like</h2>
        <p className="text-gray-600 mb-6">
          Here's a simple example of how data is organized in a SQL table:
        </p>
        <TableGrid
          key={`table-${animationKey}`}
          headers={sampleData.headers}
          data={sampleData.data}
          className="transition-all duration-500"
        />
      </section>

      {/* SQL Syntax */}
      <section className="section-card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Basic SQL Syntax</h2>
        <p className="text-gray-600 mb-6">
          SQL uses simple English-like commands. Here are the basics:
        </p>
        <CodeBlock
          code={`-- Select all columns from a table
SELECT * FROM customers;

-- Select specific columns
SELECT first_name, last_name FROM customers;

-- Filter results
SELECT * FROM customers WHERE age > 25;

-- Sort results
SELECT * FROM customers ORDER BY last_name;`}
          delay={0}
        />
      </section>

      {/* Interactive Animation */}
      <section className="section-card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">How SQL Queries Work</h2>
        <AnimationStage
          key={`animation-${animationKey}`}
          title="Watch a SQL query in action"
          onReplay={replayAnimation}
        >
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                When you run a SQL query, the database processes it step by step:
              </p>
              <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="text-2xl mb-2">📝</div>
                  <div className="text-sm font-medium text-blue-700">1. You Write Query</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <div className="text-2xl mb-2">⚙️</div>
                  <div className="text-sm font-medium text-purple-700">2. Database Processes</div>
                                        </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="text-2xl mb-2">📊</div>
                  <div className="text-sm font-medium text-green-700">3. Returns Results</div>
                </div>
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
              <p className="text-sm text-gray-600 mb-2">✅ {mistake.correction}</p>
              <CodeBlock code={mistake.example} delay={index * 0.2} />
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
                <div className="mt-3">
                  <CodeBlock code={q.answer} delay={0} />
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
          <p>✅ SQL is the standard language for working with relational databases</p>
          <p>✅ Data is organized in tables with rows and columns</p>
          <p>✅ SQL uses simple English-like commands that are easy to learn</p>
          <p>✅ The language is declarative - you specify what you want, not how to get it</p>
          <p>✅ Mastering SQL is essential for data analysis and backend development</p>
        </div>
      </section>

      {/* Next Steps */}
      <section className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-blue-900 mb-2">Ready to Continue?</h3>
        <p className="text-blue-700">
          Now that you understand the basics, let's dive deeper into SQL Command Types and see how different commands work.
        </p>
      </section>
    </div>
  )
}