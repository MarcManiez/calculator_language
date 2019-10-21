const { BinaryExpression, Literal, Unary, Grouping } = require('./expressions')

/**
 * Calculator grammar
 *
 * Expression: Addition
 * Addition: multiplication ((+ | -) multiplication)*
 * Multiplication: unary ((* | /) unary)*
 * Unary: - primary
 * Primary: NUMBER | ( expression )
 */

module.exports = class Parser {
  constructor(tokens) {
    this.tokens = tokens
    this.current = 0
    this.ast = null
  }

  parse() {
    this.ast = this.expression()
    return this.ast
  }

  print() {
    console.log(JSON.stringify(this.ast.print(), null, 2))
  }

  eval() {
    return this.ast.eval()
  }

  expression() {
    return this.addition()
  }

  addition() {
    let expr = this.multiplication()

    while (this.match('MINUS', 'PLUS')) {
      const operator = this.previous()
      expr = new BinaryExpression(expr, operator, this.multiplication())
    }

    return expr
  }

  multiplication() {
    let expr = this.unary()

    while (this.match('STAR', 'SLASH')) {
      const operator = this.previous()
      expr = new BinaryExpression(expr, operator, this.unary())
    }

    return expr
  }

  unary() {
    let expr = this.primary()

    if (this.match('MINUS')) {
      const operator = this.previous()
      expr = new Unary(operator, this.primary())
    }

    return expr
  }

  primary() {
    if (this.match('NUMBER')) {
      return new Literal(this.previous())
    } else if (this.match('LEFT_PAREN')) {
      const expr = this.expression()
      if (this.check('RIGHT_PAREN')) { this.advance() }
      return new Grouping(expr)
    } else {
      // return 'shit...'
    }
  }

  match(...types) {
    for (const type of types) {
      if (this.check(type)) {
        this.current += 1
        return true
      }
    }
    return false
  }

  previous() {
    return this.tokens[this.current - 1]
  }

  advance() {
    return this.tokens[this.current++]
  }

  peek() {
    return this.tokens[this.current]
  }

  check(type) {
    if (this.isAtEnd()) return false;
    return this.peek().type === type;
  }

  isAtEnd() {
    return !this.tokens[this.current]
  }
}
