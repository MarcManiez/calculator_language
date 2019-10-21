module.exports = class Token {
  constructor(type, lexeme, literal) {
    this.type = type
    this.lexeme = lexeme
    this.literal = literal
  }
}
