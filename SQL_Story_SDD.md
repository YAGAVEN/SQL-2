# Software Design Document (SDD)
## SQL Story – Interactive SQL Learning Website

# 1. Introduction
## Purpose
SQL Story is an interactive website for placement preparation that teaches MySQL using predefined animations instead of executing SQL.

## Audience
- Absolute beginners
- College students
- Placement preparation

## Scope
10–15 page educational website with Apple-inspired storytelling.

# 2. Functional Requirements
- Browse SQL topics
- Navigate lessons
- View animated explanations
- Read theory
- View syntax
- See step-by-step execution
- Read interview questions
- Solve sample questions
- Responsive UI
- Dark/Light theme

# 3. Non-Functional Requirements
- Fast loading
- Responsive
- Accessible
- Modular React components
- Reusable animations

# 4. Technology Stack
- React + Vite
- Tailwind CSS
- Framer Motion
- GSAP
- React Router
- Lucide Icons

# 5. Information Architecture
Home
├── SQL Basics
├── Command Types
├── Constraints
├── CRUD
├── SELECT
├── Aggregate Functions
├── GROUP BY & HAVING
├── JOIN Lab
├── Subqueries
├── Window Functions & CTE
├── Execution Order
└── Placement Practice

# 6. Shared Database
Customers(customer_id, first_name, last_name, age, country)
Orders(order_id, item, amount, customer_id)
Shippings(shipping_id, status, customer)

# 7. Page Specifications
For every lesson:
- Hero section
- Learning objectives
- Story analogy
- Theory
- Animated walkthrough
- SQL syntax
- Internal execution animation
- Final output
- Common mistakes
- Interview questions
- Sample problems
- Summary

# 8. Animation Library
Reusable components:
- TableGrid
- RowHighlight
- CellHighlight
- ArrowFlow
- RowTransfer
- FilterFade
- SortSwap
- GroupMerge
- JoinConnector
- ExecutionPipeline
- ResultTableBuilder

# 9. Topic Animation Specifications
## SELECT
Highlight selected columns.

## WHERE
Rows evaluated one-by-one; passing rows continue.

## ORDER BY
Rows reorder with animated swaps.

## DISTINCT
Duplicate rows merge/disappear.

## GROUP BY
Rows move into grouped buckets.

## HAVING
Groups filtered after aggregation.

## Aggregates
COUNT/SUM/AVG/MIN/MAX shown with running accumulator.

## Joins
Compare every source row with destination rows.
Highlight matching keys.
Animate copied values into result table.

## Constraints
Invalid inserts shake and show validation.
Valid inserts succeed.

## Index
Linear scan versus indexed lookup animation.

## Window Functions
Partition rows then assign ROW_NUMBER/RANK/DENSE_RANK.

## CTE
Temporary table appears then feeds final query.

## Execution Order
FROM→JOIN→WHERE→GROUP BY→HAVING→SELECT→DISTINCT→ORDER BY→LIMIT.

# 10. Folder Structure
src/
 components/
  animations/
  common/
 pages/
 data/
 assets/
 hooks/
 utils/
 styles/

# 11. Component Architecture
App
 ├─ Layout
 ├─ Sidebar
 ├─ Topbar
 ├─ LessonPage
 │   ├─ TheoryCard
 │   ├─ AnimationStage
 │   ├─ CodeBlock
 │   ├─ Explanation
 │   ├─ InterviewCard
 │   └─ PracticeCard

# 12. Design System
Typography: Inter
Spacing: 8px grid
Rounded cards
Glassmorphism
Smooth transitions
Minimal palette

# 13. Development Phases
1. Setup
2. Routing
3. Layout
4. Animation library
5. Lesson pages
6. Practice section
7. Responsive polish
8. Testing
9. Deployment

# 14. Testing
- Responsive
- Navigation
- Animation timing
- Accessibility
- Content review

# 15. Future Enhancements
- Real SQL execution
- User accounts
- Progress tracking
- Quizzes
- Certificates
