export const navigationItems = [
  {
    id: 'home',
    title: 'Home',
    path: '/',
    icon: 'Home'
  },
  {
    id: 'intro',
    title: 'SQL Introduction',
    path: '/intro',
    icon: 'BookOpen'
  },
  {
    id: 'command-types',
    title: 'Command Types',
    path: '/command-types',
    icon: 'Terminal'
  },
  {
    id: 'constraints',
    title: 'Constraints & Tables',
    path: '/constraints',
    icon: 'Table'
  },
  {
    id: 'crud',
    title: 'CRUD Operations',
    path: '/crud',
    icon: 'Edit'
  },
  {
    id: 'select',
    title: 'SELECT & Filtering',
    path: '/select',
    icon: 'Filter'
  },
  {
    id: 'aggregates',
    title: 'Aggregate Functions',
    path: '/aggregates',
    icon: 'Calculator'
  },
  {
    id: 'group-by',
    title: 'GROUP BY & HAVING',
    path: '/group-by',
    icon: 'Group'
  },
  {
    id: 'joins',
    title: 'JOIN Lab',
    path: '/joins',
    icon: 'Merge'
  },
  {
    id: 'subqueries',
    title: 'Subqueries',
    path: '/subqueries',
    icon: 'Search'
  },
  {
    id: 'window-functions',
    title: 'Window Functions & CTE',
    path: '/window-functions',
    icon: 'Window'
  },
  {
    id: 'execution-order',
    title: 'Execution Order',
    path: '/execution-order',
    icon: 'ListOrdered'
  },
  {
    id: 'placement',
    title: 'Placement Practice',
    path: '/placement',
    icon: 'GraduationCap'
  },
  {
    id: 'triggers',
    title: 'Triggers',
    path: '/triggers',
    icon: 'Zap'
  },
  {
    id: 'about',
    title: 'About',
    path: '/about',
    icon: 'Info'
  }
]

export const databaseSchema = {
  customers: {
    name: 'Customers',
    columns: [
      { name: 'customer_id', type: 'INT', constraints: ['PRIMARY KEY', 'AUTO_INCREMENT'] },
      { name: 'first_name', type: 'VARCHAR(50)', constraints: ['NOT NULL'] },
      { name: 'last_name', type: 'VARCHAR(50)', constraints: ['NOT NULL'] },
      { name: 'age', type: 'INT', constraints: [] },
      { name: 'country', type: 'VARCHAR(100)', constraints: [] }
    ]
  },
  orders: {
    name: 'Orders',
    columns: [
      { name: 'order_id', type: 'INT', constraints: ['PRIMARY KEY', 'AUTO_INCREMENT'] },
      { name: 'item', type: 'VARCHAR(100)', constraints: ['NOT NULL'] },
      { name: 'amount', type: 'DECIMAL(10,2)', constraints: [] },
      { name: 'customer_id', type: 'INT', constraints: ['FOREIGN KEY'] }
    ]
  },
  shippings: {
    name: 'Shippings',
    columns: [
      { name: 'shipping_id', type: 'INT', constraints: ['PRIMARY KEY', 'AUTO_INCREMENT'] },
      { name: 'status', type: 'VARCHAR(50)', constraints: [] },
      { name: 'customer', type: 'VARCHAR(100)', constraints: [] }
    ]
  }
}

export const sampleData = {
  customers: [
    { customer_id: 1, first_name: 'John', last_name: 'Doe', age: 28, country: 'USA' },
    { customer_id: 2, first_name: 'Jane', last_name: 'Smith', age: 32, country: 'UK' },
    { customer_id: 3, first_name: 'Mike', last_name: 'Johnson', age: 25, country: 'Canada' },
    { customer_id: 4, first_name: 'Sarah', last_name: 'Williams', age: 29, country: 'USA' },
    { customer_id: 5, first_name: 'David', last_name: 'Brown', age: 35, country: 'Australia' }
  ],
  orders: [
    { order_id: 101, item: 'Laptop', amount: 1299.99, customer_id: 1 },
    { order_id: 102, item: 'Mouse', amount: 29.99, customer_id: 2 },
    { order_id: 103, item: 'Keyboard', amount: 79.99, customer_id: 1 },
    { order_id: 104, item: 'Monitor', amount: 399.99, customer_id: 3 },
    { order_id: 105, item: 'Headphones', amount: 149.99, customer_id: 4 }
  ],
  shippings: [
    { shipping_id: 1, status: 'Delivered', customer: 'John Doe' },
    { shipping_id: 2, status: 'In Transit', customer: 'Jane Smith' },
    { shipping_id: 3, status: 'Processing', customer: 'Mike Johnson' }
  ]
}