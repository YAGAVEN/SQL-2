# SQL Story – Project Plan (`plan.md`)

# 1. Project Overview

## Project Name
**SQL Story – Interactive SQL Learning for Placement Preparation**

## Goal
Build a small (10–15 page) Apple-inspired interactive website that teaches MySQL through storytelling and predefined animations instead of a live SQL engine.

Audience:
- Absolute beginners
- College students
- Placement preparation

---

# 2. Learning Philosophy

Every topic follows the same structure:

1. Introduction
2. Real-world analogy
3. Theory
4. Animated explanation
5. SQL syntax
6. Step-by-step execution
7. Final output
8. Common mistakes
9. Placement interview questions
10. Practice questions

---

# 3. Database

## Customers
customer_id (PK)
first_name
last_name
age
country

## Orders
order_id (PK)
item
amount
customer_id (FK)

## Shippings
shipping_id (PK)
status
customer

Extra tables may be added only if a topic cannot be demonstrated clearly.

---

# 4. Pages (10–15)

1. Home
2. SQL Introduction
3. SQL Command Types
4. Constraints & Table Operations
5. CRUD (INSERT/UPDATE/DELETE)
6. SELECT & Filtering
7. Aggregate Functions
8. GROUP BY & HAVING
9. JOIN Story Lab
10. Subqueries
11. Window Functions & CTE
12. SQL Execution Order
13. Placement Practice
14. About / Credits

---

# 5. Animation Guidelines

Use:
- Framer Motion
- GSAP (complex sequences)
- SVG animations

Style:
- Smooth
- Apple-like
- Minimal
- Storytelling

Examples:
- Rows slide between tables
- Matching keys glow
- Filters remove rows
- Aggregation merges values
- Result tables build progressively

---

# 6. Join Animation

For every join:
- Highlight current row
- Compare with destination rows
- Show every comparison
- Explain match/non-match
- Animate copied values
- Build final table row-by-row

Support:
- INNER JOIN
- LEFT JOIN
- RIGHT JOIN
- FULL OUTER JOIN (with MySQL note)
- SELF JOIN

---

# 7. SQL Execution Order

Animate every query as:

FROM
↓
JOIN
↓
WHERE
↓
GROUP BY
↓
HAVING
↓
SELECT
↓
DISTINCT
↓
ORDER BY
↓
LIMIT

---

# 8. Topics

Introduction to SQL

SQL Command Types
- DDL
- DML
- DQL
- DCL
- TCL

Constraints
- PRIMARY KEY
- FOREIGN KEY
- UNIQUE
- NOT NULL
- CHECK
- DEFAULT

Table Operations
- CREATE TABLE
- ALTER TABLE
- DROP TABLE

CRUD
- INSERT
- UPDATE
- DELETE

Aggregate Functions
- COUNT
- SUM
- AVG
- MIN
- MAX

NULL Handling
- IS NULL
- IS NOT NULL
- COALESCE

Indexes
- Concept
- Performance

SELECT
WHERE
DISTINCT
ORDER BY
LIMIT

GROUP BY

HAVING

Joins

Nested Queries

Window Functions
- ROW_NUMBER
- RANK
- DENSE_RANK
- PARTITION BY

CTE
- Basic
- Recursive (optional)

Execution Order

---

# 9. Folder Structure

src/
 components/
 animations/
 pages/
 data/
 hooks/
 assets/
 styles/
 utils/

---

# 10. Tech Stack

React
Vite
Tailwind CSS
Framer Motion
GSAP
React Router
Lucide Icons

No backend.

---

# 11. UI Principles

- Minimal
- Large typography
- Glass cards
- Soft shadows
- Smooth scrolling
- Interactive storytelling

---

# 12. Placement Section

Each topic contains:
- Interview questions
- Common mistakes
- Sample SQL questions

---

# 13. Deliverables

- Responsive website
- Reusable animation components
- Consistent design system
- Clean React architecture
- Easy future expansion

---

# 14. Development Roadmap

Phase 1
- UI
- Navigation
- Theme

Phase 2
- Animation framework

Phase 3
- Core lessons

Phase 4
- Placement content

Phase 5
- Testing & polishing

---

# 15. Success Criteria

A student should understand not only what SQL queries do, but visually see how rows move, compare, filter, group, and combine internally through predefined animations.
