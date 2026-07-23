import { useState } from 'react'
import { ChevronDown, ChevronUp, Lightning, Clock, Database, Shield, AlertTriangle } from 'lucide-react'
import CodeBlock from '../animations/CodeBlock'
import AnimationStage from '../animations/AnimationStage'
import TableGrid from '../animations/TableGrid'

export default function Triggers() {
  const [showAnswer, setShowAnswer] = useState({})
  const [animationKey, setAnimationKey] = useState(0)
  const [activeTrigger, setActiveTrigger] = useState('before')

  const toggleAnswer = (questionId) => {
    setShowAnswer(prev => ({ ...prev, [questionId]: !prev[questionId] }))
  }

  const replayAnimation = () => {
    setAnimationKey(prev => prev + 1)
  }

  const triggers = {
    before: {
      name: 'BEFORE Trigger',
      icon: <Clock className="w-5 h-5" />,
      color: 'blue',
      description: 'Executes before the specified operation',
      rules: ['Can modify data before operation', 'Cannot access auto-increment values', 'Useful for validation and data modification'],
      example: `CREATE TRIGGER before_insert_customer
BEFORE INSERT ON customers
FOR EACH ROW
BEGIN
  -- Validate and format data
  SET NEW.email = LOWER(NEW.email);
  IF NEW.age < 18 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Customer must be 18 or older';
  END IF;
END;`,
      useCase: 'Perfect for data validation, formatting, or setting default values before insert/update operations.'
    },
    after: {
      name: 'AFTER Trigger',
      icon: <Lightning className="w-5 h-5" />,
      color: 'green',
      description: 'Executes after the specified operation',
      rules: ['Cannot modify the data that triggered it', 'Can access auto-increment values', 'Ideal for logging and related operations'],
      example: `CREATE TRIGGER after_order_insert
AFTER INSERT ON orders
FOR EACH ROW
BEGIN
  -- Log the order
  INSERT INTO order_logs (order_id, action, timestamp)
  VALUES (NEW.order_id, 'ORDER_CREATED', NOW());

  -- Update customer statistics
  UPDATE customers
  SET total_orders = total_orders + 1
  WHERE customer_id = NEW.customer_id;
END;`,
      useCase: 'Great for audit trails, notifications, or updating related tables after data changes.'
    },
    update: {
      name: 'UPDATE Trigger',
      icon: <Database className="w-5 h-5" />,
      color: 'purple',
      description: 'Executes when data is modified',
      rules: ['Can reference OLD and NEW values', 'Useful for tracking changes', 'Can prevent certain updates'],
      example: `CREATE TRIGGER track_price_changes
BEFORE UPDATE ON products
FOR EACH ROW
BEGIN
  IF OLD.price != NEW.price THEN
    INSERT INTO price_history (product_id, old_price, new_price, change_date)
    VALUES (NEW.product_id, OLD.price, NEW.price, NOW());
  END IF;
END;`,
      useCase: 'Excellent for tracking data changes, maintaining history, or enforcing business rules on updates.'
    },
    delete: {
      name: 'DELETE Trigger',
      icon: <Shield className="w-5 h-5" />,
      color: 'red',
      description: 'Executes when data is deleted',
      rules: ['Can only reference OLD values', 'Perfect for cleanup operations', 'Can prevent deletions',
      example: `CREATE TRIGGER before_customer_delete
BEFORE DELETE ON customers
FOR EACH ROW
BEGIN
  -- Check if customer has active orders
  IF EXISTS (SELECT 1 FROM orders WHERE customer_id = OLD.customer_id) THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cannot delete customer with active orders';
  END IF;

  -- Archive customer data
  INSERT INTO customer_archive (customer_id, name, deleted_at)
  VALUES (OLD.customer_id, OLD.name, NOW());
END;`,
      useCase: 'Essential for preventing orphaned records, archiving deleted data, or enforcing referential integrity.'
    }
  }

  const triggerApplications = [
    {
      name: 'Data Validation',
      description: 'Enforce business rules at the database level',
      example: `CREATE TRIGGER validate_email
BEFORE INSERT ON users
FOR EACH ROW
BEGIN
  IF NEW.email NOT LIKE '%@%' THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid email format';
  END IF;
END;`
    },
    {
      name: 'Audit Logging',
      description: 'Track all changes to sensitive data',
      example: `CREATE TRIGGER log_salary_changes
AFTER UPDATE ON employees
FOR EACH ROW
BEGIN
  IF OLD.salary != NEW.salary THEN
    INSERT INTO audit_log (table_name, record_id, old_value, new_value, changed_by)
    VALUES ('employees', NEW.employee_id, OLD.salary, NEW.salary, CURRENT_USER());
  END IF;
END;`
    },
    {
      name: 'Derived Data',
      description: 'Automatically update calculated values',
      example: `CREATE TRIGGER update_inventory
AFTER INSERT ON order_items
FOR EACH ROW
BEGIN
  UPDATE products
  SET stock_quantity = stock_quantity - NEW.quantity
  WHERE product_id = NEW.product_id;
END;`
    }
  ]

  const interviewQuestions = [
    {
      id: 1,
      question: "What is the difference between BEFORE and AFTER triggers?",
      answer: "BEFORE triggers execute before the operation and can modify the data being inserted/updated. AFTER triggers execute after the operation completes and cannot modify the data, but can access auto-increment values. BEFORE is ideal for validation, AFTER for logging and related operations."
    },
    {
      id: 2,
      question: "Can a trigger access both OLD and NEW values?",
      answer: "In UPDATE triggers, you can access both OLD (previous values) and NEW (new values). In INSERT triggers, only NEW values are available. In DELETE triggers, only OLD values are available. This allows triggers to compare values and make decisions based on what changed."
    },
    {
      id: 3,
      question: "What happens if a trigger fails?",
      answer: "If a trigger fails (throws an error), the entire operation that triggered it is rolled back. No changes are made to the database. This makes triggers excellent for enforcing data integrity and business rules that must never be violated."
    }
  ]

  const practiceQuestions = [
    {
      id: 1,
      question: "Write a trigger that prevents deleting customers who have pending orders.",
      answer: "CREATE a BEFORE DELETE trigger that checks for related orders and raises an error if any exist."
    },
    {
      id: 2,
      question: "Create a trigger that automatically updates a 'last_modified' timestamp.",
      answer: "Create a BEFORE UPDATE trigger that sets NEW.last_modified = NOW()."
    },
    {
      id: 3,
      question: "Design a trigger that logs all salary changes to an audit table.",
      answer: "Create an AFTER UPDATE trigger that compares OLD.salary and NEW.salary, and inserts differences into an audit_log table."
    }
  ]

  const activeTriggerData = triggers[activeTrigger]

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          SQL Triggers
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Automate database operations and enforce business rules with triggers
        </p>
      </section>

      {/* Trigger Types */}
      <section className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(triggers).map(([key, trigger]) => (
          <button
            key={key}
            onClick={() => setActiveTrigger(key)}
            className={`p-4 rounded-lg border-2 transition-all ${
              activeTrigger === key
                ? `bg-${trigger.color}-50 border-${trigger.color}-300`
                : 'bg-white border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-2">{trigger.icon}</div>
              <div className="font-semibold text-sm">{trigger.name}</div>
            </div>
          </button>
        ))}
      </section>

      {/* Active Trigger Details */}
      <AnimationStage
        key={`trigger-${animationKey}`}
        title={activeTriggerData.name}
        onReplay={replayAnimation}
      >
        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-gray-700">{activeTriggerData.description}</p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Rules:</h4>
            <ul className="space-y-2">
              {activeTriggerData.rules.map((rule, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
                  <span className="text-gray-700">{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">📝 Example Code:</h4>
            <CodeBlock code={activeTriggerData.example} delay={0} />
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-gray-900 mb-2">💡 Use Case:</h4>
            <p className="text-gray-700">{activeTriggerData.useCase}</p>
          </div>
        </div>
      </AnimationStage>

      {/* Trigger Applications */}
      <section className="section-card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Common Trigger Applications</h2>
        <div className="space-y-6">
          {triggerApplications.map((app, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">{app.name}</h4>
              <p className="text-sm text-gray-600 mb-3">{app.description}</p>
              <CodeBlock code={app.example} delay={index * 0.1} />
            </div>
          ))}
        </div>
      </section>

      {/* Trigger Execution Animation */}
      <section className="section-card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Trigger Execution Animation</h2>
        <AnimationStage
          key={`execution-${animationKey}`}
          title="See how triggers work"
          onReplay={replayAnimation}
        >
          <div className="space-y-4">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Products Table (stock tracking)</h4>
              <TableGrid
                key={`products-table-${animationKey}`}
                headers={['ID', 'Name', 'Stock', 'Price']}
                data={[
                  ['1', 'Laptop', '5', '$1299'],
                  ['2', 'Mouse', '20', '$29'],
                  ['3', 'Keyboard', '15', '$79']
                ]}
              />
            </div>

            <div className="flex items-center gap-4">
              <CodeBlock
                code="INSERT INTO order_items (product_id, quantity) VALUES (1, 2);"
                delay={0.3}
              />
              <div className="text-green-600 font-semibold">→ Trigger fires!</div>
            </div>

            <div className="bg-blue-100 p-4 rounded-lg">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Updated Products Table</h4>
              <TableGrid
                key={`updated-products-${animationKey}`}
                headers={['ID', 'Name', 'Stock', 'Price']}
                data={[
                  ['1', 'Laptop', '3', '$1299'],
                  ['2', 'Mouse', '20', '$29'],
                  ['3', 'Keyboard', '15', '$79']
                ]}
              />
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
          <p>✅ Triggers are named database objects that automatically execute in response to events</p>
          <p>✅ BEFORE triggers can modify data before the operation completes</p>
          <p>✅ AFTER triggers execute after the operation and are ideal for logging</p>
          <p>✅ Triggers can enforce business rules and maintain data integrity</p>
          <p>✅ Failed triggers cause the entire operation to be rolled back</p>
          <p>✅ Use triggers for validation, audit trails, and derived data updates</p>
        </div>
      </section>
    </div>
  )
}