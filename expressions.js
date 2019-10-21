class BinaryExpression {
  constructor(left, operator, right) {
    this.left = left
    this.operator = operator
    this.right = right
  }

  print() {
    return {
      expressionType: this.constructor.name + ': ' + this.operator.toString(),
      left: this.left.print(),
      operator: this.operator.toString(),
      right: this.right.print(),
    }
  }

  eval() {
    if (this.operator.type === 'STAR') {
      return this.left.eval() * this.right.eval()
    } else if (this.operator.type === 'SLASH') {
      return this.left.eval() / this.right.eval()
    } else if (this.operator.type === 'PLUS') {
      return this.left.eval() + this.right.eval()
    } else if (this.operator.type === 'MINUS') {
      return this.left.eval() - this.right.eval()
    } else {
      throw new Error('No matching operator...')
    }
  }
}

class Unary {
  constructor(operator, right) {
    this.operator = operator
    this.right = right
  }

  print() {
    return {
      expressionType: this.constructor.name,
      operator: this.operator.toString(),
      right: this.right.print(),
    }
  }

  eval() {
    return parseFloat(this.operator.toString() + this.right.value.literal.toString())
  }
}

class Grouping {
  constructor(expression) {
    this.expression = expression
  }

  print() {
    return {
      expressionType: this.constructor.name,
      expression: this.expression.print()
    }
  }

  eval() {
    return this.expression.eval()
  }
}

class Literal {
  constructor(value) {
    this.value = value
  }

  print() {
    return {
      expressionType: this.constructor.name,
      value: this.value.toString()
    }
  }

  eval() {
    return this.value.literal
  }
}

module.exports = { BinaryExpression, Unary, Grouping, Literal }
