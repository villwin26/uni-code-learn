/*
  # Seed Sample Data for LearnIN.ai

  1. Sample Courses
    - Python Programming Course
    - JavaScript Programming Course
  
  2. Sample Lessons
    - Structured lessons for both courses covering fundamentals
  
  3. Sample Quizzes
    - Interactive quizzes for key lessons
*/

-- Insert sample courses
INSERT INTO public.courses (id, title, description, language, icon, color, order_index) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Python Programming', 'Learn Python from basics to advanced concepts. Master one of the most popular programming languages used in web development, data science, and automation.', 'Python', '🐍', '#3776AB', 1),
('550e8400-e29b-41d4-a716-446655440002', 'JavaScript Programming', 'Master JavaScript, the language of the web. Learn modern ES6+ features, DOM manipulation, and asynchronous programming.', 'JavaScript', '⚡', '#F7DF1E', 2);

-- Insert Python course lessons
INSERT INTO public.lessons (id, course_id, title, slug, content, order_index, estimated_time, difficulty) VALUES
('550e8400-e29b-41d4-a716-446655440101', '550e8400-e29b-41d4-a716-446655440001', 'Introduction to Python', 'introduction-to-python', 
'# Introduction to Python

Python is a high-level, interpreted programming language known for its simplicity and readability. Created by Guido van Rossum and first released in 1991, Python has become one of the most popular programming languages in the world.

## Why Learn Python?

Python is an excellent choice for beginners and experienced programmers alike:

- **Easy to Learn**: Python''s syntax is clean and intuitive
- **Versatile**: Used in web development, data science, AI, automation, and more
- **Large Community**: Extensive libraries and community support
- **High Demand**: Python developers are in high demand across industries

## Python Applications

Python is used in various domains:

- **Web Development**: Django, Flask frameworks
- **Data Science**: NumPy, Pandas, Matplotlib
- **Machine Learning**: TensorFlow, PyTorch, Scikit-learn
- **Automation**: Scripting and task automation
- **Desktop Applications**: Tkinter, PyQt

## Your First Python Program

Let''s start with the traditional "Hello, World!" program:

```python
print("Hello, World!")
```

This simple program demonstrates Python''s straightforward syntax. The `print()` function outputs text to the console.

## Python Philosophy

Python follows the "Zen of Python" principles:
- Beautiful is better than ugly
- Explicit is better than implicit
- Simple is better than complex
- Readability counts

In the next lesson, we''ll explore Python syntax and learn how to write your first programs.', 1, 10, 'beginner'),

('550e8400-e29b-41d4-a716-446655440102', '550e8400-e29b-41d4-a716-446655440001', 'Python Syntax and Variables', 'python-syntax-variables',
'# Python Syntax and Variables

Understanding Python syntax is crucial for writing clean, readable code. Python uses indentation to define code blocks, making it visually appealing and easy to understand.

## Python Syntax Rules

### Indentation
Python uses indentation (spaces or tabs) to define code blocks:

```python
if True:
    print("This is indented")
    print("This too")
print("This is not indented")
```

### Comments
Use comments to explain your code:

```python
# This is a single-line comment
print("Hello")  # Comment at end of line

"""
This is a
multi-line comment
"""
```

## Variables in Python

Variables are containers for storing data values. Python has no command for declaring a variable - you create one by assigning a value.

### Variable Assignment

```python
# String variable
name = "Alice"

# Integer variable
age = 25

# Float variable
height = 5.6

# Boolean variable
is_student = True
```

### Variable Naming Rules

- Must start with a letter or underscore
- Can contain letters, numbers, and underscores
- Case-sensitive (`age` and `Age` are different)
- Cannot use Python keywords

```python
# Valid variable names
user_name = "John"
age2 = 30
_private = "secret"

# Invalid variable names
# 2age = 30  # Cannot start with number
# user-name = "John"  # Cannot use hyphen
```

### Multiple Assignment

```python
# Assign same value to multiple variables
x = y = z = 10

# Assign different values to multiple variables
a, b, c = 1, 2, 3
```

## Variable Types

Python automatically determines the variable type:

```python
name = "Python"        # str
version = 3.9          # float
is_popular = True      # bool
features = ["simple", "powerful"]  # list
```

Use the `type()` function to check variable type:

```python
print(type(name))      # <class ''str''>
print(type(version))   # <class ''float''>
```

In the next lesson, we''ll explore Python data types in detail.', 2, 15, 'beginner'),

('550e8400-e29b-41d4-a716-446655440103', '550e8400-e29b-41d4-a716-446655440001', 'Python Data Types', 'python-data-types',
'# Python Data Types

Python has several built-in data types that allow you to store different kinds of information. Understanding these data types is essential for effective programming.

## Numeric Types

### Integers (int)
Whole numbers without decimal points:

```python
age = 25
year = 2024
negative = -10
```

### Floating Point Numbers (float)
Numbers with decimal points:

```python
price = 19.99
temperature = -5.5
pi = 3.14159
```

### Complex Numbers (complex)
Numbers with real and imaginary parts:

```python
z = 3 + 4j
print(z.real)  # 3.0
print(z.imag)  # 4.0
```

## Text Type

### Strings (str)
Sequences of characters enclosed in quotes:

```python
name = "Alice"
message = ''Hello, World!''
multiline = """This is a
multi-line string"""
```

### String Operations

```python
first_name = "John"
last_name = "Doe"

# Concatenation
full_name = first_name + " " + last_name

# String formatting
greeting = f"Hello, {first_name}!"

# String methods
print(name.upper())    # ALICE
print(name.lower())    # alice
print(len(name))       # 5
```

## Boolean Type

### Boolean (bool)
Represents True or False values:

```python
is_active = True
is_complete = False

# Boolean operations
print(True and False)  # False
print(True or False)   # True
print(not True)        # False
```

## Sequence Types

### Lists
Ordered, mutable collections:

```python
fruits = ["apple", "banana", "orange"]
numbers = [1, 2, 3, 4, 5]
mixed = ["hello", 42, True, 3.14]

# List operations
fruits.append("grape")
print(fruits[0])       # apple
print(len(fruits))     # 4
```

### Tuples
Ordered, immutable collections:

```python
coordinates = (10, 20)
colors = ("red", "green", "blue")

# Accessing tuple elements
x, y = coordinates
print(x)  # 10
```

## Mapping Type

### Dictionaries (dict)
Key-value pairs:

```python
person = {
    "name": "Alice",
    "age": 30,
    "city": "New York"
}

# Accessing dictionary values
print(person["name"])     # Alice
person["age"] = 31        # Update value
person["email"] = "alice@email.com"  # Add new key
```

## Set Types

### Sets
Unordered collections of unique elements:

```python
unique_numbers = {1, 2, 3, 4, 5}
colors = {"red", "green", "blue"}

# Set operations
unique_numbers.add(6)
print(3 in unique_numbers)  # True
```

## Type Conversion

Convert between different data types:

```python
# String to integer
age_str = "25"
age_int = int(age_str)

# Integer to string
number = 42
number_str = str(number)

# String to float
price_str = "19.99"
price_float = float(price_str)
```

Understanding these data types will help you choose the right type for your data and perform appropriate operations.', 3, 20, 'beginner'),

('550e8400-e29b-41d4-a716-446655440104', '550e8400-e29b-41d4-a716-446655440001', 'Control Flow - Conditionals', 'python-control-flow-conditionals',
'# Control Flow - Conditionals

Control flow statements allow you to control the execution of your program based on different conditions. Python provides several conditional statements to make decisions in your code.

## If Statement

The `if` statement executes code only if a condition is true:

```python
age = 18

if age >= 18:
    print("You are an adult")
```

## If-Else Statement

Use `else` to execute code when the condition is false:

```python
temperature = 25

if temperature > 30:
    print("It''s hot outside")
else:
    print("It''s not too hot")
```

## If-Elif-Else Statement

Use `elif` (else if) for multiple conditions:

```python
score = 85

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
elif score >= 60:
    grade = "D"
else:
    grade = "F"

print(f"Your grade is: {grade}")
```

## Comparison Operators

Python provides several comparison operators:

```python
x = 10
y = 20

print(x == y)    # Equal to: False
print(x != y)    # Not equal to: True
print(x < y)     # Less than: True
print(x > y)     # Greater than: False
print(x <= y)    # Less than or equal: True
print(x >= y)    # Greater than or equal: False
```

## Logical Operators

Combine multiple conditions using logical operators:

```python
age = 25
has_license = True

# AND operator
if age >= 18 and has_license:
    print("You can drive")

# OR operator
if age < 18 or not has_license:
    print("You cannot drive")

# NOT operator
if not has_license:
    print("You need a license")
```

## Nested Conditionals

You can nest if statements inside other if statements:

```python
weather = "sunny"
temperature = 25

if weather == "sunny":
    if temperature > 20:
        print("Perfect day for a picnic!")
    else:
        print("Sunny but a bit cold")
else:
    print("Not a sunny day")
```

## Conditional Expressions (Ternary Operator)

A shorthand way to write simple if-else statements:

```python
age = 20
status = "adult" if age >= 18 else "minor"
print(status)  # adult

# Equivalent to:
if age >= 18:
    status = "adult"
else:
    status = "minor"
```

## Practical Examples

### Example 1: Grade Calculator

```python
def calculate_grade(score):
    if score >= 90:
        return "A"
    elif score >= 80:
        return "B"
    elif score >= 70:
        return "C"
    elif score >= 60:
        return "D"
    else:
        return "F"

student_score = 87
print(f"Grade: {calculate_grade(student_score)}")
```

### Example 2: Login Validation

```python
username = "admin"
password = "secret123"

if username == "admin" and password == "secret123":
    print("Login successful!")
else:
    print("Invalid credentials")
```

### Example 3: Number Classification

```python
number = -5

if number > 0:
    print("Positive number")
elif number < 0:
    print("Negative number")
else:
    print("Zero")
```

Conditional statements are fundamental to programming logic and decision-making in your applications.', 4, 18, 'beginner'),

('550e8400-e29b-41d4-a716-446655440105', '550e8400-e29b-41d4-a716-446655440001', 'Loops in Python', 'python-loops',
'# Loops in Python

Loops allow you to execute a block of code repeatedly. Python provides two main types of loops: `for` loops and `while` loops.

## For Loops

For loops are used to iterate over sequences (lists, tuples, strings, etc.):

### Iterating Over Lists

```python
fruits = ["apple", "banana", "orange"]

for fruit in fruits:
    print(f"I like {fruit}")
```

### Iterating Over Strings

```python
word = "Python"

for letter in word:
    print(letter)
```

### Using range() Function

The `range()` function generates a sequence of numbers:

```python
# Print numbers 0 to 4
for i in range(5):
    print(i)

# Print numbers 1 to 5
for i in range(1, 6):
    print(i)

# Print even numbers from 0 to 10
for i in range(0, 11, 2):
    print(i)
```

### Iterating Over Dictionaries

```python
person = {"name": "Alice", "age": 30, "city": "New York"}

# Iterate over keys
for key in person:
    print(key)

# Iterate over values
for value in person.values():
    print(value)

# Iterate over key-value pairs
for key, value in person.items():
    print(f"{key}: {value}")
```

## While Loops

While loops continue executing as long as a condition is true:

```python
count = 0

while count < 5:
    print(f"Count: {count}")
    count += 1
```

### Input Validation Example

```python
password = ""

while len(password) < 8:
    password = input("Enter a password (min 8 characters): ")
    if len(password) < 8:
        print("Password too short!")

print("Password accepted!")
```

## Loop Control Statements

### Break Statement
Exits the loop immediately:

```python
for i in range(10):
    if i == 5:
        break
    print(i)
# Prints: 0, 1, 2, 3, 4
```

### Continue Statement
Skips the rest of the current iteration:

```python
for i in range(10):
    if i % 2 == 0:
        continue
    print(i)
# Prints: 1, 3, 5, 7, 9
```

### Else Clause
Executes when the loop completes normally (not broken):

```python
for i in range(5):
    print(i)
else:
    print("Loop completed!")
```

## Nested Loops

Loops can be nested inside other loops:

```python
# Multiplication table
for i in range(1, 4):
    for j in range(1, 4):
        print(f"{i} x {j} = {i * j}")
    print()  # Empty line after each table
```

## List Comprehensions

A concise way to create lists using loops:

```python
# Traditional approach
squares = []
for x in range(10):
    squares.append(x**2)

# List comprehension
squares = [x**2 for x in range(10)]

# With condition
even_squares = [x**2 for x in range(10) if x % 2 == 0]
```

## Practical Examples

### Example 1: Sum of Numbers

```python
numbers = [1, 2, 3, 4, 5]
total = 0

for num in numbers:
    total += num

print(f"Sum: {total}")
```

### Example 2: Finding Maximum

```python
numbers = [45, 23, 67, 12, 89, 34]
maximum = numbers[0]

for num in numbers:
    if num > maximum:
        maximum = num

print(f"Maximum: {maximum}")
```

### Example 3: Counting Vowels

```python
text = "Hello World"
vowels = "aeiouAEIOU"
count = 0

for char in text:
    if char in vowels:
        count += 1

print(f"Number of vowels: {count}")
```

### Example 4: Pattern Printing

```python
# Print a triangle pattern
for i in range(1, 6):
    print("*" * i)
```

Loops are essential for automating repetitive tasks and processing collections of data efficiently.', 5, 22, 'beginner');

-- Insert JavaScript course lessons
INSERT INTO public.lessons (id, course_id, title, slug, content, order_index, estimated_time, difficulty) VALUES
('550e8400-e29b-41d4-a716-446655440201', '550e8400-e29b-41d4-a716-446655440002', 'Introduction to JavaScript', 'introduction-to-javascript',
'# Introduction to JavaScript

JavaScript is a versatile, high-level programming language that powers the modern web. Originally created to make web pages interactive, JavaScript has evolved into a full-stack programming language used for web development, mobile apps, desktop applications, and even server-side programming.

## What is JavaScript?

JavaScript is:
- **Dynamic**: Variables can hold different types of values
- **Interpreted**: No compilation step required
- **Prototype-based**: Objects can inherit directly from other objects
- **Multi-paradigm**: Supports procedural, object-oriented, and functional programming

## Why Learn JavaScript?

JavaScript is essential for modern web development:

- **Universal Language**: Runs in browsers, servers, and mobile apps
- **High Demand**: JavaScript developers are in high demand
- **Rich Ecosystem**: Vast library and framework ecosystem
- **Easy to Start**: No setup required - runs in any web browser
- **Versatile**: Frontend, backend, mobile, and desktop development

## JavaScript Applications

JavaScript is used in various domains:

- **Frontend Development**: React, Vue.js, Angular
- **Backend Development**: Node.js, Express.js
- **Mobile Development**: React Native, Ionic
- **Desktop Applications**: Electron
- **Game Development**: Phaser, Three.js

## Your First JavaScript Program

Let''s start with a simple "Hello, World!" program:

```javascript
console.log("Hello, World!");
```

You can also display messages in the browser:

```javascript
alert("Welcome to JavaScript!");
```

## JavaScript in HTML

JavaScript can be embedded in HTML documents:

```html
<!DOCTYPE html>
<html>
<head>
    <title>My First JavaScript</title>
</head>
<body>
    <h1>JavaScript Demo</h1>
    
    <script>
        console.log("Hello from JavaScript!");
        document.write("This text is written by JavaScript");
    </script>
</body>
</html>
```

## JavaScript Characteristics

### Case Sensitive
JavaScript is case-sensitive:

```javascript
let name = "John";
let Name = "Jane";  // Different variable
```

### Semicolons
Semicolons are optional but recommended:

```javascript
console.log("Hello");  // With semicolon
console.log("World")   // Without semicolon (works but not recommended)
```

### Comments

```javascript
// Single-line comment

/*
Multi-line
comment
*/
```

## Modern JavaScript (ES6+)

Modern JavaScript includes many powerful features:
- Arrow functions
- Template literals
- Destructuring
- Modules
- Promises and async/await

We''ll explore these features throughout the course.

In the next lesson, we''ll learn about JavaScript syntax, variables, and how to work with different data types.', 1, 12, 'beginner'),

('550e8400-e29b-41d4-a716-446655440202', '550e8400-e29b-41d4-a716-446655440002', 'JavaScript Variables and Data Types', 'javascript-variables-data-types',
'# JavaScript Variables and Data Types

Variables are containers for storing data values. JavaScript provides several ways to declare variables and supports various data types.

## Variable Declaration

### var, let, and const

```javascript
// var - function-scoped, can be redeclared
var name = "John";
var name = "Jane";  // Redeclaration allowed

// let - block-scoped, cannot be redeclared
let age = 25;
age = 26;  // Reassignment allowed

// const - block-scoped, cannot be redeclared or reassigned
const PI = 3.14159;
// PI = 3.14;  // Error: Cannot reassign const
```

### Variable Naming Rules

- Must start with a letter, underscore (_), or dollar sign ($)
- Can contain letters, numbers, underscores, and dollar signs
- Case-sensitive
- Cannot use reserved keywords

```javascript
// Valid variable names
let userName = "Alice";
let _private = "secret";
let $element = document.getElementById("myId");
let age2 = 30;

// Invalid variable names
// let 2age = 30;     // Cannot start with number
// let user-name = "Alice";  // Cannot use hyphen
// let class = "MyClass";    // Cannot use reserved keyword
```

## Data Types

JavaScript has dynamic typing - variables can hold different types of values.

### Primitive Data Types

#### Number
Represents both integers and floating-point numbers:

```javascript
let integer = 42;
let float = 3.14;
let negative = -10;
let scientific = 2.5e6;  // 2,500,000

// Special numeric values
let infinity = Infinity;
let notANumber = NaN;
```

#### String
Represents text data:

```javascript
let singleQuotes = ''Hello'';
let doubleQuotes = "World";
let backticks = `Template literal`;

// String concatenation
let greeting = "Hello" + " " + "World";

// Template literals (ES6)
let name = "Alice";
let message = `Hello, ${name}!`;
```

#### Boolean
Represents true or false:

```javascript
let isActive = true;
let isComplete = false;

// Boolean conversion
let truthyValue = Boolean("hello");  // true
let falsyValue = Boolean("");        // false
```

#### Undefined
Variable declared but not assigned:

```javascript
let undefinedVar;
console.log(undefinedVar);  // undefined
```

#### Null
Represents intentional absence of value:

```javascript
let emptyValue = null;
```

#### Symbol (ES6)
Unique identifier:

```javascript
let symbol1 = Symbol("id");
let symbol2 = Symbol("id");
console.log(symbol1 === symbol2);  // false
```

#### BigInt (ES2020)
For large integers:

```javascript
let bigNumber = 1234567890123456789012345678901234567890n;
```

### Non-Primitive Data Types

#### Object
Collection of key-value pairs:

```javascript
let person = {
    name: "Alice",
    age: 30,
    city: "New York",
    isStudent: false
};

// Accessing properties
console.log(person.name);        // Dot notation
console.log(person["age"]);      // Bracket notation
```

#### Array
Ordered list of values:

```javascript
let fruits = ["apple", "banana", "orange"];
let numbers = [1, 2, 3, 4, 5];
let mixed = ["hello", 42, true, null];

// Accessing array elements
console.log(fruits[0]);    // apple
console.log(fruits.length); // 3
```

#### Function
Reusable block of code:

```javascript
function greet(name) {
    return `Hello, ${name}!`;
}

// Arrow function (ES6)
const add = (a, b) => a + b;
```

## Type Checking

Use `typeof` operator to check data types:

```javascript
console.log(typeof 42);          // "number"
console.log(typeof "hello");     // "string"
console.log(typeof true);        // "boolean"
console.log(typeof undefined);   // "undefined"
console.log(typeof null);        // "object" (known quirk)
console.log(typeof {});          // "object"
console.log(typeof []);          // "object"
console.log(typeof function(){}); // "function"
```

## Type Conversion

### Implicit Conversion (Coercion)

```javascript
let result1 = "5" + 3;      // "53" (string concatenation)
let result2 = "5" - 3;      // 2 (numeric subtraction)
let result3 = "5" * "2";    // 10 (numeric multiplication)
```

### Explicit Conversion

```javascript
// To Number
let num1 = Number("123");      // 123
let num2 = parseInt("123px");  // 123
let num3 = parseFloat("12.34"); // 12.34

// To String
let str1 = String(123);        // "123"
let str2 = (123).toString();   // "123"

// To Boolean
let bool1 = Boolean(1);        // true
let bool2 = Boolean(0);        // false
let bool3 = Boolean("");       // false
let bool4 = Boolean("hello");  // true
```

## Variable Scope

### Global Scope

```javascript
var globalVar = "I''m global";

function myFunction() {
    console.log(globalVar);  // Accessible
}
```

### Function Scope

```javascript
function myFunction() {
    var functionScoped = "I''m function scoped";
    console.log(functionScoped);  // Accessible
}

// console.log(functionScoped);  // Error: not accessible
```

### Block Scope (let and const)

```javascript
if (true) {
    let blockScoped = "I''m block scoped";
    const alsoBlockScoped = "Me too";
    console.log(blockScoped);  // Accessible
}

// console.log(blockScoped);  // Error: not accessible
```

Understanding variables and data types is fundamental to JavaScript programming and will help you write more effective code.', 2, 18, 'beginner'),

('550e8400-e29b-41d4-a716-446655440203', '550e8400-e29b-41d4-a716-446655440002', 'JavaScript Functions', 'javascript-functions',
'# JavaScript Functions

Functions are reusable blocks of code that perform specific tasks. They are fundamental building blocks in JavaScript programming, allowing you to organize code, avoid repetition, and create modular applications.

## Function Declaration

The traditional way to create a function:

```javascript
function greet(name) {
    return `Hello, ${name}!`;
}

// Calling the function
let message = greet("Alice");
console.log(message);  // Hello, Alice!
```

## Function Expression

Functions can be assigned to variables:

```javascript
const greet = function(name) {
    return `Hello, ${name}!`;
};

// Anonymous function expression
const add = function(a, b) {
    return a + b;
};
```

## Arrow Functions (ES6)

A more concise way to write functions:

```javascript
// Basic arrow function
const greet = (name) => {
    return `Hello, ${name}!`;
};

// Shorter syntax for single expressions
const add = (a, b) => a + b;

// Single parameter (parentheses optional)
const square = x => x * x;

// No parameters
const sayHello = () => "Hello!";
```

## Function Parameters

### Default Parameters

```javascript
function greet(name = "World") {
    return `Hello, ${name}!`;
}

console.log(greet());        // Hello, World!
console.log(greet("Alice")); // Hello, Alice!
```

### Rest Parameters

Collect multiple arguments into an array:

```javascript
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3, 4));  // 10
```

### Destructuring Parameters

```javascript
function createUser({name, age, email}) {
    return {
        name,
        age,
        email,
        id: Math.random()
    };
}

const user = createUser({
    name: "Alice",
    age: 30,
    email: "alice@example.com"
});
```

## Return Statement

Functions can return values:

```javascript
function multiply(a, b) {
    return a * b;
}

function getFullName(firstName, lastName) {
    return `${firstName} ${lastName}`;
}

// Function without explicit return returns undefined
function logMessage(message) {
    console.log(message);
    // implicitly returns undefined
}
```

## Function Scope and Closures

### Local Scope

```javascript
function myFunction() {
    let localVar = "I''m local";
    console.log(localVar);  // Accessible
}

// console.log(localVar);  // Error: not accessible
```

### Closures

Functions can access variables from their outer scope:

```javascript
function outerFunction(x) {
    // Outer function''s variable
    
    function innerFunction(y) {
        // Inner function can access outer function''s variable
        return x + y;
    }
    
    return innerFunction;
}

const addFive = outerFunction(5);
console.log(addFive(3));  // 8
```

## Higher-Order Functions

Functions that take other functions as arguments or return functions:

```javascript
// Function that takes another function as argument
function processArray(arr, callback) {
    const result = [];
    for (let item of arr) {
        result.push(callback(item));
    }
    return result;
}

const numbers = [1, 2, 3, 4];
const doubled = processArray(numbers, x => x * 2);
console.log(doubled);  // [2, 4, 6, 8]

// Function that returns another function
function createMultiplier(factor) {
    return function(number) {
        return number * factor;
    };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5));  // 10
console.log(triple(5));  // 15
```

## Built-in Array Methods

JavaScript provides many built-in higher-order functions for arrays:

### forEach
Execute a function for each array element:

```javascript
const fruits = ["apple", "banana", "orange"];

fruits.forEach(fruit => {
    console.log(fruit);
});
```

### map
Create a new array by transforming each element:

```javascript
const numbers = [1, 2, 3, 4];
const squared = numbers.map(num => num * num);
console.log(squared);  // [1, 4, 9, 16]
```

### filter
Create a new array with elements that pass a test:

```javascript
const numbers = [1, 2, 3, 4, 5, 6];
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log(evenNumbers);  // [2, 4, 6]
```

### reduce
Reduce array to a single value:

```javascript
const numbers = [1, 2, 3, 4];
const sum = numbers.reduce((total, num) => total + num, 0);
console.log(sum);  // 10
```

## Function Hoisting

Function declarations are hoisted (moved to the top):

```javascript
// This works due to hoisting
console.log(sayHello());  // Hello!

function sayHello() {
    return "Hello!";
}

// Function expressions are NOT hoisted
// console.log(sayGoodbye());  // Error

const sayGoodbye = function() {
    return "Goodbye!";
};
```

## Immediately Invoked Function Expression (IIFE)

Functions that execute immediately:

```javascript
(function() {
    console.log("This runs immediately!");
})();

// Arrow function IIFE
(() => {
    console.log("Arrow IIFE!");
})();
```

## Practical Examples

### Example 1: Calculator Functions

```javascript
const calculator = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => b !== 0 ? a / b : "Cannot divide by zero"
};

console.log(calculator.add(5, 3));      // 8
console.log(calculator.divide(10, 2));  // 5
```

### Example 2: User Validation

```javascript
function validateUser(user) {
    const errors = [];
    
    if (!user.name || user.name.length < 2) {
        errors.push("Name must be at least 2 characters");
    }
    
    if (!user.email || !user.email.includes("@")) {
        errors.push("Valid email is required");
    }
    
    if (!user.age || user.age < 18) {
        errors.push("Must be 18 or older");
    }
    
    return {
        isValid: errors.length === 0,
        errors
    };
}

const user = { name: "Alice", email: "alice@example.com", age: 25 };
const validation = validateUser(user);
console.log(validation);  // { isValid: true, errors: [] }
```

Functions are essential for creating organized, reusable, and maintainable JavaScript code.', 3, 25, 'beginner'),

('550e8400-e29b-41d4-a716-446655440204', '550e8400-e29b-41d4-a716-446655440002', 'JavaScript Objects and Arrays', 'javascript-objects-arrays',
'# JavaScript Objects and Arrays

Objects and arrays are fundamental data structures in JavaScript that allow you to store and organize complex data. Understanding how to work with them effectively is crucial for JavaScript development.

## Objects

Objects are collections of key-value pairs, similar to dictionaries or hash maps in other languages.

### Creating Objects

```javascript
// Object literal syntax
const person = {
    name: "Alice",
    age: 30,
    city: "New York",
    isStudent: false
};

// Using Object constructor
const car = new Object();
car.brand = "Toyota";
car.model = "Camry";
car.year = 2022;
```

### Accessing Object Properties

```javascript
const person = {
    name: "Alice",
    age: 30,
    "favorite color": "blue"  // Property with spaces
};

// Dot notation
console.log(person.name);  // Alice

// Bracket notation
console.log(person["age"]);  // 30
console.log(person["favorite color"]);  // blue

// Dynamic property access
const property = "name";
console.log(person[property]);  // Alice
```

### Modifying Objects

```javascript
const person = {
    name: "Alice",
    age: 30
};

// Adding properties
person.email = "alice@example.com";
person["phone"] = "123-456-7890";

// Modifying properties
person.age = 31;

// Deleting properties
delete person.phone;

console.log(person);
// { name: "Alice", age: 31, email: "alice@example.com" }
```

### Object Methods

Objects can contain functions as properties:

```javascript
const calculator = {
    x: 10,
    y: 5,
    
    add: function() {
        return this.x + this.y;
    },
    
    // ES6 method shorthand
    subtract() {
        return this.x - this.y;
    },
    
    // Arrow functions don''t have their own ''this''
    multiply: () => {
        // ''this'' refers to global object, not calculator
        return "Arrow functions don''t work well as methods";
    }
};

console.log(calculator.add());       // 15
console.log(calculator.subtract());  // 5
```

### Object Destructuring

Extract properties into variables:

```javascript
const person = {
    name: "Alice",
    age: 30,
    city: "New York"
};

// Basic destructuring
const { name, age } = person;
console.log(name);  // Alice
console.log(age);   // 30

// Renaming variables
const { name: fullName, city: location } = person;
console.log(fullName);  // Alice
console.log(location);  // New York

// Default values
const { country = "USA" } = person;
console.log(country);  // USA
```

## Arrays

Arrays are ordered lists of values, indexed starting from 0.

### Creating Arrays

```javascript
// Array literal syntax
const fruits = ["apple", "banana", "orange"];
const numbers = [1, 2, 3, 4, 5];
const mixed = ["hello", 42, true, null, { name: "Alice" }];

// Using Array constructor
const colors = new Array("red", "green", "blue");
const emptyArray = new Array(5);  // Creates array with 5 empty slots
```

### Accessing Array Elements

```javascript
const fruits = ["apple", "banana", "orange"];

console.log(fruits[0]);    // apple
console.log(fruits[1]);    // banana
console.log(fruits[2]);    // orange
console.log(fruits[3]);    // undefined

// Array length
console.log(fruits.length);  // 3

// Last element
console.log(fruits[fruits.length - 1]);  // orange
```

### Modifying Arrays

```javascript
const fruits = ["apple", "banana"];

// Adding elements
fruits.push("orange");        // Add to end
fruits.unshift("grape");      // Add to beginning
fruits[fruits.length] = "kiwi";  // Add to end

console.log(fruits);  // ["grape", "apple", "banana", "orange", "kiwi"]

// Removing elements
const lastFruit = fruits.pop();      // Remove from end
const firstFruit = fruits.shift();   // Remove from beginning

console.log(lastFruit);   // kiwi
console.log(firstFruit);  // grape
console.log(fruits);      // ["apple", "banana", "orange"]
```

### Array Methods

#### Finding Elements

```javascript
const numbers = [1, 2, 3, 4, 5];

// find - returns first element that matches
const found = numbers.find(num => num > 3);
console.log(found);  // 4

// findIndex - returns index of first match
const index = numbers.findIndex(num => num > 3);
console.log(index);  // 3

// includes - checks if element exists
console.log(numbers.includes(3));  // true

// indexOf - returns index of element
console.log(numbers.indexOf(3));  // 2
```

#### Transforming Arrays

```javascript
const numbers = [1, 2, 3, 4, 5];

// map - transform each element
const doubled = numbers.map(num => num * 2);
console.log(doubled);  // [2, 4, 6, 8, 10]

// filter - keep elements that pass test
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log(evenNumbers);  // [2, 4]

// reduce - reduce to single value
const sum = numbers.reduce((total, num) => total + num, 0);
console.log(sum);  // 15
```

#### Other Useful Methods

```javascript
const fruits = ["apple", "banana", "orange"];

// join - convert to string
console.log(fruits.join(", "));  // "apple, banana, orange"

// slice - extract portion (doesn''t modify original)
const citrus = fruits.slice(1, 3);
console.log(citrus);  // ["banana", "orange"]

// splice - remove/add elements (modifies original)
fruits.splice(1, 1, "grape", "kiwi");  // Remove 1 element at index 1, add 2 elements
console.log(fruits);  // ["apple", "grape", "kiwi", "orange"]

// sort - sort elements
const numbers = [3, 1, 4, 1, 5, 9];
numbers.sort((a, b) => a - b);  // Numeric sort
console.log(numbers);  // [1, 1, 3, 4, 5, 9]
```

### Array Destructuring

```javascript
const colors = ["red", "green", "blue", "yellow"];

// Basic destructuring
const [first, second] = colors;
console.log(first);   // red
console.log(second);  // green

// Skipping elements
const [primary, , tertiary] = colors;
console.log(primary);   // red
console.log(tertiary);  // blue

// Rest operator
const [head, ...tail] = colors;
console.log(head);  // red
console.log(tail);  // ["green", "blue", "yellow"]
```

## Working with Complex Data

### Array of Objects

```javascript
const users = [
    { id: 1, name: "Alice", age: 30 },
    { id: 2, name: "Bob", age: 25 },
    { id: 3, name: "Charlie", age: 35 }
];

// Find user by id
const user = users.find(u => u.id === 2);
console.log(user);  // { id: 2, name: "Bob", age: 25 }

// Get all names
const names = users.map(u => u.name);
console.log(names);  // ["Alice", "Bob", "Charlie"]

// Filter by age
const adults = users.filter(u => u.age >= 30);
console.log(adults);  // [{ id: 1, name: "Alice", age: 30 }, { id: 3, name: "Charlie", age: 35 }]
```

### Nested Objects

```javascript
const company = {
    name: "Tech Corp",
    employees: [
        {
            name: "Alice",
            position: "Developer",
            skills: ["JavaScript", "React", "Node.js"]
        },
        {
            name: "Bob",
            position: "Designer",
            skills: ["Photoshop", "Figma", "CSS"]
        }
    ]
};

// Accessing nested data
console.log(company.employees[0].name);  // Alice
console.log(company.employees[0].skills[1]);  // React

// Finding employee with specific skill
const reactDeveloper = company.employees.find(emp => 
    emp.skills.includes("React")
);
console.log(reactDeveloper.name);  // Alice
```

## Practical Examples

### Example 1: Shopping Cart

```javascript
const shoppingCart = {
    items: [],
    
    addItem(product, quantity = 1) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({ ...product, quantity });
        }
    },
    
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
    },
    
    getTotal() {
        return this.items.reduce((total, item) => 
            total + (item.price * item.quantity), 0
        );
    }
};

// Usage
shoppingCart.addItem({ id: 1, name: "Laptop", price: 999 });
shoppingCart.addItem({ id: 2, name: "Mouse", price: 25 }, 2);
console.log(shoppingCart.getTotal());  // 1049
```

### Example 2: Student Grade Manager

```javascript
const students = [
    { name: "Alice", grades: [85, 92, 78, 96] },
    { name: "Bob", grades: [79, 85, 88, 82] },
    { name: "Charlie", grades: [92, 95, 89, 94] }
];

function calculateAverage(grades) {
    return grades.reduce((sum, grade) => sum + grade, 0) / grades.length;
}

const studentsWithAverages = students.map(student => ({
    ...student,
    average: calculateAverage(student.grades)
}));

console.log(studentsWithAverages);
```

Objects and arrays are powerful tools for organizing and manipulating data in JavaScript applications.', 4, 28, 'intermediate');

-- Insert sample quizzes
INSERT INTO public.quizzes (id, lesson_id, title, questions) VALUES
('550e8400-e29b-41d4-a716-446655440301', '550e8400-e29b-41d4-a716-446655440102', 'Python Syntax and Variables Quiz', '[
  {
    "id": "q1",
    "question": "Which of the following is the correct way to create a comment in Python?",
    "options": ["// This is a comment", "# This is a comment", "/* This is a comment */", "<!-- This is a comment -->"],
    "correct_answer": 1,
    "explanation": "In Python, single-line comments start with the # symbol."
  },
  {
    "id": "q2", 
    "question": "What will be the output of: print(type(5.0))?",
    "options": ["<class ''int''>", "<class ''float''>", "<class ''number''>", "<class ''decimal''>"],
    "correct_answer": 1,
    "explanation": "5.0 is a floating-point number, so its type is float."
  },
  {
    "id": "q3",
    "question": "Which variable name is NOT valid in Python?",
    "options": ["user_name", "_private", "2age", "myVar"],
    "correct_answer": 2,
    "explanation": "Variable names cannot start with a number. ''2age'' is invalid."
  }
]'),

('550e8400-e29b-41d4-a716-446655440302', '550e8400-e29b-41d4-a716-446655440104', 'Python Conditionals Quiz', '[
  {
    "id": "q1",
    "question": "What is the correct syntax for an if-else statement in Python?",
    "options": ["if condition { } else { }", "if (condition): else:", "if condition: else:", "if condition then else"],
    "correct_answer": 2,
    "explanation": "Python uses ''if condition:'' followed by ''else:'' with proper indentation."
  },
  {
    "id": "q2",
    "question": "What will this code output?\n\nage = 20\nif age >= 18:\n    print(\"Adult\")\nelse:\n    print(\"Minor\")",
    "options": ["Adult", "Minor", "Error", "Nothing"],
    "correct_answer": 0,
    "explanation": "Since age (20) is greater than or equal to 18, it prints ''Adult''."
  },
  {
    "id": "q3",
    "question": "Which operator is used for ''not equal to'' in Python?",
    "options": ["<>", "!=", "!==", "not="],
    "correct_answer": 1,
    "explanation": "The != operator is used to check if two values are not equal."
  }
]'),

('550e8400-e29b-41d4-a716-446655440303', '550e8400-e29b-41d4-a716-446655440202', 'JavaScript Variables Quiz', '[
  {
    "id": "q1",
    "question": "Which keyword is used to declare a block-scoped variable that cannot be reassigned?",
    "options": ["var", "let", "const", "final"],
    "correct_answer": 2,
    "explanation": "''const'' declares a block-scoped variable that cannot be reassigned after initialization."
  },
  {
    "id": "q2",
    "question": "What is the result of: typeof null",
    "options": ["\"null\"", "\"undefined\"", "\"object\"", "\"boolean\""],
    "correct_answer": 2,
    "explanation": "This is a known quirk in JavaScript - typeof null returns ''object''."
  },
  {
    "id": "q3",
    "question": "What will this code output?\n\nlet x = \"5\";\nlet y = 3;\nconsole.log(x + y);",
    "options": ["8", "\"53\"", "\"8\"", "Error"],
    "correct_answer": 1,
    "explanation": "When using + with a string and number, JavaScript performs string concatenation, resulting in ''53''."
  }
]'),

('550e8400-e29b-41d4-a716-446655440304', '550e8400-e29b-41d4-a716-446655440203', 'JavaScript Functions Quiz', '[
  {
    "id": "q1",
    "question": "What is the difference between function declarations and function expressions?",
    "options": ["No difference", "Declarations are hoisted, expressions are not", "Expressions are faster", "Declarations cannot have parameters"],
    "correct_answer": 1,
    "explanation": "Function declarations are hoisted (can be called before they are defined), while function expressions are not."
  },
  {
    "id": "q2",
    "question": "What will this arrow function return?\n\nconst multiply = (a, b) => a * b;",
    "options": ["undefined", "The product of a and b", "A function", "An error"],
    "correct_answer": 1,
    "explanation": "Arrow functions with a single expression automatically return that expression''s value."
  },
  {
    "id": "q3",
    "question": "What does the ''...args'' syntax represent in a function parameter?",
    "options": ["Default parameter", "Rest parameter", "Spread operator", "Destructuring"],
    "correct_answer": 1,
    "explanation": "The ''...args'' syntax in function parameters is called rest parameters, which collects multiple arguments into an array."
  }
]');